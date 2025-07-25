```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  // ... (push, pop, peek, isEmpty methods) ...
}

class Queue {
  constructor() {
    this.items = [];
  }
  // ... (enqueue, dequeue, peek, isEmpty methods) ...
}


// 1. Valid Parentheses
function isValidParentheses(s) {
  const stack = new Stack();
  const mapping = { ')': '(', '}': '{', ']': '[' };

  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (mapping[char] && stack.peek() === mapping[char]) {
      stack.pop();
    } else {
      return false;
    }
  }
  return stack.isEmpty();
}

//2. Queue using Stacks (Implementation omitted for brevity)

//3. Largest Rectangle in Histogram (Implementation omitted for brevity)

//4. LRU Cache (Implementation omitted for brevity)

//5. Rotten Oranges (Implementation omitted for brevity)


module.exports = {
  isValidParentheses,
  // ...export other functions...
};
```