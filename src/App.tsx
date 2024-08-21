import "./index.css";
import CanvasField from "./CanvasField";
import Hero from "./Hero";
import { Scoreboard } from "./Scoreboard";
import { GameProvider } from "./GameContext";

function App() {
  const dimensions = { height: 600, width: 800 };

  const hero1 = new Hero(
    { radius: 20, x: 50, y: 100 },
    { color: "#FF0000", name: "Player 1", speed: 1, spellRate: 10 },
    0,
  );

  const hero2 = new Hero(
    { radius: 20, x: 750, y: 500 },
    { color: "#0000FF", name: "Player 2", speed: -1, spellRate: 10 },
    0,
  );

  const heroes = [hero1, hero2];

  return (
    <GameProvider>
      <div className="grid">
        <div style={{ gridArea: "canvas" }}>
          <CanvasField {...dimensions} heroes={heroes} />
        </div>
        <div style={{ gridArea: "controls" }}>{/* <SettingsForm /> */}</div>
        <div style={{ gridArea: "status" }}>
          <Scoreboard heroes={heroes} />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
