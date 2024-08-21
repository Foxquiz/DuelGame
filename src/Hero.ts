interface HeroGeometry {
  radius: number;
  x: number;
  y: number;
}

interface HeroAttributes {
  color: string;
  name: string;
}

export default class Hero {
  geometry: HeroGeometry;
  attributes: HeroAttributes;

  constructor(geometry: HeroGeometry, attributes: HeroAttributes) {
    this.geometry = geometry;
    this.attributes = attributes;
  }

  draw(context: CanvasRenderingContext2D) {
    const { radius, x, y } = this.geometry;
    const { color } = this.attributes;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}
