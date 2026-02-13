
import React from 'react';

interface ResultDisplayProps {
  content: string | null;
  imageUrl?: string | null;
  loading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, imageUrl, loading, error }) => {
  if (loading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-rose-100 shadow-sm animate-pulse">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-rose-400 font-medium">Whispering sweet thoughts into existence...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 text-red-600 rounded-3xl border border-red-100 flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  if (!content && !imageUrl) return null;

  return (
    <div className="mt-8 bg-white p-8 rounded-3xl border border-rose-100 shadow-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-serif text-rose-800 italic">For Your Beloved</h3>
        <button 
          onClick={() => {
            const textToCopy = content || imageUrl || "";
            navigator.clipboard.writeText(textToCopy);
            alert("Copied to clipboard! ❤️");
          }}
          className="text-rose-400 hover:text-rose-600 transition-colors text-sm font-medium underline underline-offset-4"
        >
          Copy Content
        </button>
      </div>

      {imageUrl && (
        <div className="mb-6 overflow-hidden rounded-2xl shadow-inner bg-rose-50">
          <img src={imageUrl} alt="Generated Art" className="w-full h-auto object-cover" />
        </div>
      )}

      {content && (
        <div className="prose prose-rose max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-light text-lg italic">
            {content}
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-rose-50 text-center">
        <p className="text-rose-300 text-sm">"Every day with you feels like Valentine’s Day."</p>
      </div>
    </div>
  );
};

export default ResultDisplay;
