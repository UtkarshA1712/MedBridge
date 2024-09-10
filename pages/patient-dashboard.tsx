'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, FileText, Download } from 'lucide-react'

const useTypingEffect = (text: string, delay: number = 100) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    } else {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)
      return () => clearInterval(cursorInterval)
    }
  }, [currentIndex, delay, text])

  return `${displayedText}${showCursor ? '_' : ' '}`
}

interface Appointment {
  id: number
  date: string
  doctor: string
  patientId: string
  patientName: string
  symptoms: string
  reportAnalysis: string
  uploadType: string
  uploadAnalysis: string
  scansAvailable: boolean
  expanded?: boolean
}

const AppointmentCard: React.FC<{ appointment: Appointment; toggleExpand: (id: number) => void }> = ({ appointment, toggleExpand }) => {
  return (
    <Card className="mb-4 bg-white bg-opacity-70 backdrop-blur-md shadow-lg">
      <CardHeader className="cursor-pointer" onClick={() => toggleExpand(appointment.id)}>
        <CardTitle className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-800">{appointment.date}</span>
            <span className="ml-2 text-lg text-gray-700">{appointment.doctor}</span>
          </div>
          {appointment.expanded ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-blue-600" />}
        </CardTitle>
      </CardHeader>
      <AnimatePresence>
        {appointment.expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Patient Information</h3>
                <p className="text-gray-700">ID: {appointment.patientId}</p>
                <p className="text-gray-700">Name: {appointment.patientName}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Symptoms</h3>
                <p className="text-gray-700">{appointment.symptoms}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Report Analysis</h3>
                <p className="text-gray-700">{appointment.reportAnalysis}</p>
              </div>
              {appointment.scansAvailable && (
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Uploaded {appointment.uploadType}</h3>
                  <div className="flex items-center text-blue-600 mb-2">
                    <FileText className="mr-2" size={16} />
                    <span>Scan Available</span>
                  </div>
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    <Download className="mr-2 h-4 w-4" /> Download Scan
                  </Button>
                </div>
              )}
              {appointment.uploadAnalysis && (
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Upload Analysis</h3>
                  <p className="text-gray-700">{appointment.uploadAnalysis}</p>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: "NOV 24",
      doctor: "Dr. Deepti Bhat",
      patientId: "PT001",
      patientName: "Ansh Chauhan",
      symptoms: "Chills, high fever, vomiting, sweating, headache",
      reportAnalysis: "Patient presents with symptoms consistent with a viral infection. Recommend rest, hydration, and over-the-counter fever reducers. Monitor for worsening symptoms.",
      uploadType: "",
      uploadAnalysis: "",
      scansAvailable: false
    },
    {
      id: 2,
      date: "NOV 24",
      doctor: "Dr. Rahul Sharma",
      patientId: "PT001",
      patientName: "Ansh Chauhan",
      symptoms: "Coughing up blood, chills, fever, chest pain, weight loss",
      reportAnalysis: "Symptoms suggest possible pulmonary issue. Chest X-ray ordered to rule out pneumonia or other lung conditions. Blood tests recommended to check for infection markers.",
      uploadType: "X-ray",
      uploadAnalysis: "Chest X-ray shows slight opacity in lower right lung. Consistent with early-stage pneumonia. Recommend course of antibiotics and follow-up in 7 days.",
      scansAvailable: true
    },
    {
      id: 3,
      date: "NOV 24",
      doctor: "Dr. Rakesh Jain",
      patientId: "PT001",
      patientName: "Ansh Chauhan",
      symptoms: "Follow-up appointment for previous symptoms",
      reportAnalysis: "Patient reports improvement in symptoms. Fever has subsided, and cough is less frequent. Continue current treatment plan.",
      uploadType: "Blood Test Results",
      uploadAnalysis: "Blood test results show decreasing levels of infection markers. White blood cell count returning to normal range. Prognosis is positive.",
      scansAvailable: true
    },
  ])

  const toggleExpand = (id: number) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, expanded: !app.expanded } : app
    ))
  }

  const patientName = "Ansh Chauhan"
  const greeting = useTypingEffect(`Welcome ${patientName}!`)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-800 h-16">{greeting}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Here are your recent appointment details:</h2>
        {appointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} toggleExpand={toggleExpand} />
        ))}
      </div>
    </div>
  )
};

export default PatientDashboard;