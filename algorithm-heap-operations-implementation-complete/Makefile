```makefile
CXX = g++
CXXFLAGS = -Wall -Wextra -std=c++17 -O2

SRCDIR = src
TESTDIR = tests
BENCHDIR = benchmarks

MAIN_PROBLEMS_SRC = $(SRCDIR)/main_heap_problems.cpp
TEST_SUITE_SRC = $(TESTDIR)/test_suite.cpp
BENCHMARK_SUITE_SRC = $(BENCHDIR)/benchmark_suite.cpp

MAIN_PROBLEMS_OBJ = $(MAIN_PROBLEMS_SRC:.cpp=.o)
TEST_SUITE_OBJ = $(TEST_SUITE_SRC:.cpp=.o)
BENCHMARK_SUITE_OBJ = $(BENCHMARK_SUITE_SRC:.cpp=.o)

.PHONY: all clean run_main_problems run_tests run_benchmarks

all: main_problems run_tests run_benchmarks

main_problems: $(MAIN_PROBLEMS_SRC)
	$(CXX) $(CXXFLAGS) -o $@ $<

run_tests: $(TEST_SUITE_SRC)
	$(CXX) $(CXXFLAGS) -o $@ $<

run_benchmarks: $(BENCHMARK_SUITE_SRC)
	$(CXX) $(CXXFLAGS) -o $@ $<

clean:
	rm -f main_problems run_tests run_benchmarks $(MAIN_PROBLEMS_OBJ) $(TEST_SUITE_OBJ) $(BENCHMARK_SUITE_OBJ)
```
---