"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

const EventsPage = ({ data }) => {
  const [hover, setHover] = useState(null);
  return (
    <main className="p-20 grow">
      {data.map((event, idx) => (
        <Link
          href={`/events/${event.id}`}
          alt={event.title}
          key={idx}
          onMouseEnter={() => setHover(idx)}
          onMouseLeave={() => setHover(null)}
          className="flex flex-col items-start justify-center gap-5 mb-10 p-10 rounded-2xl border-2 border-white/5 h-[300px] shadow-2xl relative overflow-hidden hover:drop-shadow-2xl"
        >
          <motion.div
            className="absolute inset-0 brightness-105 object-cover bg-cover bg-center"
            style={{ backgroundImage: `url(${event.image})` }}
          ></motion.div>

          
            <motion.h1
              initial={{
                y: 150,
                opacity: 0
              }}
              animate={{
                y: hover === idx ? 100: 150,
                opacity: hover === idx ? 1: 0
              }}
              transition={{
                duration: 0.3,
                ease: "linear"
              }}
              className="text-white relative text-4xl tracking-tight z-10"
            >
              {event.title}
            </motion.h1>
        
        </Link>
      ))}
    </main>
  );
};

export async function getStaticProps() {
  const { events_categories } = await import("../../data/events.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
export default EventsPage;