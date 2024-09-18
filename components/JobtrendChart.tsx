import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { AggregatedData } from '@/lib/utils'

export function JobtrendChart({ data }: { data: AggregatedData[] }) {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="year" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="totalJobs" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}