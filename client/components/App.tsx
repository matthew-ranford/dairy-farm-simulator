import Square from './Square'
import Header from './Header'
import Leaderboard from './Leaderboard'

import { useState } from 'react'

import moo from '../../public/sounds/cow-moos-76219.mp3'
import ufo from '../../public/sounds/ufo-fx-154829.mp3'

window.timeout = false
window.score = {
  name: 'Guest',
  score: 0,
  milk: 0,
  time: 0,
}

function App() {
  const gridLength = 300
  const cowNum = 20

  let squares = Array(gridLength).fill(0)
  const gridStates = squares.map((square, index) => {
    let startingState = 'empty'
    if (Math.random() * gridLength < cowNum) {
      startingState = 'cow'
    }

    return startingState
  })

  // make array of cow index's
  const cows = []

  gridStates.forEach((state, index) => {
    if (state === 'cow') {
      cows.push(index)
    }
  })

  //Pick random cow index

  const ufoIndex = cows[Math.floor(Math.random() * cows.length)]
  gridStates[ufoIndex] = 'ufo'

  const [grid, setGrid] = useState(gridStates)

  console.log(grid)

  squares = grid.map((square, index) => (
    <Square
      state={square}
      index={index}
      grid={grid}
      setGrid={setGrid}
      playSound={playSound}
    />
  ))

  playSound(moo)
  const cowSounds = setInterval(() => {
    if (grid.length) {
      playSound(moo)
    }
  }, 14000)

  setTimeout(() => {
    const ufoSounds = setInterval(() => {
      if (grid.length) {
        playSound(ufo)
      }
    }, 10000)
  }, 2000)

  return (
    <>
      <Header />
      {/* <p>{JSON.stringify(window.score)}</p> */}
      <div id="grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {...squares}
      </div>
      <Leaderboard />
    </>
  )
}

function playSound(link, volume = 0.2, timeout = false, last = false) {
  const audio = new Audio(link)
  audio.volume = volume
  audio.play()
  if (timeout) {
    setTimeout(() => {
      audio.pause()
    }, 4000)
  }

  if (!last) {
    setInterval(() => {
      if (audio.volume != 0 && window.timeout) {
        audio.volume = 0
      }
    }, 80)
  }
}

export default App
