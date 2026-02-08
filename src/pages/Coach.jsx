import React, { useRef, useEffect } from 'react';
import BottomNav from '../components/BottomNav';

const Coach = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans overflow-hidden selection:bg-primary/30">
      {/* Header */}
      <header className="flex-none bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 pt-safe-top">
        <div className="flex items-center justify-between p-4 h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border-2 border-slate-100 dark:border-slate-800"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHj9qva-74Kve92CSLdoBhn9ZlnAHPk27X-kvjjjspbKsKiJ3WdN_gCCUoX_UyIOm6zpEkcEYzjjUK5l1_faL46sCpQlkSvsI8XAOi7Nt8-YEeHb4CjLuIUA7lZoDzdBawbULSw5wa1NxmzOtGrRKHxQz0CDqnu86aXoifn-nMrmgLn7Ai_SDp0E1kT1-Rh02ZUW3iUZ-yw0ktStpdY-oA5AhzyxXz7J8I7oLIUtBzsTFfCH82a8QNrA3q_kYOjqflzcRIw2naIaw')" }}
              >
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-background-dark rounded-full"></div>
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">Luna Coach</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Online • Ji-woo (7m)</p>
            </div>
          </div>
          <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-full transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        {/* Situational Chips */}
        <div className="pb-3 px-4 flex gap-2 overflow-x-auto no-scrollbar snap-x">
          <button className="snap-start shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary text-white text-sm font-medium shadow-sm ring-1 ring-primary/20">
            <span className="material-symbols-outlined text-[18px]">bedtime</span>
            Sleep training?
          </button>
          <button className="snap-start shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[18px]">child_care</span>
            Teething
          </button>
          <button className="snap-start shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            Nap schedule
          </button>
          <button className="snap-start shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
            Night waking
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth hide-scrollbar pb-48" id="chat-container" ref={scrollRef}>
        {/* Timestamp */}
        <div className="flex justify-center">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-surface-dark px-3 py-1 rounded-full">Today, 8:30 PM</span>
        </div>

        {/* AI Message */}
        <div className="flex items-end gap-3">
          <div
            className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHpCAIkNVJBK4Zl0Ql4k6i9DlmpQLU12xKRPie_5N9-X9mbrlsUB8VAX_82WPxT-5lI3_G4Ufm-8dw50UGw27EZS7mMZBCFJBHeY7LO3MOD8NOwd6__JRyf32dJikETAFBWvYcFjDINz9dAWWXXjSPB2uTHTFOv0SAS1PwdixL73evu-lQlOTzmpofLtR95YVjywjVv5Y6CVWYjn7ELvcSb0-mXCjk5sYvZi2cfTBHsyW9K1anLf7H8uzO2aELOzzXAm_9-SKf4C8')" }}
          ></div>
          <div className="flex flex-col gap-1 max-w-[80%]">
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">Luna Coach</span>
            <div className="bg-white dark:bg-surface-dark p-3.5 rounded-2xl rounded-bl-sm shadow-sm text-sm leading-relaxed text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/50">
              <p>Good evening! 👋 Ji-woo is 7 months old now. Is she showing signs of tiredness yet?</p>
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="flex items-end justify-end gap-3">
          <div className="flex flex-col items-end gap-1 max-w-[80%]">
            <div className="bg-primary text-white p-3.5 rounded-2xl rounded-br-sm shadow-md text-sm leading-relaxed">
              <p>She rubbed her eyes, but she's fighting the nap. 😫</p>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 mr-1">Read 8:32 PM</span>
          </div>
        </div>

        {/* AI Message with Card */}
        <div className="flex items-end gap-3">
          <div
            className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrvzB1kK_mCkZukdo6WxORwefi83mdy916_IIRCEiN7A01afWLsuR4NKlof9gEnQeQtxkLvBFpSGwZGZpQZyipGYXQf_qTzzJCAFPhta3wF1eX-kK_Lh8cDyMmwwM6d9-2DWl0GJGATv3wZLS6hC7gUqFTL8e-rsPuJm9JH7RODgkIYZSkeUxjTO1QBaM3bYc_xxceRL0C3o189NH0F6-fZmE5KZNEgkULojJDGSbduRrrUoR3v0ALLCHe-JfIzkXNF0rAOy8TNE4')" }}
          ></div>
          <div className="flex flex-col gap-1 max-w-[85%]">
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">Luna Coach</span>
            <div className="bg-white dark:bg-surface-dark p-3.5 rounded-2xl rounded-bl-sm shadow-sm text-sm leading-relaxed text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/50">
              <p>It sounds like she might be overtired. At 7 months, wake windows can be tricky.</p>
              <p className="mt-2">Let's try a shortened wind-down routine. I've prepared a specific schedule for tonight to help her settle.</p>
            </div>
            {/* AI Suggestion Card embedded in chat */}
            <div className="mt-1 bg-surface-dark/5 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 w-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                  <span className="material-symbols-outlined text-[20px]">bedtime</span>
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white">Suggested Routine</p>
                  <p className="text-xs text-slate-500">Duration: 15 mins</p>
                </div>
              </div>
              <ul className="space-y-2 mb-3">
                <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                  Warm bath (5 min)
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                  Lullaby &amp; Massage (5 min)
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                  White noise on
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex items-end gap-3 opacity-0 animate-pulse" style={{ animationFillMode: 'forwards', animationDelay: '1s', animationDuration: '2s' }}>
          <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0"></div>
          <div className="bg-white dark:bg-surface-dark px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 dark:border-slate-700/50 flex gap-1">
            <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-[80px] left-0 right-0 bg-background-light dark:bg-background-dark z-30">
        {/* Floating Gradient Overlay */}
        <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        {/* Input Area */}
        <div className="px-4 pb-2">
          {/* Save Plan Button (Sticky) */}
          <button className="w-full mb-4 bg-primary hover:bg-blue-500 active:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]">
            <span className="material-symbols-outlined">bookmark</span>
            Save tonight's plan
          </button>
          {/* Chat Input */}
          <div className="flex items-end gap-2 bg-white dark:bg-surface-dark p-1.5 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm">
            <button className="p-2.5 text-slate-400 hover:text-primary transition-colors rounded-full">
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
            </button>
            <input
              className="flex-1 bg-transparent border-0 focus:ring-0 text-sm py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
              type="text"
              placeholder="Ask about Ji-woo's sleep..."
            />
            <button className="p-2.5 text-slate-400 hover:text-primary transition-colors rounded-full">
              <span className="material-symbols-outlined text-[24px] filled">mic</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Coach;
