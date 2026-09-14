# ISC AI 883 — Syllabus Gap-Fill Practice Set 03

This set targets topics recovered during the final 2027 syllabus cross-check. It is intentionally split by class and is not a replacement for the full board bank.

## Class XI — recovered-topic practice

| Q | Type | Marks | Difficulty | Question | Answer / key points |
|---|---|---:|---|---|---|
| 1 | MCQ | 1 | Easy | Which operation is valid for matrices of the same dimensions? (a) Addition (b) Division of every matrix by another matrix (c) Joining rows without conditions (d) Ignoring dimensions | **(a) Addition** |
| 2 | MCQ | 1 | Easy | Which distribution is commonly used for the number of successes in a fixed number of independent Bernoulli trials? | **Binomial distribution** |
| 3 | Short | 3 | Medium | Distinguish Type I and Type II errors in hypothesis testing. | Type I: reject a true null hypothesis (false positive). Type II: fail to reject a false null hypothesis (false negative). |
| 4 | Numerical | 4 | Medium | For vectors a=(2,3) and b=(4,-1), find a+b and 2a. | a+b=(6,2); 2a=(4,6). |
| 5 | Application | 4 | Medium | A dataset has numerical values and the goal is to compare four categories. Which graph is suitable, and which graph would better show a numerical distribution? | Bar graph for category comparison; histogram for numerical distribution. |
| 6 | Practical | 4 | Medium | Name two Pandas operations useful for data cleaning and explain their purpose. | Examples: `drop_duplicates()` removes duplicate rows; `fillna()`/`dropna()` handles missing values; replacement methods handle inconsistent values. |
| 7 | HOTS | 5 | Hard | Explain why standardization may be useful before some modelling tasks. | It puts numerical features on a comparable scale, reducing scale dominance; whether it is needed depends on the model and data. |
| 8 | Numerical | 5 | Hard | For y = 3 + 2x, find y when x=7 and identify the slope and intercept. | y=17; slope=2; intercept=3. |
| 9 | Case Based | 5 | Hard | A regression model has a strong correlation with the target. Explain why this does not by itself prove causation and name one modelling limitation to investigate. | Correlation is association, not proof of causation. Investigate assumptions, data quality, extrapolation, influential points, residual behaviour or omitted variables. |
| 10 | Ethics | 5 | Hard | An AI product is designed to imitate human behaviour closely. Give two ethical concerns and two safeguards. | Concerns: manipulation/trust, autonomy, privacy, human-relationship effects or misleading anthropomorphism. Safeguards: transparency, consent, human oversight, privacy/security and responsible design. |

## Class XII — recovered-topic practice

| Q | Type | Marks | Difficulty | Question | Answer / key points |
|---|---|---:|---|---|---|
| 1 | MCQ | 1 | Easy | Which ANN process sends an input forward through layers to produce a prediction? | **Forward propagation** |
| 2 | MCQ | 1 | Easy | Which library is widely used for computer-vision tasks such as image processing and object detection? | **OpenCV** |
| 3 | Short | 3 | Medium | Differentiate a decision tree from an artificial neural network at a high level. | A decision tree uses learned decision rules/splits; an ANN uses interconnected neurons with weighted connections and learned parameters. |
| 4 | Short | 3 | Medium | Why are categorical variables sometimes encoded before model training? | Many numerical ML algorithms require numerical inputs; encoding converts categories into a numerical representation appropriate to the model. |
| 5 | Numerical | 4 | Medium | TP=72, TN=18, FP=6, FN=4. Calculate accuracy and recall. | Accuracy=(72+18)/100=**90%**. Recall=72/(72+4)=**94.74%**. |
| 6 | Application | 4 | Medium | Give one example each of image classification, object detection, colour detection and object tracking. | Classification: cat vs dog image. Detection: locate cars in a road image. Colour detection: identify ripe red fruit. Tracking: follow a ball across video frames. |
| 7 | HOTS | 5 | Hard | A model performs well on training data but poorly on new data. Explain the likely issue and give two checks before choosing a remedy. | Likely overfitting. Check data leakage, train/test split, dataset shift, model complexity, feature quality and evaluation procedure before choosing a remedy. |
| 8 | Practical | 5 | Hard | Outline an ANN preparation workflow using Python tools before training. | Load/inspect data; clean it; select features/labels; encode categorical data; scale where appropriate; split train/test; build the network; train; evaluate. |
| 9 | Case Based | 5 | Hard | A face-recognition system works accurately in one camera environment but poorly in another. Give two technical causes and two improvement steps. | Causes: distribution shift, lighting/resolution/colour differences, preprocessing mismatch. Improvements: representative data from both environments, consistent preprocessing, validation across environments and bias/error analysis. |
| 10 | Case Based | 5 | Hard | A school wants automated face attendance. Discuss two benefits and three risks. | Benefits: faster attendance and reduced manual effort. Risks: biometric privacy/consent, security/misuse, demographic bias, false matches and accountability. |

## Validation standard

- Numerical answers must show formula/substitution when the question requires calculation.
- Practical answers should name the operation/tool and explain why it is used.
- Case/HOTS answers may accept equivalent scientifically correct reasoning.
- These questions are mapped to ISC AI 883 topics recovered during the final syllabus cross-check and must not be relabelled as CBSE AI content.
