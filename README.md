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
        string in binary with MSB in rightmost place</li>
    <li>BigNum this.add( number/string/BigNum )</li>
    <li>BigNum this.minus( number/string/BigNum )</li>
    <li>BigNum this.multiply( number/string/BigNum )</li>
    <li>BigNum this.divide( number/string/BigNum )</li>
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
