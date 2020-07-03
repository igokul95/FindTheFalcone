import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import IntroPage from './IntroPage';
import Selection from './Selection';
import FinishPage from './FinishPage';


function App() {
  return (
    <Router>
      <div className="App-main">

        <Switch>
          <Route path="/FindTheFalcone" exact>
            <IntroPage />
          </Route>
          <Route path="/FindFalcone" exact>
            <Selection />
          </Route>
          <Route path="/FindFalcon/result">
            <FinishPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
