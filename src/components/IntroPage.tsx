import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {
  Button,
} from 'antd';
import Selection from './Selection';

import './IntroPage.css';
import logo from './Logo.png';

function IntroPage() {
  return (

    <div className="falcon-intro-main">
      <div className="row ">
        <div className="col-12 falcon-intro-main-col justify-content-center">
          <img className="falcone-intro-main-logo" src={logo} alt="falcone-logo" />
          <h1 className="falcone-intro-main-head">FINDING FALCONE</h1>
          <p className="falcone-intro-main-subtext">King Shan received intelligence that Al Falcone is in hiding in one of these 6 planets.Donlon,Enchai,Jebing,Sapir,Lerbin & Pingasor.However he has limited resources at his disposal & can send his army to only 4 of these planets.</p>
          <h4 className="falcone-intro-main-sub">HELP HIM TO FIND FALCONE</h4>
          <div className="d-flex justify-content-center">
            <Button type="primary">
              <Link to="/FindFalcone">START</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
}
export default IntroPage;
