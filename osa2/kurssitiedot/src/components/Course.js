import React from 'react'

const Header = ({course}) => (
    <h1>
        {course}
    </h1>
)

  
  const Part = ({part, ex}) => (
    <p>
      {part} {ex}
    </p>
  )
  
  const Content = ({parts}) => {
    console.log("course parts: ",parts)
    return (
    <div>
        {parts.map((part, i) => 
            <Part key={part.id} part={part.name} ex={part.exercises}></Part>
        )}
    </div>
    )
  }
  
  const Total = ({parts}) => {
    console.log("Total ", parts)
    const exercises = parts.map(part => part.exercises)
    console.log("excercises ", exercises)
    const sum = exercises.reduce((a, b) => a + b, 0) // summataan excercise array yhteen
    console.log('excercises sum: ', sum)
    return (<b>total of {sum} exercises</b>)
  }

const Course = ({course}) => {
    console.log("course: ", course)
    return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
    )
}

export default Course