function init(){
    gsap.registerPlugin(ScrollTrigger);


const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
} 

var tl = gsap.timeline()

tl.from("nav",{
  y: -100,
  duration: 0.8,
  delay: 0.5,
  opacity: 1,
  stagger: 0.3
})

tl.from("h5, h1,p, h3, li",{
  x:-100,
  duration: 0.5,
  opacity: 0,
  stagger: 0.3
})

tl.from("#overview .left img",{
  scale: 0.5,
  // x: 100,
  duration: 0.5,
  delay: 0.5,
  opacity: 0,
  stagger: 0.3
})

tl.from("h5, h1,p, h3, li",{
  x:-100,
  duration: 0.5,
  opacity: 0,
  stagger: 0.4
})