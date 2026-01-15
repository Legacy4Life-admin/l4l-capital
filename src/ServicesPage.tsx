import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Heart,
  FileText,
  Phone,
  MapPin,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar,
  Sparkles,
  TrendingUp,
  Building2,
  Landmark,
  GraduationCap,
  CreditCard,
  PiggyBank,
  Briefcase,
  Umbrella,
  HeartHandshake
} from 'lucide-react';

// --- Constants ---
const CALENDLY_URL = "https://calendly.com/melanibreland";
const MELANI_PHONE = "+1 (949) 400-8986";
const MELANI_PHONE_LINK = "tel:+19494008986";
const JOHN_PHONE = "(714) 875-5662";
const JOHN_PHONE_LINK = "tel:+17148755662";

const handlePhoneClick = (e: React.MouseEvent, name: string, phoneLink: string) => {
  e.preventDefault();
  if (window.confirm(`Call ${name}?`)) {
    window.location.href = phoneLink;
  }
};

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

// --- Service Card Component ---
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white h-full border border-midnight-100/50 shadow-sm hover:shadow-xl hover:shadow-midnight-900/10 transition-all duration-500">
        {/* Top accent bar */}
        <div className={`h-1 w-full ${service.accentColor}`} />

        {/* Hover glow effect */}
        <motion.div
          className={`absolute -inset-px rounded-2xl ${service.accentColor} opacity-0 blur-xl transition-opacity duration-500`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />

        <div className="relative z-10 p-6 md:p-8">
          {/* Icon */}
          <motion.div
            className={`w-14 h-14 rounded-xl ${service.accentColor} flex items-center justify-center mb-5 shadow-lg`}
            animate={{
              scale: isHovered ? 1.05 : 1,
              rotate: isHovered ? 2 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
          </motion.div>

          {/* Content */}
          <span className="text-midnight-400 font-sans text-xs uppercase tracking-[0.2em] mb-2 block font-medium">
            {service.subtitle}
          </span>

          <h3 className="font-serif text-2xl md:text-3xl text-midnight-900 mb-3 font-medium">
            {service.title}
          </h3>

          <p className="text-midnight-600 text-base leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 pt-4 border-t border-midnight-100">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-midnight-700">
                <div className="w-4 h-4 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-sage-600" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-midnight-900 font-semibold text-sm group/link"
            whileHover={{ x: 4 }}
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Services Page ---
export default function ServicesPage() {
  const services: Service[] = [
    {
      id: "tax-advantaged",
      title: "Tax Advantaged Strategies",
      subtitle: "Wealth Building",
      description: "Accumulate wealth and access it 100% tax-free. Strategic financial planning to minimize your tax burden while maximizing growth.",
      features: [
        "Tax-free accumulation",
        "Tax-free distributions",
        "Protected from market volatility",
        "Estate tax benefits"
      ],
      icon: <Landmark className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-midnight-700 to-midnight-900"
    },
    {
      id: "wealth-accumulation",
      title: "Wealth Accumulation",
      subtitle: "Long-Term Growth",
      description: "Build generational wealth through proven strategies designed to grow your assets steadily over time with professional guidance.",
      features: [
        "Diversified growth strategies",
        "Risk-adjusted portfolios",
        "Compound growth potential",
        "Regular progress reviews"
      ],
      icon: <TrendingUp className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-sage-600 to-sage-700"
    },
    {
      id: "infinite-banking",
      title: "Infinite Banking",
      subtitle: "Be Your Own Bank",
      description: "Create your own family banking system. Borrow from yourself, pay yourself interest, and build wealth that stays in your family.",
      features: [
        "Become your own banker",
        "Recapture interest payments",
        "Tax-advantaged growth",
        "Generational wealth transfer"
      ],
      icon: <Building2 className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-brass-500 to-brass-600"
    },
    {
      id: "asset-protection",
      title: "Asset Protection",
      subtitle: "Shield Your Wealth",
      description: "Protect what you've built from lawsuits, creditors, and unforeseen circumstances with strategic asset protection planning.",
      features: [
        "Lawsuit protection",
        "Creditor protection",
        "Privacy strategies",
        "Legal structuring"
      ],
      icon: <Shield className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-parchment-600 to-parchment-700"
    },
    {
      id: "qualified-rollovers",
      title: "Qualified Plan Rollovers",
      subtitle: "Retirement Optimization",
      description: "Optimize your 401(k), IRA, and other qualified plans. Make smart decisions about rollovers to maximize your retirement.",
      features: [
        "401(k) rollover guidance",
        "IRA optimization",
        "Pension maximization",
        "Tax-efficient transfers"
      ],
      icon: <PiggyBank className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-midnight-600 to-midnight-800"
    },
    {
      id: "college-funds",
      title: "College Education Funds",
      subtitle: "Future Planning",
      description: "Give your children the gift of education without the burden of debt. Smart savings strategies for college and beyond.",
      features: [
        "529 plan strategies",
        "Education savings accounts",
        "Scholarship optimization",
        "Flexible funding options"
      ],
      icon: <GraduationCap className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-sage-500 to-sage-700"
    },
    {
      id: "debt-management",
      title: "Debt Management",
      subtitle: "Financial Freedom",
      description: "Strategic debt elimination to accelerate your path to financial freedom. Get out of debt faster and smarter.",
      features: [
        "Debt elimination strategies",
        "Interest reduction tactics",
        "Cash flow optimization",
        "Financial freedom roadmap"
      ],
      icon: <CreditCard className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-brass-600 to-brass-700"
    },
    {
      id: "estate-planning",
      title: "Estate & Legacy Planning",
      subtitle: "Protect Your Legacy",
      description: "Ensure your wishes are honored and your legacy protected. Comprehensive estate planning for peace of mind.",
      features: [
        "Free will preparation",
        "Trust establishment",
        "Estate tax strategies",
        "Succession planning"
      ],
      icon: <FileText className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-midnight-700 to-midnight-900"
    },
    {
      id: "indexed-growth",
      title: "Indexed Growth",
      subtitle: "Market-Linked Returns",
      description: "Capture market upside with downside protection. Index-linked strategies that grow when markets are up and protect when they're down.",
      features: [
        "Market participation",
        "0% floor protection",
        "No direct market risk",
        "Competitive caps"
      ],
      icon: <Sparkles className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-sage-600 to-sage-800"
    },
    {
      id: "retirement",
      title: "Retirement Accounts",
      subtitle: "Secure Your Future",
      description: "Plan for the retirement you deserve. IRA, Roth, and pension strategies tailored to your unique situation.",
      features: [
        "IRA & Roth strategies",
        "Pension optimization",
        "Income planning",
        "Social Security timing"
      ],
      icon: <Umbrella className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-parchment-500 to-parchment-700"
    },
    {
      id: "business-strategies",
      title: "Business Owner Strategies",
      subtitle: "Entrepreneur Solutions",
      description: "Specialized strategies for business owners. Protect your business, reduce taxes, and plan your exit strategy.",
      features: [
        "Key person insurance",
        "Buy-sell agreements",
        "Business succession",
        "Executive benefits"
      ],
      icon: <Briefcase className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-brass-500 to-brass-700"
    },
    {
      id: "final-expense",
      title: "Final Expense Strategies",
      subtitle: "Peace of Mind",
      description: "Protect your family from end-of-life costs. Simple, affordable coverage that provides dignity and relief.",
      features: [
        "No medical exam options",
        "Affordable premiums",
        "Quick approval",
        "Guaranteed acceptance"
      ],
      icon: <Heart className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-midnight-600 to-midnight-900"
    },
    {
      id: "life-insurance",
      title: "Life Insurance & Living Benefits",
      subtitle: "Complete Protection",
      description: "Protection that works for you while you're alive. Access benefits for chronic illness, critical illness, and more.",
      features: [
        "Death benefit protection",
        "Living benefits access",
        "Chronic illness riders",
        "Terminal illness benefits"
      ],
      icon: <HeartHandshake className="w-7 h-7 text-white" />,
      accentColor: "bg-gradient-to-r from-sage-500 to-sage-700"
    }
  ];

  return (
    <div className="w-full bg-cream text-midnight-900 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-cream/90 backdrop-blur-xl border-b border-midnight-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-midnight-900 flex items-center justify-center shadow-lg shadow-midnight-900/20">
              <Shield className="w-5 h-5 text-brass-400" />
            </div>
            <div>
              <span className="font-serif text-xl text-midnight-900 font-semibold tracking-tight">Breland</span>
              <span className="font-serif text-xl text-midnight-400 italic ml-1">Financial</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 text-midnight-600 hover:text-midnight-900 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-midnight-900 text-cream px-5 py-2.5 rounded-full hover:bg-midnight-800 transition-all shadow-lg shadow-midnight-900/20 font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book Consultation</span>
              <span className="sm:hidden">Book</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-cream to-cream-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-brass-600 font-semibold uppercase tracking-[0.2em] text-sm mb-6">
              Everything We Offer
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-midnight-900 mb-6 font-medium leading-tight">
              We Can Help With{' '}
              <span className="italic text-midnight-500 font-light">All of This</span>
            </h1>
            <p className="text-midnight-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Comprehensive financial strategies tailored to your unique goals. From tax-advantaged wealth building to legacy planning—we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-midnight-900 via-midnight-950 to-midnight-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 font-medium">
            Ready to Get Started?
          </h2>
          <p className="text-midnight-300 text-lg mb-8">
            Schedule your free consultation and let's discuss which strategies are right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30"
            >
              <Calendar className="w-5 h-5" />
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/#get-started"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              Take the Quiz
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight-950 text-cream pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brass-500/20 flex items-center justify-center border border-brass-500/30">
                  <Shield className="w-6 h-6 text-brass-400" />
                </div>
                <div>
                  <span className="font-serif text-2xl text-white font-semibold">Breland</span>
                  <span className="font-serif text-2xl text-midnight-400 italic ml-2">Financial</span>
                </div>
              </div>
              <p className="text-midnight-300 leading-relaxed mb-6">
                Helping California families build wealth and secure their financial future.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-brass-400 hover:text-brass-300 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
              <div className="space-y-4">
                <a
                  href={MELANI_PHONE_LINK}
                  onClick={(e) => handlePhoneClick(e, "Melani", MELANI_PHONE_LINK)}
                  className="flex items-center gap-3 text-midnight-300 hover:text-brass-400 transition-colors cursor-pointer"
                >
                  <Phone className="w-5 h-5" />
                  <span>
                    <span className="text-midnight-400 text-sm">Melani:</span><br />
                    {MELANI_PHONE}
                  </span>
                </a>
                <a
                  href={JOHN_PHONE_LINK}
                  onClick={(e) => handlePhoneClick(e, "John", JOHN_PHONE_LINK)}
                  className="flex items-center gap-3 text-midnight-300 hover:text-brass-400 transition-colors cursor-pointer"
                >
                  <Phone className="w-5 h-5" />
                  <span>
                    <span className="text-midnight-400 text-sm">John:</span><br />
                    {JOHN_PHONE}
                  </span>
                </a>
                <div className="flex items-start gap-3 text-midnight-300">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Orange County, California</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Get Started', 'FAQ'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === 'Home' ? '/' : `/#${item.toLowerCase().replace(' ', '-')}`}
                      className="text-midnight-300 hover:text-brass-400 transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-midnight-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-midnight-500 text-sm">
              © {new Date().getFullYear()} Breland Financial. All rights reserved.
            </p>
            <p className="text-midnight-600 text-xs max-w-xl text-center md:text-right">
              Financial products and insurance offered through licensed carriers. Services and availability may vary by state.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
