import Image from 'next/image'
import Link from 'next/link'
const EventsPerCityPage = ({data}) => {
  
  return (
    <main className='grow'>
      <h1 className='text-4xl text-black tracking-tight font-playfair mb-10 border-b border-b-black inline-block p-4'>Events in {data[0].city}</h1>
      <div className='grid grid-cols-3 p-10 gap-10'>
        {data.map((event) => (
          <Link href={`/events/${event.city}/${event.id}`} className='rounded-4xl w-[300px] group h-[500px] hover:shadow-xl transition-shadow duration-300 ease-linear overflow-hidden shadow-lg border border-neutral-300/25' key={event.id}>
            <div className='overflow-hidden'>
              <Image src={event.image} width={300} height={300} alt={event.title} className='object-cover transition-transform duration-300 ease-linear group-hover:scale-105 w-[300px] h-[300px]' />
            </div>
            <h2 className='text-black text-center font-semibold mt-3'>{event.title}</h2>
            <p className='text-neutral-500 leading-normal tracking-wide p-5'>{event.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}

EventsPerCityPage.getLayout = function getLayout(page) {
        return <div className='bg-neutral-400 min-h-screen w-full overflow-hidden p-20'>{page}</div>
}

export default EventsPerCityPage


export async function getStaticProps(context){
  const dataId = context.params.cat;
  const {allEvents} = await import('../../../data/events.json');
  const data = allEvents.filter((event) => event.city === dataId);
  return {
    props: {
      data: data
    }
  }
} 

export async function getStaticPaths(){
  const {events_categories} = await import ('../../../data/events.json');
  const data = events_categories.map((event) => {
    return {
      params: {
        cat: event.id.toString(),
      }
    }
  })
  return {
    paths: data,
    fallback: false
  }
}