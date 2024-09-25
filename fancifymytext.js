function showAlert() {
    document.getElementById("userText").style.fontSize = "4em";
}

function fancy(){
    document.getElementById("userText").style.fontWeight = "bold";
    document.getElementById("userText").style.color = "blue";
    document.getElementById("userText").style.textDecoration = "underline";
}

function boring(){
    document.getElementById("userText").style.fontWeight = "normal";
    document.getElementById("userText").style.color = "black";
    document.getElementById("userText").style.textDecoration = "none";
}

function uppercase() {
    const textArea = document.getElementById("userText");
    let text = textArea.value;

    // Splits the user's text into seperate sentences using the period
    const sentences = text.split('.');

    // iterates through each sentence
    for (let i = 0; i < sentences.length; i++) {

        let newSentence = sentences[i].trim();

        if (newSentence) {
            // Splits the sentence into seperate words when there is a space
            const words = newSentence.split(' ');

            // Adds "-Moo" suffix to the last word of the sentence
            words[words.length - 1] += '-Moo';

            // Joins the words back together to complete the sentence
            sentences[i] = words.join(' ').toUpperCase();
        }
    }

    // Joins all the sentences together back to normal
    textArea.value = sentences.join('. ') + (sentences.length > 1 ? '.' : '');
}