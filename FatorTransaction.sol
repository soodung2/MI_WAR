pragma solidity ^0.5.0;

contract FactorTransaction {


    mapping (uint32 => mapping(uint32=>uint32)) private area_temp;
    mapping (uint32 => mapping(uint32=>uint32)) private area_humid;


    function setTemperature( uint32 _place, uint32 _date,uint32 _temperature) public {
        //require(area_temp[_place].temperature[_date] != 0);
        area_temp[_place][_date] = _temperature;
    }

    function setHumidity( uint32 _place, uint32 _date, uint32 _humidity) public {
        //require(area_humid[_place].humidity[_date] != 0);
        area_humid[_place][_date] = _humidity;
    }


    function getTemperature(uint32 _place, uint32 _date) external view returns(uint32){
        //require(area_temp[_place].temperature[_date] != 0);
        return area_temp[_place][_date];
    }

    function getHumidity(uint32 _place, uint32 _date) external view returns(uint32){
        //require(area_humid[_place].humidity[_date] != 0);
        return area_humid[_place][_date];
    }
}
