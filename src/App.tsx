import { useMemo, useState } from "react"

import AttributesForm from "./AttributesForm"
import CanvasField from "./CanvasField"
import { GameProvider } from "./GameContext"
import Hero from "./Hero"
import "./index.css"
import Scoreboard from "./Scoreboard"

const dimensions = { height: 600, width: 800 }

const DuelGame = () => {
  const heroState = useState<Hero | null>(null)

  const heroes = useMemo(
    () => [
      new Hero(
        { radius: 20, x: 50, y: 100 },
        { color: "#FF0000", name: "Player 1", speed: 1, spellRate: 1 },
        0,
      ),
      new Hero(
        { radius: 20, x: 750, y: 500 },
        { color: "#0000FF", name: "Player 2", speed: -1, spellRate: 1 },
        0,
      ),
    ],
    [],
  )

  return (
    <GameProvider value={heroState}>
      <div className="grid">
        <div style={{ gridArea: "canvas" }}>
          <CanvasField {...dimensions} heroes={heroes} />
        </div>
        <div className="settings-block" style={{ gridArea: "controls" }}>
          <AttributesForm />
        </div>
        <div style={{ gridArea: "status" }}>
          <Scoreboard heroes={heroes} />
        </div>
      </div>
    </GameProvider>
  )
}

export default DuelGame
