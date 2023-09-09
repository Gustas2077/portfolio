import { ArrowDown } from "lucide-react";

import BlenderIcon from "../../public/blender-original.svg";
import JavascriptIcon from "../../public/javascript-original.svg";
import ReactIcon from "../../public/react-original.svg";
import CssIcon from "../../public/css3.svg";

export function About() {
  return (
    <>
      <main className="min-h-full">
        <div className="hero relative w-full flex flex-col justify-center items-center gap-6 text-justify herotopography">
          <img
            className="h-96 w-96 rounded-full object-cover object-center max-xl:h-64 max-xl:w-64 max-sm:h-48 max-sm:w-48 shadow-xl shadow-green-700"
            src="https://hative.com/wp-content/uploads/2023/06/default-pfp-with-hat/8-default-pfp-with-hat.jpg"
            alt="pfp image"
          />
          <p className="font-extrabold text-3xl">
            Hello! I'm Gustas, I am a software developer.
          </p>
          <div className="absolute bottom-6 animate-bounce rounded-full ring-2 bg-slate-700">
            <ArrowDown size={36} />
          </div>
        </div>
        <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <div className="max-w-xl h-screen flex flex-col justify-center items-center gap-6 text-justify mx-auto">
          <p>
            With a background in development, I embarked on my journey into the
            world of software development. My fascination with technology began
            when I was a young child, and I've been on an exciting path of
            growth and learning ever since.
          </p>
          <p>
            Throughout my career, I've had the privilege of working with
            InformApp on projects that have developed many apps and websites.
            It's there that i've honed my skills in React, Javascript and CSS.
          </p>
          <div className="max-w-sm w-full grid grid-cols-1 gap-4 mx-auto p-2 sm:grid-cols-2 md:grid-cols-3">
            <img src={ReactIcon} alt="React" className="" />
            <img src={JavascriptIcon} alt="JavaScript" />
            <img src={CssIcon} alt="CSS3" />
          </div>
          <p>
            Beyond coding, I'm an avid Blender enthusiast. I find that my
            passion for Blender not only provides a much-needed creative outlet
            but also fuels my problem-solving skills and keeps me inspired in my
            professional journey.
          </p>
          <div className="max-w-sm w-full grid grid-cols-1 gap-4 mx-auto p-2 sm:grid-cols-2 md:grid-cols-3">
            <p></p>
            <img src={BlenderIcon} alt="Blender" />
          </div>
          <p>
            I'm always excited to connect with fellow professionals and
            potential collaborators. Feel free to reach out to me at my{" "}
            <a className="underline" href="gustasgerman@gmail.com">
              Gmail
            </a>
            , or you could check out my{" "}
            <a className="underline" href="https://github.com/Gustas2077">
              Github
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
