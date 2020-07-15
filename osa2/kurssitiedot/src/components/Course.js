import React from 'react'

const Header = ({course}) => (
    <h2>
        {course}
    </h2>
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

const Course = ({courses}) => {
    console.log('courses: ', courses)
    return (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map((course, i) => 
        <div key={course.id}>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
        )}
    </div>
    )
}

export default Course