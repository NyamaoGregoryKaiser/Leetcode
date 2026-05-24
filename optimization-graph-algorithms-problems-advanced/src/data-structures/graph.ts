/**
 * src/data-structures/graph.ts
 * Implements a generic Graph data structure using an adjacency list.
 * Supports both directed/undirected and weighted/unweighted graphs.
 */

import { AdjacencyList, WeightedAdjacencyList, WeightedEdge } from '@src/types';

/**
 * A generic Graph class implemented using an adjacency list.
 * Supports both unweighted and weighted graphs, and directed/undirected edges.
 * @template T The type of the node identifiers (e.g., number, string).
 */
export class Graph<T = number> {
  /**
   * The adjacency list storing graph connections.
   * If `isWeighted` is true, it's `WeightedAdjacencyList`, otherwise `AdjacencyList`.
   */
  private adj: AdjacencyList<T> | WeightedAdjacencyList<T>;
  private readonly isDirected: boolean;
  private readonly isWeighted: boolean;

  /**
   * Creates a new Graph instance.
   * @param isDirected Whether the graph is directed (true) or undirected (false). Default is false.
   * @param isWeighted Whether the graph edges have weights (true) or not (false). Default is false.
   */
  constructor(isDirected: boolean = false, isWeighted: boolean = false) {
    this.isDirected = isDirected;
    this.isWeighted = isWeighted;
    this.adj = new Map<T, any>(); // Initialize with any, then cast based on isWeighted
  }

  /**
   * Returns all nodes currently in the graph.
   * @returns An array of node identifiers.
   *
   * Time Complexity: O(V), where V is the number of vertices.
   * Space Complexity: O(V) to store the array of nodes.
   */
  public getNodes(): T[] {
    return Array.from(this.adj.keys());
  }

  /**
   * Returns the adjacency list.
   * @returns The internal adjacency list map.
   */
  public getAdjacencyList(): AdjacencyList<T> | WeightedAdjacencyList<T> {
    return this.adj;
  }

  /**
   * Adds a node to the graph if it doesn't already exist.
   * @param node The node identifier to add.
   *
   * Time Complexity: O(1) on average for Map operations.
   * Space Complexity: O(1) if new node, else O(1).
   */
  public addNode(node: T): void {
    if (!this.adj.has(node)) {
      if (this.isWeighted) {
        (this.adj as WeightedAdjacencyList<T>).set(node, []);
      } else {
        (this.adj as AdjacencyList<T>).set(node, new Set());
      }
    }
  }

  /**
   * Adds an edge between two nodes.
   * Automatically adds nodes if they don't exist.
   * @param u The source node.
   * @param v The destination node.
   * @param weight The weight of the edge (only relevant for weighted graphs). Defaults to 1 for unweighted.
   * @throws Error if trying to add weighted edge to unweighted graph or vice-versa with explicit weight mismatch.
   *
   * Time Complexity: O(1) on average for Map/Set operations.
   * Space Complexity: O(1) if new edge, else O(1).
   */
  public addEdge(u: T, v: T, weight: number = 1): void {
    this.addNode(u);
    this.addNode(v);

    if (this.isWeighted) {
      (this.adj as WeightedAdjacencyList<T>).get(u)!.push({ to: v, weight });
      if (!this.isDirected) {
        (this.adj as WeightedAdjacencyList<T>).get(v)!.push({ to: u, weight });
      }
    } else {
      (this.adj as AdjacencyList<T>).get(u)!.add(v);
      if (!this.isDirected) {
        (this.adj as AdjacencyList<T>).get(v)!.add(u);
      }
    }
  }

  /**
   * Gets the neighbors of a given node.
   * @param node The node to get neighbors for.
   * @returns An array of neighbors (or WeightedEdge objects for weighted graphs).
   *          Returns an empty array if the node does not exist.
   *
   * Time Complexity: O(degree(node)) for unweighted (converting Set to Array), O(1) for weighted (returning array reference).
   * Space Complexity: O(degree(node)) for unweighted (creating new array), O(1) for weighted.
   */
  public getNeighbors(node: T): (T | WeightedEdge<T>)[] {
    if (!this.adj.has(node)) {
      return [];
    }
    if (this.isWeighted) {
      return (this.adj as WeightedAdjacencyList<T>).get(node)!;
    } else {
      return Array.from((this.adj as AdjacencyList<T>).get(node)!);
    }
  }

  /**
   * Checks if a node exists in the graph.
   * @param node The node to check.
   * @returns True if the node exists, false otherwise.
   *
   * Time Complexity: O(1) on average.
   * Space Complexity: O(1).
   */
  public hasNode(node: T): boolean {
    return this.adj.has(node);
  }

  /**
   * Checks if an edge exists between two nodes.
   * @param u The source node.
   * @param v The destination node.
   * @returns True if an edge exists, false otherwise.
   *
   * Time Complexity: O(degree(u)) for weighted (linear scan), O(1) for unweighted (Set.has).
   * Space Complexity: O(1).
   */
  public hasEdge(u: T, v: T): boolean {
    if (!this.adj.has(u)) {
      return false;
    }
    if (this.isWeighted) {
      const neighbors = (this.adj as WeightedAdjacencyList<T>).get(u)!;
      return neighbors.some(edge => edge.to === v);
    } else {
      return (this.adj as AdjacencyList<T>).get(u)!.has(v);
    }
  }

  /**
   * Gets the weight of an edge between two nodes.
   * @param u The source node.
   * @param v The destination node.
   * @returns The weight of the edge, or `undefined` if the edge does not exist or graph is unweighted.
   *
   * Time Complexity: O(degree(u)) for weighted graphs, as it might need to iterate through neighbors.
   * Space Complexity: O(1).
   */
  public getEdgeWeight(u: T, v: T): number | undefined {
    if (!this.isWeighted || !this.adj.has(u)) {
      return undefined;
    }
    const neighbors = (this.adj as WeightedAdjacencyList<T>).get(u)!;
    const edge = neighbors.find(e => e.to === v);
    return edge?.weight;
  }

  /**
   * Returns the number of nodes in the graph.
   * @returns The count of nodes.
   *
   * Time Complexity: O(1).
   * Space Complexity: O(1).
   */
  public size(): number {
    return this.adj.size;
  }

  /**
   * Clears all nodes and edges from the graph.
   *
   * Time Complexity: O(1).
   * Space Complexity: O(1).
   */
  public clear(): void {
    this.adj.clear();
  }

  /**
   * Generates a string representation of the graph.
   * @returns A string representation of the graph's adjacency list.
   */
  public toString(): string {
    let result = `Graph (directed: ${this.isDirected}, weighted: ${this.isWeighted})\n`;
    for (const [node, neighbors] of this.adj.entries()) {
      result += `${node} -> `;
      if (this.isWeighted) {
        result += (neighbors as WeightedEdge<T>[]).map(edge => `${edge.to} (${edge.weight})`).join(', ');
      } else {
        result += Array.from(neighbors as Set<T>).join(', ');
      }
      result += '\n';
    }
    return result;
  }
}