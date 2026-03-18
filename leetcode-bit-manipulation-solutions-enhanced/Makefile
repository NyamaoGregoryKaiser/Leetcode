```makefile
CXX = g++
CXXFLAGS = -Wall -Wextra -std=c++17 -O3 -pedantic # -O3 for optimization in benchmarks

# Directories
SRC_DIR = src
TEST_DIR = tests
BENCHMARK_DIR = benchmarks
DOCS_DIR = docs

# Source files
SRC_FILES = $(SRC_DIR)/bit_manipulation.cpp $(SRC_DIR)/utils.cpp
TEST_SRC = $(TEST_DIR)/test_bit_manipulation.cpp
BENCHMARK_SRC = $(BENCHMARK_DIR)/benchmark.cpp

# Output executables
TEST_EXEC = $(TEST_DIR)/run_tests
BENCHMARK_EXEC = $(BENCHMARK_DIR)/run_benchmarks

all: $(TEST_EXEC) $(BENCHMARK_EXEC)

$(TEST_EXEC): $(TEST_SRC) $(SRC_FILES)
	$(CXX) $(CXXFLAGS) -o $@ $(TEST_SRC) $(SRC_FILES)

$(BENCHMARK_EXEC): $(BENCHMARK_SRC) $(SRC_FILES)
	$(CXX) $(CXXFLAGS) -o $@ $(BENCHMARK_SRC) $(SRC_FILES)

# Rule to clean compiled files
clean:
	rm -f $(TEST_EXEC) $(BENCHMARK_EXEC)
	rm -f $(SRC_DIR)/*.o $(TEST_DIR)/*.o $(BENCHMARK_DIR)/*.o

.PHONY: all clean
```