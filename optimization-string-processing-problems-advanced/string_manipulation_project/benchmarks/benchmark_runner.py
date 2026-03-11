import unittest
import sys
import os

# Add the parent directory of 'tests' to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from tests.test_performance import PerformanceTest

def run_performance_benchmarks():
    """
    Runs the performance tests defined in tests/test_performance.py.
    """
    print("--- Running Performance Benchmarks for String Manipulation Algorithms ---")
    
    # Create a TestSuite and add tests from PerformanceTest
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(PerformanceTest))

    # Create a TestRunner and run the suite.
    # We use a TextTestRunner to print results to console.
    runner = unittest.TextTestRunner(verbosity=1)
    runner.run(suite)

    print("\n--- Benchmarks Finished ---")

if __name__ == '__main__':
    run_performance_benchmarks()