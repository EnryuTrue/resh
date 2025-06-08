"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Filter, Share2, Users, Database, Zap, CheckCircle, Loader2, ArrowRight, Brain } from "lucide-react"
import Link from "next/link"
import { subscribeToWaitlist } from "./actions"
import { useActionState } from "react" // Updated import
import { useFormStatus } from "react-dom"
import { useState, useEffect } from "react"
import { DemoChart } from "@/components/demo-chart"

// Form submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Joining...
        </>
      ) : (
        <>
          Join Waitlist
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}

// Form submit button for CTA section
function SubmitButtonCTA() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="lg"
      variant="secondary"
      className="bg-white text-emerald-600 hover:bg-slate-50 px-8"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Joining...
        </>
      ) : (
        "Join Waitlist"
      )}
    </Button>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [ctaEmail, setCTAEmail] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState("")

  const initialState = { success: false, message: "" }
  const [formState, formAction] = useActionState(subscribeToWaitlist, initialState) // Updated hook
  const [ctaFormState, ctaFormAction] = useActionState(subscribeToWaitlist, initialState) // Updated hook

  // Handle form submission feedback
  useEffect(() => {
    if (formState.success && formState.message) {
      setShowSuccess(true)
      setEmail("")
      setTimeout(() => setShowSuccess(false), 5000)
    } else if (formState.success === false && formState.message) {
      setShowError(formState.message)
      setTimeout(() => setShowError(""), 5000)
    }
  }, [formState])

  useEffect(() => {
    if (ctaFormState.success && ctaFormState.message) {
      setShowSuccess(true)
      setCTAEmail("")
      setTimeout(() => setShowSuccess(false), 5000)
    } else if (ctaFormState.success === false && ctaFormState.message) {
      setShowError(ctaFormState.message)
      setTimeout(() => setShowError(""), 5000)
    }
  }, [ctaFormState])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg shadow-lg">
          <p className="font-medium">Success! You've been added to our waitlist.</p>
        </div>
      )}

      {showError && (
        <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg">
          <p className="font-medium">{showError}</p>
        </div>
      )}

      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-emerald-600" />
          <span className="text-xl font-bold text-slate-900">rechart.app</span>
        </div>
        <nav className="ml-auto flex gap-6">
          <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Features
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center max-w-6xl mx-auto">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-800 border-emerald-200"
              >
                Coming Soon
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Turn Your Data Into
                <span className="text-emerald-600 block">Interactive Graph</span>
              </h1>

              <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                Easily build interactive graph app for your clients to explore data lively.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-md">
                <form action={formAction} className="flex flex-col sm:flex-row gap-4 w-full">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <SubmitButton />
                </form>
              </div>

              <p className="text-sm text-slate-500">Be among the first to transform how you share data insights</p>
            </div>

            {/* Interactive Demo Chart */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">See It In Action</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  This is what your clients would receive - an interactive chart they can filter and explore in
                  real-time
                </p>
              </div>
              <DemoChart />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="w-full py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Built for Business Users</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                No coding required. Just connect, configure, and share.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">AI-Powered Insights</h3>
                  <p className="text-slate-600">Leverage AI to transform raw data into meaningful interactive visualizations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Multiple Data Sources</h3>
                  <p className="text-slate-600">Connect to databases, spreadsheets, APIs, and more.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Client-Friendly</h3>
                  <p className="text-slate-600">Your clients get clean, intuitive interfaces to explore data.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-time Updates</h3>
                  <p className="text-slate-600">Charts update automatically as your data changes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Code Required</h3>
                  <p className="text-slate-600">Build powerful chart apps without technical expertise.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Share2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Sharing</h3>
                  <p className="text-slate-600">Share via simple links - no accounts needed for viewers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full py-20 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Perfect For</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="border-0 shadow-md bg-white p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Consultants</h3>
                <p className="text-sm text-slate-600">Share interactive reports with clients</p>
              </Card>

              <Card className="border-0 shadow-md bg-white p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Agencies</h3>
                <p className="text-sm text-slate-600">Deliver dynamic dashboards to customers</p>
              </Card>

              <Card className="border-0 shadow-md bg-white p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Sales Teams</h3>
                <p className="text-sm text-slate-600">Create filterable performance charts</p>
              </Card>

              <Card className="border-0 shadow-md bg-white p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Analysts</h3>
                <p className="text-sm text-slate-600">Turn analysis into interactive tools</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 bg-emerald-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Charts?</h2>
              <p className="text-xl text-emerald-100 mb-8">
                Join our waitlist and be the first to know when rechart.app launches. Early users get exclusive access
                and special pricing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <form action={ctaFormAction} className="flex flex-col sm:flex-row gap-4 w-full">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="bg-white border-0 text-slate-900 placeholder:text-slate-500"
                    required
                    value={ctaEmail}
                    onChange={(e) => setCTAEmail(e.target.value)}
                  />
                  <SubmitButtonCTA />
                </form>
              </div>

              <p className="text-sm text-emerald-200 mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BarChart3 className="h-6 w-6 text-emerald-600" />
              <span className="font-semibold text-slate-900">rechart.app</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              <span>From the makers of</span>
              <Link href="https://columns.ai" className="text-emerald-600 hover:text-emerald-700 font-medium">
                columns.ai
              </Link>
              <span>&</span>
              <Link href="https://fina.money" className="text-emerald-600 hover:text-emerald-700 font-medium">
                fina.money
              </Link>
            </div>
          </div>
          <div className="border-t mt-6 pt-6 text-center text-sm text-slate-500">
            <p>&copy; 2024 rechart.app. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
