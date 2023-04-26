import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//
import AsideMenu from "../components/core/AsideMenu";

// Pages
import Dashboard from "../pages/Dashboard";
import CustomersList from "../pages/Customers/index";

class Default extends Component {
  state = {};
  render() {
    return (
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
    );
  }
}

export default Default;
