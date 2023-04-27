import React, { useEffect, useState } from "react"
import  {GridColum}  from "./GridColum.jsx";
import logo from './logo.svg';
import SimpleContainer from "./Container.jsx";


function App() {
  const [names , setNames] = useState([]);
  const [data , setData]=useState("");
  useEffect(()=>{
    fetch("http://localhost:8001/get").then(res => res.json()).then(res => setNames
    (res));
  },[])
  const postHandler=(data)=>{
    setData(data);
  }
  return (
    <div className="App">
     <GridColum names={names} postHandler={postHandler}/>
    <br/>
     <SimpleContainer data={data}/>
     
    </div>
  );
}

export default App;
