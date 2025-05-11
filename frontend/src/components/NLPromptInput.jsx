
import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import axios from "axios"; 
import { useAuth } from "@/contexts/AuthContext";



export default function NLPromptInput({ setAICampaign }) {
  const {user} = useAuth();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("generate campaign: ",user?.name);
      
      const res = await axios.post(
        "http://localhost:3000/api/ai/generate-campaign", 
        { prompt }, {
  headers: { Authorization: `Bearer ${user?.token}` }} 
      );
      setAICampaign(res.data);
    } catch (err) {
      alert("AI failed to generate campaign. Try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Describe your campaign goal..."
        className="flex-1"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button>
    </form>
  );
}
