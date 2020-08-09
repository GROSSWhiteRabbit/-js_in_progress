window.addEventListener('DOMContentLoaded', ()=>{

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
});