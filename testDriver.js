

function driver( ) {

    var big = require('./js_big_num.js');
    var i;    
    
    //*******MULTIPLICATION
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
    



    //*******DIVISION
    num.convertString( "-25" );
    num2.convertString( "5" );
    assertEqual("-5", num.divide( num2 ).toString(), "asserting -5 = -5 with division");

    //*******
    num.convertString( "537" );
    num2.convertString( "-5" );
    assertEqual("-107", num.divide(num2).toString(), "asserting 537/-5 = -107 with division");

    //********
    num.convertString( "0" );
    num2.convertString( 20 );
    assertEqual("0", num.divide(num2).toString(), "asserting 0/20 == 0 with division");

    //********
    num.convertString( "-0" );
    num2.convertString( 20 );
    assertEqual("0", num.divide(num2).toString(), "asserting -0/20 == 0 with division");

    //********
    num.convertString("4");
    num2.convertString(0);
    assertEqual(null, num.divide(num2), "asserting 4/0 == null with division");

    //*********
    num.convertString('12');
    num2.convertString('3');
    assertEqual('4', num.divide(num2).toString(), "asserting 12/3 == 4");

    //*******ADDITION
    num.convertString( "55" );
    assertEqual( "110", num.add(55).toString(), "asserting 110 == 110 with addition");

    num.convertString("5017");
    num2.convertString("-5037");
    assertEqual( "-20", num.add(num2).toString(), "asserting -20 == -20 with addition");

    num.convertString("-50");
    num2.convertString("50");
    assertEqual( "0", num.add(num2).toString(), "asserting -50 + 50 == 0 with addition");

    num.convertString("50");
    num2.convertString(-50);
    assertEqual( "0", num.add(num2).toString(), "asserting 50 + -50 == 0 with addition");



    //******SUBTRACTION
    num.convertString(50);
    num2.convertString(50);
    assertEqual("0", num.minus(num2).tostring(), "asserting 50 - 50 == 0 with subtraction");

    //***COMPARISION
    num.convertString(100);
    num2.convertString(99);
    assertEqual(1, num.compare(num2), "asserting 100 is greater than 99");
    assertEqual(-1, num2.compare(num), "asserting 99 is less than 100");

    //**********
    num.convertString(-111);
    num2.convertString(99);
    assertEqual(-1, num.compare(num2), "asserting -111 is less than 99");
    assertEqual(1, num2.compare(num), "asserting 99 is greater than -111");
    assertEqual(0, num2.compare(num2), "asserting 99 is equal to 99");



    //*************INCREMENT/DECREMENT
    num.convertString( -2 );
    assertEqual(-1, num.increment(), "asserting return of incrementing negative is negative");
    assertEqual("-1", num.tostring(), "asserting result of inc on -2 is -1");
    assertEqual(0, num.increment(), "asserting return of inc on -1 is 0");
    assertEqual("0", num.toString(), "asserting reult of inc on -1 is 0");
    assertEqual(1, num.increment(), "asserting return of inc on 0 is positive");
    assertEqual("1", num.tostring(), "asserting result of inc on 0 is 1");

    ///******
    num.convertString( 2 );
    assertEqual(1, num.decrement(), "asserting return of decrementing 2 is postive");
    assertEqual("1", num.tostring(), "asserting result of decrementing 2 is 1");
    assertEqual(0, num.decrement(), "asserting return of decrementing 1 is 0");
    assertEqual("0", num.tostring(), "asserting result of decrementing 1 is 0");
    assertEqual(-1, num.decrement(), "asserting return of decrementing 0 is negative");
    assertEqual("-1", num.tostring(), "asserting result of decrementing 0 is -1");
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