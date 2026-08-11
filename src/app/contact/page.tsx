'use client';

import React from 'react';
import { Mail, MessageSquare, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact SixyWin Support',
    url: 'https://sixywin.com/contact',
    description: 'Get in touch with the SixyWin virtual gaming support team.',
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <div className="w-full max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e6ca65]/10 border border-[#e6ca65]/30 text-[#e6ca65] text-xs font-mono font-bold">
            <Mail className="w-4 h-4 text-[#e6ca65]" />
            <span>24/7 PLAYER SUPPORT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#faf6f0]">
            Get In Touch With Us
          </h1>
          <p className="text-xs sm:text-base text-[#b5a391] max-w-xl mx-auto">
            We’re here to assist with 6/49 Lottery draws, virtual Sixy Coins, and technical inquiries.
          </p>
        </div>

        {/* Form + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[#18120e] border border-[#e6ca65]/40 space-y-3 shadow-xl">
              <Mail className="w-6 h-6 text-[#e6ca65]" />
              <h3 className="text-base font-black text-[#faf6f0]">Email Support</h3>
              <p className="text-xs text-[#b5a391]">support@sixywin.com</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#18120e] border border-[#e6ca65]/40 space-y-3 shadow-xl">
              <Clock className="w-6 h-6 text-[#e6ca65]" />
              <h3 className="text-base font-black text-[#faf6f0]">Response Hours</h3>
              <p className="text-xs text-[#b5a391]">24 Hours / 7 Days a Week</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#18120e] border border-[#e6ca65]/40 space-y-3 shadow-xl">
              <ShieldCheck className="w-6 h-6 text-[#e6ca65]" />
              <h3 className="text-base font-black text-[#faf6f0]">Fairness Verification</h3>
              <p className="text-xs text-[#b5a391]">
                Check seed hashes on-chain or verify your ticket records in real time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
