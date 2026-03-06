import functools
import math

"""
Problem: Coin Change

This problem typically has two main variations:
1. Minimum Number of Coins: Given a target amount and a set of coin denominations,
   find the minimum number of coins needed to make up that amount. If the amount
   cannot be made up by any combination of the coins, return -1.
   (This is like an unbounded knapsack problem variant for minimum items).

2. Number of Ways to Make Change: Given a target amount and a set of coin denominations,
   find the number of combinations of coins that sum up to the target amount.
   (This is like an unbounded knapsack problem variant for counting ways).

Input:
- `coins`: A list of integers representing available coin denominations.
- `amount`: An integer representing the target amount.

Constraints:
- Assume an infinite supply of each coin denomination.
- Coin denominations are positive integers.
- Amount is a non-negative integer.

"""

# ==============================================================================
# Variation 1: Minimum Number of Coins
# ==============================================================================

def coin_change_min_coins_recursive(coins: list[int], amount: int) -> int:
    """
    Approach 1.1: Brute Force Recursion for Minimum Coins
    Calculates the minimum number of coins needed using direct recursion.

    Logic:
    To make change for `amount`, we can try using each coin denomination.
    If we use coin `c`, the remaining amount is `amount - c`.
    The total coins would be `1 + (minimum coins for amount - c)`.
    We take the minimum among all such possibilities.

    Base cases:
    - If `amount == 0`, 0 coins are needed.
    - If `amount < 0`, this path is invalid, return infinity.

    This approach recomputes subproblems extensively, leading to
    exponential time complexity.

    Time Complexity: O(len(coins)^amount) in the worst case, as each `amount`
                     can branch into `len(coins)` subproblems.
    Space Complexity: O(amount) - Due to recursion stack depth.
    """
    if amount == 0:
        return 0
    if amount < 0:
        return math.inf # Representing an impossible state

    min_count = math.inf
    for coin in coins:
        res = coin_change_min_coins_recursive(coins, amount - coin)
        if res != math.inf: # Only consider valid subproblem results
            min_count = min(min_count, 1 + res)

    return min_count if min_count != math.inf else -1


def coin_change_min_coins_memoization(coins: list[int], amount: int) -> int:
    """
    Approach 1.2: Memoization (Top-Down DP) for Minimum Coins
    Calculates the minimum number of coins using recursion with memoization.

    Logic:
    Similar to the brute force, but uses a `memo` array (or dictionary) to store
    results for already computed `amount` values.
    `memo[k]` stores the minimum coins for amount `k`. Initialize with -1 to
    indicate uncomputed states.

    Time Complexity: O(amount * len(coins)) - Each state from 0 to `amount` is
                     computed once, and each computation involves iterating through `len(coins)` options.
    Space Complexity: O(amount) - For the memoization table and recursion stack.
    """
    if amount == 0:
        return 0

    # Initialize memo table. -1 means not computed, math.inf means impossible to make change.
    memo = [-1] * (amount + 1)
    memo[0] = 0 # Base case: 0 coins for amount 0

    def solve(current_amount: int) -> int:
        if current_amount < 0:
            return math.inf # Impossible state

        if memo[current_amount] != -1:
            return memo[current_amount]

        min_count = math.inf
        for coin in coins:
            res = solve(current_amount - coin)
            if res != math.inf:
                min_count = min(min_count, 1 + res)

        memo[current_amount] = min_count
        return min_count

    result = solve(amount)
    return result if result != math.inf else -1


def coin_change_min_coins_tabulation(coins: list[int], amount: int) -> int:
    """
    Approach 1.3: Tabulation (Bottom-Up DP) for Minimum Coins
    Calculates the minimum number of coins iteratively using a 1D DP array.

    Logic:
    Create a `dp` array of size `amount + 1`, where `dp[i]` stores the minimum
    number of coins needed to make change for amount `i`.
    Initialize `dp[0] = 0` (0 coins for 0 amount) and all other `dp[i]` to `infinity`.

    Iterate from `i = 1` to `amount`:
    For each `i`, iterate through all `coin` denominations.
    If `i - coin >= 0` and `dp[i - coin]` is not infinity (meaning `i - coin` is reachable):
        `dp[i] = min(dp[i], 1 + dp[i - coin])`

    This means, to reach amount `i`, we can try adding any `coin` to a previously
    computed amount `i - coin`.

    Time Complexity: O(amount * len(coins)) - Two nested loops.
    Space Complexity: O(amount) - For the 1D DP array.
    """
    if amount == 0:
        return 0

    # dp[i] will store the minimum number of coins needed for amount 'i'
    # Initialize with infinity, except dp[0] = 0
    dp = [math.inf] * (amount + 1)
    dp[0] = 0

    # Iterate through all amounts from 1 to 'amount'
    for i in range(1, amount + 1):
        # For each amount, consider every coin denomination
        for coin in coins:
            # If the current coin can be used (i.e., remaining amount is non-negative)
            # and the subproblem (i - coin) is solvable
            if i - coin >= 0 and dp[i - coin] != math.inf:
                # Update dp[i] with the minimum of its current value and (1 + dp[i - coin])
                # 1 represents the current coin being used.
                dp[i] = min(dp[i], 1 + dp[i - coin])

    return dp[amount] if dp[amount] != math.inf else -1


