```java
package com.example;

import java.util.Random;

public class Utils {
    public static int[] generateSortedArray(int size, int maxVal) {
        Random random = new Random();
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(maxVal + 1);
        }
        Arrays.sort(arr);
        return arr;
    }
}
```