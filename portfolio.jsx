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
  Sun,
  Moon,
  Rocket,
  Users,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Ventures', id: 'ventures' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'journey' },
  { label: 'Projects', id: 'projects' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
];

const STATS = [
  { label: 'Founded', value: '9ILE' },
  { label: 'Based in', value: 'Burnaby, BC' },
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
    category: 'Business & Operations',
    icon: Briefcase,
    skills: ['Microsoft Excel & Word', 'QuickBooks / AR-AP', 'CRM', 'Project Management', 'Invoice & Vendor Management'],
  },
  {
    category: 'Approach',
    icon: Sparkles,
    skills: ['Problem Solving', 'Attention to Detail', 'Adaptability', 'Clear Communication'],
  },
];

const JOURNEY = [
  {
    year: '2017',
    title: 'Administrative Manager, De Charlotte Farms',
    description: 'Led HR, compliance, and day-to-day farm operations in Nigeria, including payroll and financial reporting.',
  },
  {
    year: '2021',
    title: 'Started Horticulture diploma, Kwantlen Polytechnic',
    description: 'Moved to BC and began a diploma in Horticulture and General Studies, completed in 2024.',
  },
  {
    year: '2022',
    title: 'Front Desk Support Worker, Atira Property Management',
    description: 'Supported tenants as their main point of contact, resolving issues and advocating for their rights.',
  },
  {
    year: '2024',
    title: 'Founded 9ILE & joined Waypoint (Navacord)',
    description: 'Launched 9ILE while starting as an Auto Leasing Administrator at Waypoint, later advancing to Insurance Agent.',
  },
  {
    year: 'Now',
    title: 'Pursuing a Google Analytics & SQL Certificate',
    description: 'Working through Google’s Analytics & SQL certificate, applying it to dashboards and queries, while open to Reporting / Business Systems Analyst roles in BC.',
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
    title: 'From Founder to Analyst: My Transition Journey',
    date: 'Coming Soon',
    excerpt: 'How building a startup and working in operations led me to data analytics.',
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
  github: 'https://github.com/chriztool',
  linkedin: 'https://www.linkedin.com/in/chriztool',
  email: 'mailto:ogemdichris@yahoo.com',
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
      <p className="text-amber-700 dark:text-amber-400 font-semibold tracking-wide text-sm uppercase mb-2">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">{title}</h2>
    </div>
  );
}

