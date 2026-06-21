# christiandata.dev Portfolio - Deployment Guide

Your portfolio site is ready. Here's how to get it live in about 15 minutes.

## Step 1: Create a GitHub Account (if you don't have one)
1. Go to github.com
2. Sign up with your email
3. Verify your email

## Step 2: Create a Repository for Your Code
1. Go to github.com/new
2. Name it: `portfolio` or `christiandata-portfolio`
3. Click "Create repository"
4. You'll see a page with setup instructions

## Step 3: Push Your Code to GitHub
Open a terminal/command prompt and run these commands:

```bash
# Navigate to where you saved the portfolio file
cd path/to/your/portfolio

# Initialize git
git init

# Add the file
git add portfolio.jsx

# Create a commit
git commit -m "Initial portfolio site"

# Add your GitHub repo (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel
1. Go to vercel.com
2. Sign up with your GitHub account
3. Click "Import Project"
4. Select your `portfolio` repository
5. Vercel will auto-detect it's a React app
6. Click "Deploy" — it takes ~2-3 minutes

**Your site is now live at:** `https://portfolio-[random].vercel.app`

## Step 5: Connect Your Custom Domain (`christiandata.dev`)

### Option A: Buy Domain from Vercel (Easiest)
1. In Vercel dashboard, go to Settings → Domains
2. Click "Add Domain"
3. Enter `christiandata.dev`
4. Click "Buy Domain" (~$12/year)
5. Complete checkout
6. Done! Your site is live at `christiandata.dev`

### Option B: Buy Domain Elsewhere (Cheaper)
If you want a cheaper domain, use Namecheap or GoDaddy:

**Via Namecheap:**
1. Go to namecheap.com
2. Search for `christiandata.dev`
3. Buy it (~$10-12/year)
4. In Namecheap, go to Domain List → Manage
5. Find "Nameservers" section
6. Change to custom nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
7. In Vercel, add the domain in Settings → Domains
8. Wait ~5-10 minutes for DNS to propagate

## Step 6: Update Your Portfolio

### Add Your Social Links
Edit `portfolio.jsx` and find these lines (around line 150):

```javascript
<a href="#" className="text-slate-400 hover:text-cyan-400 transition">
  <Github size={28} />
</a>
```

Replace `href="#"` with your actual links:
- GitHub: `href="https://github.com/YOUR_USERNAME"`
- LinkedIn: `href="https://www.linkedin.com/in/YOUR_PROFILE"`
- Email: `href="mailto:your@email.com"`

### Add Your Projects
Find the `projects` array (around line 30) and add your actual projects:

```javascript
{
  id: 1,
  title: 'Your Project Title',
  description: 'Description of what you built and learned',
  tags: ['SQL', 'PostgreSQL', 'Your Tech'],
  link: '#',  // Link to GitHub repo or case study
  image: '📊',
},
```

### Set Up Contact Form
The contact form uses Formspree (free). Here's how:

1. Go to formspree.io
2. Sign up with your email
3. Create a new form
4. You'll get a Form ID (looks like: `mbjwkqbx`)
5. In `portfolio.jsx`, find this line (around line 80):
   ```javascript
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
6. Replace `YOUR_FORM_ID` with your actual ID from Formspree
7. Save and commit to GitHub

### Push Changes to Live
After making edits:

```bash
git add portfolio.jsx
git commit -m "Update projects and social links"
git push
```

Vercel automatically redeploys within 1-2 minutes.

## Step 7: Add Resume/CV

To add a downloadable resume:

1. Place your resume PDF in the project folder
2. In `portfolio.jsx`, add this button to the hero section:
   ```javascript
   <a href="/resume.pdf" download className="px-8 py-3 border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 rounded-lg font-semibold transition">
     Download Resume
   </a>
   ```
3. Commit and push

## Step 8: Add Blog Posts

Replace the placeholder blog posts in the `blogPosts` array with real posts once you write them:

```javascript
{
  id: 1,
  title: 'Your Blog Post Title',
  date: 'June 21, 2026',
  excerpt: 'Short preview of your post',
  tags: ['SQL', 'Learning'],
},
```

## Maintenance Going Forward

**Every time you update:**
1. Edit the portfolio.jsx file
2. Run: `git add . && git commit -m "Update: describe change" && git push`
3. Wait 1-2 minutes for Vercel to redeploy
4. Your site updates automatically

---

## Troubleshooting

**Domain not connecting?**
- Wait 24 hours for DNS propagation (sometimes faster)
- Clear browser cache (Ctrl+Shift+Delete)

**Form not working?**
- Make sure you replaced `YOUR_FORM_ID` with your actual Formspree ID
- Test it by submitting a test message

**Site looks broken?**
- Check Vercel dashboard for deploy errors
- Make sure portfolio.jsx has no syntax errors

**Need help?**
- Vercel docs: vercel.com/docs
- Formspree docs: formspree.io/docs
- GitHub help: docs.github.com

---

## Next Steps

1. **Get it deployed** (do Steps 1-5 first)
2. **Connect your socials & email** (Step 6)
3. **Set up Formspree** for contact form
4. **Start adding real projects** as you build them
5. **Write blog posts** sharing your analytics journey

You've got this. 🚀
