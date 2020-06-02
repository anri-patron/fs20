import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Total = (props) => (
  <p>Number of exercises {props.ex1 + props.ex2 + props.ex3 }</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}></Header>
      <Content part={part1} exercises={exercises1}></Content>
      <Content part={part2} exercises={exercises2}></Content>
      <Content part={part3} exercises={exercises3}></Content>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
