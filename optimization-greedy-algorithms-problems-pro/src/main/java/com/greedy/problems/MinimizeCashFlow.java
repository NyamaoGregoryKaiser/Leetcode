package com.greedy.problems;

import com.greedy.utils.DataStructures.Transaction;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Comparator;
import java.util.stream.Collectors;

/**
 * **Problem: Minimize Cash Flow Among a Given Set of Friends (or Accounts)**
 *
 * Given a list of transactions where A pays B an amount `X`, the goal is to
 * settle all debts such that the total number of transactions is minimized.
 *
 * **Input Format:** A list of transactions (payer, receiver, amount).
 * **Output Format:** A list of minimized transactions.
 *
 * **Greedy Strategy:**
 * The problem can be modeled as a directed graph where an edge from A to B with weight X means
 * A owes B `X`. The goal is to find a set of transactions to balance all accounts such that
 * the number of transactions is minimal.
 *
 * The core idea is to first calculate the net amount for each person. A positive net amount
 * means the person is a creditor (receives money), and a negative net amount means they are
 * a debtor (pays money).
 *
 * 1. **Calculate Net Balances:** For each person, sum up all money they paid and received.
 *    `balance[P] = sum(money_received_by_P) - sum(money_paid_by_P)`.
 *    A positive `balance[P]` means P is owed money (creditor).
 *    A negative `balance[P]` means P owes money (debtor).
 *
 * 2. **Identify Max Debtor and Max Creditor:** Find the person who owes the most (max absolute negative balance)
 *    and the person who is owed the most (max positive balance).
 *
 * 3. **Settle Debt Greedily:**
 *    a. Let `debtor` be the person with the most negative balance (owes the most).
 *    b. Let `creditor` be the person with the most positive balance (is owed the most).
 *    c. The `debtor` pays the `creditor` an amount equal to `min(abs(debtor_balance), creditor_balance)`.
 *    d. Record this transaction.
 *    e. Update the balances of `debtor` and `creditor`. One of them (or both) will have their
 *       balance become zero, effectively being removed from the problem for the next iteration.
 *
 * 4. **Repeat:** Continue steps 2 and 3 until all balances are zero.
 *
 * **Why this greedy strategy works (Informal Proof/Intuition):**
 * **Greedy Choice Property:** At each step, we identify the person who owes the most and the person
 * who is owed the most. By settling the maximum possible amount between these two, we are
 * reducing the largest outstanding debt and credit imbalances. This action guarantees that at
 * least one of the two extreme balances becomes zero. Since the sum of all balances must always be zero,
 * reducing the largest positive and largest negative balances simultaneously pushes the system
 * closer to equilibrium. This approach can be proven to be optimal in terms of minimizing transactions
 * because each transaction reduces the number of non-zero balances by at least one.
 *
 * **Optimal Substructure Property:** Once a transaction is made, and the balances are updated, the
 * remaining problem is a smaller instance of the same problem (with fewer people having non-zero balances).
 * An optimal solution for the subproblem, combined with the current transaction, leads to an overall
 * optimal solution.
 */
public class MinimizeCashFlow {

    /**
     * Minimizes the cash flow among a group of people.
     *
     * @param initialTransactions A list of initial transactions in the format (payer, receiver, amount).
     *                            Each string represents "payer,receiver,amount".
     * @return A list of minimized transactions to settle all debts.
     */
    public List<Transaction> minimize(List<String> initialTransactions) {
        // Step 1: Calculate net balances for all participants.
        // Map: PersonName -> NetBalance
        // Positive balance means owed money (creditor), negative means owes money (debtor).
        Map<String, Double> balances = new HashMap<>();

        // Process initial transactions to build net balances
        for (String transactionStr : initialTransactions) {
            String[] parts = transactionStr.split(",");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Invalid transaction format: " + transactionStr);
            }
            String payer = parts[0].trim();
            String receiver = parts[1].trim();
            double amount = Double.parseDouble(parts[2].trim());

            // Payer's balance decreases
            balances.put(payer, balances.getOrDefault(payer, 0.0) - amount);
            // Receiver's balance increases
            balances.put(receiver, balances.getOrDefault(receiver, 0.0) + amount);
        }

