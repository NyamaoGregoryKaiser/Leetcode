```java
import com.example.StringManip;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class StringManipTest {

    @Test
    void testReverseString() {
        assertEquals("olleh", StringManip.reverseString("hello"));
        assertEquals("", StringManip.reverseString(""));
        assertEquals("a", StringManip.reverseString("a"));
    }

    @Test
    void testReverseStringRecursive(){
        assertEquals("olleh", StringManip.reverseStringRecursive("hello"));
        assertEquals("", StringManip.reverseStringRecursive(""));
        assertEquals("a", StringManip.reverseStringRecursive("a"));
    }

    @Test
    void testIsPalindrome() {
        assertTrue(StringManip.isPalindrome("racecar"));
        assertTrue(StringManip.isPalindrome("madam"));
        assertFalse(StringManip.isPalindrome("hello"));
        assertTrue(StringManip.isPalindrome(""));
        assertTrue(StringManip.isPalindrome("a"));
    }

    @Test
    void testIsPalindromeSB(){
        assertTrue(StringManip.isPalindromeSB("racecar"));
        assertTrue(StringManip.isPalindromeSB("madam"));
        assertFalse(StringManip.isPalindromeSB("hello"));
        assertTrue(StringManip.isPalindromeSB(""));
        assertTrue(StringManip.isPalindromeSB("a"));
        assertTrue(StringManip.isPalindromeSB("A man, a plan, a canal: Panama"));
    }

    @Test
    void testLongestPalindromeSubstring() {
        assertEquals("bab", StringManip.longestPalindromeSubstring("babad"));
        assertEquals("bb", StringManip.longestPalindromeSubstring("cbbd"));
        assertEquals("a", StringManip.longestPalindromeSubstring("a"));
        assertEquals("", StringManip.longestPalindromeSubstring(""));
    }
}
```