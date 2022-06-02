# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.13.0](https://github.com/ddadaal/tsgrpc/compare/v0.7.0...v0.13.0) (2022-06-02)


### ⚠ BREAKING CHANGES

* **cli:** default use binaries in cwd/node_modules/.bin
* **utils:** remove config

### Features

* **cli:** allow customization binPath ([713a44c](https://github.com/ddadaal/tsgrpc/commit/713a44cc16e0417ca2a3abe4143dcd7d5fa99f97))
* **cli:** default use binaries in cwd/node_modules/.bin ([21d06c9](https://github.com/ddadaal/tsgrpc/commit/21d06c9edfd1f3e9dbf21b9b92f0cc988f071edb))
* **cli:** update bin file resolution, likely to support one node_module monorepo ([15de647](https://github.com/ddadaal/tsgrpc/commit/15de647a87ea017735e0c39b9ac58382c55d8f01))
* **cli:** update ts-proto to latest and fix warning ([782eec2](https://github.com/ddadaal/tsgrpc/commit/782eec2e17bd6c78e6b2f03614fa2d397cebc9f1))
* **server:** export Logger type ([5197543](https://github.com/ddadaal/tsgrpc/commit/5197543648bdcf450c6644fde7c17b0842698d14))
* **server:** log success and error for handler ([8e97757](https://github.com/ddadaal/tsgrpc/commit/8e977577cba6d81a9cc4ee0959ee2aa396697b6e))
* **server:** remove utils dep ([34c6100](https://github.com/ddadaal/tsgrpc/commit/34c6100e87be1d8ad625963dd5396a2cb6445974))
* update deps ([074a87b](https://github.com/ddadaal/tsgrpc/commit/074a87bb24fe395080907c0c60a2aaec119d621f))
* update deps and clean up code ([859fef3](https://github.com/ddadaal/tsgrpc/commit/859fef313065e23c5f9b53b1ccda3f523acb75c7))
* **utils:** add parseKeyValue ([347aad8](https://github.com/ddadaal/tsgrpc/commit/347aad8486137aff705fc4ef425bb114e468bd6b))
* **utils:** add parsePlaceholder ([4a2110b](https://github.com/ddadaal/tsgrpc/commit/4a2110b625490ab7f82b524794defa5f9101d857))
* **utils:** add portOrZero envalid validator ([27db3de](https://github.com/ddadaal/tsgrpc/commit/27db3de8dcca5dc85a54e75dc72645095ac2b132))


### Bug Fixes

* **server:** change req complete log to trace level ([4acdfdb](https://github.com/ddadaal/tsgrpc/commit/4acdfdbfa90435cec4d10319936770c9dfa658e7))
* **server:** changing log for error response ([9026e64](https://github.com/ddadaal/tsgrpc/commit/9026e6411b45e2fb9d0fb3af5796d5db75120f30))
* **server:** fix grpc callback value ([6244575](https://github.com/ddadaal/tsgrpc/commit/6244575939f6610dc6bb63271bee4f3cd2d8a683))
* **server:** handling all errors when calling handler ([ad68ce2](https://github.com/ddadaal/tsgrpc/commit/ad68ce2ed6fbbf1e93f0a1eec99ab724c0f3cf09))
* **server:** log req start and end as info level ([af2b261](https://github.com/ddadaal/tsgrpc/commit/af2b261c511d9abff8a933ab38112fd6b23243a6))
* **server:** update error logging ([7544299](https://github.com/ddadaal/tsgrpc/commit/754429979c3f787b5f530b58b58fc9b4728ec805))
* update deps ([6b4ccf5](https://github.com/ddadaal/tsgrpc/commit/6b4ccf5fd55c65d4f8561cf1520ffb85300cc585))
* **utils:** config type inference ([46f7e2d](https://github.com/ddadaal/tsgrpc/commit/46f7e2decc2c12b09ca7fff0a09a2671c00bca39))
* **utils:** remove config ([f1b6b82](https://github.com/ddadaal/tsgrpc/commit/f1b6b8241a2b605c2923e629cf5382ddcf372d4f))

# [0.12.0](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-utils@0.9.1...@ddadaal/tsgrpc-utils@0.12.0) (2022-05-03)


### Features

* update deps ([074a87b](https://github.com/ddadaal/tsgrpc/commit/074a87bb24fe395080907c0c60a2aaec119d621f))
* update deps and clean up code ([859fef3](https://github.com/ddadaal/tsgrpc/commit/859fef313065e23c5f9b53b1ccda3f523acb75c7))





# [0.11.0](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-utils@0.9.1...@ddadaal/tsgrpc-utils@0.11.0) (2022-04-30)


### Features

* update deps ([074a87b](https://github.com/ddadaal/tsgrpc/commit/074a87bb24fe395080907c0c60a2aaec119d621f))





# [0.10.0](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-utils@0.9.1...@ddadaal/tsgrpc-utils@0.10.0) (2022-02-10)


### Features

* update deps ([074a87b](https://github.com/ddadaal/tsgrpc/commit/074a87bb24fe395080907c0c60a2aaec119d621f))





## [0.9.1](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-utils@0.9.0...@ddadaal/tsgrpc-utils@0.9.1) (2021-12-10)


### Bug Fixes

* **utils:** config type inference ([46f7e2d](https://github.com/ddadaal/tsgrpc/commit/46f7e2decc2c12b09ca7fff0a09a2671c00bca39))





# [0.9.0](https://github.com/ddadaal/tsgrpc/compare/@ddadaal/tsgrpc-utils@0.8.0...@ddadaal/tsgrpc-utils@0.9.0) (2021-12-10)


### Features

* **utils:** add parseKeyValue ([347aad8](https://github.com/ddadaal/tsgrpc/commit/347aad8486137aff705fc4ef425bb114e468bd6b))
* **utils:** add parsePlaceholder ([4a2110b](https://github.com/ddadaal/tsgrpc/commit/4a2110b625490ab7f82b524794defa5f9101d857))






# 0.8.0 (2021-12-09)


### Features

* **utils:** add portOrZero envalid validator ([27db3de](https://github.com/ddadaal/tsgrpc/commit/27db3de8dcca5dc85a54e75dc72645095ac2b132))



# 0.7.0 (2021-11-14)



## 0.6.1 (2021-11-08)



# 0.6.0 (2021-11-07)



# 0.5.0 (2021-11-04)



## 0.4.5 (2021-10-27)



## 0.4.4 (2021-10-27)



## 0.4.2 (2021-10-25)



# 0.4.0 (2021-10-25)


### Features

* **logger:** auto config log according to env value ([b7c4e39](https://github.com/ddadaal/tsgrpc/commit/b7c4e39985c2a2b6f9ec591164658b15dc4a819e))



# 0.3.0 (2021-10-23)



# 0.2.0 (2021-10-22)


### Features

* **utils:** update logger ([3997b9f](https://github.com/ddadaal/tsgrpc/commit/3997b9f0bee2b0bae22a5de269667049f3f3ef0c))



## 0.1.8 (2021-10-21)


### Bug Fixes

* **utils:** add tslib dependency ([e906d12](https://github.com/ddadaal/tsgrpc/commit/e906d12e8871c7e3ddb30c01239599d35e0f8de4))



## 0.1.7 (2021-10-21)



## 0.1.6 (2021-10-21)



## 0.1.4 (2021-10-20)



## 0.1.3 (2021-10-20)


### Bug Fixes

* **config:** fix versioning and npmignore ([eefc585](https://github.com/ddadaal/tsgrpc/commit/eefc585dcd51dbcf660b9fca579150ff33d84659))



## 0.1.2 (2021-10-20)



## 0.1.1 (2021-10-20)





# [0.7.0](https://github.com/ddadaal/tsgrpc/compare/v0.6.1...v0.7.0) (2021-11-14)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils





## [0.6.1](https://github.com/ddadaal/tsgrpc/compare/v0.6.0...v0.6.1) (2021-11-08)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils






# [0.6.0](https://github.com/ddadaal/tsgrpc/compare/v0.5.0...v0.6.0) (2021-11-07)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils






# [0.5.0](https://github.com/ddadaal/tsgrpc/compare/v0.4.5...v0.5.0) (2021-11-04)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils





## [0.4.5](https://github.com/ddadaal/tsgrpc/compare/v0.4.4...v0.4.5) (2021-10-27)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils





## [0.4.4](https://github.com/ddadaal/tsgrpc/compare/v0.4.3...v0.4.4) (2021-10-27)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils






## [0.4.2](https://github.com/ddadaal/tsgrpc/compare/v0.4.1...v0.4.2) (2021-10-25)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils





# [0.4.0](https://github.com/ddadaal/tsgrpc/compare/v0.3.0...v0.4.0) (2021-10-25)


### Features

* **logger:** auto config log according to env value ([b7c4e39](https://github.com/ddadaal/tsgrpc/commit/b7c4e39985c2a2b6f9ec591164658b15dc4a819e))






# [0.3.0](https://github.com/ddadaal/tsgrpc/compare/v0.2.0...v0.3.0) (2021-10-23)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils






# [0.2.0](https://github.com/ddadaal/tsgrpc/compare/v0.1.8...v0.2.0) (2021-10-22)


### Features

* **utils:** update logger ([3997b9f](https://github.com/ddadaal/tsgrpc/commit/3997b9f0bee2b0bae22a5de269667049f3f3ef0c))





## [0.1.8](https://github.com/ddadaal/tsgrpc/compare/v0.1.7...v0.1.8) (2021-10-21)


### Bug Fixes

* **utils:** add tslib dependency ([e906d12](https://github.com/ddadaal/tsgrpc/commit/e906d12e8871c7e3ddb30c01239599d35e0f8de4))





## [0.1.7](https://github.com/ddadaal/tsgrpc/compare/v0.1.6...v0.1.7) (2021-10-21)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils





## [0.1.6](https://github.com/ddadaal/tsgrpc/compare/v0.1.5...v0.1.6) (2021-10-21)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils





## [0.1.4](https://github.com/ddadaal/tsgrpc/compare/v0.1.3...v0.1.4) (2021-10-20)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils





## [0.1.3](https://github.com/ddadaal/tsgrpc/compare/v0.1.2...v0.1.3) (2021-10-20)


### Bug Fixes

* **config:** fix versioning and npmignore ([eefc585](https://github.com/ddadaal/tsgrpc/commit/eefc585dcd51dbcf660b9fca579150ff33d84659))





## [0.1.2](https://github.com/ddadaal/tsgrpc/compare/v0.1.1...v0.1.2) (2021-10-20)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils





## [0.1.1](https://github.com/ddadaal/tsgrpc/compare/v0.0.6...v0.1.1) (2021-10-20)

**Note:** Version bump only for package @ddadaal/tsgrpc-utils
