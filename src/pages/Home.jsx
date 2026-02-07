import React from 'react';
import BottomNav from '../components/BottomNav';

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans selection:bg-primary/30">
      {/* Top App Bar */}
      <header className="flex items-center justify-between px-4 pt-6 pb-2 sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border-2 border-white dark:border-primary/20 overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              alt="Baby Ji-woo profile picture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTDI7vlGAtCs0UW_TWyKC-cgD2XAH96gze33uE-PUTfyOtrwe5J4C2j2ykxwkrOnqVLY4XKL3atWeLSvb4IHEQDcwqJ-io4X_Ip4SShgbRU4r8hE9niOS6f986CyYal0zSAoJ0x4JAYJzw9aG3LgTJkEd7BdCJD6tPLCViwARp-5ncUuXzfx5vFX73wpudIwKapXQcr1o6dE987gzKbmjSurfS6Ck1WkhQH0UvaFXCqPdL26NkjHErCqTUpcHtOKHzQA9Blh_lamY"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Good Evening</span>
            <h1 className="text-lg font-bold leading-tight">Ji-woo's Mom</h1>
          </div>
        </div>
        <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-surface-dark shadow-sm dark:shadow-none text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-dark"></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-2 space-y-6 pb-24 overflow-y-auto hide-scrollbar">
        {/* Sleep Summary Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <div className="flex items-center gap-2 mb-2 z-10">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-lg text-primary">
                <span className="material-symbols-outlined text-xl">bedtime</span>
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Sleep</span>
            </div>
            <div className="z-10">
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                9<span className="text-lg font-semibold text-slate-400">h</span> 20<span className="text-lg font-semibold text-slate-400">m</span>
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">+45m vs avg</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-2xl group-hover:bg-purple-100/50 transition-all"></div>
            <div className="flex items-center gap-2 mb-2 z-10">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-1.5 rounded-lg text-purple-500 dark:text-purple-400">
                <span className="material-symbols-outlined text-xl">crib</span>
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Wakings</span>
            </div>
            <div className="z-10">
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Last night: 12am, 4am</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tonight's Coaching Card (Hero) */}
        <section className="bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] dark:from-[#1e293b] dark:to-[#0f172a] rounded-2xl p-1 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=400&h=400&fit=crop')] bg-cover opacity-10 dark:opacity-20 rounded-full translate-x-10 -translate-y-10" role="presentation"></div>
          <div className="bg-white/60 dark:bg-surface-dark/60 backdrop-blur-sm rounded-xl p-5 h-full flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300 mb-3">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Tonight's Focus
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Extending the First Stretch</h3>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Based on last night's data, Ji-woo is waking up 45 minutes after bedtime. Try delaying the last feed by 15 minutes to build sleep pressure.
            </div>
            <div className="bg-white dark:bg-black/20 rounded-lg p-3 border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-lg">check_circle</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Suggested Action</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Delay last feed to 7:45 PM</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-1 bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <span>Start Routine</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Daily Checklist */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bedtime Routine</h3>
            <button className="text-xs font-semibold text-primary hover:text-blue-400">Edit Routine</button>
          </div>
          <div className="space-y-3">
            {/* Checklist Item 1: Done */}
            <label className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer transition-colors hover:border-primary/30">
              <div className="relative flex items-center">
                <input type="checkbox" defaultChecked className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-slate-300 dark:border-slate-600 bg-transparent transition-all checked:border-primary checked:bg-primary hover:border-primary/50" />
                <span className="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-white opacity-0 transition-opacity peer-checked:opacity-100">check</span>
              </div>
              <div className="flex-1 flex flex-col opacity-50 transition-opacity peer-checked:opacity-50 group-hover:opacity-100">
                <span className="text-sm font-semibold text-slate-900 dark:text-white line-through decoration-slate-400">Warm Bath</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">7:00 PM • 15 min</span>
              </div>
              <div className="h-8 w-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-400 dark:text-orange-300">
                <span className="material-symbols-outlined text-lg">bathtub</span>
              </div>
            </label>
            {/* Checklist Item 2: Pending */}
            <label className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer transition-colors hover:border-primary/30 ring-1 ring-primary/5 dark:ring-primary/20">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-slate-300 dark:border-slate-600 bg-transparent transition-all checked:border-primary checked:bg-primary hover:border-primary/50" />
                <span className="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-white opacity-0 transition-opacity peer-checked:opacity-100">check</span>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Lotion Massage</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">7:15 PM • 10 min</span>
              </div>
              <div className="h-8 w-8 rounded-lg bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-400 dark:text-pink-300">
                <span className="material-symbols-outlined text-lg">spa</span>
              </div>
            </label>
            {/* Checklist Item 3: Pending */}
            <label className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer transition-colors hover:border-primary/30">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-slate-300 dark:border-slate-600 bg-transparent transition-all checked:border-primary checked:bg-primary hover:border-primary/50" />
                <span className="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base text-white opacity-0 transition-opacity peer-checked:opacity-100">check</span>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Bedtime Story</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">7:30 PM • 15 min</span>
              </div>
              <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-400 dark:text-indigo-300">
                <span className="material-symbols-outlined text-lg">menu_book</span>
              </div>
            </label>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
