import React, { useContext } from 'react'
import CircuitContext from '../context/CircuitContext'
import bg from '../assets/australia.png'
function CircuitData() {
const { data } = useContext(CircuitContext)
  return (
    <div>
        {/* <img src={bg} /> */}
        {data.currentCircuit}
    </div>
  )
}

export default CircuitData