const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {

  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner(0);

    return { game, signer };
  }

  it('should be a winner', async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const wallet = ethers.Wallet.createRandom();
    console.log(`Your lucky wallet address is: ${wallet.address}`);

    await game.connect(wallet.address).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });

});
