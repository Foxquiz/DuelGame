import { Attributes, GameObject, Geometry } from "./GameObject"
import Spell from "./Spell"

interface HeroGeometry extends Geometry {
  __EXTENDS_GEOMETRY_BASE?: never
}

interface HeroAttributes extends Attributes {
  name: string
  speed: number
  spellRate: number
}

export default class Hero extends GameObject<HeroGeometry, HeroAttributes> {
  charge: number
  hits: number
  spellColor: string

  constructor(
    geometry: HeroGeometry,
    attributes: HeroAttributes,
    hits: number,
  ) {
    super(attributes, geometry)
    this.geometry = geometry
    this.attributes = attributes
    this.charge = 0
    this.hits = hits
    this.spellColor = attributes.color
  }

  addHit(damage: number) {
    this.hits += damage
  }

  bounce() {
    this.attributes.speed = -this.attributes.speed
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

  update(heroes: Hero[]) {
    this.geometry.y += this.attributes.speed

    this.charge += this.attributes.spellRate
    if (this.charge >= 100) {
      const target = heroes.find((hero) => hero !== this)
      if (target) this.castSpell(target.geometry)
      this.charge -= 100
    }
  }
}
