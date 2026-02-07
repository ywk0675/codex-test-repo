import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans overflow-hidden antialiased items-center justify-center">
      {/* Mobile Container */}
      <div className="relative w-full max-w-md h-full min-h-screen flex flex-col bg-background-light dark:bg-background-dark overflow-hidden shadow-2xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-14 pb-4 bg-transparent z-10">
          {/* Brand / Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-xl">nights_stay</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">SleepCoach AI</h1>
          </div>
          {/* Skip Button */}
          <button
            onClick={() => navigate('/')}
            className="text-sm font-semibold text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Skip
          </button>
        </header>

        {/* Main Content Area (Carousel Wrapper) */}
        <main className="flex-1 flex flex-col relative w-full h-full">
          {/* Illustration Area */}
          <div className="flex-1 flex items-center justify-center px-6 py-4 relative">
            {/* Background decorative elements for soft feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/3 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Main Card Visual */}
            <div className="relative w-full aspect-[4/5] max-h-[420px] rounded-3xl overflow-hidden shadow-lg bg-card-light dark:bg-card-dark border border-slate-100 dark:border-slate-800 flex flex-col">
              {/* Image Half */}
              <div className="h-[65%] w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden group">
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKEOoSwyHMYnJBu6A3JUGOadFv7y3uCv6SpdML3UenLiLcrSHNn05pKogngGUqFX6nK5l4i3iONVmn3y6xWGNybJNhTMPIfsoEb7tvigAz5iQs21NG01FVNzCLIeifguHOeis1nUMyIWGOoSaHKZkPFt1dZZ_F4AGi0HroK6oUoY-GqQs2O_lF96ncla0cN1hG3ExFB6E6IL0pqGt_bdWOSB001KUMZlNuSjuPT6gTCz0LHi7RSH6Bic5e0BaXZQJIpKfRtbtmB0w')" }}
                >
                </div>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card-light dark:from-card-dark via-transparent to-transparent opacity-80"></div>
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">AI Powered</span>
                </div>
              </div>

              {/* Text Content Half */}
              <div className="flex-1 flex flex-col items-center text-center p-6 justify-start pt-2">
                <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">analytics</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight mb-2 text-slate-900 dark:text-white">
                  Sleep Science Made Simple
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed px-2">
                  Our AI analyzes your baby's unique rhythm to create the perfect sleep schedule, backed by pediatric data.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Control Area */}
          <div className="flex flex-col items-center w-full px-6 pb-10 pt-2 gap-6 bg-transparent z-10">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-8 rounded-full bg-primary transition-all duration-300"></div>
              <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>

            {/* Primary Action */}
            <div className="w-full flex flex-col gap-4">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
              >
                <span>Next</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
              <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                By continuing, you agree to our <a href="#" className="underline hover:text-primary transition-colors">Terms of Service</a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Onboarding;
