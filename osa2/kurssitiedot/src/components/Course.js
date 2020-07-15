import React from 'react'

const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Part = ({part, ex}) => (
    <p>
      {part} {ex}
    </p>
  )
  
  const Content = ({parts}) => {
    console.log("course parts: ",parts)
    /*return (
      <div>
        <Part part={parts[0].name} ex={parts[0].exercises}></Part>
        <Part part={parts[1].name} ex={parts[1].exercises}></Part>
        <Part part={parts[2].name} ex={parts[2].exercises}></Part>
      </div>
    )*/
    return (
    <div>
        {parts.map((part, i) => 
            <Part key={part.id} part={part.name} ex={part.exercises}></Part>
        )}
    </div>
    )
  }
  
  const Total = (props) => {
    //console.log(props)
    return (<p>no totals yet</p>)
   /* return (
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )*/
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