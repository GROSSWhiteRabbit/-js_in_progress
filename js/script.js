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
    clearInterval(modalTimerId);
  }


  function listenCloseModal(element) {
    const icoClose =  element.querySelector('[data-close]');

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && element.classList.contains('show')){
        closeModal (element);}});
    element.addEventListener('click', (e) => {
        if( e.target === modal || e.target === icoClose){
            closeModal (element);
          }
    });
  }

  function closeModal (element){
    element.classList.add('hide');
            element.classList.remove('show');
            document.body.style.overflow = '';
  }
  listenCloseModal(modal);

//   const modalTimerId = setTimeout(showModal, 15000, modal);
  
  function showModalByScroll (){
    if(window.pageYOffset +  document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        window.removeEventListener('scroll', showModalByScroll);
  
        showModal(modal);
        
        
    }
    
  }


  window.addEventListener('scroll', showModalByScroll);
});

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


new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Фитнес',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    
).render();

new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Премиум',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container',
    
).render();

new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Постное',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container' 
).render();


// Forms

const forms = document.querySelectorAll('form');

function postData(form) {
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const formData = new FormData(form),
        request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'multipart/form-data');
        request.send()
    });
}
    




 