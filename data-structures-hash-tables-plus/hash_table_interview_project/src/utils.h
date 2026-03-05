```cpp
#ifndef UTILS_H
#define UTILS_H

#include <iostream>
#include <string>
#include <vector>
#include <chrono>
#include <map> // For potential ordered map comparisons or problem structures
#include <set> // For potential set comparisons or problem structures
#include <unordered_map>
#include <unordered_set>
#include <algorithm> // For std::sort, std::min, std::max
#include <numeric>   // For std::iota, std::accumulate
#include <list>      // For custom hash map chaining

// --- Simple Test Framework ---
namespace TestFramework {

// A simple structure to hold test case results
struct TestCaseResult {
    std::string test_name;
    bool passed;
    std::string message;

    TestCaseResult(std::string name, bool status, std::string msg = "")
        : test_name(std::move(name)), passed(status), message(std::move(msg)) {}
};

// Generic function to compare two containers (e.g., std::vector)
template<typename Container>
bool are_containers_equal(const Container& a, const Container& b) {
    if (a.size() != b.size()) {
        return false;
    }
    // For unordered containers (like unordered_set), direct comparison might not work.
    // Convert to sorted vectors or iterate and check presence if order doesn't matter.
    if constexpr (std::is_same_v<Container, std::vector<typename Container::value_type>> ||
                  std::is_same_v<Container, std::list<typename Container::value_type>>) {
        return std::equal(a.begin(), a.end(), b.begin());
    } else if constexpr (std::is_same_v<Container, std::unordered_set<typename Container::value_type>> ||
                         std::is_same_v<Container, std::set<typename Container::value_type>>) {
        if (a.size() != b.size()) return false;
        for (const auto& elem : a) {
            if (b.find(elem) == b.end()) return false;
        }
        return true;
    } else if constexpr (std::is_same_v<Container, std::unordered_map<typename Container::key_type, typename Container::mapped_type>> ||
                         std::is_same_v<Container, std::map<typename Container::key_type, typename Container::mapped_type>>) {
        if (a.size() != b.size()) return false;
        for (const auto& pair_a : a) {
            auto it_b = b.find(pair_a.first);
            if (it_b == b.end() || it_b->second != pair_a.second) {
                return false;
            }
        }
        return true;
    }
    // Fallback for other types, might need specific implementation
    return false;
}

// Helper to print containers for error messages
template<typename Container>
std::string container_to_string(const Container& c) {
    std::string s = "{";
    bool first = true;
    for (const auto& elem : c) {
        if (!first) s += ", ";
        if constexpr (std::is_convertible_v<decltype(elem), std::string>) {
             s += "\"" + elem + "\"";
        } else if constexpr (std::is_arithmetic_v<decltype(elem)>) {
            s += std::to_string(elem);
        } else { // Handle pairs for maps
             if constexpr (std::is_constructible_v<std::pair<typename Container::key_type, typename Container::mapped_type>, decltype(elem)>) {
                 s += "(" + container_to_string(std::vector<typename Container::key_type>{elem.first}) + ": " + container_to_string(std::vector<typename Container::mapped_type>{elem.second}) + ")";
             } else {
                 s += "N/A"; // Cannot convert to string
             }
        }
        first = false;
    }
    s += "}";
    return s;
}

// Overload for pairs within map for container_to_string
template<typename K, typename V>
std::string container_to_string(const std::map<K, V>& m) {
    std::string s = "{";
    bool first = true;
    for (const auto& pair : m) {
        if (!first) s += ", ";
        s += TestFramework::container_to_string(std::vector<K>{pair.first}) + ": " + TestFramework::container_to_string(std::vector<V>{pair.second});
        first = false;
    }
    s += "}";
    return s;
}

template<typename K, typename V>
std::string container_to_string(const std::unordered_map<K, V>& m) {
    // For unordered_map, convert to a sorted vector of pairs for consistent output
    std::vector<std::pair<K, V>> sorted_pairs(m.begin(), m.end());
    std::sort(sorted_pairs.begin(), sorted_pairs.end(), [](const auto& a, const auto& b) {
        return a.first < b.first; // Or use a custom comparison if K is not totally ordered
    });

    std::string s = "{";
    bool first = true;
    for (const auto& pair : sorted_pairs) {
        if (!first) s += ", ";
        s += TestFramework::container_to_string(std::vector<K>{pair.first}) + ": " + TestFramework::container_to_string(std::vector<V>{pair.second});
        first = false;
    }
    s += "}";
    return s;
}


#define ASSERT_EQ(actual, expected, test_name) \
    do { \
        if ((actual) == (expected)) { \
            test_results.emplace_back(test_name, true); \
        } else { \
            test_results.emplace_back(test_name, false, \
                "Expected: " + std::to_string(expected) + \
                ", Actual: " + std::to_string(actual)); \
        } \
    } while (0)

#define ASSERT_CONTAINER_EQ(actual, expected, test_name) \
    do { \
        if (TestFramework::are_containers_equal(actual, expected)) { \
            test_results.emplace_back(test_name, true); \
        } else { \
            test_results.emplace_back(test_name, false, \
                "Expected: " + TestFramework::container_to_string(expected) + \
                ", Actual: " + TestFramework::container_to_string(actual)); \
        } \
    } while (0)

#define ASSERT_TRUE(condition, test_name) \
    do { \
        if (condition) { \
            test_results.emplace_back(test_name, true); \
        } else { \
            test_results.emplace_back(test_name, false, "Condition was false."); \
        } \
    } while (0)

// Global vector to store results
extern std::vector<TestCaseResult> test_results;

// Function to run all tests and print a summary
void run_all_tests();

} // namespace TestFramework


// --- Timing Utility ---
namespace Timing {

class Timer {
public:
    Timer() : start_time_point(std::chrono::high_resolution_clock::now()) {}

    void reset() {
        start_time_point = std::chrono::high_resolution_clock::now();
    }

    // Returns duration in microseconds
    long long elapsed_microseconds() const {
        auto end_time_point = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::microseconds>(end_time_point - start_time_point).count();
    }

    // Returns duration in milliseconds
    long long elapsed_milliseconds() const {
        return elapsed_microseconds() / 1000;
    }

    // Returns duration in seconds (double)
    double elapsed_seconds() const {
        return static_cast<double>(elapsed_microseconds()) / 1000000.0;
    }

private:
    std::chrono::high_resolution_clock::time_point start_time_point;
};

} // namespace Timing

#endif // UTILS_H
```