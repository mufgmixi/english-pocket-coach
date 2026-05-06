const phrases = [
  {
    en: "Could you say that again?",
    ja: "もう一度言ってもらえますか？",
    tip: "聞き返しは Sorry? だけでも通じますが、この文は丁寧で仕事でも使いやすいです。"
  },
  {
    en: "I am still thinking about it.",
    ja: "まだ考え中です。",
    tip: "Japanese speakers often say I am thinking now. Natural English uses still thinking about it."
  },
  {
    en: "That makes sense.",
    ja: "なるほど / 筋が通っています。",
    tip: "I understand より会話っぽく、相手の説明に納得した感じが出ます。"
  },
  {
    en: "I am not sure yet.",
    ja: "まだはっきり分かりません。",
    tip: "I don't know は少し強く聞こえることがあります。not sure yet はやわらかい表現です。"
  },
  {
    en: "Let me check.",
    ja: "確認します。",
    tip: "仕事の英語でとても便利です。Check it と言うより自然です。"
  },
  {
    en: "What do you mean?",
    ja: "どういう意味ですか？",
    tip: "意味を確認するときの基本表現です。強く聞こえないように、声を少し上げて言うと自然です。"
  }
];

const quizzes = [
  {
    prompt: "「確認します」を自然な英語で言うと？",
    answer: "Let me check.",
    options: ["Let me check.", "I check it.", "I will confirmation."]
  },
  {
    prompt: "「まだ考え中です」に近い自然な英語は？",
    answer: "I am still thinking about it.",
    options: ["I am still thinking about it.", "I think now.", "I am thinking it."]
  },
  {
    prompt: "相手の説明に「なるほど」と返すなら？",
    answer: "That makes sense.",
    options: ["That makes sense.", "I am understand.", "It is meaning."]
  },
  {
    prompt: "「もう一度言ってもらえますか？」を丁寧に言うなら？",
    answer: "Could you say that again?",
    options: ["Could you say that again?", "One more please speaking.", "Please again voice."]
  }
];

const mistakes = [
  {
    title: "Article: a / the",
    bad: "I went to hospital.",
    good: "I went to the hospital.",
    note: "場所が具体的なら the を使うことが多いです。"
  },
  {
    title: "Countable nouns",
    bad: "I bought two coffee.",
    good: "I bought two coffees.",
    note: "注文では coffee を数えられる名詞として使えます。"
  },
  {
    title: "Soft refusal",
    bad: "I can't.",
    good: "I'm afraid I can't.",
    note: "断るときは I'm afraid を足すとやわらかくなります。"
  }
];

const conversations = [
  {
    scene: "Cafe",
    hint: "カフェで注文します。丁寧だけど長すぎない英語を選びましょう。",
    partner: "Hi, what can I get for you?",
    answer: "Could I have an iced coffee, please?",
    options: [
      "Could I have an iced coffee, please?",
      "Give me iced coffee.",
      "I am iced coffee."
    ],
    feedback: {
      good: "Natural and polite. Very useful in cafes.",
      bad: "Better: Could I have an iced coffee, please? 'Give me' sounds too direct."
    }
  },
  {
    scene: "Work",
    hint: "仕事で分からない点を確認します。強すぎない聞き方が大事です。",
    partner: "Can you finish this by Friday?",
    answer: "Let me check my schedule and get back to you.",
    options: [
      "Let me check my schedule and get back to you.",
      "Maybe impossible.",
      "I don't know it."
    ],
    feedback: {
      good: "Good. This sounds professional and gives you time.",
      bad: "Better: Let me check my schedule and get back to you."
    }
  },
  {
    scene: "Small talk",
    hint: "初対面の軽い会話です。短く返して質問を返すと続きます。",
    partner: "How was your weekend?",
    answer: "It was good. I went to a new ramen shop. How about you?",
    options: [
      "It was good. I went to a new ramen shop. How about you?",
      "Yes, weekend.",
      "I was sleep only."
    ],
    feedback: {
      good: "Nice. You answered and returned the question.",
      bad: "Better: It was good. I went to a new ramen shop. How about you?"
    }
  },
  {
    scene: "Travel",
    hint: "道を聞く場面です。Could you tell me...? は丁寧で便利です。",
    partner: "You look a little lost. Can I help?",
    answer: "Yes, could you tell me how to get to the station?",
    options: [
      "Yes, could you tell me how to get to the station?",
      "Station where?",
      "I want station."
    ],
    feedback: {
      good: "Natural. This is clear and polite.",
      bad: "Better: Yes, could you tell me how to get to the station?"
    }
  }
];

