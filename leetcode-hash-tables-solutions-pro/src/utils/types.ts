```typescript
// Define a generic type for a Node in a Doubly Linked List
export interface DLNode<T> {
    key: string | number; // Key used for the HashMap lookup
    value: T;             // Actual value stored in the node
    prev: DLNode<T> | null;
    next: DLNode<T> | null;
}
```