import Home from "@/components/Home";


function Page({data}) {
  
return(
  <Home places={data}/>
)
  
}


export default Page;

export async function getServerSideProps(){
  const {events_categories} = await import ('../data/events.json');
  return {
    props: {
      data: events_categories,
    }
  }
}