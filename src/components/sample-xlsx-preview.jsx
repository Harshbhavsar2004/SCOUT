import { Card } from "@/components/ui/card";
import { FileSpreadsheet } from 'lucide-react';

export default function SampleXlsxPreview() {
  const sampleData = [
    ["PO Code", "PO Description"],
    ["PO1", "Engineering knowledge"],
    ["PO2", "Problem analysis"],
    ["PO3", "Design/development of solutions"],
    ["PO4", "Conduct investigations"],
    ["PO5", "Modern tool usage"],
  ];

  return (
    <Card className="p-4 border-2 border-primary/20 bg-card">
      <div className="flex items-center gap-2 mb-3">
        <FileSpreadsheet className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Sample PO Template</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary/10 border-b border-border">
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                PO Code
              </th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                PO Description
              </th>
            </tr>
          </thead>
          <tbody>
            {sampleData.slice(1).map((row, idx) => (
              <tr key={idx} className="border-b border-border hover:bg-muted/50">
                <td className="px-3 py-2 font-medium text-foreground">
                  {row[0]}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
