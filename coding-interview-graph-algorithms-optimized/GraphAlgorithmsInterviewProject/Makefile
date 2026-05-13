```Makefile
# Compiler
CXX = g++
# Compiler flags:
# -Wall: Enable all standard warnings
# -Wextra: Enable extra warnings
# -std=c++17: Use C++17 standard
# -O3: Aggressive optimization level
# -g: Include debugging information (can be removed for release)
# -Isrc: Add src directory to include path
CXXFLAGS = -Wall -Wextra -std=c++17 -O3 -g -Isrc

# Executable name
TARGET = graph_solver

# Source files for the main executable
# main.cpp includes graph_problems.cpp and test_graph_problems.cpp
# This structure simplifies compilation for this project type.
SRCS = src/main.cpp

# Object files
OBJS = $(SRCS:.cpp=.o)

.PHONY: all clean test benchmark run

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) $(OBJS) -o $(TARGET)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

test: $(TARGET)
	@echo "Running tests..."
	./$(TARGET) test

benchmark: $(TARGET)
	@echo "Running benchmarks..."
	./$(TARGET) benchmark

run: $(TARGET)
	@echo "Running manual examples..."
	./$(TARGET)

clean:
	@echo "Cleaning up..."
	rm -f $(OBJS) $(TARGET)
	rm -rf *.dSYM # Remove macOS debug symbol directories
```