import { MapPinIcon } from "@heroicons/react/24/outline";
import { useScroll, useTransform, useMotionTemplate } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
const Card = ({ place }) => {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const translate = useTransform(scrollYProgress, [0, 0.25,0.5,0.75,1] , [80, 40, 0, -40, -80]);
    const opacity = useTransform(scrollYProgress, [0, 0.25,0.5,0.75,1] , [0, 0.5, 1, 0.5, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.25,0.5,0.75,1] , [2.5, 1.25, 0, 1.25, 2.5]);
    const scale = useTransform(scrollYProgress, [0, 0.25,0.5,0.75,1] , [0.96, 0.98, 1, 0.98, 0.96]);

  return (
    <motion.article style={{
        scale: scale
    }} ref={ref} className="group my-30 overflow-hidden rounded-md border-2 border-black/5 drop-shadow-2xl drop-shadow-neutral-800 hover:shadow-2xl transition-shadow duration-300 ease-linear relative">
    <Link  href="/" alt={place.title} className="p-10 grid grid-cols-2 gap-x-10 items-center">
        <motion.div style={{
            translateY: translate,
            filter: useMotionTemplate`blur(${blur}px)`,
            opacity: opacity
        }} className="flex flex-col gap-5 justify-center items-start">
          <div className="flex flex-col items-start">
            <MapPinIcon className="w-10 h-10 text-white"></MapPinIcon>
            <h2 className="text-4xl text-white font-sans font-semibold">
              Events in {place.title}
            </h2>
          </div>
          <p className="text-lg tracking-wide leading-normal text-white">
            {place.content}
          </p>
        </motion.div>
        <motion.div style={{
            opacity: opacity,
            filter: useMotionTemplate`blur(${blur}px)`

        }} className="rounded-4xl overflow-hidden">
        <Image
          src={place.src}
          alt={place.title}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-4xl group-hover:scale-105 transition-transform duration-300 ease-linear"
        />
        </motion.div>
    </Link>
    {/* <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span> */}
    <span className="absolute opacity-0 w-3/5 mx-auto group-hover:opacity-100 inset-x-0 bottom-0 h-4  bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-md rounded-2xl transition-opacity duration-300 ease-in-out"></span>
    </motion.article>
  );
};
export default Card;
