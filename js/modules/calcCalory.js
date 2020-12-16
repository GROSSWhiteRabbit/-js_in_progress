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

export default calcCalory;