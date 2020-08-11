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

  const modalTimerId = setTimeout(showModal, 15000, modal);
  
  function showModalByScroll (){
    if(document.documentElement.scrollTop +  document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        showModal(modal);
        window.removeEventListener('scroll', showModalByScroll);
    }
  }


  window.addEventListener('scroll', showModalByScroll);
});