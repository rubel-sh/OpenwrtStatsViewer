import React from 'react';
import Home from "./Home";
import Router from "./Router"
import ClientLists from "./ClientLists";

import { Route, Redirect, Switch } from 'react-router-dom';
function Body() {
    return (
        <div>
            <Switch>
                <Route path="/OpenwrtStatsViewer" exact component={Home} />
                <Route path="/OpenwrtStatsViewer/clientlists" exact component={ClientLists} />
                <Route path="/OpenwrtStatsViewer/router" exact component={Router} />
                <Redirect from="/" to="/OpenwrtStatsViewer/home" />
            </Switch>
        </div>
    );
}

export default Body;