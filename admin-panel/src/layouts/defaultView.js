import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Redirect,
} from "react-router-dom";

// //
import AsideMenu from "../components/core/AsideMenu";

// Pages
import Dashboard from "../pages/Dashboard";
import CustomersList from "../pages/Customers/index";

const defaultView = () => {
  return (
    <>
      <div className="dashboard">
        <Router>
          <AsideMenu />
          <main className="dashboard__content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<CustomersList />} />
            </Routes>
          </main>
        </Router>
      </div>
    </>
  );
};

export default defaultView;