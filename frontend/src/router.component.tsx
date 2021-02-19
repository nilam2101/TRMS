import React from 'react';
import { Route,Switch } from 'react-router-dom';
import ClaimForm from './ClaimForm';
import Login from './login';



export default function RouterComponent() {
   
    return (
        <div>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/app"><ClaimForm /></Route>  
        </Switch>
        </div>
    );
}
