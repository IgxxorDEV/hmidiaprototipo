const messages = [];
const messageContainer = document.getElementById("message-container");
const newMessageInput = document.getElementById("new-message");
const departmentSelect = document.getElementById("department");
const fileInput = document.getElementById("file-upload");

let displayTimeout; // Armazena a referência do timeout para controle

function displayMessage(index) {
    if (typeof messages !== 'undefined' && messages.length > 0) {
        const currentMessage = messages[index];

        // Cria um elemento para a mensagem
        const messageElement = document.createElement("div");

        // Adiciona a mensagem ao messageContainer
        if (currentMessage.file) {
            const mediaContent = document.createElement(currentMessage.type === 'image' ? 'img' : 'video');
            mediaContent.src = currentMessage.file;
            mediaContent.alt = 'Mensagem da Empresa';
            mediaContent.style.maxWidth = '100%';
            mediaContent.style.height = 'auto';

            if (currentMessage.type === 'video') {
                mediaContent.controls = true; // Adiciona controles de reprodução para vídeos
                mediaContent.autoplay = true;
            }

            messageElement.appendChild(mediaContent);
        } else {
            messageElement.textContent = `${currentMessage.text} (Departamento: ${currentMessage.department})`;
        }

        // Adiciona a mensagem ao messageContainer
        messageContainer.innerHTML = ""; // Limpa o conteúdo anterior
        messageContainer.appendChild(messageElement);

        // Limpa o timeout anterior, se houver
        if (displayTimeout) {
            clearTimeout(displayTimeout);
        }

        // Agende o próximo displayMessage após a duração adequada
        const duration = currentMessage.type === 'image' ? 10000 : 60000;
        displayTimeout = setTimeout(() => {
            const nextIndex = (index + 1) % messages.length;
            displayMessage(nextIndex);
        }, duration); // Fecha após a duração especificada
    }
}

function addMessage() {
    const newMessageText = newMessageInput.value;
    const selectedDepartment = departmentSelect.value;

    const newMessage = {
        text: newMessageText,
        department: selectedDepartment,
    };

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (isValidFileType(file.type)) {
            newMessage.file = URL.createObjectURL(file);
            newMessage.type = file.type.startsWith("image") ? 'image' : 'video';
        } else {
            alert("Tipo de arquivo não suportado. Por favor, escolha uma imagem ou vídeo.");
            return;
        }
    }

    // Adiciona a nova mensagem ao array
    messages.push(newMessage);

    // Limpa os campos de entrada
    newMessageInput.value = "";
    fileInput.value = "";

    // Se não houver uma mensagem sendo exibida, exibe a última mensagem adicionada
    if (!displayTimeout) {
        const lastIndex = messages.length - 1;
        displayMessage(lastIndex);
    } else {
        // Caso contrário, agende a exibição da próxima mensagem após o intervalo
        const nextIndex = messages.length - 1;
        setTimeout(() => {
            displayMessage(nextIndex);
        }, 10000); // 10 segundos
    }
}

// Função para verificar se o tipo de arquivo é válido
function isValidFileType(fileType) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm", "video/ogg"];
    return allowedTypes.includes(fileType);
}

// Inicializa a exibição com a primeira mensagem (se houver)
if (messages.length > 0) {
    displayMessage(0);
}

// Função para verificar se o tipo de arquivo é válido
function isValidFileType(fileType) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm", "video/ogg"];
    return allowedTypes.includes(fileType);
}

// Inicializa a exibição com a primeira mensagem (se houver)
if (messages.length > 0) {
    displayMessage(0);
}
