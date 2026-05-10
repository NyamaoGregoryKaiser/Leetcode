package com.greedy.problems;

import com.greedy.utils.DataStructures.Item;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for the {@link FractionalKnapsack} class.
 * Tests various scenarios for the fractional knapsack problem.
 */
public class FractionalKnapsackTest {

    private FractionalKnapsack solver;
    private static final double DELTA = 0.0001; // For double comparisons

    @BeforeEach
    void setUp() {
        solver = new FractionalKnapsack();
    }

    @Test
    void testEmptyItems() {
        Item[] items = {};
        assertEquals(0.0, solver.solveFractionalKnapsack(10, items), DELTA, "Should return 0.0 for empty items.");
    }

    @Test
    void testNullItems() {
        Item[] items = null;
        assertEquals(0.0, solver.solveFractionalKnapsack(10, items), DELTA, "Should return 0.0 for null items.");
    }

    @Test
    void testZeroCapacity() {
        Item[] items = {new Item(10, 100)};
        assertEquals(0.0, solver.solveFractionalKnapsack(0, items), DELTA, "Should return 0.0 for zero capacity.");
    }

    @Test
    void testNegativeCapacity() {
        Item[] items = {new Item(10, 100)};
        assertEquals(0.0, solver.solveFractionalKnapsack(-5, items), DELTA, "Should return 0.0 for negative capacity.");
    }

    @Test
    void testSingleItem_Fits() {
        Item[] items = {new Item(10, 100)};
        assertEquals(100.0, solver.solveFractionalKnapsack(10, items), DELTA, "Should take the single item.");
    }

    @Test
    void testSingleItem_Fraction() {
        Item[] items = {new Item(10, 100)};
        assertEquals(50.0, solver.solveFractionalKnapsack(5, items), DELTA, "Should take half of the single item.");
    }

    @Test
    void testMultipleItems_AllFit() {
        Item[] items = {
                new Item(10, 60), // v/w=6
                new Item(20, 100),// v/w=5
                new Item(30, 120) // v/w=4
        };
        // Capacity 60. All fit. Total value = 60+100+120 = 280
        assertEquals(280.0, solver.solveFractionalKnapsack(60, items), DELTA, "Should take all items if they fit.");
    }

    @Test
    void testMultipleItems_StandardCase() {
        Item[] items = {
                new Item(10, 60),  // v/w = 6.0
                new Item(20, 100), // v/w = 5.0
                new Item(30, 120)  // v/w = 4.0
        };
        int capacity = 50;
        // Sorted by v/w (desc): (10,60) -> 6, (20,100) -> 5, (30,120) -> 4
        // 1. Take (10,60) wholly. Capacity = 50 - 10 = 40. Total Value = 60.
        // 2. Take (20,100) wholly. Capacity = 40 - 20 = 20. Total Value = 60 + 100 = 160.
        // 3. Take fraction of (30,120). Remaining capacity = 20. Fraction = 20/30 = 2/3.
        //    Value from fraction = (2/3) * 120 = 80.
        //    Total Value = 160 + 80 = 240.
        assertEquals(240.0, solver.solveFractionalKnapsack(capacity, items), DELTA, "Standard case should yield correct max value.");
    }

    @Test
    void testMultipleItems_DifferentOrderInput() {
        Item[] items = {
                new Item(30, 120),  // v/w = 4.0
                new Item(10, 60),   // v/w = 6.0
                new Item(20, 100)   // v/w = 5.0
        };
        int capacity = 50;
        // Expected value is same as testMultipleItems_StandardCase because sorting handles order.
        assertEquals(240.0, solver.solveFractionalKnapsack(capacity, items), DELTA, "Should work regardless of initial item order.");
    }

    @Test
    void testItemsWithZeroWeight_ShouldBeHandled() {
        Item[] items = {
                new Item(0, 100), // Should ideally be ignored or cause division by zero. Item constructor handles this.
                new Item(10, 50)
        };
        // The current Item constructor computes valuePerWeight as value/weight.
        // If weight is 0, it results in Double.POSITIVE_INFINITY or NaN.
        // For Double.POSITIVE_INFINITY, it will be sorted first.
        // The problem description typically implies positive weights.
        // If an item has weight 0, its value-per-weight is infinite, so it should always be taken.
        // Taking (0, 100) gives 100 value, then remaining capacity is 10. Take (10, 50).
        // Total value = 100 + 50 = 150.
        int capacity = 10;
        Item zeroWeightItem = new Item(0, 100); // v/w -> infinity
        Item normalItem = new Item(10, 50);    // v/w -> 5.0
        Item[] testItems = {zeroWeightItem, normalItem};

        assertEquals(150.0, solver.solveFractionalKnapsack(capacity, testItems), DELTA, "Should correctly handle items with zero weight.");
    }

    @Test
    void testItemsWithZeroValue() {
        Item[] items = {
                new Item(10, 0),    // v/w = 0.0
                new Item(20, 100)   // v/w = 5.0
        };
        int capacity = 15;
        // Sorted by v/w: (20,100) -> 5, (10,0) -> 0
        // 1. Take fraction of (20,100). Remaining capacity = 15. Fraction = 15/20 = 0.75.
        //    Value = 0.75 * 100 = 75.
        assertEquals(75.0, solver.solveFractionalKnapsack(capacity, items), DELTA, "Should ignore zero value items if better options exist.");
    }

    @Test
    void testCapacityLargerThanTotalWeight() {
        Item[] items = {
                new Item(10, 60),
                new Item(20, 100)
        };
        int capacity = 100; // Total weight of items is 30, capacity is 100
        // Should take all items: 60 + 100 = 160
        assertEquals(160.0, solver.solveFractionalKnapsack(capacity, items), DELTA, "Should take all items if total weight is less than capacity.");
    }
}