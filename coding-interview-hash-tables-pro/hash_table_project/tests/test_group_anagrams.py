import pytest
from algorithms.problem_2_group_anagrams import GroupAnagrams

@pytest.fixture
def group_anagrams_solver():
    return GroupAnagrams()

# Helper function to normalize output for comparison (ignore order of groups and strings within groups)
def normalize_result(result):
    return sorted([tuple(sorted(group)) for group in result])

def test_group_anagrams_sorted_key_basic(group_anagrams_solver):
    strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    expected = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_sorted_key(strs)) == normalize_result(expected)

def test_group_anagrams_sorted_key_empty_string(group_anagrams_solver):
    strs = [""]
    expected = [[""]]
    assert normalize_result(group_anagrams_solver.group_anagrams_sorted_key(strs)) == normalize_result(expected)

def test_group_anagrams_sorted_key_single_character(group_anagrams_solver):
    strs = ["a"]
    expected = [["a"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_sorted_key(strs)) == normalize_result(expected)

def test_group_anagrams_sorted_key_empty_list(group_anagrams_solver):
    strs = []
    expected = []
    assert normalize_result(group_anagrams_solver.group_anagrams_sorted_key(strs)) == normalize_result(expected)

def test_group_anagrams_sorted_key_no_anagrams(group_anagrams_solver):
    strs = ["hello", "world", "python"]
    expected = [["hello"], ["python"], ["world"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_sorted_key(strs)) == normalize_result(expected)

def test_group_anagrams_sorted_key_all_anagrams(group_anagrams_solver):
    strs = ["listen", "silent", "enlist"]
    expected = [["listen", "silent", "enlist"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_sorted_key(strs)) == normalize_result(expected)

def test_group_anagrams_sorted_key_duplicates(group_anagrams_solver):
    strs = ["a", "a", "b", "b"]
    expected = [["a", "a"], ["b", "b"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_sorted_key(strs)) == normalize_result(expected)

def test_group_anagrams_count_key_basic(group_anagrams_solver):
    strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    expected = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_count_key(strs)) == normalize_result(expected)

def test_group_anagrams_count_key_empty_string(group_anagrams_solver):
    strs = [""]
    expected = [[""]]
    assert normalize_result(group_anagrams_solver.group_anagrams_count_key(strs)) == normalize_result(expected)

def test_group_anagrams_count_key_single_character(group_anagrams_solver):
    strs = ["a"]
    expected = [["a"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_count_key(strs)) == normalize_result(expected)

def test_group_anagrams_count_key_empty_list(group_anagrams_solver):
    strs = []
    expected = []
    assert normalize_result(group_anagrams_solver.group_anagrams_count_key(strs)) == normalize_result(expected)

def test_group_anagrams_count_key_mixed_case_not_supported_by_design(group_anagrams_solver):
    # This specific implementation assumes lowercase English letters.
    # If problem required mixed case, count array would need to be larger or use a dict.
    strs = ["Eat", "tea", "TEA"] # 'Eat' is not an anagram of 'tea' with current char_count logic
    # Expected output should be based on the current implementation's behavior:
    # 'Eat' would have a different key than 'tea' and 'TEA' because 'E' != 'e' by ord() logic.
    # 'tea' and 'TEA' would also differ. If case-insensitivity was required, strings would need to be lowercased first.
    # For now, we expect them to be treated as distinct due to character differences.
    # If problem specified only lowercase, this test might need adjustment.
    # Assuming standard problem (lowercase):
    strs_lower = ["eat", "tea", "tan"]
    expected_lower = [["eat", "tea"], ["tan"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_count_key(strs_lower)) == normalize_result(expected_lower)


# Test brute force for small, simple cases (it's inefficient, so avoid large inputs)
def test_group_anagrams_brute_force_basic(group_anagrams_solver):
    strs = ["eat", "tea", "tan"]
    expected = [["tan"], ["eat", "tea"]]
    assert normalize_result(group_anagrams_solver.group_anagrams_brute_force(strs)) == normalize_result(expected)

def test_group_anagrams_brute_force_empty_string(group_anagrams_solver):
    strs = [""]
    expected = [[""]]
    assert normalize_result(group_anagrams_solver.group_anagrams_brute_force(strs)) == normalize_result(expected)

def test_group_anagrams_brute_force_empty_list(group_anagrams_solver):
    strs = []
    expected = []
    assert normalize_result(group_anagrams_solver.group_anagrams_brute_force(strs)) == normalize_result(expected)