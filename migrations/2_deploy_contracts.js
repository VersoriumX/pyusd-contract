const PYUSD = artifacts.require('PYUSDImplementation');
const Proxy = artifacts.require('AdminUpgradeabilityProxy');

module.exports = async function(deployer) {
  await deployer;

  await deployer.deploy(PYUSD);
  const proxy = await deployer.deploy(Proxy, PYUSD.address);
  const proxiedPYUSD = await PYUSD.at(proxy.address);
  await proxy.changeAdmin("0x591C13850C672c5713A8774E34DDe8777BA72Ef4");
  await proxiedPYUSD.initialize();
};
