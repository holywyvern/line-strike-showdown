import { Card, CardElement } from "../rooms/schema/Card";
import { Format } from "../rooms/schema/Format";
import { Skill } from "../rooms/schema/Skill";

import { ApplicationController } from "./ApplicationController";

interface Comparable {
  name: string;
  element: CardElement;
  ppCost: number;
}

const ELEMENT_SCORE: { [K in CardElement]: number } = {
  fire: 100_000_000,
  ice: 200_000_000,
  wind: 300_000_000,
  lightning: 400_000_000,
  light: 500_000_000,
  darkness: 600_000_000,
};

function cardScore(self: Comparable, other: Comparable): number {
  const names = (1 + self.name.localeCompare(other.name)) * 100_000;
  const pp = self.ppCost * 1_000_000;
  return pp + ELEMENT_SCORE[self.element] + names;
}

export class DatabaseController extends ApplicationController {
  async index() {
    const cards = Card.COLLECTION.map((card) => {
      if (!card) return null;

      return {
        ...card,
        skill: {
          id: card.skill.id,
          name: card.skill.name,
          description: card.skill.description,
        },
      };
    });
    const collection = cards.filter(Boolean);
    collection.sort((b: any, a: any) => cardScore(b, a) - cardScore(a, b));

    this.json({
      cards,
      collection: collection.map((i) => i.id),
      skills: Skill.COLLECTION,
      formats: Format.COLLECTION,
      standardFormatID: Format.STANDARD_ID,
    });
  }
}
