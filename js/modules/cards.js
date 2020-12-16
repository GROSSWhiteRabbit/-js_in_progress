import {getResource} from '../services/services';
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
        // getResource('http://localhost:3000/menu')
        // .then(arr => arr.forEach(({img, altimg, title, descr, price })=>{
        //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        // }));

        getResource('../../db.json')
        .then(arr => arr.menu.forEach(({img, altimg, title, descr, price })=>{
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        }));
    
    
        // axios.get('http://localhost:3000/menu')
        // .then(data => data.data.forEach(({img, altimg, title, descr, price })=>{
        //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        //     }));
    }
    createMenuCard();
    
}

export default cards;
