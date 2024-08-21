import { createContext, ReactNode, useCallback, useState } from "react";

interface GameContextValue {
  update: () => void;
}

export const GameContext = createContext<GameContextValue>({ update: () => {} });

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [_tick, setTick] = useState(0);

  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return (
    <GameContext.Provider value={{ update }}>{children}</GameContext.Provider>
  );
};
