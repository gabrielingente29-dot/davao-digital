import * as React from "react";

import { CookieNotice } from "@/components/fx/cookie-notice";
import { CustomCursor } from "@/components/fx/custom-cursor";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import { StickyMobileCta } from "@/components/fx/sticky-mobile-cta";
import { CaseStudies } from "@/components/sections/case-studies";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/nav";
import { Pricing } from "@/components/sections/pricing";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { SmoothScrollProvider, useAnchorInterceptor } from "@/lib/smooth-scroll";

/** Intercepts same-page anchors and hands them to Lenis (or native scroll). */
function AnchorBridge() {
  const reduce = usePrefersReducedMotion();
  useAnchorInterceptor(!reduce);
  return null;
}

export function App() {
  return (
    <SmoothScrollProvider>
      <AnchorBridge />
      <ScrollProgress />
      <CustomCursor />

      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <ProblemSolution />
        <Process />
        <Services />
        <Pricing />
        <CaseStudies />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>

      <Footer />

      {/* Phone-only action bar — keeps the primary CTA reachable while scrolling. */}
      <StickyMobileCta />
      <CookieNotice />
    </SmoothScrollProvider>
  );
}

export default App;
