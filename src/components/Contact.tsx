import React, { useState } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import {
  Sparkles,
  Send,
  Mail,
  Phone,
  Linkedin,
  Github,
  Instagram,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
  User,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// EmailJS credentials provided
const EMAILJS_SERVICE_ID = 'service_2kz28tp';
const EMAILJS_TEMPLATE_ID = 'template_04ee91a';
const EMAILJS_PUBLIC_KEY = 'O9vaqn-8R_CShExfl';

export const Contact: React.FC = () => {
  const { contact } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [serverFeedback, setServerFeedback] = useState<{ messageId?: string; error?: string; emailSent?: boolean } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide a message or project brief.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message should be at least 5 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerFeedback(null);

    let deliveredViaServer = false;

    try {
      // 1. Send via Express Backend (uses private key & server-side EmailJS API)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          deliveredViaServer = true;
          setSubmittedSuccess(true);
          setServerFeedback({ messageId: data.data?.id, emailSent: data.emailSent });
          setFormData({ name: '', email: '', message: '' });
          return;
        }
      }
    } catch (serverErr) {
      console.warn('Backend API submission skipped or failed, falling back to client-side EmailJS SDK:', serverErr);
    }

    // 2. Client-side EmailJS SDK fallback
    if (!deliveredViaServer) {
      try {
        const emailParams = {
          name: formData.name.trim(),
          from_name: formData.name.trim(),
          user_name: formData.name.trim(),
          email: formData.email.trim(),
          from_email: formData.email.trim(),
          user_email: formData.email.trim(),
          reply_to: formData.email.trim(),
          message: formData.message.trim(),
          user_message: formData.message.trim(),
          to_name: 'Chandra Kanta Khilar',
          time: new Date().toLocaleString(),
        };

        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          emailParams,
          EMAILJS_PUBLIC_KEY
        );

        if (result.status === 200 || result.text === 'OK') {
          setSubmittedSuccess(true);
          setServerFeedback({ messageId: `emailjs_${Date.now()}`, emailSent: true });
          setFormData({ name: '', email: '', message: '' });
        } else {
          setServerFeedback({ error: 'Failed to send email. Please check your network or try direct email.' });
        }
      } catch (clientErr: unknown) {
        console.error('EmailJS direct send error:', clientErr);
        const errMsg = clientErr instanceof Error ? clientErr.message : 'Failed to send message. Please email directly.';
        setServerFeedback({ error: errMsg });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setIsSubmitting(false);
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-5 h-5" />;
      case 'Phone':
        return <Phone className="w-5 h-5" />;
      case 'Linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'Github':
        return <Github className="w-5 h-5" />;
      case 'Instagram':
        return <Instagram className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-bold font-mono-code">
              06 // CONNECT & COLLABORATE
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            {contact.heading}
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-9 rounded-3xl bg-[#0A0A0A] border border-white/10 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Let's Build Something Memorable
              </h3>
              <p className="text-xs sm:text-sm text-white/50 mb-6 leading-relaxed">
                Whether you want a high-retention video edit, a distinctive graphic design asset, or want to collaborate on tech projects, feel free to reach out directly.
              </p>

              {/* Direct channels list */}
              <div className="space-y-2.5">
                {contact.socials.map((item) => (
                  <div
                    key={item.platform}
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-200"
                  >
                    <a
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-purple-400 group-hover:border-purple-500/40 transition-colors shrink-0">
                        {getSocialIcon(item.icon)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-mono-code uppercase text-white/40 tracking-wider">
                          {item.label}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                          {item.handle}
                        </span>
                      </div>
                    </a>

                    <div className="flex items-center gap-1.5 shrink-0 pl-2">
                      <button
                        id={`copy-contact-${item.platform.toLowerCase()}`}
                        onClick={() => handleCopy(item.handle, item.platform)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                        title="Copy to clipboard"
                        aria-label={`Copy ${item.platform} handle`}
                      >
                        {copiedKey === item.platform ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {item.url.startsWith('http') && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                          aria-label={`Open ${item.platform} link`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick response note */}
            <div className="p-4 rounded-full bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-white/60 font-mono-code flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for creative commissions & tech collabs
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-white/50 mb-8">
                Fill out the form below and I will respond to your inquiry promptly.
              </p>

              {submittedSuccess ? (
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center mx-auto text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your message has been sent directly to <strong className="text-purple-300">cchandrakantakhilar@gmail.com</strong> via EmailJS. Chandra Kanta Khilar will review your inquiry and get back to you shortly.
                  </p>
                  {serverFeedback?.messageId && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono-code text-purple-300">
                      <span>Delivery Ref:</span>
                      <span className="text-white/80">{serverFeedback.messageId}</span>
                    </div>
                  )}
                  <div>
                    <button
                      onClick={() => {
                        setSubmittedSuccess(false);
                        setServerFeedback(null);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-purple-400 hover:text-white transition-all shadow-md mt-2 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {serverFeedback?.error && (
                    <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 font-mono-code">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{serverFeedback.error}</span>
                    </div>
                  )}
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[10px] font-mono-code uppercase tracking-wider text-white/40 mb-2"
                    >
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                        }}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3.5 rounded-2xl bg-white/5 border ${
                          formErrors.name ? 'border-red-500/80 focus:ring-red-500' : 'border-white/10 focus:border-white/30'
                        } text-white placeholder:text-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all`}
                      />
                      <User className="w-4 h-4 text-white/30 absolute right-4 top-4 pointer-events-none" />
                    </div>
                    {formErrors.name && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 font-mono-code">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[10px] font-mono-code uppercase tracking-wider text-white/40 mb-2"
                    >
                      Your Email Address <span className="text-purple-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                        }}
                        placeholder="name@example.com"
                        className={`w-full px-4 py-3.5 rounded-2xl bg-white/5 border ${
                          formErrors.email ? 'border-red-500/80 focus:ring-red-500' : 'border-white/10 focus:border-white/30'
                        } text-white placeholder:text-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all`}
                      />
                      <Mail className="w-4 h-4 text-white/30 absolute right-4 top-4 pointer-events-none" />
                    </div>
                    {formErrors.email && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 font-mono-code">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[10px] font-mono-code uppercase tracking-wider text-white/40 mb-2"
                    >
                      Project Brief or Message <span className="text-purple-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                      }}
                      placeholder="Describe your project, creative brief, or collaboration idea..."
                      className={`w-full px-4 py-3.5 rounded-2xl bg-white/5 border ${
                        formErrors.message ? 'border-red-500/80 focus:ring-red-500' : 'border-white/10 focus:border-white/30'
                      } text-white placeholder:text-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all resize-y`}
                    />
                    {formErrors.message && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 font-mono-code">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-heading font-bold text-xs uppercase tracking-widest text-black bg-white hover:bg-purple-400 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[10px] font-mono-code text-white/30 uppercase tracking-wider">
                      Live interactive state • Response verification enabled
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
