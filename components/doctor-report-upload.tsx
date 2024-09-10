'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const DoctorReportUpload = ({onSwitch}: {onSwitch: (page: string) => void}) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-800 py-12 px-4"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="max-w-4xl mx-auto bg-white bg-opacity-70 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Patient Report Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="patientId" className="text-gray-700">Patient ID</Label>
                <Input id="patientId" name="patientId" required className="bg-white border-gray-300" />
              </div>
              <div>
                <Label htmlFor="patientName" className="text-gray-700">Patient Name</Label>
                <Input id="patientName" name="patientName" required className="bg-white border-gray-300" />
              </div>
            </div>
            <div>
              <Label htmlFor="symptoms" className="text-gray-700">Symptoms</Label>
              <Textarea id="symptoms" name="symptoms" required className="bg-white border-gray-300 min-h-[100px]" />
            </div>
            <div>
              <Label htmlFor="reportAnalysis" className="text-gray-700">Report Analysis</Label>
              <Textarea id="reportAnalysis" name="reportAnalysis" required className="bg-white border-gray-300 min-h-[100px]" />
            </div>
            <div>
              <Label htmlFor="uploadType" className="text-gray-700">Upload Type</Label>
              <Select name="uploadType">
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select upload type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scan">Scan</SelectItem>
                  <SelectItem value="xray">X-Ray</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="file" className="text-gray-700">Upload File</Label>
              <div className="mt-1 flex items-center">
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  className="bg-white border-gray-300"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="uploadAnalysis" className="text-gray-700">Upload Analysis</Label>
              <Textarea id="uploadAnalysis" name="uploadAnalysis" className="bg-white border-gray-300 min-h-[100px]" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 w-full">
            Submit Report <Upload className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
};

export default DoctorReportUpload;