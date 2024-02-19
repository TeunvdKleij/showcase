const validateEmail = (email) => {
    if(email.match(/^\S+@\S+\.\S{2,}$/)){
        return true;
    }
    return false;
};
const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.match("(^\\+[0-9]{2}|^\\+[0-9]{2}\\(0\\)|^\\(\\+[0-9]{2}\\)\\(0\\)|^00[0-9]{2}|^0)([0-9]{9,20}$|[0-9\\-\\s]{10,20}$)")) {
        return true;
    }
    return false;
}
function replaceHtmlTags(text){
    return text.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/&/g, "&amp;")
}

document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    let inputs = event.target.elements;
    let wrongInput = false;
    let data = {};
    for(let i = 0; i < inputs.length-1; i++){
        let inputValue = inputs[i].value;
        let inputType = inputs[i].type
        let inputName = inputs[i].name;
        data[inputName] = inputValue;
        replaceHtmlTags(inputValue)
        if(inputType === "Email"){
            if(inputValue.length > 80){
                document.getElementById('contact-form__Email').classList.add('contact-form__input--red');
                console.log("Email is too long");
                wrongInput = true;
            }
        }
        else if(inputType === "PhoneNumber"){
            if(inputValue.length > 20){
                document.getElementById('contact-form__PhoneNumber').classList.add('contact-form__input--red');
                console.log("Phone number is too long");
                wrongInput = true;
            }
        }
        else{
            replaceHtmlTags(inputValue)
            if(inputType === "Message"){
                if(inputValue.length > 600){
                    document.getElementById('contact-form__Message').classList.add('contact-form__input--red');
                    console.log("Message is too long");
                    wrongInput = true;
                }
            }
            else if(inputType === "text"){
                if(inputName === "FirstName"){
                    if(inputValue.length > 60){
                        document.getElementById('contact-form__FirstName').classList.add('contact-form__input--red');
                        console.log("First name is too long");
                        wrongInput = true;
                    }
                }
                else if(inputName === "LastName"){
                    if(inputValue.length > 60){
                        document.getElementById('contact-form__LastName').classList.add('contact-form__input--red');
                        console.log("Last name is too long");
                        wrongInput = true;
                    }
                }
                else if(inputName === "Subject"){
                    if(inputValue.length > 200){
                        document.getElementById('contact-form__Subject').classList.add('contact-form__input--red');
                        console.log("Subject is too long");
                        wrongInput = true;
                    }
                }
            }
        }

    }
    let responseMessage;
    let submitMessage = document.getElementById('submit-message');
    
    if(!wrongInput){
        await axios.post("https://localhost:7184/api/MailContact", data, {
            "Content-Tye": "application/json"
        })
        .then(res => {
            responseMessage = "Het is gelukt";
            submitMessage.classList.add('color-green');
            submitMessage.classList.remove('color-red');
            submitMessage.textContent = responseMessage;
            event.target.reset();
        })
        .catch(err => { 
            responseMessage = "Het is niet gelukt";
            submitMessage.classList.add('color-red');
            submitMessage.classList.remove('color-green');
            submitMessage.textContent = responseMessage;
        });
    }
    else{
        responseMessage = "Het is niet gelukt";
        submitMessage.classList.add('color-red')
        submitMessage.classlist.remove('color-green')
        submitMessage.textContent = responseMessage
    }
});

function getMaxLengthFromInputValue(name){
    let length = 0;
    if(name === "FirstName" || name === "LastName") length = 60;
    else if(name === "Email") length = 80;
    else if(name === "PhoneNumber") length = 20;
    else if(name === "Subject") length = 200;
    else if(name === "Message") length = 600;
    return length;
}
function addCharCounter() {
    let formInputs = document.getElementById('contact-form').elements;
    for(let i = 0; i < formInputs.length-1; i++){
        let input = formInputs[i];
        input.addEventListener('keyup', (e) => {
            document.getElementById('char-count__' + input.name).textContent = (e.target.value.length) + "/" + getMaxLengthFromInputValue(input.name);
        });
    }
}
function addValidateInputFields(){
    document.getElementById('contact-form__Email').addEventListener('keyup', (e) => {
        if(validateEmail(e.target.value))
        {
            document.getElementById('contact-form__Email').classList.remove('contact-form__input--red');
            document.getElementById('contact-form__submit').disabled = false;
        }
        else{
            document.getElementById('contact-form__Email').classList.add('contact-form__input--red');
            document.getElementById('contact-form__submit').disabled = true;
        }
    });
    document.getElementById('contact-form__PhoneNumber').addEventListener('keyup', (e) => {
        if(validatePhoneNumber(e.target.value))
        {
            document.getElementById('contact-form__PhoneNumber').classList.remove('contact-form__input--red');
            document.getElementById('contact-form__submit').disabled = false;
        }
        else{
            document.getElementById('contact-form__PhoneNumber').classList.add('contact-form__input--red');
            document.getElementById('contact-form__submit').disabled = true;
        }
    });
}


addCharCounter();
addValidateInputFields()



