"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Phone, KeyRound, X, CheckCircle2, Zap } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, sendOtp, verifyOtp, isDevFallback } = useAuth();

  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await sendOtp(phone, 'recaptcha-container');
      if (res.success) {
        setStep('otp');
      } else {
        setError(res.error || 'Failed to dispatch verification SMS.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDirect = async (codeToUse: string) => {
    if (!codeToUse || codeToUse.length < 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await verifyOtp(codeToUse);
      if (!res.success) {
        setError(res.error || 'Invalid code entered. Please check your SMS.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification error.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleVerifyDirect(otp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl p-5 sm:p-8 my-auto max-h-[92vh] overflow-y-auto">
        {/* Invisible Recaptcha Container */}
        <div id="recaptcha-container" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-obsidian hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#F9D024] flex items-center justify-center mx-auto mb-3 shadow-rapido text-obsidian font-black">
            <Zap className="w-7 h-7 fill-obsidian" />
          </div>
          <h3 className="text-2xl font-black text-obsidian">
            Sign In with Phone
          </h3>
          <p className="text-xs text-stone-500 font-semibold mt-1">
            Access transparent municipal pricing & instant Captain dispatch.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          /* Step 1: Phone Number Input */
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1.5">
                Mobile Number
              </label>
              <div className="flex items-center rounded-2xl border border-stone-300 bg-white px-3.5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                <span className="text-xs font-black text-obsidian mr-2 border-r border-stone-300 pr-2">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98200 12345"
                  className="w-full text-base sm:text-sm font-bold text-obsidian bg-transparent outline-none placeholder:text-stone-400"
                  autoFocus
                />
              </div>
              <p className="text-[10px] text-stone-500 font-semibold mt-1">
                Enter your mobile number to receive 6-digit verification code.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || phone.length < 10}
              className="w-full py-4 px-5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin" />
              ) : (
                <>
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send Verification Code</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <div className="space-y-4">
            {/* Helpful Banner when carrier SMS is blocked or testing on localhost/IP */}
            {isDevFallback && (
              <div className="p-3.5 rounded-2xl bg-[#FEF9C3] border border-yellow-300 text-obsidian text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black flex items-center gap-1.5 text-obsidian">
                    <Zap className="w-3.5 h-3.5 fill-[#F9D024]" />
                    <span>Instant Verification Mode</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#F9D024] text-obsidian uppercase">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-stone-700 leading-snug">
                  SMS gateway blocked carrier dispatch on localhost/IP. To sign in with <strong className="font-black text-obsidian">+91 {phone}</strong>, enter <strong className="font-mono font-black text-obsidian">123456</strong> or tap below:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOtp('123456');
                    handleVerifyDirect('123456');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-obsidian text-[#F9D024] font-black text-xs flex items-center justify-center gap-1.5 hover:bg-stone-800 transition active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-[#F9D024]" />
                  <span>⚡ Tap to Auto-Fill 123456 & Login</span>
                </button>
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                    Enter 6-Digit Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-[11px] font-bold text-stone-900 underline"
                  >
                    Change Number
                  </button>
                </div>

                <div className="flex items-center rounded-2xl border border-stone-300 bg-white px-3.5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
                  <KeyRound className="w-4 h-4 text-stone-600 mr-2.5" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="w-full text-center font-mono text-2xl font-black tracking-widest text-obsidian bg-transparent outline-none"
                    autoFocus
                  />
                </div>
                <p className="text-[10px] text-stone-500 font-semibold mt-1 text-center">
                  Verification code sent to +91 {phone}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-4 px-5 rounded-2xl bg-[#F9D024] hover:bg-[#EAB308] text-obsidian font-black text-xs uppercase tracking-wider shadow-rapido border border-yellow-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Verify & Enter Sputo</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
