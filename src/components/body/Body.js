import React from 'react';
import Home from "./Home";
import Speed from "./Speed";
import TotalSpeed from "./TotalUsage";
import ClientLists from "./ClientLists";

import { Route, Redirect, Switch } from 'react-router-dom';
function Body() {
    return (
        <div>
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/speed" exact component={Speed} />
                <Route path="/totalusage" exact component={TotalSpeed} />
                <Route path="/clientlists" exact component={ClientLists} />
                <Redirect from="/" to="/home" />
            </Switch>
        </div>
    );
}

export default Body;