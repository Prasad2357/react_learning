import { useEffect, useState, useRef } from "react";
function EffectCounter() {
    const [count, setCount] = useState(0)
    const intervalRef = useRef(null)
    const [isRunning, setIsRunning] = useState(false)
    //     useEffect(()=>{
    //     console.log("Count changed to:", count)
    //   },[count])

    // useEffect(()=>{
    //     const interval= setInterval(()=>{
    //         console.log("tick")
    //     },1000)

    //     return ()=>{
    //         clearInterval(interval)
    //         console.log("Cleanup on unmount ")
    //     }
    // },[])


    // useEffect(() => {

    //     intervalRef.current = setInterval(() => {
    //         console.log(setCount(prev => prev + 1))
    //     }, 1000)

    //     return () => {
    //         clearInterval(intervalRef.current);
    //         console.log("Cleanup on unmount");
    //     };
    // }, [])

    // useEffect(() => {
    //     if (count >= 10) {
    //         clearInterval(intervalRef.current)
    //         console.log("Stopped the counter")
    //     }
    // }, [count])

    // const handleStart = () => {
    //     if (!isRunning) {
    //         intervalRef.current = setInterval(() => {
    //             setCount(prev => prev + 1)
    //         }, 1000)
    //         setIsRunning(true)
    //     }
    // }

    // const handleStop = () => {
    //     clearInterval(intervalRef.current)
    //     setIsRunning(false)
    // }




    // return (
    //     <div style={{ textAlign: 'center' }}>
    //         <h2> Count: {count} </h2>
    //         {/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
    //         <button onClick={handleStart} disabled={isRunning}>Start</button>
    //         <button onClick={handleStop} disabled={!isRunning}>Stop</button>

    //     </div>

    // )

}
export default EffectCounter