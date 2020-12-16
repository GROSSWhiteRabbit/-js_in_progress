
import timer  from './modules/timer' ;    
import modal  from './modules/modal' ;  
import  cards from './modules/cards' ;  
import forms  from './modules/forms' ;  
import slider  from './modules/slider' ;      
import calcCalory  from './modules/calcCalory' ; 
import tabs from './modules/tabs';
import {showModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', ()=>{
    
      // const  timer = require('./modules/timer');
const modalTimerId = setTimeout(()=>showModal('.modal', modalTimerId ), 50000, modal);



  tabs('.tabheader__item', '.tabcontent', '.tabheader__items');
  timer('.timer', '2021-05-20');
  modal('.modal', '[data-modal]', modalTimerId );
  cards();
  forms('form', modalTimerId);

  slider({
    sliderSelector: '.offer__slider',
    wrapperSelector: '.offer__slider-wrapper',
    fieldSelector: '.offer__slider-inner',
    sledesSelector: '.offer__slide',
    prevSelector: '.offer__slider-prev',
    nextSelector: '.offer__slider-next',
    totalSelector: '#total',
    currentSelector: '#current',
});




  calcCalory();
  
});






 