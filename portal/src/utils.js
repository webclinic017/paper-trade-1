import moment from 'moment';

export const moneyFormatter = (amount) => `$${Number((amount).toFixed(2)).toLocaleString()}`

// Gets the current or previous trading day
export const getLastTradingDay = () => {
    let workday = moment();
    let day = workday.day();
    let diff = 0;

    if (day === 0) {  // is Sunday 
        diff = 2;  
    } else if (day === 6) { // is saturday 
        diff = 1;
    } else {
        return workday.format('YYYY-MM-DD');
    }
    return workday.subtract(diff, 'days').format('YYYY-MM-DD');
}