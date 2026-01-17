import { NextRequest, NextResponse } from 'next/server';

// Check if Resend API key is configured
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vaibhavkrkandhway@gmail.com';
const WEBSITE_DOMAIN = 'https://vaibhavkandhway.dev';

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
      console.log('🚀 Sending emails via Resend...');
      
      try {
        // Send admin notification email
        console.log('📤 Sending admin notification to:', ADMIN_EMAIL);
        const adminResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Vaibhav Kandhway <onboarding@resend.dev>',
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

        // Send auto-reply confirmation email to sender
        // NOTE: On Resend free tier with unverified domain, this may only work for verified emails
        // Once you verify your domain (vaibhavkandhway.dev) on Resend, this will work for all recipients
        console.log('📤 Sending confirmation email to:', email);
        const confirmationResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Vaibhav Kandhway <onboarding@resend.dev>',
            to: [email],
            reply_to: ADMIN_EMAIL,
            subject: `✅ Message Received - ${subject}`,
            html: `
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thank You, ${name}! 🙏</h1>
                  <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your message has been received</p>
                </div>
                
                <!-- Body -->
                <div style="padding: 40px 30px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none;">
                  <!-- Confirmation Message -->
                  <div style="background: white; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                      <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 30px;">✓</span>
                      </div>
                    </div>
                    <p style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0; text-align: center;">
                      I've received your message regarding <strong style="color: #8b5cf6;">"${subject}"</strong> and will review it carefully.
                    </p>
                  </div>

                  <!-- Response Time -->
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #fcd34d;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span style="font-size: 24px;">⏰</span>
                      <div>
                        <p style="color: #92400e; font-weight: 600; margin: 0; font-size: 15px;">Expected Response Time</p>
                        <p style="color: #a16207; margin: 5px 0 0 0; font-size: 14px;">I typically respond within <strong>24-48 hours</strong></p>
                      </div>
                    </div>
                  </div>

                  <!-- Your Message Summary -->
                  <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">📝 Your Message</h3>
                    <p style="color: #6b7280; font-size: 14px; line-height: 1.7; margin: 0; padding: 15px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #8b5cf6;">${message}</p>
                  </div>

                  <!-- Connect Section -->
                  <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">🌐 Connect With Me</h3>
                    <div style="text-align: center;">
                      <a href="${WEBSITE_DOMAIN}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 5px;">🌐 Portfolio</a>
                      <a href="https://linkedin.com/in/vaibhav-kumar-kandhway" style="display: inline-block; padding: 12px 24px; background: #0A66C2; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 5px;">💼 LinkedIn</a>
                      <a href="https://github.com/VaibhavK289" style="display: inline-block; padding: 12px 24px; background: #24292e; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 5px;">💻 GitHub</a>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div style="padding: 25px 30px; background: #1f2937; border-radius: 0 0 12px 12px; text-align: center;">
                  <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px 0;">
                    Best regards,<br>
                    <strong style="color: white;">Vaibhav Kumar Kandhway</strong>
                  </p>
                  <p style="color: #6b7280; font-size: 12px; margin: 0;">
                    Full-Stack Developer & AI Engineer
                  </p>
                  <p style="color: #4b5563; font-size: 11px; margin: 15px 0 0 0;">
                    <a href="${WEBSITE_DOMAIN}" style="color: #06b6d4; text-decoration: none;">vaibhavkandhway.dev</a>
                  </p>
                </div>
              </div>
            `,
          }),
        });

        const confirmationResult = await confirmationResponse.json();
        
        if (!confirmationResponse.ok) {
          // Log but don't fail - admin notification was successful
          console.warn('⚠️ Confirmation email failed (may need domain verification):', confirmationResult);
        } else {
          console.log('✅ Confirmation email sent successfully:', confirmationResult);
        }

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
      { message: 'Message sent successfully! Check your email for confirmation.' },
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
