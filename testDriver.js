

function driver( ) {
    var string = "String";
    console.log(string.toString());
    var big = require('./js_big_num.js');
    //
    var num = new big.BigNum( );
    num.convertString('20');
    console.log(num.toStringBin());

}

driver();