# Valueswap Interface

An open source interface for Valueswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [valueswap.valuenetwork.live](https://valueswap.valuenetwork.live/)
- Interface: [app.valueswap.valuenetwork.live](https://app.valueswap.valuenetwork.live)
- Docs: [valueswap.valuenetwork.live/docs/](https://valueswap.valuenetwork.live/docs/)
- Twitter: [@ValueswapProtocol](https://twitter.com/ValueswapProtocol)
- Reddit: [/r/Valueswap](https://www.reddit.com/r/Valueswap/)
- Email: [contact@valuenetwork.live](mailto:contact@valuenetwork.live)
- Discord: [Valueswap](https://discord.gg/Y7TF6QA)
- Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

## Accessing the Valueswap Interface

To access the Valueswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/valuenetworklive2021/valueswap-interface/releases/latest), 
or visit [app.valueswap.valuenetwork.live](https://app.valueswap.valuenetwork.live).

## Listing a token

Please see the
[@valueswap/default-token-list](https://github.com/valuenetworklive2021/valueswap-default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Valueswap V2](https://valueswap.valuenetwork.live/docs/v2/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

## Accessing Valueswap Interface V1

The Valueswap Interface supports swapping against, and migrating or removing liquidity from Valueswap V1. However,
if you would like to use Valueswap V1, the Valueswap V1 interface for mainnet and testnets is accessible via IPFS gateways 
linked from the [v1.0.0 release](https://github.com/valuenetworklive2021/valueswap-interface/releases/tag/v1.0.0).
