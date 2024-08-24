import Hero from "./Hero"

interface SpellGeometry {
  radius: number
  x: number
  y: number
}

interface SpellAttributes {
  color: string
  owner: Hero
  speed: { x: number; y: number }
}

export default class Spell {
  static all = new Set<Spell>()
  attributes: SpellAttributes
  geometry: SpellGeometry

  constructor(geometry: SpellGeometry, attributes: SpellAttributes) {
    this.geometry = geometry
    this.attributes = attributes
    Spell.all.add(this)
  }

  collidesWith({ radius, x, y }: { radius?: number; x?: number; y?: number }) {
    const dx = x !== undefined ? this.geometry.x - x : 0
    const dy = y !== undefined ? this.geometry.y - y : 0
    const dr =
      radius !== undefined
        ? this.geometry.radius + radius
        : this.geometry.radius
    return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(dr, 2)
  }

  destroy() {
    Spell.all.delete(this)
  }

  draw(context: CanvasRenderingContext2D) {
    const { radius, x, y } = this.geometry
    const { color } = this.attributes

    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fillStyle = color
    context.fill()
    context.closePath()
  }

  update() {
    this.geometry.x += this.attributes.speed.x
    this.geometry.y += this.attributes.speed.y
  }
}
