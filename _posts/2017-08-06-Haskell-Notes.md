---
layout: post
tags: [Notes, Haskell, Functional]
---


This is a collection of notes on Haskell, primarily condensed from [learnyouahaskell](http://learnyouahaskell.com)

<snippet></snippet>

### Purely functional languages

In a purely functional language, functions can have no side effects.

This means that if a function is called twice with the same parameters, it is guaranteed to return the same result. This is called referential transparency and allows the compiler to reason about program behaviour, as well as proof that a function is correct.


### Lazy evaluation

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

We could more succinctly use the notation for a range

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

This means that the following statements are equivalent

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

The function above consists of a function name, followed by parameters separated by spaces. After the `=` the function body is defined.

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

Strings are concatenated with the `++` operator.

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
When using `<, <=, >, >=` to compare lists, their elements are compared in lexicographical order. First the head elements are compared, if they are equal the next elements are compared and so forth, until two elements are not equal, or one of the lists ends.

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

In Haskell we could write `take 10 [2,4,..]` but this would produce doubles of the first 10 natural numbers.

A list comprehension should be used instead.

```haskell
> [x*2 | x <- [1..10]]
> [2,4,6,8,10,12,14,16,18,20]
```

We can also add a predicate to the comprehension

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
Tuples are used when the number of values you want to combine is known, and its type depends on how many components it has along with the type of the components.
They are denoted with parentheses around a comma separated list of values.

Unlike lists, tuples do not have to be homogeneous, meaning that they can contain several types.

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

The `:t` command can be used to determine the type of an expression.

```haskell
> :t 'a'
> 'a' :: Char
> :t True
> True :: Bool
> :t (True, 'a')
> (True, 'a') :: (Bool, Char)
> :t 4 == 5
> 4 == 5 :: Bool
```

`::` should be read as 'has type of'.
Explicit types are always denoted with the first letter in capital case.

Functions also have types. When writing functions, we can give an explicit type declaration.

```haskell
removeNonUppercase :: [Char] -> [Char]
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]
```

`removeNonUppercase` has a type of `[Char] -> [Char]` as it maps a string to a string.
We don't have to give this function a type decleration because the compiler can infer it, however it is still good practice to do so.

```haskell
addThree :: Int -> Int -> Int -> Int
addThree x y z  = x + y + z
```

The function above takes three parameters.
The return type is the last item in the declaration and the parameters are the first three.

### Common types

**Int** A 32 or 64 bit signed integer

**Integer** A non-bounded integer

**Float** A real floating point value with single precision

**Double** A real floating point value with double precision

**Bool** A boolean type, `True` or `False`

**Char** Represents a single character

### Type variables

`head` takes a list of any type and returns the first element

```Haskell
> :t head
> head :: [a] -> a
```

`a` is a type variable, meaning that it can be of any type.
The type decleration of `head` means that it takes a list of some type `a` and returns a single instance of type `a`.

This is much like generics in other languages.

Functions that have type variables are called polymorphic functions.

```haskell
> :t fst
> fst :: (a, b) -> a
```

`fst` takes a tuple which conatins two types, and returns an element which is of the same type as the first item in the pair.

Note that despite the differing names of `a` and `b` they can be the same type.

### Typeclasses

A typeclass behaves similarly to an interface.
If a type is part of a typeclass, it supports and implements the behaviour that the typeclass describes.

```haskell
> :t (==)
> (==) :: (Eq a) => a -> a -> -> Bool
```

The `=>` symbol is called a class constraint.
The euqality function takes any two values that are of the same type and returns a `Bool`.
The class constraint is that the type of those two values must be a member of the `Eq` class.

The `Eq` typeclass provides an interface for testing for equality.
Any type where it makes sense to test for equality between two values of that type should be a member
of the `Eq` class.
All standard Haskell types except for IO and functions are part of the `Eq` typeclass.

Consider the `elem` function which has a type of `(Eq a) => a -> [a] -> Bool` because it uses `==` over a list to check whether some value is contained.

#### Common Typeclasses

**Eq** Used for types that support equality testing. Members must implement `==` and `/=`

**Ord** Used for types which have ordering. `Ord` covers `>, <, >=, ` and `<=`

The `compare` function takes two `Ord` members of the same type and returns an ordering.
`Ordering` is a type that can be `GT`, `LT`, or `EQ`.

To be a member of `Ord`, a type must first be a member of `Eq`

**Show** Used for types that can be presented as strings. The most used function that deals with `Show` is `show`/
It takes a value whose type is a member of `Show` and presents it as a string.

**Read** The `read` function takes a string and returns a type which is a member of `Read`

```haskell
> read "True" || False
> True
> read "8.2" + 3.8
> 12.0
> read "[1,2,3,4]" ++ [3]
> [1,2,3,4,3]
```

If we try `read "4"` an exception will be raised.
```haskell
<interactive>:1:0:  
    Ambiguous type variable `a' in the constraint:  
      `Read a' arising from a use of `read' at <interactive>:1:0-7  
    Probable fix: add a type signature that fixes these type variable(s)
```

The return type cannot be determined. Previously our use of the return value could be used to determine its type.

```haskell
> :t read
> read :: (Read a) => String -> a
```

`read` returns a type that is part of `Read`, but if we do not use the value the type cannot be determined.
We can use explicit type annotations to overcome this problem.

```haskell
> read "5" :: Int
> 5
> read "5" :: Float
> 5.0
> read "(3, 'a')" :: (Int, Char)
> (3, 'a')
```

Most expressions provide sufficient detail that the compiler can infer what their type is by itself.

**Enum** Enum members are sequentially ordered types.

The `Enum` typeclass can be used in list ranges. They also have defined successors and predecessors.
`(), Bool, Char, Ordering, Int, Integer, Float`, and `Double` are in this class.

```haskell
> ['a'..'e']
> "abcde"
> [LT..GT]
> [LT, EQ, GT]
> succ 'B'
> 'C'
```

**Bounded** Members of this typeclass have an upper and lower bound.

Both `minBound` and `maxBound` have a type of `(Bounded a) => a`.
Tuples are part of `Bounded` if all of their components are.

```haskell
> minBound :: Int
> -2147483648
> maxBound :: Bool
> True
> maxBound :: (Bool, Int, Char)
> (True, 2147483647, '\1114111')
```

**Num** Is a numeric typeclass. Its members have the property of being able to act like numbers.

Whole numbers are polymorphic constants. They can act like any type that's a member of the `Num` typeclass.

If we examine the type of `*` we can see that it accepts all numbers.

```haskell
> :t (*)
> (*) :: (Num a) => a -> a -> a
```

As `*` takes two numbers of the same type, `(5 :: Int) * (6 :: Integer)` will result in an error.

To be part of `Num`, a type must also be part of `Show` and `Eq`.

**Integral** Is a numeric typeclass containing `Int` and `Integer`

**Floating** Is a numeric typeclass containing `Float` and `Double`

The `fromIntegral` function has a type declaration of `fromIntegral :: (Num b, Integral a) => a -> b`.
It takes an integral number and turns it into a more general number.

## Syntax in functions

### Pattern matching

Pattern matching is the process of specifying patterns to which data should conform and then checking to see if it does,
deconstructing the data according to those patterns.

When defining functions, separate bodies can be defined for different patterns.

```haskell
factorial :: (Integral a) => a -> a
factorial 0 = 1
factorial n = n * factorial(n - 1)
```

Pattern matching can fail.

```haskell
charName :: Char -> String
charName 'a' = "Albert"
charName 'b' = "Bert"
charName 'c' = "Cecil"
```

When called with an unexpected input, and exception will be raised
`Non-exhaustive patterns in function charName`

Pattern matching can also be used on tuples.

```haskell
addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
addVectors a b = (fst a + fst b, snd a + snd b)
```
Using pattern matching we can instead write the function as

```haskell
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)
```

There are no provided functions to extract the components of triples, but they can be easily written.

```haskell
first :: (a, c, c) -> a
first (x, _, _) = x

second :: (a, b, c) -> b
second (_, y, _) = y

third :: (a, b, c) -> c
third (_, _, z) = z
```

It is also possible to pattern match in list comprehensions.

```haskell
> let xs = [(1, 3), (4, 3), (2, 4), (5, 3), (5, 6), (3, 1)]
> [a+b | (a, b) <- xs]
> [4,7,6,8,11,4]
```

If a pattern match fails, it will move to the next element.

We can pattern match against a list to make our own implementation of `head`

```haskell
head' :: [a] -> a
head' [] = error "Empty list has no head"
head' (x:_) = x
```

```haskell
tell :: (Show a) => [a] -> String
tell [] = "The list is empty"
tell (x:[]) = "The list has one element: " ++ show x
tell (x:y:[]) = "The list has two elements: " ++ show x ++ " and " ++ show y
tell (x:y:_) = "The list is long. The first two elements are " ++ show x ++ " and " ++ show y
```

The `tell` function is safe because it handles the empty list, singleton list, two element list, and lists with more than two elements.

We could rewrite `(x:[])` and `(x:y:[])` as `[x]` and `[x,y]` respectively.
We cannot however rewrite `(x:y:_)` with square brackets because it matches any list of length 2 or more.

We can implement a recursive length function using list comprehension

```haskell
length' :: (Num b) => [a] -> b
length' [] = 0
length' (_:xs) = 1 + length` xs
```

We first define the result of a known input, the empty list. This is known as the edge condition.
In the second pattern we split the list into a head and a tail, and then state that the length is 1 plus
the length of the tail.

```haskell
sum' :: (Num a) => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum` xs
```

### Patterns

Patterns are a method of breaking something up according to a pattern and binding it to names whilst still keeping a reference to the whole thing.

`xs@(x:y:ys)` will match exactly the same thing as `x:y:ys` but the whole list can be accessed via `xs` instead of repeatedly typing `x:y:ys` within
the function body.

```haskell
capital :: String -> String
capital "" = "Empty string"
capital all@(x:xs) = "The first letter of " ++ all ++ " is " + [x]
```

Patterns can be used to avoid needless repetition.

Note that `++` cannot be used in pattern matching.

### Guards

While patterns make sure a value conforms to some form and allow destructuring it, guards are a way of testing whether some property or properties
of a value are true or false.
Guards are much more readable that a statement when there are several conditions.

```haskell
bmi :: (RealFloat a) => a -> String
bmi i
  | i <= 18.5 = "Underweight"
  | i <= 25 = "Normal"
  | i <= 30 "Fat"
  | i <= "Land whale"
```

Guards are indicated by pipes that follow a function's name and its parameters.
They are usually indented.

A guard is basically a boolean expression. If it evaluates to `True`, the corresponding body is used.
Otherwise, the next guard is evaluated.

The last guard will often be `otherwise`. `otherwise` is simply an alias for `True`, and catches everything.

If all the guards of a function evaluate to `False` and there is no `otherwise` guard, evaluation falls through
to the next pattern. If no suitable guards or patterns are found, an error is thrown.

Guards can also be written inline, although it is less readable.

```haskell
max' :: (Ord a) => a -> a -> a
max' a b | a > b = a | otherwise = b
```

```haskell
compare' :: (Ord a) => a -> a -> Ordering
a `compare` b
  | a > b = GT
  | a == b = EQ
  | otherwise = LT
```

### where

Take note of the repetition in the function below

```haskell
bmi :: (RealFloat a) => a -> a -> String
bmi weight height
  | weight / height ^2 <= 18.5 = "Underweight"
  | weight / height ^2 <= 25 = "Normal"
  | weight / height ^2 <= 30 = "Overweight"
  | otherwise = "Land whale"
```

Rather than repeating the bmi calculation, we can use the where keyword.

```haskell
bmi weight height
  | i <= 18.5 = "Underweight"
  | i <= 25 = "Normal"
  | i <= 30 = "Overweight"
  | otherwise = "Land whale"
  where i = weight / height ^2
```

The value defined in `where` is visible across the guards.
`where` bindings are not shared across function bodies of different patterns.
If you want several patterns of one function to access a shared name, the name must be defined globally.

We could also write a pattern match.

```haskell
where bmi = weight / height ^2
  (underweight, normal, overweight) = (18.5, 25, 30)
```


Another trivial function might five someone their initials

```haskell
initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
  where (f:_) = firstname
        (l:_) = lastname  
```

In the same way that we have defined constants in `where` blocks, we can also define functions.

```haskell
calcBmis :: (RealFloat a) => [(a, a)] -> [a]
calcBmis xs = [bmi w h | (w, h) <- xs]
  where bmi weight height = weight / height ^2
```

### Let it be

`let` bindings are very similar to `where` bindings.
`let` bindings allow you to bind variables anywhere and are themselves expressions.
They do not span across guards.

```haskell
cylinder :: (RealFloat a) => a -> a -> a
cylinder r h =
  let sideArea = 2 * pi * r * h
      topArea = pi * r^2
  in sideArea + 2 * topArea
