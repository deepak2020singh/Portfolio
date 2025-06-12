function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

init();

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    start: "top 30%",
    end: "top 0%",
    scrub: 1,
  },
});

tl.to(
  ".page1 h1",
  {
    x: -100,
  },
  "anim"
);

tl.to(
  ".page1 h2",
  {
    x: 100,
  },
  "anim"
);

tl.to(
  ".page1 video",
  {
    width: "90%",
  },
  "anim"
);

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    start: "top -100%",
    end: "top -120%",
    scrub: 1,
  },
});

tl2.to(".main", {
  backgroundColor: "#fff",
  ease: "none",
});
