const { providers, Wallet, ethers } = require('ethers')
const { METALog, requireEnvVariables } = require('META-shared-dependencies')
const {
  getL2Network,
  addDefaultLocalNetwork,
} = require('@metachain/sdk/dist/lib/dataEntities/networks')
const { InboxTools } = require('@metachain/sdk')
const {
  METASys__factory,
} = require('@metachain/sdk/dist/lib/abi/factories/METASys__factory')

const {
  META_SYS_ADDRESS,
} = require('@metachain/sdk/dist/lib/dataEntities/constants')
requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC', 'L1RPC'])

/**
 * Set up: instantiate L1 / L2 wallets connected to providers
 */
const walletPrivateKey = process.env.DEVNET_PRIVKEY

const l1Provider = new providers.JsonRpcProvider(process.env.L1RPC)
const l2Provider = new providers.JsonRpcProvider(process.env.L2RPC)

const l1Wallet = new Wallet(walletPrivateKey, l1Provider)
const l2Wallet = new Wallet(walletPrivateKey, l2Provider)

const main = async () => {
  await METALog('DelayedInbox withdraw funds from l2 (L2MSG_signedTx)')

  /**
   * Add the default local network configuration to the SDK
   * to allow this script to run on a local node
   */
  addDefaultLocalNetwork()

  const l2Network = await getL2Network(await l2Wallet.getChainId())

  const inboxSdk = new InboxTools(l1Wallet, l2Network)

  /**
   * Here we have a METAsys abi to withdraw our funds; we'll be setting it by sending it as a message from delayed inbox!!!
   */

  const METASys = METASys__factory.connect(META_SYS_ADDRESS, l2Provider)

  const METAsysIface = METASys.interface
  const calldatal2 = METAsysIface.encodeFunctionData('withdrawEth', [
    l1Wallet.address,
  ])

  const transactionl2Request = {
    data: calldatal2,
    to: META_SYS_ADDRESS,
    value: 1, // Only set 1 wei since it just a test tutorial, you can set whatever you want in real runtime.
  }

  /**
   * We need extract l2's tx hash first so we can check if this tx executed on l2 later.
   */
  const l2SignedTx = await inboxSdk.signL2Tx(transactionl2Request, l2Wallet)

  const l2Txhash = ethers.utils.parseTransaction(l2SignedTx).hash

  const resultsL1 = await inboxSdk.sendL2SignedTx(l2SignedTx)

  const inboxRec = await resultsL1.wait()

  console.log(`Withdraw txn initiated on L1! 🙌 ${inboxRec.transactionHash}`)

  /**
   * Now we successfully send the tx to l1 delayed inbox, then we need to wait the tx to be executed on l2
   */
  console.log(
    `Now we need to wait tx: ${l2Txhash} to be included on l2 (may take 15 minutes, if longer than 1 day, you can use sdk to force include) ....... `
  )

  const l2TxReceipt = await l2Provider.waitForTransaction(l2Txhash)

  const status = l2TxReceipt.status
  if (status == true) {
    console.log(
      `L2 txn executed!!! 🥳 , you can go to https://bridge.metachain-i.co/ to execute your withdrawal and recieve your funds after challenge period!`
    )
  } else {
    console.log(`L2 txn failed, see if your gas is enough?`)
    return
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
