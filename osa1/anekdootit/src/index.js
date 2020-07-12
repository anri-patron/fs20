import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))

  // luodaan satunnaisluku 0 -> 5 väliltä ja asetetaan se uudeksi selected arvoksi
  const handleSelected = () => {
    const i = Math.floor(Math.random() * 6)
    console.log("anekdootti nro: " + i)
    setSelected(i)
  }

  const handlePoints = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    console.log(points)
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>
      <div>
      <Button onClick={handleSelected} text='next anecdote'></Button>
      <Button onClick={handlePoints} text='vote anecdote'></Button>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)