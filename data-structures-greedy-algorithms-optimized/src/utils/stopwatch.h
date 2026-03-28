```cpp
#ifndef STOPWATCH_H
#define STOPWATCH_H

#include <chrono>
#include <iostream>
#include <string>

/**
 * @brief A simple stopwatch utility for measuring execution time.
 *
 * This class provides basic functionality to start, stop, and retrieve
 * the elapsed time in various units. It's useful for performance benchmarking.
 */
class Stopwatch {
private:
    std::chrono::high_resolution_clock::time_point start_time;
    std::chrono::high_resolution_clock::time_point end_time;
    bool running;

public:
    /**
     * @brief Constructs a new Stopwatch object.
     * The stopwatch is initially stopped.
     */
    Stopwatch() : running(false) {}

    /**
     * @brief Starts the stopwatch.
     * If already running, it restarts the timer from the current moment.
     */
    void start() {
        start_time = std::chrono::high_resolution_clock::now();
        running = true;
    }

    /**
     * @brief Stops the stopwatch.
     * If not running, it does nothing.
     */
    void stop() {
        if (running) {
            end_time = std::chrono::high_resolution_clock::now();
            running = false;
        }
    }

    /**
     * @brief Resets the stopwatch to its initial stopped state.
     */
    void reset() {
        running = false;
        start_time = std::chrono::high_resolution_clock::time_point();
        end_time = std::chrono::high_resolution_clock::time_point();
    }

    /**
     * @brief Gets the elapsed time in milliseconds.
     * @return The elapsed time in milliseconds. If running, returns time from start to now.
     */
    long long elapsedMilliseconds() const {
        if (running) {
            auto current_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::milliseconds>(current_time - start_time).count();
        } else {
            return std::chrono::duration_cast<std::chrono::milliseconds>(end_time - start_time).count();
        }
    }

    /**
     * @brief Gets the elapsed time in microseconds.
     * @return The elapsed time in microseconds. If running, returns time from start to now.
     */
    long long elapsedMicroseconds() const {
        if (running) {
            auto current_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::microseconds>(current_time - start_time).count();
        } else {
            return std::chrono::duration_cast<std::chrono::microseconds>(end_time - start_time).count();
        }
    }

    /**
     * @brief Gets the elapsed time in nanoseconds.
     * @return The elapsed time in nanoseconds. If running, returns time from start to now.
     */
    long long elapsedNanoseconds() const {
        if (running) {
            auto current_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::nanoseconds>(current_time - start_time).count();
        } else {
            return std::chrono::duration_cast<std::chrono::nanoseconds>(end_time - start_time).count();
        }
    }

    /**
     * @brief Gets the elapsed time in seconds.
     * @return The elapsed time in seconds as a double. If running, returns time from start to now.
     */
    double elapsedSeconds() const {
        if (running) {
            auto current_time = std::chrono::high_resolution_clock::now();
            return std::chrono::duration_cast<std::chrono::duration<double>>(current_time - start_time).count();
        } else {
            return std::chrono::duration_cast<std::chrono::duration<double>>(end_time - start_time).count();
        }
    }

    /**
     * @brief Checks if the stopwatch is currently running.
     * @return True if running, false otherwise.
     */
    bool isRunning() const {
        return running;
    }
};

#endif // STOPWATCH_H

```