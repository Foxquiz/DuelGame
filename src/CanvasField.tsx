import { memo, useContext, useEffect, useRef, useState } from "react"
import Hero from "./Hero"
import Spell from "./Spell"
import { GameContext } from "./GameContext"

interface CanvasFieldProps {
  height: number
  width: number
  heroes: Hero[]
}

const CanvasField = ({ height, width, heroes }: CanvasFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const {
    update,
    selectedHero: [_selectedHero, setSelectedHero],
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
            console.log(`Hero ${hero.attributes.name} bounced!`)
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

  const posRef = useRef<{ x: number; y: number } | null>(null)

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
          console.log(`Hero ${hero.attributes.name} click!`)
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
      height={height}
      ref={canvasRef}
      width={width}
      className="canvas-field"
    />
  )
}

export default memo(CanvasField)
