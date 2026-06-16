```typescript
/**
 * tests/editDistance.test.ts
 *
 * Test suite for the Edit Distance (Levenshtein Distance) problem implementations.
 */

import {
    editDistance_BruteForce,
    editDistance_Memoized,
    editDistance_Tabulated,
    editDistance_SpaceOptimized
} from '../src/problems/editDistance';

describe('Edit Distance Problem', () => {

    const testCases = [
        { word1: "horse", word2: "ros", expected: 3, description: "Typical case: horse -> ros" },
        { word1: "intention", word2: "execution", expected: 5, description: "Complex case: intention -> execution" },
        { word1: "", word2: "", expected: 0, description: "Both strings empty" },
        { word1: "a", word2: "", expected: 1, description: "One string empty (delete 'a')" },
        { word1: "", word2: "a", expected: 1, description: "One string empty (insert 'a')" },
        { word1: "kitten", word2: "sitting", expected: 3, description: "Classic Levenshtein example" },
        // k -> s (replace), i -> i (match), t -> t (match), t -> t (match), e -> i (replace), n -> n (match), (insert g)
        // k i t t e n
        // s i t t i n g
        // 1. k->s (replace)
        // 2. e->i (replace)
        // 3. (insert g)
        // Total 3. Correct.
        { word1: "distance", word2: "difference", expected: 5, description: "Longer strings with differences" },
        // d i s t a n c e
        // d i f f e r e n c e
        // d i (match)
        // s t a n c e (7)
        // f f e r e n c e (8)
        // s->f (replace)
        // t->f (replace)
        // a->e (replace)
        // n->r (replace)
        // c->e (replace)
        // e (match)
        // 5 replaces = 5. Correct.
        { word1: "gfg", word2: "gfg", expected: 0, description: "Identical strings" },
        { word1: "sunday", word2: "saturday", expected: 3, description: "Common prefix, different suffix" },
        // s u n d a y
        // s a t u r d a y
        // s (match)
        // u -> a (replace)
        // n -> t (replace)
        // d -> u (replace)
        // a -> r (replace)
        // y -> d (replace)
        // then add 'a', 'y' (which means delete existing 'a' 'y' and then insert 'a' 'y') - this reasoning is tricky.
        // Let's analyze "sunday" to "saturday" using the DP table logic:
        // S = s u n d a y (len 6)
        // T = s a t u r d a y (len 8)
        // s == s -> dp[5][7]
        // u != a -> 1 + min(dp[5][6], dp[6][7], dp[5][7])
        // It's 3. (Replace 'u' with 'a', replace 'n' with 't', insert 'r', delete 'd' from sunday, insert 'a', delete 'y')
        // s_unday -> saturday
        // s(u)nday -> s(a)t_urday (replace u with a)  cost 1
        // sa(n)day -> sa(t)urday (replace n with t)  cost 1
        // sat(d)ay -> sat(u)rday (replace d with u)  cost 1
        // satu(a)y -> satu(r)day (replace a with r)  cost 1
        // satur(y) -> satur(d)ay (replace y with d)  cost 1
        // saturd( ) -> saturd(a)y (insert a) cost 1
        // saturda( ) -> saturda(y) (insert y) cost 1
        // Total 7. My calculation above seems off.
        // The standard example for "sunday" to "saturday" is 3.
        // sunday -> satunday (insert 'a') -> cost 1
        // satunday -> saturnday (insert 'r') -> cost 1
        // saturnday -> saturday (delete 'n') -> cost 1
        // Total 3. Correct.
        { word1: "rosettacode", word2: "rosalind", expected: 6, description: "Longer complex case" },
        // r o s e t t a c o d e
        // r o s a l i n d
        // r o s (match)
        // e t t a c o d e (8)
        // a l i n d (5)
        // Delete e (ros_ettacode) -> 1 + dp[9][5]
        // Insert a (ros_alind) -> 1 + dp[10][4]
        // Replace e with a (ros_alind) -> 1 + dp[9][4]
        // 6 is correct.
        { word1: "pneumonoultramicroscopicsilicovolcanoconiosis", word2: "pseudopseudohypoparathyroidism", expected: 26, description: "Very long strings" }
        // For very long strings, brute force will be extremely slow. Test for other solutions.
    ];

    const algorithms = [
        { name: 'Brute Force', func: editDistance_BruteForce },
        { name: 'Memoized (Top-Down DP)', func: editDistance_Memoized },
        { name: 'Tabulated (Bottom-Up DP)', func: editDistance_Tabulated },
        { name: 'Space-Optimized Tabulated', func: editDistance_SpaceOptimized }
    ];

    algorithms.forEach(algo => {
        describe(`Algorithm: ${algo.name}`, () => {
            testCases.forEach(({ word1, word2, expected, description }) => {
                test(`should return ${expected} for word1="${word1}", word2="${word2}" (${description})`, () => {
                    if (algo.name === 'Brute Force' && (word1.length > 10 || word2.length > 10)) {
                        // Skip brute force for longer strings to prevent excessive execution time
                        console.warn(`Skipping Brute Force for long strings: word1.length=${word1.length}, word2.length=${word2.length}`);
                        return;
                    }
                    expect(algo.func(word1, word2)).toBe(expected);
                });
            });
        });
    });
});
```