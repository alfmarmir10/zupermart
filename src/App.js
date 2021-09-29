import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './views/SignIn';
import Home from './views/Home';

import UserContextProvider from './contexts/UserContext';


function App() {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route>
            <SignIn />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
