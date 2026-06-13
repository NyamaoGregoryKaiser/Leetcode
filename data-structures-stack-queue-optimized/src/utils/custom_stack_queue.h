```cpp
#ifndef CUSTOM_STACK_QUEUE_H
#define CUSTOM_STACK_QUEUE_H

#include <stdexcept> // For std::overflow_error, std::underflow_error
#include <string>    // For error messages

// --- Custom Stack Implementation (using Linked List) ---
template <typename T>
class CustomStack {
private:
    struct Node {
        T data;
        Node* next;
        Node(T val) : data(val), next(nullptr) {}
    };

    Node* top_node;
    size_t current_size;
    size_t capacity; // Optional: for bounded stack

public:
    // Constructors
    CustomStack(size_t max_capacity = 0) : top_node(nullptr), current_size(0), capacity(max_capacity) {}

    // Destructor
    ~CustomStack() {
        while (!isEmpty()) {
            pop();
        }
    }

    // Copy Constructor
    CustomStack(const CustomStack& other) : top_node(nullptr), current_size(0), capacity(other.capacity) {
        if (!other.isEmpty()) {
            // Push elements in reverse order to maintain original stack order
            // This requires a temporary stack or recursive copy
            Node* temp_top = nullptr;
            Node* current_other = other.top_node;
            while(current_other) {
                Node* new_node = new Node(current_other->data);
                new_node->next = temp_top;
                temp_top = new_node;
                current_other = current_other->next;
            }

            // Now push from temp_top to build the current stack
            while(temp_top) {
                push(temp_top->data);
                Node* to_delete = temp_top;
                temp_top = temp_top->next;
                delete to_delete;
            }
        }
    }

    // Assignment Operator
    CustomStack& operator=(const CustomStack& other) {
        if (this == &other) {
            return *this; // Handle self-assignment
        }

        // Clear current stack
        while (!isEmpty()) {
            pop();
        }

        // Copy elements from other
        capacity = other.capacity;
        if (!other.isEmpty()) {
            Node* temp_top = nullptr;
            Node* current_other = other.top_node;
            while(current_other) {
                Node* new_node = new Node(current_other->data);
                new_node->next = temp_top;
                temp_top = new_node;
                current_other = current_other->next;
            }

            while(temp_top) {
                push(temp_top->data);
                Node* to_delete = temp_top;
                temp_top = temp_top->next;
                delete to_delete;
            }
        }
        return *this;
    }


    // Push element onto the stack
    void push(T val) {
        if (capacity > 0 && current_size >= capacity) {
            throw std::overflow_error("Stack overflow: Cannot push, stack is full.");
        }
        Node* new_node = new Node(val);
        new_node->next = top_node;
        top_node = new_node;
        current_size++;
    }

    // Pop element from the stack
    T pop() {
        if (isEmpty()) {
            throw std::underflow_error("Stack underflow: Cannot pop from an empty stack.");
        }
        Node* temp = top_node;
        T val = temp->data;
        top_node = top_node->next;
        delete temp;
        current_size--;
        return val;
    }

    // Get the top element without removing it
    T& top() {
        if (isEmpty()) {
            throw std::underflow_error("Stack is empty: No top element.");
        }
        return top_node->data;
    }

    const T& top() const {
        if (isEmpty()) {
            throw std::underflow_error("Stack is empty: No top element.");
        }
        return top_node->data;
    }

    // Check if the stack is empty
    bool isEmpty() const {
        return top_node == nullptr;
    }

    // Get current size of the stack
    size_t size() const {
        return current_size;
    }

    // Check if stack is full (if capacity is set)
    bool isFull() const {
        return capacity > 0 && current_size >= capacity;
    }
};


// --- Custom Queue Implementation (using Linked List) ---
template <typename T>
class CustomQueue {
private:
    struct Node {
        T data;
        Node* next;
        Node(T val) : data(val), next(nullptr) {}
    };

    Node* front_node;
    Node* rear_node;
    size_t current_size;
    size_t capacity; // Optional: for bounded queue

public:
    // Constructors
    CustomQueue(size_t max_capacity = 0) : front_node(nullptr), rear_node(nullptr), current_size(0), capacity(max_capacity) {}

    // Destructor
    ~CustomQueue() {
        while (!isEmpty()) {
            dequeue();
        }
    }

    // Copy Constructor
    CustomQueue(const CustomQueue& other) : front_node(nullptr), rear_node(nullptr), current_size(0), capacity(other.capacity) {
        if (!other.isEmpty()) {
            Node* current_other = other.front_node;
            while (current_other) {
                enqueue(current_other->data);
                current_other = current_other->next;
            }
        }
    }

    // Assignment Operator
    CustomQueue& operator=(const CustomQueue& other) {
        if (this == &other) {
            return *this; // Handle self-assignment
        }

        // Clear current queue
        while (!isEmpty()) {
            dequeue();
        }

        // Copy elements from other
        capacity = other.capacity;
        if (!other.isEmpty()) {
            Node* current_other = other.front_node;
            while (current_other) {
                enqueue(current_other->data);
                current_other = current_other->next;
            }
        }
        return *this;
    }

    // Add element to the rear of the queue
    void enqueue(T val) {
        if (capacity > 0 && current_size >= capacity) {
            throw std::overflow_error("Queue overflow: Cannot enqueue, queue is full.");
        }
        Node* new_node = new Node(val);
        if (isEmpty()) {
            front_node = new_node;
            rear_node = new_node;
        } else {
            rear_node->next = new_node;
            rear_node = new_node;
        }
        current_size++;
    }

    // Remove element from the front of the queue
    T dequeue() {
        if (isEmpty()) {
            throw std::underflow_error("Queue underflow: Cannot dequeue from an empty queue.");
        }
        Node* temp = front_node;
        T val = temp->data;
        front_node = front_node->next;
        if (front_node == nullptr) { // Queue became empty
            rear_node = nullptr;
        }
        delete temp;
        current_size--;
        return val;
    }

    // Get the front element without removing it
    T& front() {
        if (isEmpty()) {
            throw std::underflow_error("Queue is empty: No front element.");
        }
        return front_node->data;
    }

    const T& front() const {
        if (isEmpty()) {
            throw std::underflow_error("Queue is empty: No front element.");
        }
        return front_node->data;
    }

    // Check if the queue is empty
    bool isEmpty() const {
        return front_node == nullptr;
    }

    // Get current size of the queue
    size_t size() const {
        return current_size;
    }

    // Check if queue is full (if capacity is set)
    bool isFull() const {
        return capacity > 0 && current_size >= capacity;
    }
};

#endif // CUSTOM_STACK_QUEUE_H
```