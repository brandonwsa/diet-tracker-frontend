import React from 'react';
import './App.css';
//import {useRoutes} from 'hookrouter/dist';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './hooks/Home';
import Users from './hooks/Users';
import NewUser from './hooks/NewUser';
import EditUser from './hooks/EditUser';
import Navbar from './hooks/Navbar';


//const routes: any = {
//    '/': () => <Home />
//    '/users*': () => <Users />
//    '/users/edit/:id': ({ id }) => <EditUsers id={id}/>
//    '/foods*': () => <Food />
//    '/foods/edit/:id': ({ id }) => <EditFood id={id}/>
//}

function App() {

  //const match = useRoutes(routes);

  return (

    <div>
      <Navbar />

      <Router>
          <Route exact path="/" component={Home}/>
          <Route exact path="/users/show-all" component={Users} />
          <Route exact path="/users/new" component={NewUser}/>
          <Route exact path="/users/edit" component={EditUser}/>
      </Router>
    </div>
  );
}

export default App;
