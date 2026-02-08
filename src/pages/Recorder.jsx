import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';

const Recorder = () => {
  const [sleepMode, setSleepMode] = useState('night'); // 'night' or 'nap'
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      h: hours.toString().padStart(2, '0'),
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0'),
    };
  };

  const { h, m, s } = formatTime(timer);

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-sans overflow-hidden">
      {/* Top App Bar */}
      <div className="flex items-center justify-between p-4 pb-2 shrink-0">
        <div className="text-white flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-dark/50">
          <span className="material-symbols-outlined text-[24px]">crib</span>
        </div>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Sleep Recorder</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-full size-12 hover:bg-surface-dark/50 transition-colors text-[#111418] dark:text-white">
            <span className="material-symbols-outlined text-[24px]">settings</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start overflow-y-auto w-full px-4 pb-24 hide-scrollbar">
        {/* Welcome Header */}
        <div className="w-full text-center pt-4 pb-6">
          <h2 className="text-[#111418] dark:text-white text-[28px] font-bold leading-tight">Good Evening, Ji-woo</h2>
          <p className="text-[#637588] dark:text-[#9dabb8] text-sm mt-1">Ready to track sweet dreams</p>
        </div>

        {/* Timer Display */}
        <div className="flex gap-3 w-full max-w-sm justify-center mb-8">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex h-20 w-full items-center justify-center rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-[#e5e7eb] dark:border-[#293038]">
              <p className="text-[#111418] dark:text-white text-4xl font-extrabold tracking-tight">{h}</p>
            </div>
            <span className="text-[#637588] dark:text-[#9dabb8] text-xs font-medium uppercase tracking-wider">Hours</span>
          </div>
          <div className="text-[#111418] dark:text-white text-4xl font-bold self-start mt-4">:</div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex h-20 w-full items-center justify-center rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-[#e5e7eb] dark:border-[#293038]">
              <p className="text-[#111418] dark:text-white text-4xl font-extrabold tracking-tight">{m}</p>
            </div>
            <span className="text-[#637588] dark:text-[#9dabb8] text-xs font-medium uppercase tracking-wider">Minutes</span>
          </div>
          <div className="text-[#111418] dark:text-white text-4xl font-bold self-start mt-4">:</div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex h-20 w-full items-center justify-center rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-[#e5e7eb] dark:border-[#293038]">
              <p className="text-[#111418] dark:text-white text-4xl font-extrabold tracking-tight">{s}</p>
            </div>
            <span className="text-[#637588] dark:text-[#9dabb8] text-xs font-medium uppercase tracking-wider">Seconds</span>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex w-full max-w-xs mb-8">
          <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-white dark:bg-surface-dark p-1 border border-[#e5e7eb] dark:border-[#293038] relative">
            <label className={`z-10 flex-1 cursor-pointer h-full flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200 ${sleepMode === 'night' ? 'bg-primary text-white shadow-md' : 'text-[#637588] dark:text-[#9dabb8]'}`}>
              <input
                type="radio"
                name="sleep_mode"
                value="night"
                className="hidden"
                checked={sleepMode === 'night'}
                onChange={() => setSleepMode('night')}
              />
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">bedtime</span>
                Night Sleep
              </span>
            </label>
            <label className={`z-10 flex-1 cursor-pointer h-full flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200 ${sleepMode === 'nap' ? 'bg-[#FFB74D] text-[#111921] shadow-md' : 'text-[#637588] dark:text-[#9dabb8]'}`}>
              <input
                type="radio"
                name="sleep_mode"
                value="nap"
                className="hidden"
                checked={sleepMode === 'nap'}
                onChange={() => setSleepMode('nap')}
              />
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                Nap
              </span>
            </label>
          </div>
        </div>

        {/* Main Action Button */}
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`group relative flex items-center justify-center size-48 rounded-full bg-gradient-to-br ${isRecording ? 'from-red-500 to-red-600 shadow-[0_0_40px_-10px_rgba(239,68,68,0.5)]' : 'from-primary to-[#1e6bb8] shadow-[0_0_40px_-10px_rgba(48,140,232,0.5)]'} text-white active:scale-95 transition-all duration-300 mb-10`}
        >
          <div className="absolute inset-2 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
          <div className="flex flex-col items-center gap-1 z-10">
            <span className={`material-symbols-outlined text-[48px] ${isRecording ? '' : 'animate-pulse'}`}>{isRecording ? 'stop' : 'play_arrow'}</span>
            <span className="text-xl font-bold tracking-wide">{isRecording ? 'STOP SLEEP' : 'START SLEEP'}</span>
          </div>
        </button>

        {/* Recent Records List */}
        <div className="w-full max-w-md flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[#111418] dark:text-white text-base font-bold">Recent History</h3>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          {/* List Item 1 */}
          <div className="flex items-center p-4 rounded-xl bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-[#293038] shadow-sm">
            <div className="size-10 rounded-full bg-pastel-blue/20 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0 mr-4">
              <span className="material-symbols-outlined text-[20px]">bedtime</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#111418] dark:text-white font-bold text-sm truncate">Night Sleep</p>
              <p className="text-[#637588] dark:text-[#9dabb8] text-xs truncate">Yesterday, 9:30 PM - 6:30 AM</p>
            </div>
            <div className="text-right">
              <p className="text-[#111418] dark:text-white font-bold text-sm">9h 00m</p>
            </div>
          </div>
          {/* List Item 2 */}
          <div className="flex items-center p-4 rounded-xl bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-[#293038] shadow-sm">
            <div className="size-10 rounded-full bg-[#FFF3E0] dark:bg-[#FFB74D]/20 flex items-center justify-center text-[#F57C00] dark:text-[#FFB74D] shrink-0 mr-4">
              <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#111418] dark:text-white font-bold text-sm truncate">Afternoon Nap</p>
              <p className="text-[#637588] dark:text-[#9dabb8] text-xs truncate">Yesterday, 2:15 PM - 3:45 PM</p>
            </div>
            <div className="text-right">
              <p className="text-[#111418] dark:text-white font-bold text-sm">1h 30m</p>
            </div>
          </div>
          {/* List Item 3 */}
          <div className="flex items-center p-4 rounded-xl bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-[#293038] shadow-sm">
            <div className="size-10 rounded-full bg-[#FFF3E0] dark:bg-[#FFB74D]/20 flex items-center justify-center text-[#F57C00] dark:text-[#FFB74D] shrink-0 mr-4">
              <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#111418] dark:text-white font-bold text-sm truncate">Morning Nap</p>
              <p className="text-[#637588] dark:text-[#9dabb8] text-xs truncate">Yesterday, 10:00 AM - 11:15 AM</p>
            </div>
            <div className="text-right">
              <p className="text-[#111418] dark:text-white font-bold text-sm">1h 15m</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Recorder;
