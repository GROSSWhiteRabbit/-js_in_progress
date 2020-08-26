/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calcCalory.js":
/*!**********************************!*\
  !*** ./js/modules/calcCalory.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calcCalory() {

    const calcResult = document.querySelector('.calculating__result span'),
        personChoose = {
            gender: 'female',
            physicalActivity: 1.375,
        };
    let BMR = 1800;

    if (localStorage.getItem('gender')) {
        personChoose.gender = localStorage.getItem('gender');
        setActiveChoose(document.querySelector(`#${localStorage.getItem('gender')}`));
    } else {
        localStorage.setItem('gender', personChoose.gender);
    }
    if (localStorage.getItem('physicalActivity')) {
        personChoose.physicalActivity = localStorage.getItem('physicalActivity');
        setActiveChoose(document.querySelector(`[data-ratio="${localStorage.getItem('physicalActivity')}"]`));
    } else {
        localStorage.setItem('physicalActivity', personChoose.physicalActivity);
    }

    lisenActiveChoose('#gender');
    lisenActiveChoose('.calculating__choose_big');
    getDinamicInformation('.calculating__choose_medium');
    let timerMasha;

    function getDinamicInformation(elemSelector) {
        document.querySelector(elemSelector).addEventListener('input', (e) => {
            if (!(e.target.value.match(/^\d+$|^(\d+[\.,]\d+)$/))) {
                e.target.style.border = '1px solid red';
            } else {
                e.target.style.border = 'none';
            }
            personChoose[e.target.getAttribute('id')] = +e.target.value.replace(',', '.');
            console.log(personChoose[e.target.getAttribute('id')]);
            calcCalories();
            if (!timerMasha) {

                timerMasha = setTimeout(() => {
                    alert('Машка, ты и так красивая \u2764)))');
                }, 7000);
            }


        });
    }


    function setActiveChoose(elem) {
        [...elem.parentNode.children].forEach(item => item.classList.remove('calculating__choose-item_active'));
        elem.classList.add('calculating__choose-item_active');
    }

    function lisenActiveChoose(elemSelector) {
        document.querySelector(elemSelector).addEventListener('click', (e) => {
            if (e.target.classList.contains('calculating__choose-item')) {
                setActiveChoose(e.target);
                if (e.target.getAttribute('data-ratio')) {
                    personChoose.physicalActivity = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('physicalActivity', +e.target.getAttribute('data-ratio'));
                } else {
                    personChoose.gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));

                }
            }

            calcCalories();

        });
    }

    function calcCalories() {
        if (!personChoose.gender || !personChoose.weight || !personChoose.height || !personChoose.age || !personChoose.physicalActivity) {
            calcResult.textContent = 'XXXX';
            return;
        }

        if (personChoose.gender === 'male') {
            BMR = 88.36 + (13.4 * personChoose.weight) + (4.8 * personChoose.height) - (5.7 * personChoose.age);
        }
        if (personChoose.gender === 'female') {
            BMR = 447.6 + (9.2 * personChoose.weight) + (3.1 * personChoose.height) - (4.3 * personChoose.age);
        }
        calcResult.textContent = (BMR * personChoose.physicalActivity).toFixed(0);

    }


}

/* harmony default export */ __webpack_exports__["default"] = (calcCalory);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {


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

    
    function createMenuCard(){
        Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
        .then(arr => arr.forEach(({img, altimg, title, descr, price })=>{
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        }));
    
    
        // axios.get('http://localhost:3000/menu')
        // .then(data => data.data.forEach(({img, altimg, title, descr, price })=>{
        //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        //     }));
    }
    createMenuCard();
    
}

