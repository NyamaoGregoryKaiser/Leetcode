```java
package com.greedy.problems;

import com.greedy.problems.JobSequencing.Job;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for JobSequencing.java
 */
public class JobSequencingTest {

    private JobSequencing jobSequencing;

    @BeforeEach
    void setUp() {
        jobSequencing = new JobSequencing();
    }

    @Test
    @DisplayName("Test Case 1: Standard Example")
    void testStandardExample() {
        List<Job> jobs = Arrays.asList(
                new Job("a", 2, 100),
                new Job("b", 1, 10),
                new Job("c", 2, 15),
                new Job("d", 1, 25),
                new Job("e", 3, 30)
        );

        List<Job> selectedJobs = jobSequencing.findMaxProfitJobSequence(jobs);
        int totalProfit = jobSequencing.calculateTotalProfit(selectedJobs);

        // Jobs sorted by profit: a(100), e(30), d(25), c(15), b(10)
        // Max Deadline: 3
        // Slots: [_, _, _, _] (index 0 unused, 1, 2, 3)

        // 1. Process 'a' (D=2, P=100). Try slot 2. Slot 2 is free. Schedule 'a' at slot 2.
        //    Slots: [_, _, a, _]
        // 2. Process 'e' (D=3, P=30). Try slot 3. Slot 3 is free. Schedule 'e' at slot 3.
        //    Slots: [_, _, a, e]
        // 3. Process 'd' (D=1, P=25). Try slot 1. Slot 1 is free. Schedule 'd' at slot 1.
        //    Slots: [_, d, a, e]
        // 4. Process 'c' (D=2, P=15). Try slot 2. Slot 2 taken. Try slot 1. Slot 1 taken. Cannot schedule.
        // 5. Process 'b' (D=1, P=10). Try slot 1. Slot 1 taken. Cannot schedule.

        // Expected scheduled jobs: d (slot 1), a (slot 2), e (slot 3)
        // Total Profit: 25 + 100 + 30 = 155
        // Expected IDs by schedule time: d, a, e

        assertEquals(155, totalProfit);
        assertEquals(3, selectedJobs.size());
        assertEquals(Arrays.asList("d", "a", "e"), selectedJobs.stream().map(Job::getId).collect(Collectors.toList()));
    }

    @Test
    @DisplayName("Test Case 2: Jobs with overlapping deadlines, varying profits")
    void testOverlappingDeadlines() {
        List<Job> jobs = Arrays.asList(
                new Job("J1", 4, 20),
                new Job("J2", 1, 10),
                new Job("J3", 1, 40),
                new Job("J4", 1, 30)
        );

        List<Job> selectedJobs = jobSequencing.findMaxProfitJobSequence(jobs);
        int totalProfit = jobSequencing.calculateTotalProfit(selectedJobs);

        // Sorted by profit: J3(40), J4(30), J1(20), J2(10)
        // Max Deadline: 4
        // Slots: [_,_,_,_,_]

        // 1. Process 'J3' (D=1, P=40). Slot 1 is free. Schedule J3 at slot 1.
        //    Slots: [_, J3, _, _, _]
        // 2. Process 'J4' (D=1, P=30). Slot 1 is taken. Cannot schedule.
        // 3. Process 'J1' (D=4, P=20). Slot 4 is free. Schedule J1 at slot 4.
        //    Slots: [_, J3, _, _, J1]
        // 4. Process 'J2' (D=1, P=10). Slot 1 is taken. Cannot schedule.

        // Expected scheduled jobs: J3 (slot 1), J1 (slot 4)
        // Total Profit: 40 + 20 = 60
        // Expected IDs by schedule time: J3, J1

        assertEquals(60, totalProfit);
        assertEquals(2, selectedJobs.size());
        assertEquals(Arrays.asList("J3", "J1"), selectedJobs.stream().map(Job::getId).collect(Collectors.toList()));
    }

    @Test
    @DisplayName("Test Case 3: All jobs have the same deadline")
    void testSameDeadline() {
        List<Job> jobs = Arrays.asList(
                new Job("A", 1, 10),
                new Job("B", 1, 20),
                new Job("C", 1, 30)
        );

        List<Job> selectedJobs = jobSequencing.findMaxProfitJobSequence(jobs);
        int totalProfit = jobSequencing.calculateTotalProfit(selectedJobs);

        // Sorted by profit: C(30), B(20), A(10)
        // Max Deadline: 1
        // Slots: [_,_]

        // 1. Process 'C' (D=1, P=30). Slot 1 is free. Schedule C at slot 1.
        //    Slots: [_, C]
        // 2. Process 'B' (D=1, P=20). Slot 1 is taken. Cannot schedule.
        // 3. Process 'A' (D=1, P=10). Slot 1 is taken. Cannot schedule.

        // Expected scheduled jobs: C (slot 1)
        // Total Profit: 30

        assertEquals(30, totalProfit);
        assertEquals(1, selectedJobs.size());
        assertEquals(Arrays.asList("C"), selectedJobs.stream().map(Job::getId).collect(Collectors.toList()));
    }

    @Test
    @DisplayName("Test Case 4: No jobs")
    void testEmptyList() {
        List<Job> jobs = Collections.emptyList();
        List<Job> selectedJobs = jobSequencing.findMaxProfitJobSequence(jobs);
        int totalProfit = jobSequencing.calculateTotalProfit(selectedJobs);

        assertTrue(selectedJobs.isEmpty());
        assertEquals(0, totalProfit);
    }

    @Test
    @DisplayName("Test Case 5: Single job")
    void testSingleJob() {
        List<Job> jobs = Collections.singletonList(new Job("X", 5, 50));
        List<Job> selectedJobs = jobSequencing.findMaxProfitJobSequence(jobs);
        int totalProfit = jobSequencing.calculateTotalProfit(selectedJobs);

        assertEquals(50, totalProfit);
        assertEquals(1, selectedJobs.size());
        assertEquals(Arrays.asList("X"), selectedJobs.stream().map(Job::getId).collect(Collectors.toList()));
    }

    @Test
    @DisplayName("Test Case 6: Jobs with same profit, different deadlines")
    void testSameProfitDifferentDeadlines() {
        List<Job> jobs = Arrays.asList(
                new Job("J1", 2, 50),
                new Job("J2", 1, 50)
        );

        List<Job> selectedJobs = jobSequencing.findMaxProfitJobSequence(jobs);
        int totalProfit = jobSequencing.calculateTotalProfit(selectedJobs);

        // Sorted by profit (desc), then deadline (asc): J2(1,50), J1(2,50)
        // Max Deadline: 2
        // Slots: [_,_,_]

        // 1. Process 'J2' (D=1, P=50). Slot 1 is free. Schedule J2 at slot 1.
        //    Slots: [_, J2, _]
        // 2. Process 'J1' (D=2, P=50). Slot 2 is free. Schedule J1 at slot 2.
        //    Slots: [_, J2, J1]

        // Expected scheduled jobs: J2 (slot 1), J1 (slot 2)
        // Total Profit: 50 + 50 = 100

        assertEquals(100, totalProfit);
        assertEquals(2, selectedJobs.size());
        assertEquals(Arrays.asList("J2", "J1"), selectedJobs.stream().map(Job::getId).collect(Collectors.toList()));
    }

    @Test
    @DisplayName("Test Case 7: All jobs can be scheduled")
    void testAllJobsCanBeScheduled() {
        List<Job> jobs = Arrays.asList(
                new Job("A", 1, 10),
                new Job("B", 2, 20),
                new Job("C", 3, 30)
        );

        List<Job> selectedJobs = jobSequencing.findMaxProfitJobSequence(jobs);
        int totalProfit = jobSequencing.calculateTotalProfit(selectedJobs);

        // Sorted by profit: C(30), B(20), A(10)
        // Max Deadline: 3

        // 1. C(3,30) -> Slot 3
        // 2. B(2,20) -> Slot 2
        // 3. A(1,10) -> Slot 1

        // Expected: A, B, C (by schedule time)
        // Total Profit: 10 + 20 + 30 = 60

        assertEquals(60, totalProfit);
        assertEquals(3, selectedJobs.size());
        assertEquals(Arrays.asList("A", "B", "C"), selectedJobs.stream().map(Job::getId).collect(Collectors.toList()));
    }

    @Test
    @DisplayName("Test Case 8: Deadlines larger than number of jobs")
    void testDeadlinesLargerThanN() {
        List<Job> jobs = Arrays.asList(
                new Job("A", 10, 100),
                new Job("B", 20, 50)
        );

        List<Job> selectedJobs = jobSequencing.findMaxProfitJobSequence(jobs);
        int totalProfit = jobSequencing.calculateTotalProfit(selectedJobs);

        // Sorted: A(100), B(50)
        // Max Deadline: 20

        // 1. A(10,100) -> Slot 10
        // 2. B(20,50)  -> Slot 20

        // Expected: A, B (by schedule time)
        // Total Profit: 150
        assertEquals(150, totalProfit);
        assertEquals(2, selectedJobs.size());
        assertEquals(Arrays.asList("A", "B"), selectedJobs.stream().map(Job::getId).collect(Collectors.toList()));
    }
}
```