```javascript
/**
 * @fileoverview Test suite for Decode String algorithms.
 * Uses Jest to test `decodeStringStack` and `decodeStringRecursive` functions.
 */

const {
    decodeStringStack,
    decodeStringRecursive
} = require('../src/algorithms/decode-string');

// Group tests for Decode String
describe('Decode String', () => {
    // Array of all decode functions to test.
    const decodeFunctions = [
        { name: 'decodeStringStack', func: decodeStringStack },
        { name: 'decodeStringRecursive', func: decodeStringRecursive }
    ];

    decodeFunctions.forEach(({ name, func }) => {
        describe(`Function: ${name}`, () => {
            // Test cases from problem description
            test('should decode "3[a]2[bc]" to "aaabcbc"', () => {
                expect(func("3[a]2[bc]")).toBe("aaabcbc");
            });

            test('should decode "3[a2[c]]" to "accaccacc"', () => {
                expect(func("3[a2[c]]")).toBe("accaccacc");
            });

            test('should decode "2[abc]3[cd]ef" to "abcabccdcdcdef"', () => {
                expect(func("2[abc]3[cd]ef")).toBe("abcabccdcdcdef");
            });

            // Test cases for simpler scenarios
            test('should decode "abc" to "abc" (no encoding)', () => {
                expect(func("abc")).toBe("abc");
            });

            test('should decode "3[a]" to "aaa"', () => {
                expect(func("3[a]")).toBe("aaa");
            });

            test('should decode "1[a]" to "a"', () => {
                expect(func("1[a]")).toBe("a");
            });

            test('should decode "a2[b]c" to "abbc"', () => {
                expect(func("a2[b]c")).toBe("abbc");
            });

            // Test cases for nested scenarios
            test('should decode "2[z2[y]pq]" to "zyypqzyypq"', () => {
                expect(func("2[z2[y]pq]")).toBe("zyypqzyypq");
            });

            test('should decode "10[a]" to "aaaaaaaaaa"', () => {
                expect(func("10[a]")).toBe("aaaaaaaaaa");
            });

            test('should decode "3[z]2[2[y]pq4[o]e]" to "zzz2[y]pq4[o]e2[y]pq4[o]e"', () => {
                // Correct expected: zzz + (yy + pq + oooo + e) * 2
                // (yy + pq + oooo + e) = yy + pq + oooo + e (This interpretation implies nested repeats)
                // "2[2[y]pq4[o]e]" -> "2[yy]pqooooe" -> "yy" repeated 2 times => "yyyy" + "pq" + "oooo" + "e"
                // No, "2[2[y]pq4[o]e]" means "2[yy]pqooooe" is wrong.
                // It means: ("yy"+"pq"+"oooo"+"e") repeated twice.
                // Let K = "2[y]pq4[o]e".
                // K_decoded = (2[y]) + "pq" + (4[o]) + "e"
                // K_decoded = "yy" + "pq" + "oooo" + "e" = "yypqooooe"
                // So, 3[z]2[K] = "zzz" + "yypqooooe" + "yypqooooe" = "zzzyypqoooeyypqooooe"
                expect(func("3[z]2[2[y]pq4[o]e]")).toBe("zzzyypqoooeyypqooooe");
            });

            test('should decode "1[b]" to "b"', () => {
                expect(func("1[b]")).toBe("b");
            });

            test('should handle empty string inside brackets', () => {
                expect(func("2[]")).toBe("");
                expect(func("a3[]b")).toBe("ab");
            });

            test('should handle digits greater than 9', () => {
                expect(func("10[a]")).toBe("a".repeat(10));
                expect(func("100[a]")).toBe("a".repeat(100));
            });

            test('should handle combination of numbers, letters, and brackets at various positions', () => {
                expect(func("abc3[def]ghi")).toBe("abcdefdefdefghi");
                expect(func("3[a]b")).toBe("aaab");
                expect(func("a3[b]")).toBe("abbb");
            });

            test('should handle complex nested cases from LeetCode examples', () => {
                // Example: s = "3[a2[c]]" => "accaccacc"
                expect(func("3[a2[c]]")).toBe("accaccacc");
            });

            test('should handle max depth of encoding (hypothetical, given constraints usually up to 10)', () => {
                // Construct a deeply nested string
                let deepString = "a";
                let expected = "a";
                for (let i = 0; i < 5; i++) { // Let's test 5 levels deep
                    deepString = `2[${deepString}]`;
                    expected = expected + expected; // Double the string
                }
                // E.g., 2[2[2[2[2[a]]]]]
                // 2[a] = aa
                // 2[aa] = aaaa
                // 2[aaaa] = aaaaaaaa
                // 2[aaaaaaaa] = aaaaaaaaaaaaaaaa (16 'a's)
                // 2[aaaaaaaaaaaaaaaa] = aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa (32 'a's)
                expect(func(deepString)).toBe(expected);
            });
        });
    });
});
```