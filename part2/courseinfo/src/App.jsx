const Header = ({name}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({name, exercises}) => {
  return(
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ({name, exercises}) => {
  return (
    <div>
      <Part name={name} exercises={exercises}/>
    </div>
  )
}

const Total = ({count}) => {
  return (
    <div>
      <p>Number of exercises: <b>{count}</b></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      {
        course.parts.map(
          part => (
            <Content key={part.id} name={part.name} exercises={part.exercises}/>
          )
        )
      }
      <Total count={course.parts.reduce((summ, current) => summ + current.exercises, 0)}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App