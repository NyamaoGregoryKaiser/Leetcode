#ifndef QUEUE_H
#define QUEUE_H

#include <vector>

template <typename T>
class Queue {
private:
    std::vector<T> data;
public:
    void enqueue(const T& item) { data.push_back(item); }
    void dequeue() { if (!empty()) data.erase(data.begin()); }
    T front() const { return data.front(); }
    bool empty() const { return data.empty(); }
    size_t size() const { return data.size(); }
};

#endif