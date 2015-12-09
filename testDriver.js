

function driver( ) {
    var string = "String";
    console.log(string.toString());
    var big = require('./js_big_num.js');
    //
    var num = new big.BigNum( );
    num.convertString('20');
    console.log(num.toStringBin());
    num.convertString('555');
    console.log(num.toStringBin());
    num.convertString('575960');
    console.log(num.toStringBin());
    num.convertString('8');
    console.log(num.toStringBin());
    num.convertString('0');
    for(var i = 0; i < 500; i++) {
        console.log(num.toStringBin());
        num.increment();
       
    }
    num.convertString("500");
    var counter = 0;
    while( num.decrement() == true) {
        console.log(num.toStringBin());
        counter += 1;
    }
    console.log( counter);
}

driver();