import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Select, Radio, Layout, Button, Skeleton,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { Link } from 'react-router-dom';
import {
  planetsApi,
  VehiclesApi,
  GetTokenFromApi,
  GetResultFromApi,
} from '../actions/thunkActions';

import logo from './Logo.png';
import './App.css';
import { State } from '../reducers';
import { Planet, Vehicle, FalconeData } from '../types/types';
import SelectPlanet from './SelectPlanet';
import * as actions from '../actions';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
const Selection = () => {
  // const message = useSelector((state: State) => state.message);
  // const id = useSelector((state: State) => state.id);
  const allPlanets = useSelector((state: State) => state.planet);
  const allVehicles = useSelector((state: State) => state.vehicle);
  const tokens = useSelector((state: State) => state.token);
  const dispatch = useDispatch();

  const [planetArray, setArray] = useState<Planet[]>([]);
  const [selectedVehicle, setVehicle] = useState<Array<string>>([]);
  const [vehicleArray, setVehicleArray] = useState<Vehicle[]>([]);
  const [time, setTime] = useState<number>(0);
  const [selectedPlanetsArray, setSelectedPlanetsArray] = useState<string[]>(
    [],
  );

  useEffect(() => {
    dispatch(GetTokenFromApi());
    dispatch(planetsApi());
    dispatch(VehiclesApi());
  }, []);

  const vehicleOnChange = (e: RadioChangeEvent) => {
    const optionSelected = e.target.value;
    const allSelectedPlanets = allVehicles.filter(
      (vehicle) => vehicle.name === optionSelected,
    );
    const currentIndex = Number(e.target.name);
    vehicleArray[currentIndex] = allSelectedPlanets[0];
    setVehicleArray([...vehicleArray]);
    console.log('selected Vehicles ::', vehicleArray);
    const prevOption = selectedVehicle[currentIndex];
    selectedVehicle[currentIndex] = optionSelected;
    setVehicle([...selectedVehicle]);
    calculateTime(currentIndex, prevOption, optionSelected);
    if (prevOption != optionSelected && prevOption != undefined) {
      const indexOfVehicle = allVehicles.map((e) => e.name).indexOf(prevOption);
      allVehicles[indexOfVehicle].total_no = allVehicles[indexOfVehicle].total_no + 1;
      const indexOfVehicle2 = allVehicles
        .map((e) => e.name)
        .indexOf(optionSelected);
      allVehicles[indexOfVehicle2].total_no = allVehicles[indexOfVehicle2].total_no - 1;
    } else {
      const indexOfVehicle = allVehicles
        .map((e) => e.name)
        .indexOf(optionSelected);
      allVehicles[indexOfVehicle].total_no = allVehicles[indexOfVehicle].total_no - 1;
    }
  };
  const calculateTime = (
    index: number,
    previousOption: string,
    optionSelected: string,
  ) => {
    if (optionSelected !== previousOption && previousOption !== undefined) {
      const prevTimeIndex = allVehicles
        .map((e) => e.name)
        .indexOf(previousOption);
      const prevTime = planetArray[index].distance / allVehicles[prevTimeIndex].speed;
      const indexTime = time
        + planetArray[index].distance / vehicleArray[index].speed
        - prevTime;
      setTime(indexTime);
    } else {
      const indextime = time + planetArray[index].distance / vehicleArray[index].speed;
      setTime(indextime);
    }
  };

  const findFalcone = () => {
    const tokenValue = String(Object.values(tokens));
    const selectedData = {
      token: tokenValue,
      planet_names: selectedPlanetsArray,
      vehicle_names: selectedVehicle,
    };

    dispatch(GetResultFromApi(selectedData));
    dispatch(actions.getTime(time));
    console.log('TIME TAKEN ::', time);
  };
  const onSelectChange = (value: string, currentIndex: number) => {
    const selectedPlanet = value;
    const planetDistance = allPlanets.filter(
      (planet) => planet.name === selectedPlanet,
    );
    const index = currentIndex;
    planetArray[index] = planetDistance[0];
    setArray([...planetArray]);
    selectedPlanetsArray[index] = selectedPlanet;
    setSelectedPlanetsArray([...selectedPlanetsArray]);
    console.log('parent Componet ::', value, selectedPlanetsArray);
  };

  const vehicleOnChangeinSelectPlanet = (e: RadioChangeEvent) => {
    const optionSelected = e.target.value;
    const allSelectedPlanets = allVehicles.filter(
      (vehicle) => vehicle.name === optionSelected,
    );
    const currentIndex = Number(e.target.name);
    vehicleArray[currentIndex] = allSelectedPlanets[0];
    setVehicleArray([...vehicleArray]);
    console.log('selected Vehicles ::', vehicleArray);
    const prevOption = selectedVehicle[currentIndex];
    selectedVehicle[currentIndex] = optionSelected;
    setVehicle([...selectedVehicle]);
    calculateTime(currentIndex, prevOption, optionSelected);
    if (prevOption != optionSelected && prevOption != undefined) {
      const indexOfVehicle = allVehicles.map((e) => e.name).indexOf(prevOption);
      allVehicles[indexOfVehicle].total_no = allVehicles[indexOfVehicle].total_no + 1;
      const indexOfVehicle2 = allVehicles
        .map((e) => e.name)
        .indexOf(optionSelected);
      allVehicles[indexOfVehicle2].total_no = allVehicles[indexOfVehicle2].total_no - 1;
    } else {
      const indexOfVehicle = allVehicles
        .map((e) => e.name)
        .indexOf(optionSelected);
      allVehicles[indexOfVehicle].total_no = allVehicles[indexOfVehicle].total_no - 1;
    }
  };

  return (
    <div>
      <div className="falcone-main-layout">

        <Layout className="layout ">
          <Header>
            <div className="logo">
              <img className="falcone-logo" src={logo} alt="falcone-logo" />
              <h2 className="finding-falcone">FINDING FALCONE</h2>
              <p className="finding-falcone-restart float-right">
                <Link className="finding-falcone-restart-link" to="/">
                  RESTART
                </Link>
              </p>
            </div>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content falcone-row-primary">
              <h5 className="falcone-text text-center">
                Select 4 planets and the space vehicles to search in these
                planets
              </h5>
              <p className="float-left">
                TIME TAKEN:
                {time}
              </p>
              <br />
              <br />
              <div className="row">
                <div className="col">
                  <SelectPlanet
                    index={0}
                    onSelectPlanetChange={onSelectChange}
                    planets={selectedPlanetsArray}
                    planetsArray={planetArray}
                    handleRadioChange={vehicleOnChangeinSelectPlanet}
                  />
                </div>
                <div className="col falcone-col">
                  <SelectPlanet
                    index={1}
                    onSelectPlanetChange={onSelectChange}
                    planets={selectedPlanetsArray}
                    planetsArray={planetArray}
                    handleRadioChange={vehicleOnChangeinSelectPlanet}
                  />
                </div>
                <div className="col">
                  <SelectPlanet
                    index={2}
                    onSelectPlanetChange={onSelectChange}
                    planets={selectedPlanetsArray}
                    planetsArray={planetArray}
                    handleRadioChange={vehicleOnChangeinSelectPlanet}
                  />
                </div>
                <div className="col">
                  <SelectPlanet
                    index={3}
                    onSelectPlanetChange={onSelectChange}
                    planets={selectedPlanetsArray}
                    planetsArray={planetArray}
                    handleRadioChange={vehicleOnChangeinSelectPlanet}
                  />
                </div>
              </div>
              {selectedVehicle.filter((value) => value !== undefined).length
              !== 4 ? (
                  ''
                ) : (
                  <>
                    <div className="d-flex justify-content-center">
                      <Button type="primary" onClick={findFalcone}>
                        <Link to="/FindFalcon/result"> FIND FALCONE</Link>
                      </Button>
                    </div>
                  </>
                )}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created for GeekTrust</Footer>
        </Layout>
      </div>
    </div>
  );
};
export default Selection;
