"use server"

import { Resend } from "resend"
import { addToWaitlist } from "@/lib/waitlist"

type FormState = {
  success?: boolean
  message?: string
  email?: string
}

export async function subscribeToWaitlist(prevState: FormState, formData: FormData): Promise<FormState> {
  // Get email from form data
  const email = formData.get("email") as string

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  try {
    // Store email in waitlist first
    await addToWaitlist(email)

    // Check if we have a Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.log(`New waitlist signup: ${email} (Email sending disabled - no API key)`)
      return {
        success: true,
        message: "You've been added to our waitlist! We'll notify you when we launch.",
        email,
      }
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: "Rechart <welcom@ticketster.net>", // Use resend.dev domain for testing
      to: [email],
      subject: "Welcome to the Rechart Waitlist! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Rechart Waitlist</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">rechart.app</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Turn Your Charts Into Interactive Apps</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 20px;">
              <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px;">Thanks for joining our waitlist!</h2>
              
              <p style="color: #374151; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                We're thrilled to have you on board. You'll be among the first to know when rechart.app launches and can start creating interactive chart applications.
              </p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px;">What to expect:</h3>
                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Early access to rechart.app when we launch</li>
                  <li style="margin-bottom: 8px;">Special launch pricing for waitlist members</li>
                  <li style="margin-bottom: 8px;">Updates on our development progress</li>
                  <li>Tips and tutorials for creating amazing chart apps</li>
                </ul>
              </div>
              
              <p style="color: #374151; line-height: 1.6; margin: 20px 0; font-size: 16px;">
                In the meantime, feel free to check out our other products:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://columns.ai" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 0 10px 10px 0; font-weight: 500;">
                  Visit columns.ai
                </a>
                <a href="https://fina.money" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 0 10px 10px 0; font-weight: 500;">
                  Visit fina.money
                </a>
              </div>
              
              <p style="color: #6b7280; line-height: 1.6; margin: 30px 0 0 0; font-size: 14px; text-align: center;">
                Have questions? Just reply to this email - we'd love to hear from you!
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                From the makers of <a href="https://columns.ai" style="color: #059669; text-decoration: none;">columns.ai</a> and <a href="https://fina.money" style="color: #059669; text-decoration: none;">fina.money</a>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
                © 2024 rechart.app. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return {
        success: true,
        message: "You've been added to our waitlist! (Email confirmation may take a moment)",
        email,
      }
    }

    console.log("Email sent successfully:", data)
    return {
      success: true,
      message: "You've been added to our waitlist! Check your email for confirmation.",
      email,
    }
  } catch (error) {
    console.error("Waitlist signup error:", error)

    // Check if it's a duplicate email error
    if (error instanceof Error && error.message.includes("already exists")) {
      return {
        success: false,
        message: "This email is already on our waitlist!",
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}
