import { Schema, ArraySchema, type } from "@colyseus/schema";
import { Skill, SkillTag } from "./Skill";

export type CardSet = "Version 1";

export type CardElement =
  | "fire"
  | "ice"
  | "wind"
  | "lightning"
  | "light"
  | "darkness";

export enum CardAreaDirection {
  UP = 8,
  LEFT = 4,
  RIGHT = 6,
  DOWN = 2,
}

export interface CardProps {
  id: number;
  name: string;
  artwork: string;
  skillId: number;
  element: CardElement;
  attack: number;
  area?: number[];
  amount?: number;
  ppCost: number;
  set: CardSet;
}

export class Card extends Schema {
  static COLLECTION: Card[] = [null];

  @type("uint64")
  id: number;

  @type("string")
  name: string;

  @type("string")
  artwork: string;

  @type("uint64")
  skillID: number;

  @type("string")
  element: CardElement;

  @type("uint32")
  attack: number;

  @type(["int8"])
  area: ArraySchema<number>;

  @type("uint8")
  amount: number;

  @type("uint8")
  ppCost: number;

  @type("string")
  set: CardSet;

  constructor({
    id,
    name,
    artwork,
    skillId,
    element,
    attack,
    area,
    amount,
    ppCost,
    set,
  }: CardProps) {
    super();
    this.id = id;
    this.name = name;
    this.artwork = artwork;
    this.skillID = skillId;
    this.element = element;
    this.attack = attack;
    this.area = new ArraySchema(...(area || []));
    this.amount = amount || 0;
    this.ppCost = ppCost;
    this.set = set;
  }

  get skill() {
    return Skill.COLLECTION[this.skillID];
  }

  get priority() {
    return this.skill?.priority || 0;
  }

  includes(tag: SkillTag) {
    return this.skill?.tags.includes(tag);
  }

  canOverride(card: Card) {
    if (this.ppCost <= card.ppCost) return false;
    if (card.element === this.element) return true;

    return card.includes("wildcard");
  }

  canBeOverridenBy(card: Card) {
    return card.canOverride(this);
  }
}

