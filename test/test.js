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
    let result, imageCount;
    const hash = "abc123";

    before(async () => {
      result = await app.uploadImage(hash, "Image description", {
        from: author,
      });
      imageCount = await app.imageCount();
    });

    it("creates images", async () => {
      // SUCCESS
      assert.equal(imageCount, 1);
      const {
        id,
        hash: hashResult,
        description,
        tipAmount,
        author: authorResult,
      } = result.logs[0].args;
      assert.equal(id.toNumber(), imageCount.toNumber(), "id is correct");
      assert.equal(hashResult, hash, "Hash is correct");
      assert.equal(description, "Image description", "description is correct");
      assert.equal(tipAmount, "0", "tip is correct");
      assert.equal(authorResult, author, "author is correct");

      app
        .uploadImage("", "Image description", {
          from: author,
        })
        .then((img) => img.should.be.rejected);
      app
        .uploadImage("abc123", "", {
          from: author,
        })
        .then((img) => img.should.be.rejected);
    });

    it("lists images", async () => {
      const image = await app.images(imageCount);
      const {
        id,
        hash: hashResult,
        description,
        tipAmount,
        author: authorResult,
      } = image;
      assert.equal(id.toNumber(), imageCount.toNumber(), "id is correct");
      assert.equal(hashResult, hash, "Hash is correct");
      assert.equal(description, "Image description", "description is correct");
      assert.equal(tipAmount, "0", "tip is correct");
      assert.equal(authorResult, author, "author is correct");
    });

    // it("Allows users to tip images", async () => {
    //   let oldAuthorBalance;
    //   oldAuthorBalance = await web3.eth.getBalance(author);
    //   oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);

    //   result = await app.tipImageOwner(imageCount, {
    //     from: tipper,
    //     value: web3.utils.toWei("1", "Ether"),
    //   });
    //   // SUCCESS
    //   const {
    //     id,
    //     hash: hashResult,
    //     description,
    //     tipAmount,
    //     author: authorResult,
    //   } = result.logs[0].args;
    //   assert.equal(id.toNumber(), imageCount.toNumber(), "id is correct");
    //   assert.equal(hashResult, hash, "Hash is correct");
    //   assert.equal(description, "Image description", "description is correct");
    //   assert.equal(tipAmount, web3.utils.toWei("1", "Ether"), "tip is correct");
    //   assert.equal(authorResult, author, "author is correct");
    //   // Check author received funds
    //   let newAuthorBalance;
    //   newAuthorBalance = await web3.eth.getBalance(author);
    //   newAuthorBalance = new web3.utils.BN(newAuthorBalance);

    //   let tipImageOwner = web3.utils.toWei("1", "Ether");
    //   tipImageOwner = new web3.utils.BN(tipImageOwner);

    //   const expectedBalance = await oldAuthorBalance.add(tipImageOwner);
    //   assert.equal(BigInt(newAuthorBalance), BigInt(expectedBalance));

    //   await app
    //     .tipImageOwner(99, {
    //       from: tipper,
    //       value: web3.utils.toWei("1", "Ether"),
    //     })
    //     .then((tip) => tip.should.be.rejected);
    // });
  });
});
