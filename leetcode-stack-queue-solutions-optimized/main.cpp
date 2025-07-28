#include <iostream>
#include <stack>
#include <queue>
#include <vector>
#include <algorithm>
#include "stack.h"
#include "queue.h"


using namespace std;

// Problem 1: Valid Parentheses
bool isValidParentheses(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') || (c == ']' && top != '[') || (c == '}' && top != '{')) {
                return false;
            }
        }
    }
    return st.empty();
}

// Problem 2: Queue using Stacks
class QueueUsingStacks {
private:
    stack<int> s1, s2;
public:
    void enqueue(int x) {
        s1.push(x);
    }
    int dequeue() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        int x = s2.top();
        s2.pop();
        return x;
    }
};

// Problem 3: Largest Rectangle in Histogram (Simplified - O(n^2) solution)
int largestRectangleArea(vector<int>& heights) {
  int maxArea = 0;
  for (int i = 0; i < heights.size(); ++i) {
    int minHeight = heights[i];
    for (int j = i; j < heights.size(); ++j) {
      minHeight = min(minHeight, heights[j]);
      maxArea = max(maxArea, minHeight * (j - i + 1));
    }
  }
  return maxArea;
}



// Problem 4: Reverse a Queue (Illustrative -  can be done using recursion also)
queue<int> reverseQueue(queue<int> q) {
    if (q.empty()) return q;
    int x = q.front();
    q.pop();
    q = reverseQueue(q);
    q.push(x);
    return q;
}


int main() {
    // Test cases (add more in test.cpp)
    cout << "Valid Parentheses: " << isValidParentheses("()[]{}") << endl; //true
    cout << "Valid Parentheses: " << isValidParentheses("([)]") << endl;   //false


    QueueUsingStacks qus;
    qus.enqueue(1);
    qus.enqueue(2);
    qus.enqueue(3);
    cout << "Queue using Stacks: " << qus.dequeue() << endl; //1
    cout << "Queue using Stacks: " << qus.dequeue() << endl; //2


    vector<int> heights = {2,1,5,6,2,3};
    cout << "Largest Rectangle Area: " << largestRectangleArea(heights) << endl;


    queue<int> q;
    q.push(1); q.push(2); q.push(3); q.push(4); q.push(5);
    q = reverseQueue(q);
    cout << "Reversed Queue: ";
    while (!q.empty()){
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;

    return 0;
}