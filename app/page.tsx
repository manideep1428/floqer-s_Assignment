'use client'

import React, { useState, useEffect } from 'react'
import { aggregateData, AggregatedData } from '@/lib/utils'
import { salaryDataForTask } from '@/data'
import { JobTitlesDialog } from '@/components/SalaryDialog'
import { Chatbot } from '@/components/ChatBot'
import { Bot, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AppBar from '@/components/Appbar'
import { SalaryDashBoardTable } from '@/components/SalaryDashboard'

export default function SalaryDashboard() {
  const [data, setData] = useState<AggregatedData[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: keyof AggregatedData; direction: 'asc' | 'desc' } | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false)
  const [isChatBotSpan, setIsChatBotSpan] = useState<boolean>(true)

  useEffect(() => {
    setData(aggregateData(salaryDataForTask))
  }, [])

  const sortedData = React.useMemo(() => {
    const sortableData = [...data]
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [data, sortConfig])

  const requestSort = (key: keyof AggregatedData) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppBar />
      <div className="container mx-auto p-4 relative">
        <SalaryDashBoardTable
          data={sortedData} 
          sortConfig={sortConfig} 
          requestSort={requestSort} 
          setSelectedYear={setSelectedYear} 
        />
        <JobTitlesDialog
          selectedYear={selectedYear} 
          data={data} 
          onClose={() => setSelectedYear(null)} 
        />
        <div className="fixed bottom-6 right-6 z-50">
          {isChatbotOpen ? (
            <div className="bg-background border border-border rounded-xl shadow-lg flex flex-col">
                <div className='relative p-4 border-b border-border' onClick={toggleChatbot}>
                  <div className='flex justify-center items-center font-sans font-extrabold'>ChatBot</div>
                  <X className="absolute top-4 right-4 h-6 w-6 hover:cursor-pointer"/>
                  <span className="sr-only">Close chatbot</span>
                </div>
                <div className="flex-grow overflow-auto">
                  <Chatbot/>
                </div>
            </div>
          ) : (
            <div className='flex flex-col items-end space-y-2'>
              {isChatBotSpan && (
                <p className='p-2 flex gap-2 bg-background border border-border rounded-xl max-w-xs'>
                  Try Me I will Help Out of Your Doubts 
                  <button 
                    className='flex justify-center items-center hover:bg-muted hover:text-muted-foreground rounded-full p-1'
                    onClick={() => setIsChatBotSpan(false)}
                  >
                    <X className='h-4 w-4'/>
                  </button>
                </p>
              )}
              <div className='flex'>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleChatbot}
                >
                  <Bot className="h-7 w-7" />
                  <span className="sr-only">Open chatbot</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}