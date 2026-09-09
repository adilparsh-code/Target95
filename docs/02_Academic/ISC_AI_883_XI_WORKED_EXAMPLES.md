# ISC AI 883 — Class XI Worked Examples

## 1. AI problem framing

**Scenario:** A school wants to predict whether a student may need additional academic support.

**Inputs/features:** attendance percentage, recent assessment score, assignment completion rate.

**Target:** support-needed / not-support-needed.

**Important:** the model is a decision-support aid, not an automatic final judgement. Human review and fairness checks are required.

## 2. NLP example

**Scenario:** A student types: “The new timetable is really helpful.”

A sentiment-analysis system may classify this as positive sentiment. The NLP pipeline broadly involves receiving language data, processing it and producing an interpretation/classification.

## 3. Mean, median and mode

Data: `5, 7, 7, 8, 13`

- Mean = `(5 + 7 + 7 + 8 + 13) / 5 = 40 / 5 = 8`
- Median = `7`
- Mode = `7`

The three measures describe central tendency from different perspectives.

## 4. Choosing a visualization

**Question:** Compare the number of students in four houses.

**Suitable:** bar chart, because the data consists of discrete categories and the objective is comparison.

**Avoid:** an unnecessarily complex visualization that makes category comparison harder.

## 5. Missing value and outlier

Suppose marks are `62, 65, 64, blank, 63, 99`.

- `blank` is a missing value and needs an appropriate treatment based on context.
- `99` may be a legitimate score or an outlier depending on the scale and context; investigate before removing it.

The correct preprocessing decision should be evidence-based, not automatic.

## 6. Simple linear regression

Given `y = 4x + 6` and `x = 3`:

`y = 4(3) + 6 = 18`

So the model predicts `18` for the dependent variable when the input is `3`.

A prediction is meaningful only within the context and limits of the fitted model and available data.

## 7. Correlation interpretation

If two variables show a strong positive correlation, higher values of one variable tend to be associated with higher values of the other in the observed data.

**Important:** correlation by itself does not prove that one variable causes the other.

## 8. Ethical case

A loan-related AI system produces systematically lower scores for applicants from a particular demographic group.

**Investigation:** check training data representation, relevant features, model outcomes and evaluation across groups.

**Safeguards:** fairness auditing, representative data, appropriate feature review, transparency about limitations and meaningful human oversight.
