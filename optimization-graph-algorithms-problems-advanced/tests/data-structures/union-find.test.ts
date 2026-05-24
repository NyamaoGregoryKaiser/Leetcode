/**
 * tests/data-structures/union-find.test.ts
 * Tests for the UnionFind data structure.
 */

import { UnionFind } from '@data-structures/union-find';

describe('UnionFind', () => {
  let uf: UnionFind<number>;

  beforeEach(() => {
    uf = new UnionFind();
  });

  test('should initialize elements into their own sets', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    expect(uf.find(1)).toBe(1);
    expect(uf.find(2)).toBe(2);
    expect(uf.areConnected(1, 2)).toBe(false);
    expect(uf.countSets()).toBe(2);
  });

  test('should handle initial elements in constructor', () => {
    const ufWithElements = new UnionFind([1, 2, 3]);
    expect(ufWithElements.find(1)).toBe(1);
    expect(ufWithElements.find(2)).toBe(2);
    expect(ufWithElements.find(3)).toBe(3);
    expect(ufWithElements.areConnected(1, 2)).toBe(false);
    expect(ufWithElements.countSets()).toBe(3);
  });

  test('should union two sets', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.union(1, 2);
    expect(uf.areConnected(1, 2)).toBe(true);
    expect(uf.find(1)).toBe(uf.find(2));
    expect(uf.countSets()).toBe(1);
  });

  test('should connect multiple elements', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.makeSet(3);
    uf.makeSet(4);

    uf.union(1, 2); // {1,2}, {3}, {4}
    uf.union(3, 4); // {1,2}, {3,4}
    expect(uf.areConnected(1, 2)).toBe(true);
    expect(uf.areConnected(3, 4)).toBe(true);
    expect(uf.areConnected(1, 3)).toBe(false);
    expect(uf.countSets()).toBe(2);

    uf.union(2, 3); // {1,2,3,4}
    expect(uf.areConnected(1, 4)).toBe(true);
    expect(uf.countSets()).toBe(1);
  });

  test('should not change state if elements already connected', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.union(1, 2);
    const rootBefore = uf.find(1);
    const setsBefore = uf.countSets();
    expect(uf.union(1, 2)).toBe(false); // Should return false as no union occurred
    expect(uf.find(1)).toBe(rootBefore);
    expect(uf.countSets()).toBe(setsBefore);
  });

  test('should apply path compression during find', () => {
    // Manually create a deeper structure to test path compression
    uf.makeSet(1);
    uf.makeSet(2);
    uf.makeSet(3);
    uf.makeSet(4);
    uf.makeSet(5);

    uf.union(1, 2); // 1-2
    uf.union(2, 3); // 1-2-3
    uf.union(3, 4); // 1-2-3-4
    uf.union(4, 5); // 1-2-3-4-5 (or similar, depending on rank/size heuristic)

    const rootOf5 = uf.find(5); // This call should compress the path
    expect(uf.find(1)).toBe(rootOf5);
    expect(uf.find(2)).toBe(rootOf5);
    expect(uf.find(3)).toBe(rootOf5);
    expect(uf.find(4)).toBe(rootOf5);
    expect(uf.countSets()).toBe(1);
  });

  test('should throw error for non-existent elements', () => {
    expect(() => uf.find(1)).toThrow('Element 1 not found in any set.');
    uf.makeSet(1);
    expect(() => uf.union(1, 2)).toThrow('Element 2 not found in any set.');
  });

  test('should work with string elements', () => {
    const ufString = new UnionFind<string>();
    ufString.makeSet("A");
    ufString.makeSet("B");
    ufString.makeSet("C");
    ufString.union("A", "B");
    expect(ufString.areConnected("A", "B")).toBe(true);
    expect(ufString.areConnected("A", "C")).toBe(false);
    expect(ufString.find("A")).toBe(ufString.find("B"));
    expect(ufString.countSets()).toBe(2);
  });

  test('getElements should return all elements', () => {
    uf.makeSet(1);
    uf.makeSet(2);
    uf.makeSet(3);
    expect(uf.getElements().sort()).toEqual([1, 2, 3]);
    uf.union(1, 2);
    expect(uf.getElements().sort()).toEqual([1, 2, 3]);
  });
});