function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    const initial = stored || 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    window.localStorage.setItem('theme', next);
  };

  return [theme, toggleTheme];
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [theme, toggleTheme] = useTheme();

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

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-sans transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-300/10 dark:bg-amber-700/10 rounded-full blur-3xl" />
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle light and dark mode"
        className="fixed top-4 left-4 z-[60] w-11 h-11 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 hover:border-amber-400 transition"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <nav className="fixed top-0 w-full bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent pl-12 md:pl-0"
            >
              Christian Agbugba
            </button>

            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition pb-1 border-b-2 ${
                    activeSection === link.id
                      ? 'text-amber-700 dark:text-amber-400 border-amber-700 dark:border-amber-400'
                      : 'text-stone-600 dark:text-stone-300 border-transparent hover:text-amber-700 dark:hover:text-amber-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-2 text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded"
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
            <p className="text-amber-700 dark:text-amber-400 font-semibold tracking-wide text-sm uppercase mb-4">
              Hi, I'm Christian
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Data Analytics & SQL
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 mb-10">
              Founder of 9ILE, currently completing a Google Analytics & SQL certificate. Building dashboards, writing queries, solving data problems.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-10">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-amber-600 text-amber-700 dark:text-amber-400 dark:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-400/10 rounded-lg font-semibold transition"
              >
                Get in Touch
              </button>
            </div>
            <div className="flex justify-center gap-6 mb-16">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition">
                <Github size={26} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition">
                <Linkedin size={26} />
              </a>
              <a href={SOCIAL_LINKS.email} className="text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition">
                <Mail size={26} />
              </a>
            </div>
            <button
              onClick={() => scrollToSection('about')}
              className="text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition animate-bounce"
              aria-label="Scroll to About section"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </section>

        <section className="border-y border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/30">
          <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-400 mb-1">{stat.value}</div>
                <div className="text-sm text-stone-500 dark:text-stone-400">{stat.label}</div>
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
              <div className="space-y-5 text-stone-600 dark:text-stone-300 text-lg leading-relaxed">
                <p>
                  I'm Christian Agbugba, based in Burnaby, BC. By day I work as an Insurance Agent at Waypoint
                  (Navacord), advising clients on auto insurance and leasing; outside of that, I'm the Founder &amp; CEO
                  of 9ILE, a Nigerian super app bringing messaging, payments, and video conferencing to over 100 million
                  Nigerians.
                </p>
                <p>
                  I'm currently working through Google's Analytics &amp; SQL certificate, applying SQL, database
                  querying, and visualization to turn my operational and business experience into data-driven
                  decision making.
                </p>
                <p>
                  My background spans a horticulture diploma from Kwantlen Polytechnic University, property management,
                  agricultural cooperative work, and insurance operations, a cross-disciplinary foundation that shapes
                  how I approach systems thinking and problem solving. I'm targeting Reporting Analyst / Business
                  Systems Analyst roles in BC, while continuing to grow 9ILE.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="p-6 bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl space-y-4">
                <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                  <MapPin size={18} className="text-amber-700 dark:text-amber-400" />
                  <span className="text-sm">Burnaby, BC</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                  <Briefcase size={18} className="text-amber-700 dark:text-amber-400" />
                  <span className="text-sm">Insurance Agent, Waypoint &amp; Founder/CEO, 9ILE</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                  <Sparkles size={18} className="text-amber-700 dark:text-amber-400" />
                  <span className="text-sm">Pursuing Google Analytics &amp; SQL Certificate</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="ventures" className="max-w-5xl mx-auto px-4 py-24">
          <Reveal>
            <SectionHeading eyebrow="Beyond the data" title="Ventures" />
          </Reveal>
          <Reveal>
            <div className="p-8 bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-amber-600/10 flex items-center justify-center mb-5">
                <Rocket size={24} className="text-amber-700 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-semibold text-stone-900 dark:text-white mb-3">9ILE</h3>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-5">
                A Nigerian super app combining messaging, payments, and video conferencing into one platform built for
                over 100 million Nigerians. My mission is to build the digital infrastructure Nigeria deserves.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
                  <Users size={14} /> Seeking a Technical Co-Founder (CTO)
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 dark:bg-stone-700/70 text-stone-600 dark:text-stone-300 text-xs font-medium rounded-full">
                  Open to investors &amp; advisors
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="skills" className="max-w-5xl mx-auto px-4 py-24">
          <Reveal>
            <SectionHeading eyebrow="What I work with" title="Skills" />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_GROUPS.map((group, i) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.category} delay={i * 100}>
                  <div className="p-6 bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl h-full hover:border-amber-400 transition">
                    <div className="w-11 h-11 rounded-lg bg-amber-600/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-amber-700 dark:text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-stone-100 dark:bg-stone-700/70 text-xs rounded-full text-stone-600 dark:text-stone-300"
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
          <div className="relative border-l border-stone-300 dark:border-stone-700 ml-3 space-y-10">
            {JOURNEY.map((step, i) => (
              <Reveal key={step.title} delay={i * 80} className="relative pl-8">
                <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-600 dark:bg-amber-400 ring-4 ring-stone-50 dark:ring-stone-900" />
                <div className="text-amber-700 dark:text-amber-400 text-sm font-semibold mb-1">{step.year}</div>
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-stone-600 dark:text-stone-300">{step.description}</p>
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
                <div className="bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-6 h-full hover:border-amber-400 hover:-translate-y-1 transition duration-300">
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 dark:text-amber-400">{project.title}</h3>
                  <p className="text-stone-600 dark:text-stone-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-stone-100 dark:bg-stone-700 text-xs rounded-full text-stone-600 dark:text-stone-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-2 transition text-sm font-medium">
                    View Details <ExternalLink size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
            <Reveal delay={PROJECTS.length * 100}>
              <div className="border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center text-stone-500 dark:text-stone-400">
                <Sparkles size={28} className="text-stone-400 dark:text-stone-500 mb-3" />
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
                <article className="bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-6 hover:border-amber-400 transition cursor-pointer">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-400">{post.title}</h3>
                    <span className="text-stone-400 dark:text-stone-500 text-xs whitespace-nowrap mt-1">{post.date}</span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-300 mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-stone-100 dark:bg-stone-700 text-xs rounded-full text-stone-600 dark:text-stone-300">
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
              <div className="p-6 bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl h-full space-y-6">
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                  Have an opportunity, question, or just want to say hi? I'd love to hear from you.
                </p>
                <div className="space-y-4">
                  <a href={SOCIAL_LINKS.email} className="flex items-center gap-3 text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition">
                    <Mail size={18} /> <span className="text-sm">Email me</span>
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition">
                    <Linkedin size={18} /> <span className="text-sm">LinkedIn</span>
                  </a>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition">
                    <Github size={18} /> <span className="text-sm">GitHub</span>
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal className="md:col-span-3" delay={150}>
              <div className="bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-8">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <p className="text-amber-700 dark:text-amber-400 text-lg mb-2">✓ Message sent!</p>
                    <p className="text-stone-600 dark:text-stone-300">Thanks for reaching out. I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 text-sm font-semibold mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-amber-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-amber-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 text-sm font-semibold mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-amber-500"
                        placeholder="Tell me about your opportunity or just say hi!"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition"
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

      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-stone-500 dark:text-stone-400 text-sm">
          <p>© 2026 Christian Agbugba. Built with React & Tailwind. Deployed on Vercel.</p>
        </div>
      </footer>

      {showBackToTop && (
        <button
          onClick={() => scrollToSection('home')}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-lg transition z-40"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
