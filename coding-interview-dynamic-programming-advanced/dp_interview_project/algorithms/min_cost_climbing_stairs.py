```python
import functools
from typing import List

class MinCostClimbingStairs:
    """
    Implementations for the Min Cost Climbing Stairs problem.
    You are given an integer array `cost` where `cost[i]` is the cost of `i`th step.
    Once you pay the cost, you can either climb one or two steps.
    You can either start from index 0 or index 1.
    Return the minimum cost to reach the top of the floor.
    """

    @staticmethod
    def min_cost_recursive_bruteforce(cost: List[int]) -> int:
        """
        Calculates the minimum cost to reach the top using a naive recursive (brute-force) approach.
        From each step, it explores both options (1 step or 2 steps) and takes the minimum.

        Args:
            cost (List[int]): An array where cost[i] is the cost of the i-th step.

        Returns:
            int: The minimum cost to reach the top.

        Time Complexity: O(2^N) - Each call makes two more calls, leading to exponential growth.
        Space Complexity: O(N) - Due to the recursion stack depth.
        """
        n = len(cost)

        def solve(index):
            # Base Cases:
            # If we are past the last step (top of the floor), cost is 0
            if index >= n:
                return 0
            
            # Cost to take this step + minimum cost from next step OR next-next step
            cost_take_this_step = cost[index]
            
            # Calculate cost if we take 1 step from current position
            cost_one_step = cost_take_this_step + solve(index + 1)
            
            # Calculate cost if we take 2 steps from current position
            cost_two_steps = cost_take_this_step + solve(index + 2)
            
            return min(cost_one_step, cost_two_steps)

        # We can start from index 0 or index 1, so take the minimum of both starts.
        return min(solve(0), solve(1))

    @staticmethod
    @functools.lru_cache(maxsize=None)
    def min_cost_memoization(cost_tuple: tuple, index: int) -> int:
        """
        Calculates the minimum cost to reach the top using memoization (top-down Dynamic Programming).
        Memoizes the minimum cost to reach the top starting from a given `index`.

        Args:
            cost_tuple (tuple): A tuple of costs (for hashability with lru_cache).
            index (int): The current step index.

        Returns:
            int: The minimum cost to reach the top.

        Time Complexity: O(N) - Each state (index) is computed only once.
        Space Complexity: O(N) - For the memoization table (cache) and recursion stack.
        """
        cost = list(cost_tuple) # Convert back to list for indexing
        n = len(cost)

        # Base Cases:
        if index >= n:
            return 0
        
        cost_take_this_step = cost[index]
        
        cost_one_step = cost_take_this_step + MinCostClimbingStairs.min_cost_memoization(cost_tuple, index + 1)
        cost_two_steps = cost_take_this_step + MinCostClimbingStairs.min_cost_memoization(cost_tuple, index + 2)
        
        return min(cost_one_step, cost_two_steps)

    @staticmethod
    def min_cost_tabulation(cost: List[int]) -> int:
        """
        Calculates the minimum cost to reach the top using tabulation (bottom-up Dynamic Programming).
        Builds a DP array `dp` where `dp[i]` represents the minimum cost to reach step `i`.
        The "top" is considered one step past the last element in `cost`.

        Args:
            cost (List[int]): An array where cost[i] is the cost of the i-th step.

        Returns:
            int: The minimum cost to reach the top.

        Time Complexity: O(N) - A single loop iterates N times.
        Space Complexity: O(N) - For the DP array.
        """
        n = len(cost)
        
        # dp[i] will store the minimum cost to reach step i
        # We need to reach the 'top', which is effectively step n or n+1.
        # Let dp[i] be the minimum cost to reach the 'i-th floor'.
        # The 'floor' is after taking the step.
        # dp[0] = cost[0]
        # dp[1] = cost[1]
        # dp[i] = cost[i] + min(dp[i-1], dp[i-2]) - this is "min cost to reach step i AND pay its cost"

        # A common way is to define dp[i] as the minimum cost to reach the 'i'th point (after step i-1).
        # In this problem, `cost` array means `cost[i]` is cost *to take* step `i`.
        # The 'top' is one step beyond the last index.
        # So we need dp array of size n+1. dp[n] will be the answer.
        # dp[i] = min cost to reach position `i`.
        # dp[0] = 0 (cost to reach start, before any steps)
        # dp[1] = 0 (cost to reach first step, by starting there for free)
        # This setup is tricky. Let's define dp[i] as the min cost to reach step 'i' and be ready to climb from it.
        # Or, dp[i] as the min cost to reach the 'i'-th platform (after taking step i-1).
        # Let dp[i] = minimum cost to reach index `i` (meaning, just landed on `i`).
        # dp array size `n+1`. `dp[n]` is the cost to reach the 'top'.

        # dp[i] = minimum cost to reach the platform *after* step `i-1`.
        # dp array has size n+1, representing costs to reach platforms 0, 1, ..., n.
        # Platform 0 is before step 0. Platform 1 is after step 0. Platform n is the 'top'.
        dp = [0] * (n + 1)

        # Base cases:
        # Cost to reach platform 0 (before step 0) is 0.
        # Cost to reach platform 1 (after step 0, or by starting at step 1) is 0 initially.
        # dp[0] = 0 (start before step 0)
        # dp[1] = 0 (start before step 1)

        for i in range(2, n + 1):
            # To reach platform `i`, we could have come from platform `i-1` by taking step `i-1`,
            # or from platform `i-2` by taking step `i-1`.
            # cost[i-1] is the cost to take step `i-1`.
            # cost[i-2] is the cost to take step `i-2`.
            
            # To reach `i`, we must have taken step `i-1` or step `i-2`.
            # Minimum cost to reach `i` by taking step `i-1`: `dp[i-1] + cost[i-1]`
            # Minimum cost to reach `i` by taking step `i-2`: `dp[i-2] + cost[i-2]`
            
            # No, `dp[i]` represents min cost to reach step `i` (and then you can choose to skip it or not)
            # Let dp[i] be the minimum cost to reach *or pass* index `i`.
            # dp[0] = 0 (cost to reach start)
            # dp[1] = 0 (cost to reach start, implicitly)

            # Let's redefine: dp[i] is the minimum cost to reach the i-th step.
            # But we can start from 0 or 1 *for free*.
            # This means dp[0] = cost[0], dp[1] = cost[1].
            # Then we need to calculate up to N steps, and the answer is min(dp[N-1], dp[N-2]) (cost to reach top).
            # This is common. Let's use this definition:
            # `dp[i]` is the minimum cost to reach step `i`.

        # Redo based on the common interpretation where `dp[i]` is the minimum cost to reach `i`th step.
        # The total length `n` represents steps from 0 to n-1. The "top" is step `n`.
        # `dp[i]` = min cost to reach step `i`.
        # To reach step `i`, one must have come from step `i-1` or `i-2`.
        # The cost `cost[i]` is paid when *entering* step `i`.

        # Let `dp[i]` be the minimum cost to reach index `i` AND THEN start climbing from it.
        # The final answer is then the minimum of `dp[0]` and `dp[1]`.
        # No, that's not right for this problem.
        # The standard approach for this problem is:
        # dp[i] = min cost to reach `i` (which means after paying `cost[i]` if applicable).
        # dp array size `n+1`. `dp[n]` will be the minimum cost to reach the *top*.
        # dp[0] = 0 (cost to reach step 0 by starting there)
        # dp[1] = 0 (cost to reach step 1 by starting there)

        dp = [0] * (n + 1)
        # dp[i] stores the minimum cost to reach the i-th floor (after taking steps to arrive at it).
        # Base cases:
        # To reach floor 0 (before step 0), cost is 0.
        # To reach floor 1 (after step 0, or by starting at step 1), cost is 0 if starting at step 1.
        # The crucial part is that you can start at 0 or 1 without paying *their* costs.
        # This implies:
        dp[0] = 0
        dp[1] = 0

        for i in range(2, n + 1):
            # To reach floor `i` (i.e., just after step `i-1`),
            # we could have come from floor `i-1` by taking step `i-1`
            # OR from floor `i-2` by taking step `i-1`.
            # Cost for step `i-1` is `cost[i-1]`.
            
            # The definition is: `dp[i]` is the minimum cost to reach index `i` (which is the 'top' for a subproblem
            # if we consider `cost[0...i-1]` as the full problem).
            # `dp[i]` = min cost to reach *past* step `i-1`.
            # So `dp[n]` is the answer.
            
            # Option 1: Come from `i-1` by paying `cost[i-1]`
            cost_from_prev_step = dp[i - 1] + cost[i - 1]
            
            # Option 2: Come from `i-2` by paying `cost[i-2]`
            cost_from_two_steps_back = dp[i - 2] + cost[i - 2]
            
            dp[i] = min(cost_from_prev_step, cost_from_two_steps_back)
        
        return dp[n]


    @staticmethod
    def min_cost_space_optimized(cost: List[int]) -> int:
        """
        Calculates the minimum cost to reach the top using a space-optimized tabulation approach.
        Since dp[i] only depends on dp[i-1] and dp[i-2], we only need to store the
        last two computed values.

        Args:
            cost (List[int]): An array where cost[i] is the cost of the i-th step.

        Returns:
            int: The minimum cost to reach the top.

        Time Complexity: O(N) - A single loop iterates N times.
        Space Complexity: O(1) - Only a constant number of variables are used.
        """
        n = len(cost)

        if n == 0:
            return 0
        if n == 1: # Only one step, can start there, cost 0 to reach top (past this step)
            return 0 # Or cost[0] if you must pay for that step, but problem implies free start.
        
        # Initialize variables representing dp[i-2] and dp[i-1]
        # prev2 (dp[i-2]) stores min cost to reach 'floor' i-2
        # prev1 (dp[i-1]) stores min cost to reach 'floor' i-1
        
        # dp[0] = 0, dp[1] = 0
        prev2 = 0 # Corresponds to dp[i-2] when i=2, i.e., dp[0]
        prev1 = 0 # Corresponds to dp[i-1] when i=2, i.e., dp[1]

        # Iterate from i=2 up to n (to calculate dp[n])
        for i in range(2, n + 1):
            # To calculate current_cost (dp[i]):
            # Option 1: Come from prev1 (floor i-1) by paying cost[i-1]
            cost_from_prev1 = prev1 + cost[i - 1]
            
            # Option 2: Come from prev2 (floor i-2) by paying cost[i-2]
            cost_from_prev2 = prev2 + cost[i - 2]
            
            current_cost = min(cost_from_prev1, cost_from_prev2)
            
            # Update prev2 and prev1 for the next iteration
            prev2 = prev1
            prev1 = current_cost
        
        return prev1 # prev1 will hold dp[n] at the end

# Example Usage:
if __name__ == '__main__':
    print("--- Min Cost Climbing Stairs ---")

    # Example 1
    cost1 = [10, 15, 20]
    print(f"\nCost: {cost1}")
    print(f"Brute Force: {MinCostClimbingStairs.min_cost_recursive_bruteforce(cost1)}")
    # For memoization, cost must be hashable, so pass a tuple
    print(f"Memoization: {MinCostClimbingStairs.min_cost_memoization(tuple(cost1), 0)}") # Start from 0
    MinCostClimbingStairs.min_cost_memoization.cache_clear()
    print(f"Memoization (starting from 1): {MinCostClimbingStairs.min_cost_memoization(tuple(cost1), 1)}") # Start from 1
    MinCostClimbingStairs.min_cost_memoization.cache_clear()
    # The actual solution should call min(solve(0), solve(1)) on the memoized function:
    min_cost_memo_sol = min(
        MinCostClimbingStairs.min_cost_memoization(tuple(cost1), 0),
        MinCostClimbingStairs.min_cost_memoization(tuple(cost1), 1)
    )
    print(f"Memoization (min of 0 or 1 start): {min_cost_memo_sol}")
    MinCostClimbingStairs.min_cost_memoization.cache_clear() # Clear after full solution
    print(f"Tabulation: {MinCostClimbingStairs.min_cost_tabulation(cost1)}")
    print(f"Space Optimized Tabulation: {MinCostClimbingStairs.min_cost_space_optimized(cost1)}")
    # Expected: 15 (Start at index 1, pay 15, then climb two steps to top)

    # Example 2
    cost2 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
    print(f"\nCost: {cost2}")
    print(f"Brute Force: {MinCostClimbingStairs.min_cost_recursive_bruteforce(cost2)}")
    min_cost_memo_sol2 = min(
        MinCostClimbingStairs.min_cost_memoization(tuple(cost2), 0),
        MinCostClimbingStairs.min_cost_memoization(tuple(cost2), 1)
    )
    print(f"Memoization (min of 0 or 1 start): {min_cost_memo_sol2}")
    MinCostClimbingStairs.min_cost_memoization.cache_clear()
    print(f"Tabulation: {MinCostClimbingStairs.min_cost_tabulation(cost2)}")
    print(f"Space Optimized Tabulation: {MinCostClimbingStairs.min_cost_space_optimized(cost2)}")
    # Expected: 6 (Follow path 0->2->3->4->6->7->9, total 1+1+1+1+1+1 = 6)

    # Edge cases
    print("\n--- Edge Cases ---")
    print(f"Empty cost ([]): {MinCostClimbingStairs.min_cost_tabulation([])}") # Expected: 0
    print(f"Single cost ([10]): {MinCostClimbingStairs.min_cost_tabulation([10])}") # Expected: 0
    print(f"Two costs ([10, 1]): {MinCostClimbingStairs.min_cost_tabulation([10, 1])}") # Expected: 1 (start at 1, pay 1, done)
    print(f"Two costs ([1, 10]): {MinCostClimbingStairs.min_cost_tabulation([1, 10])}") # Expected: 1 (start at 0, pay 1, done)
```