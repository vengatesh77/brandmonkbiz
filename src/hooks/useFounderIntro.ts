"use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";

export function useFounderIntro(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    const mm = gsap.matchMedia(el);
    const q = (s: string) => gsap.utils.toArray<HTMLElement>(`[data-fi="${s}"]`, el);

    document.fonts.ready.then(() => {
      if (cancelled) return;
      window.scrollTo(0, 0);

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, mobile } = ctx.conditions as { desktop: boolean; mobile: boolean };
          const [name] = q("name"), [photo] = q("photo"), [photoImg] = q("photo-img");
          const chars = q("char"), role = q("role"), bio = q("bio"), social = q("social"),
                dl = q("download"), crumb = q("crumb");
          const rest = [...crumb, ...role, ...bio, ...social, ...dl];

          // reduced motion: show everything immediately
          if (!desktop && !mobile) { gsap.set(el, { visibility: "visible" }); return; }

          // MOBILE: simple reveal, no travelling
          if (mobile) {
            gsap.set(rest, { autoAlpha: 0, y: 14 });
            gsap.set(chars, { yPercent: 110 });
            gsap.set(photo, { clipPath: "inset(100% 0% 0% 0%)" });
            gsap.set(photoImg, { scale: 1.08 });
            gsap.set(el, { visibility: "visible" });
            gsap.timeline({ defaults: { ease: "power3.out" } })
              .to(chars, { yPercent: 0, duration: 0.35, stagger: 0.01 })
              .to(photo, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power3.inOut" }, "-=0.2")
              .to(photoImg, { scale: 1, duration: 0.45 }, "<")
              .to(rest, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04 }, "-=0.2");
            return;
          }

          // DESKTOP: measure the FINAL positions first (no transforms applied yet)
          gsap.set([name, photo], { clearProps: "transform" });
          const vw = window.innerWidth, vh = window.innerHeight;
          const n = name.getBoundingClientRect(), p = photo.getBoundingClientRect();
          const nCx = n.left + n.width / 2, nCy = n.top + n.height / 2;
          const pCx = p.left + p.width / 2, pCy = p.top + p.height / 2;
          const fit = Math.min(1, (vh * 0.6) / p.height, (vw * 0.5) / p.width); // photo fits the centre stage

          // start state: name in the exact centre of the screen, photo hidden in the centre below it
          gsap.set(name, { x: vw / 2 - nCx, y: vh / 2 - nCy, scale: 1.18, transformOrigin: "50% 50%" });
          gsap.set(chars, { yPercent: 110 });
          gsap.set(photo, { x: vw / 2 - pCx, y: vh * 0.6 - pCy, scale: fit * 0.95, autoAlpha: 0, transformOrigin: "50% 50%" });
          gsap.set(rest, { autoAlpha: 0 });
          gsap.set(crumb, { y: -8 });
          gsap.set(role, { y: 12 });
          gsap.set(bio, { y: 16 });
          gsap.set(social, { scale: 0.7 });
          gsap.set(dl, { y: 10 });
          gsap.set(el, { visibility: "visible" });
          document.documentElement.style.overflow = "hidden";

          const HOLD = 0.15;   // fast, punchy pause
          const EASE = "power3.inOut";
          const OUT = "power3.out";

          const tl = gsap.timeline({
            defaults: { force3D: true, overwrite: "auto" },
            onComplete: () => {
              document.documentElement.style.overflow = "";
              gsap.set([name, photo, ...social, ...dl, ...role, ...bio, ...crumb], { clearProps: "transform,opacity,visibility" });
            },
          });

          tl
            // 1. letters rise in the centre (ultra-fast)
            .to(chars, { yPercent: 0, duration: 0.35, stagger: 0.012, ease: "expo.out" })
            // 2. name lifts while the photo fades and scales in
            .to(name, { y: vh * 0.14 - nCy, scale: 1, duration: 0.45, ease: EASE }, "+=0.05")
            .to(photo, { autoAlpha: 1, scale: fit, duration: 0.45, ease: OUT }, "<0.08")
            // 3. quick hold (0.15s) then glide into position
            .addLabel("move", `+=${HOLD}`)
            // 4. photo and name glide fast to their real places
            .to(photo, { x: 0, y: 0, scale: 1, duration: 0.55, ease: EASE }, "move")
            .to(name, { x: 0, y: 0, scale: 1, duration: 0.55, ease: EASE }, "move+=0.03")
            // 5. content flows in fast one by one
            .to(crumb, { autoAlpha: 1, y: 0, duration: 0.3, ease: OUT }, "move+=0.15")
            .to(role, { autoAlpha: 1, y: 0, duration: 0.3, ease: OUT }, "move+=0.18")
            .to(bio, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.04, ease: OUT }, "move+=0.22")
            .to(social, { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.03, ease: "back.out(1.5)" }, "move+=0.32")
            .to(dl, { autoAlpha: 1, y: 0, duration: 0.3, ease: OUT }, "move+=0.35");

          return () => { document.documentElement.style.overflow = ""; };
        }
      );
    });

    return () => { cancelled = true; mm.revert(); document.documentElement.style.overflow = ""; };
  }, [root]);
}
