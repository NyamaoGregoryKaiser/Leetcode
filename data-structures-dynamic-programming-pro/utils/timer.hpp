```cpp
#ifndef TIMER_HPP
#define TIMER_HPP

#include <chrono>
#include <iostream>
#include <string>

// A simple utility class to measure execution time.
class Timer {
public:
    Timer() {
        start_time_ = std::chrono::high_resolution_clock::now();
    }

    ~Timer() {
        // Optional: Can print duration here if desired, but typically called explicitly.
    }

    void reset() {
        start_time_ = std::chrono::high_resolution_clock::now();
    }

    double elapsed_ms() const {
        auto end_time = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end_time - start_time_).count() / 1000000.0;
    }

    double elapsed_s() const {
        return elapsed_ms() / 1000.0;
    }

    void print_elapsed(const std::string& task_name = "") const {
        std::cout << (task_name.empty() ? "Elapsed time" : task_name)
                  << ": " << elapsed_ms() << " ms\n";
    }

private:
    std::chrono::high_resolution_clock::time_point start_time_;
};

#endif // TIMER_HPP

```