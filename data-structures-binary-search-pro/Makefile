# Compiler
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -O2

# Directories
SRC_DIR = src
INCLUDE_DIR = include
TEST_DIR = tests
BENCH_DIR = benchmarks
BUILD_DIR = build

# Source files
BS_SRCS = $(SRC_DIR)/binary_search_problems.cpp
BF_SRCS = $(SRC_DIR)/brute_force_solutions.cpp
COMMON_SRCS = $(BS_SRCS) $(BF_SRCS)

# Object files (placed in BUILD_DIR)
BS_OBJS = $(patsubst $(SRC_DIR)/%.cpp, $(BUILD_DIR)/%.o, $(BS_SRCS))
BF_OBJS = $(patsubst $(SRC_DIR)/%.cpp, $(BUILD_DIR)/%.o, $(BF_SRCS))
COMMON_OBJS = $(BS_OBJS) $(BF_OBJS)

# Test executable
TEST_EXEC = $(BUILD_DIR)/test_binary_search
TEST_SRC = $(TEST_DIR)/test_binary_search.cpp
TEST_OBJS = $(BUILD_DIR)/test_binary_search.o

# Benchmark executable
BENCH_EXEC = $(BUILD_DIR)/benchmark_runner
BENCH_SRC = $(BENCH_DIR)/benchmark_runner.cpp
BENCH_OBJS = $(BUILD_DIR)/benchmark_runner.o
BENCH_TIMER_SRC = $(BENCH_DIR)/timer.h # Not a .cpp, but needs to be included
BENCH_TIMER_OBJ = $(BUILD_DIR)/timer.o # Not used directly as it's header-only

.PHONY: all test benchmark clean

all: test benchmark

# Rule to create build directory if it doesn't exist
$(BUILD_DIR):
	@mkdir -p $(BUILD_DIR)

# Generic rule for compiling .cpp to .o
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) -I$(INCLUDE_DIR) -c $< -o $@

$(BUILD_DIR)/%.o: $(TEST_DIR)/%.cpp $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) -I$(INCLUDE_DIR) -I$(TEST_DIR) -c $< -o $@

$(BUILD_DIR)/%.o: $(BENCH_DIR)/%.cpp $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) -I$(INCLUDE_DIR) -I$(BENCH_DIR) -c $< -o $@

# Build and run tests
test: $(TEST_EXEC)
	./$(TEST_EXEC)

$(TEST_EXEC): $(TEST_OBJS) $(COMMON_OBJS) $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) $^ -o $@

# Build and run benchmarks
benchmark: $(BENCH_EXEC)
	./$(BENCH_EXEC)

$(BENCH_EXEC): $(BENCH_OBJS) $(COMMON_OBJS) $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) $^ -o $@

clean:
	@rm -rf $(BUILD_DIR)
	@echo "Cleaned build directory."
---