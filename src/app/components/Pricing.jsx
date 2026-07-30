import { Check, Star } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started with your preparation",
    features: [
      "Access to all previous year questions",
      "Basic study materials & notes",
      "Community support",
      "Progress tracking",
      "5 AI tutor queries per month"
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "₹299",
    period: "per month",
    description: "For serious students who want to excel",
    features: [
      "Everything in Free, plus",
      "Unlimited AI tutor queries",
      "Advanced analytics & insights",
      "Premium mock tests",
      "Personalized study plans",
      "Priority support",
      "Downloadable study materials"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "Premium",
    price: "₹599",
    period: "per month",
    description: "Complete preparation for board exams",
    features: [
      "Everything in Pro, plus",
      "One-on-one doubt clearing sessions",
      "Live doubt solving webinars",
      "Topper's strategy sessions",
      "College admission guidance",
      "Certificate of completion"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

export default function Pricing() {
  return (
    <section className="relative bg-white py-20 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade when you need more features. Premium plans coming soon!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 flex flex-col h-full ${
                plan.popular 
                  ? "bg-gradient-to-b from-blue-600 to-indigo-700 text-white scale-105 shadow-2xl" 
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" /> Most Popular
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className={`text-5xl font-extrabold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                </span>
                <span className={plan.popular ? "text-blue-100" : "text-gray-500"}>/{plan.period}</span>
              </div>
              <p className={`mb-8 ${plan.popular ? "text-blue-100" : "text-gray-600"}`}>
                {plan.description}
              </p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.popular ? "text-blue-200" : "text-green-500"
                    }`} />
                    <span className={plan.popular ? "text-blue-50" : "text-gray-700"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className={`w-full justify-center ${
                  plan.popular 
                    ? "bg-white text-blue-600 hover:bg-blue-50" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">🚀 Premium plans are under development. Join our waitlist to be notified when they launch!</p>
        </div>
      </Container>
    </section>
  );
}