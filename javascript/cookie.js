class Cookie {

    constructor() {
        this.bindEvents();
        if(this.cookieStatus() !== 'accept') this.showGDPR();
        console.log('h1');
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
        console.log('h2');
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
        console.log('h3');
        document.querySelector(`.cookie-consent-form`).classList.add('hide');
        document.querySelector(`.cookie-consent-form`).classList.remove('show');
        document.querySelector('.cookies-container').classList.add('hide');
        document.querySelector('.cookies-container').classList.remove('show');
    }

    showGDPR(){
        console.log('h4');
        document.querySelector(`.cookie-consent-form`).classList.add('show');
        document.querySelector('.cookies-container').classList.add('show');
        
    }

}

const cookie = new Cookie();
