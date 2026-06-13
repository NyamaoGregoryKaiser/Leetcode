const assert = require('assert');
const MovingAverage = require('../src/problems/Problem5_MovingAverageFromDataStream');

console.log('--- Running Moving Average from Data Stream Tests ---');

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

runTest('MovingAverage: Basic operations with window size 3', () => {
    const m = new MovingAverage(3);
    assert.strictEqual(m.next(1), 1.0, 'First element average should be 1.0'); // (1)/1
    assert.strictEqual(m.next(10), 5.5, 'Second element average should be 5.5'); // (1+10)/2
    assert.strictEqual(m.next(3), 4.666666666666667, 'Third element average should be 4.666...'); // (1+10+3)/3
    assert.strictEqual(m.next(5), 6.0, 'Fourth element (window full) average should be 6.0'); // (10+3+5)/3
    assert.strictEqual(m.next(6), 4.666666666666667, 'Fifth element average should be 4.666...'); // (3+5+6)/3
    assert.strictEqual(m.next(0), 3.6666666666666665, 'Sixth element average should be 3.666...'); // (5+6+0)/3
});

runTest('MovingAverage: Window size 1', () => {
    const m = new MovingAverage(1);
    assert.strictEqual(m.next(10), 10.0, 'First element average should be 10.0');
    assert.strictEqual(m.next(20), 20.0, 'Second element average should be 20.0');
    assert.strictEqual(m.next(5), 5.0, 'Third element average should be 5.0');
});

runTest('MovingAverage: Window size 5 with fewer elements', () => {
    const m = new MovingAverage(5);
    assert.strictEqual(m.next(1), 1.0);
    assert.strictEqual(m.next(2), 1.5);
    assert.strictEqual(m.next(3), 2.0);
    assert.strictEqual(m.next(4), 2.5);
});

runTest('MovingAverage: All elements are zero', () => {
    const m = new MovingAverage(2);
    assert.strictEqual(m.next(0), 0.0);
    assert.strictEqual(m.next(0), 0.0);
    assert.strictEqual(m.next(0), 0.0);
});

runTest('MovingAverage: Negative numbers', () => {
    const m = new MovingAverage(2);
    assert.strictEqual(m.next(-1), -1.0);
    assert.strictEqual(m.next(-5), -3.0);
    assert.strictEqual(m.next(10), 2.5);
});

runTest('MovingAverage: Edge case - capacity zero or negative throws error', () => {
    assert.throws(() => new MovingAverage(0), Error, 'Capacity 0 should throw error');
    assert.throws(() => new MovingAverage(-1), Error, 'Capacity -1 should throw error');
});

console.log('All Moving Average from Data Stream tests passed!');