const freeTalkPatterns = [
  {
    keys: ["疲れ", "つかれ"],
    en: "I'm tired today, but I still want to study English a little.",
    lesson: "疲れたは I'm tired. 「でも少し勉強したい」は but I still want to study a little が自然です。"
  },
  {
    keys: ["仕事", "しごと"],
    en: "Work was busy today, so I feel a little tired.",
    lesson: "仕事が忙しかったは Work was busy. busy は人にも仕事にも使えます。"
  },
  {
    keys: ["英語", "勉強"],
    en: "I want to improve my English little by little.",
    lesson: "上達したいは improve. little by little は「少しずつ」です。"
  },
  {
    keys: ["わから", "分から", "難し"],
    en: "English is difficult for me, but I want to keep trying.",
    lesson: "「私には難しい」は difficult for me. keep trying は「挑戦し続ける」です。"
  },
  {
    keys: ["ご飯", "食べ", "ラーメン", "寿司"],
    en: "I had a good meal today. It made me happy.",
    lesson: "食べたは I had... が自然なことが多いです。I ate もOKですが I had lunch のようによく言います。"
  },
  {
    keys: ["眠", "寝"],
    en: "I'm sleepy, so I will practice just one sentence today.",
    lesson: "眠いは I'm sleepy. 「1文だけ」は just one sentence と言えます。"
  },
  {
    keys: ["嬉し", "楽しか", "楽しい"],
    en: "I had a good day. I felt happy about it.",
    lesson: "嬉しかったは I felt happy. 楽しかったは I had fun も使えます。"
  },
  {
    keys: ["ありがとう", "助か"],
    en: "Thank you. That really helps me.",
    lesson: "助かりますは That helps me. 強調すると That really helps me. です。"
  }
];

let phraseIndex = Number(localStorage.getItem("phraseIndex") || 0);
let quizIndex = Number(localStorage.getItem("quizIndex") || 0);
let correctCount = Number(localStorage.getItem("correctCount") || 0);
let practiceCount = Number(localStorage.getItem("practiceCount") || 0);
let conversationIndex = Number(localStorage.getItem("conversationIndex") || 0);

const phraseText = document.querySelector("#phraseText");
const phraseJa = document.querySelector("#phraseJa");
const phraseTip = document.querySelector("#phraseTip");
const shadowText = document.querySelector("#shadowText");
const shadowJa = document.querySelector("#shadowJa");
const quizPrompt = document.querySelector("#quizPrompt");
const quizOptions = document.querySelector("#quizOptions");
const quizFeedback = document.querySelector("#quizFeedback");
const scoreBadge = document.querySelector("#scoreBadge");
const meterFill = document.querySelector("#meterFill");
const mistakeList = document.querySelector("#mistakeList");
const sceneName = document.querySelector("#sceneName");
const sceneHint = document.querySelector("#sceneHint");
const partnerLine = document.querySelector("#partnerLine");
const conversationOptions = document.querySelector("#conversationOptions");
const conversationFeedback = document.querySelector("#conversationFeedback");
const freeTalkInput = document.querySelector("#freeTalkInput");
const freeTalkEnglish = document.querySelector("#freeTalkEnglish");
const freeTalkLesson = document.querySelector("#freeTalkLesson");
const voiceStatus = document.querySelector("#voiceStatus");
const aiCoachInput = document.querySelector("#aiCoachInput");
const aiCoachReply = document.querySelector("#aiCoachReply");
const aiCoachLesson = document.querySelector("#aiCoachLesson");
const aiCoachMeta = document.querySelector("#aiCoachMeta");
const aiStatusBadge = document.querySelector("#aiStatusBadge");
const aiApiBaseUrl = document.querySelector("#aiApiBaseUrl");

let aiConversation = JSON.parse(localStorage.getItem("aiConversation") || "[]");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

function currentPhrase() {
  return phrases[phraseIndex % phrases.length];
}

function renderPhrase() {
  const phrase = currentPhrase();
  phraseText.textContent = phrase.en;
  phraseJa.textContent = phrase.ja;
  phraseTip.textContent = phrase.tip;
  shadowText.textContent = phrase.en;
  shadowJa.textContent = phrase.ja;
  localStorage.setItem("phraseIndex", String(phraseIndex));
}

