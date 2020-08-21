window.addEventListener('DOMContentLoaded', ()=>{

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabcontent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabcontent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
            
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabcontent[i].classList.add('show', 'fade');
        tabcontent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click',(e) => {
        e.preventDefault();
        const target = e.target;
        console.dir(target);
        if(target && target.matches('.tabheader__item')){
            tabs.forEach((tab,i) => {
                if(tab == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            } );
            
        }
    });

    //Timer

    function getTimeRemaining(strOrYear, month, days, hours=0, minutes=0, seconds=0){

        const deadline = (typeof(strOrYear) == 'string') ? new Date(strOrYear) : new Date(strOrYear, month, days, hours, minutes, seconds),
            TimeRemaining = new Date(deadline.getTime() - Date.now()); 

        if (TimeRemaining.getTime() <= 0) {
            return {
            t: TimeRemaining.getTime(),
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
            };
        }

        const daysN = Math.floor(TimeRemaining.getTime()/1000/60/60/24);

        // const t = Date.parse(endtime) - Date.parse(new Date()),
        // days = Math.floor( (t/(1000*60*60*24)) ),
        // seconds = Math.floor( (t/1000) % 60 ),
        // minutes = Math.floor( (t/1000/60) % 60 ),
        // hours = Math.floor( (t/(1000*60*60) % 24) );
   
        return {
            t: TimeRemaining.getTime(),
            days:getZero(daysN),
            hours: getZero(TimeRemaining.getUTCHours()),
            minutes:  getZero(TimeRemaining.getUTCMinutes()),
            seconds:  getZero(TimeRemaining.getUTCSeconds()),
        };

        
    }

    function getZero(num){
        if(num >=0 && num < 10) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    }




    function  setClock(strOrYear, month, days, hours=0, minutes=0, seconds=0) {
      
      const daysElem = document.querySelector('#days');
      const hoursElem = document.querySelector('#hours');
      const minutesElem = document.querySelector('#minutes');
      const secondsElem = document.querySelector('#seconds');
      const timer = setInterval(updateClock, 1000);
      updateClock();
        function updateClock() {

        const TimeRemainingObj = getTimeRemaining(strOrYear, month, days, hours, minutes, seconds);


        daysElem.textContent = TimeRemainingObj.days;
        hoursElem.textContent = TimeRemainingObj.hours;
        minutesElem.textContent = TimeRemainingObj.minutes;
        secondsElem.textContent = TimeRemainingObj.seconds;

        if(TimeRemainingObj.t <= 0){
        clearInterval(timer);
        }
        }
        
    }
    
  setClock(2020, 08, 11);

  //modal

  function listenShowModalBy(btns, element){
      btns.forEach((btn) => {
          btn.addEventListener('click', () => {
            axios.post('  http://localhost:3000/requests', {
                firstName: 'Fred',
                lastName: 'Flintstone'
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
            
            showModal(element);
          });
      });
  }
  const btns = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
        listenShowModalBy(btns, modal);


  function showModal(element) {      
    element.classList.add('show');
    element.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    listenCloseModal(element);
    clearInterval(modalTimerId);
  }


  function listenCloseModal(element) {
    

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && element.classList.contains('show')){
        closeModal (element);}});
    element.addEventListener('click', (e) => {
        if( e.target === modal || e.target.getAttribute('data-close') == '' ){
            closeModal (element);
          }
    });
  }

  function closeModal (element){
    element.classList.add('hide');
            element.classList.remove('show');
            document.body.style.overflow = '';
  }
  

  const modalTimerId = setTimeout(showModal, 50000, modal);
  
  function showModalByScroll (){
    if(window.pageYOffset +  document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        window.removeEventListener('scroll', showModalByScroll);
  
        showModal(modal);
        
        
    }
    
  }


  window.addEventListener('scroll', showModalByScroll);
  
//MenuItem

class MenuCard {
    constructor(img, alt, tittle, desc, price, parentSelector, ...clases){
        this.img = img;
        this.alt = alt;
        this.tittle = tittle;
        this.desc = desc;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
        this.clases = clases;
    }
    render(){
        const element = document.createElement('div');
        if(this.clases.length === 0 ) {
            this.element = 'menu__item';
            element.classList.add(this.element);
            
        } else {
            element.classList.add( ...this.clases);
        }
        
        element.innerHTML = `
        <img src=${this.img} alt=${this.alt}>
        <h3 class="menu__item-subtitle">Меню "${this.tittle}"</h3>
        <div class="menu__item-descr">${this.desc}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>` ;   
        this.parent.append(element);
    }
    changeToUAH(){
        return this.price *= this.transfer;
    }
}
// const getResource = async (url) => {
//     const res = await fetch(url);
//     if(!res.ok){
//         throw new Error(`could not feth ${url}, status:${res.status}` );
//     }
//     return await res.json();
// };

