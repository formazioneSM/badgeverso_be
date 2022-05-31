let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let buttonChangePassword = document.getElementById('buttonChangePassword');
let formChangePass = document.getElementById('formChangePass');
let loading = document.getElementById('backdrop');
let link = document.getElementById('linkToHome');
let passwordChanged = document.getElementById('passwordChanged');
let errorPassword = document.getElementById('errorPassword');
let refresh = document.getElementById('refresh');
buttonChangePassword.setAttribute('disabled', true);
link.setAttribute('src', 'http://localhost:4200');
const refreshPage = () => {
    window.location.reload();
}
refresh.addEventListener('click', refreshPage);
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
    loading.style.visibility = 'visible';
    loading.style.pointerEvents = 'all';
    e.preventDefault();
    e.stopPropagation(); 
    axios.post(window.location.origin+window.location.pathname.replace('forgotPass', 'changePass'), {password: e.target.elements[0].value})
    .then((res) => {
        formChangePass.style.display = 'none';
        loading.style.visibility = 'hidden';
        loading.style.pointerEvents = 'none';
        passwordChanged.style.visibility = 'visible';
        passwordChanged.style.pointerEvents = 'all';
        
    }).catch(err => {
        formChangePass.style.display = 'none';
        errorPassword.style.visibility = 'visible';
        errorPassword.style.pointerEvents = 'all';
        loading.style.visibility = 'hidden';
        loading.style.pointerEvents = 'none';
        errorMessage.innerHTML = err.response.data.message;
    })
}) 

function reqListener () {
    console.log(this.responseText);
  }