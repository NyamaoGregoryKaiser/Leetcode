```typescript
/**
 * @fileoverview Defines benchmark cases for different graph algorithms.
 */

import { NodeId } from "../src/data-structures/graph";

/**
 * Interface for a single benchmark test case.
 */
export interface BenchmarkCase {
  name: string;
  numNodes: number;
  density: number; // 0.0 (sparse) to 1.0 (dense)
  directed: boolean;
  weighted: boolean;
  maxWeight?: number;
}

/**
 * Array of benchmark cases to be run.
 * Covers various graph sizes, densities, and types (directed/undirected, weighted/unweighted).
 */
export const benchmarkCases: BenchmarkCase[] = [
  // --- Small Graphs ---
  {
    name: 'Small Sparse Undirected Unweighted',
    numNodes: 50,
    density: 0.05,
    directed: false,
    weighted: false,
  },
  {
    name: 'Small Dense Undirected Unweighted',
    numNodes: 50,
    density: 0.8,
    directed: false,
    weighted: false,
  },
  {
    name: 'Small Sparse Directed Weighted',
    numNodes: 50,
    density: 0.05,
    directed: true,
    weighted: true,
    maxWeight: 50,
  },
  {
    name: 'Small Dense Directed Weighted',
    numNodes: 50,
    density: 0.8,
    directed: true,
    weighted: true,
    maxWeight: 50,
  },

  // --- Medium Graphs ---
  {
    name: 'Medium Sparse Undirected Unweighted',
    numNodes: 500,
    density: 0.01,
    directed: false,
    weighted: false,
  },
  {
    name: 'Medium Dense Undirected Unweighted',
    numNodes: 500,
    density: 0.2,
    directed: false,
    weighted: false,
  },
  {
    name: 'Medium Sparse Directed Weighted',
    numNodes: 500,
    density: 0.01,
    directed: true,
    weighted: true,
    maxWeight: 100,
  },
  {
    name: 'Medium Dense Directed Weighted',
    numNodes: 500,
    density: 0.2,
    directed: true,
    weighted: true,
    maxWeight: 100,
  },

  // --- Large Graphs ---
  {
    name: 'Large Sparse Undirected Unweighted',
    numNodes: 5000,
    density: 0.001, // Very sparse to keep E reasonable
    directed: false,
    weighted: false,
  },
  {
    name: 'Large Medium-Dense Undirected Unweighted',
    numNodes: 1000, // Reduced nodes for "medium-dense" large scale
    density: 0.05,
    directed: false,
    weighted: false,
  },
  {
    name: 'Large Sparse Directed Weighted',
    numNodes: 5000,
    density: 0.001,
    directed: true,
    weighted: true,
    maxWeight: 1000,
  },
  {
    name: 'Large Medium-Dense Directed Weighted',
    numNodes: 1000, // Reduced nodes for "medium-dense" large scale
    density: 0.05,
    directed: true,
    weighted: true,
    maxWeight: 1000,
  },
];
```