import OpenAI from "openai";
import { configDotenv } from "dotenv";
configDotenv();
export const configureOpenAi = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPEN_AI_ORGANISATION_ID,
  });
  return openai;
};
