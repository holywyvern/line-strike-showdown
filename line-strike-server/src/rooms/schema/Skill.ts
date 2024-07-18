import { Schema, ArraySchema, type } from "@colyseus/schema";

export type SkillCategory = "passive" | "support" | "disrupt";

export type SkillTag =
  | "unitedFront"
  | "reinforcement"
  | "drawCard"
  | "buff"
  | "debuff"
  | "moveEnemy"
  | "moveAlly"
  | "addPP"
  | "baseBuster"
  | "swapEnemy"
  | "swapAlly"
  | "baseGuard"
  | "wildcard"
  | "stun";

export type SkillProps = {
  id: number;
  name: string;
  description: string;
  category: SkillCategory;
  tags?: SkillTag[];
};

export class Skill extends Schema {
  static COLLECTION: Skill[] = [];

  @type("uint64")
  id: number;

  @type("string")
  name: string;

  @type("string")
  description: string;

  @type("string")
  category: SkillCategory;

  @type(["string"])
  tags: ArraySchema<SkillTag>;

  constructor({ id, name, description, category, tags }: SkillProps) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.tags = new ArraySchema(...(tags || []));
  }

  get priority() {
    if (this.category === "passive") return 300_000;
    if (this.category === "support") return 200_000;

    return 100_000;
  }
}

Skill.COLLECTION.push(
  ...(
    [
      { id: 0, name: "No Skill", description: "", category: "passive" },
      {
        id: 1,
        name: "United Front",
        description:
          "[Passive Skill]\nThis card's Attack increases by its number of allies.\nNote: This card does not count as its own ally.",
        category: "passive",
        tags: ["unitedFront"],
      },
      {
        id: 2,
        name: "Reinforcement",
        description:
          "[Passive Skill]\nWhen Summoning onto a Line where your total Attack is lower than your opponent's, reduce your PP Cost by 1.",
        category: "passive",
        tags: ["reinforcement"],
      },
      {
        id: 3,
        name: "Draw Card",
        description: "Draw 1 Card.",
        category: "support",
        tags: ["drawCard"],
      },
      {
        id: 4,
        name: "Buff Ally",
        description:
          "Increase target allies' Attack.\nNote: Cannot target itself.",
        category: "support",
        tags: ["buff"],
      },
      {
        id: 5,
        name: "Debuff Enemy",
        description: "Decrease target enemies' Attack.",
        category: "disrupt",
        tags: ["debuff"],
      },
      {
        id: 6,
        name: "Move Enemy",
        description: "Move the target enemy in the direction of the arrow.",
        category: "disrupt",
        tags: ["moveEnemy"],
      },
      {
        id: 7,
        name: "+1 PP",
        description: "Add 1 PP.",
        category: "support",
        tags: ["addPP"],
      },
      {
        id: 8,
        name: "Base Buster",
        description:
          "[Passive Skill]\nWhen this card attacks an enemy Base, add 1 point of damage one time only.",
        category: "passive",
        tags: ["baseBuster"],
      },
      {
        id: 9,
        name: "Move Ally",
        description: "Move the target ally in the direction of the arrow.",
        category: "support",
        tags: ["moveAlly"],
      },
      {
        id: 10,
        name: "Swap Ally",
        description: "Swap the target allies in the direction of the arrow.",
        category: "support",
        tags: ["swapAlly"],
      },
      {
        id: 11,
        name: "Swap Enemy",
        description: "Swap the target enemies in the direction of the arrow.",
        category: "disrupt",
        tags: ["swapEnemy"],
      },
      {
        id: 12,
        name: "Base Guard",
        description:
          "[Passive Skill]\nWhen a Base in the same row as this card is, attacked, reduce the damage by 1 point one time only.",
        category: "passive",
        tags: ["baseGuard"],
      },
      {
        id: 13,
        name: "Wildcard",
        description:
          "[Passive Skill]\nWhen this card is the target of Overwrite Summoning, any Element can be used.",
        category: "support",
        tags: ["wildcard"],
      },
      {
        id: 14,
        name: "Ally Debuff",
        description:
          "Decrease target allies' Attack.\nNote: Cannot target itself.",
        category: "support",
        tags: ["buff"],
      },
      {
        id: 15,
        name: "Stun",
        description: "Incapacitate the target enemy for the current turn.",
        category: "disrupt",
        tags: ["stun"],
      },
    ] satisfies SkillProps[]
  ).map((i) => new Skill(i))
);
