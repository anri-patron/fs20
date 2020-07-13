import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({header, anecdote, points}) => {
  return (
    <div>
    <h2>{header}</h2>
    <p>{anecdote}</p>
    <p>has {points} points</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0)) // tehdään taulukko pisteille, alustetaan nollilla.
  const [top, setTop] = useState(0)

  // luodaan satunnaisluku 0 -> 5 väliltä ja asetetaan se uudeksi selected arvoksi
  const handleSelected = () => {
    const i = Math.floor(Math.random() * 6)
    console.log("anekdootti nro: " + i)
    setSelected(i)
  }

  // päivittää points taulukon uusilla pisteillä
  const handlePoints = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    // tässä taulukossa pisteet eivät pisteet ole vielä päivittyneet, vaikka se tehdään ylärivillä. Miksi?
    console.log("handlePoints points:")
    console.log(points)

    // tässä kopiotaulukossa kuitenkin on nykyhetkeiset pisteet, ts. napin painon jälkeiset
    console.log("handlePoints: copy")
    console.log(copy)

    // pisteet on päivitetty, tarkastetaan onko myös eniten ääniä saanut muuttunut
    handleTop(copy)
  }

  const handleTop = (copy) => {
    let largest = copy[top]
    let largestIndex = top
    // tässä on jotain hämärää. Kun funktio suoritetaan ensimmäistä kertaa points.length = 6, toisella ja seuraavilla kerroilla undefined
    console.log("points arrayn pituus:", points.length)

    // etsitään eniten ääniä saanut anekdootti
    const n = anecdotes.length
    for (let i = 0; i < n; i++) {
      if (largest < copy[i]) {
        largest = copy[i]
        largestIndex = i
      }
    }
    setTop(largestIndex)
  }

  return (
    <div>
      <Anecdote header="Anecdote of the day" anecdote={props.anecdotes[selected]} points={points[selected]}/>
      <div>
      <Button onClick={handleSelected} text='next anecdote'></Button>
      <Button onClick={handlePoints} text='vote anecdote'></Button>
      </div>
      <Anecdote header="Anecdote with most votes" anecdote={props.anecdotes[top]} points={points[top]}/>
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