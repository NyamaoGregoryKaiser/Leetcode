```java
import org.junit.Test;
import src.*;
import static org.junit.Assert.*;

public class LinkedListTest {

    @Test
    public void testReverseList() {
        LinkedList list = LinkedListUtils.createList(new int[]{1, 2, 3, 4, 5});
        LinkedList reversedList = new LinkedList();
        reversedList.head = new LinkedList().reverseList(list.head);
        assertArrayEquals(new int[]{5, 4, 3, 2, 1}, listToArray(reversedList));
    }


    // ... (More test cases for all functions) ...

    private int[] listToArray(LinkedList list) {
      int[] arr = new int[listLength(list)];
      int i = 0;
      Node curr = list.head;
      while (curr != null) {
        arr[i++] = curr.data;
        curr = curr.next;
      }
      return arr;
    }

    private int listLength(LinkedList list){
        int len = 0;
        Node curr = list.head;
        while(curr!=null){
            len++;
            curr = curr.next;
        }
        return len;
    }


}
```