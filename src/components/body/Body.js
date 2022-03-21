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
                <Route path="/OpenwrtStatesViewer/home" exact component={Home} />
                <Route path="/OpenwrtStatesViewer/speed" exact component={Speed} />
                <Route path="/OpenwrtStatesViewer/totalusage" exact component={TotalSpeed} />
                <Route path="/OpenwrtStatesViewer/clientlists" exact component={ClientLists} />
                <Redirect from="/" to="/OpenwrtStatesViewer/home" />
            </Switch>
        </div>
    );
}

export default Body;