Card.COLLECTION.push(
  ...(
    [
      {
        id: 1,
        name: "ARKS Member Ellison",
        artwork: "ellison.webp",
        element: "fire",
        skillId: 0,
        attack: 3,
        ppCost: 1,
        set: "Version 1",
      },
      {
        id: 2,
        name: "Seasoned Warrior Zeno",
        artwork: "zeno.webp",
        attack: 14,
        ppCost: 3,
        skillId: 1,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 3,
        name: "Klariskrays Clone",
        artwork: "klariskrays_clone.webp",
        attack: 20,
        ppCost: 4,
        skillId: 1,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 4,
        name: "Council of Six - Six Huey",
        artwork: "huey.webp",
        attack: 28,
        ppCost: 5,
        skillId: 1,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 5,
        name: "Instructor Jann",
        artwork: "jean.webp",
        attack: 1,
        ppCost: 1,
        skillId: 1,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 6,
        name: "Council of Six - Five Klariskrays",
        artwork: "klariskrays.webp",
        attack: 27,
        ppCost: 5,
        skillId: 2,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 7,
        name: "Twin Intel Team Pati",
        artwork: "pati.webp",
        attack: 14,
        ppCost: 3,
        skillId: 3,
        element: "fire",
        amount: 1,
        set: "Version 1",
      },
      {
        id: 8,
        name: "Phantasm Slasher Hitsugi",
        artwork: "hitsugi.webp",
        attack: 22,
        ppCost: 4,
        skillId: 4,
        // prettier-ignore
        area: [
          0, 0, 0,
          0, 4, 0,
          0, 0, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 9,
        name: "ARKS Member Visar",
        artwork: "visar.webp",
        attack: 14,
        ppCost: 3,
        skillId: 4,
        // prettier-ignore
        area: [
          2, 1, 0,
          0, 0, 0,
          0, 0, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 10,
        name: "Hi'En",
        artwork: "deenian.webp",
        attack: 9,
        ppCost: 2,
        skillId: 4,
        // prettier-ignore
        area: [
          0, 2, 0,
          0, 0, 0,
          0, 0, 1,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 11,
        name: "Deeg",
        artwork: "deeg.webp",
        attack: 2,
        ppCost: 1,
        skillId: 4,
        // prettier-ignore
        area: [
          0, 0, 0,
          0, 1, 0,
          0, 0, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 12,
        name: "Hi-Loga",
        artwork: "vol_dragon.webp",
        attack: 21,
        ppCost: 4,
        skillId: 5,
        // prettier-ignore
        area: [
           0,  0,  0,
           0,  0,  0,
          -2, -2, -4,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 13,
        name: "Ti-Mobu",
        artwork: "sil_deenian.webp",
        attack: 9,
        ppCost: 2,
        skillId: 5,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          0, -3, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 14,
        name: "Catredran",
        artwork: "catredran.webp",
        attack: 13,
        ppCost: 3,
        skillId: 6,
        // prettier-ignore
        area: [
          0,                        0, 0,
          0,  CardAreaDirection.RIGHT, 0,
          0,  CardAreaDirection.RIGHT, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 15,
        name: "Elder Lillipan",
        artwork: "elder_lillipan.webp",
        attack: 2,
        ppCost: 1,
        skillId: 6,
        // prettier-ignore
        area: [
          0,                        CardAreaDirection.LEFT, 0,
          CardAreaDirection.RIGHT,                       0, 0,
          0,                                             0, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 16,
        name: "ARKS Member Rukias",
        artwork: "lucian.webp",
        attack: 8,
        ppCost: 2,
        skillId: 6,
        // prettier-ignore
        area: [
          0, CardAreaDirection.RIGHT, 0,
          0,                       0, 0,
          0,                       0, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 17,
        name: "Harboror of Hatred Lavere",
        artwork: "lavere.webp",
        attack: 10,
        ppCost: 2,
        skillId: 0,
        element: "ice",
        set: "Version 1",
      },
      {
        id: 18,
        name: "Twin Intel Team Tia",
        artwork: "tia.webp",
        attack: 13,
        ppCost: 3,
        skillId: 7,
        amount: 1,
        element: "ice",
        set: "Version 1",
      },
      {
        id: 19,
        name: "Neophyte Echo",
        artwork: "echo.webp",
        attack: 21,
        ppCost: 4,
        skillId: 4,
        // prettier-ignore
        area: [
          0, 0, 0,
          2, 2, 0,
          0, 1, 0
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 20,
        name: "ARKS Member Lacuna",
        artwork: "lacuna.webp",
        attack: 2,
        ppCost: 1,
        skillId: 4,
        // prettier-ignore
        area: [
          0, 0, 0,
          0, 2, 1,
          0, 0, 0
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 21,
        name: "Council of Six - Two Maria",
        artwork: "maria.webp",
        attack: 28,
        ppCost: 5,
        skillId: 5,
        // prettier-ignore
        area: [
          -1, -1,  0,
           0, -1,  0,
           0, -1, -1
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 22,
        name: "Suppression Client Hans",
        artwork: "hans.webp",
        attack: 2,
        ppCost: 1,
        skillId: 5,
        // prettier-ignore
        area: [
          -1,  0, -1,
          -1, -1, -1,
           0,  0,  0
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 23,
        name: "ARKS Recruit Reda",
        artwork: "reda.webp",
        attack: 1,
        ppCost: 1,
        skillId: 5,
        // prettier-ignore
        area: [
           0,  0,  0,
          -1,  0, -1,
          -2, -2, -2
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 24,
        name: "Deuman Girl Io",
        artwork: "io.webp",
        attack: 20,
        ppCost: 4,
        skillId: 5,
        // prettier-ignore
        area: [
          -3, -2, -3,
           0, -2,  0,
           0,  0,  0,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 25,
        name: "Laboratory Dragon Chaser Quna",
        artwork: "zelsius_quna.webp",
        attack: 26,
        ppCost: 5,
        skillId: 5,
        // prettier-ignore
        area: [
          -6,  0,  0,
           0, -5, -4,
           0,  0,  0,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 26,
        name: "ARKS Trainee Lottie",
        artwork: "lottie.webp",
        attack: 13,
        ppCost: 3,
        skillId: 5,
        // prettier-ignore
        area: [
           0,  0,  0,
          -3, -3, -4,
           0,  0,  0,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 27,
        name: "ARKS Member Shiro",
        artwork: "shiro.webp",
        attack: 21,
        ppCost: 4,
        skillId: 5,
        // prettier-ignore
        area: [
           0, -1,  0,
          -1,  0, -1,
           0,  0,  0,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 28,
        name: "Cabracan",
        artwork: "cabracan.webp",
        attack: 8,
        ppCost: 2,
        skillId: 5,
        // prettier-ignore
        area: [
          -2,  0, -2,
           0, -1,  0,
           0,  0,  0,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 29,
        name: "Camelot",
        artwork: "camarots.webp",
        attack: 7,
        ppCost: 2,
        skillId: 5,
        // prettier-ignore
        area: [
           0,  0,  0,
           0, -2,  0,
          -3,  0, -3,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 30,
        name: "Infirmary Officer Filia",
        artwork: "filia.webp",
        attack: 3,
        ppCost: 1,
        skillId: 6,
        // prettier-ignore
        area: [
           0,                     0,                     0,
           0,                     0,                     0,
           0,  CardAreaDirection.UP,  CardAreaDirection.UP,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 31,
        name: "Officer Cofy",
        artwork: "cofy.webp",
        attack: 8,
        ppCost: 2,
        skillId: 6,
        // prettier-ignore
        area: [
                             0,  0,                       0,
          CardAreaDirection.UP,  0,                       0,
                             0,  0,  CardAreaDirection.LEFT,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 32,
        name: "ARKS Member Adderley",
        artwork: "adderley.webp",
        attack: 14,
        ppCost: 3,
        skillId: 6,
        // prettier-ignore
        area: [
          0,  CardAreaDirection.LEFT,  0,
          0,                       0,  0,
          0,                       0,  0,
        ],
        element: "ice",
        set: "Version 1",
      },
    ] satisfies CardProps[]
  ).map((i) => new Card(i))
);
