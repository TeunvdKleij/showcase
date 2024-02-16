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

document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputs = event.target.elements;
    let wrongInput = false;
    for(let i = 0; i < inputs.length-1; i++){
        let inputValue = inputs[i].value;
        let inputType = inputs[i].type
        let inputName = inputs[i].name;
        replaceHtmlTags(inputValue)
        if(inputType === "email"){
            if(inputValue.length > 80){
                document.getElementById('contact-form__email').classList.add('contact-form__input--red');
                console.log("Email is too long");
                wrongInput = true;
            }
        }
        else if(inputType === "phone-number"){
            if(inputValue.length > 20){
                document.getElementById('contact-form__phone-number').classList.add('contact-form__input--red');
                console.log("Phone number is too long");
                wrongInput = true;
            }
        }
        else{
            replaceHtmlTags(inputValue)
            if(inputType === "message"){
                if(inputValue.length > 600){
                    document.getElementById('contact-form__message').classList.add('contact-form__input--red');
                    console.log("Message is too long");
                    wrongInput = true;
                }
            }
            else if(inputType === "text"){
                if(inputName === "first-name"){
                    if(inputValue.length > 60){
                        document.getElementById('contact-form__first-name').classList.add('contact-form__input--red');
                        console.log("First name is too long");
                        wrongInput = true;
                    }
                }
                else if(inputName === "last-name"){
                    if(inputValue.length > 60){
                        document.getElementById('contact-form__last-name').classList.add('contact-form__input--red');
                        console.log("Last name is too long");
                        wrongInput = true;
                    }
                }
                else if(inputName === "subject"){
                    if(inputValue.length > 200){
                        document.getElementById('contact-form__subject').classList.add('contact-form__input--red');
                        console.log("Subject is too long");
                        wrongInput = true;
                    }
                }
            }
        }

    }
    if(wrongInput){
        document.getElementById('submit-message').classList.add('color-red');
        document.getElementById('submit-message').classList.remove('color-green');
        document.getElementById('submit-message').textContent = "Het bericht is niet verstuurd";
    }
    else{
        document.getElementById('submit-message').classList.remove('color-red');
        document.getElementById('submit-message').classList.add('color-green');
        document.getElementById('submit-message').textContent = "Het bericht is verstuurd";
    }
    //show message of failed send
})

function getMaxLengthFromInputValue(name){
    let length = 0;
    if(name === "first-name" || name === "last-name") length = 60;
    else if(name === "email") length = 80;
    else if(name === "phone-number") length = 20;
    else if(name === "subject") length = 200;
    else if(name === "message") length = 600;
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
    document.getElementById('contact-form__email').addEventListener('keyup', (e) => {
        if(validateEmail(e.target.value))
        {
            document.getElementById('contact-form__email').classList.remove('contact-form__input--red');
            document.getElementById('contact-form__submit').disabled = false;
        }
        else{
            document.getElementById('contact-form__email').classList.add('contact-form__input--red');
            document.getElementById('contact-form__submit').disabled = true;
        }
    });
    document.getElementById('contact-form__phone-number').addEventListener('keyup', (e) => {
        if(validatePhoneNumber(e.target.value))
        {
            document.getElementById('contact-form__phone-number').classList.remove('contact-form__input--red');
            document.getElementById('contact-form__submit').disabled = false;
        }
        else{
            document.getElementById('contact-form__phone-number').classList.add('contact-form__input--red');
            document.getElementById('contact-form__submit').disabled = true;
        }
    });
}


addCharCounter();
addValidateInputFields()



