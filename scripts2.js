let currentQuestionIndex = 0;
const questions = [
    { text: "¿Cuántas personas vivís en casa?", icon: "fas fa-users", type: "number", min: 1 },
    { text: "¿Con qué frecuencia te duchas a la semana?", icon: "fas fa-shower", type: "number", min: 0 },
    { text: "¿Cuánto tardas en ducharte? (minutos)", icon: "fas fa-clock", type: "number", min: 0 },
    { text: "¿Con qué frecuencia te bañas a la semana?", icon: "fas fa-bath", type: "number", min: 0 },
    { text: "¿Cuántas veces al día te lavas los dientes?", icon: "fas fa-tooth", type: "number", min: 0 },
    { text: "¿Cuántas veces al día descargas la cisterna del inodoro aproximadamente?", icon: "fas fa-toilet", type: "number", min: 0 },
    { text: "¿Cuántas veces al día te lavas las manos?", icon: "fas fa-hands-wash", type: "number", min: 0 },
    { text: "¿Cuántas veces al día te lavas la cara?", icon: "fas fa-smile", type: "number", min: 0 },
    { text: "¿Cuánta agua del grifo bebes al día? (litros)", icon: "fas fa-glass-water", type: "number", min: 0, step: 0.1 },
    { text: "¿Cuántos litros de agua utilizas para cocinar al día?", icon: "fas fa-utensils", type: "number", min: 0, step: 0.1 },
    { text: "¿Con qué frecuencia utilizas la lavadora a la semana?", icon: "fas fa-tshirt", type: "number", min: 0 },
    { text: "¿Con qué frecuencia utilizas el lavavajillas a la semana?", icon: "fas fa-dishwasher", type: "number", min: 0 },
    { text: "¿Cuántas veces al día lavas los platos a mano?", icon: "fas fa-hand-holding-water", type: "number", min: 0 },
    { text: "¿Cuántas veces a la semana limpias la casa?", icon: "fas fa-broom", type: "number", min: 0 },
    { text: "¿Cuántos cubos de agua utilizas para la limpieza?", icon: "fas fa-bucket", type: "number", min: 0 }
];

const answers = {};

function nextQuestion() {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value;

    if (answer === '') {
        alert('Por favor, responde la pregunta.');
        return;
    }

    const questionKey = `q${currentQuestionIndex}`;
    answers[questionKey] = answer;

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        calculateConsumption(); // Llama a la función para calcular el consumo
    }
}

function displayQuestion(index) {
    const questionContainer = document.getElementById('question');
    const nextButton = document.getElementById('nextButton');

    if (index < questions.length) {
        const question = questions[index];
        questionContainer.innerHTML = `
            <label for="answerInput"><i class="${question.icon} fa-lg"></i> ${question.text}</label>
            <input type="${question.type}" id="answerInput" name="answerInput" ${question.min !== undefined ? `min="${question.min}"` : ''} ${question.step !== undefined ? `step="${question.step}"` : ''} required>
        `;

        if (index === questions.length - 1) {
            nextButton.innerText = 'Calcular Consumo';
        } else {
            nextButton.innerText = 'Siguiente';
        }
    }
}

function calculateConsumption() {
    let totalConsumption = 0;

    // Recorremos todas las respuestas
    for (let i = 0; i < questions.length; i++) {
        const questionKey = `q${i}`;
        const answer = answers[questionKey];

        // Sumamos las respuestas que representan consumo de agua
        if (!isNaN(answer)) {
            totalConsumption += parseFloat(answer);
        }
    }

    // Ocultamos el contenedor de preguntas
    document.getElementById('questionContainer').style.display = 'none';

    // Mostramos el resultado
    displayResults(totalConsumption);
}

function displayResults(totalConsumption) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'block';

    let message;

    // Determinamos el nivel de consumo de acuerdo al total
    if (totalConsumption < 100) {
        message = '¡Felicidades! Tienes un consumo bajo de agua.';
    } else if (totalConsumption >= 100 && totalConsumption <= 200) {
        message = 'Tu consumo de agua es normal.';
    } else {
        message = 'Advertencia: Tu consumo de agua es alto. Considera reducirlo.';
    }

    resultsContainer.innerHTML = `<p>Total de consumo de agua: ${totalConsumption.toFixed(2)} litros</p><p>${message}</p>`;
}

// Inicializamos la primera pregunta
displayQuestion(currentQuestionIndex);
