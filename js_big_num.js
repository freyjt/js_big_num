



function BigNum(   ) {

    this.binString = "";

}

//convert a string represented number to a binary string
BigNum.prototype.convertString = function( stringIn ) {
    

    //helper function, converts a number to a binary string
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
        for(i = 0; i < len; i++) {
            


        }

    }


}