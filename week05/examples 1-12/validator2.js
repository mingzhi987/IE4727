function chkName(event) {
    var myName = event.currentTarget;

    var pos = myName.value.search(/^[A-Z][a-z]+, ?[A-Z][a-z]+ ?[A-Z]\.$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value + ") is not in the correct form. \n" +
        "The correct form is: " + "Last-name, First-name, Middle-initial. \n" +
        "First letters are capitalised");
    myName.focus();
    myName.select();
    }
}

function chkPhone(event){
    var myPhone = event.currentTarget;
    var pos = myPhone.value.search(/^\d{3}-\d{3}-\d{4}$/);

    if (pos != 0){
        alert("The phone number you entered (" +myPhone.value + ") is not in the correct form. \n" +
        "The correct form is: ddd-ddd-dddd \n" + "Please go back and fix your phone number");
        myPhone.focus();
        myPhone.select();
    }
}