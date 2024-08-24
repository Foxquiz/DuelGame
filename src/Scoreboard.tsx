import { memo, useContext } from "react"

import { GameContext } from "./GameContext"
import Hero from "./Hero"

interface ScoreboardProps {
  heroes: Hero[]
}

const Scoreboard = ({ heroes }: ScoreboardProps) => {
  useContext(GameContext)
  return (
    <>
      <h3 className="settings-title">Количество попаданий по герою:</h3>
      {heroes.map((hero) => (
        <p className="player-score" key={hero.attributes.name}>
          <svg
            fill={hero.attributes.color}
            height="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
          {hero.attributes.name}: {hero.hits}
        </p>
      ))}
    </>
  )
}

export default memo(Scoreboard)
