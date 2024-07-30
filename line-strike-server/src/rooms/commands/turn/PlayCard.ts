import { Command } from "@colyseus/command";
import { Client } from "colyseus";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { GainPP } from "../user/GainPP";

import { Card } from "../../schema/Card";
import { PlayedCard } from "../../schema/PlayedCard";
import { SaveAction } from "./SaveAction";
import { PlaceCard } from "../battle/PlaceCard";
import { CalculateUnitedFront } from "./CalculateUnitedFront";
import { CalculateLaneAttack } from "./CalculateLaneAttack";
import { Player } from "../../schema/Player";
import { PlayPlayerCard } from "./PlayPlayerCard";

export type PlayCardProps = {
  client: Client;
  handIndex: number;
  position: number;
};

export class PlayCard extends Command<LineStrikeRoom, PlayCardProps> {
  async execute({ client, handIndex, position }: PlayCardProps) {
    const player = this.state.findPlayer(client);
    if (!player) throw new Error("Player not found");

    return [new PlayPlayerCard().setPayload({ player, handIndex, position })];
  }
}
