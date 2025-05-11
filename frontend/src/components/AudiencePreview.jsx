import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";


export default function AudiencePreview({ rules }) {
  const {user}=useAuth();
  const [audienceSize, setAudienceSize] = useState(null);

  useEffect(() => {
    if (!rules) return;
    
    axios.post("http://localhost:3000/api/segments/preview", {rules} , {
  headers: { Authorization: `Bearer ${user?.token}` }} 
    )
      .then(res => setAudienceSize(res.data.audienceSize))
      .catch(() => setAudienceSize(null));
  }, [rules]);

  return (
    <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded shadow text-sm">
      {audienceSize !== null ? `Estimated audience: ${audienceSize}` : "Audience preview"}
    </div>
  );
}
