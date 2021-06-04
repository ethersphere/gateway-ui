# Bee Gateway

[![](https://img.shields.io/badge/made%20by-Swarm-blue.svg?style=flat-square)](https://swarm.ethereum.org/)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![](https://img.shields.io/badge/npm-%3E%3D6.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D12.0.0-orange.svg?style=flat-square)

> Swarm Gateway website .

**Warning: This project is in alpha state. There might (and most probably will) be changes in the future to its API and working. Also, no guarantees can be made about its stability, efficiency, and security at this stage.**

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

:warn: Don't forget to provide postage stamp via environment variable or edit directly the `postageStamp` constant in [`.src/constants.ts`](./src/constants.ts)..

### Environment variables
- `REACT_APP_BEE_API` - Bee API URL (defaults to `http://localhost:1633`)
- `REACT_APP_POSTAGE_STAMP` - Postage stamp batch ID to be used for uploading

## Contribute

There are some ways you can make this module better:

- Consult our [open issues](https://github.com/ethersphere/gateway/issues) and take on one of them
- Help our tests reach 100% coverage!
- Join us in our [Discord chat](https://discord.gg/wdghaQsGq5) in the #develop-on-swarm channel if you have questions or want to give feedback

## Maintainers

- [agazso](https://github.com/agazso)
- [vojtechsimetka](https://github.com/vojtechsimetka)

## License

[BSD-3-Clause](./LICENSE)
