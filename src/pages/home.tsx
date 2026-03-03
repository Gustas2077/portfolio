import { useRef } from "react";
import { ArrowDown } from "lucide-react";

import BlenderIcon from "../../public/blender-original.svg";
import JavascriptIcon from "../../public/javascript-original.svg";
import ReactIcon from "../../public/react-original.svg";

export function Home() {
  const SNAP_THRESHOLD = 24;
  const SCROLL_LOCK_MS = 100;
  const heroRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const isScrollingRef = useRef(false);

  const smoothScrollTo = (target: HTMLElement | null) => {
    if (!target || isScrollingRef.current) return;

    isScrollingRef.current = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, SCROLL_LOCK_MS);
  };

  const scrollToContent = () => smoothScrollTo(contentRef.current);
  const scrollToHero = () => smoothScrollTo(heroRef.current);

  return (
    <main
      className="min-h-full"
      onWheelCapture={(e) => {
        if (isScrollingRef.current) return;

        const scroller = e.currentTarget.parentElement as HTMLElement | null;
        if (!scroller || !contentRef.current) return;

        const scrollerTop = scroller.getBoundingClientRect().top;
        const contentTop = contentRef.current.getBoundingClientRect().top;
        const distanceToContentTop = contentTop - scrollerTop;

        const inHeroZone = distanceToContentTop > SNAP_THRESHOLD;
        const nearContentTop = Math.abs(distanceToContentTop) <= SNAP_THRESHOLD;

        if (e.deltaY > 0 && inHeroZone) {
          e.preventDefault();
          scrollToContent();
          return;
        }

        if (e.deltaY < 0 && nearContentTop) {
          e.preventDefault();
          scrollToHero();
        }
      }}
    >
      <section
        ref={heroRef}
        className="hero relative w-full flex flex-col justify-center items-center gap-6 text-justify max-sm:text-sm herotopography"
      >
        <h1 className="text-slate-200 font-extrabold uppercase text-5xl text-center max-sm:text-3xl">
          Welcome to My Portfolio
        </h1>
        <button
          type="button"
          onClick={scrollToContent}
          aria-label="Scroll to next section"
          className="absolute bottom-6 animate-bounce rounded-full ring-2 bg-slate-700"
        >
          <ArrowDown size={36} />
        </button>
      </section>
      <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <section
        ref={contentRef}
        className="max-w-xl h-screen flex flex-col justify-center items-center gap-6 text-justify mx-auto"
      >
        <h3 className="italic font-extrabold text-2xl">
          Turning Ideas into Code
        </h3>
        <p>
          Hi there! I'm Gustas, a passionate software developer with a love for
          crafting digital solutions. I specialize in turning ideas into
          efficient, scalable, and user-friendly software. Whether it's building
          web applications, mobile apps, or diving into complex algorithms, I
          thrive on solving problems and creating innovative solutions. I
          believe that great software should be both functional and beautiful.
          With a keen eye for detail and a commitment to clean code, I bring
          ideas to life with elegance and precision. My journey in the world of
          software development has been an exciting adventure, and I'm thrilled
          to share some of my projects with you. Feel free to explore my work,
          learn more about my background, and don't hesitate to reach out if you
          have a project in mind or just want to connect. Let's collaborate and
          make great things happen!
        </p>
        <p className="text-center font-extrabold text-xl">
          "Crafting Digital Magic: Mastering React, JavaScript, and Blender"
        </p>
        <div className="max-w-md w-full grid grid-cols-1 gap-4 mx-auto p-2 sm:grid-cols-2 md:grid-cols-3">
          <img src={ReactIcon} alt="React" className="logo" />
          <img src={JavascriptIcon} alt="JavaScript" />
          <img src={BlenderIcon} alt="Blender" />
        </div>
        <p className="text-center font-extrabold text-xl">
          "Ready to See My Creations in Action? Let's Dive In!"
        </p>
        <p className="text-center font-extrabold text-xl">
          "Or check out the about me page to learn more about me!"
        </p>
      </section>
    </main>
  );
}
