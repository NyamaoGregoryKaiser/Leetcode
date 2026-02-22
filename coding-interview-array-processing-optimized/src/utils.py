import time
from functools import wraps

def measure_time(func):
    """
    A decorator to measure the execution time of a function.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        duration = (end_time - start_time) * 1000  # in milliseconds
        print(f"Function '{func.__name__}' took {duration:.2f} ms")
        return result
    return wrapper

def are_matrices_equal(matrix1, matrix2):
    """
    Compares two matrices for equality.
    Used mainly for testing matrix rotations.
    """
    if not matrix1 and not matrix2:
        return True
    if not matrix1 or not matrix2:
        return False
    if len(matrix1) != len(matrix2):
        return False
    for i in range(len(matrix1)):
        if len(matrix1[i]) != len(matrix2[i]):
            return False
        for j in range(len(matrix1[i])):
            if matrix1[i][j] != matrix2[i][j]:
                return False
    return True

def print_matrix(matrix):
    """
    Prints a matrix in a readable format.
    """
    if not matrix:
        print("[]")
        return
    max_len = 0
    for row in matrix:
        for x in row:
            max_len = max(max_len, len(str(x)))

    for row in matrix:
        print("[", end="")
        for i, x in enumerate(row):
            print(f"{str(x).rjust(max_len)}", end="")
            if i < len(row) - 1:
                print(", ", end="")
        print("]")

if __name__ == '__main__':
    # Example usage of measure_time
    @measure_time
    def slow_function():
        time.sleep(0.1)
        return "Done"

    print(slow_function())

    # Example usage of are_matrices_equal and print_matrix
    m1 = [[1, 2], [3, 4]]
    m2 = [[1, 2], [3, 4]]
    m3 = [[1, 2], [3, 5]]

    print("\nComparing matrices:")
    print_matrix(m1)
    print_matrix(m2)
    print(f"m1 == m2: {are_matrices_equal(m1, m2)}") # True
    print_matrix(m1)
    print_matrix(m3)
    print(f"m1 == m3: {are_matrices_equal(m1, m3)}") # False
---