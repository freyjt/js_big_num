

module.exports = { 
    BigNum: BigNum,
};



 //                                                                          ..M:                      
 //                                      7M+.                           7MM. .MMM                      
 //    ..     ..    .             ...    MMM    . ..  ..   .    .    . .MMM .  ..       .   .... .  .  
 // . MMMMM . MMMMMMI  MM+MMMMM..MMMMMM.MMMMMM MM=MMM MM   ,MM  .MMMMM MMMMMM =MM   MMMMMMI  MMMMMMMM. 
 // .MM   .. MM .  MM  MMM   MM  MM      MMM   MMM    MM   ,MM .MM      MMM   =MM  MM..  MM  MMM   MM. 
 //  MM      MM   .MM. MMM   MM  .MMMM.  MMM   MMM    MM   ,MM ,MM.     MMM   =MM ,MM   .MM. MMI   MM  
 //  MM      MM .  MM  MMM   MM   .. MM  MMM   MMM    MM   OMM  MM      MMM   =MM. MM    MM  MMI   MM  
 // .ZMMMMM .7MMMMMM~  MMM   MM  MMMMMM ..MMMM MMM    +MMMMMMM .OMMMMM ..MMMM =MM  7MMMMMM~  MMI   MM  
 //     ,       ..                 :                    .          :.                ...               
                                                                                                    
                                                                                                    
 //                                                                                     GlassGiant.com

function BigNum( numberIn ) {

    this.binString  = "";
    //keep false for positive values
    // true from negative.
    // ***NOTE cannot use two's complement
    //  to store because the magnitude of the number
    //  can grow indefinitely; so we do this, and then store magnitude
    //  from zero in this.binString
    this.negative   = false;

    if( typeof(numberIn) !== 'undefined' ) {
        this.convertString( numberIn.toString() );
    } else if( numberIn instanceof BigNum ) {
        this.copy( numberIn );
    }

}
BigNum.prototype.copy = function( BigNumIn ) {
    if( !(BigNumIn instanceof BigNum) ) {
        console.log( "Error in BigNum.copy, cannot copy object if not BigNum.");
    } else {
        this.setBinString( BigNumIn.getBinString() );
        this.setNegativity( BigNumIn.getNegativity() );
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

    stringIn = stringIn.toString();
    //determine negativity of string input
    if(stringIn[0] === '-') {
        this.setNegativity( true );
        stringIn = stringIn.substring(1);

        //@TODO: NO PARSEINT
        if(parseInt( stringIn ) === 0 ) {
            this.setNegativity( false );
        }
    } else {
        this.negative = false;
    }
    //bootstrap a single digit number
    if( stringIn.length === 1 ) {
        this.setBinString( binUnderTen( stringIn ) );
    } else {
        
        var arrBins     = []; //yup
        var fronter     = '';
        var multiplier  = new BigNum('1');
        var toBeSet     = new BigNum('1');
        var pusher;
        for( i = stringIn.length - 1; i >= 0; i--) {

            //@TODO SOOOO Slow. There are gains to be made
            // by switching tobeset and multiplier but we need to
            // return objects from multiply (and other operations 
            // for consistency)
            if(stringIn[i] !== '0') {


                toBeSet.setBinString( binUnderTen( stringIn[i] ) );
                
                toBeSet = toBeSet.multiply( multiplier );
                
                pusher  = fronter + toBeSet.getBinString();

                arrBins.push( pusher );
            }
            fronter    += '0';
            multiplier  = multiplier.multiply( 5 );

        }
    
        var stringRep = "0";
        var i;
        for(i = 0; i < arrBins.length; i++) {
            stringRep = this.addTwoBinStrings(stringRep, arrBins[i]);
        }

        this.setBinString( stringRep );
    }

} // END convertString



                                                                                
 // .MMM                    MMM                                                    
 //  MMM                    MMM                                                    
 //  MMM  ,,         ,      MMM       .,         ,.         .,     ,               
 //  MMMMMMMMM    MMMMMMM   MMM  ~MMMMMMMM:.  MMMMMMM  .=MMMMMM.MMMMMMI            
 //  MMM,...MM   MM,   MMM  MMM  =MMM  .MMM .MMM   ?MM. =MMM..  MM  .  .           
 //  MMM    MM   MMMMMMMMM  MMM  =MM.   MMM  MMMMMMMMM  =MM.    OMMMM+             
 //  MMM    MM  .MM..   . . MMM  =MM    MMM .MM:     .. =MM      . MMMM.           
 //  MMM    MM  .MMM     .  MMM  =MMM+ OMMM  MMM.   .I  =MM     I   MMM.           
 //  MMM    MM   .MMMMMMM.  MMM  =MM MMMM7 .. $MMMMMMO  =MM     MMMMMM.            
 //     .  ..  .  .  .  .. .   . =MM .. .        .         .         .             
 //                              =MM                                               
 //                                 .                                              
                                                                                
 //                                                                 GlassGiant.com


//Adds two binary numbers with lsb in leftmost place (like this.binString)
// used as a helper in multiplication and addition
// *ignores negativity as these strings do not have sign bits
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
    if( remainder == 1 ) retStr += '1';

    return retStr;
} //END addTwoBinStrings


