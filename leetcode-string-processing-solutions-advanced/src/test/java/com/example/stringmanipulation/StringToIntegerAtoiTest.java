```java
package com.example.stringmanipulation;

import com.example.stringmanipulation.problems.StringToIntegerAtoi;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StringToIntegerAtoiTest {

    private StringToIntegerAtoi atoi;

    @BeforeEach
    void setUp() {
        atoi = new StringToIntegerAtoi();
    }

    @Test
    void testMyAtoi_BasicPositive() {
        assertEquals(42, atoi.myAtoi("42"));
    }

    @Test
    void testMyAtoi_BasicNegative() {
        assertEquals(-42, atoi.myAtoi("-42"));
    }

    @Test
    void testMyAtoi_WithLeadingWhitespace() {
        assertEquals(-42, atoi.myAtoi("   -42"));
    }

    @Test
    void testMyAtoi_WithWordsAtEnd() {
        assertEquals(4193, atoi.myAtoi("4193 with words"));
    }

    @Test
    void testMyAtoi_WithWordsAtBeginning() {
        assertEquals(0, atoi.myAtoi("words and 987"));
    }

    @Test
    void testMyAtoi_JustWhitespace() {
        assertEquals(0, atoi.myAtoi("     "));
    }

    @Test
    void testMyAtoi_EmptyString() {
        assertEquals(0, atoi.myAtoi(""));
    }

    @Test
    void testMyAtoi_NullString() {
        assertEquals(0, atoi.myAtoi(null));
    }

    @Test
    void testMyAtoi_PositiveSign() {
        assertEquals(42, atoi.myAtoi("+42"));
    }

    @Test
    void testMyAtoi_MultipleSignsInvalid() {
        assertEquals(0, atoi.myAtoi("+-12")); // Should stop at '-'
        assertEquals(0, atoi.myAtoi("++12")); // Should stop at '+'
        assertEquals(0, atoi.myAtoi("--12")); // Should stop at '-'
    }

    @Test
    void testMyAtoi_LeadingZeros() {
        assertEquals(123, atoi.myAtoi("00123"));
        assertEquals(0, atoi.myAtoi("00000"));
    }

    @Test
    void testMyAtoi_MaxIntValue() {
        assertEquals(Integer.MAX_VALUE, atoi.myAtoi("2147483647"));
    }

    @Test
    void testMyAtoi_MinIntValue() {
        assertEquals(Integer.MIN_VALUE, atoi.myAtoi("-2147483648"));
    }

    @Test
    void testMyAtoi_OverflowPositive() {
        assertEquals(Integer.MAX_VALUE, atoi.myAtoi("2147483648")); // One more than MAX_VALUE
        assertEquals(Integer.MAX_VALUE, atoi.myAtoi("91283472332")); // Much larger
    }

    @Test
    void testMyAtoi_UnderflowNegative() {
        assertEquals(Integer.MIN_VALUE, atoi.myAtoi("-2147483649")); // One less than MIN_VALUE
        assertEquals(Integer.MIN_VALUE, atoi.myAtoi("-91283472332")); // Much smaller
    }

    @Test
    void testMyAtoi_LargeNumberFollowedByNonDigit() {
        assertEquals(Integer.MAX_VALUE, atoi.myAtoi("2147483647a"));
        assertEquals(Integer.MIN_VALUE, atoi.myAtoi("-2147483648a"));
    }

    @Test
    void testMyAtoi_OnlySign() {
        assertEquals(0, atoi.myAtoi("+"));
        assertEquals(0, atoi.myAtoi("-"));
    }

    @Test
    void testMyAtoi_SignFollowedByWhitespace() {
        assertEquals(0, atoi.myAtoi("+ "));
        assertEquals(0, atoi.myAtoi("- "));
    }

    @Test
    void testMyAtoi_MixedLeadingWhitespaceAndSignAndDigits() {
        assertEquals(123, atoi.myAtoi("  +123"));
        assertEquals(-123, atoi.myAtoi("  -123"));
    }

    @Test
    void testMyAtoi_TrailingNonDigit() {
        assertEquals(123, atoi.myAtoi("123abc"));
        assertEquals(-123, atoi.myAtoi("-123xyz"));
    }

    @Test
    void testMyAtoi_NonNumericButNotWords() {
        assertEquals(0, atoi.myAtoi(".123")); // '.' is not a digit or sign after whitespace
        assertEquals(0, atoi.myAtoi("!@#"));
    }

    @Test
    void testMyAtoi_DoubleSign() {
        assertEquals(0, atoi.myAtoi("+-2"));
        assertEquals(0, atoi.myAtoi("-+2"));
    }
}
```