import React, { useContext } from 'react'
import CircuitContext from '../context/CircuitContext'

function CircuitData() {
const { data } = useContext(CircuitContext)
  return (
    <div>CircuitData</div>
  )
}

export default CircuitData