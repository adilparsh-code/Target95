"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
      
      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Stay Updated with Latest Study Materials
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates, study tips, and exclusive content directly in your inbox.
          </p>
          
          {subscribed ? (
            <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-white">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
              <p className="text-blue-100">Thank you for subscribing. You'll receive our next newsletter soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-grow px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Button 
                type="submit"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 whitespace-nowrap"
              >
                Subscribe
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}