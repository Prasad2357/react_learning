import { useState } from "react";

function Counter({count, onIncrement, onDecrement, onReset}){

    return(
        <div style={{margin: '10px', textAlign:'center'}}>
            <h3> 
                Count:{count}
            </h3>

            <button onClick={onIncrement}>Increment</button>
            <button disabled={count===0} onClick={onDecrement}>Decrement</button>
            <button onClick={onReset}>Reset</button>
        </div>
    )
}

export default Counter