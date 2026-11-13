// TRA Studio site: trailer dialog, hero intro, scroll-driven motion.
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----- hero video: hold on the poster frame for reduced-motion users -----
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo && reduce) { heroVideo.removeAttribute("autoplay"); heroVideo.pause(); }

  // ----- trailer dialog (works without GSAP) -----
  const dlg = document.querySelector(".trailer");
  const vid = dlg && dlg.querySelector("video");
  const openTrailer = () => {
    if (!dlg) return;
    dlg.showModal();
    if (heroVideo) heroVideo.pause();
    const p = vid.play(); if (p && p.catch) p.catch(() => {});
  };
  const closeTrailer = () => { if (dlg.open) dlg.close(); };
  document.querySelectorAll(".js-trailer").forEach((b) => b.addEventListener("click", openTrailer));
  if (dlg) {
    dlg.querySelector(".close").addEventListener("click", closeTrailer);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) closeTrailer(); });
    dlg.addEventListener("close", () => {
      vid.pause();
      if (heroVideo && !reduce) heroVideo.play().catch(() => {});
    });
  }

  if (reduce || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  // ----- hero: headline rises line by line over the gameplay -----
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .from(".hero-title .line > span", { yPercent: 115, duration: 1.0, stagger: 0.1, delay: 0.15 })
    .from(".bn", { opacity: 0, y: 12, duration: 0.6 }, "-=0.55")
    .from(".hero .actions .btn", { opacity: 0, y: 18, duration: 0.6, stagger: 0.08 }, "-=0.45")
    .fromTo(".badge", { scale: 0, rotate: -90 }, { scale: 1, rotate: -8, duration: 0.8, ease: "back.out(2)", clearProps: "transform,scale,rotate" }, "-=0.6");

  // ----- giant game titles drift sideways as you scroll -----
  if (window.matchMedia("(min-width: 901px)").matches) document.querySelectorAll("[data-drift] span").forEach((el) => {
    gsap.fromTo(el, { xPercent: 12 }, {
      xPercent: -8, ease: "none",
      scrollTrigger: { trigger: el.closest(".game"), start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // ----- Road to the Sun: screenshots spread out of a pile -----
  const shots = gsap.utils.toArray(".shot");
  gsap.from(shots, {
    y: 120, rotate: 0, scale: 0.9, opacity: 0, stagger: 0.12, ease: "power3.out", duration: 1,
    scrollTrigger: { trigger: ".collage", start: "top 80%" },
  });
  shots.forEach((s, i) => {
    gsap.to(s, {
      yPercent: [-6, 4, -10][i], ease: "none",
      scrollTrigger: { trigger: ".g-rts", start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // ----- Checkpost: street parallax, Kalam steps into the light -----
  gsap.to(".cp-bg", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".g-cp", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".cp-kalam", { y: 120, opacity: 0.2 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: ".g-cp", start: "top 85%", end: "center center", scrub: true } });
  gsap.fromTo(".cp-rick", { xPercent: -40 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: ".g-cp", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".stamp", { scale: 2.2, opacity: 0, rotate: 12, duration: 0.5, ease: "back.out(2.5)", scrollTrigger: { trigger: ".g-cp .g-text", start: "top 85%" } });

  // ----- Zombie Dhaka: poster slams in, sticker pops -----
  gsap.from(".zd-shot", { rotate: -8, scale: 0.85, opacity: 0, duration: 0.9, ease: "back.out(1.6)", scrollTrigger: { trigger: ".zd-shot", start: "top 80%" } });
  gsap.from(".sticker", { scale: 0, rotate: -40, duration: 0.5, ease: "back.out(3)", delay: 0.35, scrollTrigger: { trigger: ".zd-shot", start: "top 80%" } });
  gsap.from(".zd-logo", { y: 40, scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.8)", scrollTrigger: { trigger: ".g-zd", start: "top 75%" } });
})();
