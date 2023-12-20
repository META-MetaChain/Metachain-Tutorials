const hre = require('hardhat')
const {
  METAAddressTable__factory,
} = require('@metachain/sdk/dist/lib/abi/factories/METAAddressTable__factory')
const { addDefaultLocalNetwork } = require('@metachain/sdk')
const { METALog, requireEnvVariables } = require('META-shared-dependencies')
requireEnvVariables(['DEVNET_PRIVKEY', 'L2RPC'])
require('dotenv').config()

async function main() {
  await METALog('Using the Address Table')

  /**
   * Add the default local network configuration to the SDK
   * to allow this script to run on a local node
   */
  addDefaultLocalNetwork()

  /**
   * Deploy metachainVIP contract to L2
   */
  const metachainVIP = await hre.ethers.getContractFactory('metachainVIP')
  const metachainVIP = await metachainVIP.deploy()

  await metachainVIP.deployed()

  console.log('metachainVIP deployed to:', metachainVIP.address)

  const signers = await hre.ethers.getSigners()
  const myAddress = signers[0].address

  /**
   * Connect to the metachain Address table pre-compile contract
   */
  const METAAddressTable = METAAddressTable__factory.connect(
    '0x0000000000000000000000000000000000000066',
    signers[0]
  )

  //**
  /* Let's find out if our address is registered in the table:
   */
  const addressIsRegistered = await METAAddressTable.addressExists(myAddress)

  if (!addressIsRegistered) {
    //**
    /* If it isn't registered yet, let's register it!
     */

    const txnRes = await METAAddressTable.register(myAddress)
    const txnRec = await txnRes.wait()
    console.log(`Successfully registered address ${myAddress} to address table`)
  } else {
    console.log(`Address ${myAddress} already (previously) registered to table`)
  }
  /**
   * Now that we know it's registered, let's go ahead and retrieve its index
   */
  const addressIndex = await METAAddressTable.lookup(myAddress)

  /**
   * From here on out we can use this index instead of our address as a paramter into any contract with affordances to look up out address in the address data.
   */

  const txnRes = await metachainVIP.addVIPPoints(addressIndex)
  await txnRes.wait()
  /**
   * We got VIP points, and we minimized the calldata required, saving us precious gas. Yay rollups!
   */
  console.log(
    `Successfully added VIP points using address w/ index ${addressIndex.toNumber()}`
  )
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
