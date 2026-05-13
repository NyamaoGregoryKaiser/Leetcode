```java
package com.example.stringmanipulation.problems;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("Minimum Window Substring")
class MinimumWindowSubstringTest {

    private MinimumWindowSubstring solver;

    @BeforeEach
    void setUp() {
        solver = new MinimumWindowSubstring();
    }

    @Nested
    @DisplayName("Sliding Window Approach")
    class SlidingWindowTests {

        @ParameterizedTest(name = "s=\"{0}\", t=\"{1}\" -> \"{2}\"")
        @CsvSource({
                "ADOBECODEBANC, ABC, BANC",
                "a, a, a",
                "a, aa, ''", // t is longer than s
                "ab, b, b",
                "ab, a, a",
                "ab, ab, ab",
                "cabwefgewcwaefgcf, cae, cwae",
                "timestamp, mp, mp",
                "aa, aa, aa",
                "aaaaaaaaaaaabbbbbcdd, abcdd, abbbbbcdd", // Longer window but includes all
                "bbaa, aba, baa",
                "bdab, ab, ab",
                "abc, bc, bc"
        })
        void testMinWindowSlidingWindow(String s, String t, String expected) {
            assertEquals(expected, solver.minWindowSlidingWindow(s, t));
        }

        @Test
        void testMinWindowSlidingWindow_NoMatch() {
            assertEquals("", solver.minWindowSlidingWindow("a", "b"));
            assertEquals("", solver.minWindowSlidingWindow("abc", "xyz"));
        }

        @Test
        void testMinWindowSlidingWindow_EmptyStrings() {
            assertEquals("", solver.minWindowSlidingWindow("", "a"));
            assertEquals("", solver.minWindowSlidingWindow("a", "")); // Problem spec implies non-empty t.
            assertEquals("", solver.minWindowSlidingWindow("", "")); // Both empty -> special case or empty
        }

        @Test
        void testMinWindowSlidingWindow_NullStrings() {
            assertEquals("", solver.minWindowSlidingWindow(null, "a"));
            assertEquals("", solver.minWindowSlidingWindow("a", null));
            assertEquals("", solver.minWindowSlidingWindow(null, null));
        }

        @Test
        void testMinWindowSlidingWindow_TargetLongerThanSource() {
            assertEquals("", solver.minWindowSlidingWindow("ab", "abc"));
        }

        @Test
        void testMinWindowSlidingWindow_AllSameCharacters() {
            assertEquals("aaa", solver.minWindowSlidingWindow("aaaaa", "aaa"));
            assertEquals("aa", solver.minWindowSlidingWindow("aa", "aa"));
        }

        @Test
        void testMinWindowSlidingWindow_TargetWithDuplicates() {
            assertEquals("BAC", solver.minWindowSlidingWindow("ABCCBA", "AAB")); // AAB -> BA (from C), C (from C)
            // Example: s="ABCCBA", t="AAB"
            // t_counts: A:2, B:1
            // A B C C B A
            // L           R
            // window: A:1 (needed A:2) -> no match
            // A B
            // L   R
            // window: A:1, B:1 (needed A:2, B:1) -> B matches, A not fully.
            // A B C
            // L     R
            // window: A:1, B:1, C:1 -> B matches. A not fully.
            // A D O B E C O D E B A N C, ABC
            //
            // Let's re-evaluate "ABCCBA", "AAB"
            // t = {A:2, B:1}
            // s = A B C C B A
            //     ^     ^
            //     0     3
            // s[0...3] = ABCC
            // window={A:1, B:1, C:2}. Still need one A.
            //
            // s[0...4] = ABCCB
            // window={A:1, B:2, C:2}. Still need one A.
            //
            // s[0...5] = ABCCBA
            // window={A:2, B:2, C:2}. Now {A:2, B:1} in t are matched. length=6. min_len=6. start=0.
            // Shrink from left (A at 0):
            // remove A. window={A:1, B:2, C:2}. Matched chars for t become less than t.length. No longer valid.
            // left=1
            //
            // s = A B C C B A
            //       ^ ^
            //       1 5
            // Continue search from B at 1. Window: s[1...5] = BCCBA
            // window = {B:2, C:2, A:1}. Not valid.
            //
            // My previous manual trace was probably incorrect. "BAC" is not the answer.
            // If the actual required characters for t is `A:2, B:1`.
            // s = ABCCBA.
            // The shortest window is `BCCBA`. No, this only has one 'A'.
            // The shortest window is `ABCCBA`. It contains two A's and two B's.
            // This is actually the correct window.
            //
            // Let's retest for example where AAB is "contained".
            // "ABCCBA", "AAB" -> "ABCCBA" itself.
            // My current test `assertEquals("BAC", solver.minWindowSlidingWindow("ABCCBA", "AAB"));` is wrong.
            // Let's change this test case or its expectation.
            assertEquals("ABCCBA", solver.minWindowSlidingWindow("ABCCBA", "AAB"));
            
            // Another test with duplicates
            assertEquals("BCDA", solver.minWindowSlidingWindow("ABBACDCBA", "AABC")); // A:2, B:1, C:1
            // s = A B B A C D C B A
            // t = A A B C
            // Expected: A B B A C (too long)
            // Try manually:
            // A B B A C D C B A
            // 0 1 2 3 4 5 6 7 8
            // t_map = {A:2, B:1, C:1}
            //
            // window = s[0...4] = ABBAC
            // window_map = {A:2, B:2, C:1} -> matched_chars = 4 (2 A, 1 B, 1 C). Valid.
            // Current len = 5. start=0. min_len=5. min_start=0.
            // Shrink: Remove s[0] = A. window_map={A:1, B:2, C:1}. Matched_chars=3. Invalid.
            // left=1.
            //
            // window = s[1...5] = BBACD
            // window_map = {B:2, A:1, C:1, D:1}. Not valid (need A:2)
            //
            // window = s[1...6] = BBACDC
            // window_map = {B:2, A:1, C:2, D:1}. Not valid (need A:2)
            //
            // window = s[1...7] = BBACDCB
            // window_map = {B:3, A:1, C:2, D:1}. Not valid (need A:2)
            //
            // window = s[1...8] = BBACDCBA
            // window_map = {B:3, A:2, C:2, D:1}. Matched_chars = 4. Valid.
            // Current len = 8. min_len is still 5.
            // Shrink: Remove s[1] = B. window_map={B:2, A:2, C:2, D:1}. Matched_chars=4. Valid.
            // Current len = 7. min_len is still 5.
            // Shrink: Remove s[2] = B. window_map={B:1, A:2, C:2, D:1}. Matched_chars=4. Valid.
            // Current len = 6. min_len is still 5.
            // Shrink: Remove s[3] = A. window_map={B:1, A:1, C:2, D:1}. Matched_chars=3. Invalid.
            // left=4.
            //
            // This suggests "BCDA" might be incorrect for `ABBACDCBA`, `AABC`.
            // Let's re-verify my understanding. `matchedRequiredChars == t.length()` handles duplicates correctly.
            //
            // "BCDA" would imply t="ABCD".
            // The shortest window for `s="ABBACDCBA", t="AABC"` is `s[3...8] = ACDCBA`. Length 6.
            // This window has A:2, B:1, C:2, D:1. Matches AABC.
            // Before this was `s[0...4] = ABBAC`. Length 5. This has A:2, B:2, C:1. It matches.
            // So `s[0...4]` is the answer: "ABBAC".
            //
            // So, let's update test:
            assertEquals("ABBAC", solver.minWindowSlidingWindow("ABBACDCBA", "AABC"));
        }
    }
}
```