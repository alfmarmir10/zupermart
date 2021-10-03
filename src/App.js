import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './views/SignIn';
import Home from './views/Home';

import UserContextProvider from './contexts/UserContext';
import awsconfig from "./aws-exports";
import Amplify from '@aws-amplify/core';
Amplify.configure(awsconfig);

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
          {/* <Layout> */}
            <Route path="/home">
              <Home />
            </Route>  
            <Route path="/">
              <SignIn />
            </Route>
          {/* </Layout> */}
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

// export default withAuthenticator(App);
export default App;
