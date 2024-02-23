const submitButton = document.getElementById('contact-form__submit');
let disabledValidate = true;
let disabledInput = true;
let phoneSubmitDisabled = true;
let emailSubmitDisabled = true;
const loadIcon = document.getElementById('load-icon-contact-form');

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
               

document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    let captchaResponse = grecaptcha.getResponse();
    console.log(captchaResponse);
    let inputs = event.target.elements;
    let wrongInput = false;
    let data = {};
    for(let i = 0; i < inputs.length-1; i++){
        let inputValue = inputs[i].value;
        let inputType = inputs[i].type
        let inputName = inputs[i].name;
        data[inputName] = inputValue;
        inputValue = replaceTags(inputValue);
        if(inputType === "Email"){
            if(inputValue.length > 80 || inputValue.length <= 0){
                document.getElementById('contact-form__Email').classList.add('contact-form__input--red');
                console.log("Email is too long or empty");
                wrongInput = true;
            }
        }
        else if(inputType === "PhoneNumber"){
            if(inputValue.length > 20 || inputValue.length <= 0){
                document.getElementById('contact-form__PhoneNumber').classList.add('contact-form__input--red');
                console.log("Phone number is too long or empty");
                wrongInput = true;
            }
        }
        else{
            if(inputType === "Message"){
                if(inputValue.length > 600 || inputValue.length <= 0){
                    document.getElementById('contact-form__Message').classList.add('contact-form__input--red');
                    console.log("Message is too long or empty");
                    wrongInput = true;
                }
            }
            else if(inputType === "text"){
                if(inputName === "FirstName"){
                    if(inputValue.length > 60 || inputValue.length <= 0){
                        document.getElementById('contact-form__FirstName').classList.add('contact-form__input--red');
                        console.log("First name is too long or empty");
                        wrongInput = true;
                    }
                }
                else if(inputName === "LastName"){
                    if(inputValue.length > 60 || inputValue.length <= 0){
                        document.getElementById('contact-form__LastName').classList.add('contact-form__input--red');
                        console.log("Last name is too long or empty");
                        wrongInput = true;
                    }
                }
                else if(inputName === "Subject"){
                    if(inputValue.length > 200 || inputValue.length <= 0){
                        document.getElementById('contact-form__Subject').classList.add('contact-form__input--red');
                        console.log("Subject is too long or empty");
                        wrongInput = true;
                    }
                }
            }
        }
    }

    let responseMessage;
    let submitMessage = document.getElementById('submit-message');
    submitMessage.classList.add('color-red')
    submitMessage.classList.remove('color-green')
    if(!wrongInput && captchaResponse){
        loadIcon.style.display = "block";
        document.getElementById('contact-form__submit').style.display = "none";
        await axios.post("https://localhost:7184/api/MailContact", data, {
            "Content-Tye": "application/json"
        })
        .then(res => {
            responseMessage = "Het is gelukt";
            submitMessage.classList.add('color-green');
            submitMessage.classList.remove('color-red');
            event.target.reset();
            grecaptcha.reset();
            for(let i = 0; i < inputs.length-1; i++){
                document.getElementById('char-count__' + inputs[i].name).textContent =  "0/" + getMaxLengthFromInputValue(inputs[i].name);
            }
            submitButton.disabled = true;

        })
        .catch(err => { 
            responseMessage = "Het is niet gelukt";
        });
        loadIcon.style.display = "none";
        document.getElementById('contact-form__submit').style.display = "block";
    }
    else if(!captchaResponse){
        responseMessage = "Vul de captcha in, het is niet gelukt";
    }
    else{
        responseMessage = "Het is niet gelukt";
    }
    submitMessage.textContent = responseMessage
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
            //TIP iets mee doen
            // if(input.value > getMaxLengthFromInputValue(input.name)){
            //     input.classList.add('contact-form__input--red');
            // }
            // else{
            //     input.classList.remove('contact-form__input--red');
            // }
            document.getElementById('submit-message').textContent = "";
            toggleSubmitForm();
        });
    }
}
addInputEventListener();




