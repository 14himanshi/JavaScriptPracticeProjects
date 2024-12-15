document.addEventListener('DOMContentLoaded', () => {

    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const nextBtn = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score");

    const allQuestions = [
        { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "Which planet is known as the Red Planet?", choices: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "Who wrote 'Hamlet'?", choices: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"], answer: "William Shakespeare" },
        { question: "What is the largest ocean on Earth?", choices: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
        { question: "What is the capital of Japan?", choices: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: "Tokyo" },
        { question: "Which animal is known as the King of the Jungle?", choices: ["Lion", "Tiger", "Elephant", "Bear"], answer: "Lion" },
        { question: "Who discovered gravity?", choices: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], answer: "Isaac Newton" },
        { question: "Which language is primarily used for web development?", choices: ["Python", "Java", "JavaScript", "Ruby"], answer: "JavaScript" },
        { question: "What is the smallest country in the world?", choices: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: "Vatican City" },
        { question: "Which instrument is used to measure temperature?", choices: ["Barometer", "Thermometer", "Odometer", "Voltmeter"], answer: "Thermometer" },
        { question: "Who painted the Mona Lisa?", choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },
        { question: "In which continent is the Sahara Desert located?", choices: ["Asia", "Africa", "South America", "Australia"], answer: "Africa" },
        { question: "Which planet is closest to the Sun?", choices: ["Earth", "Venus", "Mercury", "Mars"], answer: "Mercury" },
        { question: "What is the capital of Italy?", choices: ["Rome", "Paris", "Berlin", "Madrid"], answer: "Rome" },
        { question: "Who invented the telephone?", choices: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Albert Einstein"], answer: "Alexander Graham Bell" },
        { question: "What is the chemical symbol for water?", choices: ["O2", "H2O", "CO2", "NaCl"], answer: "H2O" },
        { question: "What is the largest animal on Earth?", choices: ["Elephant", "Blue Whale", "Shark", "Giraffe"], answer: "Blue Whale" },
        { question: "Who wrote '1984'?", choices: ["George Orwell", "Aldous Huxley", "H.G. Wells", "J.R.R. Tolkien"], answer: "George Orwell" },
        { question: "What is the hardest natural substance on Earth?", choices: ["Gold", "Diamond", "Iron", "Platinum"], answer: "Diamond" },
        { question: "What is the square root of 64?", choices: ["6", "7", "8", "9"], answer: "8" },
        { question: "Which organ is responsible for pumping blood?", choices: ["Liver", "Lungs", "Heart", "Kidney"], answer: "Heart" },
        { question: "Which country is the Great Barrier Reef located in?", choices: ["Australia", "USA", "Mexico", "Brazil"], answer: "Australia" },
        { question: "Which element has the chemical symbol 'O'?", choices: ["Oxygen", "Osmium", "Ozone", "Oxygenium"], answer: "Oxygen" },
        { question: "Who was the first man to walk on the Moon?", choices: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], answer: "Neil Armstrong" },
        // Add more questions here (total 50+ questions)
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedQuestions = [];

    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    function startQuiz() {
        startBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');

        selectedQuestions = getRandomQuestions(3);  // Select new set on each refresh
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function getRandomQuestions(num) {
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num); // Pick 3 random questions
    }

    function showQuestion() {
        nextBtn.classList.add('hidden');
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;

        choicesList.innerHTML = "";
        currentQuestion.choices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                if (choice === currentQuestion.answer) {
                    li.classList.add('answer');
                    score++;
                } else {
                    li.classList.add('wrong');
                }
                disableChoices();
                nextBtn.classList.remove('hidden');
            });
            choicesList.appendChild(li);
        });
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${selectedQuestions.length}`;
    }

    function disableChoices() {
        const choices = choicesList.children;
        for (let i = 0; i < choices.length; i++) {
            const clone = choices[i].cloneNode(true);
            choicesList.replaceChild(clone, choices[i]);
        }
    }

    restartBtn.addEventListener('click', startQuiz);

});
