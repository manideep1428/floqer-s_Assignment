import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface AggregatedData {
  year: string
  totalJobs: number
  averageSalary: number
  jobTitles: { [key: string]: number }
}

export interface SalaryData {
  work_year: string;
  experience_level: string;
  employment_type: string;
  job_title: string;
  salary: string;
  salary_currency: string;
  salary_in_usd: string;
  employee_residence: string;
  remote_ratio: string;
  company_location: string;
  company_size: string;
}

export const aggregateData = (data: SalaryData[]): AggregatedData[] => {
  const aggregated = data.reduce((acc, curr) => {
    const year = curr.work_year
    if (!acc[year]) {
      //@ts-expect-error eee
      acc[year] = { year, totalJobs: 0, totalSalary: 0, jobTitles: {} }
    }
    acc[year].totalJobs += 1
    acc[year].totalSalary += parseInt(curr.salary_in_usd)
    acc[year].jobTitles[curr.job_title] = (acc[year].jobTitles[curr.job_title] || 0) + 1
    return acc
  }, {} as Record<string, AggregatedData & { totalSalary: number }>)

  return Object.values(aggregated).map(({ totalSalary, ...rest }) => ({
    ...rest,
    averageSalary: Math.round(totalSalary / rest.totalJobs)
  }))
}