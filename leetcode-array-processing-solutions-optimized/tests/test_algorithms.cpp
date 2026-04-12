```cpp
#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_vector.hpp>
#include "../src/main_algorithms.cpp" // Include main algorithms for testing
#include "../src/brute_force_solutions.cpp" // Include brute force for testing/comparison
#include "../src/utils.h" // For utility functions like printVector, areVectorsEqual

// Ensure solutions are accessible via their namespaces
using namespace ArrayManipulation;

// Custom Catch2 matcher for vector equality
struct VectorMatcher : Catch::Matchers::MatcherBase<std::vector<int>> {
    std::vector<int> m_expected;

    VectorMatcher(const std::vector<int>& expected) : m_expected(expected) {}

    bool match(const std::vector<int>& actual) const override {
        return Utils::areVectorsEqual(actual, m_expected);
    }

    std::string describe() const override {
        std::ostringstream ss;
        ss << "equals: ";
        Utils::printVector(m_expected, ss.str());
        return ss.str();
    }
};

// Helper function to create the matcher
inline VectorMatcher EqualsVector(const std::vector<int>& expected) {
    return VectorMatcher(expected);
}

TEST_CASE("Problem 1: Maximum Subarray Sum", "[MaxSubarraySum]") {
    SECTION("Kadane's Algorithm - Standard Cases") {
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({-2, 1, -3, 4, -1, 2, 1, -5, 4}) == 6);
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({1}) == 1);
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({5, 4, -1, 7, 8}) == 23);
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({-1, -2, -3, -4}) == -1); // All negative
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({0}) == 0);
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({-10, 2, -1, 3, -2, 5, -15}) == 7);
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({8, -19, 5, -4, 20}) == 21);
    }

    SECTION("Kadane's Algorithm - Edge Cases") {
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({-1}) == -1);
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({100}) == 100);
        REQUIRE(MaxSubarraySum::kadanesAlgorithm({-5, 0, -3}) == 0); // Single 0
    }

    SECTION("Brute Force - Standard Cases") {
        REQUIRE(MaxSubarraySum::bruteForce({-2, 1, -3, 4, -1, 2, 1, -5, 4}) == 6);
        REQUIRE(MaxSubarraySum::bruteForce({1}) == 1);
        REQUIRE(MaxSubarraySum::bruteForce({5, 4, -1, 7, 8}) == 23);
        REQUIRE(MaxSubarraySum::bruteForce({-1, -2, -3, -4}) == -1);
        REQUIRE(MaxSubarraySum::bruteForce({0}) == 0);
    }

    SECTION("Comparison: Kadane's vs Brute Force") {
        std::vector<int> nums1 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        REQUIRE(MaxSubarraySum::kadanesAlgorithm(nums1) == MaxSubarraySum::bruteForce(nums1));

        std::vector<int> nums2 = {1, 2, 3, 4, 5};
        REQUIRE(MaxSubarraySum::kadanesAlgorithm(nums2) == MaxSubarraySum::bruteForce(nums2));

        std::vector<int> nums3 = {-5, -1, -3, -7, -2};
        REQUIRE(MaxSubarraySum::kadanesAlgorithm(nums3) == MaxSubarraySum::bruteForce(nums3));

        std::vector<int> nums4 = Utils::generateRandomVector(100, -50, 50);
        REQUIRE(MaxSubarraySum::kadanesAlgorithm(nums4) == MaxSubarraySum::bruteForce(nums4));
    }
}

TEST_CASE("Problem 2: Product of Array Except Self", "[ProductExceptSelf]") {
    SECTION("Optimal Solution - Standard Cases") {
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal({1, 2, 3, 4}), EqualsVector({24, 12, 8, 6}));
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal({-1, 1, 0, -3, 3}), EqualsVector({0, 0, 9, 0, 0}));
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal({2, 3, 5}), EqualsVector({15, 10, 6}));
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal({10, 0, 5, 2}), EqualsVector({0, 100, 0, 0})); // One zero
    }

    SECTION("Optimal Solution - Edge Cases") {
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal({1}), EqualsVector({1}));
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal({0, 0}), EqualsVector({0, 0})); // Two zeros
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal({-1, -1, -1}), EqualsVector({1, 1, 1}));
    }

    SECTION("Brute Force - Standard Cases") {
        REQUIRE_THAT(ProductExceptSelf::bruteForce({1, 2, 3, 4}), EqualsVector({24, 12, 8, 6}));
        REQUIRE_THAT(ProductExceptSelf::bruteForce({-1, 1, 0, -3, 3}), EqualsVector({0, 0, 9, 0, 0}));
        REQUIRE_THAT(ProductExceptSelf::bruteForce({2, 3, 5}), EqualsVector({15, 10, 6}));
    }

    SECTION("Comparison: Optimal vs Brute Force") {
        std::vector<int> nums1 = {1, 2, 3, 4};
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal(nums1), EqualsVector(ProductExceptSelf::bruteForce(nums1)));

        std::vector<int> nums2 = {-1, 1, 0, -3, 3};
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal(nums2), EqualsVector(ProductExceptSelf::bruteForce(nums2)));

        std::vector<int> nums3 = {0, 0, 0, 0};
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal(nums3), EqualsVector(ProductExceptSelf::bruteForce(nums3)));

        std::vector<int> nums4 = Utils::generateRandomVector(50, -5, 5); // Some zeros possible
        REQUIRE_THAT(ProductExceptSelf::productExceptSelfOptimal(nums4), EqualsVector(ProductExceptSelf::bruteForce(nums4)));
    }
}

TEST_CASE("Problem 3: Trapping Rain Water", "[TrappingRainWater]") {
    SECTION("Two Pointers (Optimal) - Standard Cases") {
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}) == 6);
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({4, 2, 0, 3, 2, 5}) == 9);
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({1, 0, 2, 0, 1}) == 2);
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({3, 0, 0, 2, 0, 4}) == 10);
    }

    SECTION("Two Pointers (Optimal) - Edge Cases") {
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({}) == 0);
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({1}) == 0);
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({1, 2}) == 0);
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({2, 1}) == 0);
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({1, 1, 1, 1}) == 0); // Flat
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({5, 4, 3, 2, 1}) == 0); // Decreasing
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers({1, 2, 3, 4, 5}) == 0); // Increasing
    }

    SECTION("Monotonic Stack - Standard Cases") {
        REQUIRE(TrappingRainWater::trapRainWaterStack({0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}) == 6);
        REQUIRE(TrappingRainWater::trapRainWaterStack({4, 2, 0, 3, 2, 5}) == 9);
        REQUIRE(TrappingRainWater::trapRainWaterStack({1, 0, 2, 0, 1}) == 2);
        REQUIRE(TrappingRainWater::trapRainWaterStack({3, 0, 0, 2, 0, 4}) == 10);
    }

    SECTION("Monotonic Stack - Edge Cases") {
        REQUIRE(TrappingRainWater::trapRainWaterStack({}) == 0);
        REQUIRE(TrappingRainWater::trapRainWaterStack({1}) == 0);
        REQUIRE(TrappingRainWater::trapRainWaterStack({1, 2}) == 0);
        REQUIRE(TrappingRainWater::trapRainWaterStack({1, 1, 1, 1}) == 0);
        REQUIRE(TrappingRainWater::trapRainWaterStack({5, 4, 3, 2, 1}) == 0);
    }

    SECTION("DP Solution - Standard Cases") {
        REQUIRE(TrappingRainWater::dpSolution({0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}) == 6);
        REQUIRE(TrappingRainWater::dpSolution({4, 2, 0, 3, 2, 5}) == 9);
        REQUIRE(TrappingRainWater::dpSolution({1, 0, 2, 0, 1}) == 2);
        REQUIRE(TrappingRainWater::dpSolution({3, 0, 0, 2, 0, 4}) == 10);
    }

    SECTION("Brute Force - Standard Cases") {
        REQUIRE(TrappingRainWater::bruteForce({0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}) == 6);
        REQUIRE(TrappingRainWater::bruteForce({4, 2, 0, 3, 2, 5}) == 9);
        REQUIRE(TrappingRainWater::bruteForce({1, 0, 2, 0, 1}) == 2);
    }

    SECTION("Comparison: All Solutions") {
        std::vector<int> heights1 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(heights1) == TrappingRainWater::trapRainWaterStack(heights1));
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(heights1) == TrappingRainWater::dpSolution(heights1));
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(heights1) == TrappingRainWater::bruteForce(heights1));

        std::vector<int> heights2 = {4, 2, 0, 3, 2, 5};
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(heights2) == TrappingRainWater::trapRainWaterStack(heights2));
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(height2) == TrappingRainWater::dpSolution(height2));
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(height2) == TrappingRainWater::bruteForce(height2));

        std::vector<int> heights3 = Utils::generateRandomVector(50, 0, 20);
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(heights3) == TrappingRainWater::trapRainWaterStack(heights3));
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(heights3) == TrappingRainWater::dpSolution(heights3));
        REQUIRE(TrappingRainWater::trapRainWaterTwoPointers(heights3) == TrappingRainWater::bruteForce(heights3));
    }
}

TEST_CASE("Problem 4: Rotate Array", "[RotateArray]") {
    SECTION("Reversal Method (Optimal) - Standard Cases") {
        std::vector<int> nums1 = {1, 2, 3, 4, 5, 6, 7};
        RotateArray::rotateReversal(nums1, 3);
        REQUIRE_THAT(nums1, EqualsVector({5, 6, 7, 1, 2, 3, 4}));

        std::vector<int> nums2 = {-1, -100, 3, 99};
        RotateArray::rotateReversal(nums2, 2);
        REQUIRE_THAT(nums2, EqualsVector({3, 99, -1, -100}));

        std::vector<int> nums3 = {1, 2, 3, 4, 5, 6};
        RotateArray::rotateReversal(nums3, 2);
        REQUIRE_THAT(nums3, EqualsVector({5, 6, 1, 2, 3, 4}));
    }

    SECTION("Reversal Method (Optimal) - Edge Cases") {
        std::vector<int> nums1 = {1, 2, 3};
        RotateArray::rotateReversal(nums1, 0); // No rotation
        REQUIRE_THAT(nums1, EqualsVector({1, 2, 3}));

        std::vector<int> nums2 = {1, 2, 3};
        RotateArray::rotateReversal(nums2, 3); // Rotate by n elements (full cycle)
        REQUIRE_THAT(nums2, EqualsVector({1, 2, 3}));

        std::vector<int> nums3 = {1};
        RotateArray::rotateReversal(nums3, 5); // Single element, large k
        REQUIRE_THAT(nums3, EqualsVector({1}));

        std::vector<int> nums4 = {1, 2};
        RotateArray::rotateReversal(nums4, 1);
        REQUIRE_THAT(nums4, EqualsVector({2, 1}));
    }

    SECTION("Temporary Array Method - Standard Cases") {
        std::vector<int> nums1 = {1, 2, 3, 4, 5, 6, 7};
        RotateArray::rotateTempArray(nums1, 3);
        REQUIRE_THAT(nums1, EqualsVector({5, 6, 7, 1, 2, 3, 4}));

        std::vector<int> nums2 = {-1, -100, 3, 99};
        RotateArray::rotateTempArray(nums2, 2);
        REQUIRE_THAT(nums2, EqualsVector({3, 99, -1, -100}));
    }

    SECTION("Naive Method - Standard Cases") {
        std::vector<int> nums1 = {1, 2, 3, 4, 5, 6, 7};
        RotateArray::rotateNaive(nums1, 3);
        REQUIRE_THAT(nums1, EqualsVector({5, 6, 7, 1, 2, 3, 4}));

        std::vector<int> nums2 = {-1, -100, 3, 99};
        RotateArray::rotateNaive(nums2, 2);
        REQUIRE_THAT(nums2, EqualsVector({3, 99, -1, -100}));
    }

    SECTION("Comparison: All Methods") {
        std::vector<int> original_nums = {10, 20, 30, 40, 50, 60, 70, 80};
        int k = 3;

        std::vector<int> nums_reversal = original_nums;
        RotateArray::rotateReversal(nums_reversal, k);

        std::vector<int> nums_temp = original_nums;
        RotateArray::rotateTempArray(nums_temp, k);

        std::vector<int> nums_naive = original_nums;
        RotateArray::rotateNaive(nums_naive, k);

        REQUIRE_THAT(nums_reversal, EqualsVector(nums_temp));
        REQUIRE_THAT(nums_reversal, EqualsVector(nums_naive));

        std::vector<int> rand_nums = Utils::generateRandomVector(20, 0, 100);
        k = rand() % 20;

        std::vector<int> rand_nums_rev = rand_nums;
        RotateArray::rotateReversal(rand_nums_rev, k);

        std::vector<int> rand_nums_tmp = rand_nums;
        RotateArray::rotateTempArray(rand_nums_tmp, k);

        std::vector<int> rand_nums_nav = rand_nums;
        RotateArray::rotateNaive(rand_nums_nav, k);

        REQUIRE_THAT(rand_nums_rev, EqualsVector(rand_nums_tmp));
        REQUIRE_THAT(rand_nums_rev, EqualsVector(rand_nums_nav));
    }
}

TEST_CASE("Problem 5: Merge Sorted Arrays", "[MergeSortedArrays]") {
    SECTION("Optimal (Two Pointers from End) - Standard Cases") {
        std::vector<int> nums1_1 = {1, 2, 3, 0, 0, 0};
        MergeSortedArrays::mergeOptimal(nums1_1, 3, {2, 5, 6}, 3);
        REQUIRE_THAT(nums1_1, EqualsVector({1, 2, 2, 3, 5, 6}));

        std::vector<int> nums1_2 = {1};
        MergeSortedArrays::mergeOptimal(nums1_2, 1, {}, 0);
        REQUIRE_THAT(nums1_2, EqualsVector({1}));

        std::vector<int> nums1_3 = {0};
        MergeSortedArrays::mergeOptimal(nums1_3, 0, {1}, 1);
        REQUIRE_THAT(nums1_3, EqualsVector({1}));

        std::vector<int> nums1_4 = {4, 5, 6, 0, 0, 0};
        MergeSortedArrays::mergeOptimal(nums1_4, 3, {1, 2, 3}, 3);
        REQUIRE_THAT(nums1_4, EqualsVector({1, 2, 3, 4, 5, 6}));
    }

    SECTION("Optimal (Two Pointers from End) - Edge Cases") {
        std::vector<int> nums1_empty = {}; // This case should ideally not happen per problem constraints (m+n length)
        // For current implementation, it's safer to not test empty nums1
        // But if m=0, n=0:
        std::vector<int> nums1_m0n0 = {};
        MergeSortedArrays::mergeOptimal(nums1_m0n0, 0, {}, 0);
        REQUIRE_THAT(nums1_m0n0, EqualsVector({}));

        std::vector<int> nums1_m0 = {0, 0, 0}; // nums1 has capacity but m=0
        MergeSortedArrays::mergeOptimal(nums1_m0, 0, {1, 2, 3}, 3);
        REQUIRE_THAT(nums1_m0, EqualsVector({1, 2, 3}));

        std::vector<int> nums1_n0 = {1, 2, 3}; // nums2 is empty
        MergeSortedArrays::mergeOptimal(nums1_n0, 3, {}, 0);
        REQUIRE_THAT(nums1_n0, EqualsVector({1, 2, 3}));

        std::vector<int> nums1_single = {10, 0};
        MergeSortedArrays::mergeOptimal(nums1_single, 1, {5}, 1);
        REQUIRE_THAT(nums1_single, EqualsVector({5, 10}));
    }

    SECTION("Using std::sort - Standard Cases") {
        std::vector<int> nums1_1 = {1, 2, 3, 0, 0, 0};
        MergeSortedArrays::mergeUsingSort(nums1_1, 3, {2, 5, 6}, 3);
        REQUIRE_THAT(nums1_1, EqualsVector({1, 2, 2, 3, 5, 6}));

        std::vector<int> nums1_4 = {4, 5, 6, 0, 0, 0};
        MergeSortedArrays::mergeUsingSort(nums1_4, 3, {1, 2, 3}, 3);
        REQUIRE_THAT(nums1_4, EqualsVector({1, 2, 3, 4, 5, 6}));
    }

    SECTION("Auxiliary Array Method - Standard Cases") {
        std::vector<int> nums1_1 = {1, 2, 3, 0, 0, 0};
        MergeSortedArrays::mergeAuxiliaryArray(nums1_1, 3, {2, 5, 6}, 3);
        REQUIRE_THAT(nums1_1, EqualsVector({1, 2, 2, 3, 5, 6}));

        std::vector<int> nums1_4 = {4, 5, 6, 0, 0, 0};
        MergeSortedArrays::mergeAuxiliaryArray(nums1_4, 3, {1, 2, 3}, 3);
        REQUIRE_THAT(nums1_4, EqualsVector({1, 2, 3, 4, 5, 6}));
    }

    SECTION("Comparison: All Methods") {
        std::vector<int> part1 = {1, 3, 5, 7};
        std::vector<int> part2 = {2, 4, 6, 8};
        int m = part1.size();
        int n = part2.size();
        
        std::vector<int> expected = {1, 2, 3, 4, 5, 6, 7, 8};

        std::vector<int> nums1_optimal_test(m + n);
        std::copy(part1.begin(), part1.end(), nums1_optimal_test.begin());
        MergeSortedArrays::mergeOptimal(nums1_optimal_test, m, part2, n);
        REQUIRE_THAT(nums1_optimal_test, EqualsVector(expected));

        std::vector<int> nums1_sort_test(m + n);
        std::copy(part1.begin(), part1.end(), nums1_sort_test.begin());
        MergeSortedArrays::mergeUsingSort(nums1_sort_test, m, part2, n);
        REQUIRE_THAT(nums1_sort_test, EqualsVector(expected));

        std::vector<int> nums1_aux_test(m + n);
        std::copy(part1.begin(), part1.end(), nums1_aux_test.begin());
        MergeSortedArrays::mergeAuxiliaryArray(nums1_aux_test, m, part2, n);
        REQUIRE_THAT(nums1_aux_test, EqualsVector(expected));

        // Test with random data
        std::vector<int> r_part1 = Utils::generateRandomVector(50, 0, 100);
        std::sort(r_part1.begin(), r_part1.end());
        std::vector<int> r_part2 = Utils::generateRandomVector(40, 0, 100);
        std::sort(r_part2.begin(), r_part2.end());
        int r_m = r_part1.size();
        int r_n = r_part2.size();
        
        std::vector<int> r_nums1_optimal_test(r_m + r_n);
        std::copy(r_part1.begin(), r_part1.end(), r_nums1_optimal_test.begin());
        MergeSortedArrays::mergeOptimal(r_nums1_optimal_test, r_m, r_part2, r_n);

        std::vector<int> r_nums1_sort_test(r_m + r_n);
        std::copy(r_part1.begin(), r_part1.end(), r_nums1_sort_test.begin());
        MergeSortedArrays::mergeUsingSort(r_nums1_sort_test, r_m, r_part2, r_n);
        REQUIRE_THAT(r_nums1_optimal_test, EqualsVector(r_nums1_sort_test));

        std::vector<int> r_nums1_aux_test(r_m + r_n);
        std::copy(r_part1.begin(), r_part1.end(), r_nums1_aux_test.begin());
        MergeSortedArrays::mergeAuxiliaryArray(r_nums1_aux_test, r_m, r_part2, r_n);
        REQUIRE_THAT(r_nums1_optimal_test, EqualsVector(r_nums1_aux_test));
    }
}
```