function createMenuCard(){
    // getResource('http://localhost:3000/menu')
    // .then(arr => arr.forEach(({img, altimg, title, descr, price })=>{
    //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    // }));


    axios.get('http://localhost:3000/menu')
    .then(data => data.data.forEach(({img, altimg, title, descr, price })=>{
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        }));
}
createMenuCard();

// Forms

const forms = document.querySelectorAll('form');
const massage = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, мы скоро с вами свяжемся.',
    failure: 'Что-то пошло не так...',
};
forms.forEach(form => {
    BindPostData(form);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: data,
    });
    return await res.json();
};

function BindPostData(form) {
    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const statusMassage = document.createElement('img');
        
        statusMassage.src = massage.loading;
        statusMassage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMassage);
        


        const formData = new FormData(form),
              json = JSON.stringify(Object.fromEntries(formData.entries()));
        
        postData('http://localhost:3000/requests', json )   
            .then(resp => {
                
                    console.log(resp);
                    showThenksModal(massage.success);
               
            })
            .catch((error)=>showThenksModal(massage.failure))
            .finally(()=>{
                form.reset();                
                statusMassage.remove();
            });

            
        // const   request = new XMLHttpRequest();

        // request.open('POST', 'server.php');
        // // request.setRequestHeader('Content-type', 'multipart/form-data');
        // request.send(json);
        // request.addEventListener('loadend', ()=>{
        //     if(request.status === 200) {
        //         console.log(request.response);
        //         showThenksModal(massage.success);
        //         form.reset();
                
        //         statusMassage.remove();
                
        //     } else {
        //         showThenksModal(massage.failure);
        //         statusMassage.remove();
        //     }
        // });
    });
}

function showThenksModal(massage){
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    showModal(modal);
    const thenksModal = document.createElement('div');
    
    thenksModal.classList.add('modal__dialog');
    thenksModal.innerHTML = `
    <div class="modal__content">
    <div data-close class="modal__close">&times;</div>
    <div class="modal__title">${massage}</div>
    </div>
    `;
    modal.append(thenksModal);
    
    setTimeout(() => {
        thenksModal.remove();
        prevModalDialog.classList.remove('hide');
        prevModalDialog.classList.add('show');
        closeModal(modal);
    },5000);
    
}

// Slider

// const slider = {
//     elemCurrentNumber: document.querySelector('.offer__slider-counter #current'),
//     elemTotalNumber: document.querySelector('.offer__slider-counter #total'),
//     slides: document.querySelectorAll('.offer__slide'),
//     indexVisi: 0,
// };

// startSlider();
// let slideTimer = setInterval(showNext, 3000);

// function startSlider() {
//     showSlideI(0);
//     slider.elemTotalNumber.textContent = getZero(slider.slides.length);
//     listenSwitchesSlider();

// }
// function showSlideI(i){
//     slider.slides.forEach((slide)=> {
//         slide.classList.remove('show', 'fade');
//         slide.classList.add('hide');
//     });
//     slider.slides[i].classList.add('show', 'fade');
//     slider.slides[i].classList.remove('hide');
//     slider.elemCurrentNumber.textContent = getZero(i + 1);
//     slider.indexVisi = i;
    
// }


// function showPrev(){
//     if (slider.indexVisi <= 0) {
//         showSlideI(slider.slides.length - 1);

//     } else {
//         showSlideI(slider.indexVisi - 1);
//     }
// }

// function showNext() {
//     if (slider.slides.length - 1 <= slider.indexVisi) {
//         showSlideI(0);

//     } else {
//         showSlideI(slider.indexVisi + 1);
//     }
// }

// function listenSwitchesSlider() {
//     let waitingToStart;
//     const prev = document.querySelector('.offer__slider-prev');
//     const next = document.querySelector('.offer__slider-next');
//     prev.addEventListener('click', ()=>{

//         showPrev();
//         suspendTimerSlider();

//     });      
//     next.addEventListener('click', ()=>{

//         showNext();  
//         suspendTimerSlider();
//     });

//     function suspendTimerSlider() {
//         clearInterval(waitingToStart);
//         clearInterval(slideTimer);
//         waitingToStart = setTimeout(()=>{
//             slideTimer = setInterval(showNext, 3000);
//         }, 10000);   
//     }
// }

