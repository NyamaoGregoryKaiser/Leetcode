from xmlrpc.server import SimpleXMLRPCServer

def increment_integer(value):
    return value + 1

def square_and_add(float_val, int_val):
    return (float_val ** 2) + int_val

def reverse_string(s):
    return s[::-1]

def main():
    server = SimpleXMLRPCServer(("localhost", 8000))
    print("Listening on port 8000...")
    server.register_function(increment_integer, "increment")
    server.register_function(square_and_add, "square_add")
    server.register_function(reverse_string, "reverse")
    
    server.serve_forever()

if __name__ == "__main__":
    main()
