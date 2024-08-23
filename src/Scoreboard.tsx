import { memo, useContext } from "react";
import Hero from "./Hero";
import { GameContext } from "./GameContext";

interface ScoreboardProps {
  heroes: Hero[];
}

const Scoreboard = ({ heroes }: ScoreboardProps) => {
  useContext(GameContext);
  return (
    <>
      <h3 className="settings-title">Количество попаданий по герою:</h3>
      {heroes.map((hero) => (
        <p key={hero.attributes.name} className="player-score">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={hero.attributes.color}
            stroke-linecap="round"
            stroke-linejoin="round"
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