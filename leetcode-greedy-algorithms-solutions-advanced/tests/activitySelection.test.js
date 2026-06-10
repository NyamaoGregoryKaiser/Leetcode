```javascript
/**
 * @fileoverview Test suite for the Activity Selection Problem.
 */

import activitySelection from '../src/problems/activitySelection';

describe('activitySelection', () => {
  // Test Case 1: Basic scenario with multiple non-overlapping activities
  test('should return the correct set of activities for a basic scenario', () => {
    const activities = [
      { id: 'A', start: 1, finish: 4 },
      { id: 'B', start: 3, finish: 5 },
      { id: 'C', start: 0, finish: 6 },
      { id: 'D', start: 5, finish: 7 },
      { id: 'E', start: 8, finish: 9 },
      { id: 'F', start: 5, finish: 9 }
    ];
    // Expected output, sorted by finish time, picking the earliest finishing ones
    // A (1-4) -> D (5-7) -> E (8-9) or A (1-4) -> F (5-9) -> (no more space for E)
    // A (1-4) -> D (5-7) -> E (8-9) is the canonical greedy choice here.
    const expected = [{ id: 'A', start: 1, finish: 4 }, { id: 'D', start: 5, finish: 7 }, { id: 'E', start: 8, finish: 9 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds); // Compare only IDs for simplicity and robustness
  });

  // Test Case 2: Activities already sorted by finish time
  test('should work correctly with pre-sorted activities', () => {
    const activities = [
      { id: 'A', start: 1, finish: 2 },
      { id: 'B', start: 3, finish: 4 },
      { id: 'C', start: 0, finish: 6 },
      { id: 'D', start: 5, finish: 7 },
      { id: 'E', start: 8, finish: 9 }
    ];
    const expected = [{ id: 'A', start: 1, finish: 2 }, { id: 'B', start: 3, finish: 4 }, { id: 'D', start: 5, finish: 7 }, { id: 'E', start: 8, finish: 9 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds);
  });

  // Test Case 3: Activities with overlapping start times but distinct finish times
  test('should handle overlapping activities correctly', () => {
    const activities = [
      { id: 'A', start: 1, finish: 7 },
      { id: 'B', start: 2, finish: 3 },
      { id: 'C', start: 4, finish: 5 },
      { id: 'D', start: 6, finish: 8 }
    ];
    // Sorted by finish: B (2-3), C (4-5), A (1-7), D (6-8)
    // Pick B (2-3) -> next available after 3 is C (4-5) -> D (6-8)
    const expected = [{ id: 'B', start: 2, finish: 3 }, { id: 'C', start: 4, finish: 5 }, { id: 'D', start: 6, finish: 8 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds);
  });

  // Test Case 4: All activities overlap, only one can be selected
  test('should select only one activity if all overlap', () => {
    const activities = [
      { id: 'A', start: 1, finish: 10 },
      { id: 'B', start: 2, finish: 8 },
      { id: 'C', start: 3, finish: 9 }
    ];
    // Sorted by finish: B (2-8), C (3-9), A (1-10)
    // Pick B (2-8). No other can be picked.
    const expected = [{ id: 'B', start: 2, finish: 8 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds);
  });

  // Test Case 5: Empty activities array
  test('should return an empty array for empty activities input', () => {
    const activities = [];
    const expected = [];
    expect(activitySelection(activities)).toEqual(expected);
  });

  // Test Case 6: Single activity
  test('should return the single activity if only one exists', () => {
    const activities = [{ id: 'X', start: 10, finish: 20 }];
    const expected = [{ id: 'X', start: 10, finish: 20 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds);
  });

  // Test Case 7: Activities with identical start and finish times (unit duration)
  test('should handle activities with unit duration', () => {
    const activities = [
      { id: 'A', start: 1, finish: 2 },
      { id: 'B', start: 2, finish: 3 },
      { id: 'C', start: 3, finish: 4 }
    ];
    const expected = [{ id: 'A', start: 1, finish: 2 }, { id: 'B', start: 2, finish: 3 }, { id: 'C', start: 3, finish: 4 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds);
  });

  // Test Case 8: Activities where multiple have the same finish time
  test('should handle activities with same finish times', () => {
    const activities = [
      { id: 'A', start: 0, finish: 5 },
      { id: 'B', start: 1, finish: 5 },
      { id: 'C', start: 6, finish: 10 }
    ];
    // Sorted by finish: A (0-5), B (1-5), C (6-10) - (A before B if tie-breaking stable sort)
    // Pick A (0-5) -> C (6-10). Total 2.
    // If B chosen: B (1-5) -> C (6-10). Total 2.
    // The specific choice between A and B when finishes are same depends on sort stability,
    // but the count and overall logic remains correct. The provided sort is stable.
    const resultIds = activitySelection(activities).map(a => a.id);
    expect(resultIds.length).toBe(2);
    expect(resultIds).toContain('C');
    expect(['A', 'B']).toContain(resultIds[0]); // Either A or B can be chosen first.

    // A more precise test if we care about the exact output order when finishes are equal:
    const activities2 = [
      { id: 'B', start: 1, finish: 5 },
      { id: 'A', start: 0, finish: 5 },
      { id: 'C', start: 6, finish: 10 }
    ];
    // Sort order: A (0-5), B (1-5), C (6-10) due to stable sort.
    const result2 = activitySelection(activities2).map(a => a.id);
    expect(result2).toEqual(['A', 'C']);
  });

  // Test Case 9: Activities with large numbers for start/finish times
  test('should handle large start/finish times', () => {
    const activities = [
      { id: 'A', start: 1000, finish: 2000 },
      { id: 'B', start: 2001, finish: 3000 },
      { id: 'C', start: 1500, finish: 2500 }
    ];
    // Sorted by finish: A (1000-2000), C (1500-2500), B (2001-3000)
    // Pick A (1000-2000). Next available: B (2001-3000).
    const expected = [{ id: 'A', start: 1000, finish: 2000 }, { id: 'B', start: 2001, finish: 3000 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds);
  });

  // Test Case 10: Activities where none can be selected after the first one
  test('should select only one activity if no subsequent activity is compatible', () => {
    const activities = [
      { id: 'A', start: 1, finish: 5 },
      { id: 'B', start: 2, finish: 3 }, // Finishes earlier than A, so A won't be picked if B is available
      { id: 'C', start: 4, finish: 6 },
      { id: 'D', start: 5, finish: 7 }
    ];
    // Sorted by finish: B (2-3), A (1-5), C (4-6), D (5-7)
    // Pick B (2-3). Next available: C (4-6). Next available: D (5-7)
    const expected = [{ id: 'B', start: 2, finish: 3 }, { id: 'C', start: 4, finish: 6 }, { id: 'D', start: 5, finish: 7 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds);
  });

  // Test Case 11: Activities with start/finish at 0
  test('should handle activities starting at time 0', () => {
    const activities = [
      { id: 'A', start: 0, finish: 1 },
      { id: 'B', start: 0, finish: 2 },
      { id: 'C', start: 1, finish: 3 }
    ];
    // Sorted: A (0-1), B (0-2), C (1-3)
    // Pick A (0-1). Next is C (1-3) because B (0-2) overlaps with A (0-1) in a way
    // that starting B would make A incompatible, while A is the one with earliest finish time.
    // If A is chosen, its finish is 1. C starts at 1, so C is compatible.
    const expected = [{ id: 'A', start: 0, finish: 1 }, { id: 'C', start: 1, finish: 3 }];
    const result = activitySelection(activities).map(a => a.id);
    const expectedIds = expected.map(a => a.id);
    expect(result).toEqual(expectedIds);
  });
});
```