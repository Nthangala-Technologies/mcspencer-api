import React, { createContext, useContext, useRef, useState, useEffect } from "react";

type NavFn = () => void;

interface AdContextValue {
  requestNavigate: (go: NavFn) => void;
}

const AdContext = createContext<AdContextValue>({ requestNavigate: (go) => go() });

export function useAdNavigate() {
  return useContext(AdContext);
}

const AD_EVERY_N = 3;
const COUNTDOWN_SECS = 5;

export function AdInterstitialProvider({ children }: { children: React.ReactNode }) {
  const navCount = useRef(0);
  const [pending, setPending] = useState<NavFn | null>(null);
  const [seconds, setSeconds] = useState(COUNTDOWN_SECS);

  const requestNavigate = (go: NavFn) => {
    navCount.current += 1;
    if (navCount.current % AD_EVERY_N === 0) {
      setPending(() => go);
      setSeconds(COUNTDOWN_SECS);
    } else {
      go();
    }
  };

  useEffect(() => {
    if (!pending) return;
    if (seconds <= 0) { pending(); setPending(null); return; }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [pending, seconds]);

  const skip = () => { if (pending) { pending(); setPending(null); } };

  return (
    <AdContext.Provider value={{ requestNavigate }}>
      {children}
      {pending && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Ad header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Advertisement</span>
              <button
                onClick={skip}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
              >
                {seconds > 0 ? (
                  <span className="tabular-nums">Skip in {seconds}s</span>
                ) : (
                  <span>Skip →</span>
                )}
              </button>
            </div>

            {/* Ad unit */}
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[hsl(222,62%,28%)] to-[hsl(222,62%,18%)] relative overflow-hidden">
              {/* Google AdSense unit — replace slot with your actual ad slot ID */}
              <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%", height: "250px" }}
                data-ad-client="ca-pub-8185729929783991"
                data-ad-slot="9088424046"
                data-ad-format="rectangle"
              />
              {/* Fallback placeholder (shown when AdSense is not active) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <span className="text-3xl">🛒</span>
                </div>
                <p className="text-white font-black text-xl mb-1">McSpencer Enterprise</p>
                <p className="text-white/70 text-sm">South Africa's Multi-Category Marketplace</p>
                <p className="text-white/50 text-xs mt-3">Solar · Electronics · Cars · Fashion · AgroMarket</p>
              </div>
            </div>

            {/* Skip bar */}
            <div className="px-4 py-3 flex items-center justify-between bg-gray-50">
              <p className="text-xs text-gray-500">Ad · mcspencerenterprise.co.za</p>
              <button
                onClick={skip}
                className="px-5 py-2 bg-[hsl(222,62%,28%)] hover:bg-[hsl(222,62%,22%)] text-white text-xs font-bold rounded-full transition-colors"
              >
                {seconds > 0 ? `Continue in ${seconds}…` : "Continue →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdContext.Provider>
  );
}
