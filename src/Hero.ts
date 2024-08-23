import Spell from "./Spell"

interface HeroGeometry {
  radius: number
  x: number
  y: number
}

interface HeroAttributes {
  color: string
  name: string
  speed: number
  spellRate: number
}

export default class Hero {
  charge: number
  geometry: HeroGeometry
  attributes: HeroAttributes
  hits: number
  spellColor: string

  constructor(
    geometry: HeroGeometry,
    attributes: HeroAttributes,
    hits: number,
  ) {
    this.geometry = geometry
    this.attributes = attributes
    this.charge = 0
    this.hits = hits
    this.spellColor = attributes.color
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

  update(heroes: Hero[]) {
    this.geometry.y += this.attributes.speed

    this.charge += this.attributes.spellRate
    if (this.charge >= 100) {
      const target = heroes.find((hero) => hero !== this)
      if (target) this.castSpell(target.geometry)
      this.charge -= 100
    }
  }

  bounce() {
    this.attributes.speed = -this.attributes.speed
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

  castSpell({ x, y }: { x?: number; y?: number }) {
    const dx = x !== undefined ? x - this.geometry.x : 0
    const dy = y !== undefined ? y - this.geometry.y : 0
    const angle = Math.atan2(dy, dx) + (Math.PI / 8) * (2 * Math.random() - 1)

    const spellStartX = this.geometry.x + this.geometry.radius * Math.cos(angle)
    const spellStartY = this.geometry.y + this.geometry.radius * Math.sin(angle)

    const spellSpeed = 5
    new Spell(
      {
        radius: 5,
        x: spellStartX,
        y: spellStartY,
      },
      {
        color: this.spellColor,
        owner: this,
        speed: {
          x: spellSpeed * Math.cos(angle),
          y: spellSpeed * Math.sin(angle),
        },
      },
    )
  }

  addHit(damage: number) {
    this.hits += damage
  }
}