```

A `let` binding is of the form `let <bindings> in <expression>`.
The names defined in the binding are accessible in the expression.

This is similar to splitting up a calculation in another language.

```kotlin
fun cylinder(r: Int, h: Int): Float {
  val sideArea = 2 * Math.PI * r * h
  val topArea = Math.PI * r * r
  return sideArea + 2 * topArea
}
```

The difference between `where` and `let` bindings is that while `where` bindings are just syntactic constructs,
`let` bindings are actually expressions.

`let` bindings can be used almost anywhere, in the same way as `if` statements.

```haskell
> 4 * (let a = 9 in a + 1) + 2
> 42
> [let square x = x * x in (square 5, square 3, square 2)]
> [(25, 9, 4)]
```

If we want to bind several variables in line, we can separate them with semicolons.

```haskell
> (let a = 100; b = 200; c = 300 in a*b*c, let foo="Hey"; bar = "there!" in foo ++ bar)
> (6000000, "Hey there!")
```

`let` bindings are very useful for quickly dismantling a tuple into components and binding them to names.

```haskell
> (let (a,b,c) = (1,2,3) in a+b+c)*100
> 600
```

`let` bindings can also be used inside list comprehensions.

```haskell
calcBmis :: (RealFloat a) => [(a, a)] -> [a]
calcBmis xs = [bmi | (w, h) <- xs, let bmi = w /h^2]
```

We use `let` in a similar way to a predicate, the difference being that we do not filter the list.
The names defined in a `let` are visible to the output function and all predicates and sections that come after the binding.

```haskell
listOverweight :: (RealFloat a) => [(a, a)] -> [a]
listOverweight xs :: [bmi | (w, h) <- xs, let bmi = w / h^2, bmi >= 25]
```

We omitted the `in` part of the binding because the scope of the names is already predefined.
If we used `let in`, the names would only be visible to that predicate.

### Case expressions

The syntax for a case expression is simple

```haskell
case expression of pattern -> result
                   pattern -> result
                   pattern -> result
                   ...
```

`expression` is matched against the patterns. The first pattern that matches the expression is used.
If it falls through the whole `case` an exception occurs.

Whereas pattern matching on function parameters can only be done when defining functions, case expressions can be used
pretty much anywhere.
They are useful for pattern matching against something in the middle of an expression.

## Recursion

The `maximum` function takes a list of instances of the `Ord` typeclass, and returns the largest of them.

In an imperative language you might define this function as so

```kotlin
fun maximum(items: Array<Int>): Int {
  var max = Integer.MIN_VALUE
  items.forEach {
    if (it > max) {
      max = it
    }
  }
  return max
}
```

In Haskell we might instead write our `maximum` function as follows

```haskell
maximum' :: (Ord a) => [a] -> a
maximum' [] = error "Empty list"
maximum' [x] = x
maximum' (x:xs)
    | x > maxTail = x
    | otherwise = maxTail
    where maxTail = maximum' xs
```

We split the list into a head and a tail, and then compare the head to the maximum of the tail.

Consider `[2, 5, 1]`.
We reach the `(x:xs)` branch with a head of `2` and a tail of `[5, 1]`.
`maximum'` is called on `[5, 1]`, reaching the same branch with a head of `5` and a tail of `[1]`.
`maximum'` is called once more on `[1]` which returns `1`.
We now cascade back up the call stack, comparing the head `5` to `1`, giving `5`
and then comparing `5` (`maxTail`) to `2` and returning `5`.

The function could be written more elegantly using `max`.

```haskell
maximum' :: (Ord a) => [a] -> a
maximum' [] = error "Empty list"
maximum' [x] = x
maximum' (x:xs) - max x (maximum' xs)
```

### Recursive function Examples


**Replicate**

```haskell
replicate' :: (Num i, Ord i) => i -> a -> [a]
replicate' n x
  | n <= 0 = []
  | otherwise x:replicate` (n-1) x
```

As we are testing boolean expressions we used guards.
As `Num` is not a subclass of `Ord` we have to specify both class constraints.

**Take**

```haskell
take' :: (Num i, Ord i) => i -> [a] -> [a]
take` n _
  | n <= 0 = []
take` _ [] = []
take` n (x:xs) = x:take` (n-1) xs
```

The first pattern deals with negative values, the second with empty lists, and the third with lists containing some number of items.
As our guard has no `otherwise`, the the matching will fall through when `n > 0`.

**Reverse**

```haskell
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]
```

**Repeat**

`repeat` takes an element and returns an infinite list of that element.

```haskell
repeat' :: a -> [a]
repeat' x = x:repeat x
```

**Repeat**

`zip` takes two lists and zips them together to a list of pairs.

```haskell
zip' :: [a] -> [b] -> [(a, b)]
zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x,y):zip xs ys
```

**Elem**

```haskell
elem' :: a -> [a] -> Bool
elem' a [] = False
elem' a (x:xs)
  | a == x = True
  | otherwise = a `elem` xs
```

### Quick sort

Implementing QuickSort is much easier in Haskell than in imperative languages.

```haskell
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
  let smallerSorted = quicksort [a | a <- xs, a <= x]
      biggerSorted = quicksort [a | a <- xs, a <= x]
  in smallerSorted ++ [x] ++ biggerSorted
```

This Quicksort implementation uses the head as a pivot for the sorting.

## Higher order functions

Functions in Haskell can take functions as parameters and return functions.
A function that does either of those is called a higher order function.

### Curried functions

Every function in Haskell only takes one parameter.
All the functions which take several parameters are curried functions.

The following two calls are equivalent

```haskell
> max 4 5
> (max 4) 5
```

Calling `max 4 5` first creates a function which takes a single parameter and returns
either `4` or that parameter, whichever is larger. It then applies that function to `5`.

Putting a space between two pieces of code is simply function application.
The space is like an operator with the highest precedence.

Again considering `max`

```haskell
max :: (Ord a) => a -> a-> a
max :: (Ord a) => a -> (a -> a)
```

The second line could be read as `max` takes an `a` and returns a function that takes another `a` and returns an `a`.
The return type of each functions are separated with the arrows.

Consider the following function

```haskell
multThree :: (Num a) => a -> a -> a -> a
multThree x y z = x * y * z
```

When we call `multThree 3 5 9` we are actually calling `((multThree 3) 5) 9`.
This means that `3` is applied to `multThree` to create a function that takes one
parameter and returns a function.
Next, `5` is applied to that function, and returns a function which takes a single parameter
and multiplies it by `15`.
Finally, `9` is applied to that function and the result is `135`.

By calling functions without some of their parameters, we can create new functions.

```haskell
> let multTwoWithNine = multThree 9
> multTwoWithNine 2 3
> 54
> let multWithEighteen = multTwoWithNine 2
> multWithEighteen 10
> 180
```

Infix functions can also be partially applied by using sections.
To section an infix function, surround it with parentheses and only supply a parameter on one side.

```haskell
divTen :: (Floating a) => a -> a
divTen = (/10)
isUpperAlphanum :: Char -> Bool
isUpperAlphanum = ('elem' ['A'..'Z'])
```

Note that when using sections, `-` cannot be used directly.
`(-4)` means `-4`. To make a function which takes a value and subtracts `4` from it
you must replace the `-` with `subtract`, `(subtract 4)`.

### Higher order functions

```haskell
applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)
```

Notice that the type declaration contains parentheses.
They are mandatory when one of the parameters is a function.

```haskell
> applyTwice (+4) 10
> 18
```

We can now re-implement another standard library function, `zipWith`.
`zipWith` takes a function and two lists as parameters and then joins the two
lists by applying the function between corresponding elements.


```haskell
zipWith' (a -> b -> c) -> [a] -> b -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys
```

In the type decleration the first parameter is a function that takes two things and produces a third.
The second and third parameters are lists, and the return value is a list, with each list matching
the respective types of the arguments of the first function.

```haskell
> zipWith' (+) [4,2,5,6] [2,6,2,3]
> [6,8,7,9]
```

Another standard library function is `flip`. It takes a function and returns a function
which is like the original function, but with the first two arguments flipped.

```haskell
flip' :: (a -> b -> c) -> (b -> a -> c)
flip' f = g
  where g x y = f y x
```

Reading the type declaration we say that `flip'` takes a function that takes an `a` and a `b`, and
returns a function that takes a `b` and an `a`.
Because functions are curried by default, the second pair of parentheses is really unnecessary, because `->`
is right associative by default.

`(a -> b -> c) -> (b -> a -> c)` is the same as `(a -> b -> c) -> (b -> (a -> c))` which is the same as
`(a -> b -> c) -> b -> a -> c`.

We can further simplify the function by writing it as

```haskell
flip' :: (a -> b -> c) -> b -> a -> c
flip' f y x = f x y
```
### Maps and filters

**map** Takes a function and a list and applies that function to every element in the list, producing a new list.

The definition of `map` is

```haskell
map :: (a -> b) -> [a] -> [b]
map _ [] = []
map f (x:xs) = f x : map f xs
```

```haskell
> map (+2) [1,2,3,4]
> [3,4,5,6]
```

This is much more readable than the equivalent list comprehension `[x+2 | x <- [1,2,3,4]]`.

**filter** is a function that takes a predicate and a list and returns the elements of the list that satisfy the predicate

```haskell
filter :: (a -> Bool) -> [a] -> [a]
filter _ [] = []
filter p (x:xs)
  | p x = x : filter p xs
  | otherwise = filter p xs
```

```haskell
> filter (>3) [1,2,3,4,5,6,7,8,9]
> [4,5,6,7,8,9]
> let notNull x = not (null x) in filter notNull [[1,2,3],[],[3,4,5],[2,2],[],[]]
> [[1,2,3],[3,4,5],[2,2]]
```

Recalling the earlier implementation of QuickSort, we can replace the list comprehensions with calls to filter.

```haskell
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
  let smallerSorted = quicksort (filter (<=x) xs)
      biggerSorted = quicksort (filter (>x) xs)
  in smallerSorted ++ [x] ++ biggerSorted
```

**takeWhile** is a function that takes a list and a predicate and returns all of the elements from the start of the
list while the predicate returns true

Suppose we wish to find the sum of all odd square that are less than `10000`

```haskell
> sum (takeWhile (<10000) (filter odd (map (^2) [1..])))
> 166650
```

In the Collatz sequence, we start with a natural number.
If the number is even we divide it by 2.
If the number is odd we multiply it by 3 and add 1.
We take the resulting value and apply the same process to it, stopping when we reach one.

```haskell
chain :: (Integral a) => a -> [a]
chain 1 = [1]
chain n
  | even n = n:chain (n / 2)
  | odd n = n:chain (n*3 + 2)
```

```haskell
> chain 10
> [10, 5, 16, 8, 4, 2, 1]
```

### Lambdas

Lambdas are anonymous functions that are used because we need some functions only once, and do not want
to pollute the namespace.
We write a lambda with a \newline and then write the parameters, followed by a `->` and then the function body.

Filtering for long chains we might write

```haskell
numLongChains :: Int
numLongChains = length (filter (\xs -> length xs > 15) (map chain [1..100]))
```

Lambdas can take any number of parameters in the same way as normal functions

```haskell
> zipWith (\a b -> (a * 30 + 3) / b) [5,4,3,2,1] [1,2,3,4,5]
> [153.0, 61.5, 31.0, 15.75, 6.6]
```

As with normal functions, we can pattern match in lambdas.

```haskell
> map (\newline(a,b) -> a + b) [(1,2),(3,5),(6,3),(2,6),(2,5)]
> [3,8,9,8,7]
```

Due to the way we curry functions, the following two are equivalent

```haskell
addThree :: (Num a) => a -> a -> a -> a
addThree x y z = x + y + z
```

```haskell
addThree :: (Num a) => a -> a -> a -> a
addThree = \x -> \y -> \z -> x + y + z
```

While the example above decreases readability, it can aid with the understanding of some functions, such as `flip`

```
flip' :: (a -> b -> c) -> b -> a -> c
flip' f = \x y -> f y x
```

### Folding

**foldl** The left fold the folds a list up form the left side

```haskell
sum' :: (Num a) => [a] -> a
sum' xs = foldl (\acc x -> acc + x) 0 xs
```

In the example above `\acc x -> acc + x` is the binary function. `0` is the starting value and `xs` is the list to be
folded up.

```haskell
> sum' [3,5,2,1]
> 11
```
At each step we have
| `0 + 3` | `[3,5,2,1]` |
| `3 + 5` | `[5,2,1]` |
| `8 + 2` | `[2,1]` |
| `10 + 1`| `[1]` |
| `11` | |

We could implement `elem` using `foldl`

```haskell
elem' :: (Eq a) => a -> [a] -> Bool
elem' y ys = foldl (\acc x -> if x == y then True else acc) False ys
```

The starting value and accumulator above are both boolean values.

**foldr** Works in a similar way to **foldl**, except that it consumes values from the right
`foldr` takes the accumulator as the second function.

We can implement `map` with a `foldr`.

```haskell
map' :: (a -> b) -> [a] -> [b]
map' f xs = foldr (\x acc -> f x : acc) [] xs
```

If we map `(+3)` to `[1,2,3]`, we approach the list from the right side.
We take the first element `3` and apply the function to it, giving `6`.
We prepend `6` to the accumulator.
We then apply `(+3)` to `2`, giving `5`, and prepend it to the accumulator.
Continuing in the same manner we reach `[4,5,6]`.

