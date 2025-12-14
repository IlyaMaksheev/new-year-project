import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditPayload, useUpdateCard } from "@api/cards.ts";

export const useEditCards = () => {
  const updateCard = useUpdateCard();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mutationPayload: EditPayload & { cardId: number }) => {
      const { cardId, ...payload } = mutationPayload;
      return updateCard(cardId, payload as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
