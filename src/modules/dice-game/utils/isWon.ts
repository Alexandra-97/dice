import { RangeType } from "@/modules/dice-game/types";

export const isWon = (range: RangeType, value: number, result: number) =>
  range === "under" ? value > result : value < result;
