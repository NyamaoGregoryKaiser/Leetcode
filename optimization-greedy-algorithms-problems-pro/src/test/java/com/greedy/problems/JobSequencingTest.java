package com.greedy.problems;

import com.greedy.utils.DataStructures.Job;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for the {@link JobSequencing} class.
 * Tests various scenarios to ensure the greedy algorithm correctly maximizes profit
 * while adhering to job deadlines.
 */
public class JobSequencingTest {

    private JobSequencing solver;

    @BeforeEach
    void setUp() {
        solver = new JobSequencing();
    }

    @Test
    void testEmptyJobs() {
        Job[] jobs = {};
        assertEquals(0, solver.findMaxProfit(jobs), "Should return 0 profit for empty jobs array.");
    }

    @Test
    void testNullJobs() {
        Job[] jobs = null;
        assertEquals(0, solver.findMaxProfit(jobs), "Should return 0 profit for null jobs array.");
    }

    @Test
    void testSingleJob() {
        Job[] jobs = {new Job('a', 1, 100)};
        assertEquals(100, solver.findMaxProfit(jobs), "Single job should be taken if valid.");
    }

    @Test
    void testMultipleJobs_AllCanBeDone() {
        Job[] jobs = {
                new Job('a', 2, 30),
                new Job('b', 1, 20),
                new Job('c', 3, 10)
        };
        // Sorted by profit: a(30), b(20), c(10)
        // a (d=2): slot 1
        // b (d=1): slot 0
        // c (d=3): slot 2
        // Profit: 30+20+10 = 60
        assertEquals(60, solver.findMaxProfit(jobs), "All jobs should be taken if compatible.");
    }

    @Test
    void testStandardCase_Example1() {
        Job[] jobs = {
                new Job('a', 4, 20),
                new Job('b', 1, 10),
                new Job('c', 1, 40),
                new Job('d', 1, 30)
        };
        // Sorted by profit: c(40), d(30), a(20), b(10)
        // Max deadline = 4. Slots: [_,_,_,_]
        // 1. Job 'c' (d=1, p=40): slot 0. Schedule: [c,_,_,_]. Profit = 40.
        // 2. Job 'd' (d=1, p=30): slot 0 taken. No slot <=0. Skip.
        // 3. Job 'a' (d=4, p=20): slot 3. Schedule: [c,_,_,a]. Profit = 40+20=60.
        // 4. Job 'b' (d=1, p=10): slot 0 taken. No slot <=0. Skip.
        // Max Profit: 60.
        assertEquals(60, solver.findMaxProfit(jobs), "Should correctly sequence jobs for Example 1.");
    }

    @Test
    void testStandardCase_Example2() {
        Job[] jobs = {
                new Job('a', 2, 100),
                new Job('b', 1, 19),
                new Job('c', 2, 27),
                new Job('d', 1, 25),
                new Job('e', 3, 15)
        };
        // Sorted by profit: a(100), c(27), d(25), e(15), b(19)
        // Max deadline = 3. Slots: [_,_,_]
        // 1. Job 'a' (d=2, p=100): slot 1. Schedule: [_,a,_]. Profit = 100.
        // 2. Job 'c' (d=2, p=27): slot 0. Schedule: [c,a,_]. Profit = 100+27=127.
        // 3. Job 'd' (d=1, p=25): slot 0 taken. No slot <=0. Skip.
        // 4. Job 'e' (d=3, p=15): slot 2. Schedule: [c,a,e]. Profit = 127+15=142.
        // 5. Job 'b' (d=1, p=19): slot 0 taken. No slot <=0. Skip.
        // Max Profit: 142.
        assertEquals(142, solver.findMaxProfit(jobs), "Should correctly sequence jobs for Example 2.");
    }

    @Test
    void testJobsWithSameProfit() {
        Job[] jobs = {
                new Job('a', 2, 50),
                new Job('b', 1, 50),
                new Job('c', 2, 30)
        };
        // Sorted by profit (desc): a(50), b(50), c(30).
        // If tie-breaking is by deadline, then b before a. But actual sort is just profit.
        // Assume default sort on char ID: a, b, c. Or just order in array.
        // Max deadline = 2. Slots: [_,_]
        // Case 1: If 'a' processed first among 50-profit jobs.
        // 1. Job 'a' (d=2, p=50): slot 1. Schedule: [_,a]. Profit = 50.
        // 2. Job 'b' (d=1, p=50): slot 0. Schedule: [b,a]. Profit = 50+50=100.
        // 3. Job 'c' (d=2, p=30): slot 0 taken, slot 1 taken. Skip.
        // Max Profit: 100.
        //
        // Case 2: If 'b' processed first among 50-profit jobs.
        // 1. Job 'b' (d=1, p=50): slot 0. Schedule: [b,_]. Profit = 50.
        // 2. Job 'a' (d=2, p=50): slot 1. Schedule: [b,a]. Profit = 50+50=100.
        // 3. Job 'c' (d=2, p=30): slot 0 taken, slot 1 taken. Skip.
        // Max Profit: 100.
        assertEquals(100, solver.findMaxProfit(jobs), "Should handle jobs with same profit correctly.");
    }

    @Test
    void testJobsWithNoFeasibleSchedule() {
        Job[] jobs = {
                new Job('a', 1, 100),
                new Job('b', 1, 50)
        };
        // Sorted by profit: a(100), b(50)
        // Max deadline = 1. Slots: [_]
        // 1. Job 'a' (d=1, p=100): slot 0. Schedule: [a]. Profit = 100.
        // 2. Job 'b' (d=1, p=50): slot 0 taken. Skip.
        // Max Profit: 100.
        assertEquals(100, solver.findMaxProfit(jobs), "Should select only one job if others are infeasible due to deadlines.");
    }

    @Test
    void testJobsWithDeadlineGreaterThanTotalSlots() {
        Job[] jobs = {
                new Job('a', 10, 100),
                new Job('b', 1, 50)
        };
        // Sorted by profit: a(100), b(50)
        // Max deadline = 10. Slots array of size 10.
        // 1. Job 'a' (d=10, p=100): slot 9 (max available <= deadline).
        // 2. Job 'b' (d=1, p=50): slot 0.
        // Profit: 100 + 50 = 150.
        assertEquals(150, solver.findMaxProfit(jobs), "Should handle deadlines larger than number of jobs.");
    }

    @Test
    void testJobsWithZeroProfit() {
        Job[] jobs = {
                new Job('a', 2, 50),
                new Job('b', 1, 0),
                new Job('c', 2, 30)
        };
        // Sorted by profit: a(50), c(30), b(0)
        // Max deadline = 2. Slots: [_,_]
        // 1. Job 'a' (d=2, p=50): slot 1. Schedule: [_,a]. Profit = 50.
        // 2. Job 'c' (d=2, p=30): slot 0. Schedule: [c,a]. Profit = 50+30=80.
        // 3. Job 'b' (d=1, p=0): slot 0 taken. Skip.
        // Max Profit: 80.
        assertEquals(80, solver.findMaxProfit(jobs), "Should ignore zero profit jobs if better options exist.");
    }
}