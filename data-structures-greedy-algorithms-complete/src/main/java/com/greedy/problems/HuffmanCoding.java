```java
package com.greedy.problems;

import com.greedy.utils.Pair;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

/**
 * **Problem:** Huffman Coding
 *
 * Huffman Coding is a greedy algorithm used for lossless data compression.
 * It assigns variable-length codes to input characters, with shorter codes
 * for more frequent characters and longer codes for less frequent characters.
 * The resulting code is a prefix code, meaning no character's code is a prefix
 * of another character's code, which allows unambiguous decoding.
 *
 * **Example:**
 * Input characters with frequencies: A:5, B:9, C:12, D:13, E:16, F:45
 *
 * Steps (Greedy):
 * 1. Put all characters with their frequencies into a min-priority queue.
 * 2. Extract the two nodes with the smallest frequencies (e.g., A and B).
 * 3. Create a new internal node whose frequency is the sum of the two extracted nodes' frequencies.
 *    Make the two extracted nodes its left and right children.
 * 4. Add the new internal node back to the priority queue.
 * 5. Repeat steps 2-4 until only one node (the root of the Huffman tree) remains in the priority queue.
 *
 * The path from the root to each leaf (character) represents its Huffman code (e.g., left=0, right=1).
 *
 * **Greedy Choice Property:**
 * At each step, combining the two nodes with the smallest frequencies is the greedy choice.
 * This is optimal because it ensures that the least frequent characters end up at deeper
 * levels of the tree, resulting in longer codes, while the most frequent characters stay
 * closer to the root, getting shorter codes. This minimizes the total weighted path length.
 *
 * **Optimal Substructure:**
 * If a Huffman tree for a set of characters S is optimal, then removing the two least
 * frequent characters and replacing them with their combined parent node, the Huffman
 * tree for the reduced set is also optimal for that reduced set.
 *
 * **Algorithm Steps (for building the tree and generating codes):**
 * 1. Initialize a priority queue (min-heap) of HuffmanNodes.
 * 2. For each character and its frequency, create a leaf HuffmanNode and add it to the priority queue.
 * 3. While the priority queue contains more than one node:
 *    a. Extract the two nodes with the minimum frequencies (let them be 'left' and 'right').
 *    b. Create a new internal HuffmanNode with a frequency equal to the sum of 'left' and 'right' frequencies.
 *       Set 'left' and 'right' as its children. This new node represents the combined characters.
 *    c. Add this new internal node to the priority queue.
 * 4. The single node remaining in the priority queue is the root of the Huffman tree.
 * 5. Traverse the Huffman tree to generate codes:
 *    - Assign '0' for a left child path and '1' for a right child path.
 *    - Concatenate path bits from root to leaf to get the code for each character.
 */
public class HuffmanCoding {

    /**
     * Represents a node in the Huffman tree. Can be a leaf (character) or an internal node.
     */
    static class HuffmanNode {
        char character;       // For leaf nodes, stores the character
        int frequency;        // Frequency of the character or sum of frequencies of children
        HuffmanNode left;     // Left child
        HuffmanNode right;    // Right child

        // Constructor for leaf nodes
        public HuffmanNode(char character, int frequency) {
            this.character = character;
            this.frequency = frequency;
            this.left = null;
            this.right = null;
        }

        // Constructor for internal nodes
        public HuffmanNode(int frequency, HuffmanNode left, HuffmanNode right) {
            this.character = '\0'; // Internal nodes don't represent a single character
            this.frequency = frequency;
            this.left = left;
            this.right = right;
        }

        // To compare nodes in the priority queue based on frequency
        public static Comparator<HuffmanNode> frequencyComparator = Comparator.comparingInt(node -> node.frequency);

        // Check if this node is a leaf (i.e., represents an actual character)
        boolean isLeaf() {
            return left == null && right == null;
        }

        @Override
        public String toString() {
            return "Node{" +
                   (character == '\0' ? "Internal" : "Char:" + character) +
                   ", Freq:" + frequency + "}";
        }
    }

    /**
     * Builds the Huffman tree from a map of character frequencies.
     *
     * @param frequencies A map where keys are characters and values are their frequencies.
     * @return The root node of the constructed Huffman tree. Returns null if frequencies map is null or empty.
     *
     * **Time Complexity:**
     * - Initializing priority queue: O(N), where N is the number of unique characters.
     * - Loop runs (N-1) times. Each iteration involves:
     *   - Extracting two min elements: O(log N) twice.
     *   - Inserting one element: O(log N).
     * - Total: O(N log N).
     *
     * **Space Complexity:**
     * - O(N) for storing nodes in the priority queue and the tree itself.
     */
    public HuffmanNode buildHuffmanTree(Map<Character, Integer> frequencies) {
        if (frequencies == null || frequencies.isEmpty()) {
            return null;
        }

        // Step 1: Initialize a priority queue of HuffmanNodes.
        // It's a min-priority queue, ordered by frequency.
        PriorityQueue<HuffmanNode> pq = new PriorityQueue<>(HuffmanNode.frequencyComparator);

        // Step 2: For each character and its frequency, create a leaf HuffmanNode and add it to the priority queue.
        for (Map.Entry<Character, Integer> entry : frequencies.entrySet()) {
            pq.add(new HuffmanNode(entry.getKey(), entry.getValue()));
        }

        // Step 3: While the priority queue contains more than one node:
        while (pq.size() > 1) {
            // a. Extract the two nodes with the minimum frequencies.
            HuffmanNode left = pq.poll();
            HuffmanNode right = pq.poll();

            // b. Create a new internal HuffmanNode with a frequency equal to the sum of 'left' and 'right' frequencies.
            //    Set 'left' and 'right' as its children.
            HuffmanNode parent = new HuffmanNode(left.frequency + right.frequency, left, right);

            // c. Add this new internal node to the priority queue.
            pq.add(parent);
        }

        // Step 4: The single node remaining in the priority queue is the root of the Huffman tree.
        return pq.poll();
    }

    /**
     * Traverses the Huffman tree to generate codes for each character.
     *
     * @param root The root node of the Huffman tree.
     * @return A map where keys are characters and values are their Huffman codes (binary strings).
     *         Returns an empty map if the root is null.
     *
     * **Time Complexity:**
     * - O(N * L), where N is the number of unique characters and L is the maximum depth of the tree
     *   (maximum code length). In the worst case, L can be N (skewed tree). So, O(N^2) in worst case.
     *   However, typically it's closer to O(N * avg_L).
     *
     * **Space Complexity:**
     * - O(N) for the recursion stack and the map storing codes.
     */
    public Map<Character, String> generateCodes(HuffmanNode root) {
        Map<Character, String> huffmanCodes = new HashMap<>();
        if (root == null) {
            return huffmanCodes;
        }
        // Start traversal from root with an empty bit string
        generateCodesRecursive(root, "", huffmanCodes);
        return huffmanCodes;
    }

    /**
     * Helper recursive method to traverse the Huffman tree and build codes.
     *
     * @param node The current node in the traversal.
     * @param currentCode The binary string code accumulated so far for the path to this node.
     * @param huffmanCodes The map to store the final character codes.
     */
    private void generateCodesRecursive(HuffmanNode node, String currentCode, Map<Character, String> huffmanCodes) {
        // Base case: If it's a leaf node, we have found a character's code.
        if (node.isLeaf()) {
            huffmanCodes.put(node.character, currentCode);
            return;
        }

        // Recursive step: Traverse left (append '0') and right (append '1').
        if (node.left != null) {
            generateCodesRecursive(node.left, currentCode + "0", huffmanCodes);
        }
        if (node.right != null) {
            generateCodesRecursive(node.right, currentCode + "1", huffmanCodes);
        }
    }

    /**
     * Encodes a given text string using the generated Huffman codes.
     *
     * @param text The input text to encode.
     * @param huffmanCodes The map of character Huffman codes.
     * @return The encoded binary string. Returns null if huffmanCodes is null or text contains unencodable characters.
     *
     * **Time Complexity:** O(M * L_avg), where M is the length of the text and L_avg is the average code length.
     * **Space Complexity:** O(M * L_avg) for the StringBuilder (proportional to encoded length).
     */
    public String encode(String text, Map<Character, String> huffmanCodes) {
        if (text == null || text.isEmpty() || huffmanCodes == null || huffmanCodes.isEmpty()) {
            return "";
        }

        StringBuilder encodedText = new StringBuilder();
        for (char c : text.toCharArray()) {
            String code = huffmanCodes.get(c);
            if (code == null) {
                System.err.println("Character '" + c + "' not found in Huffman codes. Cannot encode.");
                return null; // Or throw an exception
            }
            encodedText.append(code);
        }
        return encodedText.toString();
    }

    /**
     * Decodes a given binary string using the Huffman tree.
     *
     * @param encodedText The binary string to decode.
     * @param root The root of the Huffman tree.
     * @return The decoded original text. Returns null if root is null or encodedText is invalid.
     *
     * **Time Complexity:** O(E * D_avg), where E is the length of the encoded text and D_avg is the average depth of the tree (average code length).
     * **Space Complexity:** O(D_avg) for current node traversal path.
     */
    public String decode(String encodedText, HuffmanNode root) {
        if (encodedText == null || encodedText.isEmpty() || root == null) {
            return "";
        }

        StringBuilder decodedText = new StringBuilder();
        HuffmanNode current = root;

        for (int i = 0; i < encodedText.length(); i++) {
            char bit = encodedText.charAt(i);

            if (bit == '0') {
                current = current.left;
            } else if (bit == '1') {
                current = current.right;
            } else {
                System.err.println("Invalid bit encountered in encoded text: " + bit);
                return null;
            }

            // If we reached a leaf node, append its character to the decoded text
            // and reset to the root for the next character's code.
            if (current.isLeaf()) {
                decodedText.append(current.character);
                current = root; // Reset to root for next code
            }
        }
        // If after decoding all bits, we are not back at the root, it indicates an incomplete or malformed code.
        // However, if the code is a proper prefix code and text is complete, this check is often implicit.
        // If `current != root` at the end, it implies a partial code at the end. For correct encoding, this shouldn't happen.

        return decodedText.toString();
    }

    /**
     * Provides a brute-force like approach for finding character codes,
     * but for Huffman, the greedy approach IS the optimal.
     * A "brute force" for Huffman would imply trying all possible binary trees
     * and assigning codes, which is astronomically complex.
     * This method is a conceptual placeholder to highlight that the greedy strategy
     * is intrinsically tied to Huffman's optimality.
     *
     * @param frequencies The character frequencies.
     * @return A map of characters to their "codes" (not necessarily optimal Huffman codes).
     *
     * **Time Complexity:** Hypothetically exponential if truly exploring all trees.
     * For demonstration, we'll just assign fixed-length codes or sequential codes.
     * This is NOT Huffman and is highly inefficient in compression.
     * This would be O(N) or O(N log N) depending on encoding strategy, but yields poor compression.
     */
    public Map<Character, String> generateFixedLengthCodesConceptual(Map<Character, Integer> frequencies) {
        Map<Character, String> codes = new HashMap<>();
        if (frequencies == null || frequencies.isEmpty()) {
            return codes;
        }

        List<Character> chars = new ArrayList<>(frequencies.keySet());
        Collections.sort(chars); // For consistent ordering

        // Determine number of bits needed for fixed-length codes
        int numChars = chars.size();
        if (numChars == 0) return codes;

        int bitsPerChar = (int) Math.ceil(Math.log(numChars) / Math.log(2));
        if (bitsPerChar == 0) bitsPerChar = 1; // Handle single char case

        for (int i = 0; i < numChars; i++) {
            String binaryString = Integer.toBinaryString(i);
            // Pad with leading zeros to ensure fixed length
            String fixedCode = String.format("%" + bitsPerChar + "s", binaryString).replace(' ', '0');
            codes.put(chars.get(i), fixedCode);
        }
        return codes;
    }
}

```