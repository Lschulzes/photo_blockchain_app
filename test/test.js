const App = artifacts.require("./App.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("App", ([deployer, author, tipper]) => {
  let app;

  before(async () => {
    app = await App.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await app.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await app.name();
      assert.equal(name, "App");
    });
  });

  describe("images", async () => {
    let result;

    it("creates images", async () => {
      result = await app.uploadImage();
      let image = await app.images(1);
      console.log(image);
    });
  });
});
