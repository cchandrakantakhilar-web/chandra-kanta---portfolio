import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Sparkles, ExternalLink, CheckCircle2, ShieldCheck, Copy, Check, Eye } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { CertificateItem } from '../types';

export const Certificates: React.FC = () => {
  const { certificates } = portfolioData;
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (cert: CertificateItem) => {
    navigator.clipboard.writeText(
      `Title: ${cert.title}\nIssuer: ${cert.issuer}\nDate: ${cert.date}\nCode: ${cert.placeholderCode}`
    );
    setCopiedId(cert.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certificates" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-bold font-mono-code">
                04 // CERTIFICATES & LEARNING
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Verified Coursework &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Certifications
              </span>
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Academic specializations, technical coursework, and Coursera certificates. Structured with easily customizable slots.
            </p>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => {
            return (
              <div
                key={cert.id}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#0A0A0A] border border-white/10 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              >
                <div>
                  {/* Top Bar: Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono-code uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                      {cert.badgeText}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Certificate Image / Badge Visual Box */}
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/5 flex flex-col items-center justify-center p-2 text-center mb-5 group-hover:border-purple-500/40 transition-all cursor-pointer group/img"
                  >
                    {cert.imageUrl ? (
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
                        <img
                          src={cert.imageUrl}
                          alt={`${cert.title} Certificate`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                          <span className="text-[9px] font-mono-code px-2 py-0.5 rounded-full bg-black/80 text-purple-300 border border-white/10 backdrop-blur-sm">
                            {cert.issuer}
                          </span>
                          <span className="text-[9px] font-mono-code text-white/70 flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded-full border border-white/10">
                            <Eye className="w-2.5 h-2.5" /> View
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20" />
                        <ShieldCheck className="w-7 h-7 text-purple-400 mb-2 relative z-10" />
                        <span className="relative z-10 text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-black/60 text-white/90 border border-white/20 font-semibold tracking-wide text-center">
                          {cert.title}
                        </span>
                        <span className="relative z-10 text-[9px] font-mono-code text-white/40 mt-1">
                          {cert.issuer}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Placeholders breakdown */}
                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-[9px] uppercase font-mono-code text-white/40 tracking-wider">Title:</span>
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                        {cert.title}
                      </h4>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-mono-code text-white/40 tracking-wider">Platform:</span>
                      <p className="text-xs font-medium text-white/70">
                        {cert.issuer}
                      </p>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-mono-code text-white/40 tracking-wider">Issued Date:</span>
                      <p className="text-xs font-mono-code text-white/40">
                        {cert.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                  <button
                    id={`view-cert-btn-${cert.id}`}
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-purple-400 hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>

                  <button
                    id={`copy-cert-btn-${cert.id}`}
                    onClick={() => handleCopyCode(cert)}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
                    title="Copy certificate template info"
                  >
                    {copiedId === cert.id ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal viewer for Certificate Details */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono-code px-3 py-1 rounded-full bg-white/5 text-purple-300 border border-white/10">
                  {selectedCert.badgeText} Verification
                </span>
                <span className="text-[10px] uppercase font-mono-code px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                  {selectedCert.issuer}
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Certificate Preview Image or Placeholder Banner */}
            {selectedCert.imageUrl ? (
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-lg mb-6 group">
                <img
                  src={selectedCert.imageUrl}
                  alt={`${selectedCert.title} Certificate`}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain max-h-[380px] mx-auto"
                />
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center mb-6">
                <ShieldCheck className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                <h3 className="font-heading text-lg font-bold text-white mb-1">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-purple-300 font-mono-code mb-1">{selectedCert.issuer}</p>
                <p className="text-xs text-white/40 font-mono-code">{selectedCert.date}</p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                  {selectedCert.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code text-white/50">
                  <span>Platform: <strong className="text-purple-300">{selectedCert.issuer}</strong></span>
                  <span>•</span>
                  <span>Status: <strong className="text-emerald-400">{selectedCert.date}</strong></span>
                  {selectedCert.placeholderCode && (
                    <>
                      <span>•</span>
                      <span>ID: <strong className="text-white/80">{selectedCert.placeholderCode}</strong></span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {selectedCert.description}
              </p>

              {/* Skills Tags */}
              {selectedCert.skillsCovered && selectedCert.skillsCovered.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-mono-code text-white/40 block mb-2">Competencies & Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skillsCovered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono-code px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              {selectedCert.credentialUrl && selectedCert.credentialUrl !== '#' ? (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-purple-400 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify on {selectedCert.issuer}</span>
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/5 text-white/70 hover:text-white border border-white/10 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
