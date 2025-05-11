import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function CampaignHistoryPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user}=useAuth();
  const navigate = useNavigate();

  useEffect(() => {
   
    
    axios.get("https://biznest-4q06.onrender.com/api/campaigns",{
  headers: { Authorization: `Bearer ${user.token}` }} ).then(res => {
      setCampaigns(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (campaigns.length === 0)
    return <div className="text-center mt-10 text-gray-500">No campaigns found yet.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-blue-900">Campaign History</h2>
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {campaigns.map((c, idx) => (
          <Card
            key={c._id}
            className="w-full rounded-xl shadow-lg p-6 bg-white/95 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex gap-3 items-center mb-2">
                <Badge variant="outline" className="text-blue-700 border-blue-500">
                  {c.suggestions?.tag || "Campaign"}
                </Badge>
                <span className="text-gray-400 text-xs">
                  {format(new Date(c.createdAt), "MMM d, yyyy h:mm a")}
                </span>
              </div>
              <div className="font-semibold text-lg mb-1">
                {c.suggestions?.ctas?.[0] || c.suggestions?.tag || "Untitled Campaign"}
              </div>
              {c.suggestions?.summary && (
  <div className="italic text-green-700 text-sm mb-2">{c.suggestions.summary}</div>
)}

              <div className="text-gray-600 text-sm mb-2">
                Segment: {c.segmentId?.rules
                  ? JSON.stringify(c.segmentId.rules)
                  : "N/A"}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 min-w-[140px]">
              <div className="flex gap-3">
                <span className="text-blue-900 font-bold">
                  Sent: {c.stats?.sent ?? 0}
                </span>
                <span className="text-red-700 font-bold">
                  Failed: {c.stats?.failed ?? 0}
                </span>
              </div>
              <span className="text-gray-500 text-xs">
                Audience: {c.stats?.audienceSize ?? 0}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
