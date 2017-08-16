---
layout: post
color: "#4caf50"
textcolor: "#FFFFFF"
tags: [Notes, Statistics]
---

Short notes on the AQA statistics A level. 

Split into topics for each module and topic.

<snippet></snippet>

## SS02

### Time series analysis

#### Seasonal variation

When asked for the type of variation

**Seasonal variation** If the variations from the fit line appear to follow a pattern

**Random variation** If they don't

#### Moving averages and seasonal effects

**Moving averages** For $$\{x_1, x_2, x_3, ..., x_n\},\ a_i = \frac{x_{i-1} + x_i + x_{i+1}}{3}$$

**Centered moving average** The average of the current moving average and the surrounding moving averages


The seasonal effect is the average of the values of the difference between the actual values and the centered moving average.

Take the centered moving average and subtract it from the actual value for each item in a group. Then calculate the average of these values.

#### Estimation from seasonal effects

Once the seasonal effects has been calculated the fit line can be used to find a value for a given time, and the seasonal effect can then be applied to this value to produce an estimate

### Sampling

#### Simple random samples

1. Assign a range of values to the data
2. Choose random values from the number table, starting from a random position

Each item has the same probability of being chosen.

If the data is in sections, each section may not be represented.
May not give correct representations of strata.

#### Stratified random sampling

There may often be factors which divide up the population into groups (strata), and we may expect the measurement of interest to vary among the different groups.
This can be accounted for when we select a sample from the population in order that we obtain a sample that is representative of the population.

We generally require that the proportion of each stratum in the sample should be the same as in the population.

Stratified sampling techniques are generally used when the population is heterogeneous, or dissimilar, where certain homogeneous sub populations can be isolated.

Some reasons for using stratified sampling over simple random sampling are:
- The cost per observation may be reduced
- Estimates of the population parameters may be wanted for each sub-population
- Increased accuracy at a given cost

#### Cluster, quota, and systematic sampling

##### Cluster sampling

The data is is divided into separate groups. Then a simple random sample of clusters is selected from the population.

The population is divided into $$N$$ groups, called clusters

The researcher randomly selects $$n$$ clusters to include in the sample

The number of observations within each cluster $$M_j$$ is known, and $$M = \sum M_j$$.

**One-stage sampling** All of the elements within selected clusters are included in the sample

**Two-stage sampling** A subset of elements within selected clusters are randomly selected for inclusion in the sample

Sometimes, the cost per sample point is less for cluster sampling than for other sampling methods. Given a fixed budget, the researcher may be able to use a bigger sample with cluster sampling than with the other methods. When the increased sample size is sufficient to offset the loss in precision, cluster sampling may be the best choice.

Application:
1. Select a cluster grouping as a sampling frame
2. Mark each cluster with a unique number
3. Choose a sample of clusters applying probability sampling

#### Quota sampling

Quota sampling requires, that representative individuals are chosen from a specific subgroup

Advantages:
- Primary collection can be done in a short time
- The application of quota sampling can save costs and time
- Quota sampling is not dependent on the presence of the sampling frames.

Disadvantages:
- It is not possible to calculate the sampling error
- Other important characteristics may be disproportionately represented in the final sample group
- There is a potential for researcher bis and the quality of work may suffer due to researcher incompetency

#### Systematic sampling

A sampling method in which the first position in the data set is randomly chosen, and every $$n^{th}$$ position after this is also chosen

Advantages:
- Allows the researcher to add a degree of system or process into the random selection
- Known and equal probability of selection
- The assurance that the population will be evenly sampled. Simple random sampling allows a clustered selection of subjects

Disadvantages:
- The process of selection can interact with a hidden periodic trait within the population
- The process can also hide a periodic trait



### Discrete probability distributions

#### Expectations and variance

#### Poisson

(Same as MS02)

### Interpretation of data

#### Pie charts

#### Line diagrams

#### Box and whisker plots

#### Frequency diagrams

#### Scatter diagrams

**Histograms not required**

