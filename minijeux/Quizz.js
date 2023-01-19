import React, { useState } from 'react';

function QuizApp() {
    const [questions] = useState([
        {
            text: 'Qui est Samuel Paty ?',
            choices: ['Un footballeur', 'Un acteur célèbre', 'Un enseignant français'],
            correctAnswer: 'Un enseignant français'
        },
        {
            text: 'Quel était son métier ?',
            choices: ['Médecin', 'Professeur', 'Avocat'],
            correctAnswer: 'Professeur'
        },
        {
            text: 'Où enseignait-il ?',
            choices: ['Dans un lycée à Paris', 'Dans un collège à Conflans-Sainte-Honorine', 'Dans une école primaire à Nice'],
            correctAnswer: 'Dans un collège à Conflans-Sainte-Honorine'
        },
        {
            text: 'Quelle matière enseignait-il?',
            choices: ['Mathématiques', 'Français', 'Histoire'],
            correctAnswer: 'Histoire'
        },
        {
            text: 'Quand est-il décédé?',
            choices: ['Le 16 octobre 2020', 'Le 1er septembre 2020', 'Le 13 octobre 2020'],
            correctAnswer: 'Le 16 octobre 2020'
        },
        {
            text: 'Comment est-il décédé ?',
            choices: ['D\'un accident de voiture', 'D\'un cancer', 'D\'un acte terroriste'],
            correctAnswer: 'D\'un acte terroriste'
        },
        {
            text: 'Qui est responsable de son décès ?',
            choices: ['Un groupe terroriste', 'Un élève perturbé', 'Un passant en colère'],
            correctAnswer: 'Un élève perturbé'
        },
        {
            text: 'Où a eu lieu la cérémonie d\'hommage national?',
            choices: ['Dans la cour de l\'Elysée', 'Dans la Sorbonne', 'Dans la cathédrale Notre-Dame de Paris'],
            correctAnswer: 'Dans la Sorbonne'
        },
    ]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    function handleAnswer(e) {
        e.currentTarget.classList.add('active');
        const allElements = document.getElementsByClassName(e.currentTarget.className);
        for (let i = 0; i < allElements.length; i++) {
            if (allElements[i] !== e.currentTarget) {
                allElements[i].classList.remove('active');
            }
        }
        const answer = e.currentTarget.value;
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    }

    function handleNext() {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResults(true);
        }
    }

    function resetQuizz() {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResults(false);
    }

    if (showResults) {
        return (
            <div className='ending'>
                <h1>Résultats</h1>
                <p>{calculateResults(answers, questions)}</p>
                <button className='button' onClick={resetQuizz}>Refaire le quizz</button>
            </div>
        );
    }

    const question = questions[currentQuestion];
    return (
        <div className='quizz'>
            <h1>{question.text}</h1>
            <ul>
                {question.choices.map((choice, index) => (
                    <li key={index}>
                        <button className='button' key={choice} value={choice} onClick={handleAnswer}>
                            {choice}
                        </button>
                    </li>
                ))}
            </ul>

            <button className='button' id='next-button' onClick={handleNext}>Suivant</button>
        </div>
    );
}

function calculateResults(answers, questions) {
    let numCorrect = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === questions[i].correctAnswer) {
            numCorrect++;
        }
    }
    return `Vous avez répondu correctement à ${numCorrect}/${questions.length} questions.`;
}

export default QuizApp;
