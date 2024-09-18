import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { AggregatedData } from '@/lib/utils'
import { JobtrendChart } from './JobtrendChart'

interface SalaryTableProps {
  data: AggregatedData[]
  sortConfig: { key: keyof AggregatedData; direction: 'asc' | 'desc' } | null
  requestSort: (key: keyof AggregatedData) => void
  setSelectedYear: (year: string) => void
}

export function SalaryDashBoardTable({ data, sortConfig, requestSort, setSelectedYear }: SalaryTableProps) {
  const getSortIcon = (key: keyof AggregatedData) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  return (
    <Table>
      <TableHeader className='text-xl'>
        <TableRow className='hover:bg-black'>
          <TableHead className="w-1/3">
            <Button variant="ghost" onClick={() => requestSort('year')}>
              Year {getSortIcon('year')}
            </Button>
          </TableHead>
          <TableHead className="w-1/3">
            <Button variant="ghost" onClick={() => requestSort('totalJobs')}>
              Number of Jobs {getSortIcon('totalJobs')}
            </Button>
          </TableHead>
          <TableHead className="w-1/3">
            <Button variant="ghost" onClick={() => requestSort('averageSalary')}>
              Average Salary (USD) {getSortIcon('averageSalary')}
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className='hover:bg-black'>
          <TableCell colSpan={3}>
            <JobtrendChart data={data} />
          </TableCell>
        </TableRow>
        {data.map((row) => (
          <TableRow key={row.year} className="cursor-pointer hover:bg-gray-900" onClick={() => setSelectedYear(row.year)}>
            <TableCell>{row.year}</TableCell>
            <TableCell>{row.totalJobs}</TableCell>
            <TableCell>${row.averageSalary.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}