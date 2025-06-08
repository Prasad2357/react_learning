import React from 'react'
import { ToDoItem } from "./ToDoItem"
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';


export const ToDos = (props) => {
  const [pokemon, setPokemon] = useState(null)
  const [pokemonName, setPokmonName] = useState("")
  const [error, setError] = useState("")

  const fetchPokemon = async () => {
    try {
      setError("")
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      if (!response.ok) {
        throw new Error("Pokemon not found")
      }
      const data = await response.json()
      setPokemon(data)
    }
    catch (error) {
      setError("Pokemon not found. Correct the spelling")
      setPokemon(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pokemonName.trim()) {
      fetchPokemon()
    }
  }


  let myStyle = {
    minHeight: "70vh",
    margin: "10px auto",
  }
  return (
    <div className="container my-3" style={myStyle}>
      <form onSubmit={handleSubmit} className='mb-3'>
        <div className='input-group'>
          <input
            type="text"
            className='form-control'
            placeholder='Enter name'
            value={pokemonName}
            onChange={(e) => setPokmonName(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Search Pokemon
          </Button>
        </div>
      </form>

      {error && <div className='alert alert danger'> {error} </div>}

      {pokemon && (
        <div className='pokemon-info mt-3'>
          <h4> {pokemon.name.toUpperCase()}</h4>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <div>
            <h5>Abilities:</h5>
            {pokemon.abilities.map((abilityObj, index) => (
              <p key={index}>{abilityObj.ability.name}</p>
            ))}
          </div>
        </div>
      )}
      <h3 className="my-3" >ToDos List</h3>
      {props.todos.length === 0 ? "No todos to display" :
        props.todos.map((todo) => (

          <ToDoItem key={todo.sno} todo={todo} onDelete={props.onDelete} />
        ))
      }

    </div>
  )
}
