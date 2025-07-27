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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    courses.map(course => (
      <Course key={course.id} course={course} />
    ))
  )
}

export default App