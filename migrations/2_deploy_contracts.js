const App = artifacts.require("App");

module.exports = (deployer) => {
  deployer.deploy(App).then(() => {
    App.deployed();
  });
};
