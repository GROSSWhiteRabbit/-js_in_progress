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

export default tabs;