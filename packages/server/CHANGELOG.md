# Changelog

## 0.18.0

### Minor Changes

- 8b239e1: separate common package and update api

### Patch Changes

- Updated dependencies [8b239e1]
  - @ddadaal/tsgrpc-common@0.1.0

## 0.17.3

### Patch Changes

- c503c89: update readAsync implementation

## 0.17.2

### Patch Changes

- 014c4ec: fix and test error handling for request stream
- 1db1d84: use logger.error to log error

## 0.17.1

### Patch Changes

- 6e61fa8: fix: server ending response stream doesn't emit end to client
- 02609d5: server emits error if thrown in a response stream

## 0.17.0

### Minor Changes

- 1d1571b: Add streaming support for server and client

## 0.16.0

### Minor Changes

- 34de016: feat: allow to set server credentials

### Patch Changes

- 3712ea6: chore(deps): update all non-major dependencies
- e19b0df: update deps

## 0.15.1

### Patch Changes

- update deps

## 0.15.0

### Minor Changes

- 0a3ffc1: Reorganize packages

### Patch Changes

- 2e8ef17: update deps

## 0.14.2

### Patch Changes

- 100bee7: update deps

## 0.14.1

### Patch Changes

- 426fa71: update deps

## 0.14.0

### Minor Changes

- Update deps

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.13.0](https://github.com/ddadaal/tsgrpc/compare/v0.7.0...v0.13.0) (2022-06-02)

### ⚠ BREAKING CHANGES

- **cli:** default use binaries in cwd/node_modules/.bin
- **utils:** remove config

### Features

- **cli:** allow customization binPath ([713a44c](https://github.com/ddadaal/tsgrpc/commit/713a44cc16e0417ca2a3abe4143dcd7d5fa99f97))
- **cli:** default use binaries in cwd/node_modules/.bin ([21d06c9](https://github.com/ddadaal/tsgrpc/commit/21d06c9edfd1f3e9dbf21b9b92f0cc988f071edb))
- **cli:** update bin file resolution, likely to support one node_module monorepo ([15de647](https://github.com/ddadaal/tsgrpc/commit/15de647a87ea017735e0c39b9ac58382c55d8f01))
- **cli:** update ts-proto to latest and fix warning ([782eec2](https://github.com/ddadaal/tsgrpc/commit/782eec2e17bd6c78e6b2f03614fa2d397cebc9f1))
- **server:** export Logger type ([5197543](https://github.com/ddadaal/tsgrpc/commit/5197543648bdcf450c6644fde7c17b0842698d14))
- **server:** log success and error for handler ([8e97757](https://github.com/ddadaal/tsgrpc/commit/8e977577cba6d81a9cc4ee0959ee2aa396697b6e))
- **server:** remove utils dep ([34c6100](https://github.com/ddadaal/tsgrpc/commit/34c6100e87be1d8ad625963dd5396a2cb6445974))
- update deps ([074a87b](https://github.com/ddadaal/tsgrpc/commit/074a87bb24fe395080907c0c60a2aaec119d621f))
- update deps and clean up code ([859fef3](https://github.com/ddadaal/tsgrpc/commit/859fef313065e23c5f9b53b1ccda3f523acb75c7))
- **utils:** add parseKeyValue ([347aad8](https://github.com/ddadaal/tsgrpc/commit/347aad8486137aff705fc4ef425bb114e468bd6b))
- **utils:** add parsePlaceholder ([4a2110b](https://github.com/ddadaal/tsgrpc/commit/4a2110b625490ab7f82b524794defa5f9101d857))
- **utils:** add portOrZero envalid validator ([27db3de](https://github.com/ddadaal/tsgrpc/commit/27db3de8dcca5dc85a54e75dc72645095ac2b132))

### Bug Fixes

- **server:** change req complete log to trace level ([4acdfdb](https://github.com/ddadaal/tsgrpc/commit/4acdfdbfa90435cec4d10319936770c9dfa658e7))
- **server:** changing log for error response ([9026e64](https://github.com/ddadaal/tsgrpc/commit/9026e6411b45e2fb9d0fb3af5796d5db75120f30))
- **server:** fix grpc callback value ([6244575](https://github.com/ddadaal/tsgrpc/commit/6244575939f6610dc6bb63271bee4f3cd2d8a683))
- **server:** handling all errors when calling handler ([ad68ce2](https://github.com/ddadaal/tsgrpc/commit/ad68ce2ed6fbbf1e93f0a1eec99ab724c0f3cf09))
- **server:** log req start and end as info level ([af2b261](https://github.com/ddadaal/tsgrpc/commit/af2b261c511d9abff8a933ab38112fd6b23243a6))
- **server:** update error logging ([7544299](https://github.com/ddadaal/tsgrpc/commit/754429979c3f787b5f530b58b58fc9b4728ec805))
- update deps ([6b4ccf5](https://github.com/ddadaal/tsgrpc/commit/6b4ccf5fd55c65d4f8561cf1520ffb85300cc585))
- **utils:** config type inference ([46f7e2d](https://github.com/ddadaal/tsgrpc/commit/46f7e2decc2c12b09ca7fff0a09a2671c00bca39))
- **utils:** remove config ([f1b6b82](https://github.com/ddadaal/tsgrpc/commit/f1b6b8241a2b605c2923e629cf5382ddcf372d4f))

# [0.12.0](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-server@0.9.2...@ddadaal/tsgrpc-server@0.12.0) (2022-05-03)

### Bug Fixes

- **server:** log req start and end as info level ([af2b261](https://github.com/ddadaal/tsgrpc/commit/af2b261c511d9abff8a933ab38112fd6b23243a6))
- **server:** update error logging ([7544299](https://github.com/ddadaal/tsgrpc/commit/754429979c3f787b5f530b58b58fc9b4728ec805))

### Features

- **server:** export Logger type ([5197543](https://github.com/ddadaal/tsgrpc/commit/5197543648bdcf450c6644fde7c17b0842698d14))
- update deps ([074a87b](https://github.com/ddadaal/tsgrpc/commit/074a87bb24fe395080907c0c60a2aaec119d621f))
- update deps and clean up code ([859fef3](https://github.com/ddadaal/tsgrpc/commit/859fef313065e23c5f9b53b1ccda3f523acb75c7))

# [0.11.0](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-server@0.9.2...@ddadaal/tsgrpc-server@0.11.0) (2022-04-30)

### Bug Fixes

- **server:** log req start and end as info level ([af2b261](https://github.com/ddadaal/tsgrpc/commit/af2b261c511d9abff8a933ab38112fd6b23243a6))
- **server:** update error logging ([7544299](https://github.com/ddadaal/tsgrpc/commit/754429979c3f787b5f530b58b58fc9b4728ec805))

### Features

- update deps ([074a87b](https://github.com/ddadaal/tsgrpc/commit/074a87bb24fe395080907c0c60a2aaec119d621f))

# [0.10.0](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-server@0.9.2...@ddadaal/tsgrpc-server@0.10.0) (2022-02-10)

### Features

- update deps ([074a87b](https://github.com/ddadaal/tsgrpc/commit/074a87bb24fe395080907c0c60a2aaec119d621f))

## [0.9.2](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-server@0.9.1...@ddadaal/tsgrpc-server@0.9.2) (2021-12-11)

### Bug Fixes

- **server:** fix grpc callback value ([6244575](https://github.com/ddadaal/tsgrpc/commit/6244575939f6610dc6bb63271bee4f3cd2d8a683))

## [0.9.1](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-server@0.9.0...@ddadaal/tsgrpc-server@0.9.1) (2021-12-11)

### Bug Fixes

- **server:** handling all errors when calling handler ([ad68ce2](https://github.com/ddadaal/tsgrpc/commit/ad68ce2ed6fbbf1e93f0a1eec99ab724c0f3cf09))

# [0.9.0](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-server@0.8.2...@ddadaal/tsgrpc-server@0.9.0) (2021-12-10)

### Features

- **server:** remove utils dep ([34c6100](https://github.com/ddadaal/tsgrpc/commit/34c6100e87be1d8ad625963dd5396a2cb6445974))

## [0.8.2](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-server@0.8.1...@ddadaal/tsgrpc-server@0.8.2) (2021-12-09)

### Bug Fixes

- **server:** changing log for error response ([9026e64](https://github.com/ddadaal/tsgrpc/commit/9026e6411b45e2fb9d0fb3af5796d5db75120f30))

## [0.8.1](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-server@0.8.0...@ddadaal/tsgrpc-server@0.8.1) (2021-12-01)

### Bug Fixes

- **server:** change req complete log to trace level ([4acdfdb](https://github.com/ddadaal/tsgrpc/commit/4acdfdbfa90435cec4d10319936770c9dfa658e7))

# 0.8.0 (2021-11-19)

### Features

- **server:** log success and error for handler ([8e97757](https://github.com/ddadaal/tsgrpc/commit/8e977577cba6d81a9cc4ee0959ee2aa396697b6e))

# 0.7.0 (2021-11-14)

### Features

- **server:** migrate to pino logger ([297f468](https://github.com/ddadaal/tsgrpc/commit/297f468777548806e40c2ea1dd4bf8a6dd0cefab))

## 0.6.1 (2021-11-08)

### Bug Fixes

- **server:** fix tsc build error ([70fda6b](https://github.com/ddadaal/tsgrpc/commit/70fda6b667d73d9ab2ef8f698234c812ae5283ad))

# 0.6.0 (2021-11-07)

### Features

- **server:** log service path when request is started ([e76e5fb](https://github.com/ddadaal/tsgrpc/commit/e76e5fb4a126adae8542e953207d9fd4bb3eba5c))

# 0.5.0 (2021-11-04)

## 0.4.5 (2021-10-27)

## 0.4.4 (2021-10-27)

## 0.4.3 (2021-10-25)

## 0.4.2 (2021-10-25)

## 0.4.1 (2021-10-25)

### Bug Fixes

- **server:** grpc handler not handling throw ([7c3915e](https://github.com/ddadaal/tsgrpc/commit/7c3915eca09d71ee6eaba5ef8ba9851ad2d70311))

# 0.4.0 (2021-10-25)

### Features

- **server:** add decorateRequesst ([57ff524](https://github.com/ddadaal/tsgrpc/commit/57ff524fb1d63edf46c9bcdb5b85e9eacd07464a))

# 0.3.0 (2021-10-23)

# 0.2.0 (2021-10-22)

### Bug Fixes

- add tslib ([8039e34](https://github.com/ddadaal/tsgrpc/commit/8039e3480d9c211c1e9cbe1dd2577589cd08292d))

### Features

- **server:** add logger to server handler ([81ad7df](https://github.com/ddadaal/tsgrpc/commit/81ad7df11b7cf1545596c5857322d76d3af6e5d2))

## 0.1.8 (2021-10-21)

## 0.1.7 (2021-10-21)

## 0.1.6 (2021-10-21)

## 0.1.4 (2021-10-20)

## 0.1.3 (2021-10-20)

### Bug Fixes

- **config:** fix versioning and npmignore ([eefc585](https://github.com/ddadaal/tsgrpc/commit/eefc585dcd51dbcf660b9fca579150ff33d84659))

## 0.1.2 (2021-10-20)

### Bug Fixes

- **chore:** add npmignore ([08893dd](https://github.com/ddadaal/tsgrpc/commit/08893ddbdb28628323ee9ab366bb9f5fc089b35d))

## 0.1.1 (2021-10-20)

# [0.7.0](https://github.com/ddadaal/tsgrpc/compare/v0.6.1...v0.7.0) (2021-11-14)

### Features

- **server:** migrate to pino logger ([297f468](https://github.com/ddadaal/tsgrpc/commit/297f468777548806e40c2ea1dd4bf8a6dd0cefab))

## [0.6.1](https://github.com/ddadaal/tsgrpc/compare/v0.6.0...v0.6.1) (2021-11-08)

### Bug Fixes

- **server:** fix tsc build error ([70fda6b](https://github.com/ddadaal/tsgrpc/commit/70fda6b667d73d9ab2ef8f698234c812ae5283ad))

# [0.6.0](https://github.com/ddadaal/tsgrpc/compare/v0.5.0...v0.6.0) (2021-11-07)

### Features

- **server:** log service path when request is started ([e76e5fb](https://github.com/ddadaal/tsgrpc/commit/e76e5fb4a126adae8542e953207d9fd4bb3eba5c))

# [0.5.0](https://github.com/ddadaal/tsgrpc/compare/v0.4.5...v0.5.0) (2021-11-04)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.4.5](https://github.com/ddadaal/tsgrpc/compare/v0.4.4...v0.4.5) (2021-10-27)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.4.4](https://github.com/ddadaal/tsgrpc/compare/v0.4.3...v0.4.4) (2021-10-27)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.4.3](https://github.com/ddadaal/tsgrpc/compare/v0.4.2...v0.4.3) (2021-10-25)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.4.2](https://github.com/ddadaal/tsgrpc/compare/v0.4.1...v0.4.2) (2021-10-25)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.4.1](https://github.com/ddadaal/tsgrpc/compare/v0.4.0...v0.4.1) (2021-10-25)

### Bug Fixes

- **server:** grpc handler not handling throw ([7c3915e](https://github.com/ddadaal/tsgrpc/commit/7c3915eca09d71ee6eaba5ef8ba9851ad2d70311))

# [0.4.0](https://github.com/ddadaal/tsgrpc/compare/v0.3.0...v0.4.0) (2021-10-25)

### Features

- **server:** add decorateRequesst ([57ff524](https://github.com/ddadaal/tsgrpc/commit/57ff524fb1d63edf46c9bcdb5b85e9eacd07464a))

# [0.3.0](https://github.com/ddadaal/tsgrpc/compare/v0.2.0...v0.3.0) (2021-10-23)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

# [0.2.0](https://github.com/ddadaal/tsgrpc/compare/v0.1.8...v0.2.0) (2021-10-22)

### Bug Fixes

- add tslib ([8039e34](https://github.com/ddadaal/tsgrpc/commit/8039e3480d9c211c1e9cbe1dd2577589cd08292d))

### Features

- **server:** add logger to server handler ([81ad7df](https://github.com/ddadaal/tsgrpc/commit/81ad7df11b7cf1545596c5857322d76d3af6e5d2))

## [0.1.8](https://github.com/ddadaal/tsgrpc/compare/v0.1.7...v0.1.8) (2021-10-21)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.1.7](https://github.com/ddadaal/tsgrpc/compare/v0.1.6...v0.1.7) (2021-10-21)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.1.6](https://github.com/ddadaal/tsgrpc/compare/v0.1.5...v0.1.6) (2021-10-21)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.1.4](https://github.com/ddadaal/tsgrpc/compare/v0.1.3...v0.1.4) (2021-10-20)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

## [0.1.3](https://github.com/ddadaal/tsgrpc/compare/v0.1.2...v0.1.3) (2021-10-20)

### Bug Fixes

- **config:** fix versioning and npmignore ([eefc585](https://github.com/ddadaal/tsgrpc/commit/eefc585dcd51dbcf660b9fca579150ff33d84659))

## [0.1.2](https://github.com/ddadaal/tsgrpc/compare/v0.1.1...v0.1.2) (2021-10-20)

### Bug Fixes

- **chore:** add npmignore ([08893dd](https://github.com/ddadaal/tsgrpc/commit/08893ddbdb28628323ee9ab366bb9f5fc089b35d))

## [0.1.1](https://github.com/ddadaal/tsgrpc/compare/v0.0.6...v0.1.1) (2021-10-20)

**Note:** Version bump only for package @ddadaal/tsgrpc-server

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.6](https://github.com/ddadaal/tsgrpc/compare/v0.0.5...v0.0.6) (2021-10-20)

### [0.0.5](https://github.com/ddadaal/tsgrpc/compare/v0.0.4...v0.0.5) (2021-10-20)

### Bug Fixes

- protoc tool not found ([afb87be](https://github.com/ddadaal/tsgrpc/commit/afb87bee777afa9bf7dd9e023b2b190d6c22d8bd))

### [0.0.4](https://github.com/ddadaal/tsgrpc/compare/v0.0.3...v0.0.4) (2021-10-20)

### Features

- add targetPath config ([92b9657](https://github.com/ddadaal/tsgrpc/commit/92b9657cd1c518f3009134f33df473659decfd8e))

### Bug Fixes

- proto tooling not installed ([07f2e76](https://github.com/ddadaal/tsgrpc/commit/07f2e7641984c477f804b89d76bd90016d0bc462))

### [0.0.3](https://github.com/ddadaal/tsgrpc/compare/v0.0.2...v0.0.3) (2021-10-20)

### Bug Fixes

- add missing dependencies ([88914c2](https://github.com/ddadaal/tsgrpc/commit/88914c27c70c67668ed9c33b84add80e1bcc284b))

### [0.0.2](https://github.com/ddadaal/tsgrpc/compare/v0.0.1...v0.0.2) (2021-10-19)

### Bug Fixes

- remove uncessary generics ([ff70446](https://github.com/ddadaal/tsgrpc/commit/ff704467de79fb3dc90989c12cb6c16f6b625b12))

### [0.0.1](https://github.com/ddadaal/tsgrpc/compare/v0.0.0...v0.0.1) (2021-10-19)

### Bug Fixes

- try fixing plugin module augmentation ([cebe048](https://github.com/ddadaal/tsgrpc/commit/cebe048a3e8a3c6ed3826c759db98e2bebdfbd37))

## 0.0.0 (2021-10-19)