function speak(text, rate = 0.9) {
  if (!("speechSynthesis" in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function renderQuiz() {
  const quiz = quizzes[quizIndex % quizzes.length];
  quizPrompt.textContent = quiz.prompt;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizFeedback.className = "feedback";

  quiz.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(option, quiz.answer));
    quizOptions.appendChild(button);
  });
}

function chooseAnswer(option, answer) {
  const isCorrect = option === answer;
  quizFeedback.textContent = isCorrect ? "Correct. Good natural English." : `Close. Better: ${answer}`;
  quizFeedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  if (isCorrect) {
    correctCount += 1;
    localStorage.setItem("correctCount", String(correctCount));
  }
  quizIndex += 1;
  localStorage.setItem("quizIndex", String(quizIndex));
  updateProgress();
  window.setTimeout(renderQuiz, 900);
}

function updateProgress() {
  scoreBadge.textContent = `${correctCount} correct`;
  const percent = Math.min(100, practiceCount * 14);
  meterFill.style.width = `${percent}%`;
}

function renderMistakes() {
  mistakeList.innerHTML = "";
  mistakes.forEach((item) => {
    const card = document.createElement("div");
    card.className = "mistake";
    card.innerHTML = `
      <strong>${item.title}</strong>
      <code>Not: ${item.bad}
Better: ${item.good}</code>
      <p class="japanese">${item.note}</p>
    `;
    mistakeList.appendChild(card);
  });
}

function renderConversation() {
  const item = conversations[conversationIndex % conversations.length];
  sceneName.textContent = item.scene;
  sceneHint.textContent = item.hint;
  partnerLine.textContent = item.partner;
  conversationOptions.innerHTML = "";
  conversationFeedback.textContent = "";
  conversationFeedback.className = "feedback";

  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => chooseConversation(option, item));
    conversationOptions.appendChild(button);
  });
  localStorage.setItem("conversationIndex", String(conversationIndex));
}

function chooseConversation(option, item) {
  const isCorrect = option === item.answer;
  conversationFeedback.textContent = isCorrect ? item.feedback.good : item.feedback.bad;
  conversationFeedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  if (isCorrect) {
    speak(item.answer, 0.88);
  }
}

function buildFreeTalk() {
  const text = freeTalkInput.value.trim();
  if (!text) {
    freeTalkEnglish.textContent = "Type Japanese, then press Translate.";
    freeTalkLesson.textContent = "";
    return;
  }

  const matches = freeTalkPatterns.filter((pattern) =>
    pattern.keys.some((key) => text.includes(key))
  );

  if (matches.length === 0) {
    freeTalkEnglish.textContent = "I want to say this in English, but I need a little help.";
    freeTalkLesson.textContent = "まだこのアプリの簡単辞書にない内容です。ChatGPT/Codexに日本語で送ると、自然な英語に直して練習できます。";
    return;
  }

  const main = matches[0];
  freeTalkEnglish.textContent = main.en;
  freeTalkLesson.textContent = main.lesson;
  localStorage.setItem("freeTalkInput", text);
}

function startVoiceInput() {
  if (!SpeechRecognition) {
    voiceStatus.textContent = "Voice input is not supported in this browser. Try Chrome or Edge.";
    return;
  }

  if (!recognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.addEventListener("result", (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      freeTalkInput.value = transcript;
      voiceStatus.textContent = event.results[event.results.length - 1].isFinal
        ? "Voice captured. Press Translate and teach."
        : "Listening...";
    });

    recognition.addEventListener("error", () => {
      voiceStatus.textContent = "Voice input stopped. Check microphone permission.";
    });

    recognition.addEventListener("end", () => {
      if (freeTalkInput.value.trim()) {
        voiceStatus.textContent = "Voice captured. Press Translate and teach.";
      }
    });
  }

  voiceStatus.textContent = "Listening... speak Japanese now.";
  recognition.start();
}

function copyCoachPrompt() {
  const text = freeTalkInput.value.trim();
  const prompt = `日本語: ${text || "ここに日本語を書きます"}\nPlease translate this into natural English, explain the grammar in easy Japanese, and give me one short reply question for conversation practice.`;
  navigator.clipboard.writeText(prompt).then(
    () => {
      voiceStatus.textContent = "Copied. Paste it into Codex or ChatGPT to practice with AI.";
    },
    () => {
      voiceStatus.textContent = prompt;
    }
  );
}

