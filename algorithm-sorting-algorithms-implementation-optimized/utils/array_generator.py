import random
from typing import List

class ArrayGenerator:
    """
    Utility class for generating various types of integer arrays for testing sorting algorithms.
    """

    @staticmethod
    def generate_random_array(size: int, min_val: int = 0, max_val: int = 100) -> List[int]:
        """
        Generates an array of random integers.

        Args:
            size (int): The number of elements in the array.
            min_val (int): The minimum possible value for an element.
            max_val (int): The maximum possible value for an element.

        Returns:
            List[int]: A list of random integers.
        """
        if size < 0:
            raise ValueError("Size cannot be negative.")
        if min_val > max_val:
            raise ValueError("min_val cannot be greater than max_val.")
        
        return [random.randint(min_val, max_val) for _ in range(size)]

    @staticmethod
    def generate_sorted_array(size: int, start_val: int = 0) -> List[int]:
        """
        Generates an array of integers already sorted in ascending order.

        Args:
            size (int): The number of elements in the array.
            start_val (int): The starting value for the first element.

        Returns:
            List[int]: A list of sorted integers.
        """
        if size < 0:
            raise ValueError("Size cannot be negative.")
            
        return [start_val + i for i in range(size)]

    @staticmethod
    def generate_reverse_sorted_array(size: int, start_val: int = 100) -> List[int]:
        """
        Generates an array of integers sorted in descending order.

        Args:
            size (int): The number of elements in the array.
            start_val (int): The starting (largest) value for the first element.

        Returns:
            List[int]: A list of reverse-sorted integers.
        """
        if size < 0:
            raise ValueError("Size cannot be negative.")

        return [start_val - i for i in range(size)]

    @staticmethod
    def generate_array_with_duplicates(size: int, min_val: int = 0, max_val: int = 10) -> List[int]:
        """
        Generates an array with a high probability of duplicates.
        This is achieved by making the range of possible values small relative to the array size.

        Args:
            size (int): The number of elements in the array.
            min_val (int): The minimum possible value for an element.
            max_val (int): The maximum possible value for an element.

        Returns:
            List[int]: A list of integers with duplicates.
        """
        if size < 0:
            raise ValueError("Size cannot be negative.")
        if min_val > max_val:
            raise ValueError("min_val cannot be greater than max_val.")
            
        return [random.randint(min_val, max_val) for _ in range(size)]

    @staticmethod
    def generate_all_same_elements_array(size: int, value: int = 5) -> List[int]:
        """
        Generates an array where all elements are the same.

        Args:
            size (int): The number of elements in the array.
            value (int): The value to fill the array with.

        Returns:
            List[int]: A list where all elements are identical.
        """
        if size < 0:
            raise ValueError("Size cannot be negative.")
            
        return [value] * size

if __name__ == '__main__':
    print("--- ArrayGenerator Demonstrations ---")
    print(f"Random array (size 10, 0-100): {ArrayGenerator.generate_random_array(10)}")
    print(f"Sorted array (size 10, start 0): {ArrayGenerator.generate_sorted_array(10)}")
    print(f"Reverse sorted array (size 10, start 100): {ArrayGenerator.generate_reverse_sorted_array(10)}")
    print(f"Array with duplicates (size 15, 0-5): {ArrayGenerator.generate_array_with_duplicates(15, 0, 5)}")
    print(f"All same elements array (size 7, value 10): {ArrayGenerator.generate_all_same_elements_array(7, 10)}")

    try:
        ArrayGenerator.generate_random_array(-5)
    except ValueError as e:
        print(f"Error for negative size: {e}")
    
    try:
        ArrayGenerator.generate_random_array(5, 10, 0)
    except ValueError as e:
        print(f"Error for min_val > max_val: {e}")