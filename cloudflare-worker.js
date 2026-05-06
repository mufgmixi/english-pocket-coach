const MODEL = "gpt-5.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders
    }
  });
}

function extractOutputText(responseJson) {
  if (responseJson.output_text) {
    return responseJson.output_text;
  }
  const parts = [];
  for (const item of responseJson.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        parts.push(content.text);
      }
    }
  }
  return parts.join("\n").trim();
}

async function handleCoach(request, env) {
  if (!env.OPENAI_API_KEY) {
    return jsonResponse({ error: "OPENAI_API_KEY secret is not set." }, 500);
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON request." }, 400);
  }

  const userMessage = String(input.message || "").trim();
  const history = Array.isArray(input.history) ? input.history.slice(-8) : [];

  if (!userMessage) {
    return jsonResponse({ error: "Message is required." }, 400);
  }

  const instructions = [
    "You are an English conversation coach for a Japanese adult learner.",
    "The learner wants to use English as much as possible, but may insert Japanese words or phrases when vocabulary does not come to mind.",
    "Do not simply translate everything from Japanese. Encourage English-first conversation.",
    "If the learner mixes Japanese into English, infer the intended meaning and replace only the Japanese parts with natural beginner-friendly English.",
    "If the learner writes mostly Japanese, give one simple English sentence they can say, then ask them to try again with at least one English phrase.",
    "Return strict JSON only with these keys: english, lesson_ja, word_help, follow_up_question.",
    "english: only the corrected natural English sentence the learner can say aloud. Do not add praise, meta comments, or extra conversation here.",
    "lesson_ja: 1-2 short Japanese sentences explaining the most useful correction. Mention a better phrase only when it matters.",
    "word_help: list 1-3 useful words or chunks from the Japanese parts, formatted like '疲れた = tired / exhausted'. Keep it short.",
    "follow_up_question: one easy English question to continue the conversation. Make it answerable with simple English.",
    "Keep the level around CEFR A1-A2 unless the learner's English is clearly stronger.",
    "Avoid long explanations. Prefer practical conversation practice.",
    "Good output example:",
    "{\"english\":\"I was very tired after work, but I still want to practice English.\",\"lesson_ja\":\"「疲れた」は tired でOKです。「それでも」は still を入れると自然です。\",\"word_help\":\"疲れた = tired / exhausted\",\"follow_up_question\":\"What made you tired at work today?\"}"
  ].join("\n");

  const conversationText = history
    .map((item) => `${item.role}: ${item.content}`)
    .concat(`learner: ${userMessage}`)
    .join("\n");

  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || MODEL,
      instructions,
      input: conversationText
    })
  });

  const openaiJson = await openaiResponse.json();
  if (!openaiResponse.ok) {
    return jsonResponse({
      error: openaiJson.error?.message || "OpenAI API request failed."
    }, openaiResponse.status);
  }

  let parsed;
  try {
    parsed = JSON.parse(extractOutputText(openaiJson));
  } catch {
    parsed = {
      english: extractOutputText(openaiJson),
      lesson_ja: "AIの返答をJSONとして解析できませんでしたが、英語文は表示しました。",
      word_help: "",
      follow_up_question: ""
    };
  }

  return jsonResponse({
    ...parsed,
    model: env.OPENAI_MODEL || MODEL,
    usage: openaiJson.usage || null
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/coach") {
      return handleCoach(request, env);
    }

    return jsonResponse({
      ok: true,
      message: "English Pocket Coach Worker is running. Use POST /api/coach."
    });
  }
};
