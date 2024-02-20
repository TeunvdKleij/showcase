class CurrentSelected{
    constructor(){

        this.bindEvents();
    }

    bindEvents() {
        let buttonProfile = document.querySelector('#profile-button');
        buttonProfile.addEventListener('click', () => {
            this.showSection('profile');
        });
        let buttonContactForm = document.querySelector('#contact-form-button');
        buttonContactForm.addEventListener('click', () => {
            this.showSection('contactForm');
        });
    }
    showSection(sectionName){
        document.querySelector(`#profile-button`).classList.remove('profile__button--current');
        document.querySelector(`#contact-form-button`).classList.remove('profile__button--current');
            
        if(sectionName === 'profile'){
            document.querySelector(`#profile-button`).classList.add('profile__button--current');
            document.querySelector('.profile__content').classList.remove('hide');
            document.querySelector('.profile__content').classList.add('show');
            document.querySelector('.contact-form__section').classList.add('hide');
            document.querySelector('.contact-form__section').classList.remove('show');

        }
        else if(sectionName === 'contactForm'){
            document.querySelector(`#contact-form-button`).classList.add('profile__button--current');
            document.querySelector('.profile__content').classList.add('hide');
            document.querySelector('.profile__content').classList.remove('show');
            document.querySelector('.contact-form__section').classList.remove('hide');
            document.querySelector('.contact-form__section').classList.add('show');

        }
    }

    hideProfile(){
        document.querySelector(`#profile-button`).classList.remove('profile-button__current');
    }
    hideContactForm(){
        document.querySelector(`#contact-form-button`).classList.remove('profile-button__current');
    }

}

const currentSelected = new CurrentSelected();
