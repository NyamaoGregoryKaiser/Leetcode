```python
class HashTable:
    def __init__(self, capacity=11):  # Prime number for better distribution
        self.capacity = capacity
        self.table = [None] * capacity
        self.size = 0

    def __len__(self):
        return self.size

    def __contains__(self, key):
        index = self._hash(key) % self.capacity
        if self.table[index] is not None:
            for k, _ in self.table[index]:
                if k == key:
                    return True
        return False

    def _hash(self, key):
        return hash(key)

    def insert(self, key, value):
        index = self._hash(key) % self.capacity
        if self.table[index] is None:
            self.table[index] = [(key, value)]
        else:
            self.table[index].append((key, value))
        self.size += 1

    def get(self, key):
        index = self._hash(key) % self.capacity
        if self.table[index] is not None:
            for k, v in self.table[index]:
                if k == key:
                    return v
        return None

    def delete(self, key):
        index = self._hash(key) % self.capacity
        if self.table[index] is not None:
            original_size = len(self.table[index])
            self.table[index] = [(k, v) for k, v in self.table[index] if k != key]
            if len(self.table[index]) < original_size:
                self.size -= 1

```