```markdown
# 📊 Visual Diagrams (ASCII Art) for Greedy Algorithms

Visualizing the steps of a greedy algorithm can significantly improve understanding. Here are some ASCII art diagrams for a few common greedy problems.

---

### 1. Activity Selection Problem

**Goal:** Maximize non-overlapping activities.
**Greedy Strategy:** Sort by finish time, pick the earliest finishing compatible activity.

**Example Activities:**
A: [1, 4]
B: [3, 5]
C: [0, 6]
D: [5, 7]
E: [8, 9]
F: [5, 9]

**Step-by-Step Visualization:**

1.  **Sort by Finish Time:**
    ```
    Activities:
    B: [3, 5] (finish: 5)
    D: [5, 7] (finish: 7)
    A: [1, 4] (finish: 4)  <- Oops, A should be before B.
    C: [0, 6] (finish: 6)
    E: [8, 9] (finish: 9)
    F: [5, 9] (finish: 9)

    Correctly Sorted:
    A: [1, 4]
    B: [3, 5]
    C: [0, 6]
    D: [5, 7]
    E: [8, 9]
    F: [5, 9]
    ```

    **Corrected Sorted Order by Finish Time:**
    (A: [1, 4]), (B: [3, 5]), (C: [0, 6]), (D: [5, 7]), (E: [8, 9]), (F: [5, 9])
    (The initial example in `activitySelection.js` has a different order, leading to a specific result, but the principle is the same).
    Let's re-sort based on the example in `activitySelection.js`:
    ```
    Original:
    A: [1, 4]
    B: [3, 5]
    C: [0, 6]
    D: [5, 7]
    E: [8, 9]
    F: [5, 9]

    Sorted by finish time:
    A: [1, 4]  (finish: 4)
    B: [3, 5]  (finish: 5)
    C: [0, 6]  (finish: 6)
    D: [5, 7]  (finish: 7)
    E: [8, 9]  (finish: 9)
    F: [5, 9]  (finish: 9)  -- E comes before F due to stable sort if finish times are equal
    ```

2.  **Select Activities:**

    ```
    Time Line:
    0---1---2---3---4---5---6---7---8---9---10

    1. Pick A [1, 4] (Earliest finish)
       Selected: [A]
       Last finish: 4
       Slots:
             [A]
         <---|--->
    0---1---2---3---4---5---6---7---8---9---10

    2. Consider B [3, 5]: Start 3 < Last finish 4. OVERLAPS. Skip.
       Consider C [0, 6]: Start 0 < Last finish 4. OVERLAPS. Skip.

    3. Consider D [5, 7]: Start 5 >= Last finish 4. COMPATIBLE. Pick D.
       Selected: [A, D]
       Last finish: 7
       Slots:
             [A]         [D]
         <---|--->   <---|--->
    0---1---2---3---4---5---6---7---8---9---10

    4. Consider E [8, 9]: Start 8 >= Last finish 7. COMPATIBLE. Pick E.
       Selected: [A, D, E]
       Last finish: 9
       Slots:
             [A]         [D]         [E]
         <---|--->   <---|--->   <---|--->
    0---1---2---3---4---5---6---7---8---9---10

    5. Consider F [5, 9]: Start 5 < Last finish 9. OVERLAPS. Skip.

    Final Selected Activities: A, D, E
    ```

---

### 2. Fractional Knapsack Problem

**Goal:** Maximize total value by taking items (fractions allowed) within capacity.
**Greedy Strategy:** Prioritize items with the highest value-to-weight ratio.

**Example:**
Capacity: 50
Items:
I1: {W: 10, V: 60}
I2: {W: 20, V: 100}
I3: {W: 30, V: 120}

**Step-by-Step Visualization:**

1.  **Calculate Value/Weight Ratios:**
    ```
    I1: V/W = 60/10 = 6
    I2: V/W = 100/20 = 5
    I3: V/W = 120/30 = 4
    ```

2.  **Sort by Ratio (Descending):**
    ```
    Sorted Items: I1 (Ratio 6), I2 (Ratio 5), I3 (Ratio 4)
    ```

3.  **Fill Knapsack:**
    ```
    Knapsack Capacity: 50 | Total Value: 0

    Current Item: I1 {W: 10, V: 60, Ratio: 6}
    - Does I1 fit? 10 <= 50. Yes.
    - Take all of I1.
    - Knapsack Capacity: 50 - 10 = 40
    - Total Value: 0 + 60 = 60
    - Taken: [I1 (100%)]

    Knapsack Capacity: 40 | Total Value: 60

    Current Item: I2 {W: 20, V: 100, Ratio: 5}
    - Does I2 fit? 20 <= 40. Yes.
    - Take all of I2.
    - Knapsack Capacity: 40 - 20 = 20
    - Total Value: 60 + 100 = 160
    - Taken: [I1 (100%), I2 (100%)]

    Knapsack Capacity: 20 | Total Value: 160

    Current Item: I3 {W: 30, V: 120, Ratio: 4}
    - Does I3 fit? 30 > 20. No.
    - Take a fraction: Fraction = Remaining Capacity / Item Weight = 20 / 30 = 0.666...
    - Value taken: 120 * (20/30) = 80
    - Knapsack Capacity: 20 - 20 = 0 (Full)
    - Total Value: 160 + 80 = 240
    - Taken: [I1 (100%), I2 (100%), I3 (66.67%)]

    Final Result: Total Value = 240
    ```

---

### 3. Gas Station Problem (Circular Tour)

**Goal:** Find a starting station to complete a circular tour.
**Greedy Strategy:** If total gas >= total cost, a solution exists. Iterate, if `current_tank` goes negative, shift start to next station.

**Example:**
`gas =  [1, 2, 3, 4, 5]`
`cost = [3, 4, 5, 1, 2]`

**Step-by-Step Visualization:**

1.  **Calculate Net Gain (Gas - Cost) for each station:**
    ```
    Station | Gas | Cost | Net Gain (G-C)
    --------|-----|------|--------------
    0       | 1   | 3    | -2
    1       | 2   | 4    | -2
    2       | 3   | 5    | -2
    3       | 4   | 1    |  3
    4       | 5   | 2    |  3
    ```

2.  **Check Total Gas vs. Total Cost:**
    ```
    Sum(Gas) = 1+2+3+4+5 = 15
    Sum(Cost) = 3+4+5+1+2 = 15
    Total Gas >= Total Cost (15 >= 15). A solution EXISTS.
    ```

3.  **Find Starting Station (Iterate through Net Gains):**

    ```
    Net Gains: [-2, -2, -2, 3, 3]

    Initial:
    current_trip_tank = 0
    start_station = 0

    Iteration i = 0 (Station 0, Net Gain = -2):
      current_trip_tank += (-2)  => -2
      current_trip_tank < 0 ? Yes.
        Reset: current_trip_tank = 0
        New start_station = 0 + 1 = 1

    Iteration i = 1 (Station 1, Net Gain = -2):
      current_trip_tank += (-2)  => -2
      current_trip_tank < 0 ? Yes.
        Reset: current_trip_tank = 0
        New start_station = 1 + 1 = 2

    Iteration i = 2 (Station 2, Net Gain = -2):
      current_trip_tank += (-2)  => -2
      current_trip_tank < 0 ? Yes.
        Reset: current_trip_tank = 0
        New start_station = 2 + 1 = 3

    Iteration i = 3 (Station 3, Net Gain = 3):
      current_trip_tank += 3  => 3
      current_trip_tank < 0 ? No.

    Iteration i = 4 (Station 4, Net Gain = 3):
      current_trip_tank += 3  => 6
      current_trip_tank < 0 ? No.

    End of loop.
    Total Gas >= Total Cost condition met earlier.
    Return start_station.

    Final Answer: start_station = 3
    ```

---
```