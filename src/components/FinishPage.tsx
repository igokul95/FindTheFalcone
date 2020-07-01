import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Layout, Button,
} from 'antd';


import './FinishPage.css';
import logo from './Logo.png';

import { State } from '../reducers';


const { Header, Content, Footer } = Layout;

const FinishPage = () => {
  const result = useSelector((state: State) => state.result);
  const time = useSelector((state: State) => state.time);

  return (
    <div>
      <div className="falcon-finish-main">
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
            <div className="row">
              <div className="col falcon-finish-col">
                <h2 className="falcon-finish-status">
                  {result.status}
                  !
                </h2>
                {result.status === 'success' ? (
                  <div>
                    <h6 className="falcon-finish-congrats">
                      Congratulations on finding falcone.King Shan is mightly
                      pleased.
                    </h6>
                    {' '}
                    <h5 className="falcon-data pt-3">
                      PLANET FOUND:
                      <b>
                        {' '}
                        {result.planet_name}
                      </b>
                    </h5>
                    <h5 className="falcon-data">
                      TIME TAKEN:
                      <b>
                        {' '}
                        {time}
                      </b>
                    </h5>
                  </div>
                ) : ''}
                {
                  result.status === 'false' ? (
                    <h6 className="falcon-finish-congrats">
                      Oops AI Falcone is not there !!
                    </h6>
                  ) : ''
                }
                <Button type="primary">
                  <Link to="/">START AGAIN</Link>
                </Button>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created for GeekTrust</Footer>
        </Layout>
      </div>
    </div>
  );
};
export default FinishPage;
