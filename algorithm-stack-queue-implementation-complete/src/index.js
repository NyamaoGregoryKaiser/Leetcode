/**
 * Entry point for demonstrating Stack and Queue problems.
 * You can uncomment sections to run examples or perform quick tests.
 */

// Import Data Structures
const Stack = require('./data-structures/Stack');
const Queue = require('./data-structures/Queue');
const { DoublyLinkedList } = require('./utils/DoublyLinkedList');

// Import Problems
const { isValidParentheses } = require('./problems/Problem1_ValidParentheses');
const { MinStackTwoStacks } = require('./problems/Problem2_MinStack');
const MyQueue = require('./problems/Problem3_QueueUsingStacks');
const LRUCache = require('./problems/Problem4_LRUCache');
const MovingAverage = require('./problems/Problem5_MovingAverageFromDataStream');


console.log("--- Stack and Queue Interview Project Demonstrations ---");
console.log("\n------------------------------------");
console.log("1. Stack Data Structure Example");
const myStack = new Stack();
myStack.push(10);
myStack.push(20);
console.log("Stack after pushes:", myStack.toString()); // Expected: 10,20
console.log("Peek:", myStack.peek()); // Expected: 20
console.log("Pop:", myStack.pop());    // Expected: 20
console.log("Stack after pop:", myStack.toString()); // Expected: 10
console.log("Is empty:", myStack.isEmpty()); // Expected: false
myStack.pop();
console.log("Is empty after all pops:", myStack.isEmpty()); // Expected: true

console.log("\n------------------------------------");
console.log("2. Queue Data Structure Example");
const myQueue = new Queue();
myQueue.enqueue('a');
myQueue.enqueue('b');
console.log("Queue after enqueues:", myQueue.toString()); // Expected: a,b
console.log("Peek:", myQueue.peek()); // Expected: a
console.log("Dequeue:", myQueue.dequeue()); // Expected: a
console.log("Queue after dequeue:", myQueue.toString()); // Expected: b
console.log("Is empty:", myQueue.isEmpty()); // Expected: false
myQueue.dequeue();
console.log("Is empty after all dequeues:", myQueue.isEmpty()); // Expected: true

console.log("\n------------------------------------");
console.log("3. Doubly Linked List (for LRU) Example");
const dll = new DoublyLinkedList();
const node1 = { key: 1, value: 'A', prev: null, next: null };
const node2 = { key: 2, value: 'B', prev: null, next: null };
const node3 = { key: 3, value: 'C', prev: null, next: null };

dll.addFront(node1); // List: [1]
dll.addFront(node2); // List: [2, 1]
dll.addFront(node3); // List: [3, 2, 1]
console.log("DLL length after adding 3 nodes:", dll.getLength()); // Expected: 3

// Assuming you can inspect the list by traversing from head
// (In a real scenario, you'd add a method to DLL for this)
let current = dll.head.next;
let listRepresentation = [];
while(current !== dll.tail) {
    listRepresentation.push(current.value);
    current = current.next;
}
console.log("DLL content (MRU to LRU):", listRepresentation.join(' <-> ')); // Expected: C <-> B <-> A

dll.moveToFront(node1); // List: [1, 3, 2]
current = dll.head.next;
listRepresentation = [];
while(current !== dll.tail) {
    listRepresentation.push(current.value);
    current = current.next;
}
console.log("DLL content after moving A to front:", listRepresentation.join(' <-> ')); // Expected: A <-> C <-> B

dll.removeTail(); // Removes node2 ('B')
current = dll.head.next;
listRepresentation = [];
while(current !== dll.tail) {
    listRepresentation.push(current.value);
    current = current.next;
}
console.log("DLL content after removing tail:", listRepresentation.join(' <-> ')); // Expected: A <-> C
console.log("DLL length after removeTail:", dll.getLength()); // Expected: 2