One notable difference is that `folr` works on infinite lists, while `foldl` does not.

Folds can be used to implement any function were you traverse a list once.

There are also the functions `foldl1` and `foldr1` which do not require a starting value, instead
assuming that the first value in their traversal order is the starting value.

This would allow an implementation of sum as `sum = foldl1 (+)`, although it would cause an error
on an empty list.

#### Fold implementations of standard library functions

```haskell
maximum' :: (Ord a) => [a] -> a
maximum' = foldr1 (\x acc -> if x > acc then x else acc)

reverse' :: [a] -> [a]
reverse' = foldl (\acc x -> x : acc) []

product' :: (Num a) => [a] -> a
product' = foldr1 (*)

filter' :: (a -> Bool) -> [a] -> [a]
filter' p = foldr (\x acc -> if p x then x : acc else acc) []

head' :: [a] -> a
head' = foldr1 (\x _ -> x)

last' :: [a] -> a
last' = foldl1 (\_ x -> x)
```

The `head` function would be better implemented by pattern matching, as the `fold` traverses the entire list.

In `reverse` we take a starting value of an empty list and append each value from the left to our list.


### `scanl` and `scanr`

`scanl` and `scanr` are like `foldl` and `foldr`, with the difference being that they report all
the intermediate accumulator states in the form of a list.
There are also `scanl1` and `scanr1`


```haskell
> scanl (+) 0 [3,5,2,1]
> [0,3,8,10,11]
> scanr (+) 0 [3,5,2,1]
> [11,8,3,1,0]
> scanl1 (\acc x -> if x > acc then x else acc) [3,4,5,3,,7,9,2,1]
> [3,4,5,5,7,9,9,9]
> scanl (flip (:)) [] [3,2,1]
> [[],[3],[2,3],[1,2,3]]
```

Scans are used to monitor the progression of a function that can be implemented as a fold.

### Function application with $

The `$` function is also called function application.

```haskell
($) :: (a -> b) -> a -> b
f $ x = f x
```

Whereas normal function application has the highest precedence, `$` has the lowest precedence.

Function application with a space is left-associative so `f a b c` is the same as `((f a) b) c`.
Function application with `$` is right associative.

Consider the expression `sum (map sqrt [1..130])`.
We can instead write `sum $ map sqrt [1..130]`.
When a `$` is encountered the expression on its right is applied as the parameter to the function on its left.

Consider `sqrt (3 + 4 + 9)`. We could instead write this as `sqrt $ 3 + 4 + 9`.

In `sum (filter (> 10) (map (*2) [2..10]))` we can write `sum $ filter (> 10) $ map (*2) [2..10]` because
`f (g (z x))` is equal to `f $ g $ z x`.

### Function composition

In Haskell, function composition is performed with the `.` function, which is defined as follows

```haskell
(.) :: (b -> c) -> (a -> b) -> a -> c
f . g = \x -> f (g x)
```

`f` must take as its parameter a value that has the same type as `g`'s return value.

One of the uses for function composition is making functions on the fly to pass to other functions,
which is often cleaner and more concise than lambdas.

```haskell
> map (\x -> negate (abs x)) [5,-3,-6,7,-3,2,-19,24]
> [-5,-3,-6,-7,-3,-2,-19,-24]
> map (negate . abs) [5,-3,-6,7,-3,2,-19,24]
> [-5,-3,-6,-7,-3,-2,-19,-24]
```

Function composition is right associative, so multiple functions can be composed together.

#### Function composition with multiple parameters

If we want to use a function with multiple parameters in a function composition, we usually have
to partially apply them so that each function takes just one parameter.

`sum (replicate 5 (max 6.7 8.9))` can be rewritten as `(sum . replicate 5. max 6.7) 8.9` or as
`sum . replicate 5 . max 6.7 $ 8.9`.

What is happening is the creation of a function that takes what `max 6.7` takes and applies `replicate 5`
to it. Then a function that takes the result of that and does a sum of it is create.
Finally, that unction is called with `8.9`.
However it is more easily read as taking the value of `max 6.7 8.9`, replicating it `5` times, and taking the
sum of that replication.

If you want to rewrite a function with lots of parentheses you can start by putting the last parameter of the innermost
function after a $, and replacing each pair of parentheses with a `.`.

`replicate 100 (product (map (*3) (zipWith max [1,2,3,4,5] [4,5,6,7,8])))` can be rewritten as
`replicate 100 . product . map (*3) . zipWith max [1,2,3,4,5] $ [4,5,6,7,8]`.

The free point style allows functions to be written more cleanly

```haskell
fn x = ceiling (negate (tan (cos (max 50 x))))
```

can instead be written

```haskell
fn = ceiling . negate . tan . cos . max 50
```

## Modules

A Haskell module is a collection of related functions, types, and typeclasses.
A program is a collection of modules in which the main module loads up the other modules and
then uses their functions to perform some process.

Modules provide many advantages.
If a module is generic enough, the functions it exports can be used in many different programs.
If code is separated into self-contained modules which aren't too reliant on each other, they
can be reused later on and changed more easily without having to rewrite other code.

The standard library is split into modules, each of which contains related functions and types.

Modules are imported before the definition of any function with the syntax `import module_name`.

The `Data.List` module has useful functions for working with lists.

One of these functions is `numUniques`

```haskell
numUniques:: (Eq a) => [a] -> Int
numUniques = length . nub
```

When `Data.List` is imported, all of its exports become available in the global namespace.
`nub` is another function in `Data.List` that removes duplicate elements from a list.

In the terminal, functions can be added to the global namespace with `:m`

```haskell
> :m + Data.List Data.Map Data.Set
```

Individual functions can also be imported

```haskell
import Data.List (nub, sort)
```

We can also import all of the functions in a module except some which are explicitly excluded.
This is useful if different modules export functions with the same name.

```haskell
import Data.List hiding (nub)
```

Another method for dealing with name clashes is qualified imports.
The `Data.Map` module contains functions with the same names as some of those in `Prelude`,
such as `filter` or `null`

```haskell
import qualified Data.Map
```

This means that when we wish to reference the `filter` function in `Data.Map` we must write
`Data.Map.Filter`.
As this can make code very verbose, there is the option to name the import

```haskell
import qualified Data.Map as M
```

We can now access `Data.Map.Filter` as `M.filter`

### `Data.List`

**intersperse** takes an element and a list and puts that element in between each pair of elements in the list

```haskell
> intersperse 0 [1,2,3,4,5]
> [1,0,2,0,3,0,4,0,5]
```

**intercalate** takes a list of lists and a list, and inserts the list between each of the lists within the list of lists, before
flattening the result

```haskell
> intercalate [0,0,0] [[1,2,3],[4,5,6],[7,8,9]]
> [1,2,3,0,0,0,4,5,6,0,0,0,7,8,9]
```

**transpose** transposes a list of lists. Considering the list of lists as a 2d matrix, rows become columns and vice versa

```haskell
> transpose [[1,2,3],[4,5,6],[7,8,9]]
> [[1,4,7],[2,5,8],[3,6,9]]
```

**fold'** and **foldl1'** are stricter version of their respective lazy incarnations.
When using lazy folds on very large lists, stack overflow errors may occur.
Due to the lazy nature of folds, the accumulator is not actually updated as the folding happens.
The strict fold functions actually compute the intermediate values rather than filling up the stack with thunks.

**concat** flattens a list of lists into a list of elements

```haskell
> concat [[1,2,3],[4,5,6],[7,8,9]]
> [1,2,3,4,5,6,7,8,9]
```

**concatMap** is the same as first mapping a function to a list, and then concatenating the list with `concat`

**and** takes a list of values and returns `True` only if all the values in the list are `True`

**or** takes a list and returns `True` if any of the values in the list are `True`

```haskell
> and $ map (>4) [5,6,7,8]
> True
> or $ map (==4) [1,2,3,4,5,6,7,8]
> True
```

**any** and **all** take a predicate and then check if any or all of the elements in the list satisfy the predicate, respectively.
These functions are usually used rather than mapping over a list and then using **or** or **and**

**iterate** takes a function and a starting value. It applies the function to the starting value, then applies that function to the result, and repeats, returning
in the form of an infinite list

```haskell
> take 10 $ iterate (*2) 1
> [1,2,4,8,15,32,64,128,256,512]
```

**splitAt** takes a number and a list. It then splits the list at that many elements, returning the two lists in a tuple

```haskell
> splitAt 3 [1,2,3,4,5,6]
> ([1,2,3], [4,5,6])
```

**takeWhile** takes elements from a list while the predicate holds

```haskell
> takeWhile (/=' ') "This is a sentence"
> "This"
```

**dropWhile** takes a list and drops all the elements from the list while the predicate holds

```haskell
> dropWhile (<3) [1,2,2,2,2,2,2,8,6,8]
> [8,6,8]
```

**span** returns a pair of lists, the first list containing the result of `takeWhile` on the list, and the second list containing the remaining elements

**break** `break p` is the equivalent of `span (not . p)`

**sort** sorts a list of the `Ord` typeclass

**group** takes a list and groups the adjacent elements into sublists if they are equal

```haskell
> group [1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4,4]
> [[1,1,1],[2,2,2,2],[3,3,3,3,3],[4,4,4,4,4,4]]
```

**inits** and **tails** are like  **init** and **tail** except that they recursively apply to the list until there is nothing left

```haskell
> inits "text"
> ["", "t", "te", "tex", "text"]
```

**isInfixOf** returns true if a sublist is contained within a list

**isPrefixOf** and **isSuffixOf** search for a sublist at the beginning and end of a list respectively

**elem** and **notElem** check if an element is or is not inside a list

**partition** takes a list and a predicate and returns a pair of lists, the first containing all the elements that satisfy the predicate, and the second containing those that do not

**find** takes a list and a predicate and returns the first element that satisfies the predicate

The type of `find` is `Maybe a` as it can contain `Just a` or `Nothing`.

**elemIndex** returns the index of an element in a list, or `Nothing` if the element is not contained within the list

**elemIndices** returns a list of the indices of an element within a list

**findIndex** maybe returns the index of the first element that satisfies the predicate

**zip3**, **zip4**, **zipWith3**, and **zipWith4** zip 3 or 4 lists into triples or 4 tuples

**lines** takes a string returns every line of that string in a separate list

```haskell
> lines "line 1\nline 2\nline 3"
> ["line 1", "line 2", "line 3"]
```

**unlines** takes a list of strings and joins them together with the '\\n' character

**words** and **unwords** split a line of text into words or join a list of words respectively

**delete** takes an element and a list and deletes the first occurrence of that element in the list

**\\** the list difference function. For every element in the right hand list, it removes a matching element in the left one

**union** returns the union of two lists

**intersect** returns only the elements that are found in both lists

**insert** takes an element and a list of elements that can be sorted and inserts it into the last position where it is less than or equal to the next element

**length**, **take**, **drop** **splitAt**, **!!**, and **replicate** all take **Int** as one of their parameters, or return an **Int**.
They could be more generic if they took any type that's part of **Integral** or **Num**.
`Data.List` contains **genericLength**, **genericTake** etc to provide these functions without breaking old code.

The **nub**, **delete**, **union**, **intersect**, and **group** functions all have their more general counterparts **nubBy** etc.
While the standard functions use `==` to test for equality, the `By` functions take an equality function as a parameter.

Similarly there are `sortBy`, `insertBy`, `maximumBy`, and `minimumBy` functions.

### `Data.Char`

The `Data.Char` module deals with characters

**isControl** checks whether a character is a control character

**isSpace** checks whether a character is a white space character

**isLower** checks whether a character is lower cased

**isUpper** checks whether a character is upper cased

**isAlpha** checks whether a character is a letter

**isAlphaNum** checks whether a character is a letter or a number

**isPrint** checks whether a character is printable

**isDigit** checks whether a character is a digit

**isOctDigit** checks whether a character is an octal digit

**isHexDigit** checks whether a character is a hexadecimal digit

**isLetter** checks whether a character is a letter

**isMark** checks for Unicode mark characters. These characters combine with preceding letters to form letters with accents

**isNumber** checks whether a character is numeric

**isPunctuation** checks whether a character is punctuation

**isSymbol** checks whether a character is a symbol

**isSeparator** checks for Unicode spaces and separators

**isAscii** checks whether a character falls within the first 128 of the Unicode set

**isLatin1** checks whether a character falls into the first 256 characters of the Unicode set

**isAsciiUpper** checks whether a character is ASCII and uppercase

**isAsciiLower** checks whether a character is ASCII and lowercase

All of the above functions have a type signature of `Char -> Bool`

`Data.Char` exports a data type which is similar to `Ordering`. The `Ordering` type can have a value of `LT`, `EQ`, or `GT`.
It describes possible result that can arise from comparing elements.
The `GeneralCategory` type is also an enumeration. It presents possible categories that a character can fall into.

`generalCategory` has a type of `Char -> GeneralCategory`. There are a total of 31 categories.

```haskell
> generalCategory ' '
> Space
> generalCategory 'A'
> UppercaseLetter
> generalCategory '|'
> MathSymbol
```

**toUpper** converts a character to uppercase, ignoring those which do not have an uppercase

**toLower** converts a character to lowercase

