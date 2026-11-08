const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "qwen/qwen3.8-27b";

const keys = (process.env.AI_API_KEYS ?? "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

let currentIndex = 0;

function nextKey(): string {
  const key = keys[currentIndex];
  currentIndex = (currentIndex + 1) % keys.length;
  return key;
}

async function askAI(systemPrompt: string, userCode: string): Promise<string> {
  if (keys.length === 0) throw new Error("AI_API_KEYS is not defined");
  for (let attempt = 0; attempt < keys.length; attempt++) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nextKey()}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 600,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userCode },
        ],
      }),
    });
    if (res.status === 429) {
      console.warn("AI key rate limited, trying next one");
      continue;
    }
    if (!res.ok) throw new Error(`Provider error: ${res.status}`);
    const data = await res.json();
    return data.choices[0].message.content;
  }
  throw new Error("All keys are rate limited");
}

const AI_BASE_PROMPT = `You are a senior software engineer reviewing a candidate's code right after a mock technical interview.
The user message contains only the code the candidate wrote during the interview.

Rules:
- Answer in English, in a friendly and encouraging but honest tone, addressing the candidate as "you".
- Answer ONLY the task described below. Do not add a general code review or comment on other aspects.
- Format your answer in simple Markdown: short headings and bullet points. Never use tables.
- Keep it short: at most 150 words.
- Quote small code fragments with inline code when useful, but never rewrite the whole solution.
- If the code is empty, incomplete or not code at all, say so in one sentence and stop.

Task:`;

export const AI_PROMPTS = {
  tips: `Give 3 to 5 concrete suggestions to improve the readability and quality of the code: naming, structure, idiomatic use of the language, unnecessary complexity.
Do not talk about bugs or time/space complexity, other reviews cover them.`,

  complexity: `Analyze the time and space complexity of the code using Big-O notation, with one short sentence justifying each.
Then say whether a more efficient approach exists. If it does, name it and give its complexity, without writing its code.`,

  bugs: `Find bugs and unhandled edge cases by reading the code carefully (you cannot run it). Consider empty input, null/undefined, negative numbers, duplicates, very large inputs and off-by-one errors.
For each issue, give a concrete input that breaks the code and what goes wrong.
If you find no real bug, say so clearly instead of inventing one.`,

  optimal: `Explain the optimal approach to the problem this code is solving: the key idea, why it works, and its time/space complexity.
Describe it as numbered steps the candidate can follow to implement it themselves. Do not write the solution code.
If the candidate's code is already optimal, say so and briefly explain why.`,
};

export type AiReviewType = keyof typeof AI_PROMPTS;

export function getAiFeedback(code: string, type: AiReviewType) {
  const systemPrompt = `${AI_BASE_PROMPT}\n${AI_PROMPTS[type]}`;
  return askAI(systemPrompt, `\n\n${code}`);
}
