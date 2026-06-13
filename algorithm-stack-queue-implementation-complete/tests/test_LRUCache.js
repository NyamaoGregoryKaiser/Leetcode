const assert = require('assert');
const LRUCache = require('../src/problems/Problem4_LRUCache');

console.log('--- Running LRU Cache Tests ---');

function runTest(name, testFunction) {
    try {
        testFunction();
        console.log(`✅ ${name}`);
    } catch (error) {
        console.error(`❌ ${name}`);
        console.error(error.message);
        process.exit(1); // Exit with error code
    }
}

runTest('LRUCache: Basic operations and capacity eviction', () => {
    const lRUCache = new LRUCache(2);
    lRUCache.put(1, 1); // {1=1}
    lRUCache.put(2, 2); // {1=1, 2=2}
    assert.strictEqual(lRUCache.get(1), 1, 'Get 1 should return 1'); // {2=2, 1=1} (1 is MRU)
    lRUCache.put(3, 3); // {1=1, 3=3} (2 is LRU, evicted)
    assert.strictEqual(lRUCache.get(2), -1, 'Get 2 should return -1 (evicted)');
    lRUCache.put(4, 4); // {3=3, 4=4} (1 is LRU, evicted)
    assert.strictEqual(lRUCache.get(1), -1, 'Get 1 should return -1 (evicted)');
    assert.strictEqual(lRUCache.get(3), 3, 'Get 3 should return 3'); // {4=4, 3=3} (3 is MRU)
    assert.strictEqual(lRUCache.get(4), 4, 'Get 4 should return 4'); // {3=3, 4=4} (4 is MRU)
});

runTest('LRUCache: Updating existing key and making it MRU', () => {
    const lRUCache = new LRUCache(2);
    lRUCache.put(1, 1); // {1=1}
    lRUCache.put(2, 2); // {1=1, 2=2}
    lRUCache.put(1, 10); // {2=2, 1=10} (1 updated and is MRU)
    lRUCache.put(3, 3); // {1=10, 3=3} (2 is LRU, evicted)
    assert.strictEqual(lRUCache.get(2), -1, 'Key 2 should be evicted');
    assert.strictEqual(lRUCache.get(1), 10, 'Key 1 should have updated value 10');
});

runTest('LRUCache: Capacity of 1', () => {
    const lRUCache = new LRUCache(1);
    lRUCache.put(1, 1); // {1=1}
    assert.strictEqual(lRUCache.get(1), 1, 'Get 1 should return 1');
    lRUCache.put(2, 2); // {2=2} (1 is evicted)
    assert.strictEqual(lRUCache.get(1), -1, 'Get 1 should return -1');
    assert.strictEqual(lRUCache.get(2), 2, 'Get 2 should return 2');
});

runTest('LRUCache: Complex sequence of operations', () => {
    const lRUCache = new LRUCache(3);
    lRUCache.put(1, 1);    // cache: {1:1}
    lRUCache.put(2, 2);    // cache: {2:2, 1:1}
    lRUCache.put(3, 3);    // cache: {3:3, 2:2, 1:1}
    assert.strictEqual(lRUCache.get(1), 1); // cache: {1:1, 3:3, 2:2} (1 is MRU)
    lRUCache.put(4, 4);    // cache: {4:4, 1:1, 3:3} (2 is LRU, evicted)
    assert.strictEqual(lRUCache.get(2), -1); // 2 not found
    assert.strictEqual(lRUCache.get(3), 3); // cache: {3:3, 4:4, 1:1} (3 is MRU)
    assert.strictEqual(lRUCache.get(4), 4); // cache: {4:4, 3:3, 1:1} (4 is MRU)
    assert.strictEqual(lRUCache.get(1), 1); // cache: {1:1, 4:4, 3:3} (1 is MRU)
    lRUCache.put(5, 5);    // cache: {5:5, 1:1, 4:4} (3 is LRU, evicted)
    assert.strictEqual(lRUCache.get(3), -1); // 3 not found
    assert.strictEqual(lRUCache.get(5), 5); // cache: {5:5, 1:1, 4:4} (5 is MRU)
});

runTest('LRUCache: Edge case - capacity zero or negative throws error', () => {
    assert.throws(() => new LRUCache(0), Error, 'Capacity 0 should throw error');
    assert.throws(() => new LRUCache(-1), Error, 'Capacity -1 should throw error');
});

console.log('All LRU Cache tests passed!');