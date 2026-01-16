# Email Messaging Service Setup Guide

## Overview
Your contact form is now fully integrated with **Resend**, a modern email service built for Next.js applications. This enables:

✅ **Admin Notifications** - Get an email when someone contacts you
✅ **User Confirmations** - Visitors receive confirmation their message was sent
✅ **Beautiful Templates** - Professional HTML email designs
✅ **Reliable Delivery** - Built-in retry logic and delivery tracking

## Setup Instructions

### 1. Sign up for Resend (FREE)
- Go to https://resend.com
- Create a free account
- No credit card required for testing

### 2. Get Your API Key
1. Log in to Resend dashboard
2. Go to **API Keys** section
3. Copy your API key

### 3. Add API Key to Your Environment
Edit `.env.local` in your project root:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=your.email@example.com
ADMIN_EMAIL=your.email@example.com
```

Replace:
- `re_xxxxxxxxxxxxxxxxxxxxx` with your actual Resend API key
- `your.email@example.com` with the email address where you want to receive contact notifications

### 4. Test the Contact Form
1. Run your development server: `npm run dev`
2. Go to `/contact` page
3. Fill out and submit the form
4. Check your email for:
   - **Admin notification** at ADMIN_EMAIL
   - **User confirmation** at the visitor's email

## Features

### Admin Notification Email
When someone submits the form, you receive:
- Visitor's name, email, and subject
- Full message content
- Timestamp of submission
- Professional HTML formatting

### User Confirmation Email
Visitors receive:
- Thank you message
- Copy of their submitted message
- Your contact information (email, LinkedIn, GitHub)
- Professional branding

## How It Works

The contact API endpoint (`/api/contact`) now:

1. **Validates** form data (required fields, email format)
2. **Logs** submission to console for debugging
3. **Sends admin notification** to your email
4. **Sends user confirmation** to visitor's email
5. **Returns success response** to the frontend

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_xxxxxxxxxxxxxxxx` |
| `CONTACT_EMAIL` | Fallback contact email | `your.email@gmail.com` |
| `ADMIN_EMAIL` | Where notifications go | `your.email@gmail.com` |

## Troubleshooting

### "RESEND_API_KEY not configured"
**Solution:** Add your API key to `.env.local`

### Emails not arriving
1. Check spam/junk folder
2. Verify API key is correct
3. Check browser console for errors
4. Verify email addresses in `.env.local`

### Testing without Resend
If you don't have a Resend account yet:
- The form still works and returns success
- Messages are logged to console in development
- Once you add the API key, emails will send automatically

## Production Deployment

When deploying to Vercel:

1. Go to your Vercel project settings
2. Add environment variable: `RESEND_API_KEY`
3. Set value to your Resend API key
4. Redeploy

Your contact form will then send emails in production!

## Support

- **Resend Docs:** https://resend.com/docs
- **Next.js Integration:** https://resend.com/docs/frameworks/nextjs

## Next Steps (Optional)

1. **Custom Domain Email** - Use your own domain with Resend
2. **Email Templates** - Further customize email designs
3. **Webhooks** - Track delivery status and bounces
4. **Database Logging** - Store messages in a database
5. **Slack Integration** - Get instant Slack notifications
