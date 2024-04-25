// migrations/2_deploy_contract.js
const Certification = artifacts.require("Certification");

module.exports = function (deployer) {
  deployer.deploy(Certification);
};
