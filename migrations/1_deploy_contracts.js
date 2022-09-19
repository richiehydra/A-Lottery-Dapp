const Lottery = artifacts.require("./Lottery.sol");

module.exports = function (deployer) {
  deployer.deploy(Lottery);
};
//0xD3aB52152Bbc93E07C0163482E54514Cb62aD282