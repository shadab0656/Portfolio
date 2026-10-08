# Shadab Hussain · Stand-up Comedian Portfolio

Next.js 15 (App Router) + Tailwind CSS + Framer Motion + Nodemailer.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in SMTP_PASS
npm run dev                  # http://localhost:3000
```

## Before going live

1. **Profile photo:** replace `public/profile.jpg` with a real photo (portrait, roughly 4:5, ~800×1000px).
   The hero frame crops it into an arch, so keep the face in the upper-middle.
2. **Booking emails:** set the variables in `.env.local` (and in your host's dashboard when deploying).
   For Gmail:
   - Turn on 2-Step Verification for jokekarshadab@gmail.com
   - Go to Google Account → Security → App passwords, create one, and paste the 16 characters into `SMTP_PASS`
   - Don't use the normal Gmail password; Google blocks it for SMTP.
3. **Numbers and links:** everything (follower count, show count, video ID, email) lives in `lib/site.js`.

If SMTP isn't configured or the send fails, the form shows the error with a one-tap
"Email the request" link that opens the visitor's mail app with all details pre-filled,
so no booking is lost.

## Deploy (Vercel)

Push to GitHub → import in Vercel → add the env vars from `.env.example` → deploy.
The API route runs on the Node.js runtime, which Nodemailer needs.

## Structure

```
app/
  layout.js            fonts (Shrikhand + Hind), metadata, providers
  page.js              section order
  api/booking/route.js validates the form and emails it via Nodemailer
components/
  Navbar.jsx           sticky nav, mobile menu, scroll progress bar
  Hero.jsx             name, tagline, photo, load animation
  StringLights.jsx     wedding fairy lights that switch on at page load
  Experience.jsx       bio + animated "set list" of achievements
  VideoShowcase.jsx    featured YouTube video (loads iframe only on play)
  SocialProof.jsx      Instagram 25K+ and YouTube cards
  BookingSection.jsx   inline booking form + email fallback
  BookingModal.jsx     bottom sheet on mobile, dialog on desktop
  BookingForm.jsx      shared form with success / error states
lib/site.js            all content and links in one place
```

## Notes

- Animations respect the OS "reduce motion" setting.
- The form has a hidden honeypot field to filter basic spam bots.
- The Instagram count is static (Instagram's API requires a business account and an access token).
  Update `followersK` in `lib/site.js` when it grows.
