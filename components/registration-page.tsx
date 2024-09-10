'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { setLogLevel } from "firebase/app";
setLogLevel('debug');

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

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

const RegistrationPage = ({ onSwitch }: { onSwitch: (page: string) => void }) => {
  const welcomeText = useTypingEffect("Join MediBase Today", 100)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await set(ref(db, 'users/' + patientId), {
        name: name,
        email: email,
        patientId: patientId,
      });
      console.log("User registered and data saved successfully.");
      setError("");
    } catch (error: any) {
      setError("Registration failed: " + error.message);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-800"
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      <motion.header 
        className="bg-white bg-opacity-70 backdrop-blur-md border-b border-gray-200 p-4 sticky top-0 z-10"
        variants={fadeInUp}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div 
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              MB
            </motion.div>
            <h1 className="text-2xl font-bold">
              <span className="text-blue-600">Medi</span>
              <span className="text-gray-800">Base</span>
            </h1>
          </Link>
          <nav className="space-x-4">
            <button onClick={() => onSwitch("login")}>Login</button>
            <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
          </nav>
        </div>
      </motion.header>

      <main className="container mx-auto mt-20 p-4 flex flex-col md:flex-row items-center justify-center gap-12">
        <motion.div 
          className="md:w-1/2 text-center md:text-left"
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 min-h-[3.5rem]">{welcomeText}</h2>
          <p className="text-xl mb-6 text-gray-600">Create your account and start managing your healthcare journey</p>
        </motion.div>

        <motion.div 
          className="md:w-1/2"
          variants={fadeInUp}
        >
          <Card className="w-full max-w-md mx-auto bg-white bg-opacity-70 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Register</CardTitle>
              <CardDescription className="text-gray-600">Please enter the patient details below.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="registration-form" className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Patient Name</Label>
                  <Input id="name" name="name" required className="bg-white border-gray-300" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input id="email" name="email" type="email" required className="bg-white border-gray-300" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input id="password" name="password" type="password" required className="bg-white border-gray-300" />
                </div>
                <div>
                  <Label htmlFor="repeat-password" className="text-gray-700">Repeat Password</Label>
                  <Input id="repeat-password" name="repeat-password" type="password" required className="bg-white border-gray-300" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="patient-id" className="text-gray-700">Patient ID (Given by Hospital)</Label>
                  <Input id="patient-id" name="patient-id" required className="bg-white border-gray-300" onChange={(e) => setPatientId(e.target.value)} />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="link" className="text-blue-600 hover:text-blue-800">Already have an account?</Button>
              <Button type="submit" form="registration-form" className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleRegister}>
                Register <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <motion.footer 
        className="bg-blue-800 text-white py-8 mt-20"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">MediBase</h3>
              <p className="text-blue-200">Revolutionizing healthcare management</p>
            </div>
            <nav className="flex space-x-4">
              <Link href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-blue-200 hover:text-white transition-colors">Contact Us</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} MediBase. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default RegistrationPage;