# ==============================================================================
# Variation 2: Number of Ways to Make Change
# ==============================================================================

def coin_change_ways_recursive(coins: list[int], amount: int) -> int:
    """
    Approach 2.1: Brute Force Recursion for Number of Ways
    Calculates the number of ways to make change using direct recursion.

    Logic:
    This is often solved using a recursive function that takes `amount` and `coin_index`.
    For a given `(amount, coin_index)`, we have two choices:
    1. Exclude the current coin: `solve(amount, coin_index + 1)`
    2. Include the current coin: `solve(amount - coins[coin_index], coin_index)`
       (Notice we can reuse the same coin, hence `coin_index` doesn't change)

    Base cases:
    - If `amount == 0`, return 1 (one way to make change for 0: do nothing).
    - If `amount < 0`, return 0 (invalid state).
    - If `coin_index == len(coins)` and `amount > 0`, return 0 (no more coins, but amount remains).

    This approach suffers from redundant computations.

    Time Complexity: O(2^(amount + len(coins))) in the worst case (very rough).
    Space Complexity: O(amount + len(coins)) - Due to recursion stack.
    """
    n = len(coins)

    def solve(current_amount: int, coin_idx: int) -> int:
        if current_amount == 0:
            return 1 # One way to make change for 0 (by taking no coins)
        if current_amount < 0 or coin_idx == n:
            return 0 # No way to make change if amount is negative or no coins left

        # Option 1: Exclude the current coin
        ways_excluding = solve(current_amount, coin_idx + 1)

        # Option 2: Include the current coin (and potentially include it again)
        ways_including = solve(current_amount - coins[coin_idx], coin_idx)

        return ways_excluding + ways_including

    return solve(amount, 0)


def coin_change_ways_memoization(coins: list[int], amount: int) -> int:
    """
    Approach 2.2: Memoization (Top-Down DP) for Number of Ways
    Calculates the number of ways to make change using recursion with memoization.

    Logic:
    Similar to the brute force, but uses a 2D `memo` table where `memo[idx][amt]`
    stores the number of ways to make `amt` using coins from `idx` onwards.

    Time Complexity: O(amount * len(coins)) - Each state `(idx, amount)` is computed once.
    Space Complexity: O(amount * len(coins)) - For the memoization table and recursion stack.
    """
    n = len(coins)
    # memo[coin_idx][current_amount] stores ways to make current_amount
    memo = [[-1] * (amount + 1) for _ in range(n + 1)]

    def solve(current_amount: int, coin_idx: int) -> int:
        if current_amount == 0:
            return 1
        if current_amount < 0 or coin_idx == n:
            return 0

        if memo[coin_idx][current_amount] != -1:
            return memo[coin_idx][current_amount]

        # Option 1: Exclude current coin
        ways_excluding = solve(current_amount, coin_idx + 1)
        # Option 2: Include current coin
        ways_including = solve(current_amount - coins[coin_idx], coin_idx)

        memo[coin_idx][current_amount] = ways_excluding + ways_including
        return memo[coin_idx][current_amount]

    return solve(amount, 0)


def coin_change_ways_tabulation(coins: list[int], amount: int) -> int:
    """
    Approach 2.3: Tabulation (Bottom-Up DP) for Number of Ways
    Calculates the number of ways to make change iteratively using a 1D DP array.

    Logic:
    This is a classic unbounded knapsack variation for counting combinations.
    Create a `dp` array of size `amount + 1`, where `dp[i]` stores the number of
    ways to make change for amount `i`.
    Initialize `dp[0] = 1` (one way to make 0 amount: take no coins). All other `dp[i]` are 0.

    Iterate through each `coin` denomination:
        For each `coin`, iterate through `i` from `coin` to `amount`:
            `dp[i] += dp[i - coin]`

    The key idea here is that by iterating `coins` in the outer loop and `amount`
    in the inner loop (from left to right), we consider combinations.
    `dp[i - coin]` gives the number of ways to make `i - coin`. By adding `coin` to each
    of these ways, we get new ways to make `i`.

    Time Complexity: O(amount * len(coins)) - Two nested loops.
    Space Complexity: O(amount) - For the 1D DP array.
    """
    if amount == 0:
        return 1

    # dp[i] will store the number of ways to make change for amount 'i'
    dp = [0] * (amount + 1)
    dp[0] = 1 # There is one way to make amount 0 (by taking no coins)

    # Iterate through each coin denomination
    for coin in coins:
        # For each coin, update the ways to make amounts from 'coin' up to 'amount'
        # Iterate from 'coin' because we can only use a coin if the amount is at least its value.
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]

    return dp[amount]


