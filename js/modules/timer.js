import {getZero} from '../services/services';
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
            days:getZero(daysN),
            hours: getZero(TimeRemaining.getUTCHours()),
            minutes:  getZero(TimeRemaining.getUTCMinutes()),
            seconds:  getZero(TimeRemaining.getUTCSeconds()),
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

export default timer;