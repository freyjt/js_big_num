

function driver( ) {

    var big = require('./js_big_num.js');
    var i;    
    
    //*******
    var num  = new big.BigNum( 10 );
    var num2 = new big.BigNum(  0 );
    assertEqual("0", num.multiply(num2).toString(), "asserting 0 = 0 in multiplication" );

    //*******
    num.convertString( 33 );
    num2.convertString( -33 );
    assertEqual("-1089", num.multiply(num2).toString(), "asserting -33 * 33 == -1089");
    
    //*******
    num.convertString( 33 );
    num2.convertString( 33 );
    assertEqual("1089", num.multiply(num2).toString(), "asserting 33 * 33 == 1089");

    //*******
    num.convertString( -33 );
    num2.convertString( -33 );
    assertEqual("1089", num.multiply(num2).toString(), "asserting -33 * -33 == 1089");

    //*******
    num.convertString( -10 );
    num2.convertString( 0 );
    assertEqual("0", num.multiply(num2).toString(), "asserting -10 * 0 = 0");
    //*******
    num.convertString( "-25" );
    num2.convertString( "5" );
    assertEqual("-5", num.divide( num2 ).toString(), "asserting -5 = -5 with division");

    //*******
    num.convertString( "537" );
    num2.convertString( "-5" );
    assertEqual("-107", num.divide(num2).toString(), "asserting 537/-5 = -107 with division");

    //*******
    num.convertString( "55" );
    assertEqual( "110", num.add(55).toString(), "asserting 110 == 110 with addition");

    //*******
    num.convertString("5017");
    num2.convertString("-5037");
    assertEqual( "-20", num.add(num2).toString(), "asserting -20 == -20 with addition");
}

driver();


function assertEqual( thingOne, thingTwo, testdescription ) {
    if( thingOne !== thingTwo ) {
        console.log("*******************");
        console.log("*******************");
        console.log("Test failed " + testdescription );
        console.log(thingOne + " and " + thingTwo + " are not the same thing.");
        console.log("*******************");
    } else {
        console.log("Test passed " + testdescription );
    }
}