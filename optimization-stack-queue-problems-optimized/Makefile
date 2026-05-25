# Compiler
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -g

# Directories
BIN_DIR = bin
SRC_DIR = src
TESTS_DIR = tests
BENCHMARKS_DIR = benchmarks
BRUTE_FORCE_DIR = brute_force_examples
DOCS_DIR = docs

# Source files
MAIN_SRCS = $(SRC_DIR)/main.cpp $(SRC_DIR)/problems.cpp $(SRC_DIR)/utilities.cpp
TEST_SRCS = $(TESTS_DIR)/test_runner.cpp $(SRC_DIR)/problems.cpp $(SRC_DIR)/utilities.cpp
BENCHMARK_SRCS = $(BENCHMARKS_DIR)/benchmark.cpp $(SRC_DIR)/problems.cpp $(SRC_DIR)/utilities.cpp $(BRUTE_FORCE_DIR)/brute_force.cpp

# Output executables
MAIN_EXEC = $(BIN_DIR)/main
TEST_EXEC = $(BIN_DIR)/test_runner
BENCHMARK_EXEC = $(BIN_DIR)/benchmark

# All targets
.PHONY: all clean run_main run_tests run_benchmarks

all: $(BIN_DIR) $(MAIN_EXEC) $(TEST_EXEC) $(BENCHMARK_EXEC)

$(BIN_DIR):
	mkdir -p $(BIN_DIR)

$(MAIN_EXEC): $(MAIN_SRCS) $(SRC_DIR)/problems.h $(SRC_DIR)/utilities.h
	$(CXX) $(CXXFLAGS) $^ -o $@

$(TEST_EXEC): $(TEST_SRCS) $(SRC_DIR)/problems.h $(SRC_DIR)/utilities.h $(TESTS_DIR)/test_cases.h
	$(CXX) $(CXXFLAGS) $^ -o $@

$(BENCHMARK_EXEC): $(BENCHMARK_SRCS) $(SRC_DIR)/problems.h $(SRC_DIR)/utilities.h
	$(CXX) $(CXXFLAGS) $^ -o $@

run_main: $(MAIN_EXEC)
	./$(MAIN_EXEC)

run_tests: $(TEST_EXEC)
	./$(TEST_EXEC)

run_benchmarks: $(BENCHMARK_EXEC)
	./$(BENCHMARK_EXEC)

clean:
	rm -rf $(BIN_DIR)