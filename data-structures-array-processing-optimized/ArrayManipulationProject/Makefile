```makefile
# Define project directories
SRCDIR := src
TESTDIR := tests
BENCHDIR := benchmarks
UTILSDIR := utils
BINDIR := bin
OBJDIR := obj
DOCSDIR := docs

# Compiler and flags
CXX := g++
CXXFLAGS := -Wall -Wextra -std=c++17 -O2 -g # -O2 for optimizations, -g for debugging info

# Google Test configuration
GTEST_DIR ?= /usr/src/gtest
GTEST_INC := $(GTEST_DIR)/include
GTEST_LIB := $(GTEST_DIR)/lib/libgtest.a $(GTEST_DIR)/lib/libgtest_main.a

# If gtest not found at default location, try local build
ifeq (,$(wildcard $(GTEST_LIB)))
    ifeq (,$(wildcard gtest_lib/libgtest.a))
        # If gtest not found, print instructions to download/build
        $(warning Google Test not found at $(GTEST_DIR) or gtest_lib/. Attempting to fetch/build.)
        $(info Run 'make fetch_gtest' to download and build Google Test locally.)
        # Default to an empty library path, which will cause link errors if not built.
        # The 'fetch_gtest' target will set up the local build.
        GTEST_LIB := gtest_lib/libgtest.a gtest_lib/libgtest_main.a
        GTEST_INC := gtest_lib/googletest/include
    endif
endif


# Include paths
INC_PATHS := -I$(SRCDIR) -I$(UTILSDIR) -I$(TESTDIR) -I$(GTEST_INC)

# Source files
SRC_FILES := $(SRCDIR)/array_manipulator.cpp
TEST_FILES := $(TESTDIR)/test_array_manipulator.cpp $(TESTDIR)/main_test.cpp
BENCH_FILES := $(BENCHDIR)/benchmark_array_manipulator.cpp

# Object files
OBJ_SRC := $(patsubst $(SRCDIR)/%.cpp, $(OBJDIR)/%.o, $(SRC_FILES))
OBJ_TEST := $(patsubst $(TESTDIR)/%.cpp, $(OBJDIR)/%.o, $(TEST_FILES))
OBJ_BENCH := $(patsubst $(BENCHDIR)/%.cpp, $(OBJDIR)/%.o, $(BENCH_FILES))

# Executables
TEST_RUNNER := $(BINDIR)/test_runner
BENCH_RUNNER := $(BINDIR)/benchmark_runner

.PHONY: all test benchmark clean fetch_gtest gtest_lib

all: $(TEST_RUNNER) $(BENCH_RUNNER)

# Create bin and obj directories
$(BINDIR):
	mkdir -p $(BINDIR)
$(OBJDIR):
	mkdir -p $(OBJDIR)

# Rule to compile source files into object files
$(OBJDIR)/%.o: $(SRCDIR)/%.cpp | $(OBJDIR)
	$(CXX) $(CXXFLAGS) $(INC_PATHS) -c $< -o $@

# Rule to compile test files into object files
$(OBJDIR)/%.o: $(TESTDIR)/%.cpp | $(OBJDIR)
	$(CXX) $(CXXFLAGS) $(INC_PATHS) -c $< -o $@

# Rule to compile benchmark files into object files
$(OBJDIR)/%.o: $(BENCHDIR)/%.cpp | $(OBJDIR)
	$(CXX) $(CXXFLAGS) $(INC_PATHS) -c $< -o $@

# Link test executable
$(TEST_RUNNER): $(OBJ_SRC) $(OBJ_TEST) $(BINDIR)
	$(CXX) $(CXXFLAGS) $(INC_PATHS) $(OBJ_SRC) $(OBJ_TEST) $(GTEST_LIB) -o $@ -pthread

# Link benchmark executable
$(BENCH_RUNNER): $(OBJ_SRC) $(OBJ_BENCH) $(BINDIR)
	$(CXX) $(CXXFLAGS) $(INC_PATHS) $(OBJ_SRC) $(OBJ_BENCH) -o $@

test: $(TEST_RUNNER)
	@echo "--- Running Tests ---"
	./$(TEST_RUNNER)

benchmark: $(BENCH_RUNNER)
	@echo "--- Running Benchmarks ---"
	./$(BENCH_RUNNER)

clean:
	@echo "Cleaning up build artifacts..."
	rm -rf $(BINDIR) $(OBJDIR) gtest_lib

# --- Google Test local build targets ---
GTEST_LOCAL_DIR := gtest_lib
GTEST_LOCAL_SRC := $(GTEST_LOCAL_DIR)/googletest/src

fetch_gtest: $(GTEST_LOCAL_DIR)/libgtest.a $(GTEST_LOCAL_DIR)/libgtest_main.a

$(GTEST_LOCAL_DIR):
	mkdir -p $(GTEST_LOCAL_DIR)
	@echo "Cloning Google Test into $(GTEST_LOCAL_DIR)..."
	git clone https://github.com/google/googletest.git $(GTEST_LOCAL_DIR)/googletest

$(GTEST_LOCAL_DIR)/libgtest.a $(GTEST_LOCAL_DIR)/libgtest_main.a: $(GTEST_LOCAL_DIR)
	@echo "Building Google Test libraries..."
	@cd $(GTEST_LOCAL_DIR)/googletest && cmake -S . -B build && cmake --build build
	@cp $(GTEST_LOCAL_DIR)/googletest/build/lib/libgtest.a $(GTEST_LOCAL_DIR)/libgtest.a
	@cp $(GTEST_LOCAL_DIR)/googletest/build/lib/libgtest_main.a $(GTEST_LOCAL_DIR)/libgtest_main.a
	@echo "Google Test built and copied to $(GTEST_LOCAL_DIR)."

```