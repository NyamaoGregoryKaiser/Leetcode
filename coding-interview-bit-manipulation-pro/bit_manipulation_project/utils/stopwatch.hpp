```cpp
#ifndef STOPWATCH_HPP
#define STOPWATCH_HPP

#include <chrono> // For std::chrono

/**
 * @brief A simple stopwatch utility to measure elapsed time.
 *        Uses C++11 std::chrono for high-resolution timing.
 */
class Stopwatch {
public:
    /**
     * @brief Constructor for Stopwatch.
     *        Automatically starts the timer upon creation.
     */
    Stopwatch() {
        start();
    }

    /**
     * @brief Starts or restarts the stopwatch.
     */
    void start() {
        start_time_ = std::chrono::high_resolution_clock::now();
        running_ = true;
    }

    /**
     * @brief Stops the stopwatch.
     * @return The elapsed time in milliseconds since the last start.
     */
    double stop() {
        if (running_) {
            end_time_ = std::chrono::high_resolution_clock::now();
            running_ = false;
        }
        return getElapsedTimeMilliseconds();
    }

    /**
     * @brief Gets the elapsed time since the last start without stopping the stopwatch.
     *        If the stopwatch is running, it calculates time up to the current moment.
     *        If stopped, it returns the time between start and stop.
     * @return The elapsed time in milliseconds.
     */
    double getElapsedTimeMilliseconds() const {
        std::chrono::time_point<std::chrono::high_resolution_clock> current_end_time =
            running_ ? std::chrono::high_resolution_clock::now() : end_time_;

        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(current_end_time - start_time_);
        return duration.count() / 1000000.0; // Convert nanoseconds to milliseconds
    }

    /**
     * @brief Gets the elapsed time since the last start without stopping the stopwatch.
     * @return The elapsed time in microseconds.
     */
    double getElapsedTimeMicroseconds() const {
        std::chrono::time_point<std::chrono::high_resolution_clock> current_end_time =
            running_ ? std::chrono::high_resolution_clock::now() : end_time_;

        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(current_end_time - start_time_);
        return duration.count() / 1000.0; // Convert nanoseconds to microseconds
    }

    /**
     * @brief Gets the elapsed time since the last start without stopping the stopwatch.
     * @return The elapsed time in seconds.
     */
    double getElapsedTimeSeconds() const {
        return getElapsedTimeMilliseconds() / 1000.0;
    }

private:
    std::chrono::time_point<std::chrono::high_resolution_clock> start_time_;
    std::chrono::time_point<std::chrono::high_resolution_clock> end_time_;
    bool running_;
};

#endif // STOPWATCH_HPP
```