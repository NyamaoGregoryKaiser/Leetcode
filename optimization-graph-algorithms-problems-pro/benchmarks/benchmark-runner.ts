```typescript
/**
 * @fileoverview Script to run performance benchmarks for graph algorithms.
 * It uses the `performance.ts` utility to measure execution times.
 */

import { Graph } from '../src/data-structures/graph';
import {
  shortestPathBFS,
  isReachableBFS,
  countConnectedComponentsBFS,
} from '../src/algorithms/bfs';
import { dijkstra } from '../src/algorithms/dijkstra';
import {
  detectCycleInDirectedGraphDFS,
  detectCycleInUndirectedGraphDFS,
} from '../src/algorithms/cycle-detection';
import { topologicalSortKahn, topologicalSortDFS } from '../src/algorithms/topological-sort';
import { measureSyncPerformance, generateRandomGraph } from '../src/utils/performance';
import { BenchmarkCase, benchmarkCases } from './benchmark-cases';

/**
 * Runs a benchmark for a given algorithm and graph.
 * @param {string} algorithmName - The name of the algorithm.
 * @param {Function} algorithmFn - The algorithm function to test.
 * @param {Graph} graph - The graph to run the algorithm on.
 * @param {any[]} args - Additional arguments for the algorithm function.
 * @returns {number} The execution time in milliseconds.
 */
function runBenchmark(
  algorithmName: string,
  algorithmFn: (graph: Graph, ...args: any[]) => any,
  graph: Graph,
  args: any[]
): number {
  return measureSyncPerformance(() => algorithmFn(graph, ...args), algorithmName);
}

/**
 * Main function to execute all benchmarks.
 */
async function main() {
  console.log('--- Graph Algorithms Benchmarks ---');
  console.log('Note: Times are in milliseconds and can vary based on hardware and current load.');
  console.log('-----------------------------------\n');

  for (const testCase of benchmarkCases) {
    console.log(`\nBenchmarking: ${testCase.name}`);
    console.log(`  Graph: Nodes=${testCase.numNodes}, Density=${testCase.density}, Directed=${testCase.directed}, Weighted=${testCase.weighted}`);

    const graph = generateRandomGraph(
      testCase.numNodes,
      testCase.density,
      testCase.directed,
      testCase.weighted,
      testCase.maxWeight
    );

    // Get a random start/end node for algorithms that require them
    const nodes = graph.getNodes();
    const startNode = nodes.length > 0 ? nodes[Math.floor(Math.random() * nodes.length)] : undefined;
    const endNode = nodes.length > 0 ? nodes[Math.floor(Math.random() * nodes.length)] : undefined;

    console.log(`  Random startNode for pathing: ${startNode}`);

    if (startNode && endNode) {
        // BFS Algorithms
        if (!testCase.weighted) { // BFS for shortest path typically for unweighted
          const bfsPathTime = runBenchmark('shortestPathBFS', shortestPathBFS, graph, [startNode, endNode]);
          console.log(`    shortestPathBFS: ${bfsPathTime.toFixed(3)} ms`);
          const isReachableTime = runBenchmark('isReachableBFS', isReachableBFS, graph, [startNode, endNode]);
          console.log(`    isReachableBFS: ${isReachableTime.toFixed(3)} ms`);
        }
        if (!testCase.directed) { // Connected components usually for undirected
          const ccTime = runBenchmark('countConnectedComponentsBFS', countConnectedComponentsBFS, graph, []);
          console.log(`    countConnectedComponentsBFS: ${ccTime.toFixed(3)} ms`);
        }
    }


    // Dijkstra's Algorithm (weighted)
    if (testCase.weighted && startNode) {
      const dijkstraTime = runBenchmark('dijkstra', dijkstra, graph, [startNode]);
      console.log(`    dijkstra: ${dijkstraTime.toFixed(3)} ms`);
    }

    // Cycle Detection
    if (testCase.directed) {
      const directedCycleTime = runBenchmark('detectCycleInDirectedGraphDFS', detectCycleInDirectedGraphDFS, graph, []);
      console.log(`    detectCycleInDirectedGraphDFS: ${directedCycleTime.toFixed(3)} ms`);
    } else {
        // Undirected graph test for undirected cycle detection
        const undirectedCycleTime = runBenchmark('detectCycleInUndirectedGraphDFS', detectCycleInUndirectedGraphDFS, graph, []);
        console.log(`    detectCycleInUndirectedGraphDFS: ${undirectedCycleTime.toFixed(3)} ms`);
    }


    // Topological Sort (directed)
    if (testCase.directed) {
      // Note: Topological Sort expects a DAG. Randomly generated directed graphs might have cycles.
      // The algorithms handle cycles by returning null, but the performance measurement still happens.
      const kahnTime = runBenchmark('topologicalSortKahn', topologicalSortKahn, graph, []);
      console.log(`    topologicalSortKahn: ${kahnTime.toFixed(3)} ms`);

      const dfsTopoTime = runBenchmark('topologicalSortDFS', topologicalSortDFS, graph, []);
      console.log(`    topologicalSortDFS: ${dfsTopoTime.toFixed(3)} ms`);
    }
  }
}

// Execute the main benchmarking function
if (require.main === module) {
  main().catch(console.error);
}
```