```java
package com.backtracking.interview.utils;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Utility class for validating permutations and combinations.
 */
public class PermutationUtils {

    /**
     * Checks if a list of lists contains only unique inner lists.
     * Useful for verifying results of permutations/combinations problems with duplicates.
     * @param listOfLists The list of combinations/permutations.
     * @return true if all inner lists are unique, false otherwise.
     */
    public static boolean hasUniqueLists(List<List<Integer>> listOfLists) {
        if (listOfLists == null || listOfLists.isEmpty()) {
            return true;
        }
        Set<List<Integer>> uniqueSet = listOfLists.stream()
                .map(list -> list.stream().sorted().collect(Collectors.toList())) // Sort inner lists to treat [1,2] and [2,1] as same if order doesn't matter (for combinations)
                .collect(Collectors.toSet());
        return uniqueSet.size() == listOfLists.size();
    }

    /**
     * Helper to sort a list of lists of integers, which can be useful for
     * consistent comparison in tests. Sorts each inner list, then sorts the outer list.
     * @param input A list of lists of integers.
     * @return A new list of lists, with inner and outer lists sorted.
     */
    public static List<List<Integer>> sortListOfLists(List<List<Integer>> input) {
        List<List<Integer>> sortedResult = input.stream()
                .map(list -> {
                    List<Integer> sortedInner = new java.util.ArrayList<>(list);
                    java.util.Collections.sort(sortedInner);
                    return sortedInner;
                })
                .collect(Collectors.toList());
        sortedResult.sort((l1, l2) -> {
            for (int i = 0; i < Math.min(l1.size(), l2.size()); i++) {
                int cmp = Integer.compare(l1.get(i), l2.get(i));
                if (cmp != 0) {
                    return cmp;
                }
            }
            return Integer.compare(l1.size(), l2.size());
        });
        return sortedResult;
    }

    /**
     * Compares two lists of lists for equality, after sorting inner lists and then outer lists.
     * Useful for asserting equality of permutation/combination results where order of results
     * doesn't matter, but the content of each result and its uniqueness does.
     * @param list1 First list of lists.
     * @param list2 Second list of lists.
     * @return true if they are equal after sorting.
     */
    public static boolean areListsOfListsEqual(List<List<Integer>> list1, List<List<Integer>> list2) {
        if (list1.size() != list2.size()) {
            return false;
        }
        List<List<Integer>> sortedList1 = sortListOfLists(list1);
        List<List<Integer>> sortedList2 = sortListOfLists(list2);

        for (int i = 0; i < sortedList1.size(); i++) {
            if (!sortedList1.get(i).equals(sortedList2.get(i))) {
                return false;
            }
        }
        return true;
    }
}
```