

function driver( ) {

    var big = require('./js_big_num.js');
    //
    var num  = new big.BigNum( 10 );
    var num2 = new big.BigNum(  0 );
    var i;
    assertEqual("0", num.multiply(num2).toString(), "asserting 0 = 0 in multiplication" );
}

driver();


function assertEqual( thingOne, thingTwo, testdescription ) {
    if( thingOne !== thingTwo ) {
        console.log("Test failed " + testdescription );
        console.log(thingOne + " and " + thingTwo + " are not the same thing.");
    } else {
        console.log("Test passed " + testdescription );
    }
}