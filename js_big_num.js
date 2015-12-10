

module.exports = { 
    BigNum: BigNum,
};

function BigNum( numberIn ) {

    this.binString = "";
    if( typeof(numberIn) !== 'undefined' ) {
        this.convertString( numberIn.toString() );
    }

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
        
        return stringOut;
    }


    //helper function, converts a string to a binary string
    // numberIn should never be > 45
    var arrBins     = []; //yup
    function convPlace( numberIn, lead ) {

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

//Returns string lsb in rightmost place
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
    if( remainder == 1 ) retStr += 1;
    return retStr;
}
BigNum.prototype.increment = function( ) {

    var remainder = 1; //incrementing by this many
    for(var i = 0; i < this.binString.length; i++) {
        present = parseInt(this.binString[i]) + remainder;
        if( present == 1 ) {
            //it's because of hackey stuff like this that you should be using an array
            this.binString = this.binString.substring(0, i) + "1" + this.binString.substring(i + 1);
            remainder      =  0 ;
            break;
        } else if( present == 2 ) {
            this.binString = this.binString.substring(0, i) + "0" + this.binString.substring(i + 1);
        }
    }
    if(remainder == 1) { this.binString += '1'; }
}
BigNum.prototype.decrement = function( ) {
    //flip all bits until we get to a one... and flip that
    var isZero = true;
    var i;
    for( i = 0; i < this.binString.length; i++) {
        if(this.binString[i] == '1') {
            isZero = false;
            break;
        }
    }
    if(isZero == false) {
        for( i = 0; i < this.binString.length; i++) {
            if(this.binString[i] == '1') {
                this.binString = this.binString.substring(0, i) + "0" + this.binString.substring(i + 1);
                break;
            } else {
                this.binString = this.binString.substring(0, i) + "1" + this.binString.substring(i + 1);
            }
        }
    } else { 
        //@TODO teach it zero
        // console.log("Error: cannot decrement past zero value yet.");
    }
    return !isZero;
}

// Returns raw string
BigNum.prototype.getBinString = function( ) {
    return this.binString;
}

//Once more robust typechecking is in place we can consolidate these to one 'overloaded'
// method
BigNum.prototype.addBigNum = function( BigNumIn ){
    //@TODO typecheck BigNumIn
    var stringIn   = BigNumIn.getBinString( );
    this.binString = this.addTwoBinStrings(this.binString, stringIn);
}
BigNum.prototype.addNumber = function(numberIn) {
    if( typeof(numberIn) === 'string' || typeof(numberIn) === 'number') {
        var locBig = new BigNum( numberIn.toString() ).getBinString();
        this.binString = this.addTwoBinStrings(this.binString, locBig);
    } else {
        console.log("Error: improper var passed to BigNum.addNumber, needs string or number.");
    }
}
BigNum.prototype.setBinString = function( binStringIn ) {
    var validString = true;
    if(typeof(binStringIn) !== 'string') {
        validString = false;
    }
    if(validString === true) {
        for(var i = 0; i < binStringIn.length; i++) {
            if(binStringIn[i] !== '0' && binStringIn[i] !== '1') {
                validString = false;
                break;
            } 
        }
    }
    if(validString == true) {
        this.binString = binStringIn;
    } else {
        console.log("Error: invalid string passed to BigNum.setBinString. String unchanged");
    }
}

//Multiply by either a string/number or a BigNum
BigNum.prototype.multiply = function(numberIn) {
    
    //@TODO instance check numberIn
    if(typeof(numberIn) === 'string' || typeof(numberIn) === 'number') {
        var times = new BigNum( numberIn );
    } else {
        var times = new BigNum(  );
        times.setBinString( numberIn.getBinString() );
    }
    var adder = this.getBinString();
    times.decrement(); //--returns false @ zero, so -1
    while( times.decrement() ){
        // console.log( "adding   " + this.binString  + ":" + adder);
        this.binString = this.addTwoBinStrings(this.binString, adder);
    }
} //END multiply

//returns (index) magnitude of most-significant on bit
// also strips off unused bits
BigNum.prototype.getMagnitude = function( ) {
    var mag = 0;
    for(var i = 0; i < this.binString.length; i++) {
        if( this.binString[i] === '1' ) { mag = i; }
    }
    this.binString = this.binString.substring(0, mag + 1);
    return mag;
} //END getMagnitude


//return 0 if two numbers are equal, -1 if the calling number is smaller
//  or 1 if the calling number is greater
BigNum.prototype.compare = function( numberIn ) {
    var indicator = 0;
    if(typeof(numberIn) == 'number' || typeof(numberIn) == 'string') {
        var compWith = new BigNum( numberIn );
    } else {
        var compWith = new BigNum( );
        compWith.setBinString( numberIn.getBinString() ); 
    }
    localMag   = this.getMagnitude();
    foreignMag = compWith.getMagnitude();
    if( localMag > foreignMag ) {
        indicator =  1;
    } else if( localMag < foreignMag ) {
        indicator = -1;
    } else {
        //magnitudes are equal, so we need to further discriminate
        //   ....
        var localString   = this.getBinString();
        var foreignString = compWith.getBinString();
        var localBit, foreignBit;
        for(var i = localMag; i >= 0; i--) {
            localBit   = parseInt( localString[i] );
            foreignBit = parseInt( foreignString[i]);
            if( localBit > foreignBit ) {
                indicator =  1;
                break;
            } else if( localBit < foreignBit ) {
                indicator = -1;
                break;
            }
        }        
    }
    return indicator;
} //END compare

//Integer division
BigNum.prototype.divide = function( divisor ) {
    var counter = new BigNum( 0 );

    //@TODO, this validation is in 3 methods so far.
    //  stop being a dummy ...also it needs to be more robust
    if(typeof(divisor) === 'number' || typeof(divisor) === 'string') {
        var div = new BigNum( divisor );
    } else {
        var div = new BigNum( );
        div.setBinString( divisor.getBinString() );
    }
    var tracker = new BigNum();
        tracker.setBinString( div.getBinString( ) );
    
    while( this.compare( div ) != -1) {
        counter.increment();
        div.addBigNum( tracker );
    }
    this.binString = counter.getBinString();
} //END divide