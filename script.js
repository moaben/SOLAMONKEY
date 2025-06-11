// الصوتيات
const correctSound = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');
const wrongSound = new Audio('https://actions.google.com/sounds/v1/cartoon/boing.ogg');

// الأسئلة موزعة حسب المستوى
const questions = {
  beginner: [
    { q: "What does HODL stand for?", a: ["Hold On for Dear Life", "Help Or Dump Later", "High Order Digital Ledger"], answer: 0 },
    { q: "Which crypto is known as digital gold?", a: ["Ethereum", "Bitcoin", "Ripple"], answer: 1 },
    { q: "What is a blockchain?", a: ["A spreadsheet", "A digital ledger", "A programming language"], answer: 1 },
    { q: "What does DeFi mean?", a: ["Definitely Finance", "Decentralized Finance", "Digital Finality"], answer: 1 },
    { q: "What is Ethereum primarily used for?", a: ["Smart Contracts", "Social Media", "Cloud Storage"], answer: 0 },
    { q: "What is a wallet address?", a: ["Your private key", "Public identifier for transactions", "Password"], answer: 1 },
    { q: "What does NFT stand for?", a: ["Non-Fungible Token", "New Financial Token", "Network File Transfer"], answer: 0 },
    { q: "Which coin uses the symbol ETH?", a: ["Ethereum", "Bitcoin", "Litecoin"], answer: 0 },
    { q: "What is mining?", a: ["Creating new blocks", "Sending coins", "Storing data"], answer: 0 },
    { q: "What is a smart contract?", a: ["Self-executing contract", "A type of wallet", "A crypto exchange"], answer: 0 }
  ],
  intermediate: [
    { q: "What is gas in Ethereum?", a: ["Transaction fee", "Mining equipment", "Smartphone app"], answer: 0 },
    { q: "What is a DAO?", a: ["Digital Authorized Organization", "Decentralized Autonomous Organization", "Distributed Access Object"], answer: 1 },
    { q: "Which is a Layer 2 on Ethereum?", a: ["Polygon", "Tron", "Binance Smart Chain"], answer: 0 },
    { q: "What is yield farming?", a: ["Mining coins", "Earning interest by lending crypto", "Buying digital art"], answer: 1 },
    { q: "What is a liquidity pool?", a: ["Crypto wallet", "A smart contract with token reserves", "Blockchain explorer"], answer: 1 },
    { q: "What does staking mean?", a: ["Locking coins to support network", "Selling coins", "Mining new coins"], answer: 0 },
    { q: "What is a private key?", a: ["Public wallet address", "Secret code to access wallet", "Type of cryptocurrency"], answer: 1 },
    { q: "What is a hard fork?", a: ["Backward compatible update", "Non-backward compatible update", "Bug fix"], answer: 1 },
    { q: "What is the function of a hash in blockchain?", a: ["Encrypts data", "Links blocks securely", "Stores coins"], answer: 1 },
    { q: "What is a dApp?", a: ["Decentralized Application", "Data Application", "Digital Approval"], answer: 0 }
  ],
  advanced: [
    { q: "What consensus mechanism does Bitcoin use?", a: ["Proof of Stake", "Proof of Work", "Delegated Proof of Stake"], answer: 1 },
    { q: "What does '51% attack' mean?", a: ["Majority hash power takeover", "Government ban", "Smart contract bug"], answer: 0 },
    { q: "What is sharding in blockchain?", a: ["Splitting blockchain into parts", "Encrypting transactions", "New token launch"], answer: 0 },
    { q: "Which protocol is used by Ethereum 2.0?", a: ["Proof of Work", "Proof of Stake", "Proof of Authority"], answer: 1 },
    { q: "What is the Lightning Network?", a: ["Bitcoin's Layer 2 for fast payments", "Ethereum scaling solution", "A new coin"], answer: 0 },
    { q: "What is a Merkle tree?", a: ["A cryptographic data structure", "A type of wallet", "A consensus protocol"], answer: 0 },
    { q: "What does ERC-20 refer to?", a: ["Ethereum token standard", "Bitcoin mining method", "Wallet type"], answer: 0 },
    { q: "What is slashing in PoS?", a: ["Punishment for bad behavior", "Bonus reward", "Forking the chain"], answer: 0 },
    { q: "What does 'gas limit' mean in Ethereum?", a: ["Max gas user willing to pay", "Mining difficulty", "Network speed"], answer: 0 },
    { q: "What is a zk-SNARK?", a: ["Zero-knowledge proof", "Token swap", "Smart contract error"], answer: 0 }
  ]
};

const startDiv = document.getElementById('start');
const quizDiv = document.getElementById('quiz');
const endDiv = document.getElementById('end');

const qText = document.getElementById('q-text');
const choicesDiv = document.getElementById('choices');
const currentQSpan = document.getElementById('current-q');
const totalQSpan = document.getElementById('total-q');
const finalScoreP = document.getElementById('final-score');

const playAgainBtn = document.getElementById('play-again');
const levelButtons = document.querySelectorAll('.level-btn');

let currentLevel = 'beginner';
let questionSet = [];
let currentQuestionIndex = 0;
let score = 0;

levelButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentLevel = btn.getAttribute('data-level');
    startQuiz();
  });
});

playAgainBtn.addEventListener('click', () => {
  startDiv.classList.remove('hidden');
  endDiv.classList.add('hidden');
});

function startQuiz() {
  startDiv.classList.add('hidden');
  endDiv.classList.add('hidden');
  quizDiv.classList.remove('hidden');

  questionSet = [...questions[currentLevel]];
  shuffleArray(questionSet);

  // For demo, limit questions to 10 or all if fewer
  if (questionSet.length > 10) {
    questionSet = questionSet.slice(0, 10);
  }

  currentQuestionIndex = 0;
  score = 0;
  totalQSpan.textContent = questionSet.length;
  showQuestion();
}

function showQuestion() {
  clearChoices();
  const currentQ = questionSet[currentQuestionIndex];
  qText.textContent = currentQ.q;
  currentQ.a.forEach((choiceText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choiceText;
    btn.addEventListener('click', () => selectAnswer(idx));
    choicesDiv.appendChild(btn);
  });
  currentQSpan.textContent = currentQuestionIndex + 1;
}

function selectAnswer(selectedIdx) {
  const currentQ = questionSet[currentQuestionIndex];
  const buttons = choicesDiv.querySelectorAll('button');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === currentQ.answer) btn.classList.add('correct');
    if (idx === selectedIdx && idx !== currentQ.answer) btn.classList.add('wrong');
  });

  if (selectedIdx === currentQ.answer) {
    score++;
    correctSound.play();
  } else {
    wrongSound.play();
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionSet.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1500);
}

function clearChoices() {
  choicesDiv.innerHTML = '';
}

function endQuiz() {
  quizDiv.classList.add('hidden');
  endDiv.classList.remove('hidden');
  finalScoreP.textContent = `Your Score: ${score} / ${questionSet.length} (${Math.round((score / questionSet.length) * 100)}%)`;
}

// Fisher–Yates Shuffle
function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
