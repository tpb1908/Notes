# Haskell notes

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

**Notes from [learnyouahaskell](learnyouahaskell.com)**
# Haskell

## Purely functional languages

In a purely functional language, functions can have no side effects.

This means that if a function is called twice with the same parameters, it is guaranteed to return the same result. This is called referential transparency and allows the compiler to reason about program behaviour, as well as proof that a function is correct.

## Lazy evaluation

Functions will not be called and calculations will not be performed until a result is required.
Programs can be thought of as a series of transformations on data.
This allows structures such as infinite lists, which are only evaluated when required.

**Example:** $$\text{List of } \mathbb{N}$$

An infinite list of natural numbers can be generated as follows

```haskell
> let naturals = 1 : map (+1) naturals
```

When we want to use these values we can write 

```haskell
> take 10 naturals
> [1,2,3,4,5,6,7,8,9,10]
```

We could more succintly use the notation for a range

```haskell
> let naturals = [1..]
```

This gives the same infinite range as before.

## Static typing

Haskell is a statically typed language, meaning that when it is compiled the compiler knows the type of every value.

## Type inference

Haskell, along with many other languages, use a system of type inference.

This means that when writing `a = 2 + 3` it is not necessary to inform the compiler that `a` is a numeric value.

If a function takes two parameters and adds them together, their types do not need to be stated explicitly. The function will can be executed with any two parameters that act like numbers.

# Basic syntax

## Examples: Arithmetic

```haskell
> 3 + 16
> 19
> 27 * 53
> 1431
> 1314 - 133 
> 1181
> 7 / 2
> 3.5
```

When multiple operators are used on the same line, operator precedence and parentheses are respected.

**Negation**

When value are negated, they must be surrounded by parentheses.

```haskell
> 5 * -3
```

The expression above will give a `Precedence parsing error`.

Instead `5 * (-3)` should be written

## Examples: Boolean algebra

| Operator | Symbol | 
| -------- | -------- | 
| And     | &&     | 
| Or | \|\| |
| Not | not |
| Equality | == |
| Inequality | /= |

```haskell
> True && False
> False
> True && not False
> True
> False || True
> True
> not (True && True)
> False
> True == False
> False
> 5 == 5
> True
> 1 == 0
> False
> 5 /= 5
> False
> 5 /= 4
> "string" == "string"
> True
```


## Functions

All of the operations performed so far have been functions, specifically **infix** functions.

Functions are usually **prefix** functions, which take their arguments after the function name. Infix functions are different in that the arguments surround the function name.

**Example:** The successor function

```haskell
> succ 9
> 10
```
The successor function takes anything which has a defined successor, and returns that successor.

The min and max functions both take two parameters

```haskell
> min 10 11
> 10
> max 100 1000
> 1000
> min 1.5 1.4
> 1.4
```

Function application as seen above has the highest precedence

This means that the following statements are equivelant

```haskell
> succ 9 + max 5 4 + 1
```

```haskell
> (succ 9) + (max 5 4) + 1
```

Suppose we want the successor to the product of two numbers, `a`, and `b`. As `succ` has the highest precedence writing `succ a * b` would first evaluate `succ a` and then evaluate its product with `b`.
Instead we must right `succ (a * b)`.

### Writing functions as infix

If a function takes two parameters, it can be called as an infix function by surrounding it with backticks.
`div` takes two integers and performs integral division.

```haskell
> 92 `div` 9
> 10
```

### Function call syntax

Many other languages require parentheses to denote function application.

In Haskell, spaces are used instead.

### Function definition

```haskell
doubleValue x = x + x
```

The function above consists of a funciton name, followed by parameters separated by spaces. After the `=` the function body is defined.

This function will work on any numeric type.

```haskell
> doubleValue 2
> 4
> doubleValue 2.5
> 5
```

```haskell
doubleSum x y = x * 2 + y * 2
```

This function takes two numeric parameters, doubles each of them, and returns the sum of the two doubled values.

```haskell
> doubleSum 2 3
> 10
> doubleSum 5.5 7
> 25.0
```

