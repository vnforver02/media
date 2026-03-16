"use client";

import { useEffect } from "react";

// Console capture — runs at module scope for immediate capture (before React hydration)
// Screenshot capture utility — auto-initializes on import
import "@/utils/screenshot-capture";

export function AppGenProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide Next.js error overlay - runs periodically to catch dynamically injected overlays
    const hideErrorOverlay = () => {
      // Target Next.js error overlay elements
      const selectors = [
        'nextjs-portal',
        '[data-nextjs-dialog]',
        '[data-nextjs-dialog-overlay]', 
        '[data-nextjs-toast]',
        '#__next-build-indicator',
        '[data-nextjs-scroll]',
      ];
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      });

      // Also hide the "1 Issue" button at the bottom
      document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent?.includes('Issue')) {
          (btn as HTMLElement).style.display = 'none';
          btn.parentElement && ((btn.parentElement as HTMLElement).style.display = 'none');
        }
      });
    };

    // Run immediately and set up observer for dynamic elements
    hideErrorOverlay();
    const interval = setInterval(hideErrorOverlay, 1000);
    
    // Use MutationObserver to catch new elements
    const observer = new MutationObserver(hideErrorOverlay);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
