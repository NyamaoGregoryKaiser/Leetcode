```java
package com.example.stringmanipulation.problems;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("String Permutations")
class StringPermutationsTest {

    private StringPermutations solver;

    @BeforeEach
    void setUp() {
        solver = new StringPermutations();
    }

    @Nested
    @DisplayName("Permutations for Unique Characters (Approach 1)")
    class UniqueCharPermutationsTests {

        @Test
        void testPermuteUniqueChars_EmptyString() {
            List<String> expected = Collections.singletonList("");
            List<String> result = solver.permuteUniqueChars("");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteUniqueChars_NullString() {
            List<String> expected = Collections.emptyList();
            List<String> result = solver.permuteUniqueChars(null);
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteUniqueChars_SingleCharacter() {
            List<String> expected = Collections.singletonList("a");
            List<String> result = solver.permuteUniqueChars("a");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteUniqueChars_TwoCharacters() {
            List<String> expected = Arrays.asList("ab", "ba");
            List<String> result = solver.permuteUniqueChars("ab");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteUniqueChars_ThreeCharacters() {
            List<String> expected = Arrays.asList("abc", "acb", "bac", "bca", "cab", "cba");
            List<String> result = solver.permuteUniqueChars("abc");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteUniqueChars_FourCharacters() {
            String input = "abcd";
            List<String> result = solver.permuteUniqueChars(input);
            assertEquals(24, result.size(), "Expected 4! = 24 permutations");
            // Spot check a few:
            assertTrue(result.contains("abcd"));
            assertTrue(result.contains("dcba"));
            assertTrue(result.contains("bdac"));
            // Ensure all are distinct
            assertEquals(result.size(), new HashSet<>(result).size());
        }
    }

    @Nested
    @DisplayName("Permutations with Duplicates (Approach 2 - using Set for result)")
    class PermuteWithDuplicatesTests {

        @Test
        void testPermuteWithDuplicates_EmptyString() {
            List<String> expected = Collections.singletonList("");
            List<String> result = solver.permuteWithDuplicates("");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteWithDuplicates_NullString() {
            List<String> expected = Collections.emptyList();
            List<String> result = solver.permuteWithDuplicates(null);
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteWithDuplicates_SingleCharacter() {
            List<String> expected = Collections.singletonList("a");
            List<String> result = solver.permuteWithDuplicates("a");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteWithDuplicates_Duplicates_TwoCharacters() {
            List<String> expected = Collections.singletonList("aa");
            List<String> result = solver.permuteWithDuplicates("aa");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteWithDuplicates_Duplicates_ThreeCharacters() {
            List<String> expected = Arrays.asList("aab", "aba", "baa");
            List<String> result = solver.permuteWithDuplicates("aab");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteWithDuplicates_Duplicates_FourCharacters() {
            // "aabb" -> 4! / (2! * 2!) = 24 / 4 = 6 unique permutations
            List<String> expected = Arrays.asList("aabb", "abab", "abba", "baab", "baba", "bbaa");
            List<String> result = solver.permuteWithDuplicates("aabb");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }
    }

    @Nested
    @DisplayName("Optimized Distinct Permutations (Approach 3)")
    class OptimizedDistinctPermutationsTests {

        @Test
        void testPermuteOptimizedDistinct_EmptyString() {
            List<String> expected = Collections.singletonList("");
            List<String> result = solver.permuteOptimizedDistinct("");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteOptimizedDistinct_NullString() {
            List<String> expected = Collections.emptyList();
            List<String> result = solver.permuteOptimizedDistinct(null);
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteOptimizedDistinct_SingleCharacter() {
            List<String> expected = Collections.singletonList("a");
            List<String> result = solver.permuteOptimizedDistinct("a");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteOptimizedDistinct_Unique_TwoCharacters() {
            List<String> expected = Arrays.asList("ab", "ba");
            List<String> result = solver.permuteOptimizedDistinct("ab");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteOptimizedDistinct_Duplicates_TwoCharacters() {
            List<String> expected = Collections.singletonList("aa");
            List<String> result = solver.permuteOptimizedDistinct("aa");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteOptimizedDistinct_Duplicates_ThreeCharacters() {
            List<String> expected = Arrays.asList("aab", "aba", "baa");
            List<String> result = solver.permuteOptimizedDistinct("aab");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteOptimizedDistinct_Duplicates_FourCharacters() {
            // "aabb" -> 4! / (2! * 2!) = 24 / 4 = 6 unique permutations
            List<String> expected = Arrays.asList("aabb", "abab", "abba", "baab", "baba", "bbaa");
            List<String> result = solver.permuteOptimizedDistinct("aabb");
            assertEquals(expected.size(), result.size());
            assertTrue(new HashSet<>(expected).equals(new HashSet<>(result)));
        }

        @Test
        void testPermuteOptimizedDistinct_MoreComplexDuplicates() {
            // "abcab" -> 5! / 2! = 120 / 2 = 60 unique permutations
            String input = "abcab";
            List<String> result = solver.permuteOptimizedDistinct(input);
            assertEquals(60, result.size(), "Expected 60 unique permutations for 'abcab'");
            // Ensure all are distinct
            assertEquals(result.size(), new HashSet<>(result).size());
            // Spot check a few
            assertTrue(result.contains("abcab"));
            assertTrue(result.contains("bacab"));
            assertTrue(result.contains("cabba"));
        }
    }
}
```