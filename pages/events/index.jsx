"use client";
import Image from "next/image";
import Link from "next/link";

const EventsPage = ({ data }) => {
  return (
    <main className="p-20 grow">
      {data.map((event, idx) => (
        <Link
          href={`/events/${event.id}`}
          alt={event.title}
          key={idx}
          className="flex flex-col items-start justify-center gap-5 mb-10 p-10 rounded-2xl border-2 border-white/5 shadow-2xl hover:drop-shadow-2xl"
        >
          <h1 className="text-white text-4xl tracking-tight">{event.title}</h1>
          <Image src={event.image} alt={event.id} width={300} height={300} />
        </Link>
      ))}
    </main>
  );
};
export default EventsPage;

export async function getStaticProps() {
  const { events_categories } = await import("../../data/events.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
