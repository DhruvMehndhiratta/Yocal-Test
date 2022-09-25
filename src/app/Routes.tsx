import { BrowserRouter as Router, Route } from "react-router-dom";

import TicketDetails from "./pages/TicketDetails";
import Listing from "./pages/Listing";

const Routes = () => {
  return (
    <Router>
        <Route path="/ticket-detail" exact>
          <TicketDetails />
        </Route>
        <Route path="/" exact>
          <Listing />
        </Route>
    </Router>
  );
};
export default Routes;
