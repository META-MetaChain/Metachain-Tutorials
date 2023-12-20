# eth-deposit-to-different-address Tutorial

`eth-deposit-to-different-address` shows how to move Ether from Ethereum (Layer 1) into the metachain (Layer 2) chain, to an address different than the depositor.

## How it works (Under the hood)

For the common case of depositing ETH to the same account on L2, use the tutorial [eth-deposit](../eth-deposit/README.md).
In this specific case, we will use the retryable tickets (metachain's canonical method for creating L1 to L2 messages) to deposit ETH into a different address. We will use the parameter `l2CallValue` of the retryable ticket to specify the amount of ETH to deposit, and `callValueRefundAddress` to specify the destination address. For more info on retryable tickets, see [retryable tickets documentation](https://developer.META-MetaChain.com/docs/l1_l2_messages#depositing-eth-via-retryables).

### **Using metachain SDK tooling**

Our [metachain SDK](https://github.com/META-MetaChain/metachain-sdk) provides a simple convenient method for creating a retryable ticket, abstracting away the need for the client to connect to any contracts manually.

See [./exec.js](./scripts/exec.js) for inline explanation.

To run:

```
yarn run exec
```

## Config Environment Variables

Set the values shown in `.env-sample` as environmental variables. To copy it into a `.env` file:

```bash
cp .env-sample .env
```

(you'll still need to edit some variables, i.e., `DEVNET_PRIVKEY`)

---

Once the script is successfully executed, you can go to the [metachain block explorer](https://goerli-rollup-explorer.metachain-i.co/), enter your address, and see the amount of ETH that has been assigned to the specified address on the metachain chain!

<p align="center"><img src="../../assets/offchain_labs_logo.png" width="600"></p>
