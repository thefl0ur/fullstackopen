import { useState } from 'react'

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
        <div>Good: {good}</div>
        <div>Neutral: {neutral}</div>
        <div>Bad: {bad}</div>
        <div>All: {total}</div>
        <div>Average: {(good - bad)/total}</div>
        <div>Positive: {good/total * 100} %</div>
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

      <button onClick={handleGood} >Good</button>
      <button onClick={handleNeutral} >Neutral</button>
      <button onClick={handleBad} >Bad</button>

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
    </div>
  )
}

export default App