```java
package com.greedy.problems;

import com.greedy.problems.HuffmanCoding.HuffmanNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for HuffmanCoding.java
 */
public class HuffmanCodingTest {

    private HuffmanCoding huffmanCoding;

    @BeforeEach
    void setUp() {
        huffmanCoding = new HuffmanCoding();
    }

    private Map<Character, Integer> getFrequencies(String text) {
        Map<Character, Integer> frequencies = new HashMap<>();
        for (char c : text.toCharArray()) {
            frequencies.put(c, frequencies.getOrDefault(c, 0) + 1);
        }
        return frequencies;
    }

    @Test
    @DisplayName("Test Case 1: Standard Huffman Example (wikipedia-like)")
    void testStandardExample() {
        Map<Character, Integer> frequencies = new HashMap<>();
        frequencies.put('a', 45);
        frequencies.put('b', 13);
        frequencies.put('c', 12);
        frequencies.put('d', 16);
        frequencies.put('e', 9);
        frequencies.put('f', 5);

        HuffmanNode root = huffmanCoding.buildHuffmanTree(frequencies);
        assertNotNull(root);

        Map<Character, String> codes = huffmanCoding.generateCodes(root);
        assertNotNull(codes);
        assertFalse(codes.isEmpty());

        // Expected codes (may vary in 0/1 assignment for left/right, but lengths should be consistent)
        // 'a': 0 (or 1)
        // 'b': 101 (or 010)
        // 'c': 100 (or 011)
        // 'd': 111 (or 000)
        // 'e': 1101 (or 0010)
        // 'f': 1100 (or 0011)

        assertEquals(6, codes.size());
        assertTrue(codes.containsKey('a'));
        assertTrue(codes.containsKey('f'));

        // Check code lengths (these should be consistent regardless of 0/1 assignment)
        assertEquals(1, codes.get('a').length());
        assertEquals(3, codes.get('b').length());
        assertEquals(3, codes.get('c').length());
        assertEquals(3, codes.get('d').length());
        assertEquals(4, codes.get('e').length());
        assertEquals(4, codes.get('f').length());

        // Test encoding and decoding
        String originalText = "abcdef";
        String encodedText = huffmanCoding.encode(originalText, codes);
        assertNotNull(encodedText);
        // "abcdef" -> a(0) b(101) c(100) d(111) e(1101) f(1100) = 0101100111111011100 (length 1+3+3+3+4+4 = 18)
        assertEquals(18, encodedText.length()); // Based on one possible assignment

        String decodedText = huffmanCoding.decode(encodedText, root);
        assertEquals(originalText, decodedText);

        // Test with a longer string
        String longText = "aabbccddeeffaaabbbcccdddeeefff";
        Map<Character, Integer> longFrequencies = getFrequencies(longText);
        HuffmanNode longRoot = huffmanCoding.buildHuffmanTree(longFrequen