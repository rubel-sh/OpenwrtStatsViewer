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
                <Route path="/OpenwrtStatsViewer" exact component={Home} />
                <Route path="/OpenwrtStatsViewer/speed" exact component={Speed} />
                <Route path="/OpenwrtStatsViewer/totalusage" exact component={TotalSpeed} />
                <Route path="/OpenwrtStatsViewer/clientlists" exact component={ClientLists} />
                <Redirect from="/" to="/OpenwrtStatsViewer/home" />
            </Switch>
        </div>
    );
}

export default Body;