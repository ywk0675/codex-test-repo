import React from 'react';
import BottomNav from '../components/BottomNav';

const Patterns = () => {
  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans overflow-x-hidden">
      <div className="relative flex h-full w-full flex-col max-w-md mx-auto border-x border-slate-200 dark:border-slate-800">
        {/* Header */}
        <header className="flex items-center justify-between p-4 pb-2 bg-background-light dark:bg-background-dark sticky top-0 z-10">
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Oct 16 - Oct 22</h2>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Week 42</span>
          </div>
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white">
            <span className="material-symbols-outlined">share</span>
          </button>
        </header>

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
          {/* Page Title */}
          <div className="px-5 pt-4 pb-2">
            <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Sleep Patterns</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Analyzing 7 days of sleep data</p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Night Sleep</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-nap"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Nap</span>
            </div>
          </div>

          {/* Timeline Chart Container */}
          <div className="px-4">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
              {/* Time Markers (Approximate) */}
              <div className="flex justify-between px-10 mb-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>12am</span>
                <span>6am</span>
                <span>12pm</span>
                <span>6pm</span>
              </div>
              {/* Days Rows */}
              <div className="flex flex-col gap-5 relative">
                {/* Vertical Grid Lines */}
                <div className="absolute inset-0 left-10 right-0 flex justify-between pointer-events-none opacity-10">
                  <div className="w-px bg-slate-500 h-full"></div>
                  <div className="w-px bg-slate-500 h-full"></div>
                  <div className="w-px bg-slate-500 h-full"></div>
                  <div className="w-px bg-slate-500 h-full"></div>
                </div>

                {/* Mon */}
                <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 text-right">Mon</span>
                  <div className="relative h-8 bg-slate-100 dark:bg-slate-800/50 rounded-full w-full overflow-hidden flex items-center">
                    <div className="absolute left-0 h-full bg-primary rounded-r-full" style={{ width: '29%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '37%', width: '6%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '54%', width: '6%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '70%', width: '3%' }}></div>
                    <div className="absolute right-0 h-full bg-primary rounded-l-full" style={{ width: '18%' }}></div>
                  </div>
                </div>

                {/* Tue */}
                <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 text-right">Tue</span>
                  <div className="relative h-8 bg-slate-100 dark:bg-slate-800/50 rounded-full w-full overflow-hidden flex items-center">
                    <div className="absolute left-0 h-full bg-primary rounded-r-full" style={{ width: '27%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '35%', width: '8%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '55%', width: '5%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '72%', width: '4%' }}></div>
                    <div className="absolute right-0 h-full bg-primary rounded-l-full" style={{ width: '19%' }}></div>
                  </div>
                </div>

                {/* Wed */}
                <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 text-right">Wed</span>
                  <div className="relative h-8 bg-slate-100 dark:bg-slate-800/50 rounded-full w-full overflow-hidden flex items-center">
                    <div className="absolute left-0 h-full bg-primary rounded-r-full" style={{ width: '30%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '40%', width: '5%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '58%', width: '7%' }}></div>
                    <div className="absolute right-0 h-full bg-primary rounded-l-full" style={{ width: '17%' }}></div>
                  </div>
                </div>

                {/* Thu */}
                <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 text-right">Thu</span>
                  <div className="relative h-8 bg-slate-100 dark:bg-slate-800/50 rounded-full w-full overflow-hidden flex items-center">
                    <div className="absolute left-0 h-full bg-primary rounded-r-full" style={{ width: '28%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '36%', width: '7%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '53%', width: '6%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '69%', width: '4%' }}></div>
                    <div className="absolute right-0 h-full bg-primary rounded-l-full" style={{ width: '20%' }}></div>
                  </div>
                </div>

                {/* Fri */}
                <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 text-right">Fri</span>
                  <div className="relative h-8 bg-slate-100 dark:bg-slate-800/50 rounded-full w-full overflow-hidden flex items-center">
                    <div className="absolute left-0 h-full bg-primary rounded-r-full" style={{ width: '25%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '33%', width: '9%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '55%', width: '5%' }}></div>
                    <div className="absolute right-0 h-full bg-primary rounded-l-full" style={{ width: '21%' }}></div>
                  </div>
                </div>

                {/* Sat */}
                <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 text-right">Sat</span>
                  <div className="relative h-8 bg-slate-100 dark:bg-slate-800/50 rounded-full w-full overflow-hidden flex items-center">
                    <div className="absolute left-0 h-full bg-primary rounded-r-full" style={{ width: '31%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '41%', width: '5%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '58%', width: '6%' }}></div>
                    <div className="absolute right-0 h-full bg-primary rounded-l-full" style={{ width: '18%' }}></div>
                  </div>
                </div>

                {/* Sun (Today) */}
                <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                  <span className="text-xs font-bold text-primary dark:text-primary text-right">Today</span>
                  <div className="relative h-8 bg-slate-100 dark:bg-slate-800/50 rounded-full w-full overflow-hidden flex items-center ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark">
                    <div className="absolute left-0 h-full bg-primary rounded-r-full" style={{ width: '30%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '39%', width: '6%' }}></div>
                    <div className="absolute h-4 top-2 bg-nap rounded-full" style={{ left: '56%', width: '6%' }}></div>
                    <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-white/50 z-10" style={{ left: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="flex flex-wrap gap-4 p-4 mt-2">
            {/* Avg Total Sleep */}
            <div className="flex min-w-[150px] flex-1 flex-col gap-3 rounded-2xl p-5 bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-[20px]">bedtime</span>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+15m</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">Avg. Total Sleep</p>
                <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight mt-1">13h 20m</p>
              </div>
            </div>
            {/* Avg Wake Window */}
            <div className="flex min-w-[150px] flex-1 flex-col gap-3 rounded-2xl p-5 bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-nap/20 text-yellow-600 dark:text-nap">
                  <span className="material-symbols-outlined text-[20px]">sunny</span>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+5m</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">Avg. Wake Window</p>
                <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight mt-1">1h 45m</p>
              </div>
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="px-4">
            <div className="relative overflow-hidden flex flex-col gap-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background-light to-background-light dark:from-primary/10 dark:via-background-dark dark:to-background-dark p-5">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[80px] text-primary">auto_awesome</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                </div>
                <p className="text-primary text-sm font-bold uppercase tracking-wide">AI Insight</p>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-relaxed pr-8">
                Your baby's wake windows are consistent with a 4-month-old schedule. Night sleep is stabilizing nicely.
              </p>
              <button className="self-start mt-2 flex cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-semibold leading-normal">
                View Details
              </button>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Patterns;
