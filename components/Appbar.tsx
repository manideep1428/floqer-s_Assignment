import React from 'react'
import { Github, Linkedin, Mail, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from './ThemeToggle'

const data = {
    name : "Manideep",
    githubUrl : "https://github.com/manideep1428",
    linkedinUrl : "https://www.linkedin.com/in/sai-manideep-cherukuri-856b6927a",
    email :  "saimanideep.ch12345@gmail.com",
    website : "https://portfolio-rho-self-26.vercel.app/"
}


export default function AppBar() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
      <h1 className="text-2xl font-bold mb-4">ML Engineer Salary Dashboard</h1>
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={`mailto:${data.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={data.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
              <Globe className="h-5 w-5" />
            </a>
          </Button>
        </nav>
        <ModeToggle/>
      </div>
    </header>
  )
}