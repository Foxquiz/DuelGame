import { memo, useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import Spell from "./Spell";

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
          hero.update(heroes);
          if (hero.collidesWith(height)) {
            hero.bounce();
            hero.update(heroes);
          }
          hero.draw(context);
        });

        heroes.forEach((hero) => {
          const heroSpell = new Set(
            [...Spell.all].filter((spell) => spell.attributes.owner == hero),
          );

          const otherHeroSpell = new Set(
            [...Spell.all].filter((spell) => spell.attributes.owner !== hero),
          );

          heroSpell.forEach((spell) => {
            otherHeroSpell.forEach((otherSpell) => {
              if (spell.collidesWith(otherSpell.geometry)) {
                spell.destroy();
                otherSpell.destroy();
              }
            });
          });
        });

        Spell.all.forEach((spell) => {
          spell.update();

          const hasMetWall = [
            spell.collidesWith({ y: 0 }),
            spell.collidesWith({ y: height }),
            spell.collidesWith({ x: 0 }),
            spell.collidesWith({ x: width }),
          ].some(Boolean);
          if (hasMetWall) spell.destroy();

          heroes.forEach((hero) => {
            if (spell.attributes.owner === hero) return;
            if (spell.collidesWith(hero.geometry)) {
              spell.destroy();
            }
          });

          spell.draw(context);
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
