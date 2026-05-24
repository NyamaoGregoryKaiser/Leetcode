/**
 * benchmarks/performance.ts
 *
 * This file contains performance benchmarks for the implemented graph algorithms.
 * It uses console.time and console.timeEnd to measure execution time.
 * We generate graphs of varying sizes and densities to test performance under different conditions.
 *
 * To run this benchmark:
 * npm install ts-node  (if not already installed)
 * npm run benchmark
 */

import { Graph } from '@data-structures/graph';
import { bfsShortestPath } from '@algorithms/bfs';
import { detectCycleInDirectedGraphDFS, detectCycleInDirectedGraphDFSIterative } from '@algorithms/dfs-cycle-detection';
import { dijkstra } from '@algorithms/dijkstra';
import { kruskal } from '@algorithms/kruskal';
import {
  generateRandomUnweightedGraph,
  generateRandomWeightedGraph,
  generateRandomDirectedGraph
} from '@utils/graph-generator';

interface BenchmarkConfig {
  name: string;
  numNodes: number;
  numEdges: number;
  maxWeight?: number; // For weighted graphs
}

const benchmarkConfigs: BenchmarkConfig[] = [
  { name: "Small Sparse Graph", numNodes: 100, numEdges: 200 },
  { name: "Small Dense Graph", numNodes: 100, numEdges: 4950 }, // V*(V-1)/2
  { name: "Medium Sparse Graph", numNodes: 1000, numEdges: 5000 },
  { name: "Medium Dense Graph", numNodes: 1000, numEdges: 500000 }, // Max edges: 499500
  { name: "Large Sparse Graph", numNodes: 10000, numEdges: 50000 },
  // { name: "Large Dense Graph", numNodes: 10000, numEdges: 50000000 }, // This would take too long for dense E^2
];

console.log('--- Graph Algorithm Benchmarks ---');
console.log('---------------------------------');

for (const config of benchmarkConfigs) {
  console.log(`\nBenchmarking: ${config.name} (Nodes: ${config.numNodes}, Edges: ${config.numEdges})`);

  // --- BFS Shortest Path (Unweighted) ---
  const unweightedGraph = generateRandomUnweightedGraph(config.numNodes, config.numEdges);
  const bfsStartNode = 0;
  const bfsEndNode = Math.floor(config.numNodes * 0.9); // Target a node near the end

  if (unweightedGraph.hasNode(bfsStartNode) && unweightedGraph.hasNode(bfsEndNode)) {
    console.time(`  BFS Shortest Path`);
    bfsShortestPath(unweightedGraph, bfsStartNode, bfsEndNode);
    console.timeEnd(`  BFS Shortest Path`);
  } else {
    console.log(`  BFS Shortest Path: Skipped (start/end nodes not guaranteed in graph)`);
  }


  // --- DFS Cycle Detection (Directed) ---
  const directedGraph = generateRandomDirectedGraph(config.numNodes, config.numEdges);
  console.time(`  DFS Cycle Detection (Recursive)`);
  detectCycleInDirectedGraphDFS(directedGraph);
  console.timeEnd(`  DFS Cycle Detection (Recursive)`);

  console.time(`  DFS Cycle Detection (Iterative)`);
  detectCycleInDirectedGraphDFSIterative(directedGraph);
  console.timeEnd(`  DFS Cycle Detection (Iterative)`);


  // --- Dijkstra's Algorithm (Weighted) ---
  const weightedGraph = generateRandomWeightedGraph(config.numNodes, config.numEdges, 100);
  const dijkstraStartNode = 0;

  if (weightedGraph.hasNode(dijkstraStartNode)) {
    console.time(`  Dijkstra's Algorithm`);
    dijkstra(weightedGraph, dijkstraStartNode);
    console.timeEnd(`  Dijkstra's Algorithm`);
  } else {
    console.log(`  Dijkstra's Algorithm: Skipped (start node not guaranteed in graph)`);
  }


  // --- Kruskal's Algorithm (Weighted, Undirected) ---
  // Kruskal's requires a graph where all nodes are potentially connectable to find an MST
  // For small graphs, generateRandomWeightedGraph is fine. For larger, need to ensure connectivity.
  // For benchmarking, we just use random and it will find MSF if disconnected.
  const kruskalGraph = generateRandomWeightedGraph(config.numNodes, config.numEdges * 2, 100); // More edges to ensure better connectivity
  console.time(`  Kruskal's Algorithm`);
  kruskal(kruskalGraph);
  console.timeEnd(`  Kruskal's Algorithm`);

  console.log('---------------------------------');
}