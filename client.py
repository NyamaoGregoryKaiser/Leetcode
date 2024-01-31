import xmlrpc.client

def main():
    proxy = xmlrpc.client.ServerProxy("http://localhost:8000/")
    # Increment integer
    inc_result = proxy.increment(10)
    print(f"Incremented result: {inc_result}")

    # Square float and add integer
    square_add_result = proxy.square_add(5.4, 6)
    print(f"Square and add integer result: {square_add_result}")

    # Reverse string
    reverse_result = proxy.reverse("Gregory")
    print(f"Reversed string: {reverse_result}")

if __name__ == "__main__":
    main()
