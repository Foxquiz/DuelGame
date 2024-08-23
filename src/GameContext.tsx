import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useState,
} from "react"
import Hero from "./Hero"

interface GameContextValue {
  update: () => void
  selectedHero: [Hero | null, Dispatch<Hero | null>]
}

export const GameContext = createContext<GameContextValue>({
  update: () => {},
  selectedHero: [null, () => {}],
})

export const GameProvider = ({
  children,
  value,
}: {
  children: ReactNode
  value: GameContextValue["selectedHero"]
}) => {
  const [_tick, setTick] = useState(0)

  const update = useCallback(() => {
    setTick((tick) => (tick + 1) % 60)
  }, [])
  return (
    <GameContext.Provider value={{ update, selectedHero: value }}>
      {children}
    </GameContext.Provider>
  )
}
