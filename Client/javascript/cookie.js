class Cookie {

    constructor() {
        this.bindEvents();
        if(this.cookieStatus() !== 'accept') this.showGDPR();

    }

    bindEvents() {
        let buttonAccept = document.querySelector('.cookie-consent-form__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.hideGDPR();
     
            
        });
        let buttonReject = document.querySelector('.cookie-consent-form__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.hideGDPR();
    
        });


    }
    

    cookieStatus(status) {
        let date = new Date();
        let metadata = {
            datum: date.getDate() + "-" + date.getMonth()+1 + "-" + date.getFullYear(),
            tijd: date.getHours() + ":" + date.getMinutes()
        }
        metadata = JSON.stringify(metadata);
        
        if (status) 
        {
            localStorage.setItem('cookie-consent-choice', status);
            if(status === 'accept') localStorage.setItem('cookie-consent-date', metadata)
        }
        return localStorage.getItem('cookie-consent-choice');
    }

//student uitwerking


    hideGDPR(){
        document.querySelector(`.cookie-consent-form`).classList.add('cookies-container__hide');

        document.querySelector(`.cookie-consent-form`).classList.remove('cookies-container__show');
        document.querySelector('.cookies-container').classList.add('cookies-container__hide');
        document.querySelector(`.cookies-container`).classList.remove('cookies-container__show');
    }

    showGDPR(){
        document.querySelector(`.cookie-consent-form`).classList.add('cookies-container__show');
        document.querySelector('.cookies-container').classList.add('cookies-container__show');
        
    }

}

const cookie = new Cookie();