**toTitle** converts a character to title case, which is usually the same as uppercase

**digitToInt** converts a character to an `Int`. The character must be in the range '0..9, a..f, A..F'

**intToDigit** is the inverse of `digitToInt`

**ord** and **chr** convert characters to their numeric values and vice versa

### `Data.Map`

Association lists are lists that are used to store key-value pairs where ordering does not matter.

We could represent this structure with a list of pairs, and find values by their key as follows

```haskell
findKey :: (Eq k) => k -> [(k, v)] -> v
findKey key xs = snd . head . filter (\(k,v) -> key == k) $ xs
```

The function takes the list of pairs, filters the list so that only matching keys remain, and takes the head value.

In order to deal with elements which do not exist, we must return `Maybe v`

```haskell
findKey :: (Eq k) => k -> [(k,v)] -> Maybe v
findKey key [] = Nothing
findKey key ((k,v):xs) = if key == k
                           then Just v
                           else findKey key xs
```

This recursive function on a list can be implemented as a fold

```haskell
findKey :: (Eq k) => k -> [(k,v)] -> Maybe v
findKey key = foldr (\(k,v) acc -> if key == k then Just v else acc) Nothing
```

The `findKey` function does the same thing as the `lookup` function from `Data.List`.
The `Data.Map` module offers association lists which are much faster, as they are not traversing lists.

`Data.Map` should qualified in order to stop namespace clashes with `Prelude` and `Data.List`.

**fromList** takes an association list and returns a map with the same associations

If there are duplicate keys in the list, they are discarded.
`fromList` has the signature `Map.fromList :: (Ord k) => [(k, v)] -> Map.Map k v`.

The keys must be orderable so that they can be placed in a tree.

**empty** represents an empty map

**insert** takes a key, a value, and a map, and returns a new map with the new item

```haskell
> Map.empty
> fromList []
> Map.insert 3 100 Map.empty
> fromList [(3,100)]
```

**null** checks if a map is empty

**size** reports the size of a map, which is the number of key value pairs

**singleton** takes a key and a value and creates a map with exactly one mapping

**lookup** returns `Just something` if a key exists and `Nothing` if it does not

**member** is a predicate that takes a key and a map and reports whether the key is in the map

**map** and **filter** work much like their list equivalents, working on the values

**toList** is the inverse of `fromList`

**keys** and **elems** return a list of keys and values respectively

**fromListWith** acts like `fromList` except that it takes a function supplied to decide what to do with duplicate keys

The function is used to combine the values of those keys into some other value

**insertWIth** inserts a key-value pair into a map, using the passed function if the key already exists

### `Data.Set`

`Data.Set` offers set structures.

**fromList** takes a list and converts it to a set

```haskell
> Set.fromList "The quick brown fox jumped over the lazy dog."
> fromList " .Tabcdefghijklmnopqrstuvwxyz"
```

The elements are ordered and each element is unique

**intersection** returns a set of the elements which are present in both sets

**difference** returns a set of the elements which are in the first set but not the second

**union** returns a set of the combined elements of both sets

**null**, **size**, **member**, **empty**, **singleton**, **insert**, and **delete** work as expected

**isSubsetOf** checks if the first set is a subset of the second set

**isProperSubsetOf** checks if the first set is a proper subset of the second set

### Creating modules

Modules are defined as follows

```haskell
module Geometry  
( sphereVolume  
, sphereArea  
, cubeVolume  
, cubeArea  
, cuboidArea  
, cuboidVolume  
) where  

sphereVolume :: Float -> Float  
sphereVolume radius = (4.0 / 3.0) * pi * (radius ^ 3)  

sphereArea :: Float -> Float  
sphereArea radius = 4 * pi * (radius ^ 2)  

cubeVolume :: Float -> Float  
cubeVolume side = cuboidVolume side side side  

cubeArea :: Float -> Float  
cubeArea side = cuboidArea side side side  

cuboidVolume :: Float -> Float -> Float -> Float  
cuboidVolume a b c = rectangleArea a b * c  

cuboidArea :: Float -> Float -> Float -> Float  
cuboidArea a b c = rectangleArea a b * 2 + rectangleArea a c * 2 + rectangleArea c b * 2  

rectangleArea :: Float -> Float -> Float  
rectangleArea a b = a * b  
```

The helper function `rectangleArea` is not exported.

Modules can be given hierarchical structures.
Each module can have a number of submodules which can have submodules of their own.

#### Creating submodules

First we create a folder called `Geometry`.
Within this folder we create three files: `Sphere.hs`, `Cuboid.hs`, and `Cube.hs`

```haskell
module Geometry.Sphere  
( volume  
, area  
) where  

volume :: Float -> Float  
volume radius = (4.0 / 3.0) * pi * (radius ^ 3)  

area :: Float -> Float  
area radius = 4 * pi * (radius ^ 2)  
```

```haskell
module Geometry.Cuboid  
( volume  
, area  
) where  

volume :: Float -> Float -> Float -> Float  
volume a b c = rectangleArea a b * c  

area :: Float -> Float -> Float -> Float  
area a b c = rectangleArea a b * 2 + rectangleArea a c * 2 + rectangleArea c b * 2  

rectangleArea :: Float -> Float -> Float  
rectangleArea a b = a * b  
```

```haskell
module Geometry.Cube  
( volume  
, area  
) where  

import qualified Geometry.Cuboid as Cuboid  

volume :: Float -> Float  
volume side = Cuboid.volume side side side  

area :: Float -> Float  
area side = Cuboid.area side side side
```

In each module we have defined functions with the same names.
This is possible because they are separate modules.

## Making Types and Typeclassses

### Algebraic data types

```haskell
data Bool = False | True
```

The `data` keyword is used to define a new data type.
The part before the `=` denotes the type, and the parts after it are `value constructors`.
They specify the different values that this type can have.

We could think of `Int` as being

```haskell
data Int = -2147483648 | -2147483647 | ... | -1 | 0 | 1 | 2 | ... | 2147483647
```

Consider the definition of a shape

```haskell
data Shape = Circle Float Float Float | Rectangle Float Float Float Float
```

The `Circle` value constructor has three fields.
When we write a value constructor we optionally add some types after it and those types define the values it will contain.

Value constructors are actually functions that ultimately return a value of a data type.

```haskell
> :t Circle
> Circle :: Float -> Float -> Float -> Shape
> :t Rectangle
> Rectangle :: Float -> Float -> Float -> Float -> Shape
```


A function to find the surface of a `Shape` cane be written as follows

```haskell
surface :: Shape -> Float
surface (Circle _ _ r) = pi * r ^ 2
surface (Rectangle x1 y1 x2 y2) = (abs $ x2 - x1) * (abs $ y2 - y1)
```

We could not write a type declaration of `Circle -> Float` because `Circle` is not a type, whereas `Shape` is.
We can pattern match against constructors, which we have been doing before when matching against values like `[]` or `False`.

To make our type printable we modify it as below

```haskell
data Shape = Circle Float Float Float | Rectangle Float Float Float Float deriving (Show)
```

When we add `deriving (Show)` at the end of a `data` declaration, Haskell makes that type part of the `Show` typeclass automatically.

Value constructors are functions, so we can map them and partially apply them.

```haskell
> map (Circle 10 20) [4,5,6,7]
> [Circle 10.0 20.0 4.0,Circle 10.0 20.0 5.0,Circle 10.0 20.0 6.0,Circle 10.0 20.0 7.0]  
```

To improve the `Shape` type we can define an intermediate data type to represent a point in two dimensional space

```haskell
data Point = Point Float Float deriving (Show)  
data Shape = Circle Point Float | Rectangle Point Point deriving (Show)  
```

When defining a point, we used the name for the data type and its value constructor. This has no special meaning.

The `surface` function must now be adjusted

```haskell
surface :: Shape -> Float
surface (Circle r) = pi * r ^ 2
surface (Rectangle (Point x1 y1) (Point x2 y2)) = (abs $ x2 - x1) * (abs $ y2 - y1)
```

When calculating the area of the rectangle we use nested pattern matching to access the fields.

We can defined a function to modify the position of a shape

```haskell
nudge :: Shape -> Float -> Float -> Shape
nudge (Circle (Point x y) r) a b = Circle (Point (x+a) (y+b)) r
nudge (Rectangle (Point x1 y1) (Point x2 y2)) a b = Rectangle (Point (x1+a) (y1+b)) (Point (x2+a) (y2+a))
```

```haskell
> nudge (Circle (Point 34 34) 10) 5 10
> Circle (Point 39.0 44.0) 10.0
```

If we don't want to deal directly with points, we can make auxiliary functions that create shapes of some size at the zero coordinates and then nudge those.

```haskell
baseCircle :: Float -> Shape
baseCircle r = Circle (Point 0 0) r

baseRect :: Float -> Float -> Shape
baseRect width height = Rectangle (Point 0 0) (Point width height)
```

```haskell
> nudge (baseRect 40 100) 60 23
> Rectangle (Point 60.0 23.0) (Point 100.0 123.0)
```

These data types can be exported in modules.
Write the type along with the functions to be exported, and then add parentheses and specify the value constructors to be exported for it.
To export all the value constructors for a type, just write `..`

```haskell
module Shapes   
( Point(..)  
, Shape(..)  
, surface  
, nudge  
, baseCircle  
, baseRect  
) where  
```

By writing `Shape(..)` we exported all the value constructors for `Shape`. This is the same as writing `Shape(Rectangle, Circle)`.

We could opt not to export the value constructors for `Shape` by just writing `Shape`.
This would mean that any user of the module could only make shapes using the auxiliary functions `baseCircle` and `baseRect`.

### Record syntax

Suppose we wish to create a data type to contain information about a person.

```haskell
data Person = Person String String Int Float String String deriving (Show)  
```

```haskell
> let guy = Person "Buddy" "Finklestein" 43 184.2 "526-2928" "Chocolate"  
> guy  
Person "Buddy" "Finklestein" 43 184.2 "526-2928" "Chocolate"  
```

This is somewhat unreadable.

Now suppose that we cant to create a function to get individual pieces of information from a `Person`.

```haskell
firstName :: Person -> String  
firstName (Person firstname _ _ _ _ _) = firstname  

lastName :: Person -> String  
lastName (Person _ lastname _ _ _ _) = lastname  

age :: Person -> Int  
age (Person _ _ age _ _ _) = age  

height :: Person -> Float  
height (Person _ _ _ height _ _) = height  

phoneNumber :: Person -> String  
phoneNumber (Person _ _ _ _ number _) = number  

flavor :: Person -> String  
flavor (Person _ _ _ _ _ flavor) = flavor  
```

This is tedious to write.

Instead we can write out data type as follows

```haskell
data Person = Person { firstName :: String  
                     , lastName :: String  
                     , age :: Int  
                     , height :: Float  
                     , phoneNumber :: String  
                     , flavor :: String  
                     } deriving (Show)   
```

We define a name for each field, and then specify its type.
Functions are automatically created for looking up fields. The functions have the same name as the fields.

```haskell
> :t flavor
> flavor :: Person -> String
```

When we derive `Show`, the output is also much more useful.

```haskell
data Car = Car String String Int deriving (Show)  
```

```haskell
> Car "Ford" "Mustang" 1967  
Car "Ford" "Mustang" 1967  
```

```haskell
data Car = Car {company :: String, model :: String, year :: Int} deriving (Show)
```

```haskell
> Car {company="Ford", model="Mustang", year=1967}  
Car {company = "Ford", model = "Mustang", year = 1967}  
```

When making a new `Car` we don't have to put the fields in their proper order, as long as we list all of them. If we were not using record syntax, we would have to specify them in order.

Record syntax should be used when there are numerous parameters which are not immediately distinguishable.

### Type parameters

A value constructor can take some values as parameters and then produce a new value.
In a similar manner, type constructors take types as parameters and produce new types.

```haskell
data Maybe a = Nothing | Just a
```

The `a` above is the type parameter. Because there is a type parameter involved, we call `Maybe` a type constructor.
Depending on what we want this data type to hold when it is not `Nothing`, this type constructor can produce a type of `Maybe Int`, `Maybe String` or any other `Maybe` type.
No value can have a type of just `Maybe`, because that is not a type, only a type constructor.

If we pass `Char` as the type parameter to `Maybe`, we get a type of `Maybe Char`. The value `Just 'a'` has a type of `Maybe Char`.

```haskell
> Just "String"
> Just "String"
> Just 84
> Just 84
> :t Just "String"
> Just "String" :: Maybe [Char]
> :t Just 84
> Just 84 :: (Num t) => Maybe t
> :t Nothing
> Nothing :: Maybe a
> Just 10 :: Maybe Double
> Just 10.0
```

Type parameters are useful because we can make different types with them depending on what kind of types we want contained in our data type.

The type of `Nothing` is `Maybe a`. It is polymorphic. If some function requires `Maybe Int` as a parameter, we can give it `Nothing`, because `Nothing` doesn't contain a value anyway.
The `Maybe a` type can act like a `Maybe Int` if it has to.
Similarly, the type of an empty list is `[a]`, so an empty list can act like anything.

