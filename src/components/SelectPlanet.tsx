import React, { useState, ReactNode } from 'react';
import { Select, Radio } from 'antd';
import { useSelector } from 'react-redux';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { State } from '../reducers';
import { Planet } from '../types/types';

import './SelectedPlanets.css';

interface MyProps {
  index: number;
  onSelectPlanetChange(value: string, index: number): void;
  planets: string[];
  planetsArray:Planet[];
  handleRadioChange(e: RadioChangeEvent):void;
}
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const { Option } = Select;
const SelectPlanet: React.FunctionComponent<MyProps> = (props) => {
  const allPlanets = useSelector((state: State) => state.planet);
  const allVehicles = useSelector((state: State) => state.vehicle);

  function handleChange(value: string) {
    props.onSelectPlanetChange(value, props.index);
    console.log(`selected ${value}`);
  }
  const listOptionsInComponent = () => {
    const planetList = allPlanets.filter(
      (planet) => props.planets[props.index] === planet.name
        || !props.planets.includes(planet.name),
    );
    const list = planetList.map((data, index) => (
      <Option value={data.name}>{data.name}</Option>
    ));
    console.log('options', list);

    return list;
  };
  const listVehiclesAt = (value:number) => {
    const { distance } = props.planetsArray[value];

    // const vehicleList = allVehicles.filter(
    //   (vehicle) => vehicle.max_distance >= distance,
    // );
    const vehicleOptions = allVehicles.map((vehicle) => (
      vehicle.max_distance >= distance && vehicle.total_no > 0 ? (
        <Radio style={radioStyle} value={vehicle.name}>
          {vehicle.name}
          (
          {vehicle.total_no}
          )
        </Radio>
      )
        : (
          <Radio style={radioStyle} value={vehicle.name} disabled>
            {vehicle.name}
            (
            {vehicle.total_no}
            )
          </Radio>
        )
    ));
    return vehicleOptions;
  };

  const listVehicles = () => {
    const vehicleOptions = allVehicles.map((vehicle) => (
      <>
        <Radio style={radioStyle} value={vehicle.name} disabled>
          {vehicle.name}
          (
          {vehicle.total_no}
          )
        </Radio>
      </>
    ));
    return vehicleOptions;
  };


  return (
    <div>
      <h5 className="falcone-planet-h5">
        Planet
        {' '}
        {props.index + 1}
        {' '}
      </h5>
      <h6 className="falcone-selectPlanets">Select the planet </h6>
      <Select onChange={handleChange}>{listOptionsInComponent()}</Select>
      <div>

        {props.planets[props.index] === undefined ? '' : (
          <>
            <h6 className="falcone-selectSpaceShip">Select the space ship </h6>
            <Radio.Group name={String(props.index)} onChange={props.handleRadioChange}>
              {' '}
              {listVehiclesAt(props.index)}
            </Radio.Group>
          </>
        )}
      </div>
    </div>
  );
};
export default SelectPlanet;
