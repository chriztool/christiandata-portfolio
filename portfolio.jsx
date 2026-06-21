import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Form submission via Formspree (free service)
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 3000);
    });
  };

  const projects = [
    {
      id: 1,
      title: 'Sales Data Dashboard',
      description: 'Built interactive SQL queries to analyze quarterly sales trends. Used GROUP BY and JOINs to aggregate data across multiple tables.',
      tags: ['SQL', 'PostgreSQL', 'Data Analysis'],
      link: '#',
      image: '📊',
    },
    {
      id: 2,
      title: 'Customer Retention Analysis',
      description: 'Created a case study analyzing customer churn patterns using WHERE clauses and aggregate functions. Identified key retention drivers.',
      tags: ['SQL', 'Analytics', 'Case Study'],
      link: '#',
      image: '📈',
    },
    {
      id: 3,
      title: 'Inventory Optimization',
      description: 'Wrote complex SQL joins to track inventory levels across warehouses. Generated reports for supply chain optimization.',
      tags: ['SQL', 'JOINs', 'Reporting'],
      link: '#',
      image: '📦',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'SQL JOINs Explained: Inner, Left, and Right',
      date: 'Coming Soon',
      excerpt: 'A beginner-friendly guide to understanding different JOIN types and when to use them.',
      tags: ['SQL', 'Tutorial'],
    },
    {
      id: 2,
      title: 'From Admin to Analyst: My Transition Journey',
      date: 'Coming Soon',
      excerpt: 'How I transitioned from office administration to data analytics in 6 months.',
      tags: ['Career', 'Learning'],
    },
    {
      id: 3,
      title: 'GROUP BY vs DISTINCT: When to Use Each',
      date: 'Coming Soon',
      excerpt: 'Understanding aggregation functions and how to structure your queries efficiently.',
      tags: ['SQL', 'Best Practices'],
    },
  ];

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Christian Data
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveSection(link.id)}
                  className={`transition ${
                    activeSection === link.id
                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-slate-300 hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 rounded"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Data Analytics & SQL
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8">
                Transitioning from admin to analytics. Building dashboards, writing queries, solving data problems.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => setActiveSection('projects')}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition"
                >
                  View Projects
                </button>
                <button
                  onClick={() => setActiveSection('contact')}
                  className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 rounded-lg font-semibold transition"
                >
                  Get in Touch
                </button>
              </div>
              <div className="mt-12 flex justify-center gap-6">
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  <Github size={28} />
                </a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  <Linkedin size={28} />
                </a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition">
                  <Mail size={28} />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <section className="max-w-4xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold mb-8 text-cyan-400">About Me</h2>
            <div className="space-y-6 text-slate-300 text-lg">
              <p>
                I'm Christian, a data analytics professional based in Metro Vancouver, BC. I'm transitioning from office administration and business roles into data analytics, leveraging SQL, database querying, and data visualization to help businesses make data-driven decisions.
              </p>
              <p>
                My journey started with curiosity about how data tells stories. Now I'm building that foundation through hands-on SQL practice, exploring relational databases, and creating dashboards that turn raw data into actionable insights.
              </p>
              <p>
                I'm targeting roles like Reporting Analyst or Business Systems Analyst with BC public sector organizations and major regional employers. I'm also interested in entrepreneurship and tech innovation.
              </p>
              <div className="mt-10 p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Skills & Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['SQL', 'PostgreSQL', 'Data Analysis', 'Reporting', 'Dashboards', 'Mode Analytics', 'Problem Solving', 'Database Design'].map((skill) => (
                    <div key={skill} className="px-4 py-2 bg-slate-700 rounded-lg text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <section className="max-w-5xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold mb-12 text-cyan-400">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-xl font-semibold mb-3 text-cyan-400">{project.title}</h3>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-700 text-xs rounded-full text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition">
                    View Details <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
              <p className="text-slate-300">
                More projects coming as I continue building my portfolio. Check back regularly for new work!
              </p>
            </div>
          </section>
        )}

        {/* Blog Section */}
        {activeSection === 'blog' && (
          <section className="max-w-4xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold mb-12 text-cyan-400">Blog</h2>
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-semibold text-cyan-400 flex-1">{post.title}</h3>
                    <span className="text-slate-400 text-sm whitespace-nowrap ml-4">{post.date}</span>
                  </div>
                  <p className="text-slate-300 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-700 text-xs rounded-full text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
              <p className="text-slate-300">
                Blog posts coming soon! I'll be sharing SQL tips, learning insights, and my analytics journey.
              </p>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="max-w-2xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold mb-8 text-cyan-400">Get in Touch</h2>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <p className="text-cyan-400 text-lg mb-2">✓ Message sent!</p>
                  <p className="text-slate-300">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                      placeholder="Tell me about your opportunity or just say hi!"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-slate-300 mb-4">Or connect with me on social:</p>
                <div className="flex gap-6">
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition flex items-center gap-2">
                    <Github size={20} /> GitHub
                  </a>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition flex items-center gap-2">
                    <Linkedin size={20} /> LinkedIn
                  </a>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition flex items-center gap-2">
                    <Mail size={20} /> Email
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400">
          <p>© 2026 Christian Data. Built with React & Tailwind. Deployed on Vercel.</p>
        </div>
      </footer>
    </div>
  );
}
