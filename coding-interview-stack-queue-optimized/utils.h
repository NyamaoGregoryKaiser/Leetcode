#ifndef UTILS_H
#define UTILS_H

#include <vector>
#include <queue>
#include <stack>

// Add any helper functions or custom data structures here.  For example:

template <typename T>
void printQueue(const queue<T>& q) {
    queue<T> temp = q;
    cout << "[";
    while (!temp.empty()) {
        cout << temp.front() << (temp.size() > 1 ? ", " : "");
        temp.pop();
    }
    cout << "]" << endl;
}


#endif