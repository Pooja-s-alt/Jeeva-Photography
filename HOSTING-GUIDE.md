# 🚀 Jeeva Photography — Hosting Guide

## ✅ Website is Hosting-Ready!

Ungaloda PC-la irukura **"Jeeva Photography"** folder-a elutha upload panna matum podhum.

---

## 📁 Upload Pannanum Files List

Upload the entire folder with all these:

```
Jeeva Photography/
├── index.html          ← Main website
├── admin.html          ← Admin Portal (keep private!)
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── db-sync.js
│   ├── lightbox.js
│   ├── portfolio-data.js
│   └── video-data.js
├── images/             ← All 47 photos (ready!)
└── videos/             ← 5 MP4 films (~679MB total)
```

---

## 🌐 Free Hosting Options

### Option 1: Netlify (Easiest — Recommended!)
1. Go to **https://netlify.com** → Sign up free
2. Drag & drop the entire **"Jeeva Photography"** folder into Netlify
3. Done! You get a free `.netlify.app` URL instantly.
4. Custom domain (like `jeevaphotography.com`) can be added later.

> ⚠️ **Note**: Videos are large (~679MB). If bandwidth is a concern, upload videos to YouTube/Vimeo and use embed links in the admin panel instead.

### Option 2: Vercel
1. Go to **https://vercel.com** → Sign up free
2. Upload folder → Deploy
3. Instant free `.vercel.app` URL

### Option 3: GitHub Pages (Completely Free)
1. Create GitHub account → New repo
2. Upload all files
3. Settings → Pages → Deploy from main branch
4. Free `username.github.io/jeeva-photography` URL

---

## 🔒 Admin Panel Security

After hosting, Admin Portal URL will be:
`https://yoursite.com/admin.html`

**To access**: Visit that URL directly and login with:
- **Username**: `admin`
- **Password**: `jeeva2024`
- (Change password in Settings tab after first login!)

> ⚠️ Admin link is NOT shown on the public website anymore.
> Only you know the URL. Keep it private!

---

## 📌 Important Notes After Hosting

1. **First-time setup**: After hosting, visit `admin.html` and re-add your content — localStorage data won't transfer between PC and hosting server.
2. **Videos**: If site loads slow, upload videos to YouTube/Vimeo → use embed links in admin panel.
3. **Custom Domain**: Buy domain from GoDaddy/Namecheap (~Rs 700-800/year) and connect to Netlify.
4. **SSL/HTTPS**: Netlify/Vercel gives free SSL automatically — site will show 🔒 padlock.

---

## ✅ Pre-Hosting Checklist

- [x] All images are local (no external dependencies)
- [x] CTA section uses local image (not external URL)
- [x] Admin links removed from public navigation
- [x] All videos are local MP4 files
- [x] Portfolio, Videos, Testimonials, Packages — all admin-manageable
- [x] WhatsApp booking form working
- [x] Mobile responsive design
- [x] SEO meta tags present

---

*Hosting-ku ready bro! Just upload the folder to Netlify. 🎉*
