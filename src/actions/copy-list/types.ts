import { z } from "zod";
import { CopyListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof CopyListSchema>;
export type ReturnTyp = ActionState<InputType, Board>;
