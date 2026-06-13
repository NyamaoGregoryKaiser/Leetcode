const assert = require('assert');
const Stack = require('../src/data-structures/Stack');

console.log('--- Running Stack Tests ---');

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

runTest('Should initialize an empty stack', () => {
    const stack = new Stack();
    assert.strictEqual(stack.isEmpty(), true, 'Stack should be empty');
    assert.strictEqual(stack.size(), 0, 'Stack size should be 0');
    assert.strictEqual(stack.peek(), undefined, 'Peek on empty stack should return undefined');
    assert.strictEqual(stack.pop(), undefined, 'Pop on empty stack should return undefined');
});

runTest('Should push elements correctly', () => {
    const stack = new Stack();
    stack.push(10);
    assert.strictEqual(stack.size(), 1, 'Size should be 1 after one push');
    assert.strictEqual(stack.peek(), 10, 'Peek should return 10');

    stack.push(20);
    assert.strictEqual(stack.size(), 2, 'Size should be 2 after two pushes');
    assert.strictEqual(stack.peek(), 20, 'Peek should return 20');
});

runTest('Should pop elements in LIFO order', () => {
    const stack = new Stack();
    stack.push(10);
    stack.push(20);
    stack.push(30);

    assert.strictEqual(stack.pop(), 30, 'First pop should return 30');
    assert.strictEqual(stack.size(), 2, 'Size should be 2 after first pop');
    assert.strictEqual(stack.peek(), 20, 'Peek should return 20');

    assert.strictEqual(stack.pop(), 20, 'Second pop should return 20');
    assert.strictEqual(stack.size(), 1, 'Size should be 1 after second pop');
    assert.strictEqual(stack.peek(), 10, 'Peek should return 10');

    assert.strictEqual(stack.pop(), 10, 'Third pop should return 10');
    assert.strictEqual(stack.size(), 0, 'Size should be 0 after third pop');
    assert.strictEqual(stack.isEmpty(), true, 'Stack should be empty');
});

runTest('Should handle mixed operations correctly', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    assert.strictEqual(stack.pop(), 2);
    stack.push(3);
    assert.strictEqual(stack.peek(), 3);
    stack.push(4);
    assert.strictEqual(stack.pop(), 4);
    assert.strictEqual(stack.pop(), 3);
    assert.strictEqual(stack.pop(), 1);
    assert.strictEqual(stack.isEmpty(), true);
    assert.strictEqual(stack.pop(), undefined); // Pop from empty
});

runTest('Should clear the stack', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    assert.strictEqual(stack.size(), 2);
    stack.clear();
    assert.strictEqual(stack.isEmpty(), true, 'Stack should be empty after clear');
    assert.strictEqual(stack.size(), 0, 'Stack size should be 0 after clear');
    assert.strictEqual(stack.peek(), undefined, 'Peek on cleared stack should be undefined');
});

runTest('Should convert to string correctly', () => {
    const stack = new Stack();
    assert.strictEqual(stack.toString(), '', 'Empty stack toString');
    stack.push(1);
    assert.strictEqual(stack.toString(), '1', 'Single element toString');
    stack.push(2);
    stack.push(3);
    assert.strictEqual(stack.toString(), '1,2,3', 'Multiple elements toString');
});

console.log('All Stack tests passed!');