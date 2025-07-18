const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.name} {props.exerciseNumber}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0]} exerciseNumber={props.exercises[0]}/>
      <Part name={props.parts[1]} exerciseNumber={props.exercises[1]}/>
      <Part name={props.parts[2]} exerciseNumber={props.exercises[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exerciseNumber}</p>
    </div>
  )
}

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
      <Header name={course}/>
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total exerciseNumber={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App