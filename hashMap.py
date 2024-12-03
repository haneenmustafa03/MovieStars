class HashMap:
    def __init__(self):
        self.hashmap = {} #initialize empty dictionary for key-value pairs
    def insert(self, key, value):
        self.hashmap[key] = value #insert key-value pair into dictionary
    def get(self, key):
        return self.hashmap.get(key, None) #return value associated with key
    def delete(self, key):
        if key in self.hashmap:
            del self.hashmap[key] #delete key-value pair
    def items(self):
        return self.hashmap.items() #return all key-value pairs