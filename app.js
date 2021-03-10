
 const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What house at Hogwarts does Harry Potter belong to?',
      answers: [
        'Gryffindor',
        'Slytherin',
        'Ravenclaw',
        'Hufflepuff'
      ],
      correctAnswer: 'Gryffindor'
    },
    {
      question: 'What position does Harry Potter play on the quidditch team?',
      answers: [
        'Bludger',
        'Keeper',
        'Chaser',
        'Seeker'
      ],
      correctAnswer: 'Seeker'
    },
    {
        question: 'Who is the half-blood prince?',
        answers: [
            'Tom Riddle',
            'Remus Lupin',
            'Severus Snape',
            'Albus Dumbledore'
        ],
        correctAnswer: 'Severus Snape'
    },
    {
        question: 'What item of clothing freed Dobby the House Elf from the Malfoys?',
        answers: [
            'Sock',
            'Shoe',
            'Shirt',
            'Hat'
        ],
        correctAnswer: 'Sock'
    },
    {
        question: 'Who impersonated Mad-Eye Moody as the Defense Against the Dark Arts teacher in the Goblet of Fire',
        answers: [
            'Remus Lupin',
            'Sirius Black',
            'Barty Crouch Jr.',
            'Bellatrix Lestrange'
        ],
        correctAnswer: 'Barty Crouch Jr.'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

//This generates the html for the start quiz screen 

function generateStartQuiz(){
    return `<div class="start-quiz">
              <p>This quiz will test your knowledge of Harry Potter</p>
              <button type="button" id="start">Start Quiz!</button>
           </div>`;
}

//This generates the question number, and the score

function generateQuestionAndScore(){
  return `<ul class ="question-and-score">
            <li class="questionNumber">Question Number: ${store.questionNumber + 1}/${store.questions.length}</li><br>
            <li class="score">Score: ${store.score}/${store.questions.length}</li>
          </ul>`
}

//This generates the html to display one question

function generateQuestion(){
    let questionNumber = store.questions[store.questionNumber];
    return `<form id="question-form" class="question-form">
              <fieldset>
                  <div class="question">
                      <p>${questionNumber.question}</p>
                  </div>
                  <div class="answer">
                      ${generateAnswer()}
                  </div>
                  <button class="submit-hidden" type="submit" id="submit-Answer" required>Submit</button>
                  <button class="hidden" type="button" id="next-Question">Next >>></button>
              </fieldset>
            </form>`
}

//This generates the list of answers for one question

function generateAnswer(){
    const possibleAnswers = store.questions[store.questionNumber].answers;
    let answers = '<div id="answerOptions"></div>';
    let i = 0;

    possibleAnswers.forEach(answer => {
        answers += `
                      <input type="radio" onclick="handleRadioClick()" name="answers" id="answer${i + 1}" value="${answer}">
                      <label for="answer${i + 1}" required> ${answer}</label><br>`; 
                    
    })
    return answers;
}

//This will generate the results screen 

function generateResults(){
    return `<div class="results">
              <form id="js-restart-quiz">
                  <fieldset>
                      <div class ="row">
                          <div class="col-12">
                              <p>You've finished the quiz!</p>
                              <p>Your score is: ${store.score}/${store.questions.length}</p>
                          </div>
                      </div>
                      
                      <div class="col-12">
                          <button type="button" id="restart">Try Again!</button>
                      </div>

                  </fieldset>
              </form>
          </div>`
}

// This generates feedback on if the user got the question right or wrong 

function generateFeedback(answerStatus){
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  let html = '';

  if(answerStatus === 'correct'){
      html= `<div class="feedback">That is correct!</div>`
  } else if(answerStatus === 'incorrect'){
      html =`<div class="feedback">That is incorrect. The correct answer is ${correctAnswer}.</div>`
  }
  return html;
}


/********** RENDER FUNCTION(S) **********/

function render() {
    let html = '';

    if(store.quizStarted === false){
        $('main').html(generateStartQuiz())
        return;
    }
    else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length){
        html = generateQuestionAndScore();
        html += generateQuestion();

        $('main').html(html)
    }
    else {
        $('main').html(generateResults())
    }
    $('#submit-Answer').hide();
    $('#next-Question').hide()
}

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//This function checks if a radio button is checked before showing the submit or next button
function handleRadioClick(){
    $('#submit-Answer').show();
}


//This function will handle the onclick of the click to start button
function handleStartQuiz(){
    $('main').on('click', '#start', event =>{
        store.quizStarted = true;
        render();
    })
}

//This function will handle the onclick of the next button

function handleNextQuestion(){
    $('body').on('click', '#next-Question', event => {
        render();
    })
}

//This function will handle the onclick of the submit button and generate feedback based on if the answer was right or wrong


function handleQuestionSubmit(){
    $('body').on('submit', '#question-form', event => {
        event.preventDefault();
        const questionNumber = store.questions[store.questionNumber];
        let answerOption = $('input[name="answers"]:checked').val();
        let answerContainer = `#answerOptions`

        if(answerOption === questionNumber.correctAnswer){
            store.score++
            $(answerContainer).append(generateFeedback('correct'))
        } else {
            $(answerContainer).append(generateFeedback('incorrect'))
        }
        store.questionNumber++

        
        

        
        $('input[type=radio]').each(() => {
            $('input[type=radio]').attr('disabled', true)
        })
        $('#submit-Answer').hide();
        $('#next-Question').show()
        
    })
}

//This function will set the page back to the start so users can retake quiz

function retakeQuiz(){
    store.quizStarted = false;
    store.questionNumber = 0; 
    store.score = 0;

}

//This function handles the onclick of the try again button

function handleRetakeQuiz(){
    $('body').on('click', '#restart', event => {
        retakeQuiz();
        render();
    })
}


function handleQuiz(){
  render();
  handleStartQuiz();
  handleNextQuestion();
  handleQuestionSubmit();
  handleRetakeQuiz();
}

$(handleQuiz)
