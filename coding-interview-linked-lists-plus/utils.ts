```typescript
import { LinkedList, Node } from "./linkedList";

export function createLinkedListFromArray<T>(arr: T[]): LinkedList<T> {
    const list = new LinkedList<T>();
    for (const item of arr) {
        list.append(item);
    }
    return list;
}

//Add other helper functions as needed (e.g., printing the linked list)
```