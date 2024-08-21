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
    let animationFrameId: number;
    if (context) {
      const render = () => {
        context.clearRect(0, 0, width, height);
        heroes.forEach((hero) => {
          hero.update();
          hero.draw(context);
          if (hero.collidesWith(height)) {
            hero.bounce();
            hero.update();
          }
        });
        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, height, width, heroes]);

  return (
    <canvas
      height={height}
      ref={canvasRef}
      width={width}
      className="canvas-field"
    />
  );
};

export default memo(CanvasField);
