import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/Button";
import { Switch } from "./ui/switch";
import { Input } from "./ui/Input";
import NLPromptInput from "./NLPromptInput";
import AIResponseFlow from "./AIResponseFlow";
import AudiencePreview from "./AudiencePreview";
import SaveCampaignButton from "./SaveCampaignButton";
import CodeView from "./CodeView";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { ClockFading, Users, ShoppingCart, Megaphone } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

export default function AICampaignBuilderPage() {
const [aiCampaign, setAICampaign] = useState(null);
const [showCode, setShowCode] = useState(false);
const [stats, setStats] = useState({ audience: 0, sales: 0, campaigns: 0 });
const navigate = useNavigate();
const [activeBuilder, setActiveBuilder] = useState("ai");
const {user}=useAuth();

useEffect(() => {
  async function fetchStats() {
    try {
      const [aud, sales, camp] = await Promise.all([
        axios.get("https://biznest-4q06.onrender.com/api/customers/total",{
  headers: { Authorization: `Bearer ${user?.token}` }} ).then(r => r.data),
        axios.get("https://biznest-4q06.onrender.com/api/orders/total-sales",{
  headers: { Authorization: `Bearer ${user?.token}` }} ).then(r => r.data),
        axios.get("https://biznest-4q06.onrender.com/api/campaigns/total",{
  headers: { Authorization: `Bearer ${user?.token}` }} ).then(r => r.data),
      ]);
      setStats({
        audience: aud.total || 0,
        sales: sales.totalSales || 0,
        campaigns: camp.total || 0,
      });
    } catch {}
  }
  fetchStats();
}, []);

return (
<div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
<Header />

<div className="flex justify-center mt-6 mb-2">
  <div className="flex rounded-lg bg-gray-100 shadow overflow-hidden animate-fade-in">
    <button
      className={`px-5 py-2 font-semibold transition-all duration-200 focus:outline-none ${activeBuilder === "ai" ? "bg-blue-600 text-white shadow-md scale-105" : "text-gray-700 hover:bg-blue-100"}`}
      onClick={() => { setActiveBuilder("ai"); }}
      style={{ borderRight: "1px solid #e5e7eb" }}
    >
      Natural Language
    </button>
    <button
      className={`px-5 py-2 font-semibold transition-all duration-200 focus:outline-none ${activeBuilder === "rule" ? "bg-green-600 text-white shadow-md scale-105" : "text-gray-700 hover:bg-green-100"}`}
      onClick={() => { setActiveBuilder("rule"); navigate("/dynamic"); }}
    >
      Rule Builder
    </button>
  </div>
</div>
{/* Bento Dashboard */}
<div className="w-full flex justify-center mt-4 mb-2 animate-fade-in">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
    <div className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-100 to-blue-50 p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in">
      <Users className="w-8 h-8 text-blue-500 mb-2 animate-fade-in" />
      <span className="text-2xl font-bold text-blue-900 animate-fade-in">{stats.audience}</span>
      <span className="text-sm text-blue-700 mt-1 animate-fade-in">Total Audience</span>
    </div>
    <div className="rounded-2xl shadow-lg bg-gradient-to-br from-green-100 to-green-50 p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in">
      <ShoppingCart className="w-8 h-8 text-green-500 mb-2 animate-fade-in" />
      <span className="text-2xl font-bold text-green-900 animate-fade-in">₹{stats.sales.toLocaleString()}</span>
      <span className="text-sm text-green-700 mt-1 animate-fade-in">Total Sales</span>
    </div>
    <div className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-100 to-purple-50 p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in">
      <Megaphone className="w-8 h-8 text-purple-500 mb-2 animate-fade-in" />
      <span className="text-2xl font-bold text-purple-900 animate-fade-in">{stats.campaigns}</span>
      <span className="text-sm text-purple-700 mt-1 animate-fade-in">Total Campaigns</span>
    </div>
  </div>
</div>
<div className="flex-1 flex flex-col items-center justify-center">
<Card className="w-full max-w-2xl shadow-xl rounded-xl p-8 bg-white/90">
<h1 className="text-3xl font-bold mb-2 text-center text-blue-900 drop-shadow">
Build Your Campaign
</h1>
<p className="text-center text-gray-600 mb-6">
Describe your campaign in plain language. AI will generate a visual, editable flow.
</p>
<NLPromptInput setAICampaign={setAICampaign} />
</Card>

<Button
className="mt-8 px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold flex items-center gap-2 text-lg hover:scale-105 transition-transform"
onClick={() => navigate("/history")}
>
<ClockFading className="w-5 h-5" />
Show Campaign History
</Button>

{/* Campaign Flow Section */}
{aiCampaign && (
<div className="w-full max-w-5xl flex flex-col items-center gap-6 animate-fade-in mt-10">
<div className="flex flex-col sm:flex-row justify-between w-full items-center mb-2">
<AudiencePreview rules={aiCampaign.segment?.rules} />
<div className="flex items-center gap-2 mt-2 sm:mt-0">
<span className="text-sm">Show Logic</span>
<Switch checked={showCode} onCheckedChange={setShowCode} className="bg-gray-700 data-[state=checked]:bg-green-600"/>
</div>
</div>
<div className="w-full bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 min-h-[420px]">
{!showCode ? (
<AIResponseFlow
aiCampaign={aiCampaign}
setAICampaign={setAICampaign}
/>
) : (
<CodeView aiCampaign={aiCampaign} />
)}
</div>
<div className="w-full flex justify-end">
<SaveCampaignButton aiCampaign={aiCampaign} />
</div>
</div>
)}
</div>
</div>
);
}