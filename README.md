# Christian Data Portfolio

A professional, dark-mode portfolio website for showcasing analytics and SQL projects.

## Features

✅ **About Section** — Your analytics journey and background  
✅ **Projects Gallery** — Showcase your SQL/analytics work  
✅ **Blog** — Write about your learning and insights  
✅ **Contact Form** — Let people reach out with opportunities  
✅ **Responsive Design** — Works perfectly on mobile & desktop  
✅ **Dark Mode** — Professional tech aesthetic  

## Quick Start

### 1. Deploy to Vercel (Free)
See `DEPLOYMENT_GUIDE.md` for step-by-step instructions.

### 2. Connect Your Domain
Domain options:
- Buy through Vercel: ~$12/year
- Buy through Namecheap: ~$10/year (then connect to Vercel)

### 3. Update Your Content
- Add your projects to the `projects` array
- Update social links (GitHub, LinkedIn, etc.)
- Set up Formspree for contact form
- Add blog posts as you write them

## File Structure

```
portfolio/
├── portfolio.jsx          # Main React component
├── main.jsx               # Entry point
├── index.html             # HTML template
├── index.css              # Tailwind styles
├── package.json           # Dependencies
└── DEPLOYMENT_GUIDE.md    # Full setup instructions
```

## Customization

### Change Colors
The portfolio uses Tailwind CSS with cyan/blue accents. To change:
- Find `cyan-400`, `cyan-500`, `cyan-600` in `portfolio.jsx`
- Replace with other Tailwind colors (e.g., `blue-400`, `purple-400`)

### Add Your Projects
Edit the `projects` array in `portfolio.jsx`:

```javascript
{
  id: 1,
  title: 'Your Project Name',
  description: 'What you built and what you learned',
  tags: ['SQL', 'PostgreSQL', 'Your Tech'],
  link: 'https://github.com/yourrepo',
  image: '📊',  // Emoji or your own
}
```

### Set Up Contact Form
1. Go to formspree.io
2. Create a new form
3. Copy your Form ID
4. Replace `YOUR_FORM_ID` in `portfolio.jsx` line ~80

## Tech Stack

- **React 18** — Component framework
- **Tailwind CSS** — Styling
- **Vite** — Build tool
- **Vercel** — Hosting
- **Formspree** — Contact form (free)

## Deployment

```bash
# Clone repo (after you push to GitHub)
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## Next Steps

1. **Deploy to Vercel** (Step 1-5 in DEPLOYMENT_GUIDE.md)
2. **Buy domain** (`christiandata.dev`)
3. **Add your projects** as you build them
4. **Share with potential employers/clients**

## Questions?

Check `DEPLOYMENT_GUIDE.md` for detailed instructions on each step.

---

Built with ❤️ for your analytics journey. Keep grinding. 🚀
