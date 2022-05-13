let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let buttonChangePassword = document.getElementById('buttonChangePassword');
let formChangePass = document.getElementById('formChangePass');
buttonChangePassword.setAttribute('disabled', true);
confirmPassword.addEventListener('input', (e) => {
    let value = e.target.value;
    if(value !== '' && password.value !== '' && value === password.value && Array.prototype.slice.call(formChangePass.elements).every(e => e.checkValidity())){
        buttonChangePassword.removeAttribute('disabled')   
    }else{
        buttonChangePassword.setAttribute('disabled', true);
    }
})
password.addEventListener('input', (e) => {
    let value = e.target.value;
    if(value !== '' && confirmPassword.value !== '' && value === confirmPassword.value && Array.prototype.slice.call(formChangePass.elements).every(e => e.checkValidity())){
        buttonChangePassword.removeAttribute('disabled')   
    }else{
        buttonChangePassword.setAttribute('disabled', true);
    }
})
formChangePass.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    axios.post(window.location.origin+window.location.pathname.replace('forgotPass', 'changePass'), {password: e.target.elements[0].value})
    .then(console.log)
}) 

function reqListener () {
    console.log(this.responseText);
  }