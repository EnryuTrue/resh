"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

// Sample data that would come from a connected data source
const salesData = [
  { month: "Jan", revenue: 45000, region: "North", category: "Software" },
  { month: "Feb", revenue: 52000, region: "North", category: "Software" },
  { month: "Mar", revenue: 48000, region: "North", category: "Hardware" },
  { month: "Apr", revenue: 61000, region: "South", category: "Software" },
  { month: "May", revenue: 55000, region: "South", category: "Software" },
  { month: "Jun", revenue: 67000, region: "South", category: "Hardware" },
  { month: "Jul", revenue: 58000, region: "East", category: "Software" },
  { month: "Aug", revenue: 62000, region: "East", category: "Software" },
  { month: "Sep", revenue: 71000, region: "East", category: "Hardware" },
  { month: "Oct", revenue: 69000, region: "West", category: "Software" },
  { month: "Nov", revenue: 73000, region: "West", category: "Software" },
  { month: "Dec", revenue: 78000, region: "West", category: "Hardware" },
]

export function DemoChart() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Filter data based on selected filters
  const filteredData = salesData.filter((item) => {
    const regionMatch = selectedRegion === "all" || item.region === selectedRegion
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    return regionMatch && categoryMatch
  })

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-slate-900">Monthly Revenue Dashboard</CardTitle>
            <p className="text-sm text-slate-600 mt-1">Interactive demo - try the filters below</p>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 w-fit">
            Live Demo
          </Badge>
        </div>

        {/* Interactive Filters */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-700">Region</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="North">North</SelectItem>
                <SelectItem value="South">South</SelectItem>
                <SelectItem value="East">East</SelectItem>
                <SelectItem value="West">West</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-700">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Hardware">Hardware</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="month" className="text-slate-600" fontSize={12} />
              <YAxis
                className="text-slate-600"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} className="fill-emerald-500" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            This is what your clients would see - an interactive chart they can filter and explore
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
