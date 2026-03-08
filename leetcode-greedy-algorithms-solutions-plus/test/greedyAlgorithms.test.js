```javascript
/**
 * @fileoverview Test suite for Greedy Algorithms.
 * This file uses Jest to test the implementations of activity selection,
 * fractional knapsack, and job sequencing with deadlines.
 */

const {
    activitySelection,
    fractionalKnapsack,
    jobSequencing,
    jobSequencingOptimized,
} = require('../src/greedyAlgorithms');

describe('Greedy Algorithms', () => {

    // --- Activity Selection Problem Tests ---
    describe('activitySelection', () => {
        it('should return an empty array for empty activities input', () => {
            expect(activitySelection([])).toEqual([]);
        });

        it('should return an empty array for null/undefined activities input', () => {
            expect(activitySelection(null)).toEqual([]);
            expect(activitySelection(undefined)).toEqual([]);
        });

        it('should select a single activity if only one is available', () => {
            const activities = [{ start: 1, end: 5 }];
            expect(activitySelection(activities)).toEqual([{ start: 1, end: 5 }]);
        });

        it('should select activities correctly from a basic set', () => {
            const activities = [
                { start: 1, end: 4 },
                { start: 3, end: 5 },
                { start: 0, end: 6 },
                { start: 5, end: 7 },
                { start: 3, end: 9 },
                { start: 5, end: 9 },
                { start: 6, end: 10 },
                { start: 8, end: 11 },
                { start: 8, end: 12 },
                { start: 2, end: 14 },
                { start: 12, end: 16 }
            ];
            // Sorted by end time:
            // {1,4}, {3,5}, {0,6}, {5,7}, {3,9}, {5,9}, {6,10}, {8,11}, {8,12}, {2,14}, {12,16}
            // Selection:
            // 1. {1,4} -> lastFinish = 4
            // 2. {5,7} (3,5 is too early, 0,6 is too early) -> lastFinish = 7
            // 3. {8,11} (6,10 is too early) -> lastFinish = 11
            // 4. {12,16} -> lastFinish = 16
            const expected = [
                { start: 1, end: 4 },
                { start: 5, end: 7 },
                { start: 8, end: 11 },
                { start: 12, end: 16 }
            ];
            expect(activitySelection(activities)).toEqual(expected);
        });

        it('should handle activities with identical start and end times', () => {
            const activities = [
                { start: 1, end: 2 },
                { start: 1, end: 2 },
                { start: 2, end: 3 }
            ];
            // Sorted by end time (then start): {1,2}, {1,2}, {2,3}
            // Selection:
            // 1. {1,2} -> lastFinish = 2
            // 2. {2,3} -> lastFinish = 3
            // Result can vary depending on tie-breaking for identical items,
            // but the count should be 2. Let's make sure our sort is stable.
            const expected = [{ start: 1, end: 2 }, { start: 2, end: 3 }];
            expect(activitySelection(activities)).toEqual(expected);
        });

        it('should handle activities where none overlap (all can be selected)', () => {
            const activities = [
                { start: 1, end: 2 },
                { start: 3, end: 4 },
                { start: 5, end: 6 }
            ];
            expect(activitySelection(activities)).toEqual(activities);
        });

        it('should handle activities where all overlap (only one can be selected)', () => {
            const activities = [
                { start: 1, end: 10 },
                { start: 2, end: 3 },
                { start: 4, end: 8 }
            ];
            // Sorted: {2,3}, {4,8}, {1,10}
            // Selection:
            // 1. {2,3} -> lastFinish = 3
            // 2. {4,8} -> lastFinish = 8
            const expected = [{ start: 2, end: 3 }, { start: 4, end: 8 }];
            expect(activitySelection(activities)).toEqual(expected);
        });

        it('should handle activities with zero duration', () => {
            const activities = [
                { start: 1, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 2 },
                { start: 2, end: 3 }
            ];
            // Sorted: {1,1}, {1,2}, {2,2}, {2,3}
            // Selection:
            // 1. {1,1} -> lastFinish = 1
            // 2. {1,2} (NO, start is 1, not >= 1) actually yes, 1 >= 1.
            //    Wait, the problem is non-overlapping. `start >= finish`.
            //    If `start = finish`, it means activity finishes exactly when it starts.
            //    So {1,1} (finishes at 1), then {1,2} (starts at 1) would overlap.
            //    No, `start >= lastFinishTime` means the current activity can start at or after
            //    the previous one finishes.
            //    {1,1} - selected, lastFinish = 1
            //    {1,2} - start=1, lastFinish=1. 1 >= 1, so select. NO.
            //    This is usually `start_current >= end_prev`. If `start_current == end_prev` is allowed,
            //    they touch but don't overlap. Let's assume it's allowed.
            //
            // Corrected Selection logic:
            // Activities: [{1,1}, {1,2}, {2,2}, {2,3}]
            // Sorted: [{1,1}, {2,2}, {1,2}, {2,3}]
            // 1. {1,1} -> lastFinish = 1
            // 2. {2,2} (start=2 >= lastFinish=1) -> select {2,2}, lastFinish = 2
            // 3. {1,2} (start=1 < lastFinish=2) -> skip
            // 4. {2,3} (start=2 >= lastFinish=2) -> select {2,3}, lastFinish = 3
            const expected = [{ start: 1, end: 1 }, { start: 2, end: 2 }, { start: 2, end: 3 }];
            expect(activitySelection(activities)).toEqual(expected);
        });
    });

    // --- Fractional Knapsack Problem Tests ---
    describe('fractionalKnapsack', () => {
        it('should return 0 for empty items input', () => {
            expect(fractionalKnapsack([], 10)).toBe(0);
        });

        it('should return 0 for null/undefined items input', () => {
            expect(fractionalKnapsack(null, 10)).toBe(0);
            expect(fractionalKnapsack(undefined, 10)).toBe(0);
        });

        it('should return 0 for zero or negative capacity', () => {
            const items = [{ value: 10, weight: 5 }];
            expect(fractionalKnapsack(items, 0)).toBe(0);
            expect(fractionalKnapsack(items, -5)).toBe(0);
        });

        it('should return 0 if no items can fit', () => {
            const items = [{ value: 10, weight: 5 }];
            expect(fractionalKnapsack(items, 1)).toBe(2); // Fraction of item 1
            expect(fractionalKnapsack([{ value: 10, weight: 5 }], 0.5)).toBe(1); // Fractional
        });

        it('should correctly calculate max value for a basic set of items', () => {
            const items = [
                { value: 60, weight: 10 },  // ratio 6
                { value: 100, weight: 20 }, // ratio 5
                { value: 120, weight: 30 }  // ratio 4
            ];
            const capacity = 50;
            // Sorted by ratio: {60,10}, {100,20}, {120,30}
            // 1. Take {60,10}: totalValue = 60, currentCapacity = 40
            // 2. Take {100,20}: totalValue = 60 + 100 = 160, currentCapacity = 20
            // 3. Take 20/30 (2/3) of {120,30}: 120 * (2/3) = 80. totalValue = 160 + 80 = 240
            expect(fractionalKnapsack(items, capacity)).toBe(240);
        });

        it('should handle cases where all items fit perfectly', () => {
            const items = [
                { value: 10, weight: 2 },
                { value: 20, weight: 3 },
                { value: 30, weight: 5 }
            ];
            const capacity = 10;
            // ratios: 5, 6.66, 6
            // Sorted: {20,3} (6.66), {30,5} (6), {10,2} (5)
            // 1. Take {20,3}: totalValue = 20, currentCapacity = 7
            // 2. Take {30,5}: totalValue = 20 + 30 = 50, currentCapacity = 2
            // 3. Take {10,2}: totalValue = 50 + 10 = 60, currentCapacity = 0
            expect(fractionalKnapsack(items, capacity)).toBe(60);
        });

        it('should handle fractional items at the end', () => {
            const items = [
                { value: 60, weight: 10 }, // 6
                { value: 20, weight: 20 }  // 1
            ];
            const capacity = 15;
            // Sorted: {60,10}, {20,20}
            // 1. Take {60,10}: totalValue = 60, currentCapacity = 5
            // 2. Take 5/20 (1/4) of {20,20}: 20 * (1/4) = 5. totalValue = 60 + 5 = 65
            expect(fractionalKnapsack(items, capacity)).toBe(65);
        });

        it('should handle items with zero weight (should be skipped or throw error)', () => {
            const items = [
                { value: 10, weight: 0 }, // Division by zero! Ratio should be considered infinity.
                { value: 50, weight: 10 }
            ];
            const capacity = 5;
            // For practical purposes, if weight is 0 and value > 0, ratio is infinity.
            // This item should be taken first and completely, without consuming capacity.
            // Our current implementation will get `Infinity` ratio.
            // So: {10,0} will be taken first. Then remaining capacity is 5. Then 5/10 of {50,10}.
            // Value = 10 + (5/10)*50 = 10 + 25 = 35.
            expect(fractionalKnapsack(items, capacity)).toBe(35);
        });

        it('should handle items with zero value', () => {
            const items = [
                { value: 0, weight: 10 }, // ratio 0
                { value: 50, weight: 10 } // ratio 5
            ];
            const capacity = 5;
            // Sorted: {50,10}, {0,10}
            // 1. Take 5/10 (1/2) of {50,10}: totalValue = 25, currentCapacity = 0
            // (0,10) is not taken.
            expect(fractionalKnapsack(items, capacity)).toBe(25);
        });
    });

    // --- Job Sequencing with Deadlines Tests ---
    [jobSequencing, jobSequencingOptimized].forEach((jobSequencer, index) => {
        const functionName = index === 0 ? 'jobSequencing (Simple)' : 'jobSequencingOptimized (DSU)';

        describe(functionName, () => {
            it('should return 0 profit and empty sequence for empty jobs input', () => {
                const expected = { maxProfit: 0, jobSequence: [] };
                expect(jobSequencer([])).toEqual(expected);
            });

            it('should return 0 profit and empty sequence for null/undefined jobs input', () => {
                const expected = { maxProfit: 0, jobSequence: [] };
                expect(jobSequencer(null)).toEqual(expected);
                expect(jobSequencer(undefined)).toEqual(expected);
            });

            it('should correctly sequence jobs for a basic set', () => {
                const jobs = [
                    { id: 'a', deadline: 2, profit: 100 },
                    { id: 'b', deadline: 1, profit: 19 },
                    { id: 'c', deadline: 2, profit: 27 },
                    { id: 'd', deadline: 1, profit: 25 },
                    { id: 'e', deadline: 3, profit: 15 }
                ];
                // Sorted by profit (desc): a(100,2), c(27,2), d(25,1), e(15,3), b(19,1) - oops, b profit is 19.
                // Corrected sort: a(100,2), c(27,2), d(25,1), b(19,1), e(15,3)

                // 1. Job 'a' (100, d=2): Schedule at slot 2. (Slots: [null, 'a'])
                //    DSU: find(2) -> 2. schedule 'a' at 2. union(2,1). parent[2]=1.
                // 2. Job 'c' (27, d=2): Schedule at slot 1. (Slots: ['c', 'a'])
                //    DSU: find(2) -> find(parent[2]=1) -> 1. schedule 'c' at 1. union(1,0). parent[1]=0.
                // 3. Job 'd' (25, d=1): Cannot schedule at slot 1 (occupied). Try slot 0 (before 1).
                //    DSU: find(1) -> find(parent[1]=0) -> 0. Cannot schedule at 0.
                // 4. Job 'b' (19, d=1): Cannot schedule. (d=1, slot 1 occupied, slot 0 not allowed)
                //    DSU: find(1) -> find(parent[1]=0) -> 0. Cannot schedule at 0.
                // 5. Job 'e' (15, d=3): Schedule at slot 3. (Slots: ['c', 'a', 'e'])
                //    DSU: find(3) -> 3. schedule 'e' at 3. union(3,2). parent[3]=2. (DSU tree: 3->2->1->0)

                // Expected sequence based on the standard DSU approach:
                // Slot 1: 'c', Slot 2: 'a', Slot 3: 'e'
                // For simplified slot management (non-DSU) in `jobSequencing`:
                // Jobs sorted: a(100,2), c(27,2), d(25,1), b(19,1), e(15,3)
                // maxDeadline = 3. `scheduledSlots = [null, null, null]` (indices 0, 1, 2)
                // 1. 'a' (100, d=2): Try slot 1 (d-1). `scheduledSlots[1]` is null. Set `scheduledSlots[1] = 'a'`. Profit=100.
                // 2. 'c' (27, d=2): Try slot 1 (d-1). `scheduledSlots[1]` is 'a'. Try slot 0. `scheduledSlots[0]` is null. Set `scheduledSlots[0] = 'c'`. Profit=100+27=127.
                // 3. 'd' (25, d=1): Try slot 0 (d-1). `scheduledSlots[0]` is 'c'. No earlier slot. Skip.
                // 4. 'b' (19, d=1): Try slot 0 (d-1). `scheduledSlots[0]` is 'c'. No earlier slot. Skip.
                // 5. 'e' (15, d=3): Try slot 2 (d-1). `scheduledSlots[2]` is null. Set `scheduledSlots[2] = 'e'`. Profit=127+15=142.
                // Final `scheduledSlots` = ['c', 'a', 'e']
                const expected = { maxProfit: 142, jobSequence: ['c', 'a', 'e'] };
                expect(jobSequencer(jobs)).toEqual(expected);
            });

            it('should handle jobs with the same deadline and different profits', () => {
                const jobs = [
                    { id: 'j1', deadline: 2, profit: 50 },
                    { id: 'j2', deadline: 2, profit: 60 },
                    { id: 'j3', deadline: 1, profit: 40 }
                ];
                // Sorted by profit: j2(60,2), j1(50,2), j3(40,1)
                // maxDeadline = 2. `scheduledSlots = [null, null]` (indices 0, 1)
                // 1. 'j2' (60, d=2): Try slot 1. `scheduledSlots[1]` is null. Set `scheduledSlots[1] = 'j2'`. Profit=60.
                // 2. 'j1' (50, d=2): Try slot 1. `scheduledSlots[1]` is 'j2'. Try slot 0. `scheduledSlots[0]` is null. Set `scheduledSlots[0] = 'j1'`. Profit=60+50=110.
                // 3. 'j3' (40, d=1): Try slot 0. `scheduledSlots[0]` is 'j1'. No earlier slot. Skip.
                const expected = { maxProfit: 110, jobSequence: ['j1', 'j2'] };
                expect(jobSequencer(jobs)).toEqual(expected);
            });

            it('should handle jobs with deadlines greater than number of jobs', () => {
                const jobs = [
                    { id: 'A', deadline: 5, profit: 10 },
                    { id: 'B', deadline: 2, profit: 20 },
                ];
                // Sorted by profit: B(20,2), A(10,5)
                // maxDeadline = 5. `scheduledSlots = [null, null, null, null, null]` (indices 0-4)
                // 1. 'B' (20, d=2): Try slot 1. Set `scheduledSlots[1] = 'B'`. Profit=20.
                // 2. 'A' (10, d=5): Try slot 4. Set `scheduledSlots[4] = 'A'`. Profit=20+10=30.
                const expected = { maxProfit: 30, jobSequence: ['B', 'A'] };
                expect(jobSequencer(jobs)).toEqual(expected);
            });

            it('should handle jobs with same profit but different deadlines', () => {
                const jobs = [
                    { id: 'x', deadline: 1, profit: 50 },
                    { id: 'y', deadline: 2, profit: 50 },
                ];
                // Sorted by profit (then by internal sort for ties, which is stable if original order)
                // Assume 'x' comes before 'y' if profits are same.
                // Sorted: x(50,1), y(50,2)
                // maxDeadline = 2. `scheduledSlots = [null, null]` (indices 0, 1)
                // 1. 'x' (50, d=1): Try slot 0. Set `scheduledSlots[0] = 'x'`. Profit=50.
                // 2. 'y' (50, d=2): Try slot 1. Set `scheduledSlots[1] = 'y'`. Profit=50+50=100.
                const expected = { maxProfit: 100, jobSequence: ['x', 'y'] };
                expect(jobSequencer(jobs)).toEqual(expected);
            });

            it('should handle complex scenario with many overlapping deadlines', () => {
                const jobs = [
                    { id: 'J1', deadline: 4, profit: 20 },
                    { id: 'J2', deadline: 1, profit: 10 },
                    { id: 'J3', deadline: 1, profit: 40 },
                    { id: 'J4', deadline: 1, profit: 30 }
                ];
                // Sorted by profit: J3(40,1), J4(30,1), J1(20,4), J2(10,1)
                // maxDeadline = 4. `scheduledSlots = [null, null, null, null]` (indices 0, 1, 2, 3)
                // 1. 'J3' (40, d=1): Try slot 0. Set `scheduledSlots[0] = 'J3'`. Profit=40.
                // 2. 'J4' (30, d=1): Try slot 0. `scheduledSlots[0]` is 'J3'. No earlier slot. Skip.
                // 3. 'J1' (20, d=4): Try slot 3. Set `scheduledSlots[3] = 'J1'`. Profit=40+20=60.
                // 4. 'J2' (10, d=1): Try slot 0. `scheduledSlots[0]` is 'J3'. No earlier slot. Skip.
                const expected = { maxProfit: 60, jobSequence: ['J3', 'J1'] }; // Note: J1 is at index 3, but the sequence means J3 at time 0, J1 at time 3.
                expect(jobSequencer(jobs)).toEqual(expected);
            });

            it('should place jobs correctly for non-contiguous deadlines', () => {
                const jobs = [
                    { id: 'A', deadline: 1, profit: 100 },
                    { id: 'B', deadline: 3, profit: 50 },
                    { id: 'C', deadline: 2, profit: 200 }
                ];
                // Sorted by profit: C(200,2), A(100,1), B(50,3)
                // maxDeadline = 3. `scheduledSlots = [null, null, null]` (indices 0, 1, 2)
                // 1. 'C' (200, d=2): Try slot 1. Set `scheduledSlots[1] = 'C'`. Profit=200.
                // 2. 'A' (100, d=1): Try slot 0. Set `scheduledSlots[0] = 'A'`. Profit=200+100=300.
                // 3. 'B' (50, d=3): Try slot 2. Set `scheduledSlots[2] = 'B'`. Profit=300+50=350.
                const expected = { maxProfit: 350, jobSequence: ['A', 'C', 'B'] };
                expect(jobSequencer(jobs)).toEqual(expected);
            });
        });
    });

});
```