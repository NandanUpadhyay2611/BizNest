import React from "react";

export default function CodeView({ aiCampaign }) {
  return (
    <pre className="w-full bg-gray-100 rounded p-4 text-xs overflow-x-auto">
      {JSON.stringify(aiCampaign, null, 2)}
    </pre>
  );
}
