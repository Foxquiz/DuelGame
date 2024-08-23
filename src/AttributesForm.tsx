import { memo, useContext } from "react"
import { GameContext } from "./GameContext"

const AttributesForm = () => {
  const {
    selectedHero: [selectedHero, _setSelectedHero],
    update,
  } = useContext(GameContext)

  if (!selectedHero) {
    return null
  }

  return (
    <>
      <h3 className="settings-title">Настройки героя</h3>
      <form className="form">
        <label className="label" htmlFor="color">
          Цвет заклинаний: {selectedHero.spellColor}
        </label>
        <input
          type="color"
          name="color"
          id="color"
          value={selectedHero.spellColor}
          onChange={(event) => {
            const color = event.target.value
            selectedHero.spellColor = color
            update()
          }}
        />
        <label className="label" htmlFor="spellRate-slider">
          Частота стрельбы: {selectedHero.attributes.spellRate}
        </label>
        <div className="slider-container">
          <input
            type="range"
            name="spellRate"
            min="0"
            max="100"
            value={selectedHero.attributes.spellRate}
            step="1"
            id="spellRate-slider"
            onChange={(event) => {
              const spellRate = event.target.value
              selectedHero.attributes.spellRate = parseInt(spellRate)
              update()
            }}
          />
          <div className="tickmarks">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
        <label className="label" htmlFor="speed-slider">
          Скорость героя: {Math.abs(selectedHero.attributes.speed).toFixed(1)}
        </label>
        <div className="slider-container">
          <input
            type="range"
            name="speed"
            min="0"
            max="1"
            value={Math.abs(selectedHero.attributes.speed)}
            step="0.2"
            id="speed-slider"
            onChange={(event) => {
              const speed = event.target.value
              selectedHero.attributes.speed =
                Math.sign(selectedHero.attributes.speed) * parseFloat(speed)
              update()
            }}
          />
          <div className="tickmarks">
            <span>0</span>
            <span>1</span>
          </div>
        </div>
      </form>
    </>
  )
}

export default memo(AttributesForm)
