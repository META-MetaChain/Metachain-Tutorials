# custom-token-bridging Tutorial

There are some tokens with requirements beyond what are offered via our StandardERC20 gateway. `custom-token-bridging` demonstrates how to get these custom tokens set up to use our Generic-Custom gateway.

For more info on bridging assets on metachain, see our [token bridging docs](https://developer.metachain-i.co/asset-bridging).

#### **Custom Token Bridging Using the Generic-Custom Gateway**

Bridging a custom token to the metachain chain is done via the metachain Generic-Custom gateway. Our Generic-Custom Gateway is designed to be flexible enough to be suitable for most (but not necessarily all) custom fungible token needs.

Here, we deploy a [demo custom token](./contracts/L1Token.sol) on L1 and a [demo custom token](./contracts/L2Token.sol) on L2. We then use the metachain Custom Gateway contract to register our L1 custom token to our L2 custom token. Once done with token's registration to the Custom Gateway, we register our L1 token to the metachain Gateway Router on L1.

We use our [metachain SDK](https://github.com/META-MetaChain/metachain-sdk) library to initiate and verify the bridging.

See [./exec.js](./scripts/exec.js) for inline explanation.

### Config Environment Variables

Set the values shown in `.env-sample` as environmental variables. To copy it into a `.env` file:

```bash
cp .env-sample .env
```

(you'll still need to edit some variables, i.e., `DEVNET_PRIVKEY`)

### Run:

```
yarn run custom-token-bridging
```

<p align="left">
  <img width="350" height="150" src= "../../assets/logo.svg" />
</p>

