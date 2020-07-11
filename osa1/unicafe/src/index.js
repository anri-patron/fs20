import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
  <td>{text} {value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, all}) => {
  // tarkistetaan onko palautetta annettu 
  if (all === 0) {
    return (
    <p>No feedback given</p>
    )
  }
  return (
    <div>
    <h2>Statistics</h2>
    <table>
      <tbody>
        <StatisticLine text="good" value ={good}/>
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={((good - bad)/all).toPrecision(1)} />
        <StatisticLine text="positive" value ={(good/all).toPrecision(2) + " %"} />
      </tbody>
    </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  // tapahtumankäsittelijät napeille
  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }


  return (
    <div>
      <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text='good'></Button>
      <Button handleClick={handleNeutral} text='neutral'></Button>
      <Button handleClick={handleBad} text='bad'></Button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