The function can take two numeric types, one of which is floating point and the other an integer. This will result in the integer type being converted to a floating point value.

The function could also be defined in terms of the first function, `doubleValue`.

```haskell
doubleSum x y = doubleValue x + doubleValue y
```

Function definitions do not have to be in any particular order, `doubleSum` could be defined before `doubleValue`.

### Conditional expressions

```haskell
doubleSmallNumber x = if x > 100
                      then x
                      else x * 2
```

The function `doubleSmallNumber` doubles the parameter `x` if `x<=100`, otherwise it returns the original value of `x`.

An if statement in Haskell is an expression, a piece of code which returns a value. Because the else is mandatory, an if statement will always return some value.

If we wanted to add one to the return value in `doubleSmallNumber` we could write 

```haskell
doubleSmallNumber' x = (if x > 100 then x else x * 2) + 1
```

### Function naming

The function above `doubleSmallNumber'` has a `'` character as its last character. This is a valid character in Haskell function names and is often used to denote a stricter, non-lazy version of a function, or a slightly modified version.

Haskell functions cannot begin with uppercase characters. 

When a function does not take any parameters, it is called a **definition** or a **name**.

## Lists

Lists are defined as comma separated lists of values within a set of square brackets `[]`.

A string is just syntax for a list of characters.
As strings are backed by lists of characters, we can apply list functions to them.

### String and list concatenation

Strings are concatenatd with the `++` operator.

```haskell
> "hello" ++ " " ++ "world"
> "hello world"
```

This operator is used more widely for list concatenation.

```haskell
> [1,2,3] ++ [4,5,6]
> [1,2,3,4,5,6]
```

When two lists are added together, even when a singleton is added to the end of a list, Haskell has to walk through the whole list on the left side of the `++` operator which can be slow when dealing with large lists.

Prepending to a list is effectively instantaneous.

It is done with the `:` operator.

```haskell
> 'A' : "BC"
> "ABC"
> 5 : [4,3,2,1]
> [5,4,3,2,1]
```

Note that `++` takes two lists. This means that any singleton value being appended to a list must be a list containing one item, such as `[5]`, rather than just `5`.

A list definition such as `[1,2,3]` is actually just syntactic sugar for `1:2:3:[]`, where `[]` is an empty list.

### List indexing

As with any sensible language, Haskell lists are indexed from 0.

The `!!` operator is used to read an element from a list at a given index.

```haskell
> [1,2,3,4,5] !! 2
> 3
> "hello" !! 1
> 'e'
```

Attempting to access an index which does not exist will raise an error.

### Nested lists

Lists can be infinitely nested within memory constraints.

```haskell
> let b = [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
> b
> [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
> b ++ [[1,1,1,1]]
> [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3],[1,1,1,1]]
> [6,6,6]:b
> [[6,6,6],[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
> b !! 2
> [1,2,2,3,4] 
```

The nested lists can be of different dimensions, but they must be of the same type.

### List comparisons

Lists can be compared if there is a method for comparing their contents.
When using `<, <=, >, >=` to compare lists, their elements are compared in lexographical order. First the head elements are compared, if they are equal the next elements are compared and so forth, until two elements are not equal, or one of the lists ends.

```haskell
> [3,4,2] == [3,4,2]
> True
> [3,2,1] > [2,10,100]
> True
> [3,4,2] > [3,4]
> True
```

### List operations

**head** takes a list as a parameter and returns its head, the first element
```haskell
> head [10,9,8]
> 10
```

**tail** takes a list as a parameter and returns its tail, the elements past the first
```haskell
> tail [10,9,8]
> [9,8]
```

**last** takes a list as a parameter and returns its last element
```haskell
> last [10,9,8]
> 8
```

**init** takes a list as a parameter and returns the elements before the last
```haskell
> init [10,9,8]
> [10,9]
```

The functions above will raise an exception if applied to an empty list.

**length** takes a list as a parameter and returns its length, the number of elements

```haskell
> length [1,2,3,4,5]
> 5
```

