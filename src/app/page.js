"use client";

import { Title } from "chart.js";

import Link from "next/link";
import { motion, stagger, useAnimate, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";

export default function Home() {
  const places = [
    {
      title: "London",
      content:
        "London is constantly buzzing with events for every taste. Art and culture lovers can enjoy the London Film Festival in October, the Frieze Art Fair in Regent’s Park, the BBC Proms classical music series during summer, and world-class West End theatre shows running year-round. The city also comes alive with seasonal and traditional events like the Notting Hill Carnival in August, Trooping the Colour in June, New Year’s Eve fireworks along the Thames, and Christmas markets including Winter Wonderland in Hyde Park.",
      src: "/london.jpg",
    },
    {
      title: "Barcelona",
      content:
        "Barcelona is a vibrant city full of events that celebrate its culture, music, and traditions. Art and culture enthusiasts can enjoy events like the Barcelona International Jazz Festival in autumn, the Sónar Festival for electronic and experimental music in June, and numerous exhibitions at the Museu Picasso or MACBA throughout the year.",
      src: "/barca.jpg",
    },
    {
      title: "San Fransisco",
      content:
        "San Francisco is a city that never stops celebrating culture, music, and innovation. Art and culture enthusiasts can attend events like San Francisco International Film Festival in spring, the SF Jazz Festival in summer, and numerous exhibitions at the San Francisco Museum of Modern Art (SFMOMA) throughout the year. The city also hosts iconic seasonal and traditional events such as Chinese New Year Parade in February, Fleet Week in October with spectacular air shows, and the Bay to Breakers race in May, known for its quirky costumes and massive participation.",
      src: "/sf.jpg",
    },
  ];

  const lists = [
    {
      title: "Home",
      src: "/",
    },
    {
      title: "Events",
      src: "/events",
    },
    {
      title: "About Us",
      src: "/aboutus",
    },
  ];

  const head = "H O S T E R";
  const [scope, animate] = useAnimate();
  const startAnimating = () => {
    animate(
      "span",
      {
        opacity: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        filter: ["blur(10px)","blur(5px)", "blur(0px)"],
        translateY: [20, 15, 10, 5, 0],
      },
      {
        duration: 0.3,
        ease: "easeIn",
        delay: stagger(0.12),
      }
    );
  };

  useEffect(() => {
    startAnimating();
  }, []);

  const [hover, setHover] = useState(null);
  const contref = useRef(null);
  const bg = ["#290025", "#35012c", "#4f0147", "#3a015c"];
  const [bgc, setBgc] = useState(bg[0]);
  const {scrollYProgress} = useScroll({
    target: contref,
    offset: ["start", "end"]
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const value = Math.floor((bg.length - 1) * latest);
        setBgc(bg[value])
  }
  )



  const backgrounds = ["bg-[#4d0710]", "bg-[#4f0147]", "bg-[#3a015c]"];
  return (
    <motion.div 
    animate={{
      backgroundColor: bgc,
    }}
    transition={{
      duration: 0.3,
      ease: "easeInOut"
    }}
    ref={contref}
    className="flex min-h-screen flex-col w-full relative overflow-hidden">
      <header className="sticky top-0 bg-neutral-700/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.nav
            ref={scope}
            className="px-3 py-3 flex justify-between items-center"
          >
            <h1>
              {head.split(" ").map((h, idx) => (
                <motion.span
                  className="text-white inline-block font-playfair font-bold tracking-widest text-3xl"
                  key={idx}
                >
                  {h}
                </motion.span>
              ))}
            </h1>
            <ul className="flex justify-center list-none items-center">
              {lists.map((list, idx) => (
                <motion.li
                  onHoverStart={() => setHover(idx)}
                  onHoverEnd={() => setHover(null)}
                  className="text-center relative group px-6 py-1 hover:scale-105 transition-transform duration-300 linear"
                  key={idx}
                >
                  <Link
                    href={list.src}
                    title={list.title}
                    className="relative z-10 whitespace-nowrap"
                  >
                    {list.title}
                  </Link>
                  {hover === idx && (
                    <motion.div
                      layoutId="hover"
                      className={`absolute inset-0 ${backgrounds[idx]} rounded-full`}
                    ></motion.div>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </header>
      <main className="grow">
        <section className="relative">
          <div className="container mx-auto flex flex-col gap-10 py-40">
            {places.map((place, idx) => (
              <Card place={place} key={idx}/>
            ))}
          </div>
        </section>
      </main>
      <footer className="sticky bottom-0 w-full" >
        <section className="flex justify-center items-center py-20 bg-neutral-700/80 inset-shadow-yellow-700/50 inset-shadow-sm/30">
          <span className="font-mono">@FOOTER 2025 Copyrights Limited</span>
        </section>
      </footer>
      <Sidebar />
    </motion.div>
  );
}
