

function driver( ) {

    var big = require('./js_big_num.js');
    //
    var num  = new big.BigNum( 10 );
    var num2 = new big.BigNum(5);
    var i;
    //Test increment and decrement
    var numOne = new big.BigNum( 0 );
    console.log( numOne.toStringBin() );

    for(i = 0; i < 50; i++) {
        console.log(-i + ":  " + numOne.toStringBin( ) );
        numOne.decrement();

    }
    console.log("**************************************");
    for(i = 0; i < 100; i++ ) {
        numOne.increment();
        console.log((-49 + i) + ": " + numOne.toStringBin( ) );
    }
    console.log("++++++New Test +++++++++++++++++++++++");
    numTwo = new big.BigNum( );
    numOne.convertString(5);
    numTwo.convertString(20);

    numOne.minus( numTwo );
    console.log( "-15 " + numOne.toStringBin( ) + ": 20 " + numTwo.toStringBin( ));
    numOne.minus( -20 );
    console.log( "+5 " + numOne.toStringBin( ) );
    numOne.add( 15 );
    console.log( "20 " + numOne.toStringBin() );
    console.log("**********test Add***********************");
    numOne.convertString("-0");
    numOne.add( 5 );
    assertEqual('+101', numOne.toStringBin(), "addition  test -0 + 5" )
    numOne.add( -20 );
    assertEqual( '-1111' , numOne.toStringBin(), "addition test 5 + -20");
    numOne.add( 15 );
    assertEqual( '+0', numOne.toStringBin( ), "addition test -15 + 15");
    console.log( "+++++++++++++++++++++++++++++++++++++++++MULT");


    console.log("====Divide===========999999999999999999999")
    numOne.convertString( '125' );

    numTwo.convertString( '5' );
    numOne.divide( numTwo );
    assertEqual("+11001", numOne.toStringBin(), 'divide 125 by 5' );
    numOne.convertString('12345');
    asserter = numOne.toStringBin();
    console.log(asserter);
    numOne.divide( 5 );
    console.log("expect 2469 == 100101110101 -> " + numOne.toStringBin() );
    console.log("break to see where debugging statements start");
    console.log( numOne.toStringBin() + " " + numOne.toString() );
    numOne.convertString('-555')
    assertEqual( '-555', numOne.toString(), "Testing tostring -555 == -555");
    asserter = (9007199254740991).toString(); //max safe
    asserter += '0';
    console.log(asserter);
    numOne.convertString( asserter );
    console.log( "con done..." );
    assertEqual( asserter, numOne.toString(), "BiiiiiiigNum test" );
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