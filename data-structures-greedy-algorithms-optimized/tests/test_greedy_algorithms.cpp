```cpp
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm> // For std::is_permutation
#include <iomanip>   // For std::fixed, std::setprecision

// Include utility headers
#include "stopwatch.h"
#include "test_utils.h"

// Include algorithms
#include "../src/greedy_algorithms.cpp" // Include the implementation file directly for testing

// --- Test Cases for Activity Selection Problem ---
bool testActivitySelection_basic() {
    std::vector<Activity> activities = {
        Activity(1, 4, 1), Activity(3, 5, 2), Activity(0, 6, 3),
        Activity(5, 7, 4), Activity(3, 9, 5), Activity(5, 9, 6),
        Activity(6, 10, 7), Activity(8, 11, 8), Activity(8, 12, 9),
        Activity(2, 13, 10), Activity(12, 14, 11)
    };
    std::vector<Activity> expected = {
        Activity(1, 4, 1), Activity(5, 7, 4), Activity(8, 11, 8), Activity(12, 14, 11)
    };
    std::vector<Activity> result = selectActivities(activities);

    ASSERT_EQUALS(result.size(), expected.size(), "Activity Selection (basic): Result size mismatch");
    for (size_t i = 0; i < result.size(); ++i) {
        ASSERT_EQUALS(result[i].id, expected[i].id, "Activity Selection (basic): Activity ID mismatch");
    }
    return true;
}

bool testActivitySelection_empty() {
    std::vector<Activity> activities = {};
    std::vector<Activity> result = selectActivities(activities);
    ASSERT_TRUE(result.empty(), "Activity Selection (empty): Result should be empty");
    return true;
}

bool testActivitySelection_singleActivity() {
    std::vector<Activity> activities = {Activity(10, 20, 1)};
    std::vector<Activity> expected = {Activity(10, 20, 1)};
    std::vector<Activity> result = selectActivities(activities);
    ASSERT_EQUALS(result.size(), 1, "Activity Selection (single): Result size mismatch");
    ASSERT_EQUALS(result[0].id, 1, "Activity Selection (single): Activity ID mismatch");
    return true;
}

bool testActivitySelection_allOverlapping() {
    std::vector<Activity> activities = {
        Activity(1, 10, 1), Activity(2, 9, 2), Activity(3, 8, 3)
    };
    std::vector<Activity> expected = {Activity(1, 10, 1)}; // Greedy picks the one that finishes earliest
    std::vector<Activity> result = selectActivities(activities);
    ASSERT_EQUALS(result.size(), 1, "Activity Selection (all overlapping): Result size mismatch");
    // The exact activity depends on initial sort order if finish times are equal,
    // but with distinct finish times, it should be the one ending earliest.
    ASSERT_EQUALS(result[0].id, 2, "Activity Selection (all overlapping): Should pick activity finishing earliest (ID 2)");
    return true;
}

bool testActivitySelection_multipleOptimalPaths() {
    // Activities where multiple sets of selections yield the same max count
    // E.g., (1,3), (2,4), (3,5) -- greedy will pick (1,3), then (3,5). Count = 2.
    // If we instead picked (2,4), then nothing else can be picked.
    // The problem asks for MAX count, not unique set. Our greedy picks one valid set.
    std::vector<Activity> activities = {
        Activity(1, 3, 1), Activity(2, 4, 2), Activity(3, 5, 3)
    };
    std::vector<Activity> expected = {Activity(1, 3, 1), Activity(3, 5, 3)};
    std::vector<Activity> result = selectActivities(activities);
    ASSERT_EQUALS(result.size(), expected.size(), "Activity Selection (multiple optimal): Result size mismatch");
    ASSERT_EQUALS(result[0].id, expected[0].id, "Activity Selection (multiple optimal): Activity 1 ID mismatch");
    ASSERT_EQUALS(result[1].id, expected[1].id, "Activity Selection (multiple optimal): Activity 2 ID mismatch");
    return true;
}


// --- Test Cases for Fractional Knapsack Problem ---
bool testFractionalKnapsack_basic() {
    std::vector<Item> items = {Item(10, 60), Item(20, 100), Item(30, 120)}; // Ratios: 6, 5, 4
    int capacity = 50;
    double expected = 240.0; // Take all of (10,60), (20,100). Remaining capacity = 20. Take 2/3 of (30,120) -> 20/30 * 120 = 80. Total = 60 + 100 + 80 = 240.
    double result = fractionalKnapsack(items, capacity);
    ASSERT_TRUE(std::abs(result - expected) < 0.001, "Fractional Knapsack (basic): Value mismatch");
    return true;
}

bool testFractionalKnapsack_emptyItems() {
    std::vector<Item> items = {};
    int capacity = 100;
    double expected = 0.0;
    double result = fractionalKnapsack(items, capacity);
    ASSERT_EQUALS(result, expected, "Fractional Knapsack (empty items): Value mismatch");
    return true;
}

bool testFractionalKnapsack_zeroCapacity() {
    std::vector<Item> items = {Item(10, 60), Item(20, 100)};
    int capacity = 0;
    double expected = 0.0;
    double result = fractionalKnapsack(items, capacity);
    ASSERT_EQUALS(result, expected, "Fractional Knapsack (zero capacity): Value mismatch");
    return true;
}

bool testFractionalKnapsack_fullCapacityExactly() {
    std::vector<Item> items = {Item(10, 60), Item(20, 100)}; // Ratios: 6, 5
    int capacity = 30; // Exactly takes both
    double expected = 160.0;
    double result = fractionalKnapsack(items, capacity);
    ASSERT_TRUE(std::abs(result - expected) < 0.001, "Fractional Knapsack (full exactly): Value mismatch");
    return true;
}

bool testFractionalKnapsack_oneItemPartial() {
    std::vector<Item> items = {Item(50, 100)}; // Ratio: 2
    int capacity = 25; // Take half
    double expected = 50.0;
    double result = fractionalKnapsack(items, capacity);
    ASSERT_TRUE(std::abs(result - expected) < 0.001, "Fractional Knapsack (one item partial): Value mismatch");
    return true;
}

bool testFractionalKnapsack_itemsWithSameRatio() {
    std::vector<Item> items = {
        Item(10, 20), // Ratio 2
        Item(15, 30), // Ratio 2
        Item(5, 5)    // Ratio 1
    };
    int capacity = 20;
    // Should take (10,20) and 10/15 of (15,30)
    // Value = 20 + (10.0/15.0) * 30 = 20 + 20 = 40.0
    double expected = 40.0;
    double result = fractionalKnapsack(items, capacity);
    ASSERT_TRUE(std::abs(result - expected) < 0.001, "Fractional Knapsack (same ratio): Value mismatch");
    return true;
}


// --- Test Cases for Coin Change Problem (Greedy) ---
bool testCoinChangeGreedy_usCurrency() {
    std::vector<int> coins = {1, 5, 10, 25, 50, 100}; // US currency
    int amount = 123; // 100 + 20 + 1 + 1 + 1 (optimal) = 100 + 25 - 5 + 1 + 1 + 1
                      // 100 (1) + 10 (1) + 10 (1) + 1 (3) = 1+1+1+3=6 coins
                      // 100 (1) + 25 (1) -> 125, too much.
                      // 100 (1) + 10 (2) + 1 (3) = 1+2+3 = 6 coins
    // Greedy: 100 (1), 10 (2), 1 (3) = 6 coins
    ASSERT_EQUALS(coinChangeGreedy(coins, 123), 6, "Coin Change (US 123): Mismatch");
    ASSERT_EQUALS(coinChangeGreedy(coins, 78), 5, "Coin Change (US 78): Mismatch (50, 25, 1, 1, 1)");
    return true;
}

bool testCoinChangeGreedy_emptyCoins() {
    std::vector<int> coins = {};
    ASSERT_EQUALS(coinChangeGreedy(coins, 10), -1, "Coin Change (empty coins): Should be -1");
    return true;
}

bool testCoinChangeGreedy_zeroAmount() {
    std::vector<int> coins = {1, 5, 10};
    ASSERT_EQUALS(coinChangeGreedy(coins, 0), 0, "Coin Change (zero amount): Should be 0");
    return true;
}

bool testCoinChangeGreedy_negativeAmount() {
    std::vector<int> coins = {1, 5, 10};
    ASSERT_EQUALS(coinChangeGreedy(coins, -5), -1, "Coin Change (negative amount): Should be -1");
    return true;
}

bool testCoinChangeGreedy_notPossible() {
    std::vector<int> coins = {2, 4}; // Only even coins
    ASSERT_EQUALS(coinChangeGreedy(coins, 5), -1, "Coin Change (not possible): Should be -1");
    return true;
}

bool testCoinChangeGreedy_arbitraryWorkingSet() {
    std::vector<int> coins = {1, 2, 5, 10, 20, 50, 100, 200, 500, 1000}; // Common Euro-like denominations
    ASSERT_EQUALS(coinChangeGreedy(coins, 999), 9, "Coin Change (Euro-like 999): Mismatch (500+200+200+50+20+5+2+2)"); // 500(1) 200(2) 50(1) 20(1) 5(1) 2(2) = 9 coins
    return true;
}

bool testCoinChangeGreedy_alreadySortedCoins() {
    std::vector<int> coins = {10, 5, 1}; // Already sorted descending
    ASSERT_EQUALS(coinChangeGreedy(coins, 12), 3, "Coin Change (pre-sorted 12): Mismatch (10,1,1)");
    return true;
}

bool testCoinChangeGreedy_unsortedCoins() {
    std::vector<int> coins = {1, 10, 5}; // Unsorted
    ASSERT_EQUALS(coinChangeGreedy(coins, 12), 3, "Coin Change (unsorted 12): Mismatch (10,1,1)");
    return true;
}


// --- Test Cases for Huffman Coding ---
// Helper to compare maps (order doesn't matter for key-value pairs)
bool compareHuffmanCodes(const std::map<char, std::string>& actual, const std::map<char, std::string>& expected, const std::string& message) {
    if (actual.size() != expected.size()) {
        std::cerr << "FAIL: " << message << " Map sizes differ. Expected: " << expected.size() << ", Actual: " << actual.size() << std::endl;
        return false;
    }
    for (const auto& pair : expected) {
        if (actual.find(pair.first) == actual.end()) {
            std::cerr << "FAIL: " << message << " Expected character '" << pair.first << "' not found in actual codes." << std::endl;
            return false;
        }
        if (actual.at(pair.first) != pair.second) {
            std::cerr << "FAIL: " << message << " Code mismatch for character '" << pair.first << "'. Expected: " << pair.second << ", Actual: " << actual.at(pair.first) << std::endl;
            return false;
        }
    }
    return true;
}

bool testHuffmanCoding_basic() {
    std::map<char, int> frequencies = {{'a', 5}, {'b', 9}, {'c', 12}, {'d', 13}, {'e', 16}, {'f', 45}};
    std::map<char, std::string> expected_codes = {
        {'f', "0"}, {'c', "100"}, {'d', "101"}, {'a', "1100"}, {'b', "1101"}, {'e', "111"}
    };
    std::map<char, std::string> result_codes = huffmanCoding(frequencies);
    return compareHuffmanCodes(result_codes, expected_codes, "Huffman Coding (basic)");
}

bool testHuffmanCoding_emptyFrequencies() {
    std::map<char, int> frequencies = {};
    std::map<char, std::string> expected_codes = {};
    std::map<char, std::string> result_codes = huffmanCoding(frequencies);
    return compareHuffmanCodes(result_codes, expected_codes, "Huffman Coding (empty)");
}

bool testHuffmanCoding_singleCharacter() {
    std::map<char, int> frequencies = {{'x', 10}};
    std::map<char, std::string> expected_codes = {{'x', "0"}}; // Conventionally "0" or "" for single char
    std::map<char, std::string> result_codes = huffmanCoding(frequencies);
    return compareHuffmanCodes(result_codes, expected_codes, "Huffman Coding (single character)");
}

bool testHuffmanCoding_twoCharacters() {
    std::map<char, int> frequencies = {{'A', 1}, {'B', 2}};
    std::map<char, std::string> expected_codes = {{'A', "0"}, {'B', "1"}}; // Or 'A':"1", 'B':"0" - depends on tree construction order.
                                                                           // My implementation (left child gets '0') should be consistent.
                                                                           // (1, A) and (2, B). Left=A, Right=B. So A=0, B=1.
    std::map<char, std::string> result_codes = huffmanCoding(frequencies);
    return compareHuffmanCodes(result_codes, expected_codes, "Huffman Coding (two characters)");
}

bool testHuffmanCoding_allSameFrequency() {
    std::map<char, int> frequencies = {{'p', 1}, {'q', 1}, {'r', 1}, {'s', 1}};
    // The exact codes might vary due to tie-breaking in priority queue,
    // but the lengths should be consistent.
    // E.g., {p:00, q:01, r:10, s:11} is one possibility.
    // The main thing is that all codes have length 2.
    std::map<char, std::string> result_codes = huffmanCoding(frequencies);
    ASSERT_EQUALS(result_codes.size(), 4, "Huffman Coding (same frequency): Size mismatch");
    bool all_length_2 = true;
    for(const auto& pair : result_codes) {
        if (pair.second.length() != 2) {
            all_length_2 = false;
            break;
        }
    }
    ASSERT_TRUE(all_length_2, "Huffman Coding (same frequency): Not all codes of length 2");
    // Verify it is a prefix code (optional, more robust check)
    std::vector<std::string> codes_vec;
    for(const auto& pair : result_codes) codes_vec.push_back(pair.second);
    std::sort(codes_vec.begin(), codes_vec.end());
    for(size_t i = 0; i < codes_vec.size(); ++i) {
        for(size_t j = i + 1; j < codes_vec.size(); ++j) {
            if (codes_vec[j].rfind(codes_vec[i], 0) == 0) { // Check if codes_vec[i] is prefix of codes_vec[j]
                std::cerr << "FAIL: Huffman Coding (same frequency): Not a prefix code. " << codes_vec[i] << " is prefix of " << codes_vec[j] << std::endl;
                return false;
            }
        }
    }
    return true;
}

// --- Performance Benchmarking ---
void benchmarkActivitySelection() {
    std::cout << "\n--- Benchmarking Activity Selection ---" << std::endl;
    std::vector<Activity> large_activities;
    for (int i = 0; i < 100000; ++i) { // 100,000 activities
        large_activities.emplace_back(i, i + (rand() % 100) + 1, i);
    }
    // Randomize order to force sort
    std::random_shuffle(large_activities.begin(), large_activities.end());

    Stopwatch sw;
    sw.start();
    std::vector<Activity> result = selectActivities(large_activities);
    sw.stop();

    std::cout << "  Processed " << large_activities.size() << " activities." << std::endl;
    std::cout << "  Selected " << result.size() << " activities." << std::endl;
    std::cout << "  Time taken: " << sw.elapsedMilliseconds() << " ms" << std::endl;
}

void benchmarkFractionalKnapsack() {
    std::cout << "\n--- Benchmarking Fractional Knapsack ---" << std::endl;
    std::vector<Item> large_items;
    for (int i = 0; i < 100000; ++i) { // 100,000 items
        large_items.emplace_back(rand() % 100 + 1, rand() % 200 + 1); // Weight 1-100, Value 1-200
    }
    int capacity = 50000;

    Stopwatch sw;
    sw.start();
    double total_value = fractionalKnapsack(large_items, capacity);
    sw.stop();

    std::cout << "  Processed " << large_items.size() << " items with capacity " << capacity << "." << std::endl;
    std::cout << "  Total value: " << std::fixed << std::setprecision(2) << total_value << std::endl;
    std::cout << "  Time taken: " << sw.elapsedMilliseconds() << " ms" << std::endl;
}

void benchmarkCoinChangeGreedy() {
    std::cout << "\n--- Benchmarking Coin Change (Greedy) ---" << std::endl;
    std::vector<int> coins = {1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000}; // Many denominations
    int amount_to_make = 999999; // Large amount

    Stopwatch sw;
    sw.start();
    int num_coins = coinChangeGreedy(coins, amount_to_make);
    sw.stop();

    std::cout << "  Amount: " << amount_to_make << std::endl;
    std::cout << "  Min coins: " << num_coins << std::endl;
    std::cout << "  Time taken: " << sw.elapsedMicroseconds() << " us" << std::endl; // Coins are few, amount large, so micro is better
}

void benchmarkHuffmanCoding() {
    std::cout << "\n--- Benchmarking Huffman Coding ---" << std::endl;
    std::map<char, int> frequencies;
    // Generate frequencies for a large alphabet
    for (char c = 'A'; c <= 'Z'; ++c) {
        frequencies[c] = rand() % 1000 + 1;
    }
    for (char c = 'a'; c <= 'z'; ++c) {
        frequencies[c] = rand() % 1000 + 1;
    }
    for (char c = '0'; c <= '9'; ++c) {
        frequencies[c] = rand() % 500 + 1;
    }
    frequencies[' '] = rand() % 2000 + 1; // Space is common
    frequencies['.'] = rand() % 500 + 1;
    frequencies[','] = rand() % 500 + 1;

    Stopwatch sw;
    sw.start();
    std::map<char, std::string> codes = huffmanCoding(frequencies);
    sw.stop();

    std::cout << "  Generated codes for " << frequencies.size() << " unique characters." << std::endl;
    // std::cout << "  Sample codes:" << std::endl;
    // int count = 0;
    // for(const auto& pair : codes) {
    //     if (count++ < 5) std::cout << "    " << pair.first << ": " << pair.second << std::endl;
    //     else break;
    // }
    std::cout << "  Time taken: " << sw.elapsedMicroseconds() << " us" << std::endl;
}


int main() {
    std::cout << "Running Greedy Algorithm Tests...\n" << std::endl;

    // Run Activity Selection Tests
    printTestResult("Activity Selection Basic", testActivitySelection_basic());
    printTestResult("Activity Selection Empty", testActivitySelection_empty());
    printTestResult("Activity Selection Single", testActivitySelection_singleActivity());
    printTestResult("Activity Selection All Overlapping", testActivitySelection_allOverlapping());
    printTestResult("Activity Selection Multiple Optimal Paths", testActivitySelection_multipleOptimalPaths());

    // Run Fractional Knapsack Tests
    std::cout << std::endl;
    printTestResult("Fractional Knapsack Basic", testFractionalKnapsack_basic());
    printTestResult("Fractional Knapsack Empty Items", testFractionalKnapsack_emptyItems());
    printTestResult("Fractional Knapsack Zero Capacity", testFractionalKnapsack_zeroCapacity());
    printTestResult("Fractional Knapsack Full Exactly", testFractionalKnapsack_fullCapacityExactly());
    printTestResult("Fractional Knapsack One Item Partial", testFractionalKnapsack_oneItemPartial());
    printTestResult("Fractional Knapsack Items With Same Ratio", testFractionalKnapsack_itemsWithSameRatio());

    // Run Coin Change Greedy Tests
    std::cout << std::endl;
    printTestResult("Coin Change Greedy US Currency", testCoinChangeGreedy_usCurrency());
    printTestResult("Coin Change Greedy Empty Coins", testCoinChangeGreedy_emptyCoins());
    printTestResult("Coin Change Greedy Zero Amount", testCoinChangeGreedy_zeroAmount());
    printTestResult("Coin Change Greedy Negative Amount", testCoinChangeGreedy_negativeAmount());
    printTestResult("Coin Change Greedy Not Possible", testCoinChangeGreedy_notPossible());
    printTestResult("Coin Change Greedy Arbitrary Working Set", testCoinChangeGreedy_arbitraryWorkingSet());
    printTestResult("Coin Change Greedy Already Sorted Coins", testCoinChangeGreedy_alreadySortedCoins());
    printTestResult("Coin Change Greedy Unsorted Coins", testCoinChangeGreedy_unsortedCoins());


    // Run Huffman Coding Tests
    std::cout << std::endl;
    printTestResult("Huffman Coding Basic", testHuffmanCoding_basic());
    printTestResult("Huffman Coding Empty Frequencies", testHuffmanCoding_emptyFrequencies());
    printTestResult("Huffman Coding Single Character", testHuffmanCoding_singleCharacter());
    printTestResult("Huffman Coding Two Characters", testHuffmanCoding_twoCharacters());
    printTestResult("Huffman Coding All Same Frequency", testHuffmanCoding_allSameFrequency());


    // Run Benchmarks
    benchmarkActivitySelection();
    benchmarkFractionalKnapsack();
    benchmarkCoinChangeGreedy();
    benchmarkHuffmanCoding();

    std::cout << "\nAll tests and benchmarks finished." << std::endl;

    return 0;
}
```