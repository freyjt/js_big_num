

module.exports = { 
    BigNum: BigNum,
};

function BigNum(   ) {

    this.binString = "";

}

//convert a string represented number to a binary string
BigNum.prototype.convertString = function( stringIn ) {
    
    //return binary string representation of number LSB -> MSB
    function binUnderTen( numberIn ) {
        var num = parseInt(numberIn);
        var i;
        var stringOut = "";
        for(i = 8; i >= 1; i /= 2) {  
            if(num / i > 0) { //this is very clearly not right
                stringOut = '1' + stringOut;
            } else { stringOut = '0' + stringOut; }
        }
        console.log("binUnderTen:  " + stringOut)
        return stringOut;
    }


    //helper function, converts a string to a binary string
    // numberIn should never be > 45
    function convPlace( numberIn, place ) {
        console.log("Call here");
        var locNum    = numberIn.toString();
        var len       = locNum.length;
        var numHolder = "";
        var i;
        for(i = len - 1; i >= 0; i--) {
            numHolder += locNum[i];
        }
        locNum = numHolder;
        // delete numHolder;
        
        var smallString = "";
        var largeString = "";
        var stringOut   = "";
        var intLocal  = 0;

        smallString = binUnderTen( parseInt(locNum[0]) );
        if( len > 1) {
            largeString = convPlace( parseInt( locNum.substring(1) ) * 5, 2 );
            console.log(largeString);
            largeString = '0' + largeString;
            //addStrings
            var maxLen  = (smallString.length > largeString.length) ? smallString.length : largeString.length;
            var carrier = 0;
            var one, two, summer;
            for( i = 0; i < maxLen; i++) {
                if(typeof(largeString[i]) !== 'undefined'){ one = parseInt(largeString[i]); }
                else                                      { one = 0;                        }
                if(typeof(smallString[i]) !== 'undefined'){ two = parseInt(smallString[i]); }
                else                                      { two = 0;                        }
                summer = one + two + carrier;
                if( summer == 0 || summer == 1 ) {
                    stringOut += summer.toString();
                    carrier = 0;
                } else if ( summer == 2 ) {
                    stringOut += '0';
                    carrier = 1;
                } else if ( summer == 3 ) {
                    stringOut += '1';
                    carrier = 1;
                } else {
                    console.log("ERROR: I don't know what happened, conversion algorithm is wrong.")
                }
            }
            if( carrier == 1 ) {
                stringOut += '1';
            }
        } else {
            stringOut = smallString;
        }
        return stringOut;
    }

    this.binString = convPlace( stringIn, 0);
}
BigNum.prototype.toStringBin  = function( ) {
    var retString = "";
    var i;
    for(i = this.binString.length - 1; i >= 0; i--) {
        retString += this.binString[i];
    }
    return retString;
}