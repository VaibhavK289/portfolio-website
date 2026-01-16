import { NextRequest, NextResponse } from 'next/server';

// Check if Resend API key is configured
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vaibhavkrkandhway@gmail.com';

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
    console.log('📧 Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send email using Resend if API key is configured
    if (RESEND_API_KEY) {
      console.log('🚀 Sending email via Resend to:', ADMIN_EMAIL);
      
      try {
        // Send admin notification email
        // NOTE: On Resend free tier, use 'onboarding@resend.dev' as sender
        // and you can only send to your Resend account email address
        const adminResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Vaibhav Portfolio <onboarding@resend.dev>',
            to: [ADMIN_EMAIL],
            reply_to: email,
            subject: `📬 New Contact: ${subject}`,
            html: `
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                <div style="background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">📬 New Contact Form Message</h1>
                </div>
                <div style="padding: 30px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                  <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                    <p style="margin: 0 0 10px 0;"><strong style="color: #06b6d4;">From:</strong> ${name}</p>
                    <p style="margin: 0 0 10px 0;"><strong style="color: #06b6d4;">Email:</strong> <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></p>
                    <p style="margin: 0;"><strong style="color: #06b6d4;">Subject:</strong> ${subject}</p>
                  </div>
                  <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <h3 style="color: #333; margin: 0 0 15px 0; font-size: 16px;">💬 Message:</h3>
                    <p style="white-space: pre-wrap; line-height: 1.6; color: #555; margin: 0;">${message}</p>
                  </div>
                  <p style="color: #94a3b8; font-size: 12px; margin-top: 20px; text-align: center;">
                    Received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                  </p>
                  <p style="color: #64748b; font-size: 12px; margin-top: 10px; text-align: center;">
                    💡 Reply directly to this email to respond to ${name}
                  </p>
                </div>
              </div>
            `,
          }),
        });

        const adminResult = await adminResponse.json();
        
        if (!adminResponse.ok) {
          console.error('❌ Failed to send admin email:', adminResult);
          return NextResponse.json(
            { error: 'Failed to send message. Please try again or email directly.' },
            { status: 500 }
          );
        }
        
        console.log('✅ Admin email sent successfully:', adminResult);

      } catch (emailError) {
        console.error('❌ Email service error:', emailError);
        return NextResponse.json(
          { error: 'Email service error. Please try again later.' },
          { status: 500 }
        );
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY not configured. Email not sent.');
    }

    return NextResponse.json(
      { message: 'Message sent successfully! I will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
