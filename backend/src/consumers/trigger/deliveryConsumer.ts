import { task } from "@trigger.dev/sdk/v3";
import { processReceiptsBatch } from "../deliveryReceiptConsumer";

export const deliveryReceiptTask = task({
  id: "deliveryReceiptStream",
  run: async (payload, { ctx }) => {
    await processReceiptsBatch();
    return { success: true };
  },
});