### Hypothesis testing

#### Tests for means

#### Errors

**Type I error**: Rejecting a true null hypothesis

**Type II error**: Accepting a false null hypothesis

# If it says test. State the fucking hypotheses!

# Tests

| Test | Details | Case to reject $$H_0$$ |
| --- | --- | --- |
| **SS02** | | |
| Z/T test | Determines whether two population means are different | TV > CV |
| **SS03** |  |  |
| Contingency tables | A test for independence | CV > TV |
| Sign test | Test for difference in medians | TV < CV |
| Wilcoxon | Test for difference in mean or median | TV < CV |
| Mann-Whitney | Test for equality of population | TV < CV |
| Kruskal-Wallis | Test for equality of population of two or more samples| TV > CV |
| Correlation coefficient | Test for existence of correlation between two random variables | TV > SL |
| **SS04** | | |
| Poisson | Test for change in a Poisson variable| TV < SL |
| Proportion | Test whether sample proportion represents the population | TV < SL |
| **SS05** | | |
| Variance | Tests a sample for a given population variance | TV > CV(Upper) or TV < CV(Lower) |
| Variance equality of samples (F) | Test for equality of the variances of the populations of two samples of two normally distributed random variables | TV > CV |
| Difference in mean (Two sample Z) | Test for the difference in the means of two independent populations | \|TV\| > \|CV\| |
| Difference in mean (Two sample T) | Test for the difference in the means of two independent populations with unknown variances | \|TV\| > \|CV\| |
| Goodness of fit | Test for the fit of a sample to a particular distributio n| TV > CV | |
| **SS06** | | |
| Paired comparisons | Analysis of the difference between pairs of values sampled from two normal populations | TV > CV |
| Analysis of variance | An extension of F tests with more than 2 populations | TV > CV |
| Two way analysis of variance | An analysis of variance which accounts for a second factor | TV > CV |
| Latin squares | | |

# SS03

## Contingency tables

1. State hypotheses (In context)
    i. $$H_0$$: No assocation
    ii $$H_1$$: Assocation
2. Calculate the expected values.

     If any value is less than 5, merge the rows or columns
3. Calculate the text $$\chi^2$$ statistic
4. Find the critical value for $$\nu = (n-1)(m-1)$$ degrees of freedom.
    This can either be done from the table or with $$\text{CHISQUARE ICDF}(\nu, 1-\alpha)$$
5. If text $$\chi^2_t > \chi^2_c$$, reject $$H_0$$ in context

### Yates' correction

For a 2 by 2 table, Yates' correction is used.

Rather than $$\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}$$ the corrected formula is $$\chi^2 = \sum \frac{(\|O_i-E_i\|-0.5)^2}{E_i}$$

## Distribution free methods

| Test | For | Use case |
| --- | --- | --- |
| Sign test | Median | When Wilcoxon cannot be used as data is not symmetrical or is non-numeric |
| Wilcoxon signed-rank test | Median or Mean | When a z or t test cannot be used |
| Mann-Whitney U test | Equality of populations of two samples | There are two samples |
| Kruskal-Wallis test | Equality of populations of two or more samples | There are more than two samples |

### Sign test

The sign test checks for a difference in the median value by comparing each pair. It does not require a symmetric distribution and could be used on non-numeric data so long as the data can be assigned to two groups (e.g. boolean values of opinions)

1. State hypotheses
    i. $$H_0$$ that **population** medians are equal $$\eta_1 = \eta_2$$
    ii. $$H_1$$: that **population** medians are not equal $$\eta_1 \neq \eta_2$$ or $$\eta_1 ( >  < ) \eta_2$$
2. Find the differences between each pair, ignoring any equal values
3. Count $$T^+$$ the number of positive differences and $$T^-$$ the number of negative differences
4. Find the value of $$P\left(X < min(T^+, T^-)\ \|\ X\sim B(n, \frac 1 2)\right)$$
5. Compare the value above with the significance level. If it is less, reject $$H_0$$