//Subtracts two binary strings of the form lsb on left
// used as a helper in subtraction and addition
BigNum.prototype.subtractTwoBinStrings = function(strOne, strTwo) {
    var maxLen = (strOne.length > strTwo.length) ? strOne.length : strTwo.length;
    var i = 0;
    var locTwo = '';
    for(i = 0; i < strTwo.length; i++ ) {
        if(strTwo[i] == '1') { locTwo += '0'; }
        else { locTwo += '1'; }
    }
    var strTwo = new BigNum();
        strTwo.setBinString( locTwo );
        strTwo.increment(); 
        locTwo = strTwo.getBinString(); //now we have the two's compliment of strTwo
    var remainder = 0;
    var added;
    var retString = strOne; //because we want to preserve what's not in locTwo

    for(i = 0; i < locTwo.length; i++ ) {
        added = 0;
        if(typeof(strOne[i]) !== 'undefined') { added += parseInt(strOne[i]); }
        added += parseInt(locTwo[i]) + remainder;
        
        if( added === 0 || added === 1 ) {
            retString = retString.substring(0, i) + added.toString() + retString.substring(i + 1);
            remainder = 0;
        } else if( added === 2 ) {
            retString = retString.substring(0, i) + '0' + retString.substring(i + 1);
            remainder = 1;
        } else { //assume added === 3 now
            retString = retString.substring(0, i) + '1' + retString.substring(i + 1);
            remainder = 1;
        }
    } //now we ignore remainder instead of punch it on
    //@todo, uncompliment the string. 2s complement is not good for this
    //  but, you know, it works.
    //avoiding object creation first decrement

    for(i = 0; i < retString.length; i++) {
        
        if(retString[i] === '0' ) {
            retString = retString.substring(0, i) + '1' + retString.substring(i + 1);
            
        } else {
            retString = retString.substring(0, i) + '0' + retString.substring(i + 1);
            break;   
        }
    } if( i === retString.length ) retString += '1'; //@TODO, look at this with fresh eyes

    for(i = 0; i < retString.length; i++) {
        
        if(retString[i] === '0') {
            retString = retString.substring(0, i) + '1' + retString.substring(i + 1); 
        } else {
            retString = retString.substring(0, i) + '0' + retString.substring(i + 1);     
        }

    }
    return retString;
}// END subtractTwoBinStrings


//Increment this object by a single number
// @return 
//    -1 if result is a negative value
//     0 if result is 0
//     1 if result is a positive value
BigNum.prototype.increment = function( ) {
    //increase magnitude of binString iff
    // object is non-negative
    var retValue;
    if(this.negative === false ) {
        this.increaseMagnitude( );
        retValue = 1;
    } else {
        this.decreaseMagnitude( );
        retValue = -1;
        var isZero = true;
        var i;
        //determine if result is zero
        for( i = 0; i < this.binString.length; i++) {
            if(this.binString[i] === '1') {
                isZero = false;
                break;
            }
        }
        if(isZero === true) { 
            this.binString = '0';
            retValue      = 0;
            this.negative = false; 
        }
    }
    return retValue;
} // END increment

//Increment this object by a single number
// @return 
//    -1 if result is a negative value
//     0 if result is 0
//     1 if result is a positive value
BigNum.prototype.decrement = function( ) {
    var retValue = 0;
    if(this.negative === true) {
        this.increaseMagnitude();
        retValue = -1;
    } else {
        this.decreaseMagnitude();
        //Some explanation.
        // If the binString starts from zero,
        // we can be certain that the decrementer
        // will completely fill the string (to whatever)
        // magnitude with 1s (even if only 1 bit)
        //  keep in mind, this is strongly bound to
        //  decreaseMagnitude()
        // so, we check for the presence of ANY zeroes
        // when we find them, we know this number should be
        //  -1
        var highestOrder = true;
        var isZero       = true;
        var i;
        for(i = 0; i < this.binString.length; i++ ) {
            if(this.binString[i] !== '1') {
                highestOrder = false;
            } else {
                isZero       = false;
            }
            if(highestOrder === false && isZero === false) {
                break;
            }
        }
        if( highestOrder === true ) {
            this.binString = '1';
            this.negative  = true;
            retValue       =   -1;
        } else if(isZero == false) {
            retValue = 1;
        } else {
            retValue = 0;
        }
    }
    return retValue;
}//END decrement