Another parametrized type is `Map k v`.  Having maps parametrized enables us to have mappings from any type to any other type, as long as the type of the key is part of the `Ord` typeclass.
If we were defining a mapping type, we could add a typeclass constraint in the data declaration.

```haskell
data (Ord k) => Map v k = ...
```

It is a very strong convention in Haskell to **never add typeclass constraints in data declarations**.
This is because we don't benefit a lot, but we end up writing more class constraints, even when we don't need them.
If we put or don't put the `Ord k` constraint for `Map k v`, we will have to put the constraint into functions that assume the keys in a map can be ordered.
If we don't put the constraint in the data declaration, we don't have to put `(Ord k) =>` in the type declarations of functions that don't care whether the keys can be ordered.

An example is `toList`, which has a type signature of `toList :: Map k a -> [(k, a)]` rather than having to have a type constraint `toList :: (Ord k) => Map k a -> [(k, a)]` without actually doing any comparing of keys.

We don't put type constraints in data declarations because they will have to be put in function type declarations anyway.


A 3d vector type and some operations are defined as follows

```haskell
data Vector a = Vector a a a deriving (Show)  

vplus :: (Num t) => Vector t -> Vector t -> Vector t  
(Vector i j k) `vplus` (Vector l m n) = Vector (i+l) (j+m) (k+n)  

vectMult :: (Num t) => Vector t -> t -> Vector t  
(Vector i j k) `vectMult` m = Vector (i*m) (j*m) (k*m)  

scalarMult :: (Num t) => Vector t -> Vector t -> t  
(Vector i j k) `scalarMult` (Vector l m n) = i*l + j*m + k*n  
```

We use a parametrized type because the vector should support several numeric types.

`vplus` is use to add two vectors together. `scalarMult` is for the scalar product of two vectors, and `vectMult` is for multiplying a vector with a scalar.
These functions can operate on types of `Vector Int`, `Vector Integer`, `Vector Float`, and any other type from the `Num` typeclass.

It is very important to distinguish between the type constructor and the value constructor.
When declaring a data type, the part before the `=` is the type constructor and the constructors after it are value constructors.


### Derived instances

A type can be an instance of a typeclass if it supports a particular behaviour.

Haskell can automatically make a type an instance of any of the following typeclasses: `Eq`, `Ord`, `Enum`, `Bounded`, `Show`, `Read`.

When we derive the `Eq` instance for a type and then try to compare two values, Haskell will see if the value constructors match, and it will then check if all the data contained inside matches by testing each pair of fields, each of which also have to be part of the `Eq` typeclass.

We can derive instances for the `Ord` typeclass. If we compare two values of the same type that were made using different constructors, the value which was made with a constructor that's defined first is smaller.

```haskell
data Bool = False | True deriving (Ord)
```

Because the `False` constructor is specified first, we can consider `True` to be greater than `False`.

In the `Maybe a` data type, the `Nothing` value constructor is specified before the `Just` value constructor.


We can use algebraic data types to make enumerations with the `Enum` and `Bounded` typeclasses.

```haskell
data Day = Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday   
           deriving (Eq, Ord, Show, Read, Bounded, Enum)  
```

`Day` can be made part of the `Enum` typeclass because all the value constructors are nullary, taking no parameters.

```haskell
> show Wednesday
> "Wednesday"
> read "Saturday" :: Day
> Saturday
> Saturday > Friday
> True
> minBound :: Day
> Monday
> succ Monday
> Tuesday
> [Thursday .. Sunday]
> [Thursday, Friday, Saturday, Sunday]
```

### Type synonyms

Type synonyms allow giving different names to complex types.

```haskell
type String = [Char]
```

We are not actually defining a new type, only creating a synonym for an existing one.

In the same way that functions can be partially applied, type parameters can also be partially applied

```haskell
type IntMap v = Map Int v
```

or

```haskell
type IntMap = Map Int
```

The `Either` data type takes two types as its parameters.

```haskell
data Either a b = Left a | Right b deriving (Eq, Ord, Read, Show)
```

`Either` is useful to return a value and a possinle error.


### Recursive data structures

We can make types whose constructors have fields that are of the same type.

```haskell
data List a = Empty | Cons a (List a) deriving (Show, Read, Eq, Ord)
```

This list definition is either empty or a combination of a head value and a list.
`Cons` is another word for `:`.

We can define functions to be automatically infix by making them comprised of special characters.

```haskell
infixr 5 :-:
data List a = Empty | a :-: (List a) deriving (Show, Read, Eq, Ord)
```

When we define functions as operators, we can give them a fixity.
The fixity states the associativity and the strength of the binding.

```haskell
> 3 :-: 4 :-: 5 :-: Empty
> (:-:) 3 ((:-:) 4 ((:-:) 5 Empty))
```

When deriving `Show` for the type, Haskell will display it as if the constructor was a prefix function.

#### Binary search tree

```haskell
data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)
```

Instead of manually building a tree, we can make a function that takes a tree and an element and inserts an element.

```haskell
singleton :: a -> Tree a
singleton x = Node x EmptyTree EmptyTree

treeInsert :: (Ord a) => a -> Tree a -> Tree a
treeInsert x EmptyTree = singleton x
treeInsert x (Node a left right)
  | x == a = Node x left right
  | x < a  = Node a (treeInsert x left) right
  | x > a  = Node a left (treeInsert x right)

treeElem :: (Ord a) => a -> Tree a -> Bool
treeElem :: x EmptyTree = False
treeElem :: x (Node a left right)
  | x == a = True
  | x < a = treeElem x left
  | x > a = treeElem x right
```

We can use a fold to build up a tree from a list.

```haskell
> let nums = [8,6,4,1,7,3,5]
> let numsTree = foldr treeInsert EmptyTree nums
> numsTree
> Node 5 (Node 3 (Node 1 EmptyTree EmptyTree) (Node 4 EmptyTree EmptyTree)) (Node 7 (Node 6 EmptyTree EmptyTree) (Node 8 EmptyTree EmptyTree))  
```

### Typeclasses

The `Eq` typeclass is defined as follows

```haskell
class Eq a where
  (==) :: a -> a -> Bool
  (/=) :: a -> a -> Bool
  x == y = not (x /= y)
  x /= y = not (x == y)
 ```

```haskell
data TrafficLight = Red | Yellow | Green

instance Eq TrafficLight where
  Red == Red = True
  Green == Green = True
  Yellow == Yellow = True
  _ == _ = False
```

While `Eq` could have been implemented automatically, the code above demonstrates how it can be implemented by hand.

The `instance` keyword is for making type instancs of typeclasses.
Because `==` was defined in terms of '/=' and vice versa in the class declaration, we only had to overwrite one of them in the instance.

```haskell
instance Show TrafficLight where
  show Red = "Red light"
  show Yellow = "Yellow light"
  show Green = "Green light"
```

Typeclasses can also be subclasses of other typeclasses.

```haskell
class (Eq a) => Num a where
```

This states that we have to make a type an instnace of `Eq` before it can be made an instance of `Num`.

In the declaration of `Eq` we can see that `a` is used as a concrete type because all the types in functions have to be concrete types.
For `Maybe` we must write

```haskell
instance Eq (Maybe m) where
  Just x == Just y = x == y
  Nothing == Nothing = True
  _ == _ = False
```

We must also ensure that `m` is an instance of `Eq` to allow it to be compared.

```haskell
instance (Eq m) => Eq (Maybe m) where
  ...
```

Most of the time, class constraints in class declarations are used for making a typeclass a subclass of another typeclass and class constraints in instance declarations are used to express requirements about the contents of some type.

The `:info` command can be used to display information about a typeclass.


### Yes-No typeclass

In some weakly typed languages, anything can be passed to a conditional expression.
In JavaScript, non empty strings, and non 0 numbers are considered to be `True`.

We could implement this in Haskell

```haskell
class YesNo a where
  yesno :: a -> Bool

instance YesNo Int where
  yesno 0 = False
  yesno _ = False

instance YesNo [a] where
  yesno [] = False
  yesno _ = True

instance YesNo Bool where
  yesno = id
-- id is a standard library function which takes a parameter and returns the same thing

instance YesNo (Maybe a) where
  yesno (Just _) = True
  yesno Nothing = False
```

```haskell
> yesno $ length []
> False
> yesno "test"
> True
> yesno ""
> False
> :t yesno
> Yesno :: (YesNo a) => a -> Bool
```

We can now create a function that mimics the if statement, but works with `YesNo` values

```haskell
yesnoIf :: (YesNo y) => y -> a -> a -> a
yesnoIf yesnoVal yesResult noResult = if yesno yesnoVal then yesResult else noResult
```

### The Functor typeclass

```haskell
class Functor f where
  fmap :: (a -> b) f a -> f b
```

The `Functor` typeclass defines a single function, `fmap`.
`f` is not a concrete type, but a type constructor that takes one parameter.
`fmap` takes a function from one type to another and a functor applied with one type and returns a functor applied with another type.

The list is an instance of the `Functor` typeclass

```haskell
instance Functor [] where
  fmap = map
```

We didn't write `instance Functor [a]` because from `fmap :: (a -> b) -> f a -> f b` we see that the `f` has to be a type constructor that takes one type.
`[a]` is a concrete type, while `[]` is a type constructor that takes one type.

Types that can act like a box can be functors.
`Maybe` can act like a box, holding `Just <something>` or `Nothing`.

```haskell
instance Functor Maybe where
  fmap f (Just x) = Just (f x)
  fmap f Nothing = Nothing
```

Again we did not specify a type. `Functor` wants a type constructor that takes one type and not a concrete type.

The `Tree a` can be mapped over and made an instance of Functor.

```haskell
instance Functor Tree where
  fmap f EmptyTree = EmptyTree
  fmap f (Node x leftsub rightsub) = Node (f x) (fmap f leftsub) (fmap f righsub)
```

The `fmap` function for `Tree` recursively applies `f` to each of the items in the `Tree`.

```haskell
> fmap (*4) (foldr treeInsert EmptyTree [5,7,3,2,1,7])
> Node 28 (Node 4 EmptyTree (Node 8 EmptyTree (Node 12 EmptyTree (Node 20 EmptyTree EmptyTree)))) EmptyTree  
```

Now consider `Either a b`.
The `Functor` typeclass wants a type constructor that takes only one type parameter, but `Either` takes two.
We can partially apply `Either` by feeding it only one parameter, so that it has one free parameter.

```haskell
instance Functor (Either a) where
  fmap f (Right x) = Right (f x)
  fmap f (Left x) = Left x
```

`Either a` is a type constructor that takes one parameter.
The type signature for this specific `fmap` will be `(b -> c) -> Either a b -> Either a c`
In the implementation, we mapped in the case of a `Right` value constructor but not in the case of a `Left`.

If we wanted to map one function over both of them, `a` and `b` would have to be the same type.

Maps from `Data.Map` can also be made a functor because they hold values. `fmap` will map a function `v -> v'` over a map of type `Map k v` and return a map of type `Map k v'`.

Functors should obey some laws.

* `fmap id = id`
* `fmap (g . f) = fmap g . fmap f`


### Kinds

Functions are also values because we can pass them etc.
Types are like labels carried by values so that we can reason about them.
Types have their own labels called **kinds**.
A **kind** is something like the type of a type.

```haskell
> :k Int
> Int :: *
```

A `*` means that the type is a concrete type, a type without type parameters.

```haskell
> :k Maybe
> Maybe :: * -> *
```

The `Maybe` constructor takes one concrete type, and then returns a concrete type.

```haskell
> :k Maybe Int
> Maybe Int :: *
```

We use `:k` on a type to get its kind, just like `:t` on a value to get its type.

```haskell
> :k Either
> Either :: * -> * -> *
> :k Either Int
> Either Int :: * -> *
```

`Either` takes two concrete types as type parameters to produce a concrete type.
A partially applied either takes a single concrete type to produce a concrete type.

```haskell
class Tofu t where
  tofu :: j a -> t a j
```
Because `j a` is used as the type of a value that the `tofu` function takes as its parameter, `j a` has to have a kind of `*`.
We assume `*` for `a` so we can infer that `j` has to have a kind of `* -> *`.
We see that `t` has to produce a concrete value to, and that it takes two types.

Knowing that `a` has a kind of `*` and `j` has a kind of `* -> *`, we infer that `t` has to have a kind of `* -> (* -> *) -> *`.
So, it takes a concrete type (`a`), a type constructor that takes one concrete type (`j`) and produces a concrete type.

```haskell
data Frank a b = Frank {frankField :: b a} deriving (Show)
```

This type has a kind of `* -> (* -> *) -> *`.
Fields in algebraic data types are made to hold values, so the must be of kind `*`.
We assume `*` for `a`, which means that `b` takes one type parameter and so its kind is `* -> *`.
We now see that `Frank` has a kind of `* -> (* -> *) -> *`.

```haskell
> :t Frank {frankField = Just "String"}
> Frank {frankField = Just "String"} :: Frank [Char] Maybe
> :t Frank {frankField = "String"}
> Frank {frankField = "String"} :: Frank Char []
```

Because `frankField` has a type of form `a b`, its values must have types that are of a similar form as well.
They can be `Just "String"`, which has a type of `Maybe [Char]`, or they can have a value of `['S', 't', 'r', 'i', 'n', 'g']` which has a type of `[Char]`.

