import pytest
from main_algorithms.sqrt_x import my_sqrt

@pytest.mark.parametrize("x, expected", [
    (0, 0),
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 2),
    (8, 2),
    (9, 3),
    (10, 3),
    (15, 3),
    (16, 4),
    (24, 4),
    (25, 5),
    (36, 6),
    (99, 9),
    (100, 10),
    (120, 10),
    (121, 11),
    (2147395600, 46340), # 46340 * 46340 = 2147395600
    (2147483647, 46340), # Max int value (2^31 - 1), floor(sqrt(max_int))
])
def test_my_sqrt(x, expected):
    """
    Test cases for the integer square root function.
    """
    result = my_sqrt(x)
    assert result == expected