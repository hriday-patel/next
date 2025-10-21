
import Card from "@/components/Card";

const Home = ({places}) => {
  
  return (
    
    
      <main className="grow">
        <section className="relative">
          <div className="container mx-auto flex flex-col gap-10 py-40">
            {places.map((place, idx) => (
              <Card place={place} key={idx}/>
            ))}
          </div>
        </section>
      </main>
      
  );
}
export default Home;