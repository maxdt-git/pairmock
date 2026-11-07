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

export const AI_PROMPTS = {
  tips: "Review the code and give some tips",
  complexity: "What is the complexity of the code and can it be optimized?",
  bugs: "Read the code to find bugs and limit cases",
  optimal: "Give some tips to resolve the problem with the optimal solution",
}

export type AiReviewType = keyof typeof AI_PROMPTS;

export function getAiFeedback(code: string, type: AiReviewType) {
  const systemPrompt = AI_PROMPTS[type];
  return askAI(systemPrompt, `\n\n${code}`);
}
