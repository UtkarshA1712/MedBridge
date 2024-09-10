'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { ChevronRight, Heart, Activity, User } from 'lucide-react'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; 

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

const LoginPage = ({onSwitch}: { onSwitch: () => void }) => {
  const [activeTab, setActiveTab] = useState("doctor")
  const welcomeText = useTypingEffect("Welcome to MediBase", 100)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>, userType: string) => {
    e.preventDefault();
    
    try {
      if (userType === "doctor") {
        const doctorEmail = e.currentTarget.did.value;
        const password = e.currentTarget.dpwd.value;
        const userCredential = await signInWithEmailAndPassword(auth, doctorEmail, password);
        const user = userCredential.user;
  
        console.log("Doctor logged in successfully:", user.email);
        alert("Doctor login successful!");
  
      } else if (userType === "patient") {
        const email = e.currentTarget.ploginemail.value;
        const password = e.currentTarget.ploginpwd.value;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
          console.log("Patient logged in successfully:", user.email);      
        }
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message); 
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
            <button onClick={onSwitch}>Register</button>
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
          <p className="text-xl mb-6 text-gray-600">Your comprehensive healthcare management solution</p>
          <motion.div 
            className="flex justify-center md:justify-start space-x-4"
            variants={fadeInUp}
          >
            <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-blue-300">
              Learn More
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="md:w-1/2"
          variants={fadeInUp}
        >
          <Card className="w-full max-w-md mx-auto bg-white bg-opacity-70 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Login</CardTitle>
              <CardDescription className="text-gray-600">Access your MediBase account</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="doctor" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Doctor</TabsTrigger>
                  <TabsTrigger value="patient" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Patient</TabsTrigger>
                </TabsList>
                <TabsContent value="doctor">
                  <form id="doctor-login-form" className="space-y-4" onSubmit={(e) => handleLogin(e, 'doctor')}>
                    <div>
                      <Label htmlFor="dname" className="text-gray-700">Full Name</Label>
                      <Input id="dname" name="dname" required className="bg-white border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="did" className="text-gray-700">Doctor ID</Label>
                      <Input id="did" name="did" required className="bg-white border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="dpwd" className="text-gray-700">Password</Label>
                      <Input id="dpwd" name="dpwd" type="password" required className="bg-white border-gray-300" />
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="patient">
                  <form id="patient-login-form" className="space-y-4" onSubmit={(e) => handleLogin(e, 'patient')}>
                    <div>
                      <Label htmlFor="ploginname" className="text-gray-700">Patient Name</Label>
                      <Input id="ploginname" name="ploginname" required className="bg-white border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="ploginid" className="text-gray-700">Patient ID</Label>
                      <Input id="ploginid" name="ploginid" required className="bg-white border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="ploginemail" className="text-gray-700">Patient Email</Label>
                      <Input id="ploginemail" name="ploginemail" required className="bg-white border-gray-300" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                      <Label htmlFor="ploginpwd" className="text-gray-700">Password</Label>
                      <Input id="ploginpwd" name="ploginpwd" type="password" required className="bg-white border-gray-300" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
            <Button variant="link" className="text-blue-600 hover:text-blue-800">Forgot password?</Button>
            <Button type="submit" form={activeTab === "doctor" ? "doctor-login-form" : "patient-login-form"} className="bg-blue-600 text-white hover:bg-blue-700">Log in <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      <motion.section 
        id="about" 
        className="py-20 mt-20 bg-white bg-opacity-70 backdrop-blur-md"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose MediBase?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Patient-Centric Care", description: "Prioritizing patient needs with easy access to medical records and personalized care plans." },
              { icon: Activity, title: "Advanced Analytics", description: "Utilizing cutting-edge NLP and image recognition for accurate diagnoses and treatment recommendations." },
              { icon: User, title: "Seamless Collaboration", description: "Facilitating smooth communication between patients, doctors, and healthcare providers." }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeInUp}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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
export default LoginPage;