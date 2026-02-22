```typescript
/**
 * @fileoverview Test suite for Topological Sort algorithms:
 *   - topologicalSortKahn (BFS-based)
 *   - topologicalSortDFS (DFS-based)
 */

import { Graph } from '../../src/data-structures/graph';
import { topologicalSortKahn, topologicalSortDFS } from '../../src/algorithms/topological-sort';

describe('topologicalSortKahn (BFS-based)', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph(true); // Directed graph
  });

  test('should return a valid topological sort for a simple DAG', () => {
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'D');
    graph.addEdge('D', 'E');
    const result = topologicalSortKahn(graph);
    expect(result).not.toBeNull();
    // In Kahn's, the order of nodes with 0 in-degree (A, B) and subsequent choices can vary
    // So we check if it's a valid topological order
    // A/B must come before C, C before D, D before E
    const expectedPrefixes = [['A', 'B'], ['B', 'A']]; // Possible starting pairs
    const expectedSuffix = ['C', 'D', 'E'];
    expect(result!.length).toBe(5);

    const indexOfA = result!.indexOf('A');
    const indexOfB = result!.indexOf('B');
    const indexOfC = result!.indexOf('C');
    const indexOfD = result!.indexOf('D');
    const indexOfE = result!.indexOf('E');

    expect(indexOfA).toBeLessThan(indexOfC);
    expect(indexOfB).toBeLessThan(indexOfC);
    expect(indexOfC).toBeLessThan(indexOfD);
    expect(indexOfD).toBeLessThan(indexOfE);
  });

  test('should return a valid topological sort for a more complex DAG', () => {
    graph.addEdge('5', '2');
    graph.addEdge('5', '0');
    graph.addEdge('4', '0');
    graph.addEdge('4', '1');
    graph.addEdge('2', '3');
    graph.addEdge('3', '1');
    // Nodes: 0, 1, 2, 3, 4, 5
    const result = topologicalSortKahn(graph);
    expect(result).not.toBeNull();
    // A valid order could be: 5, 4, 2, 0, 3, 1 OR 4, 5, 2, 0, 3, 1 etc.
    // Check specific ordering constraints
    const order = result!;
    expect(order.length).toBe(6);
    expect(order.indexOf('5')).toBeLessThan(order.indexOf('2'));
    expect(order.indexOf('5')).toBeLessThan(order.indexOf('0'));
    expect(order.indexOf('4')).toBeLessThan(order.indexOf('0'));
    expect(order.indexOf('4')).toBeLessThan(order.indexOf('1'));
    expect(order.indexOf('2')).toBeLessThan(order.indexOf('3'));
    expect(order.indexOf('3')).toBeLessThan(order.indexOf('1'));
  });

  test('should return null if the graph contains a cycle', () => {
    graph.addEdge('1', '2');
    graph.addEdge('2', '3');
    graph.addEdge('3', '1'); // Cycle: 1 -> 2 -> 3 -> 1
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const result = topologicalSortKahn(graph);
    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Graph contains a cycle. A topological sort is not possible.")
    );
    consoleWarnSpy.mockRestore();
  });

  test('should handle disconnected nodes in a DAG', () => {
    graph.addEdge('A', 'B');
    graph.addNode('X'); // Isolated
    graph.addEdge('P', 'Q');
    const result = topologicalSortKahn(graph);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(5);
    expect(result!.indexOf('A')).toBeLessThan(result!.indexOf('B'));
    expect(result!.indexOf('P')).toBeLessThan(result!.indexOf('Q'));
    expect(result!).toContain('X');
  });

  test('should return an empty array for an empty graph', () => {
    expect(topologicalSortKahn(new Graph(true))).toEqual([]);
  });

  test('should return a single node array for a graph with one node', () => {
    graph.addNode('A');
    expect(topologicalSortKahn(graph)).toEqual(['A']);
  });

  test('should return null if graph is undirected', () => {
    const undirectedGraph = new Graph(false);
    undirectedGraph.addEdge('A', 'B');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(topologicalSortKahn(undirectedGraph)).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Kahn's algorithm is only applicable to directed graphs.")
    );
    consoleErrorSpy.mockRestore();
  });
});

describe('topologicalSortDFS (DFS-based)', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph(true); // Directed graph
  });

  test('should return a valid topological sort for a simple DAG', () => {
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'D');
    graph.addEdge('D', 'E');
    const result = topologicalSortDFS(graph);
    expect(result).not.toBeNull();
    // DFS topological sort gives a specific valid order, but depends on adjacency list order.
    // Check specific ordering constraints
    const order = result!;
    expect(order.length).toBe(5);
    const indexOfA = order.indexOf('A');
    const indexOfB = order.indexOf('B');
    const indexOfC = order.indexOf('C');
    const indexOfD = order.indexOf('D');
    const indexOfE = order.indexOf('E');

    expect(indexOfA).toBeLessThan(indexOfC);
    expect(indexOfB).toBeLessThan(indexOfC);
    expect(indexOfC).toBeLessThan(indexOfD);
    expect(indexOfD).toBeLessThan(indexOfE);
  });

  test('should return a valid topological sort for a more complex DAG', () => {
    graph.addEdge('5', '2');
    graph.addEdge('5', '0');
    graph.addEdge('4', '0');
    graph.addEdge('4', '1');
    graph.addEdge('2', '3');
    graph.addEdge('3', '1');
    const result = topologicalSortDFS(graph);
    expect(result).not.toBeNull();
    const order = result!;
    expect(order.length).toBe(6);
    expect(order.indexOf('5')).toBeLessThan(order.indexOf('2'));
    expect(order.indexOf('5')).toBeLessThan(order.indexOf('0'));
    expect(order.indexOf('4')).toBeLessThan(order.indexOf('0'));
    expect(order.indexOf('4')).toBeLessThan(order.indexOf('1'));
    expect(order.indexOf('2')).toBeLessThan(order.indexOf('3'));
    expect(order.indexOf('3')).toBeLessThan(order.indexOf('1'));
  });

  test('should return null if the graph contains a cycle', () => {
    graph.addEdge('1', '2');
    graph.addEdge('2', '3');
    graph.addEdge('3', '1'); // Cycle: 1 -> 2 -> 3 -> 1
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const result = topologicalSortDFS(graph);
    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Graph contains a cycle. A topological sort is not possible.")
    );
    consoleWarnSpy.mockRestore();
  });

  test('should handle disconnected nodes in a DAG', () => {
    graph.addEdge('A', 'B');
    graph.addNode('X'); // Isolated
    graph.addEdge('P', 'Q');
    const result = topologicalSortDFS(graph);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(5);
    expect(result!.indexOf('A')).toBeLessThan(result!.indexOf('B'));
    expect(result!.indexOf('P')).toBeLessThan(result!.indexOf('Q'));
    expect(result!).toContain('X');
  });

  test('should return an empty array for an empty graph', () => {
    expect(topologicalSortDFS(new Graph(true))).toEqual([]);
  });

  test('should return a single node array for a graph with one node', () => {
    graph.addNode('A');
    expect(topologicalSortDFS(graph)).toEqual(['A']);
  });

  test('should return null if graph is undirected', () => {
    const undirectedGraph = new Graph(false);
    undirectedGraph.addEdge('A', 'B');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(topologicalSortDFS(undirectedGraph)).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("DFS-based topological sort is only applicable to directed graphs.")
    );
    consoleErrorSpy.mockRestore();
  });
});
```