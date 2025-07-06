import { ChangeEvent, useCallback, useState } from "react";
import {
  Typography,
  Box,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Slider,
  CircularProgress,
} from "@mui/material";
import { RangeType } from "@/modules/dice-game/types";
import { useThrottle } from "@/hooks/useThrottle";
import { useHistoryStore } from "@/modules/dice-game/store";
import { useSnackbar } from "notistack";
import { isWon } from "@/modules/dice-game/utils/isWon";
import { GameNotification } from "@/modules/dice-game/components/GameNotification";

const marks = [
  { value: 0, label: 0 },
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 },
  { value: 60 },
  { value: 70 },
  { value: 80 },
  { value: 90 },
  { value: 100, label: 100 },
];

export type FormData = { range: RangeType; value: number };

export const Game = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistoryStore((state) => state.context.history);
  const hasHydrated = useHistoryStore((state) => state.context.hasHydrated);
  const addResult = useHistoryStore((state) => state.actions.addResult);
  const [formData, setFormData] = useState<FormData>({
    range: "under",
    value: 20,
  });

  const notify = useCallback(
    (range: RangeType, isSuccess: boolean) => {
      enqueueSnackbar(
        <GameNotification range={range} isSuccess={isSuccess} />,
        {
          variant: isSuccess ? "success" : "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        },
      );
    },
    [enqueueSnackbar],
  );

  const handleChangeRange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        range: (event.target as HTMLInputElement).value as RangeType,
      }));
    },
    [],
  );

  const handleChangeValue = useCallback((_event: Event, newValue: number) => {
    setFormData((prev) => ({ ...prev, value: newValue }));
  }, []);

  const playGame = useThrottle(() => {
    const newResult = Math.floor(Math.random() * 100) + 1;
    const isSuccess = isWon(formData.range, formData.value, newResult);

    addResult({ time: Date.now(), ...formData, result: newResult });
    notify(formData.range, isSuccess);
  }, 1000);

  return (
    <Stack
      alignItems="center"
      spacing={2}
      sx={{ maxWidth: "320px", mx: "auto", pb: 4 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          height: "200px",
          width: "100%",
          padding: "10px",
        }}
      >
        {!hasHydrated ? (
          <CircularProgress size={60} />
        ) : history[0] ? (
          <Typography variant={"h1"}>{history[0].result}</Typography>
        ) : (
          <Typography variant={"h4"}>{"Let's start!"}</Typography>
        )}
      </Box>
      <RadioGroup row value={formData.range} onChange={handleChangeRange}>
        <FormControlLabel value="under" control={<Radio />} label="Under" />
        <FormControlLabel value="over" control={<Radio />} label="Over" />
      </RadioGroup>
      <Box sx={{ pt: 3, width: "100%" }}>
        <Slider
          value={formData.value}
          onChange={handleChangeValue}
          marks={marks}
          valueLabelDisplay="on"
          size={"small"}
        />
      </Box>
      <Button
        variant={"contained"}
        size={"large"}
        fullWidth
        sx={{ boxShadow: 2 }}
        onClick={playGame}
      >
        Play
      </Button>
    </Stack>
  );
};
