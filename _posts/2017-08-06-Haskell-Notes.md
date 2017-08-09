---
layout: post
color: "#607d8b"
textcolor: "#FFFFFF"
tags: [Notes, Haskell, Functional]
---

**Notes from [learnyouahaskell](http://learnyouahaskell.com)**
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

{% highlight haskell %}
> take 10 naturals
> [1,2,3,4,5,6,7,8,9,10]
{% endhighlight %}

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
removeNonUpercase :: [Char] -> [Char]
removeNonUpercase st = [ c | c <- st, c `elem` ['A'..'Z']]
```

`removeNonUpercase` has a type of `[Char] -> [Char]` as it maps a string to a string.
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

**Double** A real floating point value with double preceision

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

The `fromIntegral` function has a type decleration of `fromInegral :: (Num b, Integral a) => a -> b`.
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
We cannot howver rewrite `(x:y:_)` with square brackets because it matches any list of length 2 or more.

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

Patterns are a method of breaking something up according to a pattern and binding it to names whilst still keeping a refernce to the whole thing.

`xs@(x:y:ys)` will match exactly the same thing as `x:y:ys` but the whole list can be accessed via `xs` instead of repeatedly typing `x:y:ys` within
the function body.

```haskell
capital :: String -> String
capital "" = "Empty string"
capital all@(x:xs) = "The first letter of " ++ all ++ " is " + [x]
```

Patterns can be usd to avoid needless repetition.

Note that `++` cannot be used in pattern matching.

### Guards

While patterns make sure a value conforms to some form and allow destrucuting it, guards are a way of testing whether some property or properties
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

The last guard will often be `otherwise`. `otherwise` is simpy an alias for `True`, and catches everything.

If all the guards of a function evaluate to `False` and there is no `otherwise` guard, evaluation falls through
to the next pattern. If no suitable guards or patterns are found, an error is thrown.

Guards can also be writen inline, althought it is less readable.

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
`let` bindings allow you to bind variaables anywhere and are themselves expressions.
They do not span across guards.

```haskell
cyclinder :: (RealFloat a) => a -> a -> a
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

`let` bindings are very useful for quckly dismantling a tuple into components and binding them to names.

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
The names defined in a `let` are visible to the output function and all predicates and secitons that come after the binding.

```haskell
listOverweight :: (RealFloat a) => [(a, a)] -> [a]
listOverweight xs :: [bmi | (w, h) <- xs, let bmi = w / h^2, bmi >= 25]
```

We ommited the `in` part of the binding because the scope of the names is already predefined.
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


**Repliate**

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

Implementing QuickSort is much easier in Haskell than in imperative langauges.

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

The following two calls are equivelant

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

Notice that the type decleration contains parentheses.
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

Reading the type decleration we say that `flip'` takes a function that takes an `a` and a `b`, and
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

**map** Takes a function and a list and applies that fuction to every element in the list, producing a new list.

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

This is much more readable than the equivelant list comprehension `[x+2 | x <- [1,2,3,4]]`.

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

Recalling the earlier implementation of QuicSort, we can replace the list comprehensions with calls to filter.

```haskell
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
  let smallerSorted = quicksort (filter (<=x) xs)
      biggerSorted = quicksort (filter (>x) xs)
  in smallerSorted ++ [x] ++ biggerSorted
```

**takeWhile** is a funciton that takes a list and a predicate and returns all of the elements from the start of the
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
We write a lambda with a \\ and then write the parameters, followed by a `->` and then the function body.

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
> map (\\(a,b) -> a + b) [(1,2),(3,5),(6,3),(2,6),(2,5)]
> [3,8,9,8,7]
```

Due to the way we curry functions, the following two are equivelant

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

This would allow an implementation of sum as `sum = foldl1 (+)`, althought it would cause an error
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

Whereas normal function application has the highest precednce, `$` has the lowest precedence.

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

`f` must take as its parameter a value that has the same tpe as `g`'s return value.

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

What is ahappening is the creation of a function that takes what `max 6.7` takes and applies `replicate 5`
to it. Then a function that takes the result of that and does a sum of it is create.
Finally, that unction is called with `8.9`.
However it is more easily read as taking the value of `max 6.7 8.9`, replicating it `5` times, and taking the
sum of that replication.

If you want to rewrite a function with lots of parentheses you can start by putting the last parameter of the innermost
function after a $, and replacing each pair of parenthses with a `.`.

`replicate 100 (product (map (*3) (zipWith max [1,2,3,4,5] [4,5,6,7,8])))` can be rewritten as
`replicate 100 . product . map (*3) . zipWith max [1,2,3,4,5] $ [4,5,6,7,8]`.
