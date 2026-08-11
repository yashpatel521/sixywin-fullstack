'use client';

import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, Tag, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { submitContactFormAction } from '@/actions/contact/contactActions';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill out all fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitContactFormAction(formData);
      if (res.success) {
        toast.success('🎉 Message Sent Successfully!', {
          description: res.message,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(res.error || 'Failed to send message.');
      }
    } catch (err: any) {
      toast.error('Server error submitting contact form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-[#18120e]/85 border border-[#e6ca65]/50 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1 border-b border-[#9c663b]/30 pb-4">
        <h2 className="text-xl font-black text-[#faf6f0]">Send Us a Message</h2>
        <p className="text-xs text-[#b5a391]">
          Have feedback or technical questions? We respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#b5a391] uppercase flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#e6ca65]" /> Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 text-xs text-[#faf6f0] focus:outline-none focus:border-[#e6ca65] transition-colors"
          />
        </div>

        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#b5a391] uppercase flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#e6ca65]" /> Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 text-xs text-[#faf6f0] focus:outline-none focus:border-[#e6ca65] transition-colors"
          />
        </div>
      </div>

      {/* Subject Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#b5a391] uppercase flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[#e6ca65]" /> Subject
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Lottery Draw Inquiry / Feedback"
          className="w-full px-4 py-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 text-xs text-[#faf6f0] focus:outline-none focus:border-[#e6ca65] transition-colors"
        />
      </div>

      {/* Message Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#b5a391] uppercase flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-[#e6ca65]" /> Message
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Write your message here..."
          className="w-full px-4 py-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 text-xs text-[#faf6f0] focus:outline-none focus:border-[#e6ca65] transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] hover:from-[#fff0ad] hover:to-[#d4af37] text-[#0c0a09] text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all cursor-pointer border border-[#faf6f0]/40 disabled:opacity-50"
      >
        <Send className="w-4 h-4 fill-current" />
        <span>{loading ? 'SENDING MESSAGE...' : 'SEND MESSAGE NOW'}</span>
      </button>
    </form>
  );
};