const wrapper = document.querySelector('.offer__slider-wrapper'),
    slides = document.querySelectorAll('.offer__slide'),
    slidesField = document.querySelector('.offer__slider-inner'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    сurrent = document.querySelector('#current'),
    total = document.querySelector('#total'),
    slider = document.querySelector('.offer__slider');
let   indexVisi = 1,
    offset = 0,
    width = window.getComputedStyle(wrapper).width;



slides.forEach(slide => slide.style.width = width );
slidesField.style.width = 100 * slides.length + "%";
slidesField.style.display = 'flex';
slidesField.style.transition = 'all .3s';
wrapper.style.overflow = 'hidden';


const indicators = document.createElement('div');
indicators.classList.add('carousel-indicators');
slider.append(indicators);

const dots = [];
slides.forEach((slide, i) => {
    const dot = document.createElement('div');
    dot.setAttribute('data-indexSlide', i+1);
    dots.push(dot);
    dot.classList.add('dot');
    indicators.append(dot);
});


    startSlider();
    let slideTimer = setInterval(shiftLeft, 3000);

function deliteNotDigit(str){
   return +str.replace(/\D/ig, '');
}

function shiftToSlide(i) {
    if (i > slides.length){
        i = slides.length;
    }
    if(i < 1){
        i = 1;
    }
    offset = deliteNotDigit(width) * (i-1);
    slidesField.style.transform = `translateX(-${offset}px)`;
    indexVisi = i;
    сurrent.textContent = getZero(indexVisi);
    setActiveDot(indexVisi);


}

function shiftLeft(){
    if (offset >= deliteNotDigit(width) * (slides.length - 1)){
        offset = 0;

    } else{
        offset += deliteNotDigit(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if(indexVisi >= slides.length){
        indexVisi = 1;
    } else {
        indexVisi++;
    }
    сurrent.textContent = getZero(indexVisi);
    setActiveDot(indexVisi);
    
}

function shiftRight(){
    if (offset == 0){
        offset = deliteNotDigit(width) * (slides.length - 1);

    } else{
        offset -= deliteNotDigit(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if(indexVisi<=1){
        indexVisi = slides.length;
    } else {
        indexVisi--;
    }
    сurrent.textContent = getZero(indexVisi);
    setActiveDot(indexVisi);

}
function listenSwitchesSlider() {
    let suspendTimer;
    prev.addEventListener('click', ()=>{
        shiftRight();
        SetSuspendTimerSlider();
    });
    next.addEventListener('click', ()=>{
        shiftLeft();
        SetSuspendTimerSlider();
        
    });
    indicators.addEventListener('click', (e)=>{
        if(e.target.getAttribute('data-indexSlide')){
            shiftToSlide(+e.target.getAttribute('data-indexSlide'));
            SetSuspendTimerSlider();
        }
    });

    function SetSuspendTimerSlider() {
        clearInterval(suspendTimer);
        clearInterval(slideTimer);
        suspendTimer = setTimeout(() => {
            slideTimer = setInterval(shiftLeft, 3000);
        }, 10000);


    }
    

}

function setActiveDot(i){
    dots.forEach(dot => {
        dot.style.opacity = '.5';
    });
    dots[i-1].style.opacity = '1';
    

}

function startSlider () {
    listenSwitchesSlider();
    total.textContent = getZero(slides.length);
    сurrent.textContent = getZero(1);
    setActiveDot(indexVisi);
}








// Calc calory 
const calcResult = document.querySelector('.calculating__result span'),
    personChoose = {
        gender: 'female',
        physicalActivity: 1.375,
    };  
let BMR = 1800;

lisenActiveChoose('#gender');
lisenActiveChoose('.calculating__choose_big');
getDinamicInformation('.calculating__choose_medium');
let timerMasha;

function getDinamicInformation(elemSelector){
    document.querySelector(elemSelector).addEventListener('input', (e)=>{
        clearInterval(timerMasha);
        personChoose[e.target.getAttribute('id')] = +`${e.target.value}`.replace(/[^\d,\.]/gi, '').replace(',', '.');
        calcCalories();
        timerMasha = setTimeout(()=>{showThenksModal('Машка, ты и так красивая \u2764)))');},7000);
        
    });
}

    
function setActiveChoose(elem) {
    [...elem.parentNode.children].forEach(item => item.classList.remove('calculating__choose-item_active'));
    elem.classList.add('calculating__choose-item_active');
}

function lisenActiveChoose(elemSelector){
    document.querySelector(elemSelector).addEventListener('click', (e)=>{
        if (e.target.classList.contains('calculating__choose-item')){
            setActiveChoose(e.target);
            if (e.target.getAttribute('data-ratio')){
                personChoose.physicalActivity = +e.target.getAttribute('data-ratio');
            } else {
                personChoose.gender = e.target.getAttribute('id');
            }
        }

         calcCalories();
         
    });
}

function calcCalories(){
    if(!personChoose.gender || !personChoose.weight || !personChoose.height || !personChoose.age || !personChoose.physicalActivity){
        calcResult.textContent = 'XXXX';
        return;
    }

    if (personChoose.gender === 'male') {
        BMR = 88.36 + (13.4 * personChoose.weight) + (4.8 * personChoose.height) - (5.7 * personChoose.age);
    } if (personChoose.gender === 'female') {
        BMR = 447.6 + (9.2 * personChoose.weight) + (3.1 * personChoose.height) - (4.3 * personChoose.age);
    }
    calcResult.textContent = (BMR * personChoose.physicalActivity).toFixed(0);
    
}


});






 