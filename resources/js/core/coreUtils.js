import moment from 'moment';


function isEmpty(value){
    if (value === null || value === '' || value === undefined ){
        return true;
    }
    else {
        return false;
    }
}

function emptyFunction () {
    return;
}


function checkEmail (value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

function createUrl (settings, url) {
    return settings['serverProtocol'] + '://' + settings['serverHost'] + ':' + settings['serverPort'] + url;
    //return url;
}

function formatDate(date) {

    const dateFormat = 'DD.MM.YYYY';
    let correctDate = !date ? {} : date;

    if (!correctDate.hasOwnProperty('day')) {
        return null;
    }

    const correctDay = correctDate['day'] < 10 ? String('0' + correctDate['day']) : String(correctDate['day']);
    const correctMonth = correctDate['month'] < 10 ? String('0' + correctDate['month']) : String(correctDate['month']);
    const correctYear = String(correctDate['year']);

    return moment(correctDay + '.' + correctMonth + '.' + correctYear, dateFormat);
}

function formatRawDate(inputDate) {
    
    if (!inputDate) {
        return null;
    }

    return {
        year: inputDate.getFullYear(),
        month: inputDate.getMonth() + 1,
        day: inputDate.getDate()
    };
}

export {isEmpty, createUrl, emptyFunction, checkEmail, formatDate, formatRawDate};