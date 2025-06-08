import { useEffect, useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Card from './Card'
import Counter from './Counter'
import EffectCounter from './EffectCounter'
import ControlledForm from './Form'
import Name from './StateLift'
import NameForm from './NameForm'
import NamePreview from './NamePreview'
import Home from './Home';
import About from './About';
import Contact from './Contact';
import { Link,Routes,Route, BrowserRouter } from 'react-router-dom'
import User from './User'
import Login from "./Login";
import Dashboard from "./Dashboard";
import { AuthProvider } from "./AuthContext";
import LoginButton from "./LoginButton";
import UserProfile from "./UserProfile";
import axios from "axios";

function App() {
  // const [counters, setCounters] = useState([0,0,0])

  
  // const increment =(index)=>{
  //   const newCounters=[...counters]
  //   newCounters[index]++
  //   setCounters(newCounters)
  // }

  // const decrement=(index)=>{
  //   if(counters[index]>0)
  //   {
  //     const newCounters=[...counters]
  //     newCounters[index]--
  //     setCounters(newCounters)
  //   }
    
  // }

  // const reset=(index)=>{
  //   const newCounters=[...counters]
  //   newCounters[index]=0
  //   setCounters(newCounters)
  // }

  // const resetAll=()=>{
  //   setCounters(counters.map(()=>0))
  // }

  // return (
  //   <div style={{textAlign:'center'}}>
  //     <h1> Multiple Counters</h1>
  //     {counters.map((count, index)=>(
  //       <Counter key={index} count={count}
  //       onIncrement={()=>increment(index)}
  //       onDecrement={()=>decrement(index)}
  //       onReset={()=>reset(index)}/>
  //     ))}

  //     <button onClick={resetAll} style={{ marginTop: '20px' }}>Reset All</button>

  //   </div>
    
  //)

  const [name, setName] = useState("")


  // return(
    // <div style={{display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}}>
      {/* <EffectCounter/>

      <ControlledForm/> 
      <Name/>  */}

      {/* <NameForm name={name} setName={setName}/>
      <NamePreview name={name} /> */}

      {/* <nav>
        <Link to="/"> Home</Link>
        <Link to="/about"> About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes> */}

      // return(

      

      // <BrowserRouter>
      // <nav>
      //   <Link to="/">Home</Link> |
      //   <Link to="/user/101">user 101</Link> |
      //   <Link to="/user/102">user 102</Link>
      // </nav>
      //   <Routes>
      //   <Route path="/" element={<Home />} />
      //   <Route path="/user/:id" element={<User />} />
      // </Routes>
      // </BrowserRouter>

      // )



  //     return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route path="/dashboard" element={<Dashboard />} />
  //     </Routes>
  //   </BrowserRouter>
  // );


  //  return (
  //   <AuthProvider>
  //     <div>
  //       <LoginButton />
  //       <UserProfile />
  //     </div>
  //   </AuthProvider>
  // );

    {/* </div> */}
  // )

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // useEffect (()=>{
  //   const apiURL="https://jsonplaceholder.typicode.com/posts"

  //   fetch(apiURL)
  //     .then((response)=>{
  //       if(!response.ok){
  //         throw new Error ("Network response was not ok")
  //       }

  //       return response.json()
  //     })

  //     .then((data) =>{
  //       setData(data)
  //       setLoading(false)
  //     })
  //     .catch((error)=>{
  //       setError(error)
  //       setLoading(false)
  //     })
  // },[])


   useEffect(() => {
    // The API URL to fetch data from
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";

    // Making the API call using axios
    axios
      .get(apiUrl) // Sending GET request to the API
      .then((response) => {
        setData(response.data); // Set the fetched data to state
        setLoading(false); // Set loading state to false when data is fetched
      })
      .catch((error) => {
        setError(error); // Set error state if something goes wrong
        setLoading(false); // Set loading to false after error
      });
  }, []); // Empty dependency array ensures it runs once when the component mounts


  if(loading){
    return <div> Loading...</div>
  }

  if(error){
    return <div> Error:(error.message)</div>
  }

  return (
    <div>
      <h1> Fetched data:</h1>
      <ul>
        {data.map((item)=>(
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