### Wilcoxon Signed-rank test

The Wilcoxon test is similar to the sign test except that it ranks the differences ignoring their signs.

1. State the hypotheses
    i. $$H_0$$ **Population** average difference (in mean or median) of 0
    ii. $$H_1$$ **Population** average difference not 0
2. Rank the absolutes of the differences, giving each rank the sign of its respective difference
3. Calculate $$T^+$$ and $$T^-$$, the sums of the positive and negative ranks respectively. Let $$T_t = \text{min}(T^+, T^-)$$
4. Find the critical value, $$T_c$$ from the table
5. Compare $$T_t$$ to $$T_c$$, rejecting $$H_0$$ if $$T_t$$ is smaller

### Mann-Whitney U-test

The Mann-Whitney U test tests whether two samples were taken from the same population. It is used when a t test cannot be applied as the data is not normal


1. State the hypotheses
    i. $$H_0$$ The samples are from the same population, $$\eta_1 = \eta_2$$
    ii. $$H_1$$ The samples are from different populations, $$\eta_1 = \eta_2$$
2. Rank the entire dataset and calculate the sum of the ranks for each set
3. Calculate the test statistic for each set $$U = T - \frac{n(n+1)}{2}$$ where $$T$$ is the sum of the ranks of the set and $$n$$ is the size of the set.<br> Let $$U = \text{min}(U_1, U_2)$$
4. Find the critical value for the significance level and the size of each data set
5. If $$U$$ is less than the critical value, reject $$H_0$$

### Kruskal-Wallis test

The Kruskal-Wallis test is a non-parametric version of the ANOVA test.
It determines a difference between samples

1. State the hypotheses
    i. $$H_0$$ All samples are from the same population
    ii. $$H_1$$ Samples are from different populations
2. Rank the entire dataset and calculate the sum of the ranks of each set
3. Calculate the test statistic $$H = \left(\frac{12}{N(N+1)}\sum \frac{T_i^2}{n_i}\right) - 3(N+1)$$ where $$N$$ is the sum of all samples sizes, and $$T_i$$ and $$n_i$$ are the rank sums and sizes of each sample
4. Find the degrees of freedom, the number of samples minus one
5. Calculate the critical value for the given significance level either from the tables or with $$\text{CHISQUARE_ICDF}(\nu, 1-\alpha)$$
6. If the test statistic is larger than the critical value, reject $$H_0$$

## Correlation

### Spearman's Rank Correlation Coefficient

Spearman's rank correlation coefficient is used when the data is ranked.

The value is given by $$r_s = 1- \dfrac{6\sum d^2}{n(n^2-1)}$$ where $$d_i$$ is the difference between the rank of a pair of values, and $$n$$ is the (equal) size of each dataset

#### Testing with the correlation coefficient

A test can be carried out in order to determine whether there is or is not a correlation between two random variables.
Assuming that the correlation coefficient, $$r_s$$, is already known.

1. State the hypotheses
    i. $$H_0:\quad \rho = 0$$ (independent)
    ii. $$H_1:\quad \rho \neq 0$$ (not-independent)
2. Find the critical value from the table
3. If the correlation coefficient is greater than the critical value, reject $$H_0$$





# SS04



## Linear combinations of independent normal variables

If the letters $$X$$ and $$Y$$ are variables and the letters $$a$$ and $$b$$ are constants then

1. $$E(aX + b) = aE(X) + b$$
2. $$E(X + Y) = E(X) + E(Y)$$
3. $$E(a_0 + a_1X_1 + a_2X_2 + ... + a_nX_n) = a_0 + a_1E(X_1) + a_2E(X_2) + ... + a_nE(X_n)$$
4. $$Var(a+bX) = b^2Var(X)$$
5. $$Var(X\pm Y) = Var(X) + Var(Y)$$
6. $$Var(a_0 + a_1X_1 + a_2X_2 + ... + a_nX_n) = a_1^2Var(X_1) + a_2^2Var(X_2) + ... + a_n^2Var(X_n)$$
7. A linear combination of independent, normal variables will itself be normally distributed
8. $$\left(\sum_{i=1}^n c_i\times N(\mu_i, \sigma_i^2) \right)\sim N \left(\sum_{i=1}^n c_i\mu_i, \sum_{i=1}^n c_i^2\sigma_i^2\right)$$

