import { z } from "zod";
import { DeleteListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof DeleteListSchema>;
export type ReturnTyp = ActionState<InputType, Board>;
