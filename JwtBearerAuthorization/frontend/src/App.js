import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router,
Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import TableComponent from './components/TableComponent';

const App = () => {

  return (<>
      <Navbar/>

      <Switch>
        <Route exact path="/">
            <div className="container">
                <h1>Main</h1>
                <TableComponent/>
            </div>
        </Route>
        <Route exact path="/test">
          <div className="container">
              <h1>Тестова перевірка</h1>
          </div>
        </Route>
        <Route exact path="/login">
            <Login/>
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
      </>
  );
}

export default App;