Making `Frank` an instance of `Tofu` is quite simple.
`tofu` takes a `j a`, and returns a type of `t a j`

```haskell
instance Tofu Frank where
  tofu x = Frank x
```

```haskell
> tofu (Just 'a') :: Frank Char Maybe
> Frank {frankField = Just 'a'}
> tofu ["HELLO"] :: Frank [Char] []
> Frank {frankField = ["HELLO"]}
```

This has no real use.
A more complicated type is:

```haskell
data Barry t k p = Barry { yabba :: p, dabba :: t k}
```

Now we want to make it an instance of `Functor`.
`Functor` wants types of kind `* -> *`

It is safe to assume that `p` is a concrete type, and thus has a kind of `*`.
For `k`, we assume `*`, and so `t` has a kind of `* -> *`.


`Barry` has a kind of `(* -> *) -> * -> * -> *`.

Now we can make this type a part of `Functor`.
We have to partially apply the first two type parameters, so that we are left with `* -> *`.

This means that the start of the instance declaration will be `instance Functor (Barry a b) where`.
Considering `fmap` specifically for `Barry`, it would have type `fmap :: (a -> b) -> Barry c d a -> Barry c d b` when the `Functor`'s `f` is replaced with `Barry c d`.

```haskell
instance Functor (Barry a b) where
  fmap f (Barry {yabba = x, dabba = y}) = Barry {yabba = f x, dabba = y}
```

## Input and output

The function `putStrLn` prints a string

```haskell
> :t putStrLn
> putStrLn :: String -> IO ()
```

`putStrLn` takes a string and returns an IO action, that has a result type of `()`.
An IO action is something that, when performed, will carry out an action with a side-effect, and will also contain some kind of return value.
Printing a string doesn't have a meaningful return value, so an empty tuple is returned.

An IO action will be performed when we give it a name of `main` and then run our program.

```haskell
main = do
  putStrln "Hello, what is your name?"
  name <- getLine
  putStrLn ("Hello" ++ name)
```

`main` always has a type signature of `main :: IO <type>` where `<type>` is some concrete type.
By convention, we do not usually specify a type declaration for `main`.

`getLine` reads a line from the input, it has a type `getLine :: IO String`.

The line `name <- getLine` can be read as perform the IO action and then bind its result to `name`.
As `getLine` has a type `IO String`, `name` will have a type of `String`.

We can only take the data from `getLine` with `<-` from within another IO action.
`getLine` is impure because its result value is not guaranteed to be the same when performed twice.

In a `do` block, the last action cannot be bound to a name.

IO actions will only be performed when they are given a name of `main` or when they are inside a bigger IO faction that we composed with a `do` block.

```haskell
main = do
  line <- getLine
  if null line
    then return ()
    else do
      putStrLn $ reverseWords line
      main

reverseWords :: String -> String
reverseWords = unwords . map reverse . words
```

The program above reads input and reverses it until a blank line is input.

In an IO `do` block, ifs have to have a form of `if condition then IO action else IO action`.

Because we have to do exactly one IO action after the else, we use a `do` block to glue together two IO actions into one.

### Haskell return

While `return` in most languages ends execution of a method or subroutine, in Haskell (IO actions specifically), it makes an IO action out of the pure value.
Using `return` **does not** cause the IO `do` block to end execution.
All these returns do is make IO actions that don't do anything.
We can use `return` in combination with `<-` to bind to names.

```haskell
main = do
  a <- return "String"
  b <- return "gnirtS"
  putStrLn $ a ++ " " ++ b
```

When dealing with IO blocks we mostly use `return` either because we need to create an IO action that does not do anything or because we do not want the IO action that is made up from a `do` block to have the result value of its last action.

### IO functions

**putStr** takes a string as a parameter and returns an IO action that will print without a newline

**putChar** takes a character as a parameter and returns an IO action that will print it

**print** takes a value of a type that is an instance of `Show`, and prints it

**getChar** an IO action that reads a character form input. Reading does not happen until the user presses the enter key

**when** is found in `Control.Monad`. In a `do` block it appears like a control flow statement, but it is a function. It takes a boolean value and an IO action. If the boolean value is `True`, it returns the same IO action passed to it, otherwise it returns the `return ()` action.

**sequence** takes a list of IO actions and returns an IO action which will perform all of the Io actions in the list. `sequence :: [IO a] -> IO [a]`

**mapM** and **mapM_** `mapM` takes a function and a list, maps the function over the list and then sequences it, `mapM_` does the same except that it throws away the result later. `mapM_` is used when we do not care what result our sequenced IO actions have

**forever** located in `Control.Monad`, takes an IO action and returns an IO action that repeats the IO action forever

**forM** located in `Control.Monad`, is like `mapM` except that it has its parameters switched around. The first parameter is the list and the second is the function to map over that list, which is then sequenced

```haskell
import Control.Monad

main = do
  colors <- forM [1,2,3,4] (\a -> do
    putStrLn $ "Which color do you associate with the number " ++ show a ++ "?"
    color <- getLine
    return color)
  putStrLn "The collors that you associate with 1, 2, 3, and 4 are: "
  mapM putStrLn colors
```

The `(\a -> do ...)` is a function that takes a number and returns an IO action. We have to surround it with parentheses, otherwise the lambda thinks the last two IO actions below to it.
We do `return color` in the inside `do` block. We do that so that the IO action which the `do` block defines has the result of our color contained within it.
We could have left the last line as `getLine`.

The `forM` called with its two parameters, produces an IO action, whose result we bind to `colors`.
`colors` is just a list of strings. At the end we print out those strings with `mapM putStrLn colors`.

`forM` can be thought of as meaning 'make an IO action for every element in this list, perform those actions and bind their results to something'.

### Files and streams

`getContents` is an IO action that reads everything from the standard input until it encounters an end-of-file character.

Its type is `getContents :: IO String`.
`getContents` does lazy IO.

The pattern of getting some string from the input, transforming it with a function, and then outputting the result is so common that there exists a function for it.

**interact** takes a function of type `String -> String` as a parameter and returns an IO action that will take some input run that function on it and then print out the function's result.

```haskell
main = interact shortLinesOnly

shortLinesOnly :: String -> String
shortLinesOnly input =
  let allLines = lines input
    shortLines = filter (\line -> length line < 10) allLines
    result = unlines shortLines
  in result
```

We could write thie in a less readable manner

```haskell
main = interact $ unlines . filter ((<10) . length) . lines
```

`interact` can be used to make programs that are piped some contents into them and then dump some result out, or it can be used to make programs that appear to take a line of input from the user, give back some result and then take another line and so on.

```haskell
respondPalindromes contents = unlines (map (\xs ->
  if isPalindrome xs then "palindrome" else "not a palindrome") (lines contents))
  where isPalindrome xs = xs == reverse xs

main = interact respondPalindromes
```

**openFile** has a type signature `openFile :: FilePath -> IOMode -> IO Handle`

`FilePath` is a type synonym for `String`.
`IOMode` is a type defined as

```haskell
data IOMode = ReadMode | WriteMode | AppendMode | ReadWriteMode
```

The function returns an IO action that will open the specified file in the specified mode. If we bind that action to something we get a `Handle`.
A value of type `Handle` represents where the file is.

**hGetContents** takes a `Handle` and returns an `IO String`, an `IO` action that holds as its results the contents of the file.

Files handles must be closed with `hClose`, which returns an IO action that closes the file.

**withFile** has a type signature `withFile :: FilePath -> IOMode -> (Handle -> IO a) -> IO a`.
It takes a path to a file, an `IOMode` and a function that takes a handle and returns some IO actions.
It returns an IO action that will open the file, do something with it and then close it.

```haskell
import System.IO

main = do
  withFile "test.txt" ReadMode (\handle -> do
    contents <- hGetContents handle
    putStr contents)
```

An alternate `withFile` could be written as

```haskell
withFile' :: FilePath -> IOMode -> (Handle -> IO a) -> IO a
withFile' path mode f = do
  handle <- openFile path mode
  result <- f handle
  hClose handle
  return result
```

**hGetLine**, **hPutStr**, **hPutStrLn**, **hGetChar**, work like their counterparts without the **h**, except that they take a handle as a parameter and operate on that specific file instead of operating on standard input or output.

**readFile** has a type signature `readFile :: FilePath -> IO String`. It lazily loads a file as a string. As there is no handle, it does not have to be closed manually.

**writeFile** has a type signature of `writeFile :: FilePath -> String -> IO ()`. It takes a path to a file and a string to write to that file and returns an IO action that will do the writing. If a file exists already, its contents will be erased.

**appendFile** has a type signature just like `writeFile`, but it does not erase the pre-existing file.

**hFlush** takes a handle and returns an IO action that will flush the buffer of the file associated with the handle. This causes any items buffered for output to be immediately sent to the operating system

**openTempFile** Takes a path to a temporary directory and a template name for a file and opens a temporary file.

Calling `openTempFile "." "temp"` will open a temporary file in the current directory with the name "temp" plus some random characters.

**removeFile** takes a path and deletes it

**renameFile** renames a file at a path

### Command line arguments

The `System.Environment` module as IO actions for dealing with arguments.

**getArgs** has type `getArgs :: IO [String]`.

**getProgName** has a type of `getProgName :: IO String`

```haskell
import System.Environment
import Data.List

main = do
  args <- getArgs
  progName <- getProgName
  putStrLn "The arguments are: "
  mapM putStrLn args
  putStrLn "The program name is: "
  putStrLn progName
```

```
$ ./arg-test first second third "multi word argument"
The arguments are:
first
second
third
multi word arguments
The program name is:
arg-test
```

#### TODO

We can now write a program to manage tasks.

- View tasks
- Add tasks
- Delete tasks

```haskell
import System.Environment
import System.Directory
import System.IO
import Data.List

dispatch :: [(String, [String] -> IO ())]
dispatch = [ ("add", add)
           , ("view", view)
           , ("remove", remove)
            ]
```

We now need to define `main`, `add`, `view`, and `remove`.

```haskell
main = do
  (command:args) <- getArgs
  let (Just action) = lookup command dispatch
  action args
```

First we get the arguments, and split them into the command and its arguments.
We then look up our command in the dispatch list, and call it with the arguments.

```haskell
add :: [String] -> IO ()
add [fileName, todoItem] = appendFile fileName (todoItem ++ "\n")
```

```haskell
view :: [String] -> IO ()
view [fileName] = do
  contents <- readFile fileName
  let todoTasks = lines contents
      numberedTasks = zipWith (\n line -> show n ++ " - " ++ line) [0..] todoTasks
  putStr $ unlines numberedTasks
```

```haskell
remove :: [String] -> IO ()
remove [fileName, numberString] = do
  handle <- openFile fileName ReadMode
  (tempNam, tempHandle) <- openTempFile "." "temp"
  contents <- hGetContents handle
  let number = read numberString
      todoTasks = lines contents
      newTodoItems = delete (todoTasks !! number) todoTasks
  hPutStr tempHandle $ unlines newTodoItems
  hClose handle
  hClose tempHandle
  removeFile fileName
  rename tempName fileName
```

We opened the file, added a temporary file, deleted the line with the index, wrote the result to a temporary file, removed the original file, and renamed the temporary file to the original file name.


### Randomness

The `System.Random` module has all the functions needed for randomness.

**random** has type `random :: (RandomGen g, Random a) => g -> (a, g)`

The `RandomGen` typeclass is for types that can act as sources of randomness.
The `Random` typeclass is for things that can take random values.

`System.Random` exports a random generator called `StdGen`.
To manually make a random generator, use the `mkStdGen` function, which takes an `Int`.


```haskell
> random (mkStdGen 100) :: (Int, StdGen)
> (-1352021624,651872571 1655838864)
```

The first component of the tuple is our random number, whereas the second component is a textual representation of our new random generator.

We use the type annotation to get different types.

```haskell
> random (mkStdGen 949488) :: (Float, StdGen)  
> (0.8938442,1597344447 1655838864)  
> random (mkStdGen 949488) :: (Bool, StdGen)  
> (False,1485632275 40692)  
> random (mkStdGen 949488) :: (Integer, StdGen)  
> (1691547873,1597344447 1655838864)  
```

We use the returned generator to produce new random values.

```haskell
threeCoins :: StdGen -> (Bool, Bool, Bool)
threeCoins gen =
  let (first, newGen) = random gen
      (second, newGen') = random newGen
      (third, newGen'') = random newGen'
  in (first, second, third)
```

**randoms** takes a generator and returns an infinite sequence of values based on that generator

It could be written as

```haskell
randoms' :: (RandomGen g, Random a) => g -> [a]
randoms' gen = let (value, newGen) = random gen in value:randoms' newGen
```

We could generate a finite stream of random numbers as follows

```haskell
finiteRandoms :: (RandomGen g, Random a, Num n) => n -> g -> ([a], g)
finiteRandoms 0 gen = ([], gen)
finiteRandoms n gen =
  let (value, newGen) = random gen
      (restOfList, finalGen) = finiteRandoms (n-1) newGen
  in (value:restOfList, finalGen)
```

