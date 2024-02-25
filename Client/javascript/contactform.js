const submitButton = document.getElementById('contact-form__submit');
const captchaIcon = document.getElementById('captcha-icon');
const submitMessage = document.getElementById('submit-message');
const loadIcon = document.getElementById('load-icon-contact-form');
let disabledValidate = true;
let disabledInput = true;
let phoneSubmitDisabled = true;
let emailSubmitDisabled = true;
let captchaValid = false;

const validateEmail = (email) => {
    if(email.match(/^\S+@\S+\.\S{2,}$/)){
        return true;
    }
    return false;
};
const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.match(/^((\+[0-9]{2}|0)[0-9]{9,20})|(([0][0-9]{1}-)[0-9]{8,20})$/)) {
        return true;
    }
    return false;
}
function replaceTags(input){
     input = input.replaceAll("<script>", " ")
                .replaceAll("</script>", " ")
                .replaceAll('= "hidden"', " ")
                .replaceAll('="hidden"', " ")
                .replaceAll("color: white", " ")
    input = input.trim();
    return input;
}

document.getElementById('catpcha-form').addEventListener('submit', async(event) => {
    event.preventDefault();
    let data = {};
    let inputCatpchaValue = document.getElementById('skill-name-input').value;
    inputCatpchaValue = replaceTags(inputCatpchaValue);
    data["Value"] = inputCatpchaValue;
    await axios.post("https://localhost:7184/api/Captcha", data, {
        "Content-Tye": "application/json"
    })
    .then(res => {
        captchaValid = true;
        captchaIcon.src = "images/check.png";
    })
    .catch(err => { 
        catpchaValid = false;
        captchaIcon.src = "images/cross.png";
    });

})
function setWrongInputBorder(inputId){
    document.getElementById(inputId).classList.add('contact-form__input--red');
}
function checkInput(inputName, inputValue, fieldMaxLength){
    if(inputValue.length > fieldMaxLength || inputValue.length === 0){
        setWrongInputBorder('contact-form__' + inputName);
        return true;
    }
    return false;
}
function makeGreenText(responseMessage){
    submitMessage.textContent = responseMessage;
    submitMessage.classList.add('color-green');
    submitMessage.classList.remove('color-red');
}
function makeRedText(responseMessage){
    submitMessage.textContent = responseMessage;
    submitMessage.classList.remove('color-green');
    submitMessage.classList.add('color-red');
}

async function sendMail(event, data, inputs){
        loadIcon.style.display = "block";
        submitButton.style.display = "none";
        await axios.post("https://localhost:7184/api/MailContact", data, {
            "Content-Tye": "application/json"
        })
        .then(res => {
            makeGreenText("Het is gelukt");
            event.target.reset();
            for(let i = 0; i < inputs.length-1; i++){
                document.getElementById('char-count__' + inputs[i].name).textContent =  "0/" + getMaxLengthFromInputValue(inputs[i].name);
            }
            submitButton.disabled = true;
            captchaIcon.src = "images/verified.png";
            captchaValid = false;
            document.getElementById('skill-name-input').value = "";


        })
        .catch(err => { 
            makeRedText("Het is niet gelukt");
        });
        loadIcon.style.display = "none";
        submitButton.style.display = "block";
}

document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    let inputs = event.target.elements;
    let wrongInput = false;
    let data = {};
    for(let i = 0; i < inputs.length-1; i++){
        let input = inputs[i];
        let inputValue = inputs[i].value;
        inputValue = replaceTags(inputValue);
        data[input.name] = inputValue;
        if(checkInput(input.name, inputValue, getMaxLengthFromInputValue(input.name))){
            wrongInput = true;
        }
    }

    if(!wrongInput && captchaValid) sendMail(event, data, inputs);
    else if(!captchaValid)          makeRedText("Captcha is niet gelukt")
    else                            makeRedText("1 of meerdere foute input velden")
});

function checkEmptyFields(){
    let formInputs = document.getElementById('contact-form').elements;
    let disableSubmit = false;
    for(let i = 0; i < formInputs.length-1; i++){
        let input = formInputs[i];
        if(input.value.length <= 0) {
            disableSubmit = true;
            break;
        }
    }
    return disableSubmit;
}
function getMaxLengthFromInputValue(name){
    let length = 0;
    if(name === "FirstName" || name === "LastName") length = 60;
    else if(name === "Email") length = 80;
    else if(name === "PhoneNumber") length = 20;
    else if(name === "Subject") length = 200;
    else if(name === "Message") length = 600;
    return length;
}
function toggleSubmitForm(){
    if(!disabledInput && !phoneSubmitDisabled && !emailSubmitDisabled) submitButton.disabled = false;
    else submitButton.disabled = true;   
};
function addInputEventListener() {  
    let formInputs = document.getElementById('contact-form').elements;
    for(let i = 0; i < formInputs.length-1; i++){
        let input = formInputs[i];
        input.addEventListener('keyup', (e) => {
            document.getElementById('char-count__' + input.name).textContent = (input.value.length) + "/" + getMaxLengthFromInputValue(input.name);
            if(checkEmptyFields()) disabledInput = true;
            else disabledInput = false;
            if(input.name === "PhoneNumber"){
                if(validatePhoneNumber(input.value)){
                    document.getElementById('contact-form__PhoneNumber').classList.remove('contact-form__input--red');
                    phoneSubmitDisabled = false;
                }
                else{
                    document.getElementById('contact-form__PhoneNumber').classList.add('contact-form__input--red');
                    phoneSubmitDisabled = true;
                }
            }
            else if(input.name === "Email"){
                if(validateEmail(input.value)){
                    document.getElementById('contact-form__Email').classList.remove('contact-form__input--red');
                    emailSubmitDisabled = false;
                }
                else{
                    document.getElementById('contact-form__Email').classList.add('contact-form__input--red');
                    emailSubmitDisabled = true;
                }
            }
            if(input.name !== "Email" && input.name !== "PhoneNumber"){
                input.classList.remove('contact-form__input--red');
            }
            document.getElementById('submit-message').textContent = "";
            toggleSubmitForm();
        });
    }
}
addInputEventListener();




