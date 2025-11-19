import { Card } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';


export default function SyllabusInput({
  syllabus,
  setSyllabus,
}) {
  return (
    <Card className="p-4 border-2 border-border">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Paste Syllabus</h3>
      </div>
      <textarea
        rows={6}
        value={syllabus}
        onChange={(e) => setSyllabus(e.target.value)}
        className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        placeholder="Paste the syllabus or course module descriptions here..."
      />
    </Card>
  );
}
