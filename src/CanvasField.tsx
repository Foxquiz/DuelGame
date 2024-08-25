import { memo, useContext, useEffect, useRef, useState } from "react"

import { GameContext } from "./GameContext"
import Hero from "./Hero"
import Spell from "./Spell"

interface CanvasFieldProps {
  height: number
  heroes: Hero[]
  width: number
}

const CanvasField = ({ height, heroes, width }: CanvasFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef<{ x: number; y: number } | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const {
    selectedHero: [_selectedHero, setSelectedHero],
    update,
  } = useContext(GameContext)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return
    setContext(context)
  }, [])

  useEffect(() => {
    let animationFrameId: number
    if (context) {
      const render = () => {
        context.clearRect(0, 0, width, height)
        heroes.forEach((hero) => {
          hero.update(heroes)

          const hasMetWall = [
            hero.collidesWith({ y: 0 }),
            hero.collidesWith({ y: height }),
            hero.collidesWith({ x: 0 }),
            hero.collidesWith({ x: width }),
          ].some(Boolean)

          if (hasMetWall) {
            hero.bounce()
            hero.update(heroes)
            update()
          }

          if (posRef.current && hero.collidesWith(posRef.current)) {
            hero.bounce()
            update()
          }

          hero.draw(context)
        })

        heroes.forEach((hero) => {
          const heroSpell = new Set(
            [...Spell.all].filter((spell) => spell.attributes.owner == hero),
          )

          const otherHeroSpell = new Set(
            [...Spell.all].filter((spell) => spell.attributes.owner !== hero),
          )

          heroSpell.forEach((spell) => {
            otherHeroSpell.forEach((otherSpell) => {
              if (spell.collidesWith(otherSpell.geometry)) {
                spell.destroy()
                otherSpell.destroy()
              }
            })
          })
        })

        Spell.all.forEach((spell) => {
          spell.update()

          const hasMetWall = [
            spell.collidesWith({ y: 0 }),
            spell.collidesWith({ y: height }),
            spell.collidesWith({ x: 0 }),
            spell.collidesWith({ x: width }),
          ].some(Boolean)
          if (hasMetWall) spell.destroy()

          heroes.forEach((hero) => {
            if (spell.attributes.owner === hero) return
            if (spell.collidesWith(hero.geometry)) {
              spell.destroy()
              hero.addHit(1)
              update()
            }
          })

          spell.draw(context)
        })

        animationFrameId = requestAnimationFrame(render)
      }
      render()
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [context, height, width, heroes, update])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      posRef.current = { x: mouseX, y: mouseY }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [heroes])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      heroes.forEach((hero) => {
        if (hero.collidesWith({ x: mouseX, y: mouseY })) {
          setSelectedHero(hero)
          update()
        }
      })
    }

    canvas.addEventListener("click", handleMouseClick)
    return () => {
      canvas.removeEventListener("click", handleMouseClick)
    }
  }, [heroes, setSelectedHero, update])

  return (
    <canvas
      className="canvas-field"
      height={height}
      ref={canvasRef}
      width={width}
    />
  )
}

export default memo(CanvasField)
