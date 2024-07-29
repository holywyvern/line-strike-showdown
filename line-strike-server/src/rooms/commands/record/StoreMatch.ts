import { Command } from "@colyseus/command";
import { MatchRecordResult } from "@prisma/client";

import { LineStrikeRoom } from "../../LineStrikeRoom";

import { database } from "../../../database";

import { Player } from "../../schema/Player";
import { ChatLog } from "../../schema/ChatLog";

export class StoreMatch extends Command<LineStrikeRoom> {
  async execute() {
    const { playerA, playerB, rankType, formatID, chat } = this.state;
    const chats = [...chat];
    this.state.chat.push(new ChatLog({ type: "recording" }));
    try {
      const record = await database.matchRecord.create({
        data: {
          result: this.getResult(),
          accountA: playerA.accountID
            ? { connect: { id: BigInt(playerA.accountID) } }
            : {},
          accountB: playerB.accountID
            ? { connect: { id: BigInt(playerB.accountID) } }
            : {},
          playerA: this.createPlayerData(playerA),
          playerB: this.createPlayerData(playerB),
          type: rankType === "ranked" ? "RANKED" : "UNRANKED",
          formatID,
          chats: {
            createMany: {
              data: this.createLogs(chats),
              skipDuplicates: true,
            },
          },
        },
      });
      this.state.chat.push(
        new ChatLog({ type: "recorded", message: String(record.id) })
      );
    } catch (error) {
      console.error(error);
    }
  }

  getResult(): MatchRecordResult {
    if (this.state.playerA.victory) return "VICTORY_A";
    if (this.state.playerB.victory) return "VICTORY_B";
    return "DRAW";
  }

  createPlayerData(player: Player) {
    return {
      create: {
        name: player.name,
        sessionID: player.sessionID,
        startingHandIDs: [...player.initialHandIDs],
        startingDeckIDs: [...player.initialDeckIDs],
      },
    };
  }

  createLogs(chats: ChatLog[]) {
    return chats.map(
      ({
        playerID,
        name,
        timestamp,
        message,
        type,
        turn,
        position,
        newPosition,
        cardID,
        blocks,
        damage,
        busters,
        lane,
        handIndex,
        oldValue,
        newValue,
      }) => ({
        playerID,
        name,
        timestamp,
        message,
        type,
        turn,
        position,
        newPosition,
        cardID,
        blocks,
        damage,
        busters,
        lane,
        handIndex,
        oldValue,
        newValue,
      })
    );
  }
}
