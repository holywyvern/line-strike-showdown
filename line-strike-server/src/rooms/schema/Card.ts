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

const { UP, DOWN, LEFT, RIGHT } = CardAreaDirection;

export interface CardProps {
  id: number;
  name: string;
  title?: string;
  artwork: string;
  skillId: number;
  element: CardElement;
  attack: number;
  area?: number[];
  displayArea?: number[];
  amount?: number;
  ppCost: number;
  set: CardSet;
  miniLeft?: number;
  miniTop?: number;
}

export class Card extends Schema {
  static COLLECTION: Card[] = [null];

  @type("uint64")
  id: number;

  @type("string")
  title: string;

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

  @type(["int8"])
  displayArea: ArraySchema<number>;

  @type("uint8")
  amount: number;

  @type("uint8")
  ppCost: number;

  @type("int8")
  miniLeft: number;

  @type("int8")
  miniTop: number;

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
    displayArea,
    amount,
    ppCost,
    set,
    miniLeft,
    miniTop,
    title,
  }: CardProps) {
    super();
    this.id = id;
    this.title = title;
    this.name = name;
    this.artwork = artwork;
    this.skillID = skillId;
    this.element = element;
    this.attack = attack;
    this.area = new ArraySchema(...(area || []));
    this.displayArea = new ArraySchema(...(displayArea || area || []));
    this.amount = amount || 0;
    this.ppCost = ppCost;
    this.set = set;
    this.miniLeft = typeof miniLeft === "number" ? miniLeft : 15;
    this.miniTop = typeof miniTop === "number" ? miniTop : 30;
  }

  get skill() {
    return Skill.COLLECTION[this.skillID];
  }

  get priority() {
    return this.skill?.priority || 0;
  }

  get category() {
    return this.skill?.category || "passive";
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
        title: "ARKS Member",
        name: "Ellison",
        artwork: "ellison.webp",
        element: "fire",
        skillId: 0,
        attack: 3,
        ppCost: 1,
        set: "Version 1",
      },
      {
        id: 2,
        title: "Seasoned Warrior",
        name: "Zeno",
        artwork: "zeno.webp",
        attack: 14,
        ppCost: 3,
        skillId: 1,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 3,
        title: "Klariskrays",
        name: "Clone",
        artwork: "klariskrays_clone.webp",
        attack: 20,
        ppCost: 4,
        skillId: 1,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 4,
        title: "Council of Six - Six",
        name: "Huey",
        artwork: "huey.webp",
        attack: 28,
        ppCost: 5,
        skillId: 1,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 5,
        title: "Instructor",
        name: "Jann",
        artwork: "jean.webp",
        attack: 1,
        ppCost: 1,
        skillId: 1,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 6,
        title: "Council of Six - Five",
        name: "Klariskrays",
        artwork: "klariskrays.webp",
        attack: 27,
        ppCost: 5,
        skillId: 2,
        element: "fire",
        set: "Version 1",
      },
      {
        id: 7,
        title: "Twin Intel Team",
        name: "Pati",
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
        title: "Phantasm Slasher",
        name: "Hitsugi",
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
        title: "ARKS Member",
        name: "Visar",
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
          0,      0, 0,
          0,  RIGHT, 0,
          0,  RIGHT, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 15,
        name: "Lillipan Elder",
        artwork: "elder_lillipan.webp",
        attack: 2,
        ppCost: 1,
        skillId: 6,
        // prettier-ignore
        area: [
              0, LEFT, 0,
          RIGHT,    0, 0,
              0,    0, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 16,
        title: "ARKS Member",
        name: "Rukias",
        artwork: "lucian.webp",
        attack: 8,
        ppCost: 2,
        skillId: 6,
        // prettier-ignore
        area: [
          0, RIGHT, 0,
          0,     0, 0,
          0,     0, 0,
        ],
        element: "fire",
        set: "Version 1",
      },
      {
        id: 17,
        title: "Harboror of Hatred",
        name: "Lavere",
        artwork: "lavere.webp",
        attack: 10,
        ppCost: 2,
        skillId: 0,
        element: "ice",
        set: "Version 1",
      },
      {
        id: 18,
        title: "Twin Intel Team",
        name: "Tia",
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
        title: "Neophyte",
        name: "Echo",
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
        title: "ARKS Member",
        name: "Lacuna",
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
        title: "Council of Six - Two",
        name: "Maria",
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
        title: "Suppression Client",
        name: "Hans",
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
        title: "ARKS Recruit",
        name: "Reda",
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
        title: "Deuman Girl",
        name: "Io",
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
        title: "Laboratory Dragon Chaser",
        name: "Quna",
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
        title: "ARKS Trainee",
        name: "Lottie",
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
        title: "ARKS Member",
        name: "Shiro",
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
        title: "Infirmary Officer",
        name: "Filia",
        artwork: "filia.webp",
        attack: 3,
        ppCost: 1,
        skillId: 6,
        // prettier-ignore
        area: [
           0,   0,   0,
           0,   0,   0,
           0,  UP,  UP,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 31,
        title: "Officer",
        name: "Cofy",
        artwork: "cofy.webp",
        attack: 8,
        ppCost: 2,
        skillId: 6,
        // prettier-ignore
        area: [
           0,  0,    0,
          UP,  0,    0,
           0,  0, LEFT,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 32,
        title: "ARKS Member",
        name: "Adderley",
        artwork: "adderley.webp",
        attack: 14,
        ppCost: 3,
        skillId: 6,
        // prettier-ignore
        area: [
          0, LEFT,  0,
          0,    0,  0,
          0,    0,  0,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 33,
        title: "Melee Vanguard",
        name: "Oza",
        artwork: "oza.webp",
        attack: 4,
        ppCost: 1,
        skillId: 0,
        element: "wind",
        set: "Version 1",
      },
      {
        id: 34,
        title: "ARKS Officer",
        name: "Seraphy",
        artwork: "seraphy.webp",
        attack: 6,
        ppCost: 2,
        skillId: 3,
        amount: 1,
        element: "wind",
        set: "Version 1",
      },
      {
        id: 35,
        title: "Torch Bearer",
        name: "Echo",
        artwork: "echo2.webp",
        attack: 21,
        ppCost: 4,
        skillId: 4,
        // prettier-ignore
        area: [
          2,  2, 0,
          0,  1, 0,
          0,  0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 36,
        title: "Distant Song",
        name: "Quna",
        artwork: "quna.webp",
        attack: 15,
        ppCost: 3,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  0, 0,
          1,  0, 1,
          1,  0, 2,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 37,
        title: "Xion’s Little Brother",
        name: "Xiao",
        artwork: "xiao.webp",
        attack: 21,
        ppCost: 4,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  0, 2,
          0,  0, 0,
          0,  3, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 38,
        title: "ARKS Member",
        name: "Burrows",
        artwork: "burrows.webp",
        attack: 2,
        ppCost: 1,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          2,  0, 1,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 39,
        title: "Council of Six - Three",
        name: "Casra",
        artwork: "casra.webp",
        attack: 26,
        ppCost: 5,
        skillId: 10,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          0,  RIGHT, LEFT,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 40,
        title: "Striver",
        name: "Ulku",
        artwork: "ulku.webp",
        attack: 6,
        ppCost: 2,
        skillId: 10,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  RIGHT, LEFT,
          0,  0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 41,
        title: "Bouncer Test Proxy",
        name: "Katori",
        artwork: "katori.webp",
        attack: 20,
        ppCost: 4,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, LEFT,
          RIGHT,  0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 42,
        title: "ARKS Member",
        name: "Makoto",
        artwork: "makoto.webp",
        attack: 13,
        ppCost: 3,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, LEFT,
          0,  0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 43,
        title: "Civilian",
        name: "Henri",
        artwork: "henri.webp",
        attack: 1,
        ppCost: 1,
        skillId: 9,
        // prettier-ignore
        area: [
              0,  0, 0,
              0,  0, 0,
          RIGHT,  0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 44,
        title: "Void Leader",
        name: "Luther",
        artwork: "luther.webp",
        attack: 26,
        ppCost: 5,
        skillId: 11,
        // prettier-ignore
        area: [
          RIGHT, 0, 0,
          RIGHT, 0, 0,
              0, 0, 0,
        ],
        // prettier-ignore
        displayArea: [
          RIGHT, LEFT, 0,
          RIGHT, LEFT, 0,
              0, 0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 45,
        title: "Loyal Retainer",
        name: "Melfonseana",
        artwork: "melfonseana.webp",
        attack: 13,
        ppCost: 3,
        skillId: 11,
        // prettier-ignore
        area: [
              0, 0, 0,
          RIGHT, 0, 0,
              0, 0, 0,
        ],
        // prettier-ignore
        displayArea: [
              0, 0, 0,
          RIGHT, LEFT, 0,
              0, 0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 46,
        title: "Geologist",
        name: "Rogio",
        artwork: "logio.webp",
        attack: 11,
        ppCost: 1,
        skillId: 6,
        // prettier-ignore
        area: [
          0,  0, LEFT,
          0,  RIGHT, 0,
          UP,  0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 47,
        title: "ARKS Member",
        name: "Sherry",
        artwork: "sherry.webp",
        attack: 20,
        ppCost: 4,
        skillId: 6,
        // prettier-ignore
        area: [
          DOWN,  0, DOWN,
          0,  UP, 0,
          0,  0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 48,
        title: "Crimson Gunner",
        name: "Chroto",
        artwork: "chroto.webp",
        attack: 8,
        ppCost: 2,
        skillId: 6,
        // prettier-ignore
        area: [
          0,  LEFT, 0,
          RIGHT,  0, 0,
          0,  0, 0,
        ],
        element: "wind",
        set: "Version 1",
      },
      {
        id: 49,
        title: "Steel Master",
        name: "Joseph",
        artwork: "joseph.webp",
        attack: 23,
        ppCost: 4,
        skillId: 0,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 50,
        title: "ARKS Member",
        name: "Velge",
        artwork: "belge.webp",
        attack: 9,
        ppCost: 2,
        skillId: 0,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 51,
        name: "Arkuma",
        artwork: "arkuma.webp",
        attack: 4,
        ppCost: 1,
        skillId: 0,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 52,
        title: "Hateful Warrior",
        name: "Gettemhult",
        artwork: "gettemhult.webp",
        attack: 20,
        ppCost: 4,
        skillId: 8,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 53,
        title: "Council of Six - One",
        name: "Regius",
        artwork: "regius.webp",
        attack: 26,
        ppCost: 5,
        skillId: 8,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 54,
        title: "Momentous Encounter",
        name: "Fourie",
        artwork: "fourie.webp",
        attack: 5,
        ppCost: 2,
        skillId: 8,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 55,
        name: "Nyau",
        artwork: "nyau.webp",
        attack: 14,
        ppCost: 3,
        skillId: 13,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 56,
        title: "ARKS Ship Operator",
        name: "Xiera",
        artwork: "xiera.webp",
        attack: 7,
        ppCost: 2,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          4,  0, 0,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 57,
        title: "Bladesmith",
        name: "Zig",
        artwork: "zig.webp",
        attack: 8,
        ppCost: 2,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  2, 1,
          0,  0, 0,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 58,
        title: "Council of Six - Four",
        name: "Zeno",
        artwork: "zeno_yellow.webp",
        attack: 29,
        ppCost: 5,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  0, 1,
          0,  0, 1,
          0,  0, 0,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 59,
        title: "ARKS Member",
        name: "Clark",
        artwork: "clerk.webp",
        attack: 14,
        ppCost: 3,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  1, 0,
          0,  1, 0,
          0,  0, 0,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 60,
        title: "Small Shadow",
        name: "Lilipan",
        artwork: "lillipan.webp",
        attack: 2,
        ppCost: 1,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  0, LEFT,
          0,  RIGHT, 0,
          0,  0, 0,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 61,
        title: "ARKS Trainee",
        name: "Rubert",
        artwork: "robert.webp",
        attack: 13,
        ppCost: 3,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  0, 0,
          RIGHT,  0, 0,
          0,  RIGHT, 0,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 62,
        name: "Dark Falz [Apprentice]",
        artwork: "apprentice.webp",
        attack: 27,
        ppCost: 5,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          0,  0, LEFT,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 63,
        title: "Explorer",
        name: "Afin",
        artwork: "afin.webp",
        attack: 2,
        ppCost: 1,
        skillId: 5,
        // prettier-ignore
        area: [
          0,  0, 0,
          -2,  0, 0,
          -2,  0, 0,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 64,
        title: "Ranged Vanguard",
        name: "Risa",
        artwork: "risa.webp",
        attack: 14,
        ppCost: 3,
        skillId: 5,
        // prettier-ignore
        area: [
          0,  0, -2,
          0,  0, -2,
          0,  0, -2,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 65,
        title: "ARKS Member",
        name: "Sandor",
        artwork: "sandor.png",
        attack: 2,
        ppCost: 1,
        skillId: 5,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  -1, 0,
          0,  -1, 0,
        ],
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 66,
        title: "ARKS Member",
        name: "Isaac",
        artwork: "isaac.webp",
        attack: 9,
        ppCost: 2,
        skillId: 0,
        element: "light",
        set: "Version 1",
      },
      {
        id: 67,
        title: "Ashmaiden",
        name: "Sukunahime",
        artwork: "sukunahime.webp",
        attack: 20,
        ppCost: 4,
        skillId: 12,
        element: "light",
        set: "Version 1",
      },
      {
        id: 68,
        title: "Observer",
        name: "Xion",
        artwork: "xion.webp",
        attack: 1,
        ppCost: 1,
        skillId: 12,
        element: "light",
        set: "Version 1",
      },
      {
        id: 69,
        name: "Rappy",
        artwork: "rappy.webp",
        attack: 8,
        ppCost: 2,
        skillId: 13,
        element: "light",
        set: "Version 1",
      },
      {
        id: 70,
        name: "2nd Generation Klariskrays",
        artwork: "klariskrays_matoi.webp",
        attack: 26,
        ppCost: 5,
        skillId: 4,
        // prettier-ignore
        area: [
          4,  0, 0,
          1,  3, 1,
          0,  0, 4,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 71,
        title: "The Girl With No Past",
        name: "Matoi",
        artwork: "matoi.webp",
        attack: 20,
        ppCost: 4,
        skillId: 4,
        // prettier-ignore
        area: [
          4,  0, 4,
          2,  0, 2,
          0,  0, 0,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 72,
        title: "Technique Vanguard",
        name: "Marlu",
        artwork: "marlu.webp",
        attack: 13,
        ppCost: 3,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  2, 0,
          3,  0, 3,
          0,  2, 0,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 73,
        title: "Research Lab Assistant",
        name: "Wright",
        artwork: "wright.webp",
        attack: 2,
        ppCost: 1,
        skillId: 4,
        // prettier-ignore
        area: [
          2,  1, 0,
          0,  0, 0,
          0,  1, 1,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 74,
        title: "Aether Matriarch",
        name: "Mother",
        artwork: "mother.webp",
        attack: 27,
        ppCost: 5,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  3, 0,
          5,  0, 5,
          0,  0, 0,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 75,
        title: "Divine Queen of Epyk",
        name: "Margareta",
        artwork: "margareta.webp",
        attack: 8,
        ppCost: 2,
        skillId: 4,
        // prettier-ignore
        area: [
          3,  0, 0,
          0,  2, 0,
          0,  0, 3,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 76,
        title: "ARKS Member",
        name: "Garrus",
        artwork: "garrus.webp",
        attack: 14,
        ppCost: 3,
        skillId: 4,
        // prettier-ignore
        area: [
          0,  0, 0,
          1,  1, 1,
          0,  0, 0,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 77,
        title: "Braver Founder",
        name: "Azanami",
        artwork: "azanami.webp",
        attack: 13,
        ppCost: 3,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  LEFT, 0,
          0,  0, 0,
          0,  RIGHT, 0,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 78,
        title: "Researcher",
        name: "Aki",
        artwork: "aki.webp",
        attack: 8,
        ppCost: 2,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  LEFT, 0,
          0,  0, UP,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 79,
        name: "Ko’Rela",
        artwork: "ko_rela.webp",
        attack: 21,
        ppCost: 4,
        skillId: 9,
        // prettier-ignore
        area: [
          RIGHT,  0, 0,
          0,  0, 0,
          0,  0, 0,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 80,
        title: "Queen of Cuento",
        name: "Hariette",
        artwork: "hariette.webp",
        attack: 21,
        ppCost: 4,
        skillId: 6,
        // prettier-ignore
        area: [
          RIGHT,  0, 0,
          0,  0, 0,
          0,  0, LEFT,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 81,
        title: "ARKS Member",
        name: "Rudis",
        artwork: "rudis.webp",
        attack: 2,
        ppCost: 1,
        skillId: 6,
        // prettier-ignore
        area: [
          0,  RIGHT, 0,
          0,  0, 0,
          0,  0, 0,
        ],
        element: "light",
        set: "Version 1",
      },
      {
        id: 82,
        name: "Dark Falz [Elder]",
        artwork: "dark_falz_elder.webp",
        attack: 30,
        ppCost: 5,
        skillId: 0,
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 83,
        name: "El Dagan",
        artwork: "el_dagan.webp",
        attack: 4,
        ppCost: 1,
        skillId: 0,
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 84,
        title: "Sorcerer",
        name: "Phaleg",
        artwork: "phaleg.webp",
        attack: 25,
        ppCost: 4,
        skillId: 14,
        // prettier-ignore
        area: [
          0,  0, 0,
          -3,  -3, -3,
          -3,  -3, -3,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 85,
        title: "ARKS Member",
        name: "Helen",
        artwork: "helen.webp",
        attack: 7,
        ppCost: 2,
        skillId: 9,
        // prettier-ignore
        area: [
          0,  0, 0,
          RIGHT,  0, 0,
          0,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },
      {
        id: 86,
        name: "Dekor Maryuda",
        artwork: "dekor_maryuda.webp",
        attack: 22,
        ppCost: 4,
        skillId: 9,
        // prettier-ignore
        area: [
          0, 0, 0,
          UP,  RIGHT, 0,
          0,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },
      {
        id: 87,
        title: "Power Seeker",
        name: "Theodore",
        artwork: "theodore.webp",
        attack: 20,
        ppCost: 4,
        skillId: 5,
        // prettier-ignore
        area: [
          -5,  0, 0,
          0,  0, 0,
          0,  0, -4,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 88,
        title: "ARKS Member",
        name: "Niels",
        artwork: "niels.webp",
        attack: 2,
        ppCost: 1,
        skillId: 5,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          -2,  -1, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 89,
        title: "ARKS Member",
        name: "Belyak",
        artwork: "belyak.webp",
        attack: 19,
        ppCost: 4,
        skillId: 5,
        // prettier-ignore
        area: [
          0,  0, 0,
          -2,  -1, 0,
          -2,  -2, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 90,
        name: "El Arda",
        artwork: "el_arda.webp",
        attack: 19,
        ppCost: 4,
        skillId: 5,
        // prettier-ignore
        area: [
          0,  0, 0,
          -2,  -1, 0,
          -2,  -2, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 91,
        name: "Dagan",
        artwork: "dagan.webp",
        attack: 2,
        ppCost: 1,
        skillId: 5,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  -1, 0,
          0,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 92,
        title: "Item Lab Employee",
        name: "Dudu",
        artwork: "dudu.webp",
        attack: 3,
        ppCost: 1,
        skillId: 6,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          0,  LEFT, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 93,
        title: "Combat Instructor",
        name: "Barbara",
        artwork: "barbara.webp",
        attack: 8,
        ppCost: 2,
        skillId: 6,
        // prettier-ignore
        area: [
          0,  0, 0,
          RIGHT,  0, UP,
          0,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 94,
        name: "Cychronahda",
        artwork: "cychronahda.webp",
        attack: 15,
        ppCost: 3,
        skillId: 6,
        // prettier-ignore
        area: [
          0,  DOWN, 0,
          0,  0, 0,
          0,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 95,
        name: "Cuchronahda",
        artwork: "cuchronahda.webp",
        attack: 15,
        ppCost: 3,
        skillId: 6,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          0,  UP, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 96,
        title: "The Girl Who Wove the Past",
        name: "Matoi",
        artwork: "matoi_dark.webp",
        attack: 26,
        ppCost: 5,
        skillId: 15,
        // prettier-ignore
        area: [
          0,  0, 1,
          0,  0, 0,
          1,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 97,
        title: "Raging Dragon",
        name: "Haddred",
        artwork: "haddred.webp",
        attack: 26,
        ppCost: 5,
        skillId: 15,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 0,
          0,  1, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 98,
        title: "Xiaokin",
        name: "Sarah",
        artwork: "sarah.webp",
        attack: 14,
        ppCost: 3,
        skillId: 15,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  1, 0,
          0,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },

      {
        id: 99,
        title: "Latent Talent",
        name: "Theodore",
        artwork: "theodore2.webp",
        attack: 5,
        ppCost: 2,
        skillId: 15,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  1, 0,
          0,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },
      {
        id: 100,
        name: "Dark Falz [Persona]",
        artwork: "dark_falz_persona.webp",
        attack: 27,
        ppCost: 5,
        skillId: 15,
        // prettier-ignore
        area: [
          0,  0, 0,
          0,  0, 1,
          0,  0, 0,
        ],
        element: "darkness",
        set: "Version 1",
      },
    ] satisfies CardProps[]
  ).map((i) => new Card(i))
);
