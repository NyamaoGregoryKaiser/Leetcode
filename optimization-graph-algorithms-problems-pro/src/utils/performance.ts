```typescript
/**
 * @fileoverview Utility functions for performance benchmarking.
 */

/**
 * Measures the execution time of a synchronous function.
 * @param {Function} func - The function to benchmark.
 * @param {string} [name='Operation'] - An optional name for the operation.
 * @returns {number} The execution time in milliseconds.
 *
 * Time Complexity: O(execution time of func)
 * Space Complexity: O(1)
 */
export function measureSyncPerformance(func: () => any, name: string = 'Operation'): number {
  const start = process.hrtime.bigint();
  func();
  const end = process.hrtime.bigint();
  const durationMs = Number(end - start) / 1_000_000;
  // console.log(`${name} took ${durationMs.toFixed(3)} ms`);
  return durationMs;
}

/**
 * Measures the execution time of an asynchronous function.
 * @param {Function} func - The async function to benchmark.
 * @param {string} [name='Async Operation'] - An optional name for the operation.
 * @returns {Promise<number>} A promise that resolves with the execution time in milliseconds.
 *
 * Time Complexity: O(execution time of func)
 * Space Complexity: O(1)
 */
export async function measureAsyncPerformance(func: () => Promise<any>, name: string = 'Async Operation'): Promise<number> {
  const start = process.hrtime.bigint();
  await func();
  const end = process.hrtime.bigint();
  const durationMs = Number(end - start) / 1_000_000;
  // console.log(`${name} took ${durationMs.toFixed(3)} ms`);
  return durationMs;
}

/**
 * Generates a random integer within a specified range.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer.
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random graph for benchmarking purposes.
 * @param {number} numNodes - The number of nodes in the graph.
 * @param {number} density - A value between 0 and 1 indicating graph density (0 = sparse, 1 = dense).
 * @param {boolean} directed - Whether the graph should be directed.
 * @param {boolean} weighted - Whether the edges should have weights.
 * @param {number} [maxWeight=100] - Maximum weight for edges if weighted.
 * @returns {Graph} A newly created random graph.
 */
import { Graph, NodeId } from '../data-structures/graph';

export function generateRandomGraph(
  numNodes: number,
  density: number,
  directed: boolean,
  weighted: boolean,
  maxWeight: number = 100
): Graph {
  const graph = new Graph(directed);
  const nodes: NodeId[] = Array.from({ length: numNodes }, (_, i) => `Node-${i}`);

  nodes.forEach(node => graph.addNode(node));

  // Determine the number of edges based on density
  // For a complete graph:
  // Undirected: V * (V - 1) / 2
  // Directed: V * (V - 1)
  const maxEdges = directed ? numNodes * (numNodes - 1) : (numNodes * (numNodes - 1)) / 2;
  const targetEdges = Math.floor(maxEdges * density);
  let edgesAdded = 0;

  // Simple, potentially less efficient for very dense graphs, but good enough for typical benchmarks
  while (edgesAdded < targetEdges) {
    const fromIndex = getRandomInt(0, numNodes - 1);
    const toIndex = getRandomInt(0, numNodes - 1);

    const from = nodes[fromIndex];
    const to = nodes[toIndex];

    if (from === to) continue; // No self-loops for simplicity in random generation

    if (!graph.hasEdge(from, to)) {
      const weight = weighted ? getRandomInt(1, maxWeight) : 1;
      graph.addEdge(from, to, weight);
      edgesAdded++;
    }
  }

  return graph;
}
```