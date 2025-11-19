import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';


export default function PoUploadSection({
  handleFile,
  downloadTemplate,
  fileName,
}) {
  return (
    <Card className="p-4 border-2 border-border">
      <div className="flex items-center gap-2 mb-3">
        <Upload className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Upload PO Excel</h3>
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        Upload Excel with{" "}
        <strong className="text-foreground">PO Code</strong> and{" "}
        <strong className="text-foreground">PO Description</strong> columns
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFile}
            className="text-sm flex-1"
          />
        </div>

        <Button
          onClick={downloadTemplate}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Download Template
        </Button>

        {fileName && (
          <div className="p-2 bg-primary/5 border border-primary/20 rounded text-xs text-foreground">
            ✓ File loaded: <strong>{fileName}</strong>
          </div>
        )}
      </div>
    </Card>
  );
}
