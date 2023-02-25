def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of items.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """

    # map num -> occurrences. Iterate through map checking for largest number 

    # counter = {}
    # for num in nums:
    #     counter[num] = counter.get(num,0) + 1
    # max_num = 0
    # num = 0
    # for (key,val) in counter.items():
    #     if(max_num < val):
    #         max_num = val
    #         num = key
    # return num
    
    # find max num, then map nums -> occurrences. Use max_num to find matching val => key
    max_num =max(nums)
    counter = {}
    for num in nums:
        counter[num] = counter.get(num,0) +1

    for (key,val) in counter.items():
        if(val == max_num):
            return key