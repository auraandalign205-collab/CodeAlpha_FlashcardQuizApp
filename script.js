// Base Dummy Starter Storage Array Tracking Elements
let flashcards = [
    { id: 1, question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { id: 2, question: "Which language is used for styling web pages?", answer: "CSS (Cascading Style Sheets)" },
    { id: 3, question: "What is the primary function of a repository in GitHub?", answer: "To store and track history changes of project files." }
];

let currentIndex = 0;
let currentMode = 'add';

// Application Interactive State Sync Hook UI Renderer Engine
function updateAppUI() {
    const quizSection = document.getElementById('quiz-section');
    const emptySection = document.getElementById('empty-section');
    const cardElement = document.getElementById('flashcard');

    cardElement.classList.remove('flipped');

    if (flashcards.length === 0) {
        quizSection.classList.add('hidden');
        emptySection.classList.remove('hidden');
        return;
    }

    quizSection.classList.remove('hidden');
    emptySection.classList.add('hidden');

    document.getElementById('question-text').innerText = flashcards[currentIndex].question;
    document.getElementById('answer-text').innerText = flashcards[currentIndex].answer;
    document.getElementById('progress-index').innerText = `${currentIndex + 1} / ${flashcards.length}`;
    
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').disabled = currentIndex === flashcards.length - 1;
}

// Card Flipping Trigger Execution
function toggleFlip() {
    if(flashcards.length === 0) return;
    document.getElementById('flashcard').classList.toggle('flipped');
}

// Navigation Step Handling Control Elements
function navigateCard(direction) {
    const nextIdx = currentIndex + direction;
    if (nextIdx >= 0 && nextIdx < flashcards.length) {
        currentIndex = nextIdx;
        updateAppUI();
    }
}

// Display Input Forms Panels Dynamic Actions Layouts Hooks
function showForm(mode) {
    currentMode = mode;
    const formSection = document.getElementById('form-section');
    formSection.classList.remove('hidden');
    
    if (mode === 'add') {
        document.getElementById('form-title').innerText = "Add New Flashcard";
        document.getElementById('flashcard-form').reset();
        document.getElementById('card-id').value = "";
    } else if (mode === 'edit') {
        document.getElementById('form-title').innerText = "Edit Current Flashcard";
        const currentCard = flashcards[currentIndex];
        document.getElementById('card-id').value = currentCard.id;
        document.getElementById('form-question').value = currentCard.question;
        document.getElementById('form-answer').value = currentCard.answer;
    }
    formSection.scrollIntoView({ behavior: 'smooth' });
}

function hideForm() {
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('flashcard-form').reset();
}

// Form Operations Core Data Submissions Handlers Engines
function handleFormSubmit(event) {
    event.preventDefault();
    const question = document.getElementById('form-question').value.trim();
    const answer = document.getElementById('form-answer').value.trim();
    
    if (currentMode === 'add') {
        const newCard = {
            id: Date.now(),
            question: question,
            answer: answer
        };
        flashcards.push(newCard);
        currentIndex = flashcards.length - 1;
    } else if (currentMode === 'edit') {
        const id = parseInt(document.getElementById('card-id').value);
        flashcards = flashcards.map(card => card.id === id ? { ...card, question, answer } : card);
    }
    
    hideForm();
    updateAppUI();
}

// Delete Tracking Functional Method Execution Controls
function deleteCard() {
    if (flashcards.length === 0) return;
    
    if (confirm("Are you sure you want to delete this flashcard?")) {
        flashcards.splice(currentIndex, 1);
        
        if (currentIndex >= flashcards.length && currentIndex > 0) {
            currentIndex = flashcards.length - 1;
        }
        updateAppUI();
    }
}

// Core Render Initializing Application Entry Hook
updateAppUI();
