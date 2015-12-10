

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
    console.log("**************************************") 
    for(i = 0; i < 100; i++ ) {
        numOne.increment();
        console.log((-49 + i) + ": " + numOne.toStringBin( ) );
    }
}

driver();