**null** takes a list as a parameter and returns `True` if the list is empty, and `False` otherwise

```haskell
> null []
> True
> null [1,2,3]
> False
```

**reverse** takes a list as a parameter returns the reversed list

```haskell
> reverse [5,4,3,2,1]
> [1,2,3,4,5]
```

**take** takes an integer and a list as parameters and extracts that many elements from the list, returning them

If we try to take more elements than there are in the list, it just returns the list without raising an exception.

```haskell
> take 3 [5,4,3,2,1]
> [5,4,3]
> take 1 [3,9,3]
> [3]
> take 5 [1,2]
> [1,2]
> take 0 [6,5,4]
> []
```

**drop** takes an integer and list as parameters, and drops that many elements from the start of the list

```haskell
> drop 3 [8,4,2,1,5,6]
> [1,5,6]
> drop 0 [4,3,2,1]
> [4,3,2,1]
> drop 100 [1,2,3,4]
> []
```

**maximum** takes an orderable list as a parameter and returns the largest element

**minimum** takes an orderable list as a parameter and returns the smallest element

```haskell
> minimum [8,4,2,1,5,6]
> 1
> maximum [1,9,2,3,4]
> 9
```

**sum** takes a list of numbers as a parameter and returns their sum 

```haskell
> sum [1,2,3,4,5]
> 15
```

**product** takes a list of numbers as a parameter and returns their product
```haskell
> product [1,2,3,4]
> 24
```

**elem** takes an instance of type `T` and a list of type `T` as parameters and returns true if the instance is contained within the list

`elem` is usually called as an infix function because it is easier to read.

```haskell
> 4 `elem` [3,4,5,6]
> True
> 10 `elem` [1,2,3]
> False
```
### Ranges

Ranges are a method for making lists that are arithmetic sequences of elements that can be enumerated, such as numbers and characters.

```haskell
> [1..20]
> [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
> ['a'..'z']
> ['a','b','c','d','e','g','h','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
```

The step for a range can also be specified.

```haskell
> [2,4..20]
> [2,4,6,8,10,12,14,16,18,20]
```

To make a list of numbers in descending order from `m` to `n` you have to write

```haskell
> [m,m-1..n]
```

### Production of infinite lists

Infinite lists can be produced by neglecting to specify an upper bound for a range.

**cycle** takes a list as a parameter and cycles it into an infinite list.

```haskell
> take 10 (cycle [3,2,1])
> [3,2,1,3,2,1,3,2,1,3]
```

**repeat** takes an element as a parameter and produces an infinite list of just that element

```haskell
> take 10 (repeat 6)
> [6,6,6,6,6,6,6,6,6,6]
```

If you want some number of the same element in a list it is simpler to use `replicate`

**replicate** takes a number and an element a returns a list containing that many of the element

```haskell
> replicate 5 6
> [5,5,5,5,5,5]
```

### List comprehension

Set comprehensions are often used for building specific sets from general sets.

$$S = \left\{2 \times x  \mid x \in \mathbb{N},\ x \leq 10 \right\}$$

The part before the pipe is called the output function, $$x$$ is the variable, $$\mathbb{N}$$ is the input set and $$x \leq 10$$ is the the predicate.

The set $$S$$ contains the doubles of all the values that satisfy the predicate.

In Haskell we could write `take 10 [2,4,..]` but this wouold produce doubles of the first 10 natural numbers.

A list comprehension should be used instead.

```haskell
> [x*2 | x <- [1..10]]
> [2,4,6,8,10,12,14,16,18,20]
```

We can also add a preciate to the comprehension

```haskell
> [x*2 | x <- [1..10], x*2 >= 12]
> [12,14,16,18,20]
```

Suppose we want to all the numbers from 50 to 100 whose remainder when divided by the number 7 is 3.

```haskell
> [x | x <- [50,100], x `mod` 7 ==3]
> [52,59,66,73,80,87,94]
```

This process is called filtering. We took a list and filtered it by the predicate.

