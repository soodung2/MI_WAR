const FactorTransaction = artifacts.require("FactorTransaction");

contract('FactorTransaction', (accounts) => {
  it('set factor', async () => {
    const factorInstance = await FactorTransaction.deployed();

    let place1 = await web3.utils.asciiToHex('university street');
    let place2 = await web3.utils.asciiToHex('miwar miwar');
    
    console.log("place1 ==",place1)
    console.log("place2 ==",place2)

    await factorInstance.setTemperature(1,20190831,33);
    await factorInstance.setHumidity(2,20190831,77);
    
    let temp_result = await factorInstance.getTemperature(1,20190831);
    let humid_result = await factorInstance.getHumidity(2,20190831);

    console.log("temp_result ==",temp_result)
    console.log("humid_result ==",humid_result)


  });
});
