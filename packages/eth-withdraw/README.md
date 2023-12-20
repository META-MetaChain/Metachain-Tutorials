# eth-withdraw Tutorial

`eth-withdraw` shows how to move Ether from metachain (Layer 2) into the Ethereum (Layer 1) chain.

Note that this repo covers initiating and Ether withdrawal; for a demo on (later) releasing the funds from the Outbox, see [outbox-execute](../outbox-execute/README.md)

## How it works (Under the hood)

To withdraw Ether from metachain, a client creates an outgoing / L2 to L1 message using the `METASys` interface that later lets them release Ether from its escrow in the L1 Bridge.sol contract. For more info, see [Outgoing messages documentation](https://developer.META-MetaChain.com/docs/l1_l2_messages#l2-to-l1-messages-lifecycle).

---

_Note: Executing scripts will require your L2 account be funded with .000001 Eth._

### **Using metachain SDK tooling**

Our [metachain SDK](https://github.com/META-MetaChain/metachain-sdk) provides a simply convenience method for withdrawing Ether, abstracting away the need for the client to connect to any contracts manually.

See [./exec.js](./scripts/exec.js) for inline explanation.

To run:

```
yarn run withdrawETH
```

## Config Environment Variables

Set the values shown in `.env-sample` as environmental variables. To copy it into a `.env` file:

```bash
cp .env-sample .env
```

(you'll still need to edit some variables, i.e., `DEVNET_PRIVKEY`)

---

## Curious to see the output on the metachain chain?

Once the script is successfully executed, you can go to the [metachain block explorer](https://goerli-rollup-explorer.metachain-i.co/), enter your address and see the amount of ETH has been deducted from your Layer 2 balance. Note that your Layer 1 balance will only be updated after rollup's confirmation period is over.

<p align="left">
  <img width="350" height="150" src= "../../assets/logo.svg" />
</p>