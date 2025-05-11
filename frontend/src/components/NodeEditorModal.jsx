
import React, { useState } from "react";
import { Dialog,DialogContent,DialogTitle,DialogFooter } from "./ui/dialog";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/label";

export default function NodeEditorModal({ open, node, onClose, onSave }) {
  const [form, setForm] = useState(node.data.details);

  // For segment node: dynamic form for rules
  const handleSegmentChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      rules: {
        ...prev.rules,
        [field]: value
      }
    }));
  };

  // For message/delay nodes: simple fields
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>
        Edit {node.data.label}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {node.data.type === "segment" ? (
            <>
              <Label>Spend (₹)</Label>
              <Input
                type="number"
                value={form.rules?.spend || ""}
                onChange={e => handleSegmentChange("spend", e.target.value)}
                placeholder="e.g., 10000"
              />
              <Label>Visits</Label>
              <Input
                type="number"
                value={form.rules?.visits || ""}
                onChange={e => handleSegmentChange("visits", e.target.value)}
                placeholder="e.g., 3"
              />
              <Label>Last Active (ISO date)</Label>
              <Input
                type="date"
                value={form.rules?.lastActive?.slice(0,10) || ""}
                onChange={e => handleSegmentChange("lastActive", e.target.value)}
              />
            </>
          ) : node.data.type === "message" ? (
            <>
              <Label>Message</Label>
              <Input
                type="text"
                value={form.text || ""}
                onChange={e => handleChange("text", e.target.value)}
                placeholder="Enter campaign message"
              />
            </>
          ) : node.data.type === "delay" ? (
            <>
              <Label>Delay (days)</Label>
              <Input
                type="number"
                value={form.days || ""}
                onChange={e => handleChange("days", e.target.value)}
                placeholder="e.g., 3"
              />
            </>
          ) : null}
          <DialogFooter>
            <Button type="submit">Save</Button>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
