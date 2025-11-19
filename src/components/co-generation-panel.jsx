import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function CoGenerationPanel({ generated, onUpdate }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (index, prevText) => {
    setEditingIndex(index);
    setEditText(prevText);
  };

  const saveEdit = (index) => {
    const updated = [...generated];
    updated[index].description = editText;
    onUpdate(updated);
    setEditingIndex(null);
  };

  return (
    <Card className="p-6 shadow-md bg-card border border-primary/20 space-y-4">
      <h3 className="font-semibold text-lg text-foreground mb-2">
        Generated Course Outcomes
      </h3>

      {!generated || generated.length === 0 ? (
        <div className="text-center text-muted-foreground py-6">
          Click "Generate COs" to create outcomes.
        </div>
      ) : (
        <div className="space-y-4">
          {generated.map((co, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/60 transition"
            >
              <div className="font-semibold text-primary">{co.coID} → {co.mappedPO}</div>

              {editingIndex === index ? (
                <>
                  <textarea
                    className="w-full border rounded-md p-2 mt-2 text-sm"
                    rows={3}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button className="px-3 py-1" onClick={() => saveEdit(index)}>
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="px-3 py-1"
                      onClick={() => setEditingIndex(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-foreground mt-2">{co.description}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 flex items-center gap-1"
                    onClick={() => startEdit(index, co.description)}
                  >
                    <Pencil size={16} /> Edit
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