**randomR** creates a random value within a given range, it has type signature `randomR :: (RandomGen g, Random a) :: (a, a) -> g -> (a, g)`

**randomRs** produces a stream of random values defined within a range

In order to generate different random numbers each time the program is run, we use `getStdGen` which has a type of `IO StdGen`.
It asks the system for a good random number generator and stores that in a "global generator".

Another method is **newStdGen**, which splits the current generator into two generators, updating the global generator with one of them and encapsulating the other as its result.

### ByteStrings

Processing files as strings tends to be slow.

`ByteString`s are similar to lists, except that each element is one byte, and laziness is handled differently.

Strict ByteStrings reside in `Data.ByteString` and they are not lazy.
There is less overhead because there are no thunks, but they use more memory which might not be necessary.

Lazy ByteStrings reside in `Data.ByteString.Lazy`. They are lazy, but not as lazy as lists.
In a list there are as many thunks as there are elements.
ByteStrings are stored in chunks of 64K, each of which have thunk.

**pack** has type signature `pack :: [Word8] -> ByteString`. It takes a list of bytes of type `Word8` and returns a `ByteString`

**unpack** converts a ByteString to a list of bytes

**fromChunks** takes a list of strict ByteStrings and converts them to a lazy ByteString

**toChunks** takes a lazy ByteString and converts it into a list of strict ones

The ByteString version of `:` is called `cons`. It takes a byte and a ByteString and puts the byte at its beginning.
It is lazy and will make a new chunk even if the first chunk in the ByteString is not full.

`cons'` is strict and will not make a new chunk unless necessary.

**empty** makes an empty ByteString

The `ByteString` module has other functions analogous to those in `Data.List`.

### Exceptions

Despite having expressive types that support failed computations, Haskell still has support for exceptions because they make more sense in IO contexts.

Pure code can throw exceptions, but they can only be caught in the IO part of the code.
This is because you do not know when (or if) anything will be evaluated in pure code, because it is lazy and does not have a well-defined order of execution, whereas IO code does.

#### IO exceptions

IO exceptions are exceptions that are caused when there is an error while communicating outside of the program.

When opening a file we can use `doesFileExist` from `System.Directory` before opening the file.

To handle IO exceptions we can use the `catch` function from `System.IO.Error` which has type signature `catch :: IO a -> (IOError -> IO a) -> IO a`.
The first parameter is an IO action, the second is a handler function which handles the `IOError`.


```haskell
import System.Environment
import System.IO
import System.IO.Error

main = toTry `catch` handler

toTry :: IO ()
toTry = do (fileName:_) <- getArgs
           contents <- readFile fileName
           putStrLn $ "The file has " ++ show (length (lines contents)) ++ " lines."

handler :: IOError -> IO ()
handler e = putStrLn "Error reading file"
```

There are several predicates that act on IOError

- **isAlreadyExistsError**
- **isDoesNotExistError**
- **isAlreadyInUseError**
- **isFullError**
- **isEOFError**
- **isIllegalOperation**
- **isPermissionError**
- **isUserError**

