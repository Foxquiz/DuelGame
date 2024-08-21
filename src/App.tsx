import "./index.css";
import CanvasField from "./CanvasField";
import Hero from "./Hero";

function App() {

  const dimensions = { height: 600, width: 800 };

  const hero1 = new Hero(
    { radius: 20, x: 50, y: 100 },
    { color: "#FF0000", name: "Player 1"}
  )

  const hero2 = new Hero(
    { radius: 20, x: 750, y: 500 },
    { color: "#0000FF", name: "Player 2"}
  )
  // const hero2 = new Hero(
  //   { radius: 20, x: 750, y: 500 },
  //   { color: "#0000FF", fireRate: 0.01, name: "Player 2", speed: -1 },
  //   0,
  // )

  const heroes = [hero1, hero2];

  return (
    <div className="grid">
        <div style={{ border: "1px solid black", gridArea: "canvas" }}>
          <CanvasField {...dimensions} heroes={heroes} /> 
          {/* heroes={heroes} */}
        </div>
        <div style={{ gridArea: "controls" }}>
          {/* <SettingsForm /> */}
        </div>
        <div style={{ gridArea: "status" }}>
          {/* <Status heroes={heroes} /> */}
        </div>
      </div>
  )
}

export default App
