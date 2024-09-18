'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    if (!name.trim()) {
      toast({ title: "Error", description: "Please enter your name." })
      return false
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({ title: "Error", description: "Please enter a valid email address." })
      return false
    }
    if (!phone.trim() || !/^\+?[0-9]{10,14}$/.test(phone)) {
      toast({ title: "Error", description: "Please enter a valid phone number." })
      return false
    }
    if (!message.trim()) {
      toast({ title: "Error", description: "Please enter your message." })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      message: message,
      to_email: "amazin'glazingcakeshomeoffreshbakes@gmail.com"
    }

    try {
      await emailjs.send(
        'service_6z0f8ph',
        'template_xbj7l3o',
        templateParams,
        'TxaKxRzq0mrK23sKz'
      )

      toast({
        title: "Thank you!",
        description: `Thank you ${name} for reaching out to us, we will get back to you shortly.`,
      })
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch (error) {
      console.error('Error sending email:', error)
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-[#283618] rounded-lg shadow-lg flex flex-col justify-between w-full border-0">
      <div className="space-y-4 flex-grow">
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-amber-50 text-amber-800 placeholder-amber-400 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-amber-50 text-amber-800 placeholder-amber-400 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
        />
        <Input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-amber-50 text-amber-800 placeholder-amber-400 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300"
        />
        <Textarea
          placeholder="Tell us about your cake requirements"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-amber-50 text-amber-800 placeholder-amber-400 border-amber-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition duration-300 resize-none"
          rows={10}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-amber-600 text-white hover:bg-amber-700 focus:ring-4 focus:ring-amber-300 transition duration-300 shadow-md hover:shadow-lg"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}