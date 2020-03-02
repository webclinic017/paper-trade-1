import moment from 'moment';

export const moneyFormatter = (amount) => `$${Number((amount).toFixed(2)).toLocaleString()}`
 
export const getPreviousWorkDay = () => {
    let workday = moment();
    let day = workday.day();
    let diff = 1;  // returns yesterday
    if (day == 0 || day == 1){  // is Sunday or Monday
        diff = day + 2;  // returns Friday
    }
    return workday.subtract(diff, 'days').format('YYYY-MM-DD');
}