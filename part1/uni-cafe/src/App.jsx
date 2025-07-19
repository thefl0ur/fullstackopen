import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <div>{text}: {value}</div>
  )
}

const Statistics = ({good, bad, neutral, total}) => {
    if (total == 0) {
      return (
        <div>
          No feedback given yet
        </div>
      )
    }

    return (
      <div>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="All" value={total}/>
        <StatisticLine text="Average" value={(good - bad)/total}/>
        <StatisticLine text="Positive" value={good/total * 100}/>
      </div>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setTotal(total + 1)
    setGood(good +1 )
  }

  const handleNeutral = () => {
    setTotal(total + 1)
    setNeutral(neutral +1 )
  }

  const handleBad = () => {
    setTotal(total + 1)
    setBad(bad +1 )
  }

  return (
    <div>
      <h1>Give feeddback</h1>

      <Button onClick={handleGood} text="Good"/>
      <Button onClick={handleNeutral} text="Neutral"/>
      <Button onClick={handleBad} text="Bad"/>

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
    </div>
  )
}

export default App