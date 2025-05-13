import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import AudiencePreview from "./AudiencePreview";
import SaveCampaignButton from "./SaveCampaignButton";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Users, ShoppingCart, Megaphone } from "lucide-react";

const FIELDS = [
  { label: "Amount Spent (₹)", value: "spend", type: "number" },
  { label: "Visits", value: "visits", type: "number" },
  { label: "Last Active", value: "lastActive", type: "date" },
];
const OPERATORS = [">", ">=", "<", "<=", "="];

function emptyRule() {
  return { field: "spend", operator: ">", value: "" };
}

function buildRuleTree(rules, groupOperator) {
  if (rules.length === 1) {
    return rules[0];
  }
  return {
    type: "group",
    operator: groupOperator,
    children: rules,
  };
}

export default function DynamicRuleBuilderPage() {
  const [rules, setRules] = useState([emptyRule()]);
  const [groupOperator, setGroupOperator] = useState("AND");
  const [segmentName, setSegmentName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [activeBuilder, setActiveBuilder] = useState("rule");

  const handleRuleChange = (idx, key, value) => {
    setRules((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r))
    );
  };
  const addRule = () => setRules((prev) => [...prev, emptyRule()]);
  const removeRule = (idx) => setRules((prev) => prev.filter((_, i) => i !== idx));

  // Build rules tree for backend
  const ruleTree = buildRuleTree(rules, groupOperator);
  const steps = message.trim() ? [{ type: "message", text: message.trim() }] : [];
  const aiCampaign = {
    segment: { name: segmentName, rules: ruleTree },
    steps,
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-blue-100 flex flex-col">
      <Header />
      {/* Toggle Switch Button Group */}
      <div className="flex justify-center mt-6 mb-2">
        <div className="flex rounded-lg bg-gray-100 shadow overflow-hidden animate-fade-in">
          <button
            className={`px-5 py-2 font-semibold transition-all duration-200 focus:outline-none ${activeBuilder === "ai" ? "bg-blue-600 text-white shadow-md scale-105" : "text-gray-700 hover:bg-blue-100"}`}
            onClick={() => { setActiveBuilder("ai"); navigate("/home"); }}
            style={{ borderRight: "1px solid #e5e7eb" }}
          >
            Natural Language
          </button>
          <button
            className={`px-5 py-2 font-semibold transition-all duration-200 focus:outline-none ${activeBuilder === "rule" ? "bg-green-600 text-white shadow-md scale-105" : "text-gray-700 hover:bg-green-100"}`}
            onClick={() => { setActiveBuilder("rule"); }}
          >
            Rule Builder
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl shadow-xl rounded-xl p-8 bg-white/90">
          <h1 className="text-3xl font-bold mb-2 text-center text-green-900 drop-shadow">
            Dynamic Rule Builder
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Define your audience segment using flexible rules. Combine conditions with AND/OR.
          </p>
          <div className="mb-4 flex flex-col gap-2">
            <label className="font-semibold">Segment Name</label>
            <Input
              value={segmentName}
              onChange={e => setSegmentName(e.target.value)}
              placeholder="e.g., High Value Inactive Users"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="font-semibold">Message to Send</label>
            <Input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter campaign message"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-2">
              <span className="font-semibold">Combine with:</span>
              <Button
                variant={groupOperator === "AND" ? "default" : "secondary"}
                onClick={() => setGroupOperator("AND")}
              >
                AND
              </Button>
              <Button
                variant={groupOperator === "OR" ? "default" : "secondary"}
                onClick={() => setGroupOperator("OR")}
              >
                OR
              </Button>
            </div>
            {rules.map((rule, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <select
                  className="border rounded px-2 py-1"
                  value={rule.field}
                  onChange={e => handleRuleChange(idx, "field", e.target.value)}
                >
                  {FIELDS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
                <select
                  className="border rounded px-2 py-1"
                  value={rule.operator}
                  onChange={e => handleRuleChange(idx, "operator", e.target.value)}
                >
                  {OPERATORS.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                <Input
                  type={FIELDS.find(f => f.value === rule.field)?.type || "text"}
                  value={rule.value}
                  onChange={e => handleRuleChange(idx, "value", e.target.value)}
                  placeholder="Value"
                  className="w-28"
                />
                {rules.length > 1 && (
                  <Button variant="secondary" onClick={() => removeRule(idx)}>-</Button>
                )}
              </div>
            ))}
            <Button variant="secondary" onClick={addRule} className="mt-2">+ Add Condition</Button>
          </div>
          <div className="mb-4">
            <AudiencePreview rules={ruleTree} />
          </div>
          <div className="w-full flex justify-end">
            <SaveCampaignButton aiCampaign={aiCampaign} />
          </div>
        </Card>
      </div>
    </div>
  );
} 