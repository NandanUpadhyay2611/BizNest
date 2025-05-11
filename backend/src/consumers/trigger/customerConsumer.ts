import { task } from "@trigger.dev/sdk/v3";
import { processCustomers } from "../customerConsumer";

export const customerConsumerTask = task({
  id: "customerStream",
  run: async (payload, { ctx }) => {
    await processCustomers();
    return { success: true };
  },
});
