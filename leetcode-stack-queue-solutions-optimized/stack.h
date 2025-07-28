#ifndef STACK_H
#define STACK_H

#include <vector>

template <typename T>
class Stack {
private:
    std::vector<T> data;
public:
    void push(const T& item) { data.push_back(item); }
    void pop() { if (!empty()) data.pop_back(); }
    T top() const { return data.back(); }
    bool empty() const { return data.empty(); }
    size_t size() const { return data.size(); }
};

#endif