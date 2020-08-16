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
const getResource = async (url) => {
    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`could not feth ${url}, status:${res.status}` );
    }
    return await res.json();
};

function createMenuCard(){
    getResource('http://localhost:3000/menu')
    .then(arr => arr.forEach(({img, altimg, title, descr, price })=>{
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
    },2000);
    
}

// fetch('http://localhost:3000/menu')
//     .then(data => data.json())
//     .then(res => console.log(res));  



});





 