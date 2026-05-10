package com.greedy.problems;

import com.greedy.utils.DataStructures.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Unit tests for the {@link MinimizeCashFlow} class.
 * Ensures the cash flow minimization algorithm produces the correct
 * minimal set of transactions.
 */
public class MinimizeCashFlowTest {

    private MinimizeCashFlow solver;
    private static final double DELTA = 0.0001; // For double comparisons

    @BeforeEach
    void setUp() {
        solver = new MinimizeCashFlow();
    }

    @Test
    void testEmptyTransactions() {
        List<String> initialTransactions = Collections.emptyList();
        List<Transaction> result = solver.minimize(initialTransactions);
        assertTrue(result.isEmpty(), "Result should be empty for empty input.");
    }

    @Test
    void testSingleTransaction() {
        List<String> initialTransactions = Collections.singletonList("A,B,100");
        List<Transaction> expected = Collections.singletonList(new Transaction("A", "B", 100.0));
        List<Transaction> result = solver.minimize(initialTransactions);
        assertEqualsTransactionLists(expected, result);
    }

    @Test
    void testSimpleCycle_ThreePeople() {
        List<String> initialTransactions = Arrays.asList(
                "A,B,100",
                "B,C,50",
                "C,A,75"
        );
        // Balances: A: -25, B: +50, C: -25
        // Expected transactions: A pays B 25, C pays B 25 (or vice-versa for B and C, but A must pay B)
        // Set of transactions should be: (A,B,25), (C,B,25) or (C,B,25), (A,B,25)
        List<Transaction> expected = Arrays.asList(
                new Transaction("A", "B", 25.0),
                new Transaction("C", "B", 25.0)
        );
        List<Transaction> result = solver.minimize(initialTransactions);
        assertEqualsTransactionSets(expected, result);
    }

    @Test
    void testMultipleTransactions_ComplexScenario() {
        List<String> initialTransactions = Arrays.asList(
                "Alice,Bob,100",
                "Bob,Charlie,50",
                "David,Alice,200",
                "Charlie,David,30"
        );
        // Balances: Alice: 100, Bob: 50, Charlie: 20, David: -170
        // Expected transactions: David pays Alice 100, David pays Bob 50, David pays Charlie 20
        List<Transaction> expected = Arrays.asList(
                new Transaction("David", "Alice", 100.0),
                new Transaction("David", "Bob", 50.0),
                new Transaction("David", "Charlie", 20.0)
        );
        List<Transaction> result = solver.minimize(initialTransactions);
        assertEqualsTransactionSets(expected, result);
    }

    @Test
    void testAllBalancesZeroInitially() {
        List<String> initialTransactions = Arrays.asList(
                "A,B,100",
                "B,A,100"
        );
        // Balances: A: 0, B: 0
        List<Transaction> result = solver.minimize(initialTransactions);
        assertTrue(result.isEmpty(), "Result should be empty if all balances net to zero.");
    }

    @Test
    void testOnlyOnePersonInvolved_NoTransactions() {
        List<String> initialTransactions = Collections.singletonList("A,A,50");
        // Balances: A: 0 (pays itself, receives itself)
        List<Transaction> result = solver.minimize(initialTransactions);
        assertTrue(result.isEmpty(), "Transaction to self should result in empty minimized list.");
    }

    @Test
    void testIncompleteTransactionFormat() {
        List<String> initialTransactions = Collections.singletonList("A,B");
        assertThrows(IllegalArgumentException.class, () -> solver.minimize(initialTransactions));
    }

    @Test
    void testInvalidAmountFormat() {
        List<String> initialTransactions = Collections.singletonList("A,B,abc");
        assertThrows(NumberFormatException.class, () -> solver.minimize(initialTransactions));
    }

    @Test
    void testMultiplePeople_OneCreditorManyDebtors() {
        List<String> initialTransactions = Arrays.asList(
                "A,X,10",
                "B,X,20",
                "C,X,30"
        );
        // Balances: A: -10, B: -20, C: -30, X: +60
        // Expected: A pays X 10, B pays X 20, C pays X 30
        List<Transaction> expected = Arrays.asList(
                new Transaction("C", "X", 30.0), // Max debtor first
                new Transaction("B", "X", 20.0), // Next max debtor
                new Transaction("A", "X", 10.0)  // Last debtor
        );
        List<Transaction> result = solver.minimize(initialTransactions);
        assertEqualsTransactionSets(expected, result);
    }

    @Test
    void testMultiplePeople_OneDebtorManyCreditors() {
        List<String> initialTransactions = Arrays.asList(
                "X,A,10",
                "X,B,20",
                "X,C,30"
        );
        // Balances: X: -60, A: +10, B: +20, C: +30
        // Expected: X pays C 30, X pays B 20, X pays A 10
        List<Transaction> expected = Arrays.asList(
                new Transaction("X", "C", 30.0), // Max creditor first
                new Transaction("X", "B", 20.0), // Next max creditor
                new Transaction("X", "A", 10.0)  // Last creditor
        );
        List<Transaction> result = solver.minimize(initialTransactions);
        assertEqualsTransactionSets(expected, result);
    }

    /**
     * Helper to compare two lists of transactions, ignoring order.
     * Checks if both lists contain the same set of transactions.
     */
    private void assertEqualsTransactionSets(List<Transaction> expected, List<Transaction> actual) {
        assertEquals(expected.size(), actual.size(), "Number of minimized transactions mismatch.");

        // For sets, order does not matter. Use containsAll and check sizes.
        // Also ensure amounts are close for doubles
        for (Transaction expTxn : expected) {
            boolean found = false;
            for (Transaction actualTxn : actual) {
                if (expTxn.from.equals(actualTxn.from) &&
                        expTxn.to.equals(actualTxn.to) &&
                        Math.abs(expTxn.amount - actualTxn.amount) < DELTA) {
                    found = true;
                    break;
                }
            }
            assertTrue(found, "Expected transaction not found in actual result: " + expTxn);
        }

        // Do the reverse check too, though size check and one-way contains should suffice usually
        for (Transaction actualTxn : actual) {
            boolean found = false;
            for (Transaction expTxn : expected) {
                if (actualTxn.from.equals(expTxn.from) &&
                        actualTxn.to.equals(expTxn.to) &&
                        Math.abs(actualTxn.amount - expTxn.amount) < DELTA) {
                    found = true;
                    break;
                }
            }
            assertTrue(found, "Actual transaction not found in expected result: " + actualTxn);
        }
    }

    /**
     * Helper to compare two lists of transactions strictly by order.
     */
    private void assertEqualsTransactionLists(List<Transaction> expected, List<Transaction> actual) {
        assertEquals(expected.size(), actual.size(), "Number of minimized transactions mismatch.");
        for (int i = 0; i < expected.size(); i++) {
            Transaction expTxn = expected.get(i);
            Transaction actualTxn = actual.get(i);
            assertEquals(expTxn.from, actualTxn.from, "Payer mismatch at index " + i);
            assertEquals(expTxn.to, actualTxn.to, "Receiver mismatch at index " + i);
            assertEquals(expTxn.amount, actualTxn.amount, DELTA, "Amount mismatch at index " + i);
        }
    }
}