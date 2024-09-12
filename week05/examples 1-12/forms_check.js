function tst_phone_num(num) {
    var ok = num.search(/^\d(3)-\d(4)$/);

    if (ok == 0)
        return true;
    else
        return false;
}
var tst = tst_phone_num("444-5432");
if(tst)
    document.write("444-5432 is a valid phone number <br />");
else
    document.write("Program error <br />");

tst = tst_phone_num("444-r432");
if (tst)
    document.write("Program error <br />");
else
    document.write("444-r432 is not a valid phone number <br />");

tst = tst_phone_num("44-1234");
if (tst)
    document.write("Program error <br />");
else
    document.write("44-1234 is not a valid phone number <br />");