import { useContext } from "react";
import Hero from "./Hero";
import { GameContext } from "./GameContext";

interface ScoreboardProps {
  heroes: Hero[];
}

export const Scoreboard = ({ heroes }: ScoreboardProps) => {
  useContext(GameContext);
  return (
    <>
      {heroes.map((hero) => (
        <p key={hero.attributes.name}>
          {hero.attributes.name}: {hero.hits}
        </p>
      ))}
    </>
  );
};
