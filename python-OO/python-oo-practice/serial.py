class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        """Generate next from start"""
        self.start = self.next = self.start
    
    def __repr__(self):
        return f"<SerialGenerate start={self.start} next={self.next}>"

    def generate(self):
        """Increments serial next by 1"""
        self.next += 1
        return self.next - 1

    def reset(self):
        """Resets next to start"""
        self.next = self.start
