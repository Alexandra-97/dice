import { Typography } from "@mui/material";
import { RangeType } from "@/modules/dice-game/types";

type Props = { range: RangeType; isSuccess: boolean };

export const GameNotification = ({ range, isSuccess }: Props) => (
  <div>
    <Typography sx={{ fontWeight: "medium" }}>
      {isSuccess ? "You won" : "You lost"}
    </Typography>
    {!isSuccess && (
      <Typography sx={{ fontSize: "14px", fontWeight: "medium", mt: "2px" }}>
        Number was {range === "under" ? "higher" : "lower"}
      </Typography>
    )}
  </div>
);
