

function driver( ) {

    var big = require('./js_big_num.js');
    var i;    
    
    //*******MULTIPLICATION
    var num  = new big.BigNum( 10 );
    var num2 = new big.BigNum(  0 );
    assertEqual("0", num.multiply(num2).toString(), "asserting 0 = 0 in multiplication" );

    //*******
    num.convertString( 33 );
    num2.convertString( -33 );
    assertEqual("-1089", num.multiply(num2).toString(), "asserting -33 * 33 == -1089");
    
    //*******
    num.convertString( 33 );
    num2.convertString( 33 );
    assertEqual("1089", num.multiply(num2).toString(), "asserting 33 * 33 == 1089");

    //*******
    num.convertString( -33 );
    num2.convertString( -33 );
    assertEqual("1089", num.multiply(num2).toString(), "asserting -33 * -33 == 1089");

    //*******
    num.convertString( -10 );
    num2.convertString( 0 );
    assertEqual("0", num.multiply(num2).toString(), "asserting -10 * 0 = 0");
    
    //*******DIVISION
    num.convertString( "-25" );
    num2.convertString( "5" );
    assertEqual("-5", num.divide( num2 ).toString(), "asserting -5 = -5 with division");

    //*******
    num.convertString( "537" );
    num2.convertString( "-5" );
    assertEqual("-107", num.divide(num2).toString(), "asserting 537/-5 = -107 with division");

    //********
    num.convertString( "0" );
    num2.convertString( 20 );
    assertEqual("0", num.divide(num2).toString(), "asserting 0/20 == 0 with division");

    //********
    num.convertString( "-0" );
    num2.convertString( 20 );
    assertEqual("0", num.divide(num2).toString(), "asserting -0/20 == 0 with division");

    //********
    num.convertString("4");
    num2.convertString(0);
    assertEqual(null, num.divide(num2), "asserting 4/0 == null with division");

    //*********
    num.convertString('12');
    num2.convertString('3');
    assertEqual('4', num.divide(num2).toString(), "asserting 12/3 == 4");

    //*******ADDITION
    num.convertString( "55" );
    assertEqual( "110", num.add(55).toString(), "asserting 110 == 110 with addition");

    num.convertString("5017");
    num2.convertString("-5037");
    assertEqual( "-20", num.add(num2).toString(), "asserting -20 == -20 with addition");

    num.convertString("-50");
    num2.convertString("50");
    assertEqual( "0", num.add(num2).toString(), "asserting -50 + 50 == 0 with addition");

    num.convertString("50");
    num2.convertString(-50);
    assertEqual( "0", num.add(num2).toString(), "asserting 50 + -50 == 0 with addition");



    //******SUBTRACTION
    num.convertString(50);
    num2.convertString(50);
    assertEqual("0", num.minus(num2).tostring(), "asserting 50 - 50 == 0 with subtraction");

    //***COMPARISION
    num.convertString(100);
    num2.convertString(99);
    assertEqual(1, num.compare(num2), "asserting 100 is greater than 99");
    assertEqual(-1, num2.compare(num), "asserting 99 is less than 100");

    //**********
    num.convertString(-111);
    num2.convertString(99);
    assertEqual(-1, num.compare(num2), "asserting -111 is less than 99");
    assertEqual(1, num2.compare(num), "asserting 99 is greater than -111");
    assertEqual(0, num2.compare(num2), "asserting 99 is equal to 99");



    //*************INCREMENT/DECREMENT
    num.convertString( -2 );
    assertEqual(-1, num.increment(), "asserting return of incrementing negative is negative");
    assertEqual("-1", num.tostring(), "asserting result of inc on -2 is -1");
    assertEqual(0, num.increment(), "asserting return of inc on -1 is 0");
    assertEqual("0", num.toString(), "asserting reult of inc on -1 is 0");
    assertEqual(1, num.increment(), "asserting return of inc on 0 is positive");
    assertEqual("1", num.tostring(), "asserting result of inc on 0 is 1");

    ///******
    num.convertString( 2 );
    assertEqual(1, num.decrement(), "asserting return of decrementing 2 is postive");
    assertEqual("1", num.tostring(), "asserting result of decrementing 2 is 1");
    assertEqual(0, num.decrement(), "asserting return of decrementing 1 is 0");
    assertEqual("0", num.tostring(), "asserting result of decrementing 1 is 0");
    assertEqual(-1, num.decrement(), "asserting return of decrementing 0 is negative");
    assertEqual("-1", num.tostring(), "asserting result of decrementing 0 is -1");


    //********Trim
    num.convertString(3);
    num.trimBinString();
    assertEqual("11", num.getBinString(), "asserting trim works to take 1100 to 11");

    //********sqrt
    num.convertString(9);
    assertEqual("3", num.sqrt().toString(), "asserting that sqrt(9) == 3");
    num.convertString(626);
    assertEqual("25", num.sqrt().toString(), "asserrting that sqrt(626) == 25");
    num.convertString(0);
    assertEqual("0", num.sqrt().toString(), "asserting that sqrt(0) == 0");
    num.convertString( -5 );
    assertEqual(null, num.sqrt(), "asserting that sqrt(-#) returns null");

    //**********pow
    num.convertString(3);
    assertEqual("9", num.pow(2).toString(), "asserting that 3^2 is 9");
    assertEqual(null, num.pow(-5), "asserting that 3^-5 returns null");
    assertEqual("1", num.pow(0).toString(), "asserting that 3^0 returns obj. 1");
    assertEqual("3", num.pow(1).toString(), "asserting that 3^1 returns obj 3");

    num.convertString(9);
    assertEqual("3", num.genrt(2).toString(), "asserting that 2nd root of 9 is 3");
    num.convertString(27);
    assertEqual("3", num.genrt(3).toString(), "asserting that the 3rd root of 27 is 3");
    num.convertString(81);
    assertEqual("3", num.genrt(4).toString(), "asserting that the 4th root of 81 is 3");
    num.convertString(0);
    assertEqual("0", num.genrt(534).toString(), "asserting that the 534th root of 0 is 0");
    num.convertString("393992829030");
    assertEqual(null, num.genrt(0), "Asserting that the 0th root of 393992829030 is undefined");

    num.convertString(-27);
    assertEqual("-3", num.genrt(3).tostring(), "Asserting that the 3rd root of -27 is -3")

    var rootFacts = num.rootInfo( 2 );
    assertEqual(null, rootFacts, "Asserting that the 2nd root of -27 is null")
    num.convertString( 16 );
    rootFacts = num.rootInfo( 2 );
    assertEqual("4", rootFacts.root.toString(), "Asserting that the 2nd root of 16 is 4 with rootInfo");
    assertEqual(true, rootFacts.perfection, "Asserting that 4 is perfect second root of 16 with rootInfo");
    assertEqual("0", rootFacts.precision.tostring(), "Asserting that precision of 2nd root of 16 is 0 with rootInfo");
    assertEqual("2", rootFacts.order.toString(), "Asserting that order of 2nd root is 2.");

    num.convertString( 18 );
    rootFacts = num.rootInfo( 2 );
    assertEqual("4", rootFacts.root.toString(), "Asserting that the 2nd root of 18 is 4 with rootinfo.");
    assertEqual(false, rootFacts.perfection, "Asserting that the 2nd root of 18 is not perfect.");
    assertEqual("2", rootFacts.precision.tostring(), "Asserting that the precision of 2nd root of 18 is 2.");
    assertEqual("2", rootFacts.order.toString(), "Asserting that order of 2nd root is 2.");

    num.convertString( -23 );
    rootFacts = num.rootInfo(2);
    assertEqual(null, rootFacts, "Asserting that 2nd root of -23 is null with rootInfo");
    rootFacts = num.rootInfo(1);
    assertEqual("-23", rootFacts.root.toString(), "Asserting that the 1st root of -23 is -23 with rootInfo");
    //***Segue to trace source of bug
    assertEqual("-23", num.toString(), "Asserting that assigned number is returned by toString()");
    assertEqual("-23", num.genrt(1).tostring(), "Asserting that the 1st root of -23 is -23 with genrt");
    //Back to rootInfo
    rootFacts = num.rootInfo(1);
    assertEqual(1, rootFacts.order, "Asserting that rootInfo.order is 1 when 1st root found");
    assertEqual("0", rootFacts.precision.toString(), "Asserting that 1st root precision of -23 is 0 with rootInfo");
    assertEqual(true, rootFacts.perfection, "Asserting that 1st root of -23 is perfect");


    //Factorial
    num.convertString( 5 );
    assertEqual( "120", num.factorial().toString(), "Asserting that 5 factorial is 125");
    num.convertString( 11 );
    assertEqual("39916800", num.factorial().toString(), "Asserting that large factorials are correct.");


    //Modulus
    num.convertString( 5 );
    assertEqual("1", num.modulus(2).tostring(), "Asserting that the modulus 2 of 5 is 1");
    assertEqual("0", num.modulus(5).tostring(), "Asserting that the modulus 5 of 5 is 0");
    //huge factorial to test tostring speedup
    //comment out for reg tests
        // num.convertString( 1500 );
        // num = num.factorial();
        // console.log("Finished factorializing");
        // console.log( num.tostring());
}

driver();


function assertEqual( thingOne, thingTwo, testdescription ) {
    if( thingOne !== thingTwo ) {
        console.log("*******************");
        console.log("*******************");
        console.log("Test failed " + testdescription );
        console.log(thingOne + " and " + thingTwo + " are not the same thing.");
        console.log("*******************");
    } else {
        console.log("Test passed " + testdescription );
    }
}