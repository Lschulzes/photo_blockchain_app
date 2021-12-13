require("babel-register");
require("babel-polyfill");
require("ts-node").register({
  files: true,
});

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        version: "0.8.2",
        enabled: true,
        runs: 200,
      },
    },
  },
};
