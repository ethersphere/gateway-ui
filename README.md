# Bee Gateway

[![](https://img.shields.io/badge/made%20by-Swarm-blue.svg?style=flat-square)](https://swarm.ethereum.org/)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fethersphere%2Fgateway.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fethersphere%2Fgateway?ref=badge_shield)
![](https://img.shields.io/badge/npm-%3E%3D6.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D12.0.0-orange.svg?style=flat-square)

> Swarm Gateway website.

**Warning: This project is in alpha state. There might (and most probably will) be changes in the future to its API and
working. Also, no guarantees can be made about its stability, efficiency, and security at this stage.**

This project is intended to be used with
**Bee&nbsp;version&nbsp;<!-- SUPPORTED_BEE_START -->1.13.0-f1067884<!-- SUPPORTED_BEE_END -->**. Using it with older or
newer Bee versions is not recommended and may not work. Stay up to date by joining the
[official Discord](https://discord.gg/GU22h2utj6) and by keeping an eye on the
[releases tab](https://github.com/ethersphere/gateway-proxy/releases).

## Table of Contents

- [Development](#development)
- [Contribute](#contribute)
- [Maintainers](#maintainers)
- [License](#license)

## Development

```sh
git clone git@github.com:ethersphere/gateway.git

cd  gateway

npm start
```

The Gateway runs in development mode on [http://localhost:3030/](http://localhost:3030/).

:warn: Don't forget to provide postage stamp via environment variable or edit directly the `postageStamp` constant in
[`.src/constants.ts`](./src/constants.ts)..

### Environment variables

- `REACT_APP_BEE_HOSTS` - comma separated bee API URLs through which the gateway uploads and downloads. The api to upload is
  selected at random while on download the gateway checks all the hosts (defaults to `[http://localhost:1633]`)
- `REACT_APP_BZZ_LINK_DOMAIN` - specifies what domain of Bzz Link should be used (defaults to `bzz.link`)
- `REACT_APP_POSTAGE_STAMP` - Postage stamp batch ID to be used for uploading (defaults to `00000...00000`
- `REACT_APP_GATEWAY_URL` - URL on which the gateway is hosted (defaults to current window location)
- `REACT_APP_DIRECT_DOWNLOAD_URL` - URL for a direct download of asset, used for redirecting ENS requests (defaults to `https://api.gateway.ethswarm.org/bzz/`)

## Contribute

There are some ways you can make this module better:

- Consult our [open issues](https://github.com/ethersphere/gateway/issues) and take on one of them
- Help our tests reach 100% coverage!
- Join us in our [Discord chat](https://discord.gg/wdghaQsGq5) in the #develop-on-swarm channel if you have questions or
  want to give feedback

## Maintainers

- [vojtechsimetka](https://github.com/vojtechsimetka)
- [Cafe137](https://github.com/Cafe137)

See what "Maintainer" means [here](https://github.com/ethersphere/repo-maintainer).

## License

[BSD-3-Clause](./LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fethersphere%2Fgateway.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fethersphere%2Fgateway?ref=badge_large)
