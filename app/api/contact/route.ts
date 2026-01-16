import { NextRequest, NextResponse } from 'next/server';

// Check if Resend API key is configured
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'vaibhav.kumar.kandhway@gmail.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vaibhav.kumar.kandhway@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store contact in logs
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send email using Resend if API key is configured
    if (RESEND_API_KEY) {
      try {
        // Send admin notification email
        const adminResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <noreply@resend.dev>',
            to: ADMIN_EMAIL,
            subject: `New Contact Form: ${subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">New Contact Form Submission</h2>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                  <p><strong>From:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <h3 style="color: #333; margin-top: 20px;">Message:</h3>
                  <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                </div>
                <p style="color: #999; font-size: 12px; margin-top: 20px;">
                  Sent at ${new Date().toLocaleString()}
                </p>
              </div>
            `,
          }),
        });

        if (!adminResponse.ok) {
          console.error('Failed to send admin email:', await adminResponse.text());
        }

        // Send confirmation email to user
        const userResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Vaibhav Kumar <noreply@resend.dev>',
            to: email,
            subject: 'Thank you for reaching out!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Thank you for your message!</h2>
                <p>Hi ${name},</p>
                <p>I've received your message and appreciate you taking the time to reach out. I typically respond within 24-48 hours.</p>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Your message:</strong></p>
                  <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                </div>
                <p>In the meantime, feel free to connect with me on:</p>
                <ul style="list-style: none; padding: 0;">
                  <li>📧 <a href="mailto:vaibhav.kumar.kandhway@gmail.com">Email</a></li>
                  <li>💼 <a href="https://linkedin.com/in/vaibhav-kumar-kandhway">LinkedIn</a></li>
                  <li>💻 <a href="https://github.com/VaibhavK289">GitHub</a></li>
                </ul>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">
                  Best regards,<br>Vaibhav Kumar Kandhway
                </p>
              </div>
            `,
          }),
        });

        if (!userResponse.ok) {
          console.error('Failed to send user confirmation email:', await userResponse.text());
        }
      } catch (emailError) {
        console.error('Email service error:', emailError);
        // Don't fail the request if email fails, still return success
      }
    } else {
      console.warn('RESEND_API_KEY not configured. Install Resend for email notifications.');
    }

    return NextResponse.json(
      { message: 'Message sent successfully! I will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
