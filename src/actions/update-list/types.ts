import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";
import { UpdatedListSchema } from "./schema";

export type InputType = z.infer<typeof UpdatedListSchema>;
export type ReturnTyp = ActionState<InputType, Board>;
