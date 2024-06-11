
var LogInEmailAddress = document.getElementById('LogInEmailAddress');
var LogInPassword = document.getElementById('LogInPassword');
var SignUpEmailAddress = document.getElementById('SignUpEmailAddress');
var SignUpPassword = document.getElementById('SignUpPassword');
var SignUpName = document.getElementById('SignUpName');
var AllSignUps = [];
var pathparts = location.pathname.split('/');
var baseURL = '';
for (var i=0 ; i < pathparts.length-1 ; i++){
    baseURL += '/' + pathparts[i];
}


var userName = localStorage.getItem('requiredUserName');
if (userName) {
    document.getElementById('userName').innerHTML = "Welcome " + userName;
}



if (localStorage.getItem('users') == null){
    AllSignUps = [];
}
else {
    AllSignUps = JSON.parse(localStorage.getItem('users'));
}

function notFullDataToSignUp() {
    if (SignUpName.value == "" || SignUpEmailAddress.value == "" || SignUpPassword.value == "") {
        return true;
    }
    else {
        return false;
    }
}

function notFullDataToLogIn() {
    if (LogInEmailAddress.value == "" || LogInPassword.value == "") {
        return true;
    }
    else {
        return false;
    }
}

function EmailAddressAlreadyExisted() {
    for (var i = 0; i < AllSignUps.length; i++) {
        if (AllSignUps[i].email.toLowerCase() == SignUpEmailAddress.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}


function signUp() {
    if (notFullDataToSignUp()) {
        document.getElementById('checkSignUp').innerHTML = '<p class="text-danger m-2">All inputs are required</p>';
        return false;
    }
    var signUp = {
        name: SignUpName.value,
        email: SignUpEmailAddress.value,
        password: SignUpPassword.value,
    }
    if (EmailAddressAlreadyExisted()) {
        document.getElementById('checkSignUp').innerHTML = '<p class="text-danger m-2">Email Address is already existed!</p>';

    }
    else {
        AllSignUps.push(signUp);
        localStorage.setItem('users', JSON.stringify(AllSignUps));
        document.getElementById('checkSignUp').innerHTML = '<p class="text-success m-2">Success</p>';

    }
}

function logIn() {
    if (notFullDataToLogIn()) {
        document.getElementById('checkLogIn').innerHTML = '<p class="text-danger m-2">All inputs are required</p>';
        return false;
    }
    var email = LogInEmailAddress.value;
    var password = LogInPassword.value;
    for (var i = 0; i < AllSignUps.length; i++) {
        if (AllSignUps[i].email.toLowerCase() == email.toLowerCase() && AllSignUps[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('requiredUserName', AllSignUps[i].name);
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html');
            } else {
                location.replace(baseURL + '/home.html');
            }
        }
        else {
            document.getElementById('checkLogIn').innerHTML = '<p class="p-2 text-danger">Incorrect Email or Password</p>';
        }
    }
}


function logOut() {
    localStorage.removeItem('requiredUserName');
}


