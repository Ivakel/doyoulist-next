"use server"
import { env } from "@/env";
import {OpenAI} from "openai"

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  baseURL: "https://api.aimlapi.com",
});

export default async function chatGPT({name, description}: {name: string, description: string
}): Promise<string> {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: "You are a task simplifying expert. Be descriptive and helpful" },
        { role: "user", content: `Give me 5 steps or instructions to complete the task with the name '${name}' and description of ${description}, the steps or instructions should be an array, in this form: {"1": instruction, "1": instruction...}. Each task should be a sentence long` }
      ],
      max_tokens: 128,
    });
    if (!chatCompletion.choices[0].message.content) {
      throw new Error("No AI response")
    }
    console.log(typeof chatCompletion.choices[0].message.content, "from chat")
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    throw new Error("No AI response")
  }
  
} 