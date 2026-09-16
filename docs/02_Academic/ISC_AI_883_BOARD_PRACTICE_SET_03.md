# ISC AI 883 — Board Practice Set 03

**Examination Year:** 2027  
**Scope:** recovered syllabus areas; theory practice only.  
**Rule:** Questions are split by class and target topics that were previously under-specified. They supplement, not replace, the full board bank.

## Class XI — recovered-topic practice

| Q | Type | Marks | Difficulty | Question | Answer / Key |
|---|---|---:|---|---|---|
| 1 | MCQ | 1 | Easy | Which operation is valid for adding two matrices? | They must have compatible/same dimensions for matrix addition. |
| 2 | MCQ | 1 | Easy | If A is a 2 × 3 matrix, what is the order of its transpose? | 3 × 2 |
| 3 | MCQ | 1 | Easy | Which measure is obtained by subtracting the minimum value from the maximum value? | Range |
| 4 | MCQ | 1 | Easy | In hypothesis testing, H0 generally represents what? | The null hypothesis. |
| 5 | MCQ | 1 | Easy | Which visualization is especially suitable for examining the relationship between two numerical variables? | Scatter plot. |
| 6 | MCQ | 1 | Easy | Which Python library provides DataFrame structures commonly used for data cleaning? | Pandas. |
| 7 | MCQ | 1 | Easy | Which model describes entities and their relationships? | Entity-relationship (ER) model. |
| 8 | MCQ | 1 | Easy | What is the main purpose of a least-squares regression line? | To fit a line by minimizing the sum of squared residuals. |
| 9 | Short answer | 2 | Medium | Distinguish structured, semi-structured and unstructured data with one example each. | Structured: tabular data; semi-structured: JSON/XML; unstructured: free text/images/audio. |
| 10 | Short answer | 2 | Medium | A dataset contains marks 40, 42, 41, 43, 99. Explain why 99 should not automatically be deleted. | It may be a genuine value or an outlier; inspect context, scale and source before treatment. |
| 11 | Numerical | 2 | Medium | For vectors u=(2,3) and v=(4,1), calculate u+v. | (6,4). |
| 12 | Numerical | 2 | Medium | Given y = 5 + 3x, find the predicted y when x=4. | 17. |
| 13 | Application | 3 | Medium | A school wants to compare enrolment across five houses and show the distribution of individual marks. Select a suitable chart for each and justify. | Bar graph for house comparison; histogram for distribution of marks. |
| 14 | Application | 3 | Hard | A survey records study hours and test marks. Explain how a scatter plot and correlation can be used, and why correlation alone does not establish causation. | Scatter plot visualises association; correlation measures direction/strength; other factors may explain the relationship, so causation is not established by correlation alone. |
| 15 | Case-based | 4 | Hard | An AI dataset has duplicate rows, missing values and inconsistent spellings in a categorical field. Describe a sensible cleaning sequence before modelling. | Inspect schema/source; identify/remove or reconcile duplicates; standardise categorical values; handle missing values using context-appropriate methods; validate the cleaned dataset. |
| 16 | Case-based | 4 | Hard | A company uses AI to screen applicants. The model performs differently across groups. Identify two possible sources of bias and two responsible safeguards. | Sources: unrepresentative training data, biased/proxy features, labelling/process bias. Safeguards: representative data, fairness evaluation, feature review, transparency and human oversight. |
| 17 | HOTS | 4 | Hard | A researcher reports a Type I error. Explain what that means in hypothesis testing. | Rejecting a true null hypothesis; the exact consequence depends on the hypothesis and application. |
| 18 | HOTS | 4 | Hard | Explain why choosing a multi-dimensional visualization requires care even when the chart contains more information. | Extra dimensions can increase clutter and cognitive load; visualization should preserve interpretability and make the intended comparison visible. |

## Class XII — recovered-topic practice

| Q | Type | Marks | Difficulty | Question | Answer / Key |
|---|---|---:|---|---|---|
| 1 | MCQ | 1 | Easy | Which NLP task identifies named entities such as people, places or organisations in text? | Named Entity Recognition (NER). |
| 2 | MCQ | 1 | Easy | Which paradigm learns from labelled examples? | Supervised learning. |
| 3 | MCQ | 1 | Easy | Which layer lies between input and output in a basic multilayer neural network? | Hidden layer(s). |
| 4 | MCQ | 1 | Easy | Which task identifies objects and their locations in an image? | Object detection. |
| 5 | MCQ | 1 | Easy | In a confusion matrix, an FN is what? | A false negative. |
| 6 | MCQ | 1 | Easy | Which metric is especially relevant when missing positive cases is costly? | Recall/sensitivity. |
| 7 | Short answer | 2 | Medium | Distinguish image classification from object detection. | Classification assigns class label(s) to an image; detection identifies objects and their locations. |
| 8 | Short answer | 2 | Medium | Why is a 99% training score with a 68% test score a warning sign? | It indicates a large generalisation gap and may indicate overfitting. |
| 9 | Numerical | 2 | Medium | A model has TP=45, TN=40, FP=5, FN=10. Calculate accuracy. | (45+40)/100 = 85%. |
| 10 | Application | 3 | Medium | Give one appropriate AI approach for spam-email detection and explain the role of training data. | A supervised classification model can learn from labelled spam/not-spam examples and classify new messages. |
| 11 | Application | 3 | Medium | Explain why scaling and categorical encoding may be performed before ANN/ML training. | Scaling puts numerical features on comparable ranges; encoding converts categorical information into numerical representations usable by models. |
| 12 | Application | 3 | Medium | Explain the role of epochs and batch size during neural-network training. | An epoch is a complete pass through training data; batch size controls how many examples contribute to an update at a time. |
| 13 | Case-based | 4 | Hard | A factory wants to predict equipment failure before breakdown. Outline an ML workflow from data to evaluation. | Acquire historical sensor/failure data; clean and prepare features/labels; split train/test; train an appropriate model; evaluate with metrics suited to failure-detection costs; inspect limitations and monitor generalisation. |
| 14 | Case-based | 4 | Hard | A house-price model uses a decision tree. Explain why this is an ML example and identify one risk of an overly complex tree. | It learns a mapping from features to a target from data; an overly complex tree may overfit training data and generalise poorly. |
| 15 | HOTS | 4 | Hard | Compare forward propagation and backpropagation in an ANN. | Forward propagation computes outputs from inputs through the network; backpropagation uses the loss/error to calculate gradients and update weights during training. |
| 16 | HOTS | 4 | Hard | A face-recognition system works well overall but performs worse for one demographic group. What should be investigated before deployment decisions? | Dataset representation, labels/features, group-wise evaluation, preprocessing/model behaviour, privacy implications and appropriate human oversight. |
| 17 | Case-based | 4 | Hard | A video system tracks a moving vehicle. Distinguish object detection from object tracking in this scenario. | Detection identifies/localises objects in frames; tracking associates the detected object across successive frames to follow its movement. |
| 18 | HOTS | 4 | Hard | Explain why accuracy alone can be misleading for a rare-event classifier. | With strong class imbalance, a model can obtain high accuracy while missing many positive cases; precision/recall and the application's error costs should also be considered. |

## QA note

- XI questions explicitly reinforce matrices, vectors, hypothesis testing, visualization, Pandas/data cleaning, modelling and regression.
- XII questions explicitly reinforce NER, ANN training, evaluation metrics, predictive maintenance, decision trees and CV tasks.
- Answers are concise keys intended for later student-facing explanation expansion; they do not replace full worked solutions.
