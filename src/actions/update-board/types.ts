import { z } from "zod";
import { UpdatedBoardSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof UpdatedBoardSchema>;
export type ReturnTyp = ActionState<InputType, Board>;
