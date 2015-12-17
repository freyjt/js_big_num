# js_big_num
A javaScript object handling arbitrarily large integers accounting
 for sign.

To use:
<ul>
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
    <li>string this.toString()</li>
    <li>string this.tostring() (alias for above)</li>
    <li>string this.toStringBin()<br />
        string in binary with MSB in leftmost place</li>
    <li>BigNum this.add( number/string/BigNum )</li>
    <li>BigNum this.minus( number/string/BigNum )</li>
    <li>BigNum this.multiply( number/string/BigNum )</li>
    <li>BigNum this.divide( number/string/BigNum )</li>
    <li>BigNum this.sqrt( )<br/>
        Returns BigNum object representation of diaphantine square root<br/>
        of this</li>
    <li>BigNum this.genrt( numberIn )<br/>
        Returns a BigNum object representation of the diaphantine root<br/>
        given by number in ex. num.genrt(3) would return 3 if num is 27</li>
    <li>object this.rootInfo( numberIn )<br />
        Returns an object containing information about a general root of<br/>
        this. Form: { root: BigNum the root, <br/>
        order: number order of root, <br/>
        precision: BigNum diff. from the closest integer multiple of this, <br/>
        perfection: bool true if root is perfect to this }</li>
    <li>int    this.increment( )<br />
        returns -1 or 0 or 1, to indicate the negativity of the result</li>
    <li>int    this.decrement( )<br />
        see increment.
    <li>int    this.compare(number/string/Bignum)<br />
        returns -1 or 0 or 1, 1 if this is larger than comparator</li>
    <li>void   this.convertString( number/string )<br />
        sets this to represent string or number passed</li>
    <li>void   this.copy( BigNum )<br />
        sets this to same representation as BigNum passed in</li>
</ul>

Method of operation:
<ul>
    <li>Stores number in string of 0s 1s, lsb is leftmost bit</li>
    <li>Negativity is a bool attached to the object<br/>
        true = negative<br/>
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
    <li>I'd like to write a wrapper for genrt()<br/>
        that returns an object including whether the root<br/>
        is perfect or approximate</li>
</ul>