import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatTimestampToTime } from "@/modules/dice-game/utils/formatTimestampToTime";
import { isWon } from "@/modules/dice-game/utils/isWon";
import theme from "@/styles/theme";
import { useHistoryStore } from "@/modules/dice-game/store";

export const History = () => {
  const history = useHistoryStore((state) => state.context.history);

  return (
    history.length > 0 && (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Guess</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map(({ time, range, value, result }) => (
            <TableRow key={time}>
              <TableCell>{formatTimestampToTime(time)}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>
                {range} {value}
              </TableCell>
              <TableCell
                sx={{
                  color: isWon(range, value, result)
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                }}
              >
                {result}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
};
