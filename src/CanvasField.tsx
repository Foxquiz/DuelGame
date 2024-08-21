import { memo, useEffect, useRef, useState } from "react";
import Hero from "./Hero";

interface CanvasFieldProps {
  height: number;
  width: number;
  heroes: Hero[];
}

const CanvasField = ({ height, width, heroes }: CanvasFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContect] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    setContect(context);
  }, []);

  useEffect(() => {
    if (context) {
      heroes.forEach((hero) => {
        hero.draw(context);
      });
    }
  }, [context]);

  return <canvas height={height} ref={canvasRef} width={width} />;
};

export default memo(CanvasField);