        // Filter out people with zero balance (they don't owe or are owed anything)
        balances = balances.entrySet().stream()
                .filter(entry -> Math.abs(entry.getValue()) > 0.0001) // Use epsilon for double comparison
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        List<Transaction> minimizedTransactions = new ArrayList<>();

        // Step 2, 3, 4: Iterate until all balances are settled (i.e., map is empty).
        // Each iteration will find the max debtor and max creditor and settle a transaction.
        while (!balances.isEmpty()) {
            // Find max debtor and max creditor
            String maxDebtor = null;
            String maxCreditor = null;
            double maxDebtorBalance = 0.0; // Most negative
            double maxCreditorBalance = 0.0; // Most positive

            for (Map.Entry<String, Double> entry : balances.entrySet()) {
                String person = entry.getKey();
                double balance = entry.getValue();

                if (balance < maxDebtorBalance) {
                    maxDebtorBalance = balance;
                    maxDebtor = person;
                }
                if (balance > maxCreditorBalance) {
                    maxCreditorBalance = balance;
                    maxCreditor = person;
                }
            }

            // If no debtor or creditor found (should only happen if balances is empty or all zero)
            if (maxDebtor == null || maxCreditor == null) {
                break;
            }

            // Determine the amount to settle
            // This is the minimum of what the debtor owes (absolute value) and what the creditor is owed.
            double settlementAmount = Math.min(Math.abs(maxDebtorBalance), maxCreditorBalance);

            // Record the transaction
            minimizedTransactions.add(new Transaction(maxDebtor, maxCreditor, settlementAmount));

            // Update balances
            balances.put(maxDebtor, balances.get(maxDebtor) + settlementAmount); // Debtor pays, balance increases
            balances.put(maxCreditor, balances.get(maxCreditor) - settlementAmount); // Creditor receives, balance decreases

            // Remove participants whose balances have become zero
            if (Math.abs(balances.get(maxDebtor)) < 0.0001) {
                balances.remove(maxDebtor);
            }
            if (Math.abs(balances.get(maxCreditor)) < 0.0001) {
                balances.remove(maxCreditor);
            }
        }

        return minimizedTransactions;
    }

    /**
     * **Time Complexity Analysis:**
     * - **Step 1 (Calculating Net Balances):**
     *   - Iterating through `M` initial transactions: O(M).
     *   - Map operations (`getOrDefault`, `put`): Average O(1) per transaction, worst case O(log N) or O(N) if collisions
     *     are frequent (where N is the number of distinct people).
     *   - Overall: O(M) + (N map operations * average O(1)) -> O(M + N).
     *
     * - **Steps 2, 3, 4 (Settling Debts):**
     *   - The `while` loop runs at most `N-1` times, because each transaction reduces the number
     *     of non-zero balances by at least one (either the debtor or creditor balance becomes zero).
     *   - Inside the loop:
     *     - Finding `maxDebtor` and `maxCreditor`: Requires iterating through the `balances` map, which
     *       contains at most `N` entries. This is O(N) in each iteration.
     *     - Map updates and removals: Average O(1).
     *   - Overall: O(N * N) = O(N^2) in the worst case (where N is the number of distinct people involved).
     *
     * - **Total Time Complexity:** O(M + N^2).
     *   Where M is the number of initial transactions, and N is the number of distinct people.
     *
     * **Space Complexity Analysis:**
     * - `balances` map: O(N) to store net balances for all distinct people.
     * - `minimizedTransactions` list: O(N) in the worst case (e.g., each person needs a direct settlement).
     * - Overall Space Complexity: O(N).
     */
}