
import React, { useState, useEffect } from 'react';
import 'animate.css/animate.min.css';

const PHOTO_PATHS = [
  '/photos/1.jpg',
  '/photos/2.jpg',
  '/photos/3.jpg',
  '/photos/4.jpg',
  '/photos/5.jpg',
  '/photos/6.jpg',
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [petals, setPetals] = useState<number[]>([]);

  // Content for Muskan
  const content = {
    recipient: 'Muskan',
    nicknames: 'cutie bacchha, bandariya, sweetheart',
    shortMessage: "You're the most beautiful person I've ever known, my sweet Baby.",
    loveLetter: `My dearest Muskan,

From the first moment our eyes met, something in my heart quietly chose you. 
It wasn’t loud or dramatic — it was calm, warm, and certain. And since that day, 
every memory with you has felt like a beautiful blessing.

Pata nahi main aapke liye kitna sahi hoon, shayad aap isse bhi bohot achha deserve karti hongi... par main hamesha aapke saath rahunga, har kadam par, har mod par.

You are not just my girlfriend. You are my comfort after a long day, 
my happiness in the smallest things, and the reason my ordinary days feel extraordinary. 
The way you laugh, the way you care — every little part of you feels perfect to me.

No matter what life brings, I promise to stand beside you — 
to protect your heart, to support your dreams, 
and to love you more with every passing day.

You are my always.`,
    proposal: "Muskan, will you be my Valentine forever?"
  };

  useEffect(() => {
    setPetals(Array.from({ length: 40 }, (_, i) => i));
  }, []);

  const nextStep = () => {
    setCurrentStep(prev => Math.min(5, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => setCurrentStep(0);

  const getPhoto = (index: number) => PHOTO_PATHS[index % PHOTO_PATHS.length];

  return (
    <div className="relative min-h-screen bg-[#fffafa] selection:bg-rose-200 font-sans overflow-hidden">
      {/* Falling Petals Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {petals.map(i => (
          <div 
            key={i} 
            className="petal text-rose-300 opacity-20"
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              fontSize: `${12 + Math.random() * 35}px`
            }}
          >
            {['🌸', '❤️', '✨', '💖', '🧸', '🌹'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      <div className="min-h-screen w-full relative z-10 flex flex-col">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-2 bg-rose-50 z-50">
          <div 
            className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-1000 ease-out"
            style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
          ></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
          
          {/* Step 0: The Arrival */}
          {currentStep === 0 && (
            <div className="max-w-4xl w-full text-center space-y-8 md:space-y-12 animate__animated animate__fadeInUp">
              <header className="mb-8">
                <h1 className="text-4xl md:text-8xl font-serif text-rose-800 italic tracking-tighter mb-4 px-2">Eternal Valentine</h1>
                <p className="text-rose-400 uppercase tracking-widest text-xs md:text-sm">A Romantic Journey for Muskan</p>
              </header>
              <div className="relative inline-block">
                <div className="absolute -inset-10 bg-rose-200/40 rounded-full blur-[100px] animate-pulse"></div>
                <h2 className="text-5xl md:text-[10rem] font-cursive text-rose-700 relative z-10 drop-shadow-2xl mb-8">Hi, {content.recipient}</h2>
              </div>
              <div className="glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-white/80 max-w-xl mx-auto shadow-2xl space-y-6 md:space-y-8">
                <p className="text-xl md:text-2xl font-serif text-rose-900/70 italic leading-relaxed">
                  "This little world is just for you. Every word and every picture is here to show you how much you mean to me."
                </p>
                <button 
                  onClick={nextStep}
                  className="w-full py-4 md:py-5 bg-rose-600 text-white rounded-full font-bold text-lg md:text-xl shadow-xl hover:bg-rose-700 transition-all flex items-center justify-center gap-4 group"
                >
                  Start Our Journey
                  <span className="group-hover:translate-x-3 transition-transform">✨</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 1: The Whisper */}
          {currentStep === 1 && (
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center animate__animated animate__fadeInRight">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative border-white">
                  <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-lg border border-rose-100">💭</div>
                  <span className="text-rose-300 font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs block mb-4 md:mb-6">A Secret Whisper</span>
                  <p className="text-3xl md:text-5xl font-cursive text-rose-800 italic leading-tight mb-8 md:mb-10">
                    "{content.shortMessage}"
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <button onClick={prevStep} className="px-8 py-3 rounded-full border border-rose-100 text-rose-300 hover:bg-rose-50 transition-all">Back</button>
                     <button onClick={nextStep} className="flex-1 px-8 py-4 bg-rose-500 text-white rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all">Next Page</button>
                  </div>
                </div>
              </div>
              <div className="relative order-1 lg:order-2 px-4 md:px-0">
                 <div className="glass p-3 md:p-4 rounded-[3rem] md:rounded-[4rem] shadow-2xl transform md:rotate-3 md:scale-105 border-white">
                   <img src={getPhoto(0)} className="w-full aspect-[4/5] object-cover rounded-[2.5rem] md:rounded-[3rem]" alt="Muskan 1" />
                 </div>
              </div>
            </div>
          )}

          {/* Step 2: The Heart */}
          {currentStep === 2 && (
            <div className="max-w-4xl w-full space-y-8 md:space-y-12 animate__animated animate__fadeInLeft">
              <div className="text-center">
                 <h3 className="text-xl md:text-2xl font-serif text-rose-300 italic mb-1 md:mb-2 tracking-widest uppercase">Chapter II</h3>
                 <h2 className="text-4xl md:text-5xl font-serif text-rose-900 italic">My Letter to You</h2>
              </div>
              <div className="glass p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative border-white/90">
                <div className="prose prose-rose max-w-none">
                  <p className="whitespace-pre-wrap text-lg md:text-2xl font-serif text-rose-950/80 leading-[1.6] md:leading-[1.8] italic font-light">
                    {content.loveLetter}
                  </p>
                </div>
                <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-rose-50 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="font-cursive text-4xl md:text-5xl text-rose-700">Forever Yours</p>
                  <div className="flex gap-4">
                     <button onClick={prevStep} className="p-4 rounded-full border border-rose-100 text-rose-300 hover:bg-rose-50 transition-all">←</button>
                     <button onClick={nextStep} className="px-8 md:px-10 py-4 bg-rose-600 text-white rounded-full font-bold shadow-xl hover:bg-rose-700 transition-all text-sm md:text-base">Continue →</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Visuals */}
          {currentStep === 3 && (
            <div className="max-w-6xl w-full flex flex-col items-center animate__animated animate__zoomIn">
              <div className="text-center mb-8 md:mb-12">
                 <h2 className="text-4xl md:text-5xl font-serif text-rose-900 italic">Precious Moments</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full px-4 md:px-0">
                 <div className="glass p-3 md:p-4 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border-white transform hover:scale-[1.02] transition-transform">
                    <img src={getPhoto(1)} className="w-full aspect-square object-cover rounded-[2.1rem] md:rounded-[2.5rem]" alt="Muskan 2" />
                 </div>
                 <div className="glass p-3 md:p-4 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl md:mt-24 border-white transform hover:scale-[1.02] transition-transform">
                    <img src={getPhoto(2)} className="w-full aspect-square object-cover rounded-[2.1rem] md:rounded-[2.5rem]" alt="Muskan 3" />
                 </div>
              </div>
              <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-6 md:gap-8 w-full max-w-md md:max-w-none">
                  <button onClick={prevStep} className="px-10 py-4 rounded-full border border-rose-100 text-rose-300 hover:bg-rose-50 font-bold transition-all">Go Back</button>
                  <button onClick={nextStep} className="flex-1 px-10 md:px-16 py-4 md:py-5 bg-rose-600 text-white rounded-full font-bold text-lg md:text-xl shadow-2xl hover:scale-105 transition-all">A Special Question ✨</button>
              </div>
            </div>
          )}

          {/* Step 4: Proposal */}
          {currentStep === 4 && (
            <div className="max-w-4xl w-full text-center space-y-12 md:space-y-16 animate__animated animate__heartBeat px-4">
              <div className="relative">
                 <div className="absolute -inset-10 md:-inset-20 bg-rose-200/50 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
                 <h2 className="text-4xl md:text-8xl font-serif text-rose-900 leading-tight italic drop-shadow-sm relative z-10">
                   {content.proposal}
                 </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-xl mx-auto relative z-10 w-full">
                <button onClick={nextStep} className="p-8 md:p-10 bg-white border-4 border-rose-500 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-2 font-bold text-3xl md:text-4xl">
                  YES! ❤️
                </button>
                <button onClick={nextStep} className="p-8 md:p-10 bg-white border-4 border-pink-400 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-2 font-bold text-3xl md:text-4xl">
                  YES! ✨
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Final Celebration */}
          {currentStep === 5 && (
            <div className="max-w-5xl w-full text-center space-y-10 md:space-y-12 animate__animated animate__fadeIn px-4">
              <div className="relative inline-block mb-8 md:mb-10">
                 <div className="absolute -inset-10 bg-rose-100 rounded-full blur-3xl animate-pulse"></div>
                 <div className="relative z-10 glass p-3 md:p-4 rounded-full border-2 md:border-4 border-rose-500 shadow-2xl scale-110 border-white">
                    <img src={getPhoto(3)} className="w-40 h-40 md:w-72 md:h-72 object-cover rounded-full border-2 md:border-4 border-white shadow-xl" alt="Muskan Final" />
                 </div>
              </div>

              <div className="glass p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] shadow-2xl border-white/90 relative overflow-hidden">
                <div className="space-y-8 md:space-y-10 relative z-10">
                  <h2 className="text-4xl md:text-9xl font-cursive text-rose-600 animate__animated animate__pulse animate__infinite">I Love You, Muskan</h2>
                  
                  <div className="prose prose-rose max-w-3xl mx-auto space-y-6 md:space-y-8">
                    <p className="text-2xl md:text-4xl font-serif text-rose-900 leading-relaxed italic font-light px-2">
                      "Thank you so much for coming into my life.
Since the day you arrived, everything feels more beautiful.
You are the best blessing my heart could ever ask for.
."
                    </p>
                    <p className="text-xl md:text-3xl font-cursive text-rose-500">
                      Forever Yours, Always.
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={reset}
                className="mt-8 md:mt-12 px-10 py-4 bg-white border border-rose-100 text-rose-300 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"
              >
                Back to Beginning
              </button>
            </div>
          )}
        </div>

        {/* Floating Counter */}
        <div className="fixed bottom-8 right-8 z-40">
           <div className="glass px-6 py-3 rounded-full shadow-xl border-white/80">
              <span className="text-rose-800 font-serif italic text-lg">{currentStep + 1} / 6</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;
