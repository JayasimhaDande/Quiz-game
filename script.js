// script.js
let quizze = []; // Store all quizzes
let currentQuiz = null;
let currentQuestionIndex = 0;
let userScore = 0;

function showHomePage() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Welcome to the Online Quiz Maker!</h2>
        <p>Create your own quiz or take quizzes created by others.</p>
    `;
}
// Example quizzes
const quizzes = [
  {
      title: "General Knowledge Quiz",
      questions: [
          {
              question: "What is the capital of France?",
              options: ["Berlin", "Madrid", "Paris", "Lisbon"],
              correct: 2, // Paris
          },
          {
              question: "Who wrote 'Hamlet'?",
              options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
              correct: 1, // William Shakespeare
          },
      ],
  },
  {
      title: "Science Quiz",
      questions: [
          {
              question: "What planet is known as the Red Planet?",
              options: ["Earth", "Mars", "Jupiter", "Venus"],
              correct: 1, // Mars
          },
          {
              question: "What is the chemical symbol for water?",
              options: ["O2", "H2O", "CO2", "HO2"],
              correct: 1, // H2O
          },
      ],
  },
  {
      title: "History Quiz",
      questions: [
          {
              question: "Who was the first President of the United States?",
              options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
              correct: 1, // George Washington
          },
          {
              question: "In which year did World War II end?",
              options: ["1942", "1945", "1948", "1950"],
              correct: 1, // 1945
          },
      ],
  },
];

// Display quiz list
function showQuizListingPage() {
  const main = document.getElementById("main-content");
  main.innerHTML = `
      <h2>Available Quizzes</h2>
      <div class="quiz-list">
          ${quizzes
              .map(
                  (quiz, index) => `
              <button onclick="startQuiz(${index})">${quiz.title}</button>
          `
              )
              .join("")}
      </div>
  `;
}

// Start a quiz
function startQuiz(quizIndex) {
  const quiz = quizzes[quizIndex];
  let currentQuestion = 0;
  let score = 0;

  function loadQuestion() {
      const question = quiz.questions[currentQuestion];
      document.getElementById("main-content").innerHTML = `
          <h2>${quiz.title}</h2>
          <p><strong>Question ${currentQuestion + 1} of ${quiz.questions.length}</strong></p>
          <p>${question.question}</p>
          <div class="quiz-options">
              ${question.options
                  .map(
                      (option, index) => `
                  <div class="quiz-option">
                      <input type="radio" name="option" id="option${index}" value="${index}">
                      <label for="option${index}">${option}</label>
                  </div>
              `
                  )
                  .join("")}
          </div>
          <button onclick="submitAnswer()">Submit Answer</button>
      `;
  }

  function submitAnswer() {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (!selectedOption) {
          alert("Please select an answer!");
          return;
      }

      const answerIndex = parseInt(selectedOption.value);
      if (answerIndex === quiz.questions[currentQuestion].correct) {
          score++;
      }

      currentQuestion++;
      if (currentQuestion < quiz.questions.length) {
          loadQuestion();
      } else {
          showResults();
      }
  }

  function showResults() {
      document.getElementById("main-content").innerHTML = `
          <h2>${quiz.title} - Results</h2>
          <p>Your score: ${score} out of ${quiz.questions.length}</p>
          <p>Correct Answers:</p>
          <ul>
              ${quiz.questions
                  .map(
                      (q, i) => `
                  <li>${q.question} - <strong>${q.options[q.correct]}</strong></li>
              `
                  )
                  .join("")}
          </ul>
          <button onclick="showQuizListingPage()">Back to Quiz List</button>
      `;
  }

  loadQuestion();
}

function showHomePage() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="home-container">
            <h2>Welcome to the Online Quiz Maker!</h2>
            <p>Create your own quizzes or challenge yourself with quizzes created by others. It's fun, easy, and educational!</p>
            <div class="home-buttons">
                <button onclick="showQuizCreationPage()">Create a Quiz</button>
                <button onclick="showQuizListingPage()">Take a Quiz</button>
           
    `;
}

