---
layout: post
tags: []
---

<snippet></snippet>

# Understanding resolution

**Atomic/Propositional variable** The propositional variable is the simplest part of the propositional formula. The defining property is that the atom cannot be decomposed further. 

This term could not refer to the expression $$\neg A$$

**Valuation** A valuation is an assignment of truth values to propositional atoms. 
The expression $$A or B$$ has four distinct valuations, for each of the combinations of the values of A and B. 

Valuations are often represented with the letter $$V$$.

Suppose we have an expression composed of atoms, $$A$$, $$B$$, and $$C$$, and we call it $$\alpha$$. 
We can then represent a particular valuation as $$V(\alpha): A-T, B-F, C-F$$

**Satisfiability** An expression is satisfiable if and only if (iff) there exists a valuation that makes that expression true. 

In real-life situations, the expression in question will represent a problem we want to solve. 
Once we formulate the problem as a logical expression, we can apply procedures like resolution to it to determine its satisfiability.

If we find that the expression is unsatisfiable, it means that the problem cannot be solved. 

## Purpose of resolution 

The purpose of resolution is to find out whether a given expression is satisfiable.

## Resolution mechanism 

Take the expression $$(X \lor Y) \land (\neg X \lor Z)$$.

The most important observation is that we cannot use the variable $$X$$ to guarantee truthfulness of the expression. 

Because $$X$$ and its negation appears in two different clauses, regardless of the value of $$X$$ the truthfulness of the entire expression will depend on the remaining variables. 

In other words, if we found that $$(Y \lor Z)$$ is false (we cannot satisfy it), we could not be able to satisfy the expression. 

All resolution steps rely on this principle. That is why if we derive an empty clause (which is always false and cannot be satisfied), we can deduce that the original expression is not satisfiable. 
That is also why, if after resolving each possible clause, empty clause is not derived, we can derive a satisfying valuation by picking variable values which satisfy all clauses. 

## Resolution process

### Clausal form 

A **literal** is either an atomic sentence or its negation.  $$p\quad \neg p$$

A **clausal sentence** is either a literal or a disjunction of literals. $$p\quad \neg p\quad \neg p \lor q$$

A **clause** is the set of literals in a clausal sentence. Note that the empty set $${}$$ is also a clause. it is equivalent to an empty disjunction and is therefore unsatisfiable 

Implications 

$$\phi \rightarrow \psi \rightarrow \neg \phi \lor \psi$$

$$\phi \Leftarrow \psi \rightarrow \phi \lor \neg \phi$$

$$\phi \Leftrightarrow \psi \rightarrow (\neg \phi \lor \psi) \land (\phi \lor \neg \psi)$$

Negations

$$\neg\neg\phi \rightarrow \phi$$

$$\neg(\phi \land \psi) \rightarrow \neg\phi \lor \neg\psi$$

$$\neg(\phi \lor \psi) \rightarrow \neg\phi \land \neg\psi$$

Distribution 

$$
\begin{align}
\phi \lor (\psi \land \chi) &\rightarrow (\phi \lor \psi) \land (\phi \lor \chi)\\ 
\\
(\phi \land \psi) \lor \chi &\rightarrow (\phi \lor \chi) \land (\psi \lor \chi)\\
\\
\phi \lor (\phi_1 \lor ... \lor \phi_n) &\rightarrow \phi \lor \phi_1 \lor ... \lor \phi_n\\
\\
(\phi_1 \lor ... \lor \phi_n)\lor \phi &\rightarrow \phi_1 \lor ... \lor \phi_n \lor \phi\\
\\
\phi \land (\phi_1 \land ... \land \phi_n) &\rightarrow \phi \land \phi_1 \land ... \land \phi_n\\
\\
(\phi_1 \land ... \land \phi_n)\land \phi &\rightarrow \phi_1 \land ... \land \phi_n \land \phi
\end{align}
$$

Operators 

$$\phi_1 \lor .. \lor \phi_n \rightarrow \{\phi_1,\ ...,\ \phi_n \}$$

$$\phi_1 \land ... \land \phi_n \rightarrow \{\phi_1\},\ ...,\ \{\phi_n\}$$

### Example 

Convert $$(g \land (r \Rightarrow f))$$ to clausal form 

$$
\begin{align}
&g \land (r \Rightarrow f) \\
I\quad &g \land (\neg r \lor f) \\
N\quad &\neg g \lor \neg(\neg r \lor f) \\ 
  &\neg g \lor (\neg\neg r \land \neg f) \\
  &\neg g \lor (r \land \neg f) \\
D\quad &(\neg g \lor r) \land (\neg g \lor \neg f) \\
O\quad &\{\neg g, r\} \\
  &\{\neg g, \neg f\} \\
\end{align}
$$

A more complicated case is the inversion of the previous sentence 

$$
\begin{align}
&\neg(g \land (r \Rightarrow f)) \\
I\quad &\neg (g \land (\neg \lor f)) \\ 
N\quad &\neg g \lor \neg (\neg r \lor f) \\
       &\neg g \lor (\neg\neg r \land \neg f) \\
       &\neg g \lor (r \land \neg f) \\
D\quad &(\neg g \lor r) \land (\neg g \lor \neg f) \\
O\quad &\{\neg g, r \} \\
       &\{\neg g, \neg f\} 
\end{align}
$$