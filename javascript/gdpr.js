class GDPR {

    constructor() {
        this.bindEvents();
        if(this.cookieStatus() !== 'accept') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.hideGDPR();
            
        });
        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
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
            localStorage.setItem('gdpr-consent-choice', status);
            if(status === 'accept') localStorage.setItem('gdpr-consent-date', metadata)
        }
        return localStorage.getItem('gdpr-consent-choice');
    }

//student uitwerking


    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
        document.querySelector('.container').classList.add('hide');
        document.querySelector('.container').classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
        document.querySelector('.container').classList.add('show');
    }

}

const gdpr = new GDPR();