console.log("\n------------------------------------");
console.log("4. Problem 1: Valid Parentheses");
console.log(`"()" is valid: ${isValidParentheses("()")}`);         // true
console.log(`"()[]{}" is valid: ${isValidParentheses("()[]{}")}`); // true
console.log(`"(]" is valid: ${isValidParentheses("(]")}`);         // false
console.log(`"({[()]})" is valid: ${isValidParentheses("({[()]})")}`); // true
console.log(`"[" is valid: ${isValidParentheses("[")}`);             // false
console.log(`"]" is valid: ${isValidParentheses("]")}`);             // false
console.log(`"" is valid: ${isValidParentheses("")}`);               // true
console.log(`"(((" is valid: ${isValidParentheses("(((")}`);         // false

console.log("\n------------------------------------");
console.log("5. Problem 2: Min Stack (Two Stacks approach)");
const minStack = new MinStackTwoStacks();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log("Top:", minStack.top());     // Expected: -3
console.log("Min:", minStack.getMin()); // Expected: -3
minStack.pop();
console.log("After pop, Top:", minStack.top());     // Expected: 0
console.log("After pop, Min:", minStack.getMin()); // Expected: -2
minStack.pop();
console.log("After second pop, Top:", minStack.top());     // Expected: -2
console.log("After second pop, Min:", minStack.getMin()); // Expected: -2


console.log("\n------------------------------------");
console.log("6. Problem 3: Queue Using Stacks");
const queueUsingStacks = new MyQueue();
queueUsingStacks.push(1);
queueUsingStacks.push(2);
console.log("Queue (using stacks) peek:", queueUsingStacks.peek()); // Expected: 1
console.log("Queue (using stacks) pop:", queueUsingStacks.pop());   // Expected: 1
console.log("Queue (using stacks) peek again:", queueUsingStacks.peek()); // Expected: 2
queueUsingStacks.push(3);
console.log("Queue (using stacks) pop:", queueUsingStacks.pop());   // Expected: 2
console.log("Queue (using stacks) empty:", queueUsingStacks.empty()); // Expected: false
console.log("Queue (using stacks) pop:", queueUsingStacks.pop());   // Expected: 3
console.log("Queue (using stacks) empty:", queueUsingStacks.empty()); // Expected: true
console.log("Queue (using stacks) peek (empty):", queueUsingStacks.peek()); // Expected: undefined

console.log("\n------------------------------------");
console.log("7. Problem 4: LRU Cache");
const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache: {1=1}
lRUCache.put(2, 2); // cache: {1=1, 2=2}
console.log("LRU get(1):", lRUCache.get(1));    // returns 1 (MRU: 1) // cache: {2=2, 1=1}
lRUCache.put(3, 3); // LRU key 2 is evicted // cache: {1=1, 3=3}
console.log("LRU get(2):", lRUCache.get(2));    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key 1 is evicted // cache: {3=3, 4=4}
console.log("LRU get(1):", lRUCache.get(1));    // returns -1 (not found)
console.log("LRU get(3):", lRUCache.get(3));    // returns 3 (MRU: 3) // cache: {4=4, 3=3}
console.log("LRU get(4):", lRUCache.get(4));    // returns 4 (MRU: 4) // cache: {3=3, 4=4}

console.log("\n------------------------------------");
console.log("8. Problem 5: Moving Average from Data Stream");
const mAvg = new MovingAverage(3);
console.log("MA next(1):", mAvg.next(1));  // 1.0
console.log("MA next(10):", mAvg.next(10)); // 5.5
console.log("MA next(3):", mAvg.next(3));  // 4.666...
console.log("MA next(5):", mAvg.next(5));  // 6.0
console.log("MA next(6):", mAvg.next(6));  // (3+5+6)/3 = 4.666...
console.log("MA next(0):", mAvg.next(0));  // (5+6+0)/3 = 3.666...

console.log("\n------------------------------------");
console.log("Demonstrations complete. Run `npm test` for full test suite.");
console.log("And `npm run benchmark` for performance tests.");