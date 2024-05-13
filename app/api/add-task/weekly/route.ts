import { DailyTaskType } from "@/db/mongodb/models/DailyTaskModel";
import { NextResponse } from "next/server";
import chatGPT from "@/chatGPT/client";

type ChapGPTType = Awaited<ReturnType<typeof chatGPT>>;

export async function POST(request: Request) {
  try {
    const data: DailyTaskType = await request.json();
    const message: ChapGPTType = await chatGPT({
      title: data.title,
      description: data.description,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
// {
//   "choices": [
//     {
//       "finish_reason": "stop",
//       "index": 0,
//       "message": {
//         "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
//         "role": "assistant"
//       },
//       "logprobs": null
//     }
//   ],
//   "created": 1677664795,
//   "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
//   "model": "gpt-3.5-turbo-0613",
//   "object": "chat.completion",
//   "usage": {
//     "completion_tokens": 17,
//     "prompt_tokens": 57,
//     "total_tokens": 74
//   }
// }
