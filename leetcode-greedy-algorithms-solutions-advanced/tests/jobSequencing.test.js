```javascript
/**
 * @fileoverview Test suite for the Job Sequencing with Deadlines Problem.
 */

import jobSequencing from '../src/problems/jobSequencing';

describe('jobSequencing', () => {
  // Test Case 1: Basic scenario
  test('should correctly sequence jobs for a basic scenario', () => {
    const jobs = [
      { id: 'a', deadline: 2, profit: 100 },
      { id: 'b', deadline: 1, profit: 19 },
      { id: 'c', deadline: 2, profit: 27 },
      { id: 'd', deadline: 1, profit: 25 },
      { id: 'e', deadline: 3, profit: 15 }
    ];
    // Sorted by profit (desc): a(100), c(27), d(25), b(19), e(15)
    // Max deadline = 3. Slots: [null, null, null]
    // 1. Job 'a' (profit 100, deadline 2): Try slot 2, free. slots=['a', 'a', null]. totalProfit=100.
    //    Actually, we schedule into a slot, so slots[0] is time 1, slots[1] is time 2.
    //    Try slot deadline-1 (index 1), free. slots[1] = 'a'. So ['a', null] (max deadline is 2)
    //    No, max deadline is 3. So slots: [null, null, null]
    //    Job 'a' (deadline 2): Try slot 2 (index 1). slots: [null, 'a', null]. totalProfit=100.
    // 2. Job 'c' (profit 27, deadline 2): Try slot 2 (index 1), taken by 'a'. Try slot 1 (index 0), free. slots: ['c', 'a', null]. totalProfit=100+27=127.
    // 3. Job 'd' (profit 25, deadline 1): Try slot 1 (index 0), taken by 'c'. Cannot schedule.
    // 4. Job 'b' (profit 19, deadline 1): Try slot 1 (index 0), taken by 'c'. Cannot schedule.
    // 5. Job 'e' (profit 15, deadline 3): Try slot 3 (index 2), free. slots: ['c', 'a', 'e']. totalProfit=127+15=142.
    const expected = {
      totalProfit: 142,
      sequencedJobs: ['c', 'a', 'e'] // Order reflects chronological execution by slot
    };
    const result = jobSequencing(jobs);
    expect(result.totalProfit).toBe(expected.totalProfit);
    expect(result.sequencedJobs).toEqual(expected.sequencedJobs);
  });

  // Test Case 2: No jobs
  test('should return 0 profit and empty array for no jobs', () => {
    const jobs = [];
    const expected = { totalProfit: 0, sequencedJobs: [] };
    expect(jobSequencing(jobs)).toEqual(expected);
  });

  // Test Case 3: Single job
  test('should schedule a single job with its profit', () => {
    const jobs = [{ id: 'x', deadline: 1, profit: 50 }];
    const expected = { totalProfit: 50, sequencedJobs: ['x'] };
    expect(jobSequencing(jobs)).toEqual(expected);
  });

  // Test Case 4: All jobs have deadline 1
  test('should schedule only the highest profit job if all have deadline 1', () => {
    const jobs = [
      { id: 'a', deadline: 1, profit: 10 },
      { id: 'b', deadline: 1, profit: 20 },
      { id: 'c', deadline: 1, profit: 5 }
    ];
    // Sorted: b(20), a(10), c(5)
    // Only 'b' can be scheduled.
    const expected = { totalProfit: 20, sequencedJobs: ['b'] };
    expect(jobSequencing(jobs)).toEqual(expected);
  });

  // Test Case 5: Jobs with same profit but different deadlines
  test('should prioritize jobs with earlier deadlines if profits are equal (not strictly part of greedy, but good for tie-breaking)', () => {
    const jobs = [
      { id: 'a', deadline: 2, profit: 50 },
      { id: 'b', deadline: 1, profit: 50 }
    ];
    // Sorted by profit: a(50), b(50) -> if stable sort, order depends on original.
    // Let's assume input order is kept if profits are equal.
    // Test for a stable sort that places `a` first among equals:
    const jobsAFirst = [
      { id: 'a', deadline: 2, profit: 50 },
      { id: 'b', deadline: 1, profit: 50 }
    ];
    // 1. Job 'a' (profit 50, deadline 2): slots: [null, 'a']. profit 50.
    // 2. Job 'b' (profit 50, deadline 1): deadline 1, try slot 1 (index 0). free. slots: ['b', 'a']. profit 50+50=100.
    expect(jobSequencing(jobsAFirst)).toEqual({ totalProfit: 100, sequencedJobs: ['b', 'a'] });

    // Test for `b` first among equals:
    const jobsBFirst = [
      { id: 'b', deadline: 1, profit: 50 },
      { id: 'a', deadline: 2, profit: 50 }
    ];
    // 1. Job 'b' (profit 50, deadline 1): slots: ['b', null]. profit 50.
    // 2. Job 'a' (profit 50, deadline 2): deadline 2, try slot 2 (index 1). free. slots: ['b', 'a']. profit 50+50=100.
    expect(jobSequencing(jobsBFirst)).toEqual({ totalProfit: 100, sequencedJobs: ['b', 'a'] });
    // In both cases, the optimal schedule (b, a) is chosen. The tie-breaking rule for same profit
    // doesn't change the outcome, as long as it correctly finds a free slot.
  });

  // Test Case 6: Jobs with deadlines far in the future, but limited number of actual jobs
  test('should handle jobs with distant deadlines efficiently', () => {
    const jobs = [
      { id: 'a', deadline: 100, profit: 10 },
      { id: 'b', deadline: 10, profit: 20 },
      { id: 'c', deadline: 5, profit: 30 }
    ];
    // Sorted by profit: c(30), b(20), a(10)
    // Max deadline = 100.
    // 1. Job 'c' (profit 30, deadline 5): slots[4] = 'c'. totalProfit=30.
    // 2. Job 'b' (profit 20, deadline 10): slots[9] = 'b'. totalProfit=30+20=50.
    // 3. Job 'a' (profit 10, deadline 100): slots[99] = 'a'. totalProfit=50+10=60.
    // Note: The `slots` array will be large, but only few elements are filled.
    const expected = { totalProfit: 60, sequencedJobs: ['c', 'b', 'a'] }; // Chronological
    const result = jobSequencing(jobs);
    expect(result.totalProfit).toBe(expected.totalProfit);
    expect(result.sequencedJobs).toEqual(expected.sequencedJobs);
  });

  // Test Case 7: Complex scenario with many overlapping deadlines and profits
  test('should handle complex job sequencing scenarios', () => {
    const jobs = [
      { id: 'j1', deadline: 4, profit: 20 },
      { id: 'j2', deadline: 1, profit: 10 },
      { id: 'j3', deadline: 1, profit: 40 },
      { id: 'j4', deadline: 1, profit: 30 },
      { id: 'j5', deadline: 3, profit: 35 },
      { id: 'j6', deadline: 2, profit: 25 }
    ];
    // Sorted by profit (desc): j3(40), j5(35), j4(30), j6(25), j1(20), j2(10)
    // Max deadline = 4. Slots: [null, null, null, null] (for times 1, 2, 3, 4)
    // 1. j3 (P40, D1): slots[0]='j3'. P=40.
    // 2. j5 (P35, D3): slots[2]='j5'. P=40+35=75.
    // 3. j4 (P30, D1): Try slot 0, taken. Cannot schedule.
    // 4. j6 (P25, D2): slots[1]='j6'. P=75+25=100.
    // 5. j1 (P20, D4): slots[3]='j1'. P=100+20=120.
    // 6. j2 (P10, D1): Try slot 0, taken. Cannot schedule.
    const expected = { totalProfit: 120, sequencedJobs: ['j3', 'j6', 'j5', 'j1'] };
    const result = jobSequencing(jobs);
    expect(result.totalProfit).toBe(expected.totalProfit);
    expect(result.sequencedJobs).toEqual(expected.sequencedJobs);
  });

  // Test Case 8: Deadlines are all the same, different profits
  test('should pick highest profit job if all deadlines are same but greater than 1', () => {
    const jobs = [
      { id: 'A', deadline: 2, profit: 10 },
      { id: 'B', deadline: 2, profit: 30 },
      { id: 'C', deadline: 2, profit: 20 }
    ];
    // Sorted by profit: B(30), C(20), A(10)
    // Max deadline = 2. Slots: [null, null]
    // 1. B (P30, D2): slots[1]='B'. P=30.
    // 2. C (P20, D2): Try slot 1, taken. Try slot 0, free. slots[0]='C'. P=30+20=50.
    // 3. A (P10, D2): Try slot 1, taken. Try slot 0, taken. Cannot schedule.
    const expected = { totalProfit: 50, sequencedJobs: ['C', 'B'] };
    const result = jobSequencing(jobs);
    expect(result.totalProfit).toBe(expected.totalProfit);
    expect(result.sequencedJobs).toEqual(expected.sequencedJobs);
  });
});
```