```cpp
#ifndef TEST_UTILS_HPP
#define TEST_UTILS_HPP

#include <vector>
#include <iostream>
#include <random>
#include <algorithm> // For std::shuffle

/**
 * @brief Namespace for utility functions used in tests and benchmarks.
 */
namespace TestUtils {

    /**
     * @brief Prints a vector of integers to the console.
     * @param vec The vector to print.
     * @param name An optional name for the vector, for better output clarity.
     */
    template <typename T>
    void printVector(const std::vector<T>& vec, const std::string& name = "") {
        if (!name.empty()) {
            std::cout << name << ": ";
        }
        std::cout << "[";
        for (size_t i = 0; i < vec.size(); ++i) {
            std::cout << vec[i];
            if (i < vec.size() - 1) {
                std::cout << ", ";
            }
        }
        std::cout << "]" << std::endl;
    }

    /**
     * @brief Generates a vector of random integers.
     * @param size The number of elements in the vector.
     * @param min_val The minimum possible value for an element.
     * @param max_val The maximum possible value for an element.
     * @return A vector of random integers.
     */
    std::vector<int> generateRandomVector(int size, int min_val = 0, int max_val = 100) {
        std::vector<int> vec(size);
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> distrib(min_val, max_val);
        for (int i = 0; i < size; ++i) {
            vec[i] = distrib(gen);
        }
        return vec;
    }

    /**
     * @brief Generates a vector for 'Find Duplicate Number' problem.
     *        Contains numbers from 1 to n, with exactly one duplicate.
     * @param n The range of numbers (1 to n), vector size will be n+1.
     * @return A vector with a single duplicate.
     */
    std::vector<int> generateDuplicateVector(int n) {
        std::vector<int> nums(n + 1);
        std::iota(nums.begin(), nums.end(), 1); // Fill with 1 to n+1 (last element will be n+1)

        std::random_device rd;
        std::mt19937 gen(rd());

        // Choose a random number from 1 to n to be the duplicate
        std::uniform_int_distribution<> val_distrib(1, n);
        int duplicate_val = val_distrib(gen);

        // Place the duplicate_val at the last position (n+1)
        nums[n] = duplicate_val;

        // Shuffle the array to randomize positions
        std::shuffle(nums.begin(), nums.end(), gen);

        return nums;
    }

    /**
     * @brief Generates a vector for 'Trapping Rain Water' problem.
     * @param size The number of elements.
     * @param max_height The maximum height for a bar.
     * @return A vector representing an elevation map.
     */
    std::vector<int> generateElevationMap(int size, int max_height = 100) {
        return generateRandomVector(size, 0, max_height);
    }

} // namespace TestUtils

#endif // TEST_UTILS_HPP
```