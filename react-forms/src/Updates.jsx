import { useState } from "react";

const Updates = () => {
    const [color,setColor] = useState({
        color1:"red",
        color2:"blue",
        color3:"black",
    })
    const handleUpdate = ()=>{
        setColor((sadiq)=>({
            
          ...sadiq , color1:"blue",color3:"yellow"  
        }))
    }
    console.log(color);
  return (
    <div>
      <p>{color.color1}</p>
      <p>{color.color2}</p>
      <p>{color.color3}</p>

      <button onClick={handleUpdate} >update color</button>
    </div>
  );
}

export default Updates;
