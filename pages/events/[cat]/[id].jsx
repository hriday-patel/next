import Form from "@/components/Form";

const EventPage = ({ data }) => {
  return (
    <main className="grow">
      <div className="relative w-full h-[500px] flex justify-center items-center mb-5">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${data[0].image})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent z-[2] text-center tracking-widest">
          {data[0].title}
        </h1>
      </div>
      <p className="text-3xl indent-8 text-gray-700 max-w-2xl mx-auto mt-4">
        {data[0].description}
      </p>
      <div className="flex container mx-auto flex-col items-start">
        <p className="text-3xl text-gray-700 my-4">City: {data[0].city}</p>
        <Form />
      </div>
    </main>
  );
};

EventPage.getLayout = function getLayout(page) {
  return (
    <div className="bg-neutral-300 min-h-[800px] w-full overflow-hidden">
      {page}
    </div>
  );
};

export async function getStaticProps(context) {
  const city = context.params.cat;
  const dataId = context.params.id;
  const { allEvents } = await import("../../../data/events.json");
  const data = allEvents.filter(
    (event) => event.city === city && event.id === dataId
  );
  return {
    props: {
      data: data,
    },
  };
}

export async function getStaticPaths() {
  const { allEvents } = await import("../../../data/events.json");
  const data = allEvents.map((event) => {
    return {
      params: {
        cat: event.city.toString(),
        id: event.id.toString(),
      },
    };
  });
  return {
    paths: data,
    fallback: false,
  };
}

export default EventPage;
