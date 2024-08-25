export interface Geometry {
  radius: number
  x: number
  y: number
}

export interface Attributes {
  color: string
}

export class GameObject<G extends Geometry, A extends Attributes> {
  attributes: A
  geometry: G

  constructor(attributes: A, geometry: G) {
    this.geometry = geometry
    this.attributes = attributes
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

  draw(context: CanvasRenderingContext2D) {
    const { radius, x, y } = this.geometry
    const { color } = this.attributes

    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fillStyle = color
    context.fill()
    context.closePath()
  }
}
