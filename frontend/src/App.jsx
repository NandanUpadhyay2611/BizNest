// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AICampaignBuilderPage from "./components/AICampaignBuilderPage";
import CampaignHistoryPage from "./pages/CampaignHistoryPage";
import LoginButton from "./components/LoginButton";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import DynamicRuleBuilderPage from "./components/DynamicRuleBuilderPage";

function App() {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<LandingPage />} />

  <Route
    path="/home"
    element={
      <ProtectedRoute>
        <AICampaignBuilderPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/history"
    element={
      <ProtectedRoute>
        <CampaignHistoryPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/dynamic"
    element={
      <ProtectedRoute>
        <DynamicRuleBuilderPage />
      </ProtectedRoute>
    }
  />
</Routes>
    </Router>
  );
}

export default App;
