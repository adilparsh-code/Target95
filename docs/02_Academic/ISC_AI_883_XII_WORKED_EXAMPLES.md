# ISC AI 883 — Class XII Worked Examples

## 1. AI application classification

**Scenario:** An online learning platform recommends practice questions based on a student's previous responses.

This is an AI-based recommendation/decision-support application. The system can use historical interaction data to identify patterns and generate recommendations.

## 2. Supervised vs unsupervised learning

**Supervised:** training examples contain inputs and known target labels. A model can learn to classify or predict the target for new inputs.

**Unsupervised:** training data has no supplied target label. The system can discover structure such as groups or clusters.

## 3. Overfitting example

A model scores 99% on training data but 68% on unseen test data.

This large performance gap is a warning sign of **overfitting**: the model has fitted training-specific patterns too closely and generalises poorly.

Possible responses include reviewing data quality, model complexity, training procedure and evaluation methodology. The appropriate remedy depends on the actual cause.

## 4. Artificial neuron

For inputs `x1 = 2`, `x2 = 3`, weights `w1 = 0.5`, `w2 = 0.2`, and bias `b = 1`:

`weighted sum = (2 × 0.5) + (3 × 0.2) + 1 = 2.9`

An activation function can then transform this value into the neuron's output.

Weights control the contribution of inputs; training adjusts weights to improve the model's predictions.

## 5. Confusion-matrix accuracy

Given:

- TP = 45
- TN = 40
- FP = 5
- FN = 10

Total = `45 + 40 + 5 + 10 = 100`

Accuracy = `(TP + TN) / Total`

= `(45 + 40) / 100 = 85%`

Accuracy should not be used alone when different error types have different real-world consequences.

## 6. Why recall may matter

In a disease-screening system, a **false negative** means a person who actually has the condition is predicted negative. If missing such cases is especially harmful, recall/sensitivity becomes an important evaluation measure.

Therefore, evaluation metrics should be selected according to the application and its costs of errors.

## 7. Computer vision

A digital image can be represented as an array of pixels. Each pixel stores numerical image information; colour images commonly use multiple colour channels.

**Image classification:** assign an image to a class.

**Object detection:** identify objects and their locations within an image.

These are different tasks even though both use image data.

## 8. Computer-vision ethics case

A school deploys automated face-based attendance.

Key considerations include informed consent and privacy, secure handling of biometric data, bias across demographic groups, access controls and clear human accountability.

The technical ability to identify a face does not by itself justify collecting or using biometric information.
