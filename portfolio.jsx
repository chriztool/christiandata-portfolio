import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
  ArrowUp,
  Database,
  BarChart3,
  Sparkles,
  MapPin,
  Briefcase,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'journey' },
  { label: 'Projects', id: 'projects' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
];

const STATS = [
  { label: 'Projects shipped', value: '3+' },
  { label: 'Based in', value: 'Vancouver, BC' },
  { label: 'Focus', value: 'SQL & Analytics' },
  { label: 'Status', value: 'Open to work' },
];

const SKILL_GROUPS = [
  {
    category: 'Querying & Databases',
    icon: Database,
    skills: ['SQL', 'PostgreSQL', 'Joins & Subqueries', 'Aggregate Functions', 'Database Design'],
  },
  {
    category: 'Analytics & Reporting',
    icon: BarChart3,
    skills: ['Mode Analytics', 'Dashboards', 'Reporting', 'Data Visualization'],
  },
  {
    category: 'Approach',
    icon: Sparkles,
    skills: ['Problem Solving', 'Attention to Detail', 'Clear Communication'],
  },
];

const JOURNEY = [
  {
    year: '2024',
    title: 'Office administration',
    description: 'Working in business operations day to day, getting curious about the data behind the numbers.',
  },
  {
    year: '2025',
    title: 'Started learning SQL',
    description: 'Began hands-on practice with queries, joins, and relational databases.',
  },
  {
    year: '2026',
    title: 'Building real projects',
    description: 'Shipped dashboards and case studies, applying SQL to real business questions.',
  },
  {
    year: 'Now',
    title: 'Open to opportunities',
    description: 'Looking for Reporting Analyst / Business Systems Analyst roles in BC.',
  },
];

