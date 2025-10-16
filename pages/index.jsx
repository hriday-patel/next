"use client";
import Link from "next/link";
import { motion, stagger, useAnimate, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";

function Home() {
  

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
      
      <header className="fixed w-full z-50 top-0 bg-neutral-700/80 backdrop-blur-sm">
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
      <footer className="bottom-0 w-full" >
        <section className="flex justify-center items-center py-20 bg-neutral-700/80 inset-shadow-yellow-700/50 inset-shadow-sm/30">
          <span className="font-mono">@FOOTER 2025 Copyrights Limited</span>
        </section>
      </footer>
      <Sidebar/>
    </motion.div>
  );
}



export default Home;

export async function getStaticProps(){
  
}