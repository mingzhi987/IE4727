//Get the coefficient of the equation from the user

var a =prompt("What is the value of 'a'? \n", "");
var b =prompt("What is the value of 'b'?\n", "");
var c =prompt("What is the value of 'c'?\n", "");

//Compute the square root and the denominator of the result
var root_part = Math.sqrt(b*b -4.0*a*c);
var denom = 2.0 * a;

// compute and display the roots

var root1 = (-b +root_part) / denom;
var root2 = (-b - root_part) / denom;
document.write("THe first root is:", root1, "<br>");
document.write("The second root is:", root2, "<br>");