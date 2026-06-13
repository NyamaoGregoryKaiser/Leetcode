const assert = require('assert');
const { MinStackTwoStacks, MinStackCustomObject } = require('../src/problems/Problem2_MinStack');

console.log('--- Running Min Stack Tests ---');

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

// Test suite for MinStack using Two Stacks
runTest('MinStackTwoStacks: Basic operations and min retrieval', () => {
    const minStack = new MinStackTwoStacks();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    assert.strictEqual(minStack.getMin(), -3, 'Expected min to be -3');
    minStack.pop();
    assert.strictEqual(minStack.top(), 0, 'Expected top to be 0');
    assert.strictEqual(minStack.getMin(), -2, 'Expected min to be -2');
});

runTest('MinStackTwoStacks: Handling duplicate minimums', () => {
    const minStack = new MinStackTwoStacks();
    minStack.push(2);
    minStack.push(0);
    minStack.push(3);
    minStack.push(0);
    assert.strictEqual(minStack.getMin(), 0, 'Expected min to be 0');
    minStack.pop(); // Pop 0
    assert.strictEqual(minStack.getMin(), 0, 'Expected min to still be 0 after pop of duplicate');
    minStack.pop(); // Pop 3
    assert.strictEqual(minStack.getMin(), 0, 'Expected min to still be 0');
    minStack.pop(); // Pop 0
    assert.strictEqual(minStack.getMin(), 2, 'Expected min to be 2');
});

runTest('MinStackTwoStacks: Operations on an empty stack', () => {
    const minStack = new MinStackTwoStacks();
    assert.strictEqual(minStack.top(), undefined, 'Top of empty stack should be undefined');
    assert.strictEqual(minStack.getMin(), undefined, 'Min of empty stack should be undefined');
    minStack.pop(); // Should not throw error
});

runTest('MinStackTwoStacks: Pushing and popping all elements', () => {
    const minStack = new MinStackTwoStacks();
    minStack.push(5);
    minStack.push(2);
    minStack.push(8);
    minStack.push(1);

    assert.strictEqual(minStack.getMin(), 1);
    minStack.pop(); // 1
    assert.strictEqual(minStack.getMin(), 2);
    minStack.pop(); // 8
    assert.strictEqual(minStack.getMin(), 2);
    minStack.pop(); // 2
    assert.strictEqual(minStack.getMin(), 5);
    minStack.pop(); // 5
    assert.strictEqual(minStack.getMin(), undefined);
    assert.strictEqual(minStack.top(), undefined);
});

// Test suite for MinStack using Custom Object in a single stack
runTest('MinStackCustomObject: Basic operations and min retrieval', () => {
    const minStack = new MinStackCustomObject();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    assert.strictEqual(minStack.getMin(), -3, 'Expected min to be -3');
    minStack.pop();
    assert.strictEqual(minStack.top(), 0, 'Expected top to be 0');
    assert.strictEqual(minStack.getMin(), -2, 'Expected min to be -2');
});

runTest('MinStackCustomObject: Handling duplicate minimums', () => {
    const minStack = new MinStackCustomObject();
    minStack.push(2);
    minStack.push(0);
    minStack.push(3);
    minStack.push(0);
    assert.strictEqual(minStack.getMin(), 0, 'Expected min to be 0');
    minStack.pop(); // Pop 0
    assert.strictEqual(minStack.getMin(), 0, 'Expected min to still be 0 after pop of duplicate');
    minStack.pop(); // Pop 3
    assert.strictEqual(minStack.getMin(), 0, 'Expected min to still be 0');
    minStack.pop(); // Pop 0
    assert.strictEqual(minStack.getMin(), 2, 'Expected min to be 2');
});

runTest('MinStackCustomObject: Operations on an empty stack', () => {
    const minStack = new MinStackCustomObject();
    assert.strictEqual(minStack.top(), undefined, 'Top of empty stack should be undefined');
    assert.strictEqual(minStack.getMin(), undefined, 'Min of empty stack should be undefined');
    minStack.pop(); // Should not throw error
});

runTest('MinStackCustomObject: Pushing and popping all elements', () => {
    const minStack = new MinStackCustomObject();
    minStack.push(5);
    minStack.push(2);
    minStack.push(8);
    minStack.push(1);

    assert.strictEqual(minStack.getMin(), 1);
    minStack.pop(); // 1
    assert.strictEqual(minStack.getMin(), 2);
    minStack.pop(); // 8
    assert.strictEqual(minStack.getMin(), 2);
    minStack.pop(); // 2
    assert.strictEqual(minStack.getMin(), 5);
    minStack.pop(); // 5
    assert.strictEqual(minStack.getMin(), undefined);
    assert.strictEqual(minStack.top(), undefined);
});


console.log('All Min Stack tests passed!');