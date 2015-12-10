

function driver( ) {

    var big = require('./js_big_num.js');
    //
    var num  = new big.BigNum( 10 );
    var num2 = new big.BigNum(5);

    //Test increment and decrement
    var numOne = new big.BigNum( 0 );
    console.log( numOne.toStringBin() );
}

driver();