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

renderPhrase();
renderQuiz();
renderMistakes();
renderConversation();
updateProgress();
