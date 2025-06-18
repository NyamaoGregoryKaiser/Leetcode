```typescript
// Helper Data Structures
class Stack<T> {
  private data: T[] = [];

  push(item: T): void { this.data.push(item); }
  pop(): T | undefined { return this.data.pop(); }
  peek(): T | undefined { return this.data[this.data.length - 1]; }
  isEmpty(): boolean { return this.data.length === 0; }
}

class Queue<T> {
  private data: T[] = [];

  enqueue(item: T): void { this.data.push(item); }
  dequeue(): T | undefined { return this.data.shift(); }
  isEmpty(): boolean { return this.data.length === 0; }
}


// Problem 1: Valid Parentheses
export function isValidParentheses(s: string): boolean {
  const stack = new Stack<string>();
  const mapping: { [key: string]: string } = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (mapping[char] && stack.peek() === mapping[char]) {
      stack.pop();
    } else {
      return false; // Invalid
    }
  }
  return stack.isEmpty(); // True if all opening brackets are closed
}


//Problem 2 (Illustrative - needs further implementation): Queue using Stacks
export class QueueUsingStacks<T> {
  private stack1: Stack<T> = new Stack<T>();
  private stack2: Stack<T> = new Stack<T>();

  enqueue(item: T): void {
    this.stack1.push(item);
  }

  dequeue(): T | undefined {
    //Implement the dequeue operation using stack1 and stack2
    if(this.stack2.isEmpty()){
        while(!this.stack1.isEmpty()){
            this.stack2.push(this.stack1.pop()!);
        }
    }
    return this.stack2.pop();
  }
}

// Add other problem solutions here... (Problems 3, 4, 5)

```