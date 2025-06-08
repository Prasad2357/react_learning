import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

const App = () => {

  const [data, setData] = useState([])

  const getData= async()=>{
    console.log("Hello")
    const response= await axios.get("https://picsum.photos/v2/list")

    setData(response.data)

    console.log(data)
    
  }

  useEffect(() => {
    getData()  
  }, [])
  


  return (

    <div className='p-10'>
      {/* <button onClick={getData} className="bg-teal-700 text-white font-semibold text-2xl px-6 py-3 border-2 border-white rounded-md active:scale-90">
        Click me
      </button> */}
      <div className="p-5 "> Hello </div>
        {data.map(function(elem,idx){
          return <div key={idx} className='bg-gray-50 text-black flex items-center justify-between w-full px-7 py-6'>
                <img className='h-40' src={elem.download_url} alt=""/>
                <h1> {elem.author}</h1>
            </div> 
        })}
    </div>

  )
}

export default App
