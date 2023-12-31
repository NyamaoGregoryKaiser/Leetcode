```c++
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
    
    public:
    int minSwaps(vector<int> &arr) {
        int n = arr.size();
        vector<pair<int, int>> arrPos(n);
        for (int i = 0; i < n; i++) {
            arrPos[i].first = arr[i];
            arrPos[i].second = i;
        }
    
        sort(arrPos.begin(), arrPos.end());
    
        vector<bool> visited(n, false);
    
        int swaps = 0;
        for (int i = 0; i < n; i++) {
            // If element is already in correct position or visited
            if (visited[i] || arrPos[i].second == i)
                continue;
    
            int cycleSize = 0;
            int j = i;
            while (!visited[j]) {
                visited[j] = true;
    
                // Move to next node
                j = arrPos[j].second;
                cycleSize++;
            }
    
            if (cycleSize > 0) {
                swaps += (cycleSize - 1);
            }
        }
    
        return swaps;
    }
};
```
