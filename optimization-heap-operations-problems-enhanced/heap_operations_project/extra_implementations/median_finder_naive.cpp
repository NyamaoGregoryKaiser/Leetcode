```cpp
#include <iostream>
#include <vector>
#include <algorithm> // For std::sort
#include <stdexcept> // For std::runtime_error

/**
 * @file median_finder_naive.cpp
 * @brief Naive implementation of a MedianFinder.
 *
 * This implementation simply stores all numbers in a vector, sorts it upon
 * each median request, or keeps it sorted and inserts new elements.
 * For demonstration, we will keep it unsorted and sort on demand for `findMedian`.
 * This highlights the inefficiency compared to the two-heap approach.
 */

namespace NaiveMedianFinder {

    /**
     * @brief Implements a MedianFinder by storing all numbers in a vector
     *        and sorting it every time the median is requested.
     *
     * This approach is straightforward but highly inefficient for frequent
     * `findMedian` calls after `addNum` operations.
     *
     * Time Complexity (addNum): O(1) - appends to vector.
     * Time Complexity (findMedian): O(N log N) - for sorting the vector.
     * Space Complexity: O(N) - to store all numbers.
     */
    class MedianFinderNaiveSortOnDemand {
    public:
        std::vector<int> numbers;

        MedianFinderNaiveSortOnDemand() {}

        void addNum(int num) {
            numbers.push_back(num); // O(1) amortized
        }

        double findMedian() {
            if (numbers.empty()) {
                throw std::runtime_error("No numbers added to Naive MedianFinder.");
            }

            // Sort the vector to find the median. This is the bottleneck.
            std::sort(numbers.begin(), numbers.end()); // O(N log N)

            int n = numbers.size();
            if (n % 2 == 0) {
                // Even number of elements, median is average of two middle elements
                return (static_cast<double>(numbers[n / 2 - 1]) + numbers[n / 2]) / 2.0;
            } else {
                // Odd number of elements, median is the middle element
                return static_cast<double>(numbers[n / 2]);
            }
        }
    };

    /**
     * @brief Implements a MedianFinder by always keeping the vector sorted.
     *
     * This approach uses `std::lower_bound` to find the insertion point and
     * `std::vector::insert` to maintain sorted order. It's better than sorting
     * on demand but still less efficient than two heaps.
     *
     * Time Complexity (addNum): O(N) - for `lower_bound` (O(log N)) and `insert` (O(N)).
     * Time Complexity (findMedian): O(1) - vector is already sorted.
     * Space Complexity: O(N) - to store all numbers.
     */
    class MedianFinderNaiveAlwaysSorted {
    public:
        std::vector<int> numbers;

        MedianFinderNaiveAlwaysSorted() {}

        void addNum(int num) {
            // Find the correct insertion point to maintain sorted order
            auto it = std::lower_bound(numbers.begin(), numbers.end(), num); // O(log N)
            numbers.insert(it, num); // O(N) due to shifting elements
        }

        double findMedian() {
            if (numbers.empty()) {
                throw std::runtime_error("No numbers added to Naive MedianFinder.");
            }

            int n = numbers.size();
            if (n % 2 == 0) {
                return (static_cast<double>(numbers[n / 2 - 1]) + numbers[n / 2]) / 2.0;
            } else {
                return static_cast<double>(numbers[n / 2]);
            }
        }
    };

} // namespace NaiveMedianFinder

int main() {
    std::cout << "--- Testing Naive MedianFinder (Sort On Demand) ---" << std::endl;
    NaiveMedianFinder::MedianFinderNaiveSortOnDemand mf_ondemand;
    mf_ondemand.addNum(1);
    std::cout << "Added 1, Median: " << mf_ondemand.findMedian() << std::endl; // Expected: 1.0
    mf_ondemand.addNum(2);
    std::cout << "Added 2, Median: " << mf_ondemand.findMedian() << std::endl; // Expected: 1.5
    mf_ondemand.addNum(3);
    std::cout << "Added 3, Median: " << mf_ondemand.findMedian() << std::endl; // Expected: 2.0
    mf_ondemand.addNum(4);
    std::cout << "Added 4, Median: " << mf_ondemand.findMedian() << std::endl; // Expected: 2.5
    mf_ondemand.addNum(5);
    std::cout << "Added 5, Median: " << mf_ondemand.findMedian() << std::endl; // Expected: 3.0

    std::cout << "\n--- Testing Naive MedianFinder (Always Sorted) ---" << std::endl;
    NaiveMedianFinder::MedianFinderNaiveAlwaysSorted mf_always_sorted;
    mf_always_sorted.addNum(1);
    std::cout << "Added 1, Median: " << mf_always_sorted.findMedian() << std::endl; // Expected: 1.0
    mf_always_sorted.addNum(2);
    std::cout << "Added 2, Median: " << mf_always_sorted.findMedian() << std::endl; // Expected: 1.5
    mf_always_sorted.addNum(3);
    std::cout << "Added 3, Median: " << mf_always_sorted.findMedian() << std::endl; // Expected: 2.0
    mf_always_sorted.addNum(0);
    std::cout << "Added 0, Median: " << mf_always_sorted.findMedian() << std::endl; // Expected: 1.5 (0,1,2,3)
    mf_always_sorted.addNum(100);
    std::cout << "Added 100, Median: " << mf_always_sorted.findMedian() << std::endl; // Expected: 2.0 (0,1,2,3,100)


    // Test empty case
    NaiveMedianFinder::MedianFinderNaiveSortOnDemand empty_mf_ondemand;
    try {
        empty_mf_ondemand.findMedian();
    } catch (const std::runtime_error& e) {
        std::cout << "\nCaught expected error for empty NaiveMedianFinder (Sort On Demand): " << e.what() << std::endl;
    }

    NaiveMedianFinder::MedianFinderNaiveAlwaysSorted empty_mf_always_sorted;
    try {
        empty_mf_always_sorted.findMedian();
    } catch (const std::runtime_error& e) {
        std::cout << "Caught expected error for empty NaiveMedianFinder (Always Sorted): " << e.what() << std::endl;
    }

    return 0;
}
```