```typescript
/**
 * tests/job-sequencing.test.ts
 *
 * Test suite for the Job Sequencing with Deadlines problem.
 */

import { Job, jobSequencing } from '../src/algorithms/job-sequencing';
import { deepClone, shuffleArray } from '../src/utils/helpers';

describe('Job Sequencing with Deadlines', () => {

    // Helper to create a job
    const createJob = (id: string, deadline: number, profit: number): Job => ({ id, deadline, profit });

    // Test case 1: Basic scenario with clear optimal choices
    test('should maximize profit for a standard set of jobs', () => {
        const jobs: Job[] = [
            createJob('a', 2, 100),
            createJob('b', 1, 19),
            createJob('c', 2, 27),
            createJob('d', 1, 25),
            createJob('e', 3, 15),
        ];

        // Expected solution based on manual trace in job-sequencing.ts
        // Sorted by profit desc: a(100,2), c(27,2), d(25,1), b(19,1), e(15,3)
        // Max deadline = 3. Slots: [null, null, null]
        // 1. Process 'a': D=2. Try slot 2. slots[2]=a. Profit=100. Scheduled=['a']
        // 2. Process 'c': D=2. Try slot 2 (taken). Try slot 1. slots[1]=c. Profit=100+27=127. Scheduled=['a','c']
        // 3. Process 'd': D=1. Try slot 1 (taken). Skip.
        // 4. Process 'b': D=1. Try slot 1 (taken). Skip.
        // 5. Process 'e': D=3. Try slot 3. slots[3]=e. Profit=127+15=142. Scheduled=['a','c','e']
        const expectedTotalProfit = 142;
        const expectedScheduledJobs = ['a', 'c', 'e']; // Order can vary if jobs have same profit, but IDs should be present

        const { totalProfit, scheduledJobs } = jobSequencing(jobs);

        expect(totalProfit).toBe(expectedTotalProfit);
        expect(scheduledJobs.sort()).toEqual(expectedScheduledJobs.sort()); // Sort for consistent comparison
        expect(scheduledJobs.length).toBe(expectedScheduledJobs.length);
    });

    // Test case 2: All jobs have the same deadline
    test('should pick highest profit jobs if all have same deadline', () => {
        const jobs: Job[] = [
            createJob('j1', 1, 10),
            createJob('j2', 1, 30),
            createJob('j3', 1, 20),
        ];
        // Sorted by profit: j2(30,1), j3(20,1), j1(10,1)
        // Only one slot available (max deadline is 1). Pick j2.
        const expectedTotalProfit = 30;
        const expectedScheduledJobs = ['j2'];

        const { totalProfit, scheduledJobs } = jobSequencing(jobs);
        expect(totalProfit).toBe(expectedTotalProfit);
        expect(scheduledJobs.sort()).toEqual(expectedScheduledJobs.sort());
        expect(scheduledJobs.length).toBe(expectedScheduledJobs.length);
    });

    // Test case 3: No jobs
    test('should return 0 profit and empty array for no jobs', () => {
        const jobs: Job[] = [];
        const { totalProfit, scheduledJobs } = jobSequencing(jobs);
        expect(totalProfit).toBe(0);
        expect(scheduledJobs).toEqual([]);
    });

    // Test case 4: Single job
    test('should schedule single job if valid', () => {
        const jobs: Job[] = [createJob('single', 1, 50)];
        const { totalProfit, scheduledJobs } = jobSequencing(jobs);
        expect(totalProfit).toBe(50);
        expect(scheduledJobs).toEqual(['single']);
    });

    // Test case 5: Job with deadline 0 (invalid, or effectively 1 if min deadline is 1)
    test('should ignore jobs with deadline 0 or less', () => {
        const jobs: Job[] = [
            createJob('valid', 1, 100),
            createJob('invalid', 0, 50), // Deadline 0 means it cannot be scheduled in slot 1 or later
            createJob('negative', -1, 70),
        ];
        const { totalProfit, scheduledJobs } = jobSequencing(jobs);
        expect(totalProfit).toBe(100);
        expect(scheduledJobs).toEqual(['valid']);
    });

    // Test case 6: More jobs than slots, some jobs skipped
    test('should correctly skip jobs when slots are full', () => {
        const jobs: Job[] = [
            createJob('J1', 3, 100),
            createJob('J2', 1, 10),
            createJob('J3', 2, 20),
            createJob('J4', 1, 5),
            createJob('J5', 3, 30),
            createJob('J6', 2, 15),
        ];
        // Sorted by profit: J1(100,3), J5(30,3), J3(20,2), J6(15,2), J2(10,1), J4(5,1)
        // Max deadline = 3. Slots: [null, null, null]
        // 1. J1(100,3): D=3. Schedule in slot 3. slots=[null,null,J1]. P=100. Sch=['J1']
        // 2. J5(30,3): D=3. Try slot 3 (taken). Try slot 2. Schedule in slot 2. slots=[null,J5,J1]. P=100+30=130. Sch=['J1','J5']
        // 3. J3(20,2): D=2. Try slot 2 (taken). Try slot 1. Schedule in slot 1. slots=[J3,J5,J1]. P=130+20=150. Sch=['J1','J5','J3']
        // All slots (1,2,3) are now taken. Max profit = 150.
        // J6, J2, J4 will be skipped.
        const expectedTotalProfit = 150;
        const expectedScheduledJobs = ['J1', 'J5', 'J3'];

        const { totalProfit, scheduledJobs } = jobSequencing(jobs);
        expect(totalProfit).toBe(expectedTotalProfit);
        expect(scheduledJobs.sort()).toEqual(expectedScheduledJobs.sort());
        expect(scheduledJobs.length).toBe(expectedScheduledJobs.length);
    });

    // Test case 7: Jobs with same profit, different deadlines
    test('should handle jobs with same profit, prioritizing later slots', () => {
        const jobs: Job[] = [
            createJob('A', 2, 50),
            createJob('B', 1, 50),
            createJob('C', 2, 10),
        ];
        // Sorted: A(50,2), B(50,1), C(10,2) (A/B order depends on secondary sort or stability)
        // Let's assume A comes before B if profits are equal for our implementation.
        // Max deadline = 2. Slots: [null, null]
        // 1. A(50,2): D=2. Schedule in slot 2. slots=[null,A]. P=50. Sch=['A']
        // 2. B(50,1): D=1. Schedule in slot 1. slots=[B,A]. P=50+50=100. Sch=['A','B']
        // 3. C(10,2): D=2. Try slot 2 (taken). Try slot 1 (taken). Skip.
        const expectedTotalProfit = 100;
        const expectedScheduledJobs = ['A', 'B'];

        const { totalProfit, scheduledJobs } = jobSequencing(jobs);
        expect(totalProfit).toBe(expectedTotalProfit);
        expect(scheduledJobs.sort()).toEqual(expectedScheduledJobs.sort());
        expect(scheduledJobs.length).toBe(expectedScheduledJobs.length);
    });

    // Test case 8: Large number of random jobs
    test('should work for a large set of random jobs', () => {
        const numJobs = 1000;
        const maxDeadline = 500;
        const maxProfit = 1000;
        const jobs: Job[] = [];
        for (let i = 0; i < numJobs; i++) {
            const deadline = Math.floor(Math.random() * maxDeadline) + 1; // Deadline 1 to maxDeadline
            const profit = Math.floor(Math.random() * maxProfit) + 1; // Profit 1 to maxProfit
            jobs.push(createJob(`J${i}`, deadline, profit));
        }

        const { totalProfit, scheduledJobs } = jobSequencing(jobs);

        expect(totalProfit).toBeGreaterThan(0);
        expect(scheduledJobs.length).toBeLessThanOrEqual(maxDeadline); // Cannot schedule more jobs than slots
        expect(scheduledJobs.length).toBeGreaterThanOrEqual(1); // At least one job should be scheduled
        // Further detailed checks would require complex logic to re-verify optimality,
        // but checking basic properties like profit > 0 and number of jobs <= maxDeadline is good.
    });

    // Test case 9: Input order should not affect the total profit or set of scheduled jobs
    test('should produce the same profit and job set regardless of initial input order', () => {
        const originalJobs: Job[] = [
            createJob('a', 2, 100),
            createJob('b', 1, 19),
            createJob('c', 2, 27),
            createJob('d', 1, 25),
            createJob('e', 3, 15),
        ];
        const expectedTotalProfit = 142;
        const expectedScheduledJobs = ['a', 'c', 'e'];

        const shuffledJobs = shuffleArray(deepClone(originalJobs));

        const { totalProfit, scheduledJobs } = jobSequencing(shuffledJobs);

        expect(totalProfit).toBe(expectedTotalProfit);
        expect(scheduledJobs.sort()).toEqual(expectedScheduledJobs.sort());
        expect(scheduledJobs.length).toBe(expectedScheduledJobs.length);
    });

    // Test case 10: Jobs with high deadlines but low profit
    test('should prioritize high profit jobs even if deadlines are tighter', () => {
        const jobs: Job[] = [
            createJob('J1', 1, 100), // High profit, tight deadline
            createJob('J2', 10, 10), // Low profit, loose deadline
            createJob('J3', 2, 50),
        ];
        // Sorted: J1(100,1), J3(50,2), J2(10,10)
        // Max deadline=10.
        // 1. J1(100,1): Schedule in slot 1. P=100. Sch=['J1']. Slots=[J1, null, ...]
        // 2. J3(50,2): Schedule in slot 2. P=100+50=150. Sch=['J1','J3']. Slots=[J1, J3, ...]
        // 3. J2(10,10): Schedule in slot 10. P=150+10=160. Sch=['J1','J3','J2']. Slots=[J1, J3, ..., J2]
        const expectedTotalProfit = 160;
        const expectedScheduledJobs = ['J1', 'J3', 'J2'];

        const { totalProfit, scheduledJobs } = jobSequencing(jobs);
        expect(totalProfit).toBe(expectedTotalProfit);
        expect(scheduledJobs.sort()).toEqual(expectedScheduledJobs.sort());
        expect(scheduledJobs.length).toBe(expectedScheduledJobs.length);
    });
});
```