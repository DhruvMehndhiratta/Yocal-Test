import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import TicketDetails from "./pages/TicketDetails";
import Listing from "./pages/Listing";

const Routes = () => {
  console.log(Route,  Router, TicketDetails, Listing)
  return (
    <Router>
      {/* <Switch> */}
        <Route path="/ticket-detail">
          <TicketDetails />
        </Route>
        <Route path="/">
          <Listing />
        </Route>
      {/* </Switch> */}
    </Router>
  );
};
export default Routes;
