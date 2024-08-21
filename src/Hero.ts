import Spell from "./Spell";

interface HeroGeometry {
  radius: number;
  x: number;
  y: number;
}

interface HeroAttributes {
  color: string;
  name: string;
  speed: number;
  spellRate: number;
}

export default class Hero {
  charge: number;
  geometry: HeroGeometry;
  attributes: HeroAttributes;
  hits: number;

  constructor(
    geometry: HeroGeometry,
    attributes: HeroAttributes,
    hits: number,
  ) {
    this.geometry = geometry;
    this.attributes = attributes;
    this.charge = 0;
    this.hits = hits;
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

  update(heroes: Hero[]) {
    this.geometry.y += this.attributes.speed;

    this.charge += this.attributes.spellRate;
    if (this.charge >= 100) {
      const target = heroes.find((hero) => hero !== this);
      if (target) this.castSpell(target.geometry);
      this.charge -= 100;
    }
  }

  bounce() {
    this.attributes.speed = -this.attributes.speed;
  }

  collidesWith(height: number) {
    if (
      this.geometry.y - this.geometry.radius <= 0 ||
      this.geometry.y + this.geometry.radius >= height
    )
      return true;
    return false;
  }

  castSpell({ x, y }: { x?: number; y?: number }) {
    const dx = x !== undefined ? x - this.geometry.x : 0;
    const dy = y !== undefined ? y - this.geometry.y : 0;
    const angle = Math.atan2(dy, dx) + (Math.PI / 8) * (2 * Math.random() - 1);
    const spellSpeed = 5;
    new Spell(
      {
        radius: 5,
        x: this.geometry.x,
        y: this.geometry.y,
      },
      {
        color: this.attributes.color,
        owner: this,
        speed: {
          x: spellSpeed * Math.cos(angle),
          y: spellSpeed * Math.sin(angle),
        },
      },
    );
  }

  addHit(damage:number) {
    this.hits += damage;
  }
}
