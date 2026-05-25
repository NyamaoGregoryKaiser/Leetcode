#ifndef UTILITIES_H
#define UTILITIES_H

#include <chrono>
#include <vector>
#include <string>
#include <iostream>

// Helper namespace for common utilities
namespace Utils {

    /**
     * @brief A simple timer class for performance benchmarking.
     */
    class Timer {
    public:
        // Starts the timer
        void start() {
            m_startTime = std::chrono::high_resolution_clock::now();
        }

        // Stops the timer and returns the elapsed time in milliseconds
        double stop() {
            auto endTime = std::chrono::high_resolution_clock::now();
            std::chrono::duration<double, std::milli> duration = endTime - m_startTime;
            return duration.count();
        }

    private:
        std::chrono::high_resolution_clock::time_point m_startTime;
    };

    /**
     * @brief Prints a vector of any printable type to the console.
     * @tparam T The type of elements in the vector.
     * @param vec The vector to print.
     * @param name An optional name for the vector, printed before the contents.
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
     * @brief Compares two vectors for equality.
     * @tparam T The type of elements in the vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @return True if vectors are equal, false otherwise.
     */
    template <typename T>
    bool compareVectors(const std::vector<T>& v1, const std::vector<T>& v2) {
        if (v1.size() != v2.size()) {
            return false;
        }
        for (size_t i = 0; i < v1.size(); ++i) {
            if (v1[i] != v2[i]) {
                return false;
            }
        }
        return true;
    }

} // namespace Utils

#endif // UTILITIES_H