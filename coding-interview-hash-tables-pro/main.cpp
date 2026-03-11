#include <iostream>
#include <cstdlib> // For exit()

// Declare test and benchmark functions from their respective files
void runAllTests();
void runAllBenchmarks();

int main() {
    std::cout << "Starting Hash Table Interview Project..." << std::endl << std::endl;

    // Run all unit tests
    runAllTests();

    std::cout << "\n----------------------------------------\n" << std::endl;

    // Run all benchmarks
    runAllBenchmarks();

    std::cout << "\nHash Table Interview Project Finished." << std::endl;

    return 0;
}