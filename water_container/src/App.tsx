import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'

enum Direction {
  UP = 'up',
  DOWN = "down"
}

type Values = 0 | 20 | 40 | 60 | 80 | 100
type Status = "Набираем" | "Выливаем" | "Пусто" | "Набрано"

function App() {
  const [waterLevel, setWaterLevel] = useState<Values>(0);
  const [status, setStatus] = useState<Status>("Пусто");
  const [direction, setDirection] = useState<Direction | undefined>(undefined);

  useEffect(() => {
    const ableToFill = direction === Direction.UP && waterLevel < 100;
    const ableToEmpty = direction === Direction.DOWN && waterLevel > 0;

    const intId = setInterval(() => {
      if (ableToFill) {
        setWaterLevel(waterLevel => (waterLevel += 20) as Values)
        setStatus("Набираем");
      }
      if (ableToEmpty) {
        setWaterLevel(waterLevel => (waterLevel -= 20) as Values)
        setStatus("Выливаем");
      }
    }, 1000)

    if (waterLevel === 100) {
      setStatus("Набрано");
    } else if (waterLevel === 0) {
      setStatus("Пусто");
    }

    return () => clearInterval(intId);

  }, [direction, waterLevel])

  function fillBucket() {
    setDirection(Direction.UP)
    // setInterval(() => setWaterLevel(waterLevel + 20), 1000);
  }

  function emptyBucket() {
    setDirection(Direction.DOWN)
    // setInterval(() => setWaterLevel(waterLevel - 20), 1000);
  }
  return (
    <>
      <div>
        <p>Status: {status}</p>
        <div className='bucket' style={{ height: waterLevel }} />
        <button onClick={fillBucket}>Набрать</button>
        <button onClick={emptyBucket}>Опустошить</button>
      </div>
    </>
  )
}

export default App
