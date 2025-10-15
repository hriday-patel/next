
import { useState } from "react";

const AboutUs = () => {
  const [count , setCounter] = useState(0);
  return (
    <div>AboutUs
      <button onClick={() => setCounter(count + 1)}>Increase</button>
      <div>Count : {count}</div>
    </div>
  )
}
export default AboutUs