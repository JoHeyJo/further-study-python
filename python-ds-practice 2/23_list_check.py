def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """

    # for l in lst:
    #     if not isinstance(l, list): 
    #         return False
    # return True

    return all((isinstance(l, list) for l in lst))
    