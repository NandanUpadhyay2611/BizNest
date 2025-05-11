import { task } from "@trigger.dev/sdk/v3";
import { processOrders } from "../orderConsumer";

export const orderConsumerTask = task({
  id: "orderStream",
  run: async (payload, { ctx }) => {
    await processOrders();
    return { success: true };
  },
});