Now suppose we want to replace each odd number greater than 10 the string `"BANG!"` and  each odd number less than 10 with `"BOOM!"`. If a number isn't odd, we throw it out of our list. For convenience we can place out comprehension inside a function so that we can reuse it.

```haskell
> let boomBang xs = [if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]
> boomBang [7..13]
> ["BOOM!", "BOOM!", "BANG!", "BANG!"]
```

We can include several predicates.
A comprehension for numbers from 10 to 20 that are not 13, 15, or 19 can be written as.

```haskell
> [x | x <- [10..20], x /= 13, x /= 15, x /= 19]
> [10,11,12,14,16,17,18,20]
```

Not only can we have multiple predicates in list comprehensions, we can also draw from multiple lists.
A list produced by a comprehension that draws from two lists of lengths `n` and `m` respectively will have a length of `n*m`.

If we have two lists, `[2,5,10]` and `[8,10,11]` and we wish to find the products of all the possible combinations between numbers in those lists, we can write

```haskell
> [x*y | x <- [2,5,10], y <- [8,10,10]]
> [16,20,22,40,50,55,80,100,110]
```

Now suppose that we want all possible products which are greater than 50

```haskell
> [x*y | x <- [2,5,10], y <- [8,10,10], x * y > 50]
> [55,80,100,110]
```



```haskell
> let nouns = ["hobo","frog","pope"]  
> let adjectives = ["lazy","grouchy","scheming"]  
> [adjective ++ " " ++ noun | adjective <- adjectives, noun <- nouns]  
> ["lazy hobo","lazy frog","lazy pope","grouchy hobo","grouchy frog",  
"grouchy pope","scheming hobo","scheming frog","scheming pope"]   
```

We could use list comprehension to write a bad version of the length function.

```haskell
> length` xs = sum [1 | _ <- xs]
```

This function replaces every element of the list with `1`s and finds their sum.
The underscore character, `_`, is used to denote a variable which is not used.

#### Nested list comprehensions

```haskell
> let xxs = [[1,3,5,2,3,1,2,4,5],[1,2,3,4,5,6,7,8,9].[1,2,4,2,1,6,3,1,3,2,3,6]]
> [[x | x <- xs, even x] | xs <- xxs]
> [[2,2,4],[2,4,6,8], [2,4,2,6,2,6]]
```

The comprehension shown above applies a comprehension to each of the lists, within the outer list, filtering them to only even values.

## Tuples

Tuples are similar to lists, providing a way to store several values in a single value.
Tuples are used when the number of values you want to combine is known, and its type depends on how many components it has along with the type of the componenets.
They are denoted with parantheses around a comma separated list of values.

Unlike lists, tuples do not have to be homogenous, meaning that they can contain several types.

```haskell
> --List of tuples of the same type
> [(1,2),(3,4),(5,6)]
> --List of tuples of varying types -> Error
> [(1,2),(3,"4"),('5',6)]
```

Tuples can contain lists.

Tuples are much more rigid. A general function cannot be written to append an element to a tuple.

There is no singleton tuple. This is because a singleton tuple would just be the value it contains and therefore provide no use.

### Tuple operations

**fst** takes a pair and returns its first component

```haskell
> fst (8,11)
> 8
```

**snd** takes a pair and returns its second component

These functions only work on pairs. They will not work on triples, 4-tuples, 5-tuples etc.

**zip** takes two lists and produces a list of pairs 

```haskell
> zip [1,2,3,4,5] [5,4,3,2,1]
> [(1,5),(2,4),(3,3),(4,2),(5,1)]
> zip [1..5] ["five", "four", "three", "two", "one"]
> [(1, "five"), (2, "four"), (3, "three"), (4, "two"), (5, "one")]
```

If the lengths of the lists do not match the longer list is cut off and ignored past the length of the shorter list.

We can apply `zip` to pairings of finite and infinite lists, or two infinite lists

```haskell
> take 10 (zip [1..] [1,0..])
> [(1,1),(2,0),(3,-1),(4,-2),(5,-3),(6,-4),(7,-5),(8,-6),(9,-7),(10,-8)]
```

## Types and typeclasses