Given a normal distribution $$X\sim N(\overline{x}, \sigma^2)$$, if an event is given which is $$k$$ times $$X$$ then this new event has a distribution $$N(k\times \overline{x}, k \times \sigma^2)$$. The standard deviation of the new event is then $$\sqrt{k \times \sigma^2}$$.

Given two normal distributions $$A\sim N(\overline{x}_A, \sigma^2_A)$$, and $$B\sim N(\overline{x}_B, \sigma^2_B)$$ the normally distributed random variable $$A \pm B$$ has the distribution $$N\left(\overline{x}_A \pm \overline{x}_B, \sigma^2_A + \sigma^2_B\right)$$.

## Approximating distributions

1. The purpose of making an approximation is:
    - To reduce the amount of calculation
    - To allow tables to be used where they otherwise could not
    - To calculate confidence intervals
2. The binomial distribution may be approximated by the Poisson distribution if $$n \geq 50$$ and $$p \leq 0.1$$
3. The conditions for the approximations are rules of theu,b. They are not shar dividing lines between good approximations and bad approximations
4. The binomial distribution may be approximated by the normal distribution if $$n \geq 50$$ and $$np \geq 10$$
5. The Poisson distribution may be approximated by the normal distribution if $$\lambda \geq 10$$

## Confidence intervals

1. An estimate of a population standard deviation calculated from a random sample of size $$n$$ has $$n-1$$ degrees of freedom
2. If $$\overline{X}$$ is the mean of a random sample of size $$n$$ from a normal distribution with mean $$\mu$$ a $$100(1-\alpha)\%$$ confidence interval for $$\mu$$ is given by $$\overline{x} \pm t_{ {\frac \alpha 2}, n-1} \frac{s}{\sqrt{n} }$$

## Further confidence intervals

