import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Check, X } from 'lucide-react';

export default function PoTable({
  pos,
  editingId,
  editValues,
  setEditValues,
  startEdit,
  saveEdit,
  cancelEdit,
  deletePo,
}) {
  return (
    <Card className="p-4 border-2 border-border">
      <h3 className="font-semibold text-foreground mb-3">Mapped POs</h3>

      {pos.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No POs uploaded yet
        </p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {pos.map((po) => (
            <div
              key={po.id}
              className="p-3 border border-border rounded-md bg-card hover:bg-muted/50 transition-colors"
            >
              {editingId === po.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editValues.code}
                    onChange={(e) =>
                      setEditValues({ ...editValues, code: e.target.value })
                    }
                    className="w-full border border-border rounded px-2 py-1 text-sm bg-background text-foreground"
                    placeholder="PO Code"
                  />
                  <textarea
                    value={editValues.desc}
                    onChange={(e) =>
                      setEditValues({ ...editValues, desc: e.target.value })
                    }
                    className="w-full border border-border rounded px-2 py-1 text-sm bg-background text-foreground resize-none"
                    rows={2}
                    placeholder="PO Description"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => saveEdit(po.id)}
                      className="flex-1 h-8"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelEdit}
                      className="flex-1 h-8"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">
                      {po.code}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {po.desc}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(po.id, po.code, po.desc)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deletePo(po.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
