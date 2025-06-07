import fs from "fs/promises"
import path from "path"

const WAITLIST_FILE = path.join(process.cwd(), "data", "waitlist.json")

export interface WaitlistEntry {
  email: string
  timestamp: string
  ip?: string
}

export async function addToWaitlist(email: string, ip?: string): Promise<void> {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(WAITLIST_FILE)
    await fs.mkdir(dataDir, { recursive: true })

    // Read existing waitlist
    let waitlist: WaitlistEntry[] = []
    try {
      const data = await fs.readFile(WAITLIST_FILE, "utf-8")
      waitlist = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    // Check if email already exists
    const existingEntry = waitlist.find((entry) => entry.email.toLowerCase() === email.toLowerCase())
    if (existingEntry) {
      throw new Error("Email already exists in waitlist")
    }

    // Add new entry
    const newEntry: WaitlistEntry = {
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      ip,
    }
    waitlist.push(newEntry)

    // Save updated waitlist
    await fs.writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2))

    console.log(`Added ${email} to waitlist. Total subscribers: ${waitlist.length}`)
  } catch (error) {
    console.error("Error adding to waitlist:", error)
    throw error
  }
}

export async function getWaitlistCount(): Promise<number> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8")
    const waitlist: WaitlistEntry[] = JSON.parse(data)
    return waitlist.length
  } catch (error) {
    return 0
  }
}

export async function getWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}
