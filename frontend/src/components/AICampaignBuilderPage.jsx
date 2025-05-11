import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/Button";
import { Switch } from "./ui/switch";
import { Input } from "./ui/Input";
import NLPromptInput from "./NLPromptInput";
import AIResponseFlow from "./AIResponseFlow";
import AudiencePreview from "./AudiencePreview";
import SaveCampaignButton from "./SaveCampaignButton";
import CodeView from "./CodeView";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import { ClockFading } from "lucide-react";

export default function AICampaignBuilderPage() {
  const [aiCampaign, setAICampaign] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <Header />
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
                <Switch checked={showCode} onCheckedChange={setShowCode}  className="bg-gray-700 data-[state=checked]:bg-green-600"/>
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
