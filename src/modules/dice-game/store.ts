import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RangeType } from "@/modules/dice-game/types";

export type ResultType = {
  time: number;
  range: RangeType;
  value: number;
  result: number;
};

type HistoryStoreState = {
  context: {
    history: ResultType[];
    hasHydrated: boolean;
  };
};

type HistoryStoreActions = {
  actions: {
    addResult: (result: ResultType) => void;
    setHasHydrated: (value: boolean) => void;
  };
};

type HistoryStore = HistoryStoreState & HistoryStoreActions;

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => {
      return {
        context: {
          history: [],
          hasHydrated: false,
        },
        actions: {
          addResult: (result) => {
            const context = get().context;

            return set({
              context: {
                ...context,
                history: [result, ...context.history.slice(0, 9)],
              },
            });
          },
          setHasHydrated: (value) => {
            const context = get().context;

            return set({
              context: { ...context, hasHydrated: value },
            });
          },
        },
      };
    },
    {
      name: "history-storage",
      partialize: (state) => ({ context: state.context }),
      onRehydrateStorage: (state) => () => state.actions.setHasHydrated(true),
    },
  ),
);
