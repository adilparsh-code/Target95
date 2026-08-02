"use client";

import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled UI error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto my-12 w-full max-w-3xl rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 text-center shadow-sm sm:p-12" role="alert">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Target95+</p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">This section needs a refresh</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            We could not load this part of the page. Refresh to continue learning.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Refresh page
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
