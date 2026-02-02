import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text,
  className = "",
  delay = 0.05,
  duration = 1.25,
  ease = "power3.out",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = "p",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useGSAP(() => {
    if (!ref.current || !fontsLoaded) return;

    const chars = ref.current.querySelectorAll(".char");

    gsap.fromTo(chars, from, {
      ...to,
      duration,
      ease,
      stagger: delay,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
      onComplete: onLetterAnimationComplete,
    });
  }, [fontsLoaded]);

  const splitChars = text.split("").map((char, i) => (
    <span key={i} className="char inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  const Tag = tag;

  return (
    <Tag ref={ref} className={className}>
      {splitChars}
    </Tag>
  );
};

export default SplitText;