`System.IO.Error` also exports functions that enable us to ask our exceptions for some attributes.
Each function starts with `ioe`, and can be found [here](https://downloads.haskell.org/~ghc/6.10.1/docs/html/libraries/base/System-IO-Error.html#3).

## Functionally solving problem s

### Reverse Polish notation calculator

We want to take a string as a parameter and produce a numeric value as a result `solveRPN :: (Num a) => String -> a`.

Take the RPN string "10 4 3 + 2 * -".

- We push 10 to the stack [10]
- We push 4 to the stack [10, 4]
- We push 3 to the stack [10, 4, 3]
- We reach '+' so we pop the top two items from the stack, apply the operator and push the result to the stack [10, 7]
- We push 2 to the stack [10, 7, 2]
- We reach '\*' so we pop the top two items from the stack, apply the operator and push the result to the stack [10, 14]
- We reach the '-' so we pop the top two items from the stack, apply the operator and push the result to the stack [-4]

As we are effectively traversing a list form left to right and building up a result, we can apply a fold.

The function may look like

```haskell
import Data.List

solveRPN :: (Num a) => String -> a
solveRPN expression = head (foldl foldingFunction [] (words expression))
  where foldingFunction stack item = ...
```

The accumulator is our stack, which is initially empty.
We are folding over the input string split into words.

```haskell
solveRPN :: (Num a, Read a) => String -> a  
solveRPN = head . foldl foldingFunction [] . words  
  where foldingFunction (x:y:ys) "*" = (x * y):ys  
        foldingFunction (x:y:ys) "+" = (x + y):ys  
        foldingFunction (x:y:ys) "-" = (y - x):ys  
        foldingFunction xs numberString = read numberString:xs  
```

This function can be easily modified to support more operators.


### Pathfinding

There are two main roads and a number of regional roads crossing between them.
It takes a fixed amount of time to travel from one point to another.

```
A-50-A1--5-A2-40-A3-10-
     |     |     |
     30    20    25
     |     |     |
B-10-B1-90-B2--2-B3--8-
```

The input for this case can be represented as

```
50
10
30
5
90
20
40
2
25
10
8
0
```

The input file can be read in threes.

Finding the shortest path to the first crossroad is trivial.
We can see that it is faster to move from B to B1 and then to A1 than to travel from A to A1.

We now know that the fastest path to A1 is 40, and the fastest path to B1 is 10.

We can now consider A2 and B2.
A2 can be reached either by moving forward from A1, or moving forward from B1 and then crossing over.
It takes 40 to get to A1, and then 5 from A1 to A2, for a total of 45 which is less than the total of 110 from B to B1 to B2 to A2.

Considering B2, it takes 65 to travel from A1 to A2 to B2, and 100 to travel from B to B1 to A2.

We can repeat this process until we reach the end.
Once we get to the end the faster route is the optimal path.

We need to represent the road system with Haskell's data types.

```haskell
data Section = Section { getA :: Int, getB :: Int, getC :: Int} deriving (Show)
type RoadSystem = [Section]
```

`Section` is a simple algebraic data type that holds three integers for the lengths of its three road parts.

Our road system can now be represented as follows

```haskell
system :: RoadSystem
system = [Section 50 10 30, Section 5 90 20, Section 40 2 25, Section 10 8 0]
```

```haskell
data Label = A | B | C deriving (Show)
type Path = [(Label, Int)]
```

We will create a function with a type declaration `optimalPath :: RoadSystem -> Path`.

We will walk over the list with the sections from left to right and keep the optimal path on A and optimal path on B as we go along.
We will accumulate the best path as we walk over the list, left to right.

We repeatedly check the optimal step.
Consider `Section 50 10 30`. We conclude that the new optimal path to A1 is `[(B, 10),(C, 30)]` and the optimal path to B1 is `[(B, 10)]`.
Considering this step as a function it has a type signature `(Path, Path) -> Section -> (Path, Path)`.

```haskell
roadStep :: (Path, Path) -> Section -> (Path, Path)  
roadStep (pathA, pathB) (Section a b c) =   
    let priceA = sum $ map snd pathA  
        priceB = sum $ map snd pathB  
        forwardPriceToA = priceA + a  
        crossPriceToA = priceB + b + c  
        forwardPriceToB = priceB + b  
        crossPriceToB = priceA + a + c  
        newPathToA = if forwardPriceToA <= crossPriceToA  
                        then (A,a):pathA  
                        else (C,c):(B,b):pathB  
        newPathToB = if forwardPriceToB <= crossPriceToB  
                        then (B,b):pathB  
                        else (C,c):(A,a):pathA  
    in  (newPathToA, newPathToB)  
```

```haskell
optimalPath :: RoadSystem -> Path
optimalPath roadSystem =
  let (bestAPath, bestBPath) = foldl roadStep ([],[]) roadSystem
  in if sum (map snd bestAPath) <= sum (map snd bestBPath)
    then reverse bestAPath
    else reverse bestBPath
```

## Functors, Applicative Functors, and Monoids

`IO` is an instance of `Functor`. When we `fmap` a function over an IO action, we want to get back an IO action that does the same thing, but has our function applied over its result value.

```haskell
instance Functor IO where
  fmap f action = do
    result <- action
    return (f result)
```

The result of mapping over an IO action will be an IO action, so we use the `do` syntax to glue two actions and make a new one.
We bind the value of `action` and then `return` `f result`, where `return` simply creates an IO action to present the result.

```haskell
main = do line <- getLine
          let line' = reverse line
          putStrLn $ "Reversed " ++ line'
```

Can be written with `fmap` as 

```haskell 
main = do line <- fmap reverse getLIne 
        putStrLn $ "Reversed" ++ line

```

In the same way that we can apply a function to some value residing inside a `Maybe`, we can apply a function to something residing inside an `IO`. 

Another common instance of `Functor` is `(->) r`. 
The function type `r -> a` can be written as `(->) r a`, so `(->) r` is a partial application, a type constructor which only takes one parameter and can therefore be an instance of `Functor`. 

In `Control.Monad.Instances` we can see the implementation of functions as `Functor`s. 

```haskell 
instance Functor ((->) r) where 
  fmap f g = (\x -> f (g x))
```

Considering `fmap`'s type, `fmap :: (a -> b) -> f a -> f b`, and replacing each of the `f`'s we have `fmap :: (a -> b) -> ((->) r a) -> ((->) r  b)`, and writing in infix we finally have `fmap :: (a -> b) -> (r -> a) -> (r-> b)`.

Mapping a function over a function has to produce a function. 
This is function composition again. We pipe the output of `r -> a` into `a -> b` giving a function from `r -> b`. 

This could be written as follows 

```haskell 
instance Functor ((->) r) where 
  fmap = (.)
```

We can call `fmap` as an infix function, making its resemblance to `.` clear. 

If we take a function `a ->b` and return `f a -> f b` this is called lifting a function.

```haskell 
> :t fmap (*2)
> fmap (*2) :: (Num a, Functor f) => f a -> f a
> :t fmap (replicate 3)
> fmap (replicate 3) :: (Functor f) => f a -> f a
```

The expression `fmap (*2)` is a function that takes a functor `f` over numbers and returns a functor over numbers. That functor could be a list, a `Maybe`, or any other functor type. 

### Applicative functors 

Applicative functors are represented by the `Applicative` typeclass found in `Control.Applicative`. 

```haskell 
> :t fmap (++) (Just "string")
> fmap (++) (Just "string") :: Maybe ([Char] -> [Char])
> :t fmap compare (Just 'a')
> fmap compare (Just 'a') :: Maybe (Char -> Ordering)
> :t fmap compare "List of characters."
> fmap compare "List of characters." :: [Char -> Ordering]
> :t fmap (\x y z -> x + y / z) [3,4,5,6]
> fmap (\x y z -> x + y / z) [3,4,5,6] :: (Fractional a) => [a -> a -> a]
```

If we map `compare`, which has a type of `(Ord a) => a -> a -> Ordering` over a list of characters, we get a list of functions of type `Char -> Ordering`, because the funtion `compare` gets partially applied with the characters in the list. It is not a list of `(Ord a) => a -> Ordering` function, because the first `a` that was applied was a `Char` so the second `a` must be of the same type. 

By mapping "multiple parameter" functions over functors, we get functors which  contain functions inside them. 
We can map functions that takes these functions as a parameter over them, because whatever is inside a functor will be given to the function that we're mapping over as its parameter. 

```haskell 
> let a = fmap (*) [1,2,3,4]
> :t a 
> a :: [Integer -> Integer] 
> fmap (\f -> f 9) a
> [9,18,27,36]
```

If we have a functor value of `Just (3 *)` and another functor value of `Just 5`, and we wish to apply the function in the first `Just` to the value in the second, we would normally be stuck, as regular functors just support mapping regular functions over existing functors. 
We could pattern match against the `Just` constructor to get the function out, but we want a more general and abstract way of doing that. 

This is where `Applicative` is used. 

It provides two methods, `pure`, and `<*>`, without a default implementation for either of them. 

```haskell 
class (Functor f) => Applicative f where 
  pure :: a -> f a 
  (<*>) :: f (a -> b) -> f a -> f b
```

The first line starts the definition of `Applicative` and introduces a class constant. It states that for a type constructor to be part of `Applicative`, it must first be part of `Functor`. 

The first method defined is `pure`. It plays the role of our applicative functor instance here. 

`pure` should take a value of any type and return an applicative functor with that value "inside" it.

The `<*>` function has a similar type declaration to `fmap`. 
Whereas `fmap` takes a function and a functor and applies the function inside the functor, `<*>` takes a functor that has a function in it and another functor and "extracts" the function from the first functor and then maps it over the second one. 

```haskell 
instance Applicative Maybe where 
  pure = Just 
  Nothing <*> _ = Nothing 
  (Just f) <*> something = fmap f something
``` 

From the class definition we see that the `f` plays the role of the applicative functor should take one concrete type as a parameter, so we write `instance Applicative Maybe where` instead of `instance Applicative (Maybe a) where`.

First, `pure` is defined. It is written as `pure = Just` because value constructors like `Just` are normal functions. We could also write `pure x = Just x`. 

Next, `<*>` is defined. We cannot extract a function from `Nothing`, so we pattern match and return nothing.

If the first parameter is not a `Nothing`, then it is a `Just` with some function inside it. The function is extracted and fmap-ed over the second parameter. 

```haskell 
> Just (+3) <*> Just 9
> Just 12 
> pure (+4) <*> Just 10 
> Just 14 
> Just (++"string") <*> Nothing 
> Nothing 
> Nothing <*> Just "string"
> Nothing
```

`pure` can be used when dealing with `Maybe` values in an applicative context, otherwise we can just use `Just`. 

With normal functors, a function can be mapped over a functor and then the result cannot be extracted in any general way, even if the result is a partially applied function. 

Applicative functors alow you to operate on several functors with a single function 

```haskell 
> pure (+) <*> Just 3 <*> Just 5
> Just 8 
> pure (+) <*> Just 3 <*> Nothing
> Nothing 
```

`<*>` is left associative, which means that `pure (+) <*> Just 3 <*> Just 5` is the same as `(pure (+) <*> Just 3) <*> Just 5`.

First the `(+)` function is put in a functor, which in this case is just a `Maybe` value, giving `Just (+) <*> Just 3`, the result of which is `Just (3+)`, a partial application.
Finally, the rest of the calculation is carried out to give `Just 8`.

Applicative functors allows us to take a function that expects parameters that are not necessarily wrapped in functors and use that function to operate on several values that are in functor contexts. 

This is even more useful when we consider that `pure f <*> x` is equal to `fmap f x`, one of the applicative laws. 

`pure` puts a value in a default context. If we just put a function in a default context and then extract and apply it to a value inside another applicative functor, we did the same as mapping that function over that applicative functor. 

`Control.Applicative` therefore exports a function called `<$>`, which is just `fmap` as an infix operator. 

```haskell 
(<$>) :: (Functor f) => (a -> b) -> f a -> f b  
f <$> x = fmap f x  
```

Using `<$>` the applicative style looks much cleaner.

For regular values we might write `f x y z`, and for functors we write `f <$> <*> x <*> y <*> z`.

```haskell 
> (++) <$> Just "one" <*> Just "two" 
> Just "onetwo"
```

First `(++)`, which has a type of `[a] -> [a] -> [a]`, gets mapped over `Just "one"`, resulting in a value of `Just ("one"++)` with a type of `Maybe ([Char] -> [Char])`. 

Now the function is extracted form the `Just` and mapped over `Just "two"`, resulting in `Just "onetwo"`. 


List is also an instance of `Applicative` 

```haskell 
instance Applicative [] where 
  pure x = [x]
  fs <*> xs = [f x | f <- fx, x <- xs]
```

The minimal context for lists is `[]`. `pure` takes a value and puts it in a singleton list, the minimal context for a single value. 

Considering `<*>` for the list type we have `<*> :: [a -> b] -> [a] -> b`.
This is written as a list comprehension which draws from both lists, applying the function to the values until one or both lists are emptied. 

```haskell 
> [(*0), (+100), (^2)] <*> [1,2,3]
> [0,0,0,101,102,103,1,4,9]
```

If we have a list of functions that takes two parameters, we can apply those functions between two lists 

```haskell 
> [(+), (*)] <*> [1,2] <*> [3,4]
> [4,5,5,6,3,4,6,8]
```

Or we can use a normal function 

```haskell 
> (++) <$> ["abc", "def", "ghi"] <*> ["?", "!", "."]
> ["abc?", "abc!", "abc.", "def?", "def!", "def.", "ghi?", "ghi!", "ghi."]
```

Another instance of `Applicative` is `IO`. 

```haskell 
instance Applicative IO where 
  pure = return 
  a <*> b = do 
    f <- a 
    x <- b
    return (f x)
```

Since `pure` should place a value in a minimal context, it is just `return`.
If `<*>` were specialised for `IO` it would have type `(<*>) :: IO (a -> b) -> IO a -> IO b`.
It would take an IO action that yeilds a function as its result and another IO action and create a new IO action from those that, when performed, first performs the first one to get the function and then performs the second one to get the value, and then it would yield that function applied to the return value as its result. 

```haskell 
instance Applicative ((->) r) where
  pure x = (\_ -> x)
  f <*> g = \x -> f x (g x)
```

`pure` takes a value and creates a function that ignores its parameter and always returns that value. 

Calling `<*>` with two applictive functors results in an applicative functor, so if we use it on two functions, we get back a function. 
`(+) <$> (+3) <*> (*100)` makes a function that will use `+` on the results of `(+3)` and `(*100)` and return that. 

Another instance of `Applicative` is `ZipList`, which resides in `Control.Applicative`. 

Rather than applying each function to each value in a pair of lists, we might want to apply its function to the respective position in the second list. 

The `ZipList a` type was introduced because one type cannot have more than one instance. `ZipList` takes a single parameter, a list.

```haskell
instance Applicative ZipList where 
  pure x = ZipList (repeat x)
  ZipList fs <*> ZipList xs = ZipList (zipWith (\f x -> f x) fx xs)
``` 

`<*>` takes the parameters of the two `ZipList`s, performs a `zipWith` on them, and creates a new `ZipList` with the resulting list.

`ZipList a` does not have a `Show` instance, so we have to use `getZipList` to extract the list. 

`Control.Applicative` defines a function **liftA2** with a type of `liftA2 :: (Applicative f) => (a->b->c) -> f a -> f b -> f c`, which is defined as 

```haskell 
liftA2 :: (Applicative f) => (a -> b -> c) -> f a -> f b -> f c  
liftA2 f a b = f <$> a <*> b
``` 

It applies a function between two applicatives, hiding the applicative style. 

We can say that `liftA2` takes a normal binary function and promotes it to a function that operators on two functors. 

Applicative functor laws
- `pure id <*> v = v`
- `pure (.) <*> u <*> v <*> w = u <*> (v <*> w)`
- `pure f <*> pure x = pure (f x)`
- `u <*> pure y = pure ($ y) <*> u`

### The newtype keyword 

The `newtype` keyword is used when we want to take a type and wrap it in something to present it as another type. 

`ZipList` is defined as follows 

```haskell 
newtype ZipList a = ZipList { getZipList :: [a] }
```

Instead of `data`, `newtype` is used. 

`newtype` is faster than `data`, as it does not have the overhead of wrapping and unwrapping when the program is running. 
When `newtype` is used, Haskell knows that you are just wrapping an existing type into a new type and can get rid of the wrapping and unwrapping. 

`newtype` can only have one value constructor and that value constructor can only have one field. 

We can use the `deriving` keyword with `newtype` to derive instances for `Eq`, `Ord`, `Enum`, `Bounded`, `Show`, and `Read` if the type that we are wrapping belongs to that type class to begin with. 

#### Using newtype to make type class instances

We may want to make our types instances of certain typeclasses, but the type parameters may not match up for what we want to do. 

Suppose we want to make the tuple an instance of `Functor` such that when we `fmap` a function over the tuple, it gets applied to the first component of the tuple. `fmap (+3) (1, 1) = (4, 1)`.

To get around this we can `newtype` our tuple such that the second type parameter represents the type of the first component in the tuple 

```haskell 
newtype Pair b a = Pair { getPair :: (a, b) }
```

Now we make it an instance of `Functor` 

```haskell 
instance Functor (Pair c) where 
  fmap f (Pair (x, y)) = Pair (f x, y)
```

We can pattern match on types defined with `newtype`. 

#### newtype laziness 

Consider the following type 

```haskell 
data BoolData = BoolData { getBoolData :: Bool }
```

It has one value constructor, which has one field with type `Bool`. 

Now we define a function which takes a `BoolData` as an argument but ignores it. 

```haskell 
testFunction :: BoolData -> String 
testFunction (BoolData _) = "string"
```

Now we pass it `undefined`

```haskell 
> testFunction undefined
> Exception: Prelude.undefined
```

Because types defined with the `data` keyword can have multiple value constructors, Haskell has to evaluate it when checking that it conforms to the `(BoolData _)` pattern.

Instead of `data`, we now use `newtype`. 

```haskell 
> testFunction undefined
> "string"
```

When we use `newtype`, Haskell can internally represent the values of the new type in the same way as the original values. It does not have to add a wrapper around them, instead it only has to be aware of the values being of different types. 

Because Haskell knows that types made with the `newtype` keyword can only have one constructor, it does not have to evaluate the value passed to the function to make sure that it conforms to the pattern.

### Monoids 

Consider `*` which is a function that takes two numbers, and `++`. 
For `*`, there is the value `1` which can be placed on either side of the operator such that the result is equal to the other parameter.
For `++`, there is `[]` which will achieve the same thing. 

We can see that `*` and `1`, and `++` and `[]` share some properties 

- The function takes two parameters
- The parameters and the returned value have the same type 
- There exists such a value that doesn't change other values when used with the binary function

There is another, less obvious, property which is shared between the functions. 

When we have three or more values and we want to use the binary function to reduce them to a single resultant value, the order in which we apply the binary function to the values does not matter.

```haskell 
> (3 * 2) * (8 * 5)
> 240
> 3 * 2 * 8 * 5
> 240 
> "abc" ++ ("def" ++ "ghi")
> "abcdefghi"
> "abc" ++ "def" ++ "ghi"
> "abcdefghi"
```

This property is called **associativity**.

A monoid, defined in `Data.Monoid` is when you have an associative binary function and a value that acts as an identity with respect to that function. 

```haskell 
class Monoid m where 
  mempty :: m
  mappend :: m -> m -> m
  mconcat :: [m] -> m 
  mconcat = foldr mappend mempty
```

Only concrete types can be made instance of `Monoid`, because the `m` in the type class definition does not take any type parameters. 
The first function is `mempty`. As it does not take any parameters it is not really a function, it is instead a polymorphic constant.
`mempty` represents the identify value for a particular monoid. 

`mappend` is the binary function. It takes two values of the same type and produces a return value of that type. 

`mconcat` takes a list of monoid values and reduces them to a single value by doing `mappend` between the list's elements. 
It has default implementation which takes `mempty` as a starting value and folds right through the list.


#### Monoid laws 

- ``mempty `mappend` x = x``
- ``x `mappend` mempty = x``
- ``(x `mappend` y) `mappend` z = x `mappend` (y `mappend` z)``

The first two laws state that `mempty` has to act as the identity with repect to `mappend` and the third says that `mappend` has to be associative. 

#### Lists are monoids 

```haskell 
instance Monoid [a] where
  mempty = []
  mappend = (++)
```

Lists are an instance of the `Monoid` type class regardless of the type of the elements they hold. 

#### Other monoids

Numbers can also be monoids with the `+` function and an identify value of `0`.

The `Data.Monoid` module exports two types for product and sum 

```haskell
newtype Product a = Product { getProduct :: a } 
  deriving (Eq, Ord, Read, Show, Bounded)

instance Num a => Monoid (Product a) where 
  mempty = Product 1
  Product x `mappend` Product y = Product (x * y)
```

Another type which can act like a monoid in two distinct but equally valid ways is `Bool`. 

The first is through the `||` function with an identity value of `False`. 

The second is through the `&&` function with an identify value of `True`. 

```haskell 
instance Monoid Ordering where 
  mempty = EQ 
  LT `mappend` _ = LT 
  EQ `mappend` y = y 
  GT `mappend` _ = GT
```

```haskell 
instance Monoid a => Monoid (Maybe a) where
  mempty = Nothing 
  Nothing `mappend` m = m 
  m `mappend` Nothing = m 
  Just m1 `mappend` Just m2 = Just (m1 `mappend` m2)
```

#### Using monoids to fold data structures 

Because there are so many data structures that work nicely with folds, the `Foldable` type class was introduced. 

```haskell 
> :t foldr 
> foldr :: (a -> b -> b) -> b -> [a] -> b 
> :t Foldable.foldr 
> Foldable.foldr :: (Foldable.Foldable t) => (a -> b -> b) -> b -> t a -> b
```

Whereas `foldr` takes a list and folds it up, the `foldr` in `Data.Foldable` accepts any type that can be folded up. 


```haskell 
> F.foldl (+) 2 (Just 9)
> 11 
> F.foldr (||) False (Just True)
> True
```

The `Tree` type defined earlier is 

```haskell
data Tree a = Empty | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)  
```

One way to to make `Tree` an instance of `Foldable` is to implement the type constructor,however an easier way is to implement the `foldMap` function. 

```haskell 
foldMap :: (Monoid m, Foldable t) => (a -> m) -> t a -> m
```

The first parameter is a function that takes a value of the type that our `Foldable` structure contains, denoted `a`, and returns a monoid vlaue. Its second parameter is a foldable structure that contains a value of type `a`. 

It maps that function over the foldable structure, thus producing a foldable structure that contains monoid values. Then, by doing `mappend` betwen those monoid values it joins them all into a single monoid value. 

```haskell 
instance F.Foldable Tree where 
  foldMap f Empty = mempty 
  foldMap (f Node x l r) = F.foldMap f l `mappend` 
                           f x           `mappend`
                           F.foldMap f r 
```

We are providing a function which takes an element of the tree and returns a monoid value. 

The function recursively traverses the tree and uses `mappend` to join the monoids together. 


