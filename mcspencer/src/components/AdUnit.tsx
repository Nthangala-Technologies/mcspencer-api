import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

export function AdUnit({ slot, format = "auto", className = "", label = "Advertisement" }: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      // AdSense not loaded yet — placeholder will show
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center mb-1">{label}</p>
      <div className="relative bg-gray-100 rounded-xl overflow-hidden border border-gray-200 min-h-[90px] flex items-center justify-center">
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-8185729929783991"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        {/* Fallback shown when AdSense is not active */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4">
            <p className="text-xs font-semibold text-gray-500">McSpencer Enterprise · Ad space</p>
            <p className="text-[10px] text-gray-400">mcspencerenterprise.co.za</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`py-4 px-6 bg-white border-y border-gray-100 ${className}`}>
      <AdUnit slot="9088424046" format="auto" />
    </div>
  );
}
