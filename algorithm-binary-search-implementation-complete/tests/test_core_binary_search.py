"""
Test module for core Binary Search implementations.
Tests various functions from algorithms.core_binary_search.
"""

import pytest
from algorithms.core_binary_search import (
    linear_search,
    binary_search_iterative,
    binary_search_recursive,
    binary_search_template_leftmost,
    binary_search_template_rightmost,
    find_first_occurrence_using_leftmost_template,
    find_last_occurrence_using_rightmost_template
)

# Test data for all core functions
TEST_CASES_STANDARD = [
    ([1, 2, 3, 4, 5], 3, 2),  # Target in middle
    ([1, 2, 3, 4, 5], 1, 0),  # Target at start
    ([1, 2, 3, 4, 5], 5, 4),  # Target at end
    ([1, 2, 3, 4, 5], 0, -1), # Target not found (less than min)
    ([1, 2, 3, 4, 5], 6, -1), # Target not found (greater than max)
    ([1, 3, 5, 7, 9], 4, -1), # Target not found (in between)
    ([], 5, -1),              # Empty array
    ([7], 7, 0),              # Single element array (found)
    ([7], 5, -1),             # Single element array (not found)
    ([1, 2, 2, 3, 4], 2, 1),  # Duplicates, any occurrence
    ([1, 2, 2, 3, 4], 1, 0),
    ([1, 2, 2, 3, 4], 4, 4),
    ([10, 20, 30, 40, 50, 60], 30, 2),
    ([10, 20, 30, 40, 50, 60], 55, -1),
]

# Test data for leftmost/rightmost templates (first/last occurrence, insertion point)
# Format: (arr, target, expected_leftmost_idx, expected_rightmost_idx)
TEST_CASES_TEMPLATES = [
    ([1, 2, 3, 4, 5], 3, 2, 3), # Target in middle
    ([1, 2, 3, 4, 5], 1, 0, 1), # Target at start
    ([1, 2, 3, 4, 5], 5, 4, 5), # Target at end
    ([1, 2, 3, 4, 5], 0, 0, 0), # Target not found (less than min)
    ([1, 2, 3, 4, 5], 6, 5, 5), # Target not found (greater than max)
    ([1, 3, 5, 7, 9], 4, 2, 2), # Target not found (in between 3 and 5) -> 5 at index 2
    ([], 5, 0, 0),              # Empty array
    ([7], 7, 0, 1),             # Single element array (found)
    ([7], 5, 0, 0),             # Single element array (not found, less than 7)
    ([7], 9, 1, 1),             # Single element array (not found, greater than 7)
    ([1, 2, 2, 3, 4], 2, 1, 3), # Duplicates: first 2 at 1, first >2 at 3 (which is 3)
    ([1, 2, 2, 3, 4], 1, 0, 1),
    ([1, 2, 2, 3, 4], 4, 4, 5),
    ([1, 1, 1, 1, 1], 1, 0, 5), # All duplicates
    ([1, 3, 5, 5, 5, 7], 5, 2, 5), # Multiple duplicates in middle
    ([1, 3, 5, 5, 5, 7], 0, 0, 0),
    ([1, 3, 5, 5, 5, 7], 8, 6, 6),
]


# --- Linear Search Tests ---
@pytest.mark.parametrize("arr, target, expected_idx", TEST_CASES_STANDARD)
def test_linear_search(arr, target, expected_idx):
    """Test linear_search against various scenarios."""
    if expected_idx != -1 and arr:
        # For duplicates, linear_search might return the first match.
        # Ensure our expected_idx is one of the valid matches for arr.
        if arr.count(target) > 0:
            assert arr[linear_search(arr, target)] == target
        else:
            assert linear_search(arr, target) == expected_idx
    else:
        assert linear_search(arr, target) == expected_idx


# --- Iterative Binary Search Tests ---
@pytest.mark.parametrize("arr, target, expected_idx", TEST_CASES_STANDARD)
def test_binary_search_iterative(arr, target, expected_idx):
    """Test binary_search_iterative against various scenarios."""
    if expected_idx != -1 and arr:
        # For duplicates, binary_search_iterative might return any match.
        # Just ensure if it finds an index, the element at that index is the target.
        result = binary_search_iterative(arr, target)
        assert arr[result] == target
    else:
        assert binary_search_iterative(arr, target) == expected_idx


# --- Recursive Binary Search Tests ---
@pytest.mark.parametrize("arr, target, expected_idx", TEST_CASES_STANDARD)
def test_binary_search_recursive(arr, target, expected_idx):
    """Test binary_search_recursive against various scenarios."""
    if expected_idx != -1 and arr:
        # For duplicates, binary_search_recursive might return any match.
        result = binary_search_recursive(arr, target)
        assert arr[result] == target
    else:
        assert binary_search_recursive(arr, target) == expected_idx


# --- Leftmost Template Tests ---
@pytest.mark.parametrize("arr, target, expected_leftmost_idx, _", TEST_CASES_TEMPLATES)
def test_binary_search_template_leftmost(arr, target, expected_leftmost_idx, _):
    """Test binary_search_template_leftmost for first occurrence/insertion point."""
    assert binary_search_template_leftmost(arr, target) == expected_leftmost_idx


# --- Rightmost Template Tests ---
@pytest.mark.parametrize("arr, target, _, expected_rightmost_idx", TEST_CASES_TEMPLATES)
def test_binary_search_template_rightmost(arr, target, _, expected_rightmost_idx):
    """Test binary_search_template_rightmost for first element > target."""
    assert binary_search_template_rightmost(arr, target) == expected_rightmost_idx


# --- Combined First/Last Occurrence using Templates Tests ---
@pytest.mark.parametrize("arr, target, expected_leftmost_idx, expected_rightmost_idx", TEST_CASES_TEMPLATES)
def test_find_first_occurrence_using_leftmost_template(arr, target, expected_leftmost_idx, expected_rightmost_idx):
    """Test find_first_occurrence_using_leftmost_template for explicit first occurrence."""
    # This function returns -1 if target is not found, unlike the raw template
    if expected_leftmost_idx < len(arr) and arr[expected_leftmost_idx] == target:
        assert find_first_occurrence_using_leftmost_template(arr, target) == expected_leftmost_idx
    else:
        assert find_first_occurrence_using_leftmost_template(arr, target) == -1


@pytest.mark.parametrize("arr, target, expected_leftmost_idx, expected_rightmost_idx", TEST_CASES_TEMPLATES)
def test_find_last_occurrence_using_rightmost_template(arr, target, expected_leftmost_idx, expected_rightmost_idx):
    """Test find_last_occurrence_using_rightmost_template for explicit last occurrence."""
    # This function returns -1 if target is not found, unlike the raw template
    if expected_leftmost_idx < len(arr) and arr[expected_leftmost_idx] == target: # Check if target actually exists
        assert find_last_occurrence_using_rightmost_template(arr, target) == expected_rightmost_idx - 1
    else:
        assert find_last_occurrence_using_rightmost_template(arr, target) == -1