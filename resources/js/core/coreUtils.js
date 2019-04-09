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

export {isEmpty, createUrl, emptyFunction, checkEmail};