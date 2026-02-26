import Link from "next/link";
import {
  Truck,
  Users,
  DollarSign,
  MapPin,
  BarChart3,
  Shield,
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "HR Management",
    description:
      "Complete employee lifecycle management with records, hiring workflows, document storage, and role-based permissions.",
  },
  {
    icon: DollarSign,
    title: "Payroll System",
    description:
      "Automated driver pay calculations with hourly/salary support, deductions, bonuses, and tax-ready reports.",
  },
  {
    icon: Truck,
    title: "Dispatch Module",
    description:
      "Streamlined load assignments, route planning, real-time trip status updates, and driver communication.",
  },
  {
    icon: Shield,
    title: "Driver Management",
    description:
      "Comprehensive driver profiles, license tracking, compliance monitoring, and performance analytics.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description:
      "Advanced financial reports, driver performance metrics, fleet utilization dashboards, and KPI tracking.",
  },
  {
    icon: MapPin,
    title: "GPS Fleet Tracking",
    description:
      "Real-time truck locations, trip history visualization, geofencing alerts, and route optimization.",
  },
];

const plans = [
  {
    name: "Starter",
    price: 49,
    period: "month",
    description: "Perfect for small fleets",
    features: [
      "Up to 10 drivers",
      "Basic dispatch",
      "HR management",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: 149,
    period: "month",
    description: "For growing companies",
    popular: true,
    features: [
      "Up to 50 drivers",
      "Advanced dispatch & routing",
      "Full payroll system",
      "GPS fleet tracking",
      "Reports & analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: 399,
    period: "month",
    description: "For large operations",
    features: [
      "Unlimited drivers",
      "Custom integrations",
      "Advanced analytics & AI",
      "Dedicated account manager",
      "Custom branding",
      "24/7 phone support",
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Asuite <span className="text-brand-600">CRM</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-indigo-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium text-brand-700">
                The #1 Trucking CRM Platform
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              Manage Your Fleet
              <br />
              <span className="text-brand-600">With Confidence</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Asuite CRM is the all-in-one platform for trucking companies.
              From dispatch to payroll, fleet tracking to analytics — everything
              you need to run your business efficiently.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
              >
                Sign In to Dashboard
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Multi-tenant SaaS</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need to Run Your Fleet
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Six powerful modules designed specifically for the trucking
              industry, all working together seamlessly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that fits your fleet. All plans include a 14-day
              free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-brand-600 text-white ring-4 ring-brand-600/20 scale-105"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3
                  className={`text-xl font-bold ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    plan.popular ? "text-brand-100" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span
                    className={`text-sm ${
                      plan.popular ? "text-brand-100" : "text-gray-500"
                    }`}
                  >
                    /{plan.period}
                  </span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <CheckCircle2
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? "text-brand-200" : "text-brand-600"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`mt-8 block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.popular
                      ? "bg-white text-brand-600 hover:bg-brand-50"
                      : "bg-brand-600 text-white hover:bg-brand-700"
                  }`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Asuite CRM</span>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Asuite CRM. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
