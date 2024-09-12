function chkEmail(){
    var inputEmail = document.getElementById("email");
    var checkEmail = inputEmail.value.toString();
    const exp = /^[\w.-]+@(\w+\.){1,3}\w{2,3}$/;
    if (!exp.test(checkEmail)){
        alert('Your email is not correct');
        inputEmail.focus();
        inputEmail.Select();
        return false;
    }
    else return true;
}