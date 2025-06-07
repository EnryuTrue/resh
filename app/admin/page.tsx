import { getWaitlist, getWaitlistCount } from "@/lib/waitlist"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AdminPage() {
  const waitlist = await getWaitlist()
  const count = await getWaitlistCount()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Waitlist Admin</h1>
          <p className="text-gray-600">Manage your rechart.app waitlist</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  waitlist.filter((entry) => {
                    const entryDate = new Date(entry.timestamp)
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return entryDate > weekAgo
                  }).length
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Signup</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {waitlist.length > 0
                  ? new Date(waitlist[waitlist.length - 1].timestamp).toLocaleDateString()
                  : "No signups yet"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Waitlist Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Waitlist Entries</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            {waitlist.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No waitlist entries yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-medium">Email</th>
                      <th className="text-left py-2 px-4 font-medium">Date Joined</th>
                      <th className="text-left py-2 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.reverse().map((entry, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{entry.email}</td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(entry.timestamp).toLocaleDateString()} at{" "}
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
