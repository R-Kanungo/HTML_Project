// Array of phrases we want to type out
const phrases = [
    "HTML & CSS.",
    "PostgreSQL.",
    "SQL Server.",
    "clean code."
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

const typewriterElement = document.getElementById('typewriter');

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Remove a letter
        typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        // Add a letter
        typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }

    // Determine typing speed (faster when deleting)
    let typingSpeed = isDeleting ? 50 : 100;

    // If word is complete, wait, then start deleting
    if (!isDeleting && letterIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at the end of the word
        isDeleting = true;
    } 
    // If word is completely deleted, move to the next phrase
    else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next word
    }

    // Call the function again after the calculated delay
    setTimeout(type, typingSpeed);
}

// Start the typing effect when the page loads
document.addEventListener("DOMContentLoaded", () => {
    type();
});

