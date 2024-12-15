document.addEventListener('DOMContentLoaded', () => {

    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const nextBtn = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score");

    const questions = [
        {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
        },
        {
          question: "Who wrote 'Hamlet'?",
          choices: [
            "Charles Dickens",
            "Jane Austen",
            "William Shakespeare",
            "Mark Twain",
          ],
          answer: "William Shakespeare",
        },
      ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz)

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion()
        }
        else {
            showResult();
        }
    });

    function startQuiz(){
        startBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
    };

    function showQuestion(){
        nextBtn.classList.add('hidden');
        console.log(currentQuestionIndex)
        questionText.textContent = "";
        questionText.textContent = questions[currentQuestionIndex].question;
        const ans = questions[currentQuestionIndex].answer;

        choicesList.innerHTML = ""; // clear previous choices
        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                if(choice === ans){
                    li.classList.add('answer')
                    score++;
                } else {
                    li.classList.add('wrong')
                }
                disableChoices()
                nextBtn.classList.remove('hidden');
            })
            choicesList.appendChild(li)
        });
    };


    function showResult(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    };

    function disableChoices() {
        // Get all the list items and remove their click events
        const choices = choicesList.children;
        for (let i = 0; i < choices.length; i++) {
            // Clone the element to remove all event listeners
            const clone = choices[i].cloneNode(true);
            choicesList.replaceChild(clone, choices[i]);

        }
    }

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        startQuiz();
    })


    
    

})

// this is a solution but u can not scale it further, you can but it will be very jumbled