function renderAiCoach(data) {
  aiCoachReply.textContent = data.english || "No English reply yet.";
  aiCoachLesson.textContent = data.lesson_ja || "";
  if (data.word_help) {
    aiCoachLesson.textContent += `${aiCoachLesson.textContent ? "\n\n" : ""}Word help: ${data.word_help}`;
  }
  if (data.follow_up_question) {
    aiCoachLesson.textContent += `${aiCoachLesson.textContent ? "\n\n" : ""}Question: ${data.follow_up_question}`;
  }
}

async function sendToAiCoach() {
  const message = aiCoachInput.value.trim();
  if (!message) {
    aiCoachMeta.textContent = "Type or voice-input a message first.";
    return;
  }

  aiCoachMeta.textContent = "Asking AI coach...";
  aiStatusBadge.textContent = "Connecting";

  try {
    const baseUrl = aiApiBaseUrl.value.trim().replace(/\/$/, "");
    localStorage.setItem("aiApiBaseUrl", baseUrl);

    const response = await fetch(`${baseUrl}/api/coach`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: aiConversation.slice(-8)
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "AI server error");
    }

    aiConversation.push({ role: "user", content: message });
    aiConversation.push({ role: "assistant", content: payload.english });
    localStorage.setItem("aiConversation", JSON.stringify(aiConversation.slice(-12)));
    renderAiCoach(payload);

    const tokens = payload.usage?.total_tokens ? `${payload.usage.total_tokens} tokens` : "token count unavailable";
    aiCoachMeta.textContent = `Model: ${payload.model || "unknown"} · ${tokens}`;
    aiStatusBadge.textContent = "AI ready";
    speak(payload.english, 0.86);
  } catch (error) {
    aiStatusBadge.textContent = "Local AI server needed";
    aiCoachReply.textContent = "AI mode is not connected yet.";
    aiCoachLesson.textContent = "GitHub Pages cannot safely store an OpenAI API key. Run the local server in server.js, or deploy a small backend/proxy. Then you can write English with Japanese words mixed in.";
    aiCoachMeta.textContent = error.message;
  }
}

document.querySelector("#speakBtn").addEventListener("click", () => speak(currentPhrase().en));
document.querySelector("#slowBtn").addEventListener("click", () => speak(currentPhrase().en, 0.68));
document.querySelector("#nextBtn").addEventListener("click", () => {
  phraseIndex += 1;
  renderPhrase();
});
document.querySelector("#doneBtn").addEventListener("click", () => {
  practiceCount += 1;
  localStorage.setItem("practiceCount", String(practiceCount));
  updateProgress();
  speak("Nice work. Try one more sentence.", 0.86);
});
document.querySelector("#conversationNextBtn").addEventListener("click", () => {
  conversationIndex += 1;
  renderConversation();
});
document.querySelector("#freeTalkBtn").addEventListener("click", buildFreeTalk);
document.querySelector("#freeTalkSpeakBtn").addEventListener("click", () => {
  speak(freeTalkEnglish.textContent, 0.86);
});
document.querySelector("#voiceInputBtn").addEventListener("click", startVoiceInput);
document.querySelector("#copyCoachPromptBtn").addEventListener("click", copyCoachPrompt);
document.querySelector("#aiCoachSendBtn").addEventListener("click", sendToAiCoach);
document.querySelector("#aiCoachListenBtn").addEventListener("click", () => {
  speak(aiCoachReply.textContent, 0.86);
});
document.querySelector("#aiCoachClearBtn").addEventListener("click", () => {
  aiConversation = [];
  localStorage.removeItem("aiConversation");
  aiCoachInput.value = "";
  aiCoachReply.textContent = "Use English first. Japanese words are OK when you get stuck.";
  aiCoachLesson.textContent = "";
  aiCoachMeta.textContent = "";
});
document.querySelector("#freeTalkClearBtn").addEventListener("click", () => {
  freeTalkInput.value = "";
  freeTalkEnglish.textContent = "Type Japanese, then press Translate.";
  freeTalkLesson.textContent = "";
  voiceStatus.textContent = "";
  localStorage.removeItem("freeTalkInput");
});

renderPhrase();
renderQuiz();
renderMistakes();
renderConversation();
freeTalkInput.value = localStorage.getItem("freeTalkInput") || "";
if (freeTalkInput.value) {
  buildFreeTalk();
}
aiApiBaseUrl.value = localStorage.getItem("aiApiBaseUrl") || "";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
updateProgress();
