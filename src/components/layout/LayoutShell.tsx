"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import SoundscapeControl from "./SoundscapeControl";

const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // ── Smooth scrolling with Lenis ──
  useEffect(() => {
    let lenis: any;
    let update: any;

    import("lenis").then((LenisModule) => {
      import("gsap").then((gsapModule) => {
        import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
          const Lenis = LenisModule.default;
          const gsap = gsapModule.default;
          const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
          
          gsap.registerPlugin(ScrollTrigger);

          lenis = new Lenis({
            duration: 0.8,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            touchMultiplier: 2.0,
            infinite: false,
            autoRaf: false
          });

          update = (time: number) => {
            lenis.raf(time * 1000);
          };

          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add(update);
          gsap.ticker.lagSmoothing(0);
        });
      });
    });

    return () => {
      if (lenis) lenis.destroy();
      import("gsap").then((gsapModule) => {
        if (update) gsapModule.default.ticker.remove(update);
      });
    };
  }, [pathname]);

  return (
    <>
      <SoundscapeControl />
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