//Increase and decrease magnitude are both helper functions
// for increment and decrement.
// The change this.binString to be one less or one more
//  in magnitude from zero
BigNum.prototype.increaseMagnitude = function( ) {
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
BigNum.prototype.decreaseMagnitude = function( ) {
    for( i = 0; i < this.binString.length; i++) {
        if(this.binString[i] == '1') {
            this.binString = this.binString.substring(0, i) + "0" + this.binString.substring(i + 1);
            break;
        } else {
            this.binString = this.binString.substring(0, i) + "1" + this.binString.substring(i + 1);
        }
    }
} //END increase/decreaseMagnitude


// Returns raw string
BigNum.prototype.getBinString  = function( ) {
    return this.binString;
} //END getBinString
BigNum.prototype.getNegativity = function( ) {
    return this.negative;
}



//Checks an input string for validity and then sets the bin string
// of the current objet
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
}//END setBinString

//Checks an input bool for validity and then sets the negativity
// of the calling object
BigNum.prototype.setNegativity = function( boolIn ) {
    if( typeof(boolIn) !== 'boolean') {
        console.log( "Error in BigNum.setNegativity, can only set off boolean value, true = negative.");
    } else {
        this.negative = boolIn;
    }
} //End setNegativity


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

//return 0 if two magnitudes are equal, -1 if the calling number is smaller
//  or 1 if the calling number is greater
BigNum.prototype.compareMagnitude = function( numberIn ) {
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





//                        ,MM                 .                                    
//                         I.                 MM                                   
//     .....        ..          .      ..   . MM  .      ..          ...       . . 
//  .MM MMMMMM    MM MMMM  MM    M MMMMMM.  MMMMMMM.   MMMMMMM .  MM MMMM  MMMMMM  
//  .MMM    MMM   MMM.     MM    MM,   =MM.   MM      MM     MM   MMM     MM.      
//  .MM.    .MM   MM       MM    MI     MM.   MM     MM.     MM   MM .    MMM. .   
//  .MM.     MM   MM       MM    MI     MM    MM     MMMMMMMMMM   MM      ..MMMM   
//  .MM    ..MM.  MM       MM    MI     MM    MM     MM           MM          .MMO 
//  .MMM . .MM$.  MM       MM    MI     MM    MM.    .MM       .  MM      .     MM 
//  .MM,MMMMMM    MM       MM    MI     MM     MMMM   .MMMMMMMM.  MM     .MMMMMMM  
//  .MM  ..      .        . .   . .     . .    .....     . ...   . .      . .  .   
// ..MM.                                                                        ...
// ..MM  .  .  .. .. .. ..  .  .  .  .. .. .. ..  .  .  .  .. .. .. ..  .  .  . ...
                                                                                
//                                                                  GlassGiant.com

//Print this object as a decimal string;
BigNum.prototype.toString = function( ) {
    //returns string representation
    // of decimal value of a single bit
    // to a given magnitude
    // ONLY call when

    //@Note to self: keep in lsb left until
    // end, then flip it around
    getDecString(5);
    function getDecString( mag ) {
        // 3 layers.
        function doubleDec( str ) {
            var ret = addDecStrings( str, str);
            return ret;
        }
        var k;   //keeping it real
        var bigVal = '2'; //doubler
        if( mag === 0 ) { returner = '1'; }
        else {
            for(k = 1; k < mag; k++) {
                bigVal = doubleDec( bigVal );

            }
            returner = bigVal;
        }
        return returner;
    }
    function addDecStrings( one, two) {
        var remainder = 0;
        var maxLen    = (one.length > two.length)?one.length:two.length;
        var i, total, oDig, tDig;
        var retStr = "";
        for(i = 0; i < maxLen; i++) {

            total = 0;
            if(typeof(one[i]) !== 'undefined') {
                total += parseInt(one[i]);
            }
            if(typeof(two[i]) !== 'undefined') {
                total += parseInt(two[i]);
            }
            total += remainder;

            total = total.toString();
            //total.length can only be 1 or 2
            // (between 0 and 27)
            //string ops instead of division ops
            // you might want to find out which is faster
            if(total.length === 1){
                retStr    += total;
                remainder  = 0;
            }
            else {
                retStr    += total[1];
                remainder  = parseInt(total[0]);
            }
        } 
        if(remainder > 0) {
            retStr += remainder.toString();
        }
        return retStr;
    }

    var strings = []; 
    var bin     = this.getBinString();
    var i;
    var pusher = "";
    for(i = 0; i < bin.length; i++) {
        if(bin[i] === '1') {
            pusher = getDecString( i );
            strings.push( pusher );
        }
    }
    var added = "0"; //print zero strings
    //@TODO this can grow logarithmically
    for(i = 0; i < strings.length; i++) {
        added = addDecStrings( added, strings[i] );
    }
    var outString = "";
    if(this.getNegativity() === true) {
        outString += '-';
    }
    for(i = added.length - 1; i >= 0; i--){
        outString += added[i];
    }
    return outString;
}
      
//Returns string lsb in rightmost place
//   and '-' sign iff negative
BigNum.prototype.toStringBin  = function( ) {
    var retString = "";
    var i;
    var firstOne = false;
    if(this.negative == true) {
        retString += '-';
    } else {
        retString += '+';
    }
    for(i = this.binString.length - 1; i >= 0; i--) {
        if( firstOne === false && this.binString[i] === '1') {
            retString += this.binString[i];
            firstOne = true;
        } else if(firstOne === true) {
            retString += this.binString[i]
        }
    }
    //see if number is 0
    if(firstOne === false) { retString += 0; }
    return retString;
} //End toStringBin




                                                               
//                                              I=.  MMM                           
//   ..  .        ..      ..      . .   .       MM.   .       ..   ..  ..     ...  
//  :MMMMMM   MIMMMMM   MMMMMM  MMMMM.?MMMMMM IMMMMM.~MM  MMMMMMM  =M+MMMM+  MMMMM.
// .MM   $MM  MM.  MM..MM   MM  MMM.   .  .MM   MM   =MM ,MM   MMM =MM.  MM. MM    
// ,MM    MM  MM   MM=.MMMMMMM. MM    .MMMMMM   MM   =MM MMM   IMM.=MM   MM. .MMMM.
//  MM   MMM  MM.. MM  MM       MM    MM.  MM   MM   =MM  MM...MM..=MM   MM.  . MM~
//   MMMMM+   MMMMMM    MMMMMM  MM    :MMMMMM  .MMMM.=MM  :MMMMM   =MM   MM. MMMMM 
//   ...      MM ..      . .. . ...     . ..     ..  ..     .         . . . .. ..  
//           .MM                                                                   
                                                                                
//                                                                  GlassGiant.com

//@TODO add exit on error
BigNum.prototype.add = function( numberIn ) {
    var adder;
    var typePass = false;
    var retObject;
    if(typeof(numberIn) === 'number' || typeof(numberIn) === 'string') {
        adder = new BigNum( numberIn );
        typePass = true;
    } else if( numberIn instanceof BigNum ) {
        adder = new BigNum();
        adder.copy(numberIn);
        typePass = true;
    } else { 
        console.log("Error in BigNum.add, cannot subtract type passed");
    }
    if(typePass === true) {
        adder.setNegativity( !adder.getNegativity() );
        retObject = this.minus( adder ); //you wrote it, do it 
    } else {
        retObject = null;
    }
    return retObject;
} //END add

// @todo add exit on error
// @todo, this may be the ugliest thing you've ever written
BigNum.prototype.minus         = function( numberIn ) {
    var retObject = new BigNum(  );
    var subtrahend;
    var typePass = false;
    if(typeof(numberIn) === 'number' || typeof(numberIn) === 'string') {
        subtrahend = new BigNum( numberIn );
        typePass = true;
    } else if( numberIn instanceof BigNum ) {
        subtrahend = new BigNum();
        subtrahend.copy(numberIn);
        typePass = true;
    } else { 
        console.log("Error in BigNum.minus, cannot subtract type passed");
    }
    if(typePass === true) {
        //this is a mult thingy
        var negAdder = 0;
        if( this.getNegativity()       === true ) { negAdder += 1; }
        if( subtrahend.getNegativity() === true ) { negAdder += 1; }
        var comp = this.compareMagnitude( subtrahend );

        if( this.getNegativity() === true && subtrahend.getNegativity() === true ) {
            
            if( comp === 0) //both same negative value result is 0
                retObject.setNegativity( false );
            else if( comp === 1) //both negative, this greater
                retObject.setNegativity( true );
            else //if comp === -1 //both negative, this lesser
                retObject.setNegativity( false );

            retObject.setBinString( 
                this.subtractTwoBinStrings(this.getBinString(), subtrahend.getBinString() ) 
            );

        } else if(this.getNegativity() === true && subtrahend.getNegativity() === false ) {
            /* negative and subtracting a positive */
            retObject.setNegativity( true );

            retObject.setBinString(
                this.addTwoBinStrings(this.getBinString(), subtrahend.getBinString() )
            );
            
        } else if(this.getNegativity() === false && subtrahend.getNegativity() === true) {
            /* not negative and subtracting a negative */ 
            retObject.setNegativity( false );

            retObject.setBinString(
                this.addTwoBinStrings(this.getBinString(), subtrahend.getBinString() )
            );

        } else {
            if( comp === 0 ) { // have same magnitude both positive --zero result
                retObject.setNegativity( false );
            } else if( comp === 1 ) {// both positive, this larger --pos result
                retObject.setNegativity( false );
            } else { retObject.setNegativity( true ); }
            retObject.setBinString( 
                this.subtractTwoBinStrings( this.getBinString(), subtrahend.getBinString() ) 
            );  
        }
    }
    else {
        retObject = null;
    }
    return retObject;
}

//Multiply by either a string/number or a BigNum
BigNum.prototype.multiply = function(numberIn) {
    var retObject = new BigNum( );
    var goodInput = false;
    if(typeof(numberIn) === 'string' || typeof(numberIn) === 'number') {
        var times = new BigNum( numberIn );
        goodInput = true;
    } else if (numberIn instanceof BigNum) {
        var times = new BigNum(  );
        times.copy( numberIn );
        goodInput = true;
    } 
    if(goodInput === true) {
        //check if result is pos/neg
        var negMult = 0;
        if( times.getNegativity() === true ) { negMult += 1; }
        if( this.getNegativity()  === true ) { negMult += 1; }
        if( negMult % 2 === 0 ) { retObject.setNegativity( false ); }
        else                    { retObject.setNegativity( true  ); }

        var adders = [];
        var store  = '0';
        var left   = this.getBinString();
        var right  = times.getBinString();

        while( right.length > 0 ) {
            store = right[0];
            if( store === '1' ) {
                adders.push( left );
            }
            left  = '0' + left; // left shift
            right = right.substring(1); // r shift
        }

        var i;
        store = '0'; //reuse, zero to easier allow multiplying by zero
        for(i = 0; i < adders.length; i++) {
            store = this.addTwoBinStrings( store, adders[i] );
        }
        retObject.setBinString( store );
    } else { 
        retObject = null;
        console.log("Error: Cannot multiply BigNum by given object, returning null.");
    }

    return retObject;
} //END multiply



//Integer division
BigNum.prototype.divide = function( divisor ) {

    var trueCounter = 0;
    var counter     = new BigNum( 0 ); //return objcet

    var goodInput   = false;
    //@TODO, this validation is in 3 methods so far.
    //  stop being a dummy ...also it needs to be more robust
    if(typeof(divisor) === 'number' || typeof(divisor) === 'string') {
        var div = new BigNum( divisor );
        goodInput = true;
    } else if( divisor instanceof BigNum) {
        var div = new BigNum( );
        div.copy( divisor );
        goodInput = true;
    }

    if( div.compareMagnitude( 0 ) === 0 ) {
        goodInput = false;
    }

    if(goodInput === true) {

        var ender = new BigNum(0);
            ender.setBinString( this.getBinString() );
        var tracker = new BigNum( div );

        while( div.compareMagnitude( ender ) < 1 ) {
            counter.increment( ); //counter +0 starting, this works
            div = div.add( tracker );
        }

        //determine negativity of number
        var negCounter = 0;
        if( this.getNegativity() === true ) { negCounter += 1; }
        if( div.getNegativity()  === true ) { negCounter += 1; }
        if( negCounter % 2 === 0 ) {
            counter.setNegativity( false );
        } else {
            counter.setNegativity( true  );
        }
        
    } else {
        console.log( "Unable to divide, returning null");
        counter = null;
    }

    return counter;
} //END divide 
