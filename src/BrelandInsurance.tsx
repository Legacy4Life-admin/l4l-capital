import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Heart,
  Users,
  FileText,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Check,
  Star,
  Calendar,
  Sparkles,
  Quote,
  Menu,
  X
} from 'lucide-react';

// --- Calendly URL ---
const CALENDLY_URL = "https://calendly.com/melanibreland";

// --- Types ---
interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  accentColor: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  initials: string;
}

// --- Floating Orb Component ---
const FloatingOrb = ({
  className,
  delay = 0,
  size = "w-96 h-96"
}: {
  className?: string;
  delay?: number;
  size?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 2, delay }}
    className={`absolute rounded-full blur-3xl ${size} ${className}`}
    style={{
      animation: `float ${8 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  />
);

// --- Service Card Component ---
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white h-full border border-midnight-100/50 shadow-sm hover:shadow-2xl hover:shadow-midnight-900/10 transition-all duration-500">
        {/* Top accent bar */}
        <div className={`h-1.5 w-full ${service.accentColor}`} />

        {/* Hover glow effect */}
        <motion.div
          className={`absolute -inset-px rounded-3xl ${service.accentColor} opacity-0 blur-xl transition-opacity duration-500`}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
        />

        <div className="relative z-10 p-8 md:p-10">
          {/* Icon */}
          <motion.div
            className={`w-16 h-16 rounded-2xl ${service.accentColor} flex items-center justify-center mb-6 shadow-lg`}
            animate={{
              scale: isHovered ? 1.05 : 1,
              rotate: isHovered ? 3 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
          </motion.div>

          {/* Content */}
          <span className="text-midnight-400 font-sans text-sm uppercase tracking-[0.2em] mb-3 block font-medium">
            {service.subtitle}
          </span>

          <h3 className="font-serif text-3xl md:text-4xl text-midnight-900 mb-4 font-medium">
            {service.title}
          </h3>

          <p className="text-midnight-600 text-lg leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Features - Always visible on mobile, expandable on desktop */}
          <motion.div
            initial={false}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0
            }}
            className="overflow-hidden md:block hidden"
          >
            <ul className="space-y-3 pt-4 border-t border-midnight-100">
              {service.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 text-midnight-700"
                >
                  <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-sage-600" />
                  </div>
                  <span className="text-[15px]">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Mobile features - always visible */}
          <ul className="space-y-3 pt-4 border-t border-midnight-100 md:hidden">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-midnight-700">
                <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-sage-600" />
                </div>
                <span className="text-[15px]">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-midnight-900 font-semibold group/link"
            whileHover={{ x: 4 }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// --- FAQ Item Component ---
const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08 }}
      className="border-b border-midnight-100"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-7 flex items-center justify-between text-left group"
      >
        <h3 className="font-serif text-xl md:text-2xl text-midnight-900 group-hover:text-midnight-700 transition-colors pr-8 font-medium">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-11 h-11 rounded-full border-2 border-midnight-200 flex items-center justify-center flex-shrink-0 group-hover:border-brass-400 group-hover:bg-brass-50 transition-all"
        >
          <Plus className="w-5 h-5 text-midnight-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-7 text-midnight-600 text-lg leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Testimonial Card ---
const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-midnight-50 hover:shadow-xl hover:shadow-midnight-900/5 transition-all duration-500 relative overflow-hidden group"
    >
      {/* Quote mark */}
      <div className="absolute -top-4 -right-4 text-brass-100 opacity-50 group-hover:opacity-100 transition-opacity">
        <Quote className="w-24 h-24" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-brass-400 text-brass-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-midnight-800 text-lg md:text-xl leading-relaxed mb-8 relative z-10 font-serif italic">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-midnight-600 to-midnight-800 flex items-center justify-center text-cream font-serif text-lg font-medium">
          {testimonial.initials}
        </div>
        <div>
          <div className="font-semibold text-midnight-900">{testimonial.author}</div>
          <div className="text-midnight-500 text-sm">{testimonial.location}</div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function BrelandInsurance() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services: Service[] = [
    {
      id: "final-expense",
      title: "Final Expense",
      subtitle: "Peace of Mind",
      description: "Ensure your loved ones aren't burdened with end-of-life costs. Simple, affordable coverage that provides dignity and relief when it matters most.",
      features: [
        "No medical exam required",
        "Affordable monthly premiums",
        "Benefits paid within 24-48 hours",
        "Coverage from $5,000 to $50,000"
      ],
      icon: <Heart className="w-8 h-8 text-white" />,
      accentColor: "bg-gradient-to-r from-midnight-700 to-midnight-900"
    },
    {
      id: "whole-life",
      title: "Whole Life",
      subtitle: "Lifetime Protection",
      description: "Build cash value while protecting your family. A policy that grows with you and provides guaranteed lifetime coverage for generations.",
      features: [
        "Guaranteed death benefit",
        "Cash value accumulation",
        "Fixed premiums for life",
        "Living benefits available"
      ],
      icon: <Shield className="w-8 h-8 text-white" />,
      accentColor: "bg-gradient-to-r from-sage-600 to-sage-700"
    },
    {
      id: "iul",
      title: "Index Universal Life",
      subtitle: "Growth & Protection",
      description: "Flexible coverage linked to market performance without the downside risk. Your family's protection meets intelligent wealth building.",
      features: [
        "Market-linked growth potential",
        "Downside protection (0% floor)",
        "Flexible premium payments",
        "Tax-advantaged cash access"
      ],
      icon: <Sparkles className="w-8 h-8 text-white" />,
      accentColor: "bg-gradient-to-r from-brass-500 to-brass-600"
    },
    {
      id: "estate",
      title: "Wills, Trusts & Estate",
      subtitle: "Legacy Planning",
      description: "Protect your legacy and ensure your wishes are honored. Comprehensive estate planning to secure your family's future for generations.",
      features: [
        "Free will preparation",
        "Trust establishment",
        "Estate planning consultation",
        "Asset protection strategies"
      ],
      icon: <FileText className="w-8 h-8 text-white" />,
      accentColor: "bg-gradient-to-r from-parchment-600 to-parchment-700"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      quote: "Melani made the whole process so easy. I finally have peace of mind knowing my family is protected. She truly cares about her clients.",
      author: "Margaret T.",
      location: "Atlanta, GA",
      initials: "MT"
    },
    {
      id: "t2",
      quote: "John took the time to explain everything clearly. No pressure, just honest advice and genuine concern for our family's wellbeing.",
      author: "Robert & Linda K.",
      location: "Marietta, GA",
      initials: "RK"
    },
    {
      id: "t3",
      quote: "They helped us set up our wills and life insurance together. It truly felt like one family helping another. Couldn't recommend them more.",
      author: "The Williams Family",
      location: "Decatur, GA",
      initials: "WF"
    }
  ];

  const faqs = [
    {
      question: "What is final expense insurance?",
      answer: "Final expense insurance is a type of whole life insurance designed specifically to cover end-of-life costs such as funeral expenses, medical bills, and other debts. It typically offers coverage between $5,000 and $50,000 with simplified underwriting, meaning no medical exam is usually required. It's designed to be affordable and accessible for seniors."
    },
    {
      question: "How much life insurance do I need?",
      answer: "A common guideline is 10-12 times your annual income, but the right amount depends on your specific situation: your debts, number of dependents, future expenses like college tuition, and your family's lifestyle needs. During your free consultation, we'll help you calculate exactly what coverage makes sense for your unique circumstances."
    },
    {
      question: "What's the difference between term and whole life?",
      answer: "Term life insurance provides coverage for a specific period (10, 20, or 30 years) and is typically more affordable upfront. Whole life insurance covers you for your entire life and builds cash value over time that you can borrow against. We'll help you understand which option—or combination—best fits your needs and budget."
    },
    {
      question: "Do I need a medical exam to get coverage?",
      answer: "Not always! Many of our policies, especially final expense insurance, require no medical exam—just a simple health questionnaire. We offer simplified issue and guaranteed issue policies for those who may have health concerns. Everyone deserves protection, and we'll find a solution that works for you."
    },
    {
      question: "Why should I consider setting up a will or trust?",
      answer: "Without a will, the state decides how your assets are distributed—which may not align with your wishes. A trust can help your family avoid the lengthy and expensive probate process, potentially reduce estate taxes, and ensure your assets pass smoothly to your beneficiaries. We offer free will preparation as part of our commitment to protecting families completely."
    }
  ];

  const navItems = ['Services', 'About', 'Testimonials', 'FAQ'];

  return (
    <div className="w-full bg-cream text-midnight-900 font-sans overflow-x-hidden">
      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* --- Navigation --- */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-xl shadow-sm border-b border-midnight-100/50'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-midnight-900 flex items-center justify-center shadow-lg shadow-midnight-900/20 group-hover:shadow-xl group-hover:shadow-midnight-900/30 transition-all">
              <Shield className="w-5 h-5 text-brass-400" />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl text-midnight-900 font-semibold tracking-tight">Breland</span>
              <span className="font-serif text-xl text-midnight-400 italic ml-1">Insurance</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-midnight-600 hover:text-midnight-900 transition-colors font-medium link-underline pb-1"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-midnight-900 text-cream px-5 py-2.5 rounded-full hover:bg-midnight-800 transition-all shadow-lg shadow-midnight-900/20 hover:shadow-xl hover:shadow-midnight-900/30 font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-midnight-100 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-t border-midnight-100"
            >
              <nav className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-midnight-700 hover:text-midnight-900 font-medium text-lg py-2"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-4"
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Consultation
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- Hero Section --- */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <FloatingOrb className="bg-midnight-200/30 top-[10%] left-[10%]" delay={0} />
          <FloatingOrb className="bg-brass-200/40 bottom-[20%] right-[5%]" delay={1} size="w-[500px] h-[500px]" />
          <FloatingOrb className="bg-sage-200/30 top-[40%] right-[20%]" delay={2} size="w-72 h-72" />
          <FloatingOrb className="bg-parchment-200/30 bottom-[10%] left-[20%]" delay={1.5} size="w-64 h-64" />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0D182208_1px,transparent_1px),linear-gradient(to_bottom,#0D182208_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-midnight-100 shadow-sm mb-10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage-500"></span>
            </span>
            <span className="text-midnight-700 font-medium text-sm tracking-wide">Serving Georgia Families with Care</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8"
          >
            <span className="text-midnight-900">Protecting What</span>
            <br />
            <span className="italic text-midnight-500 font-light">Matters Most</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-midnight-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            Life insurance, final expense coverage, and estate planning—
            <span className="text-midnight-900 font-medium">with the personal touch your family deserves.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group"
            >
              <Calendar className="w-5 h-5" />
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="btn-secondary"
            >
              Explore Our Services
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-midnight-400"
          >
            {[
              { label: "Licensed & Insured", icon: Shield },
              { label: "Free Consultations", icon: Calendar },
              { label: "No-Exam Options", icon: Check }
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium">
                <Icon className="w-4 h-4 text-brass-500" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Curved wave separator */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-24 md:h-32">
            <path
              d="M0,120 C360,60 720,100 1080,60 C1260,40 1380,80 1440,120 L1440,120 L0,120 Z"
              fill="#FAF7F2"
            />
          </svg>
        </div>
      </section>

      {/* --- Stats Bar --- */}
      <section className="relative z-20 -mt-4 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl shadow-midnight-900/5 p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 border border-midnight-50"
          >
            {[
              { number: "500+", label: "Families Protected" },
              { number: "Free", label: "Will Preparation" },
              { number: "24hr", label: "Claims Support" },
              { number: "A+", label: "Rated Carriers" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-serif text-4xl md:text-5xl text-midnight-900 mb-2 font-semibold">{stat.number}</div>
                <div className="text-midnight-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-brass-600 font-semibold uppercase tracking-[0.2em] text-sm mb-6">
                Your Trusted Partners
              </span>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-midnight-900 mb-8 leading-[1.1] font-medium">
                Meet Melani & John{' '}
                <span className="italic text-midnight-500 font-light">Breland</span>
              </h2>

              <div className="space-y-5 text-midnight-600 text-lg leading-relaxed">
                <p>
                  We're not just insurance agents—we're neighbors, parents, and community members who understand deeply what it means to protect a family.
                </p>
                <p>
                  With over a decade of experience in the insurance industry, we've helped hundreds of Georgia families find the right coverage at the right price. <strong className="text-midnight-800">No high-pressure sales. No confusing jargon.</strong> Just honest advice from people who genuinely care.
                </p>
                <p className="text-midnight-900 font-medium text-xl font-serif italic">
                  "Because when it comes to your family's future, you deserve someone truly in your corner."
                </p>
              </div>

              {/* Team avatars */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-midnight-600 to-midnight-800 border-4 border-cream flex items-center justify-center text-cream font-serif text-xl font-medium shadow-lg">
                    M
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brass-500 to-brass-700 border-4 border-cream flex items-center justify-center text-white font-serif text-xl font-medium shadow-lg">
                    J
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl text-midnight-900 font-medium">Melani & John Breland</div>
                  <div className="text-midnight-500">Licensed Insurance Advisors</div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-midnight-900 font-semibold text-lg group"
                >
                  <span className="border-b-2 border-brass-400 pb-1 group-hover:border-brass-500 transition-colors">
                    Schedule a conversation
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-brass-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-midnight-100 via-parchment-100 to-sage-100 overflow-hidden relative shadow-2xl shadow-midnight-900/10">
                {/* Abstract family illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Central family icon */}
                    <motion.div
                      className="w-56 h-56 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-xl"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Users className="w-28 h-28 text-midnight-400" strokeWidth={1} />
                    </motion.div>

                    {/* Orbiting elements */}
                    <motion.div
                      className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brass-400/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
                      animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Shield className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-4 -left-8 w-20 h-20 rounded-full bg-sage-500/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
                      animate={{ y: [5, -5, 5], rotate: [0, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                      <Heart className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 -right-12 w-16 h-16 rounded-full bg-midnight-700/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                      <FileText className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom quote overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-midnight-900/95 via-midnight-900/80 to-transparent">
                  <p className="text-white/95 font-serif text-2xl italic font-light">
                    "One family protecting another."
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-8 -right-8 w-full h-full rounded-3xl bg-brass-200/50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 px-6 bg-gradient-to-b from-cream to-cream-200">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block text-brass-600 font-semibold uppercase tracking-[0.2em] text-sm mb-6">
              What We Offer
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-midnight-900 mb-6 font-medium">
              Coverage For{' '}
              <span className="italic text-midnight-500 font-light">Every Stage</span>
            </h2>
            <p className="text-midnight-600 text-xl max-w-2xl mx-auto leading-relaxed">
              From protecting your family today to planning for generations ahead—comprehensive solutions tailored to your unique needs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-midnight-600 mb-6">Not sure which coverage is right for you?</p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Phone className="w-5 h-5" />
              Let's Talk - It's Free
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section className="py-24 px-6 bg-midnight-950 text-cream relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brass-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-midnight-700/50 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-brass-400 font-semibold uppercase tracking-[0.2em] text-sm mb-6">
                The Breland Difference
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-10 leading-[1.1] font-medium">
                Why Families{' '}
                <span className="italic text-brass-400 font-light">Trust Us</span>
              </h2>

              <div className="space-y-8">
                {[
                  {
                    title: "No Medical Exam Options",
                    description: "Many of our policies require no medical exam—just a simple application. Protection shouldn't be complicated."
                  },
                  {
                    title: "Free Will Preparation",
                    description: "Protect your legacy with complimentary will preparation services. It's part of our complete family protection approach."
                  },
                  {
                    title: "Same-Day Coverage Available",
                    description: "Get approved and covered quickly—because peace of mind shouldn't have to wait."
                  },
                  {
                    title: "Lifetime Support & Service",
                    description: "We're here for your family today, tomorrow, and for generations to come. You'll never be just a policy number."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brass-500/20 flex items-center justify-center border border-brass-500/30">
                      <Check className="w-6 h-6 text-brass-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-midnight-300 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-3 mt-10 text-brass-400 font-semibold text-lg group"
              >
                <span className="border-b-2 border-brass-400/50 pb-1 group-hover:border-brass-400 transition-colors">
                  Experience the difference
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-midnight-800 to-midnight-900 rounded-3xl p-10 md:p-12 border border-midnight-700/50 shadow-2xl">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-brass-400 to-brass-600 flex items-center justify-center shadow-lg shadow-brass-500/30">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="font-serif text-3xl text-white mb-4 font-medium">
                    Ready to Get Started?
                  </h3>

                  <p className="text-midnight-300 mb-8 text-lg">
                    Schedule your free, no-obligation consultation. We'll help you find the perfect coverage for your family.
                  </p>

                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full justify-center text-lg"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Your Free Consultation
                  </a>

                  <p className="mt-6 text-midnight-400 text-sm">
                    No credit card required. 100% free, 100% helpful.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section id="testimonials" className="py-24 px-6 bg-cream-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-brass-600 font-semibold uppercase tracking-[0.2em] text-sm mb-6">
              Client Stories
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-midnight-900 font-medium">
              Families We've{' '}
              <span className="italic text-midnight-500 font-light">Helped</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-24 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-brass-600 font-semibold uppercase tracking-[0.2em] text-sm mb-6">
              Common Questions
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-midnight-900 font-medium">
              Frequently{' '}
              <span className="italic text-midnight-500 font-light">Asked</span>
            </h2>
          </motion.div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-midnight-50">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-midnight-600 mb-4">Have a question we didn't answer?</p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-midnight-900 font-semibold group"
            >
              <span className="border-b-2 border-brass-400 pb-1">Let's chat about it</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="py-24 px-6 bg-gradient-to-br from-midnight-900 via-midnight-950 to-midnight-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brass-500/10 rounded-full blur-[200px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-10 rounded-3xl bg-gradient-to-br from-brass-400 to-brass-600 flex items-center justify-center shadow-2xl shadow-brass-500/30"
          >
            <Shield className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight font-medium">
            Ready to Protect{' '}
            <span className="italic text-brass-400 font-light">Your Family?</span>
          </h2>

          <p className="text-midnight-200 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Get a free, no-obligation consultation. No pressure, no hassle—just honest guidance for your family's future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-lg group"
            >
              <Calendar className="w-5 h-5" />
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              Call Us Directly
            </a>
          </div>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-midnight-950 text-cream pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brass-500/20 flex items-center justify-center border border-brass-500/30">
                  <Shield className="w-6 h-6 text-brass-400" />
                </div>
                <div>
                  <span className="font-serif text-2xl text-white font-semibold">Breland</span>
                  <span className="font-serif text-2xl text-midnight-400 italic ml-2">Insurance</span>
                </div>
              </div>
              <p className="text-midnight-300 text-lg leading-relaxed max-w-md mb-8">
                Melani and John Breland are licensed insurance professionals dedicated to helping Georgia families find peace of mind through proper planning and protection.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brass-500 text-midnight-950 px-6 py-3 rounded-full font-semibold hover:bg-brass-400 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation
              </a>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Get In Touch</h4>
              <div className="space-y-4">
                <a href="tel:+1234567890" className="flex items-center gap-3 text-midnight-300 hover:text-brass-400 transition-colors">
                  <Phone className="w-5 h-5" />
                  (123) 456-7890
                </a>
                <a href="mailto:info@brelandinsurance.com" className="flex items-center gap-3 text-midnight-300 hover:text-brass-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  info@brelandinsurance.com
                </a>
                <div className="flex items-start gap-3 text-midnight-300">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Atlanta Metro Area<br />Georgia</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Our Services</h4>
              <ul className="space-y-3">
                {['Final Expense Insurance', 'Whole Life Insurance', 'Index Universal Life', 'Free Will Preparation', 'Trust & Estate Planning'].map((item) => (
                  <li key={item}>
                    <a href="#services" className="text-midnight-300 hover:text-brass-400 transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-midnight-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-midnight-500 text-sm">
              © {new Date().getFullYear()} Breland Family Insurance. All rights reserved.
            </p>
            <p className="text-midnight-600 text-xs max-w-xl text-center md:text-right">
              Insurance products offered through licensed carriers. Coverage and availability may vary by state.
              Melani Breland and John Breland are licensed insurance agents.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