1. If $$x$$ is an observation from a Poisson distribution with mean $$\lambda$$ then an approximate $$100(1-\alpha)\%$$ confidence interval for $$\lambda$$ is given by $$x \pm z_{\frac \alpha 2}\sqrt{x}$$, provided that $$x$$ is reasonably large, say $$> 20$$
2. If $$r$$ is an observation from a binomial distribution with parameters $$n, p$$ then an approximate $$100(1-\alpha)\%$$ confidence interval for $$p$$ is given by $$\hat{p} \pm z_{\frac \alpha 2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$, provided $$r$$ is reasonably large, say $$> 20$$

## Further hypothesis testing for means

To carry out a hypothesis test for a mean based on a sample from a normal distribution with an unknown standard deviation:

The test statistic is $$\frac{\overline{x} - \mu}{\frac{s}{\sqrt{n}}}$$ where $$s = \sqrt{\frac{\Sigma (x- \overline{x})^2}{n-1}}$$

## Hypothesis tests for proportions and for the mean of a Poisson distribution

1. To test hypotheses about a binomial population proportion, $$p$$, either:
    a. Determine the cumulative binomial probability of $$B(n, p)$$
    State $$H_0$$ that the mean remains the same, and $$H_1$$ that it exhibits the expected change. Then find the probability that this value occurs, and reject $$H_0$$ if the probability is higher than the level of the test.
    b. use $$\dfrac{\hat{p} -p}{\sqrt{\frac{p(1-p)}{n}}} \sim N(0, 1)$$
   The hypotheses are then dealt with like a regular normal hypothesis test.
2. To test hypotheses about a Poisson population mean $$\lambda$$, either
    a. Determine the cumulative Poisson probability of $$P_0(\lambda)$$, or
    b. use $$\frac{\hat{\lambda} - \lambda}{\sqrt{\lambda}} \sim N(0, 1),\  \lambda > 10$$


# SS05

## Continuous probability distributions

1. The random variables $$X$$ having probability density function $$f(x) = \begin{cases}\frac{1}{b-a},& a < x < b \\ 0,& \text{otherwise} \end{cases}$$ where $$a$$ and $$b$$ are constants, it is said to follow a rectangular distribution
2. The mean of $$X$$ is $$\frac 1 2 (a+b)$$ and the variance of $$X$$ is $$\frac{1}{12}(b-a)^2$$
3. The exponential distribution has probability density function $$f(x) = \begin{cases}\lambda e^{-\lambda x} & x > 0 \\ 0 & \text{otherwise}\end{cases}$$
4. The exponential distribution with parameter $$\lambda$$ has mean $$\frac 1 \lambda$$ and standard deviation $$\frac 1 \lambda$$
5. $$P(X < x)$$ is known as the cumulative distribution function and is usually denoted $$F(x)$$
6. For the exponential distribution with parameter $$\lambda$$, $$F(x) = 1-e^{-\lambda x},\quad x > 0$$
7. If $$a$$ and $$b$$ are two constants and $$a<b$$, the probability that $$$X$$ takes a value between $$a$$ and $$b$$ is $$F(b) - F(a)$$
8. The intervals between successive events from a Poisson distribution with mean $$\lambda$$ are distributed according to the exponential distribution with parameter $$\lambda$$

## Estimation

1. If $$S^2$$ denotes the variance estimate from a random sample of size $$n$$ from a normal population with variance of $$\sigma ^2$$, then $$\frac{(n-1)S^2}{\sigma ^2} \sim \chi^2_{n-1}$$
2. The $$\chi^2$$ distribution is not symmetric so both lower and upper percentage points need to be read from tables
3. A $$100(1-\alpha)\%$$ confidence interval for a normal population variance, $$\sigma^2$$, is given by $$\dfrac{(n-1)S^2}{\chi^2_{1- \frac \alpha 2}}$$ and $$\dfrac{(n-1)S^2}{\chi^2_{\frac \alpha 2}}$$
4. Confidence limits for a normal population standard deviation, $$\sigma$$ are found by taking the square root of those calculated for the population variance

## Hypothesis testing: one sample tests

1. To test hypotheses about a normal population variance, $$\sigma^2$$ or standard deviation $$\sigma$$, use $$\dfrac{(n-1)S^2}{\sigma^2}\sim \chi^2_{n-1}$$
2. To test hypotheses about a normal population with mean, $$\mu$$, use $$\dfrac{\overline{X}- \mu}{\frac{S}{\sqrt{n}}} \sim t_{n-1}$$

## Hypothesis testing: two-sample tests

1. To test hypotheses about the equality of two normal population variances, or standard deviations, use $$\frac{s^2_x}{s^2_y} \sim F_{n_x-1,\ n_y - 1}$$
2. To test hypotheses about the equality of (or given differece in) two normal population means, based upon independent random samples and known population variances use $$\dfrac{(\overline{X} - \overline{Y}) - (\mu_x - \mu_y)}{\sqrt{\frac{\sigma^2_x}{n_x} + \frac{\sigma^2_y}{n_y}}} \sim N(0, 1)$$ <br> Note that for $$n_x > 30$$ and $$n_y > 30$$ the requirement for normal populations canbe relaxed and/or sample variances can be used as estimates of the population variances
3. To test hypotheses about the equality of (or given difference in) two normal population means, based upon independent random samples and unknown but equal population variances use $$\dfrac{(\overline{X} - \overline{Y}) - (\mu_x -\mu_y)}{\sqrt{s_p^2\left(\frac{1}{n_x} + \frac{1}{n_y} \right)}} \sim t_{n_x + n_y,\ -2}$$ <br> where $$s_p^2 = \dfrac{(n_x-1)s_x^2 + (n_y-1)s_y^2}{n_x + n_y - 2}$$
## Testing for goodness of fit

1. $$\sum \frac{(O-E)^2}{E}$$ may be approximated by a $$\chi^2$$ distribution provided that
    - The $$O$$s are frequenceies,
    - The $$E$$s are at least five,
    - The classes form a sample space that is, every possible observation fits into one and only one class
2. The number of degrees of freedom is the number of classes, minus the number of independent pieces of information derived from the $$O$$s in order to calculate the $$E$$s
3. If there are $$k$$ classes and any necessary parameters are estimated from the data the number of degrees of is $$k-2$$ for a Poisson, binomial, or exponential distribution, and $$k-3$$ for a normal distribution     


# SS06

## Experimental design

1. Experimental error is the effect of factors other than those controlled by the experimenter
2. In a paired comparison, experimental error is reduced by applying both treatments to the same subjects or in the same conditions
3. The purpose of randomisation is to eliminate bias
4. Blocking is used to reduce experimental error by applying treatments (usually more than two) to the same subjects or in the same conditions
5. If a new treatement is applied to an experimental group, a control group, which receives no treatment or the standard treatment, is needed to act as a measure of the effect of not applying the new treatment
6. A placebo is a pill or treatment which contains no active ingredient
7. In a blind trial subjects do not know whether they are receiving the treatment or a placebo
8. In a double blind trial neither the subject nor the person administering the treatment knows whether a placebo or an active drug is being given

## Analysis of paired comparisons

If $$\overline{D}$$ and $$S_d$$ denote the mean and standard deviation, respectively, of a random sample of $$n$$ differences that can be assumed to be normally distributed with mean $$\mu_d$$ then $$\dfrac{\overline{D}-\mu_d}{\frac{S_d}{\sqrt{n}}} \sim t_{n-1}$$


## Analysis of variance (ANOVA)

1. The assumptions for the three models considered, one and two factor ANOVAs, and Latin square designs, are that:
    a. The observations are obtained independently and randomly from populations at each factor level (combination)
    b. These populations are (approximately) normally distributed with common variance $\sigma^2$
    c. When two or more factors are involved, there is no interaction between them

2. One way ANOVA table

   | Source of variation | Sum of squares | Degrees of freedom | Mean square | F ratio |
   | --- | --- | --- | --- | --- |
   | Between samples | $$SS_B^* $$ | $$k-1$$ | $$MS_w = \frac{SS_B}{k-1}$$ | $$\frac{MS_B}{MS_W}$$ |
   | Within samples | $$SS_W = SS_T - SS_B$$ | $$n-k$$ | $$MS_W = \frac{SS_W}{n-1}$$ |  |
   | **Total** | $$SS_T^* $$ | $$n-1$$ | |  |

3. Two way ANOVA table

    | Source of variation | Sum of squares | Degrees of freedom | Mean square | F ratio |
    | --- | --- | --- | ---| --- |
    | Between rows | $$SS_B^*$$ | $$m-1$$ | $$MS_R = \frac{SS_R}{m-1}$$ | $$\frac{MS_R}{MS_E}$$ |
    | Between columns | $$SS_C^*$$ | $$n-1$$ | $$MS_C = \frac{SS_C}{n-1}$$ | |
    | Error | $$SS_E = SS_T - SS_R - SS_C$$ | $$(m-1)(n-1)$$ | $$MS_E = \frac{SS_E}{(m-1)(n-1)}$$ | |
    | **Total** | $$SS_T^*$$ | $$mn -1$$ | | |

$$*$$ Provided in the formulae booklet

## Statistical process control

1. Statistical process control may be used when a large number of similar items are being produced. Its purpose is to give a signal when the process mean has moved away from the target value or when item-to-item variability has increased
2. For control charts for means:
    - Sample mean between warning limits- No action
    - Sample mean between arning and action limits- Take another sample immediately. If new sample mean outside warning limits take action
    - Sample mean outside action limits- Take action
3. The warning limits are set at $$\mu \pm 1.96\frac{\sigma}{\sqrt{n}}$$, and the action limits at $$\mu \pm 3.09\frac{\sigma}{\sqrt{n}}$$, where $$\mu$$ is the target value, $$\sigma$$ is the short-term standard deviation, and $$n$$ is the sample size
4. Variability may be controlled by plotting the sample ranges or standard deviations on control charts. The limits for these charts are found by multiplying the process short-term standard deviation found by factors in the control charts for variability (Table 12)
5. When the standard deviation must be estimated from a number of small samples the average sample range can be calculated and a factor from table 12 applied. <br> Alternatively $$s_i$$ can be calculated for each sample and the formula $$s = \sqrt{\frac{\sum s_i^2}{n}}$$ evaluated
6. If the tolerance width exceeds six standard deviations the process should be able to meet the tolerances consistently, provided the mean is kept on target
7. For charts for proportion non-conforming providing $$n$$ is reasonably large:
    - The warning limits are $$p \pm 1.96\sqrt{\frac{p(1-p)}{n}}$$
    - The action limits are $$p \pm 3.09\sqrt{\frac{p(1-p)}{n}}$$

## Acceptance sampling

1. Acceptance sampling may be applied to large batches of similar items. It is the process of deciding whether or not the batch is acceptable by testing a small sample of the items
2. The operating characteristic for an acceptance sampling by attributes plan is a graph of probability of acceptance against proportion non-conforming in the batch
3. The probabilities may be found from the binomial distribution provided the sample is random and the sample size is small compared to the batch
4. In double sampling, the number of non-conforming items in the first sample will determine whether a decision is made immediately or whether it is delayed until a second sample has been inspected
5. For acceptance sampling by variables the operating characteristic is a graph of probability of acceptance against batch mean

# MS03

## Bayes' theorem

$$P(A_j | B) = \dfrac{P(A_j)P(B|A_j)}{\sum_{i=1}^nP(A_i)P(B|A_i) }$$

Example

| Event | P(A) | P(B) |
| --- | --- | --- |
| C | 0.3 | 0.8 |
| D | 0.5 | 0.1 |
| E | 0.2 | 0.4 |

After event A, event B occured. Find the probability that event E occured.

Let F be the probability that event B occured.

$$P(E|F) = \begin{align}&= \frac{P(E)P(F|E)}{P(C)P(C|F) + P(D)P(D|F) + P(E)P(E|F)} \\ &= \frac{0.2\times0.4}{0.3\times0.8 + 0.5\times0.1 + 0.2\times0.4} \\&= \frac{8}{37} \end{align}$$

## Linear combinations of random variables

Covariance is a measure of the joint variability of two random variables.

$$Cov(X, Y) = E((X - \mu_x)(Y - \mu_y)) = E(XY)-\mu_x\mu_y$$

The covariance can be used to find the product moment correlation coefficient of two random variables:

$$\rho = \frac{Cov(X, Y)}{\sigma_x\sigma_y}$$

The variance can also be computed as

$$Var(aX \pm bY) = a^2Var(X) + b^2Var(Y) \pm 2abCov(X, Y)$$

## Distributional approximations

### Mean and variance of binomial and Poisson distributions

Proof of $$\mu = np$$ for binomial

$$\begin{align}\mu &= E(X) \\ &= \sum x_i p_i \\
&= \sum_{x=1}^n x \times \frac{n!}{x!(n-x)!} \times p^x(1-p)^{n-x} \\ &= np\sum_{x=1}^n \frac{(n-1)!}{(x-1)!(n-x)!} \times p^{x-1}(1-p)^{n-x} \\
&= np\sum_{y-0}^{n-1} \frac{(n-1)!}{y!(n-y-1)!} \times p^{y}(1-p)^{n-y-1}\\
&= np\sum_{x=1}^{n-1}B(n-1, p) \\
&= np\end{align}$$

Proof of $$\sigma^2 = n(n-1)p$$ for binomial
