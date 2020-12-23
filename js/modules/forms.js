import {showModal, closeModal} from './modal';
import {postData} from '../services/services';
 
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
                
            postData(
                // 'http://localhost:3000/requests',
                'server.php',
                json)
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
        showModal('.modal');
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
            closeModal('.modal');
        }, 3000);

    }

}

export default forms;