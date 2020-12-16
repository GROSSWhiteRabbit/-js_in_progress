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


    
    const btns = document.querySelectorAll(btnsOpenModalSelector),
        modal = document.querySelector(modalSelector);


    listenShowModalBy(btns, modalSelector);
    listenCloseModal(modalSelector);

    


    function listenShowModalBy(btns, modalSelector) {
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                showModal(modalSelector, modalTimerId);
            });
        });
    }


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

export default modal;
export{showModal, closeModal};