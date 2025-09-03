```java
package src;

//Helper functions for creating and printing linked lists

public class LinkedListUtils {

    public static void printList(LinkedList list) {
        Node curr = list.head;
        while (curr != null) {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }

    public static LinkedList createList(int[] arr) {
        LinkedList list = new LinkedList();
        if (arr.length > 0) {
            list.head = new Node(arr[0]);
            Node current = list.head;
            for (int i = 1; i < arr.length; i++) {
                current.next = new Node(arr[i]);
                current = current.next;
            }
        }
        return list;
    }
}
```