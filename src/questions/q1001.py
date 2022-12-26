from test_framework import generic_test


def q1001(n: int) -> int:
    # TODO - you fill in here.
    if (n<=1):
        return n
    return q1001(n-1) + q1001(n-2)
    return -1


if __name__ == "__main__":
    exit(generic_test.generic_test_main("q1001.py", "q1001.tsv", q1001))