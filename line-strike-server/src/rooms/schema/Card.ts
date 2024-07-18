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
          0,      0, 0,
          0,  RIGHT, 0,
          0,  RIGHT, 0,
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
              0, LEFT, 0,
          RIGHT,    0, 0,
              0,    0, 0,
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
          0, RIGHT, 0,
          0,     0, 0,
          0,     0, 0,
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
           0,   0,   0,
           0,   0,   0,
           0,  UP,  UP,
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
           0,  0,    0,
          UP,  0,    0,
           0,  0, LEFT,
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
          0, LEFT,  0,
          0,    0,  0,
          0,    0,  0,
        ],
        element: "ice",
        set: "Version 1",
      },
      {
        id: 33,
        name: "Melee Vanguard Oza",
        artwork: "oza.webp",
        attack: 4,
        ppCost: 1,
        skillId: 0,
        element: "wind",
        set: "Version 1",
      },
      {
        id: 34,
        name: "ARKS Officer Seraphy",
        artwork: "seraphy.webp",
        attack: 6,
        ppCost: 2,
        skillId: 3,
        element: "wind",
        set: "Version 1",
      },
      {
        id: 35,
        name: "Torch Bearer Echo",
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
        name: "Distant Song Quna",
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
        name: "Xion’s Little Brother Xiao",
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
        name: "ARKS Member Burrows",
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
        name: "Council of Six - Three Casra",
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
        name: "Striver Ulku",
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
        name: "Bouncer Test Proxy Katori",
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
        name: "ARKS Member Makoto",
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
        name: "Civilian Henri",
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
        name: "Void Leader Luther",
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
        element: "wind",
        set: "Version 1",
      },
      {
        id: 45,
        name: "Loyal Retainer Melfonseana",
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
        element: "wind",
        set: "Version 1",
      },
      {
        id: 46,
        name: "Geologist Logio",
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
        name: "ARKS Member Sherry",
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
        name: "Crimson Gunner Chroto",
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
        name: "Steel Master Joseph",
        artwork: "joseph.webp",
        attack: 23,
        ppCost: 4,
        skillId: 0,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 50,
        name: "ARKS Member Velge",
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
        name: "Hateful Warrior Gettemhult",
        artwork: "gettemhult.webp",
        attack: 20,
        ppCost: 4,
        skillId: 8,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 53,
        name: "Council of Six - One Regius",
        artwork: "regius.webp",
        attack: 26,
        ppCost: 5,
        skillId: 8,
        element: "lightning",
        set: "Version 1",
      },
      {
        id: 54,
        name: "Momentous Encounter Fourie",
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
        name: "ARKS Ship Operator Xiera",
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
        name: "Bladesmith Zig",
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
        name: "Council of Six - Four Zeno",
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
        name: "ARKS Member Clark",
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
        name: "Small Shadow Lilipan",
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
        name: "ARKS Trainee Rubert",
        artwork: "robert.webp",
        attack: 2,
        ppCost: 1,
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
        name: "Explorer Afin",
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
        name: "Ranged Vanguard Risa",
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
        name: "ARKS Member Sandor",
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
        name: "ARKS Member Isaac",
        artwork: "isaac.webp",
        attack: 9,
        ppCost: 2,
        skillId: 0,
        element: "light",
        set: "Version 1",
      },
      {
        id: 67,
        name: "Ashmaiden Sukunahime",
        artwork: "sukunahime.webp",
        attack: 20,
        ppCost: 4,
        skillId: 12,
        element: "light",
        set: "Version 1",
      },
      {
        id: 68,
        name: "Observer Xion",
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
        name: "The Girl With No Past Matoi",
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
        name: "Technique Vanguard Marlu",
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
        name: "Research Lab Assistant Wright",
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
        name: "Aether Matriarch Mother",
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
        name: "Divine Queen of Epyk Margareta",
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
        name: "ARKS Member Garrus",
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
        name: "Braver Founder Azanami",
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
        name: "Researcher Aki",
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
        name: "Queen of Cuento Hariette",
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
        name: "ARKS Member Rudis",
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
    ] satisfies CardProps[]
  ).map((i) => new Card(i))
);
