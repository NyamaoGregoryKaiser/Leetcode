```java
package com.example.dp.problems;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Longest Common Subsequence (LCS) Tests")
class LongestCommonSubsequenceTest {

    private LongestCommonSubsequence lcsSolver;

    @BeforeEach
    void setUp() {
        lcsSolver = new LongestCommonSubsequence();
    }

    // --- Test Data Source for Parameterized Tests ---
    static Stream<Arguments> lcsTestCases() {
        return Stream.of(
                Arguments.of("AGGTAB", "GXTXAYB", 4, "GTAB"),
                Arguments.of("ABCBDAB", "BDCABA", 4, "BCBA"), // Another valid is "BDAB"
                Arguments.of("ABC", "ABC", 3, "ABC"),
                Arguments.of("ABC", "ACB", 2, "AB"), // or "AC"
                Arguments.of("ABC", "DEF", 0, ""),
                Arguments.of("", "ABC", 0, ""),
                Arguments.of("ABC", "", 0, ""),
                Arguments.of("", "", 0, ""),
                Arguments.of("AAAA", "AA", 2, "AA"),
                Arguments.of("AA", "AAAA", 2, "AA"),
                Arguments.of("XMJYAUZ", "MZJAWXU", 4, "MJAU") // Example from Wikipedia
        );
    }

    // --- Brute Force Tests ---
    @ParameterizedTest(name = "Brute Force LCS of \"{0}\" and \"{1}\" is {2}")
    @MethodSource("lcsTestCases")
    void testSolveBruteForce(String s1, String s2, int expectedLength, String expectedLcsString) {
        // Brute force is only suitable for small inputs.
        // For longer strings, it will be too slow.
        if (s1.length() + s2.length() > 20) { // Limit for brute force
            return;
        }
        assertEquals(expectedLength, lcsSolver.solveBruteForce(s1, s2));
    }

    @Test
    void testSolveBruteForce_EmptyStrings() {
        assertEquals(0, lcsSolver.solveBruteForce("", ""));
        assertEquals(0, lcsSolver.solveBruteForce("ABC", ""));
        assertEquals(0, lcsSolver.solveBruteForce("", "DEF"));
    }

    // --- Memoized Tests ---
    @ParameterizedTest(name = "Memoized LCS of \"{0}\" and \"{1}\" is {2}")
    @MethodSource("lcsTestCases")
    void testSolveMemoized(String s1, String s2, int expectedLength, String expectedLcsString) {
        assertEquals(expectedLength, lcsSolver.solveMemoized(s1, s2));
    }

    // --- Iterative Tests ---
    @ParameterizedTest(name = "Iterative LCS of \"{0}\" and \"{1}\" is {2}")
    @MethodSource("lcsTestCases")
    void testSolveIterative(String s1, String s2, int expectedLength, String expectedLcsString) {
        assertEquals(expectedLength, lcsSolver.solveIterative(s1, s2));
    }

    // --- Space Optimized Tests ---
    @ParameterizedTest(name = "Space Optimized LCS of \"{0}\" and \"{1}\" is {2}")
    @MethodSource("lcsTestCases")
    void testSolveSpaceOptimized(String s1, String s2, int expectedLength, String expectedLcsString) {
        assertEquals(expectedLength, lcsSolver.solveSpaceOptimized(s1, s2));
    }

    // --- Reconstruction Tests ---
    @ParameterizedTest(name = "Reconstruction for LCS of \"{0}\" and \"{1}\" gives a valid LCS string")
    @MethodSource("lcsTestCases")
    void testReconstructLCS(String s1, String s2, int expectedLength, String expectedLcsString) {
        if (s1.isEmpty() || s2.isEmpty()) {
            assertEquals("", lcsSolver.reconstructLCS(s1, s2, lcsSolver.getLCSDpTableIterative(s1, s2)));
            return;
        }

        int[][] dpTable = lcsSolver.getLCSDpTableIterative(s1, s2);
        String reconstructedLCS = lcsSolver.reconstructLCS(s1, s2, dpTable);

        // Check length
        assertEquals(expectedLength, reconstructedLCS.length(), "Reconstructed LCS length must match expected.");

        // Check if reconstructed LCS is a subsequence of s1
        assertTrue(isSubsequence(reconstructedLCS, s1), "Reconstructed LCS must be a subsequence of s1.");

        // Check if reconstructed LCS is a subsequence of s2
        assertTrue(isSubsequence(reconstructedLCS, s2), "Reconstructed LCS must be a subsequence of s2.");

        // For specific cases with single known LCS, assert direct equality
        if (s1.equals("AGGTAB") && s2.equals("GXTXAYB")) {
            assertEquals("GTAB", reconstructedLCS);
        } else if (s1.equals("ABC") && s2.equals("ABC")) {
            assertEquals("ABC", reconstructedLCS);
        } else if (s1.equals("ABC") && s2.equals("DEF")) {
            assertEquals("", reconstructedLCS);
        } else if (s1.equals("AAAA") && s2.equals("AA")) {
            assertEquals("AA", reconstructedLCS);
        }
        // Note: For "ABCBDAB", "BDCABA", LCS can be "BCBA" or "BDAB".
        // The current reconstruction logic picks one deterministically.
        // We only assert its validity, not exact match unless it's unique.
    }

    @Test
    void testReconstructLCS_EmptyStringInput() {
        String s1 = "ABC";
        String s2 = "";
        int[][] dpTable = lcsSolver.getLCSDpTableIterative(s1, s2);
        assertEquals("", lcsSolver.reconstructLCS(s1, s2, dpTable));

        s1 = "";
        s2 = "DEF";
        dpTable = lcsSolver.getLCSDpTableIterative(s1, s2);
        assertEquals("", lcsSolver.reconstructLCS(s1, s2, dpTable));

        s1 = "";
        s2 = "";
        dpTable = lcsSolver.getLCSDpTableIterative(s1, s2);
        assertEquals("", lcsSolver.reconstructLCS(s1, s2, dpTable));
    }

    @Test
    void testReconstructLCS_InvalidDpTable() {
        String s1 = "A";
        String s2 = "B";
        int[][] malformedDpTable = new int[1][1]; // Incorrect size

        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            lcsSolver.reconstructLCS(s1, s2, malformedDpTable);
        }, "Should throw IllegalArgumentException for malformed DP table.");

        assertTrue(thrown.getMessage().contains("DP table must be properly initialized"));
    }


    // --- Helper for Subsequence Check ---
    private boolean isSubsequence(String sub, String main) {
        int i = 0, j = 0;
        while (i < sub.length() && j < main.length()) {
            if (sub.charAt(i) == main.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == sub.length();
    }
}
```