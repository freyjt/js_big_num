



function BigNum(   ) {

    this.binString = "";

}

//convert a string represented number to a binary string
BigNum.prototype.convertString = function( stringIn ) {
    

    //helper function, converts a string to a binary string
    // numberIn should never be > 45
    function convPlace( numberIn, place ) {
        var locNum    = numberIn.toString();
        var len       = locNum.length;
        var numHolder = "";
        var i;
        for(i = len - 1; i >= 0; i--) {
            numHolder += locNum[i];
        }
        locNum = numHolder;
        // delete numHolder;
        
        var placesArr = [];
        var stringOut = "";
        var intLocal  = 0;
        for(i = 0; i < len; i++) {
            intLocal = parseInt(locNum[i]);
            if(i > 0) {
                placesArr.push(intLocal * 5, i);
            } else {
                //at this point we have a dec value
                // strictly less than 10, this can be
                // accomplished with ifs, or a loop

            }
        }
        //add places before adding arrays
    }


}