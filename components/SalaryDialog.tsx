import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AggregatedData } from '@/lib/utils'

interface JobTitlesDialogProps {
  selectedYear: string | null
  data: AggregatedData[]
  onClose: () => void
}

export function JobTitlesDialog({ selectedYear, data, onClose }: JobTitlesDialogProps) {
  return (
    <Dialog open={selectedYear !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col bg-black text-white dark:bg-white dark:text-black">
        <DialogHeader>
          <DialogTitle>Job Titles for {selectedYear}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedYear && Object.entries(data.find(d => d.year === selectedYear)?.jobTitles || {}).map(([title, count]) => (
                <TableRow key={title}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}