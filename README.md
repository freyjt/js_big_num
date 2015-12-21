# js_big_num
A javaScript object handling arbitrarily large integers accounting
 for sign.

To use:
<ul>
    <li>This document lists the methods designed to be used publicly.<br/>
        testDriver.js also has all of these being used in a test context.<br/>
        Taken together these should inform the use of the object.</li>
    <li>require the file</li>
    <li>create a new object
        <ul>
            <li>ex: var myNum = new BigNum("94949858393948859595")</li>
            <li>The constructor will take</li>
            <ul>
                <li>No arguments</li>
                <li>a number</li>
                <li>a string that looks like a number (for LARGE numbers)</li>
                <li>another BigNum</li>
            </ul>
        </ul>
    </li>
    <li>use operations within class</li>
</ul>

Public methods of interest:
<ul>
    <li><strong>string this.toString()</strong></li>
    <li><strong>string this.tostring()</strong> (alias for above)</li>
    <li><strong>string this.toStringBin()</strong><br />
        string in binary with MSB in leftmost place<br/>
        negative sign rather than sign bit</li>
    <li><strong>BigNum this.add( number/string/BigNum )</strong></li>
    <li><strong>BigNum this.minus( number/string/BigNum )</strong></li>
    <li><strong>BigNum this.multiply( number/string/BigNum )</strong></li>
    <li><strong>BigNum this.divide( number/string/BigNum )</strong></li>
    <li><strong>BigNum this.sqrt( )</strong><br/>
        Returns BigNum object representation of diaphantine square root<br/>
        of this</li>
    <li><strong>BigNum this.genrt( numberIn )</strong><br/>
        Returns a BigNum object representation of the diaphantine root<br/>
        given by number in ex. num.genrt(3) would return 3 if num is 27</li>
    <li><strong>object this.rootInfo( numberIn )</strong><br />
        Returns an object containing information about a general root of<br/>
        this. Form: { root: BigNum the root, <br/>
        order: number order of root, <br/>
        precision: BigNum diff. from the closest integer multiple of this, <br/>
        perfection: bool true if root is perfect to this }</li>
    <li><strong>int    this.increment( )</strong><br />
        returns -1 or 0 or 1, to indicate the negativity of the result</li>
    <li><strong>int    this.decrement( )</strong><br />
        see increment.</li>
    <li><strong>BigNum this.factorial( )</strong><br/>
        Returns a BigNum representation of the factorial of the magnitude of This</li>
    <li><strong>BigNum this.modulus( number/bigNum )</strong><br/>
        Returns BigNum of the modulus of order given by parameter.<br/>
        *doesn't handle negative modulus yet.</li>
    <li><strong>BigNum this.isPrime( )</strong><br/>
        Returns bool of the primality of this (true is prime, false not)</li>
    <li><strong>BigNum this.digitSum( )</strong><br/>
        Sums all the digits of this (in <em>DECIMAL</em>) then returns<br/>
        the result as a BigNum objects</li>
    <li><strong>int    this.compare(number/string/Bignum)</strong><br />
        returns -1 or 0 or 1, 1 if this is larger than comparator</li>
    <li><strong>void   this.convertString( number/string )</strong><br />
        sets this to represent string or number passed</li>
    <li><strong>void   this.copy( BigNum )</strong><br />
        sets this to same representation as BigNum passed in</li>

</ul>

Method of operation:
<ul>
    <li>Stores number in string of 0s 1s, lsb is leftmost bit</li>
    <li>Negativity is a bool attached to the object<br/>
        true  = negative<br/>
        false = non-negative</li>
    <li>Using strings means all operations are done with<br/>
        string operations. Strings are immutable. This<br/>
        is slower than need be, but fairly straightforward to read</li>
</ul>

Going forward:
<ul>
    <li>Many methods could be faster</li>
    <li>The general layout has many helper methods<br/>
        that are either redundant or not the smoothest<br/>
        transition/name. Should clean this up</li>
</ul>