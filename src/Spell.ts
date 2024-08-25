import { Attributes, GameObject, Geometry } from "./GameObject"
import Hero from "./Hero"

interface SpellGeometry extends Geometry {
  __EXTENDS_GEOMETRY_BASE?: never
}

interface SpellAttributes extends Attributes {
  owner: Hero
  speed: { x: number; y: number }
}

export default class Spell extends GameObject<SpellGeometry, SpellAttributes> {
  static all = new Set<Spell>()

  constructor(geometry: SpellGeometry, attributes: SpellAttributes) {
    super(attributes, geometry)
    this.geometry = geometry
    this.attributes = attributes
    Spell.all.add(this)
  }

  destroy() {
    Spell.all.delete(this)
  }

  update() {
    this.geometry.x += this.attributes.speed.x
    this.geometry.y += this.attributes.speed.y
  }
}