const PROJECTS = [
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

const BLOG_POSTS = [
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

const SOCIAL_LINKS = {
  github: '#',
  linkedin: '#',
  email: 'mailto:',
};

function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-12">
      <p className="text-cyan-400 font-semibold tracking-wide text-sm uppercase mb-2">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    </div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const sectionIds = ['home', ...NAV_LINKS.map((l) => l.id)];
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Christian Data
            </button>

            <div className="hidden md:flex gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition pb-1 border-b-2 ${
                    activeSection === link.id
                      ? 'text-cyan-400 border-cyan-400'
                      : 'text-slate-300 border-transparent hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="relative">
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="text-center max-w-3xl">
            <p className="text-cyan-400 font-semibold tracking-wide text-sm uppercase mb-4">
              Hi, I'm Christian
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Data Analytics & SQL
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10">
              Transitioning from admin to analytics. Building dashboards, writing queries, solving data problems.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-10">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 rounded-lg font-semibold transition"
              >
                Get in Touch
              </button>
            </div>
            <div className="flex justify-center gap-6 mb-16">
              <a href={SOCIAL_LINKS.github} className="text-slate-400 hover:text-cyan-400 transition">
                <Github size={26} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} className="text-slate-400 hover:text-cyan-400 transition">
                <Linkedin size={26} />
              </a>
              <a href={SOCIAL_LINKS.email} className="text-slate-400 hover:text-cyan-400 transition">
                <Mail size={26} />
              </a>
            </div>
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-500 hover:text-cyan-400 transition animate-bounce"
              aria-label="Scroll to About section"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </section>

        <section className="border-y border-slate-800 bg-slate-800/30">
          <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="max-w-5xl mx-auto px-4 py-24">
          <Reveal>
            <SectionHeading eyebrow="Get to know me" title="About" />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            <Reveal className="md:col-span-2">
              <div className="space-y-5 text-slate-300 text-lg leading-relaxed">
                <p>
                  I'm Christian, a data analytics professional based in Metro Vancouver, BC. I'm transitioning from
                  office administration and business roles into data analytics, leveraging SQL, database querying,
                  and data visualization to help businesses make data-driven decisions.
                </p>
                <p>
                  My journey started with curiosity about how data tells stories. Now I'm building that foundation
                  through hands-on SQL practice, exploring relational databases, and creating dashboards that turn
                  raw data into actionable insights.
                </p>
                <p>
                  I'm targeting roles like Reporting Analyst or Business Systems Analyst with BC public sector
                  organizations and major regional employers. I'm also interested in entrepreneurship and tech
                  innovation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={18} className="text-cyan-400" />
                  <span className="text-sm">Metro Vancouver, BC</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Briefcase size={18} className="text-cyan-400" />
                  <span className="text-sm">Targeting Reporting / Business Systems Analyst roles</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Sparkles size={18} className="text-cyan-400" />
                  <span className="text-sm">Currently deep in SQL practice</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="max-w-5xl mx-auto px-4 py-24">
          <Reveal>
            <SectionHeading eyebrow="What I work with" title="Skills" />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, i) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.category} delay={i * 100}>
                  <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl h-full hover:border-cyan-400 transition">
                    <div className="w-11 h-11 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-4">{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-700/70 text-xs rounded-full text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="journey" className="max-w-4xl mx-auto px-4 py-24">
          <Reveal>
            <SectionHeading eyebrow="How I got here" title="My Journey" />
          </Reveal>
          <div className="relative border-l border-slate-700 ml-3 space-y-10">
            {JOURNEY.map((step, i) => (
              <Reveal key={step.title} delay={i * 100} className="relative pl-8">
                <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-slate-900" />
                <div className="text-cyan-400 text-sm font-semibold mb-1">{step.year}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="max-w-5xl mx-auto px-4 py-24">
          <Reveal>
            <SectionHeading eyebrow="What I've built" title="Projects" />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.id} delay={i * 100}>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-full hover:border-cyan-400 hover:-translate-y-1 transition duration-300">
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-xl font-semibold mb-3 text-cyan-400">{project.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-700 text-xs rounded-full text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition text-sm font-medium">
                    View Details <ExternalLink size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
            <Reveal delay={PROJECTS.length * 100}>
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center text-slate-400">
                <Sparkles size={28} className="text-slate-500 mb-3" />
                <p className="text-sm">More projects coming as I keep building. Check back soon!</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="blog" className="max-w-4xl mx-auto px-4 py-24">
          <Reveal>
            <SectionHeading eyebrow="What I'm learning" title="Blog" />
          </Reveal>
          <div className="space-y-5">
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.id} delay={i * 100}>
                <article className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-400 transition cursor-pointer">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="text-xl font-semibold text-cyan-400">{post.title}</h3>
                    <span className="text-slate-400 text-xs whitespace-nowrap mt-1">{post.date}</span>
                  </div>
                  <p className="text-slate-300 mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-700 text-xs rounded-full text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="max-w-5xl mx-auto px-4 py-24">
          <Reveal>
            <SectionHeading eyebrow="Let's talk" title="Get in Touch" />
          </Reveal>
          <div className="grid md:grid-cols-5 gap-8">
            <Reveal className="md:col-span-2">
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl h-full space-y-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Have an opportunity, question, or just want to say hi? I'd love to hear from you.
                </p>
                <div className="space-y-4">
                  <a href={SOCIAL_LINKS.email} className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition">
                    <Mail size={18} /> <span className="text-sm">Email me</span>
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition">
                    <Linkedin size={18} /> <span className="text-sm">LinkedIn</span>
                  </a>
                  <a href={SOCIAL_LINKS.github} className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition">
                    <Github size={18} /> <span className="text-sm">GitHub</span>
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal className="md:col-span-3" delay={150}>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <p className="text-cyan-400 text-lg mb-2">✓ Message sent!</p>
                    <p className="text-slate-300">Thanks for reaching out. I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label className="block text-slate-300 text-sm font-semibold mb-2">Name</label>
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
                      <label className="block text-slate-300 text-sm font-semibold mb-2">Email</label>
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
                      <label className="block text-slate-300 text-sm font-semibold mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows="5"
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
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2026 Christian Data. Built with React & Tailwind. Deployed on Vercel.</p>
        </div>
      </footer>

      {showBackToTop && (
        <button
          onClick={() => scrollToSection('home')}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center shadow-lg transition z-40"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
