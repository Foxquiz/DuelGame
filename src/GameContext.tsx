import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useState,
} from "react"

import Hero from "./Hero"

interface GameContextValue {
  selectedHero: [Hero | null, Dispatch<Hero | null>]
  update: () => void
}

const throwError = (methodName: string) => {
  throw new Error(`${methodName} was called outside of its Provider`)
}

export const GameContext = createContext<GameContextValue>({
  selectedHero: [null, () => throwError("setSelectedHero")],
  update: () => throwError("update"),
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
    <GameContext.Provider value={{ selectedHero: value, update }}>
      {children}
    </GameContext.Provider>
  )
}
