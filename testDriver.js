

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
    console.log( "+++++++++++++++++++++++++++++++++++++++++MULT");
    numOne.add( 15 );
    asserEqual( '+0', numOne.toStringBin( ), "addition test -15 + 15");
    numOne.convertString( '12345 ');
    numTwo.convertString( '5' );
    numOne.divide( numTwo );
    console.log("expect 2049 == 100000000001 -> " + numOne.toStringBin() );
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