

function driver( ) {
    var string = "String";
    console.log(string.toString());
    var big = require('./js_big_num.js');
    //
    var num = new big.BigNum( 10 );
    var num2 = new big.BigNum(5);
    // num.addBigNum( num2 );
    // console.log(num.toStringBin());
    // num.addNumber( 5 );
    // console.log(num.toStringBin());
    // num.convertString('20');
    // console.log(num.toStringBin());
    // num.convertString('555');
    // console.log(num.toStringBin());
    // num.convertString('575960');
    // console.log(num.toStringBin());
    // num.convertString('8');
    // console.log(num.toStringBin());
    // num.convertString('0');
    // // for(var i = 0; i < 500; i++) {
    // //     console.log(num.toStringBin());
    // //     num.increment();
       
    // // }
    // num.convertString("500");
    // var counter = 0;
    // // while( num.decrement() == true) {
    // //     console.log(num.toStringBin());
    // //     counter += 1;
    // // }
    // console.log( counter);

    // num.convertString( 67 );
    // num.multiply( num2 );
    // console.log("mult: " + num.toStringBin() );
    console.log("Expect 1:  " + num.compare( num2 ));
    console.log("Expect -1: " + num2.compare( num ) );
    num.convertString(5);
    console.log("Expect 0: " + num2.compare(num) );
    console.log("Expect 0: " + num2.compare( 5 ) );
    num.convertString( 20 );
    num.divide( num2 );
    console.log( num.toStringBin() );
}

driver();