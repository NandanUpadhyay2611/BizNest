import React, { useState } from "react";
import { Button } from "./ui/Button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function SaveCampaignButton({ aiCampaign }) {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const {user}=useAuth();

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/segments",
        aiCampaign, {
  headers: { Authorization: `Bearer ${user?.token}` }} 
      );
      alert("Campaign saved! 🎉");
  
     navigate('/history');
    } catch (err) {
      alert("Failed to save campaign.");
    }
    setLoading(false);
  };

  return (
    <Button onClick={handleSave} disabled={!aiCampaign || loading}>
      {loading ? "Saving..." : "Save Campaign"}
    </Button>
  );
}
