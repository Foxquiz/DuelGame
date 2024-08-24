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

  const isNegativeZero = (value: number) =>
    value === 0 && 1 / value === -Infinity

  return (
    <>
      <h3 className="settings-title">Настройки героя</h3>
      <form className="form">
        <label className="label" htmlFor="color">
          Цвет заклинаний: {selectedHero.spellColor}
        </label>
        <input
          id="color"
          name="color"
          onChange={(event) => {
            const color = event.target.value
            selectedHero.spellColor = color
            update()
          }}
          type="color"
          value={selectedHero.spellColor}
        />
        <label className="label" htmlFor="spellRate-slider">
          Частота стрельбы: {selectedHero.attributes.spellRate}
        </label>
        <div className="slider-container">
          <input
            id="spellRate-slider"
            max="100"
            min="0"
            name="spellRate"
            onChange={(event) => {
              const spellRate = event.target.value
              selectedHero.attributes.spellRate = parseInt(spellRate)
              update()
            }}
            step="1"
            type="range"
            value={selectedHero.attributes.spellRate}
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
            id="speed-slider"
            max="1"
            min="0"
            name="speed"
            onChange={(event) => {
              const speed = event.target.value
              const sign = isNegativeZero(selectedHero.attributes.speed)
                ? -1
                : Math.sign(selectedHero.attributes.speed) || 1
              selectedHero.attributes.speed = sign * parseFloat(speed)
              update()
            }}
            step="0.2"
            type="range"
            value={Math.abs(selectedHero.attributes.speed)}
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
