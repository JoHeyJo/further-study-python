import random


class WordFinder:
    """Word Finder: finds random words from a dictionary.

    >>> path = WordFinder('/Users/share/dict/words.txt')
    """

    def __init__(self, path):
        """Read link from path & report # of items read"""
        file = open(path)

        self.words = self.parse(file)

        print(f"{len(self.words)} words read")

    def __repr__(self):
            # rather than having this hard-code WordFinder (which would mean
            # we'd need to subclass this in children to make sure they report
            # the correct class name, we can ask the instance for the name
            # of it's class, like so:
        return f"<{self.__class__.__name__} len(words)={len(self.words)}>"

    def parse(self, file):
        """Parse file -> list of words."""

        # `.strip()` removes all whitespace characters at the start
        # and end of a line. This will remove the "newline" (\n) character
        # that appear at the end of Unix text files, as well as the
        # "carriage-return-then-newline" (\r\n) characters that appear at the
        # end of DOS/Windows text files. It is always safer to use .strip
        # rather than just removing "\n", as that won't do the right things
        # on files created by Windows users.
        return [line.strip() for line in file]

    def random(self):
        """Return random word."""

        return random.choice(self.words)


class SpecialWordFinder(self):
    """Specialized WordFinder that excludes blank lines/comments.

    >>> swf = SpecialWordFinder("complex.txt")
    3 words read

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True
    """

    def parse(self, file):
        """Parse file -> list of words, skipping blanks/comments."""

        # We could use `.strip` here and not use super() --- but it's better
        # design to trust your parent class to know exactly what it should do,
        # rather than just doing the same thing here. So we'll get the
        # stripped words from the parent, then filter out the words we don't
        # want.
        return [word for word in super().parse(file)
                if word != "" and not word.startswith("#")]