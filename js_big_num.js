

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
            if(Math.floor(num / i) > 0) { 
                stringOut  = '1' + stringOut;
                num       -= i;
            } else { stringOut = '0' + stringOut; }
        }
        console.log("binUnderTen:   " + numberIn + " : " + stringOut);
        return stringOut;
    }


    //helper function, converts a string to a binary string
    // numberIn should never be > 45
    var arrBins     = []; //yup
    function convPlace( numberIn, lead ) {
        console.log("Call here");
        var locNum    = numberIn.toString();
        var len       = locNum.length;


        // delete numHolder    
        var stringOut   = "";
        // pick out last digit
        var lastDigi = locNum[len - 1];
        arrBins.push( lead + binUnderTen(lastDigi) );

        if( len > 1 ) {
            var sub = parseInt(locNum.substring(0, len - 1));
            convPlace(sub * 5, '0' + lead );
        }
    }

    convPlace( stringIn, '');

    var stringRep = "";
    var i;
    for(i = 0; i < arrBins.length; i++) {
        stringRep = this.addTwoBinStrings(stringRep, arrBins[i]);
    }
    this.binString = stringRep;
}
BigNum.prototype.toStringBin  = function( ) {
    var retString = "";
    var i;
    for(i = this.binString.length - 1; i >= 0; i--) {
        retString += this.binString[i];
    }
    return retString;
}
BigNum.prototype.addTwoBinStrings = function(strOne, strTwo) {
    var maxLen = (strOne.length > strTwo.length) ? strOne.length : strTwo.length;
    var i = 0;
    var one, two, summer;
    var remainder = 0;
    var retStr    = ""
    for(i = 0; i < maxLen; i++) {
        if(typeof(strOne[i]) !== 'undefined') { one = parseInt(strOne[i]); }
        else                                  { one = 0;                   }
        if(typeof(strTwo[i]) !== 'undefined') { two = parseInt(strTwo[i]); }
        else                                  { two = 0;                   }
        summer = remainder + one + two;
        if( summer == 0 || summer == 1) {
            retStr    += summer;
            remainder  = 0;
        } else if (summer == 2) {
            retStr    += 0;
            remainder  = 1;
        } else if( summer == 3) {
            retStr    += 1;
            remainder  = 1;
        }
    }
    return retStr;
}