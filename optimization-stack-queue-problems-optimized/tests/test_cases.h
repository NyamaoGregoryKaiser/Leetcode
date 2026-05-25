#ifndef TEST_CASES_H
#define TEST_CASES_H

#include <string>
#include <vector>
#include <tuple>

// Contains test data for various problems.

namespace TestCases {

    // --- Valid Parentheses ---
    struct ValidParenthesesTest {
        std::string input;
        bool expected;
    };

    inline std::vector<ValidParenthesesTest> getValidParenthesesTests() {
        return {
            {"()", true},
            {"()[]{}", true},
            {"(]", false},
            {"([{}])", true},
            {"{[()]}", true},
            {"((", false},
            {"]", false},
            {"", true},
            {"{", false},
            {"}}", false},
            {"((()))", true},
            {"(()[]{()})", true},
            {"((()))[]{}", true},
            {"((([{}]))", false}, // mismatched close
            {"((([{}]))]", true} // balanced
        };
    }

    // --- Daily Temperatures ---
    struct DailyTemperaturesTest {
        std::vector<int> input;
        std::vector<int> expected;
    };

    inline std::vector<DailyTemperaturesTest> getDailyTemperaturesTests() {
        return {
            {{73, 74, 75, 71, 69, 72, 76, 73}, {1, 1, 4, 2, 1, 1, 0, 0}},
            {{30, 40, 50, 60}, {1, 1, 1, 0}},
            {{30, 60, 90}, {1, 1, 0}},
            {{89, 62, 70, 58, 47, 47, 46, 76, 100, 70}, {8, 1, 5, 4, 3, 2, 1, 1, 0, 0}},
            {{}, {}},
            {{100}, {0}},
            {{5, 4, 3, 2, 1}, {0, 0, 0, 0, 0}},
            {{1, 2, 3, 4, 5}, {1, 1, 1, 1, 0}},
            {{30, 30, 30, 30}, {0, 0, 0, 0}},
            {{100, 99, 98, 97, 101}, {4, 3, 2, 1, 0}}
        };
    }

    // --- Sliding Window Maximum ---
    // Tuple: {vector<int> nums, int k, vector<int> expected_result}
    using SlidingWindowMaximumTest = std::tuple<std::vector<int>, int, std::vector<int>>;

    inline std::vector<SlidingWindowMaximumTest> getSlidingWindowMaximumTests() {
        return {
            {{1, 3, -1, -3, 5, 3, 6, 7}, 3, {3, 3, 5, 5, 6, 7}},
            {{1}, 1, {1}},
            {{1, -1}, 1, {1, -1}},
            {{7, 2, 4}, 2, {7, 4}},
            {{1, 3, 1, 2, 0, 5}, 3, {3, 3, 2, 5}},
            {{-1, -2, -3, -4, -5}, 2, {-1, -2, -3, -4}},
            {{1, 2, 3, 4, 5}, 1, {1, 2, 3, 4, 5}},
            {{5, 4, 3, 2, 1}, 5, {5}},
            {{}, 0, {}}, // Empty array, k=0 (edge case, result empty)
            {{1, 2, 3, 4, 5}, 5, {5}},
            {{10, 9, 8, 7, 6, 5, 4, 3, 2, 1}, 3, {10, 9, 8, 7, 6, 5, 4, 3}},
            {{1, 1, 1, 1, 1}, 2, {1, 1, 1, 1}},
            {{10, 5, 2, 7, 8}, 3, {10, 7, 8}}
        };
    }

} // namespace TestCases

#endif // TEST_CASES_H