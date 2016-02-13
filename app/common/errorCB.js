'use strict';

exports.showError = function showError(error) {
    showErrorHandle(error);
}

function showErrorHandle(error) {
    var title = '出错了···';
    var message;
    switch (error.code) {
        case "ENOTFOUND":
            message = '好像···断网了··· :(';
            break;
    
        default:
            message = '咦，这个错误没捕捉，不知道什么问题  :P';
            console.log(error);
            break;
    }
    toastr.error(message, title);
}