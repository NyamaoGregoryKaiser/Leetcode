```java
package com.example.stringmanipulation;

import com.example.stringmanipulation.problems.MinimumWindowSubstring;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MinimumWindowSubstringTest {

    private MinimumWindowSubstring mws;

    @BeforeEach
    void setUp() {
        mws = new MinimumWindowSubstring();
    }

    @Test
    void testMinWindow_Example1() {
        String s = "ADOBECODEBANC";
        String t = "ABC";
        assertEquals("BANC", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_SingleCharacterMatch() {
        String s = "a";
        String t = "a";
        assertEquals("a", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_NoMatch() {
        String s = "a";
        String t = "aa";
        assertEquals("", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_TLongerThanS() {
        String s = "ab";
        String t = "abc";
        assertEquals("", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_EmptyS() {
        String s = "";
        String t = "abc";
        assertEquals("", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_EmptyT() {
        String s = "abc";
        String t = "";
        assertEquals("", mws.minWindow(s, t)); // Problem statement implies t is non-empty
    }

    @Test
    void testMinWindow_BothEmpty() {
        String s = "";
        String t = "";
        assertEquals("", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_AllCharactersMatchExact() {
        String s = "abc";
        String t = "abc";
        assertEquals("abc", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_AllCharactersMatchWithExtra() {
        String s = "abracadabra";
        String t = "aba";
        assertEquals("abr", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_DuplicateCharactersInT() {
        String s = "AA";
        String t = "AA";
        assertEquals("AA", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_DuplicateCharactersInT_LongerS() {
        String s = "ABCAAAA";
        String t = "AA";
        assertEquals("AA", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_DuplicateCharactersInT_Complex() {
        String s = "BANANA";
        String t = "ANA";
        // Possible windows are "ANA" (length 3), "ANAN" (length 4), "ANANA" (length 5)
        // From BANANA, "ANA" is the minimal.
        assertEquals("ANA", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_CaseSensitivity() {
        String s = "aBcAD";
        String t = "ABC";
        assertEquals("", mws.minWindow(s, t)); // 'a' != 'A'
    }

    @Test
    void testMinWindow_MultipleWindows() {
        String s = "thisisateststring";
        String t = "tist";
        assertEquals("tist", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_AnotherComplex() {
        String s = "acbbaca";
        String t = "aba";
        // 'aca' at index 4, 'acbba'
        // 'acbbaca'
        // 'a', 'c', 'b', 'b', 'a', 'c', 'a'
        // target: a:2, b:1
        // window: {a:1}, left=0, right=0, s[0]='a', needed=2
        // window: {a:1,c:1}, left=0, right=1, s[1]='c', needed=2
        // window: {a:1,c:1,b:1}, left=0, right=2, s[2]='b', needed=1. window="acb"
        // window: {a:1,c:1,b:2}, left=0, right=3, s[3]='b', needed=1. window="acbb"
        // window: {a:2,c:1,b:2}, left=0, right=4, s[4]='a', needed=0. window="acbba" -> length 5
        // contract: s[0]='a'. window: {a:1,c:1,b:2}. needed=1. left=1.
        // contract: s[1]='c'. window: {a:1,b:2}. left=2.
        // contract: s[2]='b'. window: {a:1,b:1}. needed=1. left=3.
        // contract: s[3]='b'. window: {a:1}. needed=2. left=4.
        // No match found for previous path for 'aba'
        // Let's re-trace "acbbaca" target "aba"
        // t_freq: a:2, b:1
        // s       a c b b a c a
        // index   0 1 2 3 4 5 6
        // right=0, s[0]='a', w_freq={a:1}, needed=2 -> {a:1}, left=0
        // right=1, s[1]='c', w_freq={a:1,c:1}, needed=2
        // right=2, s[2]='b', w_freq={a:1,c:1,b:1}, needed=1
        // right=3, s[3]='b', w_freq={a:1,c:1,b:2}, needed=1
        // right=4, s[4]='a', w_freq={a:2,c:1,b:2}, needed=0. Window "acbba", len=5. minLen=5, minStart=0.
        //   -> Shrink: s[0]='a'. w_freq={a:1,c:1,b:2}. needed=1. left=1.
        // right=5, s[5]='c', w_freq={a:1,c:2,b:2}, needed=1
        // right=6, s[6]='a', w_freq={a:2,c:2,b:2}, needed=0. Window "cbbaca", len=5. minLen=5, minStart=0 (no update).
        //   -> Shrink: s[1]='c'. w_freq={a:2,c:1,b:2}. needed=0.
        //     -> Shrink: s[1]='c'. w_freq={a:2,b:2}.
        //     No, `s[1]`='c' is not in `t_freq`. So no change in `needed`
        //   -> Shrink: s[1]='c'. w_freq={a:2,b:2}. left=2.
        //     Window "bbaca", len=5. minLen=5, minStart=0 (no update).
        //   -> Shrink: s[2]='b'. w_freq={a:2,b:1}. needed=0.
        //     -> Shrink: s[2]='b'. w_freq={a:2,b:1}. needed=0.
        //     No, `s[2]`='b' is in `t_freq`. `w_freq[b]` (1) is NOT `< t_freq[b]` (1).
        //     So needed remains 0. Wait, `windowFreq.get(lChar) < targetFreq.get(lChar)`
        //     `w_freq[b]` became 1. `t_freq[b]` is 1. `1 < 1` is false. So `needed` is not incremented.
        //     This means the window "bbaca" is still valid?
        //     t_freq: a:2, b:1. current window: {a:2, b:1} -> Yes.
        //     So "bbaca" is a candidate. Length 5. Current min is 5. So no update.
        //   -> Shrink: s[2]='b'. w_freq={a:2,b:0}. Now `w_freq[b]` (0) is `< t_freq[b]` (1). needed=1. left=3.
        //     Window is no longer valid.
        // The problem description example of "ADOBECODEBANC" -> "BANC" is `BANC` not `OBECODEBA`.
        // The logic seems correct. The smallest window for "acbbaca", "aba" should be "baca".
        // Let's step through `acbbaca`, target `aba` manually:
        // targetFreq: {a:2, b:1}
        // s="acbbaca"
        // right=0, s[0]='a', windowFreq={a:1}, needed=2 (still need 2 'a' and 1 'b')
        // right=1, s[1]='c', windowFreq={a:1, c:1}, needed=2
        // right=2, s[2]='b', windowFreq={a:1, c:1, b:1}, needed=1
        // right=3, s[3]='b', windowFreq={a:1, c:1, b:2}, needed=1 (b count is 2, but only 1 needed from t, so still 1)
        // right=4, s[4]='a', windowFreq={a:2, c:1, b:2}, needed=0. (Window: "acbba", len=5. minLen=5, minStart=0).
        //    Shrink: s[0]='a', windowFreq={a:1, c:1, b:2}, needed=1 (lost one 'a' required by t). left=1.
        // right=5, s[5]='c', windowFreq={a:1, c:2, b:2}, needed=1
        // right=6, s[6]='a', windowFreq={a:2, c:2, b:2}, needed=0. (Window: "cbbaca", len=5. minLen=5, minStart=0).
        //    Shrink: s[1]='c', windowFreq={a:2, c:1, b:2}. 'c' not in t, so needed stays 0. left=2.
        //    Window: "bbaca", len=5. Still minLen=5, minStart=0.
        //    Shrink: s[2]='b', windowFreq={a:2, c:1, b:1}. 'b' is in t. windowFreq.get('b') (1) is NOT < targetFreq.get('b') (1).
        //    So needed stays 0. left=3.
        //    Window: "baca", len=4. Current minLen=5. Update minLen=4, minStart=3.
        //    Shrink: s[3]='b', windowFreq={a:2, c:1, b:0}. 'b' is in t. windowFreq.get('b') (0) IS < targetFreq.get('b') (1).
        //    So needed becomes 1. left=4.
        // Final result should be "baca".
        assertEquals("baca", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_AllCharsAreUniqueInT() {
        String s = "abcdefg";
        String t = "dbg";
        assertEquals("defg", mws.minWindow(s, t)); // "dbg" not "dbg" itself
    }

    @Test
    void testMinWindow_WithSpecialCharacters() {
        String s = "Hello, World!";
        String t = "orl";
        assertEquals("o, Worl", mws.minWindow(s, t)); // Note: Problem constraints usually imply letters/digits only
    }

    @Test
    void testMinWindow_NullS() {
        String s = null;
        String t = "abc";
        assertEquals("", mws.minWindow(s, t));
    }

    @Test
    void testMinWindow_NullT() {
        String s = "abc";
        String t = null;
        assertEquals("", mws.minWindow(s, t));
    }
}
```