/* harmony default export */ __webpack_exports__["default"] = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


 
function forms(formsSelector, modalTimerId) {


    const forms = document.querySelectorAll(formsSelector);
    const massage = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся.',
        failure: 'Что-то пошло не так...',
    };
    forms.forEach(form => {
        BindPostData(form);
    });



    function BindPostData(form) {
        form.addEventListener('submit', (e) => {
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

            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
                .then(resp => {

                    console.log(resp);
                    showThenksModal(massage.success);

                })
                .catch((error) => showThenksModal(massage.failure))
                .finally(() => {
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

    function showThenksModal(massage) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showModal"])('.modal');
        const thenksModal = document.createElement('div');

        thenksModal.classList.add('modal__dialog');
        thenksModal.innerHTML = `
    <div class="modal__content">
    <div data-close class="modal__close">&times;</div>
    <div class="modal__title">${massage}</div>
    </div>
    `;
        document.querySelector('.modal').append(thenksModal);

        setTimeout(() => {
            thenksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
        }, 3000);

    }

}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: showModal, closeModal, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModal", function() { return showModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
function showModal(modalSelector, modalTimerId) {
    const element = document.querySelector(modalSelector);
    element.classList.add('show');
    element.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId){
        clearInterval(modalTimerId);
    }

}
function closeModal(modalSelector) {
    const element = document.querySelector(modalSelector);
    element.classList.add('hide');
    element.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(modalSelector, btnsOpenModalSelector, modalTimerId ) {


    function listenShowModalBy(btns, element) {
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                showModal(element, modalTimerId);
            });
        });
    }
    const btns = document.querySelectorAll(btnsOpenModalSelector),
        modal = document.querySelector(modalSelector);
    listenShowModalBy(btns, modalSelector);
    listenCloseModal(modalSelector);





    function listenCloseModal(element) {


        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && element.classList.contains('show')) {
                closeModal(element);
            }
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal(element);
            }
        });
    }






    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
            window.removeEventListener('scroll', showModalByScroll);

            showModal(modalSelector, modalTimerId);


        }

    }


    window.addEventListener('scroll', showModalByScroll);


}

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function slider({
    sliderSelector,
    wrapperSelector,
    fieldSelector,
    sledesSelector,
    prevSelector,
    nextSelector,
    totalSelector,
    currentSelector
}) {

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

    const wrapper = document.querySelector(wrapperSelector),
        slides = document.querySelectorAll(sledesSelector),
        slidesField = document.querySelector(fieldSelector),
        prev = document.querySelector(prevSelector),
        next = document.querySelector(nextSelector),
        сurrent = document.querySelector(currentSelector),
        total = document.querySelector(totalSelector),
        slider = document.querySelector(sliderSelector);
    let indexVisi = 1,
        offset = 0,
        width = window.getComputedStyle(wrapper).width;



    slides.forEach(slide => slide.style.width = width);
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
        dot.setAttribute('data-indexSlide', i + 1);
        dots.push(dot);
        dot.classList.add('dot');
        indicators.append(dot);
    });


    startSlider();
    let slideTimer = setInterval(shiftLeft, 3000);

    function deliteNotDigit(str) {
        return +str.replace(/\D/ig, '');
    }

    function shiftToSlide(i) {
        if (i > slides.length) {
            i = slides.length;
        }
        if (i < 1) {
            i = 1;
        }
        offset = deliteNotDigit(width) * (i - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        indexVisi = i;
        сurrent.textContent = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(indexVisi);
        setActiveDot(indexVisi);


    }

    function shiftLeft() {
        if (offset >= deliteNotDigit(width) * (slides.length - 1)) {
            offset = 0;

        } else {
            offset += deliteNotDigit(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexVisi >= slides.length) {
            indexVisi = 1;
        } else {
            indexVisi++;
        }
        сurrent.textContent = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(indexVisi);
        setActiveDot(indexVisi);

    }

    function shiftRight() {
        if (offset == 0) {
            offset = deliteNotDigit(width) * (slides.length - 1);

        } else {
            offset -= deliteNotDigit(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (indexVisi <= 1) {
            indexVisi = slides.length;
        } else {
            indexVisi--;
        }
        сurrent.textContent = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(indexVisi);
        setActiveDot(indexVisi);

    }

    function listenSwitchesSlider() {
        let suspendTimer;
        prev.addEventListener('click', () => {
            shiftRight();
            SetSuspendTimerSlider();
        });
        next.addEventListener('click', () => {
            shiftLeft();
            SetSuspendTimerSlider();

        });
        indicators.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-indexSlide')) {
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

    function setActiveDot(i) {
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[i - 1].style.opacity = '1';


    }

    function startSlider() {
        listenSwitchesSlider();
        total.textContent = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slides.length);
        сurrent.textContent = Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(1);
        setActiveDot(indexVisi);
    }


}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabContentSelector, tabsParentSelector ){


    const tabs = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);


    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
            
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
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

}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function timer(id, deadline){


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
            days:Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(daysN),
            hours: Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(TimeRemaining.getUTCHours()),
            minutes:  Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(TimeRemaining.getUTCMinutes()),
            seconds:  Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getZero"])(TimeRemaining.getUTCSeconds()),
        };

        
    }






    function  setClock(id, strOrYear, month, days, hours=0, minutes=0, seconds=0) {
      const timerId = document.querySelector(id);
      const daysElem = timerId.querySelector('#days');
      const hoursElem = timerId.querySelector('#hours');
      const minutesElem = timerId.querySelector('#minutes');
      const secondsElem = timerId.querySelector('#seconds');
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
    
  setClock(id, deadline);

}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calcCalory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calcCalory */ "./js/modules/calcCalory.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
    
  
  
  
      
 




window.addEventListener('DOMContentLoaded', ()=>{
    
      // const  timer = require('./modules/timer');
const modalTimerId = setTimeout(()=>Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["showModal"])('.modal', modalTimerId ), 50000, _modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"]);



  Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items');
  Object(_modules_timer__WEBPACK_IMPORTED_MODULE_0__["default"])('.timer', '2020-09-11');
  Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-modal]', modalTimerId );
  Object(_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  Object(_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    sliderSelector: '.offer__slider',
    wrapperSelector: '.offer__slider-wrapper',
    fieldSelector: '.offer__slider-inner',
    sledesSelector: '.offer__slide',
    prevSelector: '.offer__slider-prev',
    nextSelector: '.offer__slider-next',
    totalSelector: '#total',
    currentSelector: '#current',
});
  Object(_modules_calcCalory__WEBPACK_IMPORTED_MODULE_5__["default"])();
});






 

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource, getZero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZero", function() { return getZero; });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    });
    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`could not feth ${url}, status:${res.status}` );
    }
    return await res.json();
};

function getZero(num){
    if(num >=0 && num < 10) {
        return `0${num}`;
    } else {
        return `${num}`;
    }
}



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map