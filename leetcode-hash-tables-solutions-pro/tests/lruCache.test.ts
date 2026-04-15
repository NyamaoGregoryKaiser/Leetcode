```typescript
import { LRUCache } from '../src/problems/lruCache';

describe('LRUCache', () => {
    it('should handle basic put and get operations', () => {
        const lRUCache = new LRUCache(2);
        lRUCache.put(1, 1); // cache is {1=1}
        lRUCache.put(2, 2); // cache is {1=1, 2=2}
        expect(lRUCache.get(1)).toBe(1); // returns 1 (key 1 is now MRU)
        lRUCache.put(3, 3); // LRU key 2 is evicted, cache is {1=1, 3=3}
        expect(lRUCache.get(2)).toBe(-1); // returns -1 (key 2 not found)
        lRUCache.put(4, 4); // LRU key 1 is evicted, cache is {3=3, 4=4}
        expect(lRUCache.get(1)).toBe(-1); // returns -1 (key 1 not found)
        expect(lRUCache.get(3)).toBe(3); // returns 3 (key 3 is now MRU)
        expect(lRUCache.get(4)).toBe(4); // returns 4 (key 4 is now MRU)
    });

    it('should update value for existing key and mark it as MRU', () => {
        const lRUCache = new LRUCache(2);
        lRUCache.put(1, 1); // cache is {1=1}
        lRUCache.put(2, 2); // cache is {1=1, 2=2}
        lRUCache.put(1, 10); // key 1 exists, value updated to 10. key 1 is now MRU. cache: {2=2, 1=10} (2 is LRU)
        expect(lRUCache.get(1)).toBe(10); // returns 10 (key 1 is MRU)
        lRUCache.put(3, 30); // key 2 is evicted. cache: {1=10, 3=30}
        expect(lRUCache.get(2)).toBe(-1);
        expect(lRUCache.get(1)).toBe(10); // key 1 is MRU
        expect(lRUCache.get(3)).toBe(30); // key 3 is MRU
    });

    it('should handle capacity of 1', () => {
        const lRUCache = new LRUCache(1);
        lRUCache.put(1, 1); // cache is {1=1}
        expect(lRUCache.get(1)).toBe(1); // returns 1
        lRUCache.put(2, 2); // LRU key 1 is evicted, cache is {2=2}
        expect(lRUCache.get(1)).toBe(-1);
        expect(lRUCache.get(2)).toBe(2);
    });

    it('should handle many puts and gets without exceeding capacity', () => {
        const lRUCache = new LRUCache(3);
        lRUCache.put(1, 10);
        lRUCache.put(2, 20);
        lRUCache.put(3, 30); // cache: {1=10, 2=20, 3=30} (1 is LRU)

        expect(lRUCache.get(1)).toBe(10); // cache: {2=20, 3=30, 1=10} (2 is LRU)
        lRUCache.put(4, 40); // 2 evicted. cache: {3=30, 1=10, 4=40} (3 is LRU)
        expect(lRUCache.get(2)).toBe(-1);
        expect(lRUCache.get(3)).toBe(30); // cache: {1=10, 4=40, 3=30} (1 is LRU)
        expect(lRUCache.get(1)).toBe(10); // cache: {4=40, 3=30, 1=10} (4 is LRU)
        expect(lRUCache.get(4)).toBe(40); // cache: {3=30, 1=10, 4=40} (3 is LRU)
    });

    it('should correctly handle multiple accesses before eviction', () => {
        const lRUCache = new LRUCache(2);
        lRUCache.put(1, 1);
        lRUCache.put(2, 2);
        expect(lRUCache.get(1)).toBe(1); // 1 is now MRU, 2 is LRU
        lRUCache.put(3, 3); // 2 evicted. cache: {1=1, 3=3}
        expect(lRUCache.get(2)).toBe(-1);
        expect(lRUCache.get(3)).toBe(3); // 3 is now MRU, 1 is LRU
        lRUCache.put(4, 4); // 1 evicted. cache: {3=3, 4=4}
        expect(lRUCache.get(1)).toBe(-1);
        expect(lRUCache.get(3)).toBe(3); // 3 is now MRU, 4 is LRU
        expect(lRUCache.get(4)).toBe(4); // 4 is now MRU, 3 is LRU
    });

    it('should throw error for invalid capacity', () => {
        expect(() => new LRUCache(0)).toThrow("Capacity must be a positive integer.");
        expect(() => new LRUCache(-5)).toThrow("Capacity must be a positive integer.");
    });
});
```