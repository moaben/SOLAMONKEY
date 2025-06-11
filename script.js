const questions = [
  {
    question: "What does 'HODL' mean in crypto?",
    choices: ["Hold On for Dear Life", "Hack Or Dump Later", "High Order DeFi Ledger", "Halt or Delay Liquidity"],
    answer: "Hold On for Dear Life"
  },
  {
    question: "Which blockchain introduced smart contracts?",
    choices: ["Bitcoin", "Ethereum", "Solana", "Ripple"],
    answer: "Ethereum"
  },
  {
    question: "What is a crypto wallet used for?",
    choices: ["Mining coins", "Trading NFTs", "Storing private keys", "Watching charts"],
    answer: "Storing private keys"
  },
  {
    question: "Which is a Layer 2 solution for Ethereum?",
    choices: ["Polygon", "Avalanche", "Cardano", "Litecoin"],
    answer: "Polygon"
  },
  {
    question: "What does 'DeFi' stand for?",
    choices: ["Decentralized Finance", "Defined Fiat", "Digital File", "Decentral File"],
    answer: "Decentralized Finance"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.classList.add("choice-btn");
    btn.onclick = () => checkAnswer(choice);
    choicesEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }

  scoreEl.textContent = `Score: ${score}`;
}

function endQuiz() {
  questionEl.textContent = "Quiz completed!";
  choicesEl.innerHTML = "";
  nextBtn.style.display = "none";
}

nextBtn.addEventListener("click", showQuestion);

showQuestion();