function showQuizCreationPage() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
      <h2>Create Your Quiz</h2>
      <form id="quiz-form">
          <label for="quiz-title">Quiz Title:</label>
          <input type="text" id="quiz-title" placeholder="Enter your quiz title" required>
          
          <div id="questions-container">
              <!-- Questions will be added here dynamically -->
          </div>
          
          <button type="button" onclick="addQuestion()">Add Question</button>
          <button type="submit">Save Quiz</button>
      </form>
  `;
  
  const form = document.getElementById('quiz-form');
  form.onsubmit = saveQuiz;
}

let createdQuizzes = []; // Store created quizzes
function addQuestion() {
  const questionsContainer = document.getElementById('questions-container');
  const questionIndex = questionsContainer.childElementCount;

  const questionHTML = `
      <div class="question-block">
          <label for="question-${questionIndex}">Question ${questionIndex + 1}:</label>
          <input type="text" id="question-${questionIndex}" placeholder="Enter your question" required>

          <div class="options">
              <label for="option-a-${questionIndex}">Option A:</label>
              <input type="text" id="option-a-${questionIndex}" placeholder="Enter option A" required>

              <label for="option-b-${questionIndex}">Option B:</label>
              <input type="text" id="option-b-${questionIndex}" placeholder="Enter option B" required>

              <label for="option-c-${questionIndex}">Option C:</label>
              <input type="text" id="option-c-${questionIndex}" placeholder="Enter option C" required>

              <label for="option-d-${questionIndex}">Option D:</label>
              <input type="text" id="option-d-${questionIndex}" placeholder="Enter option D" required>
          </div>

          <label for="correct-option-${questionIndex}">Correct Option:</label>
          <select id="correct-option-${questionIndex}" required>
              <option value="0">A</option>
              <option value="1">B</option>
              <option value="2">C</option>
              <option value="3">D</option>
          </select>
      </div>
  `;
  
  questionsContainer.insertAdjacentHTML('beforeend', questionHTML);
}

function saveQuiz(event) {
  event.preventDefault();

  const title = document.getElementById('quiz-title').value.trim();
  const questionBlocks = document.querySelectorAll('.question-block');

  const questions = Array.from(questionBlocks).map((block, index) => {
      const questionText = document.getElementById(`question-${index}`).value.trim();
      const options = [
          document.getElementById(`option-a-${index}`).value.trim(),
          document.getElementById(`option-b-${index}`).value.trim(),
          document.getElementById(`option-c-${index}`).value.trim(),
          document.getElementById(`option-d-${index}`).value.trim(),
      ];
      const correct = parseInt(document.getElementById(`correct-option-${index}`).value);
      
      return { question: questionText, options, correct };
  });

  const newQuiz = { title, questions };
  createdQuizzes.push(newQuiz);

  alert("Quiz saved successfully!");
  showQuizListingPage();
}


function handleQuizCreation(event) {
    event.preventDefault();
    const title = document.getElementById('quiz-title').value;
    const rawQuestions = document.getElementById('quiz-questions').value;

    const questions = rawQuestions.split('\n').map(line => {
        const parts = line.split('|');
        return {
            question: parts[0],
            options: parts.slice(1, 5),
            correctAnswer: parts[5]
        };
    });

    quizzes.push({ title, questions });
    alert('Quiz Created Successfully!');
    showHomePage();
}

function showQuizListingPage() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Available Quizzes</h2>
        <div class="quiz-list">
            ${quizzes.map((quiz, index) => `
                <button onclick="startQuiz(${index})">${quiz.title}</button>
            `).join('')}
        </div>
    `;
}

function startQuiz(index) {
    currentQuiz = quizzes[index];
    currentQuestionIndex = 0;
    userScore = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuiz.questions.length) {
        showResults();
        return;
    }

    const question = currentQuiz.questions[currentQuestionIndex];
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Question ${currentQuestionIndex + 1}</h2>
        <p>${question.question}</p>
        ${question.options.map((option, i) => `
            <div>
                <input type="radio" id="option-${i}" name="quiz-option" value="${option}">
                <label for="option-${i}">${option}</label>
            </div>
        `).join('')}
        <button onclick="submitAnswer()">Submit Answer</button>
    `;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    const isCorrect = selectedOption.value === currentQuiz.questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) userScore++;
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${userScore} / ${currentQuiz.questions.length}</p>
        <button onclick="showQuizListingPage()">Back to Quizzes</button>
    `;
}

// Initial page load
showHomePage();