# Example usage:
if __name__ == "__main__":
    coins_set = [1, 2, 5]
    target_amount = 11

    print(f"--- Coin Change Problem (Coins: {coins_set}, Amount: {target_amount}) ---")

    print("\n--- Minimum Number of Coins ---")
    # Expected for (1,2,5), 11:
    # 5+5+1 = 3 coins
    print(f"  Recursive (Brute Force): {coin_change_min_coins_recursive(coins_set, target_amount)}")
    print(f"  Memoization (Top-Down): {coin_change_min_coins_memoization(coins_set, target_amount)}")
    print(f"  Tabulation (Bottom-Up): {coin_change_min_coins_tabulation(coins_set, target_amount)}")
    print(f"  Expected Min Coins: 3")

    coins_set_impossible = [2]
    target_amount_impossible = 3
    print(f"\n--- Minimum Coins (Impossible Case: Coins: {coins_set_impossible}, Amount: {target_amount_impossible}) ---")
    print(f"  Recursive (Brute Force): {coin_change_min_coins_recursive(coins_set_impossible, target_amount_impossible)}")
    print(f"  Memoization (Top-Down): {coin_change_min_coins_memoization(coins_set_impossible, target_amount_impossible)}")
    print(f"  Tabulation (Bottom-Up): {coin_change_min_coins_tabulation(coins_set_impossible, target_amount_impossible)}")
    print(f"  Expected Min Coins: -1")


    coins_set_ways = [1, 2, 5]
    target_amount_ways = 5
    # Expected for (1,2,5), 5:
    # 5
    # 2+2+1
    # 2+1+1+1
    # 1+1+1+1+1
    # Total 4 ways if order matters, but for typical "number of ways" problem order doesn't matter (combinations).
    # Combinations (order does not matter):
    # (5)
    # (2, 2, 1)
    # (2, 1, 1, 1)
    # (1, 1, 1, 1, 1)
    # Total: 4 ways.
    # The `coin_change_ways_tabulation` approach correctly counts combinations.
    # However, if order *did* matter (permutations), then 1+2+2 is different from 2+1+2.
    # The current approaches count combinations.

    print(f"\n--- Number of Ways to Make Change (Coins: {coins_set_ways}, Amount: {target_amount_ways}) ---")
    print(f"  Recursive (Brute Force): {coin_change_ways_recursive(coins_set_ways, target_amount_ways)}")
    print(f"  Memoization (Top-Down): {coin_change_ways_memoization(coins_set_ways, target_amount_ways)}")
    print(f"  Tabulation (Bottom-Up): {coin_change_ways_tabulation(coins_set_ways, target_amount_ways)}")
    print(f"  Expected Number of Ways: 4")

    # Another example for ways
    coins_set_ways_2 = [1, 5, 10, 25]
    target_amount_ways_2 = 10
    # Expected ways for 10:
    # 10
    # 5+5
    # 5+1+1+1+1+1
    # 1+1+1+1+1+1+1+1+1+1
    # (10,1) = 1 (10)
    # (5,5) = 1
    # (5,1,1,1,1,1) = 1
    # (1,1,1,1,1,1,1,1,1,1) = 1
    # Ways including 10: 1 (10)
    # Ways not including 10 (target 10 with 1,5,25):
    # Ways including 5:
    #   (5,5)
    #   (5,1,1,1,1,1)
    # Ways not including 5 (target 10 with 1,25):
    #   (1,1,1,1,1,1,1,1,1,1)
    # Total: 4 ways.

    print(f"\n--- Number of Ways (Coins: {coins_set_ways_2}, Amount: {target_amount_ways_2}) ---")
    print(f"  Recursive (Brute Force): {coin_change_ways_recursive(coins_set_ways_2, target_amount_ways_2)}")
    print(f"  Memoization (Top-Down): {coin_change_ways_memoization(coins_set_ways_2, target_amount_ways_2)}")
    print(f"  Tabulation (Bottom-Up): {coin_change_ways_tabulation(coins_set_ways_2, target_amount_ways_2)}")
    print(f"  Expected Number of Ways: 4")