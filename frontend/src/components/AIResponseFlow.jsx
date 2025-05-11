import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import NodeEditorModal from "./NodeEditorModal";

function campaignToFlow(aiCampaign) {
  if (!aiCampaign) return { nodes: [], edges: [] };
  const nodes = [];
  const edges = [];
  
  nodes.push({
    id: "segment",
    type: "default",
    position: { x: 50, y: 150 },
    data: { label: "Segment", details: aiCampaign.segment, type: "segment" },
    style: { background: "#e0f2fe", border: "2px solid #0284c7" }
  });

  // Steps (message, delay, etc.)
  let prevId = "segment";
  aiCampaign.steps?.forEach((step, idx) => {
    const nodeId = `step-${idx}`;
    nodes.push({
      id: nodeId,
      type: "default",
      position: { x: 250 + idx * 180, y: 150 },
      data: {
        label: step.type.charAt(0).toUpperCase() + step.type.slice(1),
        details: step,
        type: step.type
      },
      style: {
        background:
          step.type === "message"
            ? "#dcfce7"
            : step.type === "delay"
            ? "#fef9c3"
            : "#f3e8ff",
        border:
          step.type === "message"
            ? "2px solid #22c55e"
            : step.type === "delay"
            ? "2px solid #eab308"
            : "2px solid #a21caf"
      }
    });
    edges.push({
      id: `e-${prevId}-${nodeId}`,
      source: prevId,
      target: nodeId,
      animated: true
    });
    prevId = nodeId;
  });

  return { nodes, edges };
}

export default function AIResponseFlow({ aiCampaign, setAICampaign }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null);

  const { nodes, edges } = useMemo(() => campaignToFlow(aiCampaign), [aiCampaign]);

  const onNodeClick = useCallback((event, node) => {
    setEditingNode(node);
    setModalOpen(true);
  }, []);

  const handleNodeUpdate = (updatedDetails) => {
    if (!editingNode) return;
    if (editingNode.data.type === "segment") {
      setAICampaign((old) => ({
        ...old,
        segment: { ...old.segment, ...updatedDetails }
      }));
    } else if (editingNode.data.type === "message" || editingNode.data.type === "delay") {
      setAICampaign((old) => ({
        ...old,
        steps: old.steps.map((step, idx) =>
          `step-${idx}` === editingNode.id ? { ...step, ...updatedDetails } : step
        )
      }));
    }
    setModalOpen(false);
    setEditingNode(null);
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={onNodeClick}
        panOnScroll
        zoomOnScroll
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {editingNode && (
        <NodeEditorModal
          open={modalOpen}
          node={editingNode}
          onClose={() => setModalOpen(false)}
          onSave={handleNodeUpdate}
        />
      )}
    </div>
  );
}
