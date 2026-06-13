const assert = require('assert');
const MyQueue = require('../src/problems/Problem3_QueueUsingStacks');

console.log('--- Running Queue Using Stacks Tests ---');

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

runTest('MyQueue: Basic push, peek, pop, empty operations', () => {
    const queue = new MyQueue();
    assert.strictEqual(queue.empty(), true, 'Queue should be empty initially');

    queue.push(1);
    assert.strictEqual(queue.empty(), false, 'Queue should not be empty after push');
    assert.strictEqual(queue.peek(), 1, 'Peek should return 1');

    queue.push(2);
    assert.strictEqual(queue.peek(), 1, 'Peek should still return 1 after another push (FIFO)');

    assert.strictEqual(queue.pop(), 1, 'Pop should return 1');
    assert.strictEqual(queue.peek(), 2, 'Peek should return 2 after 1 is popped');

    queue.push(3);
    assert.strictEqual(queue.peek(), 2, 'Peek should still return 2 after 3 is pushed');
    assert.strictEqual(queue.pop(), 2, 'Pop should return 2');
    assert.strictEqual(queue.pop(), 3, 'Pop should return 3');

    assert.strictEqual(queue.empty(), true, 'Queue should be empty after all elements are popped');
    assert.strictEqual(queue.peek(), undefined, 'Peek on empty queue should be undefined');
    assert.strictEqual(queue.pop(), undefined, 'Pop on empty queue should be undefined');
});

runTest('MyQueue: Consecutive push operations', () => {
    const queue = new MyQueue();
    queue.push(10);
    queue.push(20);
    queue.push(30);
    assert.strictEqual(queue.peek(), 10, 'Peek after multiple pushes should be the first element');
});

runTest('MyQueue: Consecutive pop operations leading to empty', () => {
    const queue = new MyQueue();
    queue.push(100);
    queue.push(200);
    assert.strictEqual(queue.pop(), 100, 'Pop 100');
    assert.strictEqual(queue.pop(), 200, 'Pop 200');
    assert.strictEqual(queue.empty(), true, 'Queue should be empty');
    assert.strictEqual(queue.peek(), undefined, 'Peek on empty queue should be undefined');
    assert.strictEqual(queue.pop(), undefined, 'Pop on empty queue should be undefined');
});

runTest('MyQueue: Alternating push and pop', () => {
    const queue = new MyQueue();
    queue.push(1); // [1]
    assert.strictEqual(queue.pop(), 1); // []
    queue.push(2); // [2]
    queue.push(3); // [2, 3]
    assert.strictEqual(queue.pop(), 2); // [3]
    queue.push(4); // [3, 4]
    assert.strictEqual(queue.peek(), 3); // [3, 4]
    assert.strictEqual(queue.pop(), 3); // [4]
    assert.strictEqual(queue.pop(), 4); // []
    assert.strictEqual(queue.empty(), true);
});

console.log('All Queue Using Stacks tests passed!');