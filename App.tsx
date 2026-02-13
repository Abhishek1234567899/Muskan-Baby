
import React, { useState, useEffect } from 'react';
import { AppState, JourneyContent } from './types';
import { generateFullJourney } from './services/geminiService';

/**
 * PHOTO FOLDER INSTRUCTIONS:
 * 1. Create a folder named 'photos' in the same folder as index.html.
 * 2. Put your images inside that folder.
 * 3. Name them 1.jpg, 2.jpg, 3.jpg, etc.
 */
const PHOTO_PATHS = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    view: 'setup',
    recipient: 'Muskan',
    nicknames: 'cutie bacchha, bandariya, sweetheart',
    keywords: 'beautiful, naughty, my world',
    memory: 'the first time we laughed together until our stomachs hurt',
    userPhotos: PHOTO_PATHS,
    content: null,
    error: null
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 35 }, (_, i) => i));
  }, []);

  const startJourney = async () => {
    if (!appState.recipient) return;
    setAppState(prev => ({ ...prev, view: 'loading', error: null }));
    
    try {
      const content = await generateFullJourney({
        recipient: appState.recipient,
        nicknames: appState.nicknames,
        keywords: appState.keywords,
        memory: appState.memory
      });
      setAppState(prev => ({ ...prev, view: 'journey', content }));
      setCurrentStep(0);
    } catch (err) {
      setAppState(prev => ({ 
        ...prev, 
        view: 'setup', 
        error: "Our connection was interrupted... but my heart remains true. Try again?" 
      }));
    }
  };

  const reset = () => {
    setAppState({
      view: 'setup',
      recipient: '',
      nicknames: '',
      keywords: '',
      memory: '',
      userPhotos: PHOTO_PATHS,
      content: null,
      error: null
    });
    setCurrentStep(0);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPhoto = (index: number) => appState.userPhotos[index % appState.userPhotos.length];

  return (
    <div className="relative min-h-screen bg-[#fffafa] selection:bg-rose-200 font-sans overflow-hidden">
      {/* Dynamic Background */}
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

      {/* SETUP VIEW */}
      {appState.view === 'setup' && (
        <div className="container mx-auto px-6 py-12 flex flex-col items-center animate__animated animate__fadeIn z-10 relative">
          <header className="text-center mb-12">
            <h1 className="text-6xl md:text-9xl font-serif text-rose-800 mb-2 italic tracking-tighter">Eternal Valentine</h1>
            <div className="h-1 w-24 bg-rose-200 mx-auto rounded-full mb-4"></div>
            <p className="text-rose-400 font-light text-xl tracking-widest uppercase">A Romantic Journey for Muskan</p>
          </header>

          <div className="glass w-full max-w-3xl p-8 md:p-16 rounded-[4rem] shadow-[0_30px_100px_rgba(251,113,133,0.1)] border border-white/80">
            <div className="space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                  <h3 className="text-rose-800 font-serif text-2xl italic">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Her Name</label>
                    <input 
                      type="text" 
                      value={appState.recipient}
                      onChange={e => setAppState({...appState, recipient: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-rose-50 py-3 text-3xl font-serif text-rose-800 focus:border-rose-400 outline-none transition-all placeholder:text-rose-100"
                      placeholder="Muskan..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Pet Names</label>
                    <input 
                      type="text" 
                      value={appState.nicknames}
                      onChange={e => setAppState({...appState, nicknames: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-rose-50 py-3 text-rose-700 focus:border-rose-400 outline-none transition-all text-lg italic"
                      placeholder="cutie, sweetheart..."
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                  <h3 className="text-rose-800 font-serif text-2xl italic">Shared Memories</h3>
                </div>
                <div className="space-y-4">
                  <label className="block text-[10px] font-bold text-rose-400 uppercase tracking-widest">A memory you cherish</label>
                  <textarea 
                    value={appState.memory}
                    onChange={e => setAppState({...appState, memory: e.target.value})}
                    className="w-full bg-white/60 border-2 border-rose-50 p-6 rounded-[2rem] text-rose-900 focus:border-rose-300 outline-none transition-all h-32 resize-none shadow-inner text-lg font-serif italic"
                    placeholder="Describe a moment that makes you both happy..."
                  />
                </div>
              </section>

              <div className="p-6 bg-rose-50/50 rounded-3xl border border-rose-100 text-center">
                 <p className="text-[10px] text-rose-400 uppercase tracking-[0.2em] font-bold">Manual Photo Mode</p>
                 <p className="text-xs text-rose-400 mt-2 italic">I'll use photos from your <b>/photos/</b> folder (1.jpg to 8.jpg).</p>
              </div>

              {appState.error && <p className="text-red-500 text-sm text-center font-medium">⚠️ {appState.error}</p>}

              <button 
                onClick={startJourney}
                className="w-full py-6 bg-gradient-to-r from-rose-600 via-pink-500 to-rose-500 text-white rounded-full font-bold text-2xl shadow-2xl hover:shadow-rose-400/50 hover:-translate-y-1 active:scale-95 transition-all"
              >
                Create Her World 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOADING VIEW */}
      {appState.view === 'loading' && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#fffafa] z-50 overflow-hidden">
          <div className="relative mb-12">
             <div className="w-40 h-40 border-8 border-rose-50 border-t-rose-500 rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center text-5xl">💝</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 italic animate-pulse tracking-tight mb-4 text-center px-6">Creating something beautiful for Muskan...</h2>
        </div>
      )}

      {/* JOURNEY VIEW */}
      {appState.view === 'journey' && appState.content && (
        <div className="min-h-screen w-full relative z-10 flex flex-col">
          
          <div className="fixed top-0 left-0 w-full h-2 bg-rose-50 z-50">
            <div 
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-1000 ease-out"
              style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
            ></div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
            
            {/* Step 0: The Arrival */}
            {currentStep === 0 && (
              <div className="max-w-4xl w-full text-center space-y-12 animate__animated animate__fadeInUp">
                <div className="relative inline-block">
                  <div className="absolute -inset-10 bg-rose-200/40 rounded-full blur-[100px] animate-pulse"></div>
                  <h2 className="text-7xl md:text-[10rem] font-cursive text-rose-700 relative z-10 drop-shadow-2xl mb-8">Hi, {appState.recipient}</h2>
                </div>
                <div className="glass p-12 rounded-[4rem] border-white/80 max-w-2xl mx-auto shadow-2xl space-y-8">
                  <p className="text-3xl font-serif text-rose-900/70 italic leading-relaxed">
                    "This entire page is a gift for you. It's built with my words and our most precious memories."
                  </p>
                  <button 
                    onClick={nextStep}
                    className="w-full py-5 bg-rose-600 text-white rounded-full font-bold text-2xl shadow-xl hover:bg-rose-700 transition-all flex items-center justify-center gap-4 group"
                  >
                    Start the Journey
                    <span className="group-hover:translate-x-3 transition-transform">✨</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: The Whisper */}
            {currentStep === 1 && (
              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate__animated animate__fadeInRight">
                <div className="space-y-8 order-2 lg:order-1">
                  <div className="glass p-12 rounded-[3.5rem] shadow-2xl relative border-white">
                    <div className="absolute -top-6 -left-6 bg-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border border-rose-100">💭</div>
                    <span className="text-rose-300 font-bold uppercase tracking-[0.5em] text-xs block mb-6">A Secret Whisper</span>
                    <p className="text-4xl md:text-6xl font-cursive text-rose-800 italic leading-tight mb-10">
                      "{appState.content.shortMessage}"
                    </p>
                    <div className="flex gap-4">
                       <button onClick={prevStep} className="px-8 py-3 rounded-full border border-rose-100 text-rose-300 hover:bg-rose-50 transition-all">Back</button>
                       <button onClick={nextStep} className="flex-1 px-8 py-4 bg-rose-500 text-white rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all">Next Page</button>
                    </div>
                  </div>
                </div>
                <div className="relative order-1 lg:order-2">
                   <div className="glass p-4 rounded-[4rem] shadow-2xl transform rotate-3 scale-105 border-white">
                     <img src={getPhoto(0)} className="w-full aspect-[4/5] object-cover rounded-[3rem]" alt="Muskan Photo 1" />
                   </div>
                </div>
              </div>
            )}

            {/* Step 2: The Heart */}
            {currentStep === 2 && (
              <div className="max-w-4xl w-full space-y-12 animate__animated animate__fadeInLeft">
                <div className="text-center">
                   <h3 className="text-2xl font-serif text-rose-300 italic mb-2 tracking-widest uppercase">Chapter II</h3>
                   <h2 className="text-5xl font-serif text-rose-900 italic">My Letter to You</h2>
                </div>
                <div className="glass p-10 md:p-20 rounded-[5rem] shadow-2xl relative border-white/90">
                  <div className="prose prose-rose max-w-none text-center">
                    <p className="whitespace-pre-wrap text-2xl md:text-3xl font-serif text-rose-950/80 leading-[2] italic font-light">
                      {appState.content.loveLetter}
                    </p>
                  </div>
                  <div className="mt-16 pt-10 border-t border-rose-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="font-cursive text-5xl text-rose-700">Forever Yours</p>
                    <div className="flex gap-4">
                       <button onClick={prevStep} className="p-4 rounded-full border border-rose-100 text-rose-300 hover:bg-rose-50 transition-all">←</button>
                       <button onClick={nextStep} className="px-12 py-4 bg-rose-600 text-white rounded-full font-bold shadow-xl hover:bg-rose-700 transition-all">Continue Journey →</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Visuals */}
            {currentStep === 3 && (
              <div className="max-w-6xl w-full flex flex-col items-center animate__animated animate__zoomIn">
                <div className="text-center mb-12">
                   <h2 className="text-5xl font-serif text-rose-900 italic">Precious Moments</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                   <div className="glass p-4 rounded-[3rem] shadow-2xl border-white transform hover:scale-[1.02] transition-transform">
                      <img src={getPhoto(1)} className="w-full aspect-square object-cover rounded-[2.5rem]" alt="Muskan 2" />
                   </div>
                   <div className="glass p-4 rounded-[3rem] shadow-2xl mt-12 md:mt-24 border-white transform hover:scale-[1.02] transition-transform">
                      <img src={getPhoto(2)} className="w-full aspect-square object-cover rounded-[2.5rem]" alt="Muskan 3" />
                   </div>
                </div>
                <div className="mt-16 flex gap-8">
                    <button onClick={prevStep} className="px-10 py-4 rounded-full border border-rose-100 text-rose-300 hover:bg-rose-50 font-bold transition-all">Go Back</button>
                    <button onClick={nextStep} className="px-20 py-5 bg-rose-600 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all">A Final Question ✨</button>
                </div>
              </div>
            )}

            {/* Step 4: Proposal */}
            {currentStep === 4 && (
              <div className="max-w-4xl w-full text-center space-y-16 animate__animated animate__heartBeat">
                <div className="relative">
                   <div className="absolute -inset-20 bg-rose-200/50 rounded-full blur-[120px] animate-pulse"></div>
                   <h2 className="text-6xl md:text-9xl font-serif text-rose-900 leading-tight italic drop-shadow-sm relative z-10">
                     {appState.content.proposal}
                   </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto relative z-10">
                  <button onClick={nextStep} className="p-10 bg-white border-4 border-rose-500 rounded-[3rem] shadow-2xl hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-4 font-bold text-4xl">
                    YES! ❤️
                  </button>
                  <button onClick={nextStep} className="p-10 bg-white border-4 border-pink-400 rounded-[3rem] shadow-2xl hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-4 font-bold text-4xl">
                    YES! ✨
                  </button>
                </div>

                <div className="pt-24">
                  <button onClick={reset} className="text-rose-400 text-xs uppercase tracking-widest hover:text-rose-700 transition-all italic">Start Our Story Again</button>
                </div>
              </div>
            )}

            {/* Step 5: Final Love Speech & Thank You */}
            {currentStep === 5 && (
              <div className="max-w-5xl w-full text-center space-y-12 animate__animated animate__fadeIn">
                <div className="relative inline-block mb-10">
                   <div className="absolute -inset-10 bg-rose-100 rounded-full blur-3xl animate-pulse"></div>
                   <div className="relative z-10 glass p-4 rounded-full border-4 border-rose-500 shadow-2xl scale-110 border-white">
                      <img src={getPhoto(3)} className="w-48 h-48 md:w-72 md:h-72 object-cover rounded-full border-4 border-white shadow-xl" alt="Muskan Final" />
                   </div>
                </div>

                <div className="glass p-12 md:p-24 rounded-[5rem] shadow-[0_80px_150px_rgba(251,113,133,0.2)] border-white/90 relative overflow-hidden group">
                  <div className="absolute -top-20 -left-20 text-[25rem] text-rose-50 font-serif italic pointer-events-none opacity-20">L</div>
                  
                  <div className="space-y-12 relative z-10">
                    <h2 className="text-5xl md:text-9xl font-cursive text-rose-600 drop-shadow-sm animate__animated animate__pulse animate__infinite">I Love You, Muskan</h2>
                    
                    <div className="prose prose-rose max-w-4xl mx-auto space-y-10">
                      <p className="text-3xl md:text-5xl font-serif text-rose-900 leading-relaxed italic font-light drop-shadow-sm">
                        "Thank you for being such a beautiful, wonderful, and irreplaceable part of my life. Every day feels like a blessing simply because you are in it."
                      </p>
                      
                      <div className="h-[1px] w-24 bg-rose-200 mx-auto"></div>

                      <p className="text-2xl md:text-4xl font-serif text-rose-800 leading-relaxed italic font-light">
                        "I promise to always be by your side, to cherish our laughter, and to love you more with every passing second. You are my home, my peace, and my everything."
                      </p>
                      
                      <p className="text-3xl md:text-5xl font-cursive text-rose-500">
                        "Thank you for being mine, {appState.nicknames.split(',')[0] || 'Muskan'}."
                      </p>
                    </div>

                    <div className="pt-16 border-t border-rose-50">
                       <p className="font-cursive text-7xl text-rose-700 tracking-tighter">Forever Yours, No Matter What.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-20">
                  <button 
                    onClick={reset}
                    className="px-12 py-4 bg-white border border-rose-100 text-rose-300 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"
                  >
                    Back to Beginning
                  </button>
                </div>
              </div>
            )}

          </div>

          <div className="fixed bottom-8 right-8 z-40">
             <div className="glass px-6 py-3 rounded-full shadow-xl border-white/80">
                <span className="text-rose-800 font-serif italic text-lg">{currentStep + 1} / 6</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
