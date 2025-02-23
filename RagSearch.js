import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import Anthropic from "@anthropic-ai/sdk";
import weaviate, { vectorizer, generative, dataType } from "weaviate-client";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const categoriesMapping = {
    Week_1: `"Contract Law: Promises, Breaches, and State Interventions" This theme focuses on the foundational principles of contract law, including the formation of contracts, the consequences of breaches, and the balance between private contracts and public interest during emergencies.
Suggested sub-categories:
	1	"Promise, Expectation, and Breach"
	◦	This sub-category focuses on cases like Hawkins v. McGee, where the enforceability of promises and the calculation of damages for breaches are central. Concepts include expectation damages and the legal limits of promises.
	2	"Contracts and Public Policy During Crises"
	◦	Cases like Home Building & Loan Association v. Blaisdell illustrate how governments may intervene in contracts during emergencies, like the Great Depression, to protect public welfare, despite impacting contractual obligations.
	3	"Regulatory Power vs. Contractual Rights"
	◦	This sub-category could cover modern regulatory conflicts such as DoorDash, Inc. v. City of New York, which deals with how government regulations (e.g., fee caps) interact with corporate contractual relationships during crises, such as the COVID-19 pandemic.`,
    Week_2: `**Foundations of Contract Law**
1. **Concept of Contractual Obligations**  
   - Definition of contracts as an exchange of promises enforceable by law.
   - Introduction to how state law plays a role in contract formation and enforcement.

2. **Ex-Ante Certainty vs. Ex-Post Fairness**  
   - Explanation of how contract law balances ex-ante certainty (predictability) with ex-post fairness (equitable principles).
   - Review of cases like *Hawkins v. McGee* and *Radtke v. Brennan*, emphasizing fairness in contracts.

3. **Statute of Frauds and Its Application**  
   - Examination of the Statute of Frauds, its purpose in preventing fraud by requiring written agreements for certain types of contracts (e.g., land sales, long-term contracts).

4. **Severability in Contracts**  
   - Concept of severability, where certain unenforceable clauses can be removed without voiding the entire contract.
   - Visual analogy of contracts as Jenga towers where certain blocks can be removed without toppling the structure.

5. **Uniform Commercial Code (UCC) and Common Law**  
   - Discussion on the application of UCC versus common law in contract disputes, specifically in cases involving the sale of goods.

**Advanced Concepts in Contracts**
1. **Introduction to Offer and Acceptance**  
   - Preview of upcoming topics such as offer, acceptance, consideration, and reliance damages.
   - Mention of helpful external resources like the Restatement of Contracts and the Uniform Commercial Code (UCC).

2. **Restatement of Contracts and UCC Overview**  
   - Overview of how the Restatement of Contracts and UCC provide guidance in contract interpretation.
   - Explanation of the persuasive authority of the Restatement and how the UCC governs sales of goods.

3. **Goods vs. Services in Contract Law**  
   - Detailed exploration of the distinction between contracts for goods (UCC governed) and services (common law governed).
   - Analysis of hybrid contracts involving both goods and services, and the application of the predominant purpose test.

4. **Equitable Remedies in Contracts**  
   - Understanding when equitable remedies (e.g., specific performance) are appropriate as opposed to legal remedies (monetary compensation).
   - Key examples like the *Campbell Soup Co. v. Wentz* case, where equitable relief was sought for a breach of contract involving the sale of unique goods.

5. **Jurisdiction and Choice of Law in Contracts**  
   - Explanation of how courts determine which state law applies to a contract dispute, especially in cases involving federal diversity jurisdiction.
   - Discussion of the Erie Doctrine and how federal courts must apply state law in diversity cases.

These categories summarize key concepts discussed on these dates and help to organize the material for your advanced RAG application. Let me know if you need further breakdowns!`,
    Week_3: `**Contracts: Offer, Acceptance, and Auctions**
1. **Foundational Principles of Contract Law**  
   - Recap of contractual obligations, focusing on the underlying law and agreement of the parties.
   - Application of Restatement (Second) of Contracts Section 24, discussing offers and their role in forming contracts.

2. **Offer and Acceptance: Basic Concepts**  
   - Detailed explanation of what constitutes an offer, focusing on the "manifestation of willingness" to enter into a bargain.
   - Case discussions that illustrate borderline scenarios to sharpen the understanding of offer and acceptance.

3. **Manifestation of Intent in Contract Law**  
   - Focus on how "manifestation" of intent distinguishes an offer from casual discussions or negotiations.
   - Emphasis on the objective and subjective standards used to evaluate intent in contracts.

4. **Auction Contracts and the Role of the Bidder**  
   - Analysis of how auctioneers solicit bids and whether those actions constitute offers or invitations to negotiate.
   - Case studies on auctions to differentiate between offers and bids, and how these principles apply to contract formation.

5. **Revocation and Retraction of Offers**  
   - Introduction to the legal ability to revoke offers before acceptance, and the rules governing such retractions.
   - Discussion of case law where buyers and sellers engage in disputes over the timing and method of revoking offers.

6. **Option Contracts and Firm Offers**  
   - Overview of how option contracts are formed and their significance in keeping offers open for a specified period.
   - Discussion of consideration in option contracts and the role of the UCC's "firm offer" provision for merchants.

These categories break down the key legal principles and cases discussed on Sept 4, helping to separate the material for focused study or further analysis. Let me know if you need similar breakdowns for additional material!`,
    Week_4: `**Offer, Acceptance, and Contract Formation**
1. **Introduction to Offer and Acceptance**  
   - Detailed discussion of how offers and acceptances function in contract law.
   - Explanation of the objective standard versus subjective intent in determining contract formation.

2. **The Role of Intent and Manifestation in Offers**  
   - Focus on the importance of manifestation of intent, where external actions are used to evaluate whether a valid offer has been made.
   - Case studies such as *Lucy v. Zehmer* to illustrate when subjective intent differs from external manifestations.

3. **Auction Contracts and Legal Considerations**  
   - Examination of auctions, bids, and how offers are structured in the auction process.
   - Exploration of what constitutes a valid offer and acceptance in the context of auctions and similar transactions.

4. **Option Contracts and Revocation of Offers**  
   - Analysis of option contracts, where an offer is held open for a specific period, and how revocation works in these contexts.
   - Case discussions exploring the revocation of offers and the rules governing such retractions.

5. **The Mirror Image Rule and Counteroffers**  
   - Introduction to the mirror image rule, where the acceptance must mirror the offer.
   - Explanation of counteroffers, how they reject the original offer, and create new offers.

6. **UCC § 2-207 and the Battle of the Forms**  
   - Deep dive into UCC § 2-207 and how it modifies the common law mirror image rule for the sale of goods.
   - Detailed walkthrough of the "battle of the forms" where conflicting terms in standard form contracts are reconciled under the UCC.

7. **Form Contracts and the Last Shot Rule**  
   - Overview of the last shot rule under common law, where the last form sent in a series of negotiations governs the terms of the contract.
   - Discussion on how UCC § 2-207 overrules the last shot rule and provides more balanced solutions.

8. **Silence as Acceptance and Conditional Offers**  
   - Explanation of when silence can be interpreted as acceptance under certain circumstances.
   - The role of conditional offers, where acceptance is based on agreement to additional or different terms.

**Offer, Acceptance, and Contract Formation**
1. **Introduction to Offer and Acceptance**  
   - Detailed discussion of how offers and acceptances function in contract law.
   - Explanation of the objective standard versus subjective intent in determining contract formation.

2. **The Role of Intent and Manifestation in Offers**  
   - Focus on the importance of manifestation of intent, where external actions are used to evaluate whether a valid offer has been made.
   - Case studies such as *Lucy v. Zehmer* to illustrate when subjective intent differs from external manifestations.

3. **Auction Contracts and Legal Considerations**  
   - Examination of auctions, bids, and how offers are structured in the auction process.
   - Exploration of what constitutes a valid offer and acceptance in the context of auctions and similar transactions.

4. **Option Contracts and Revocation of Offers**  
   - Analysis of option contracts, where an offer is held open for a specific period, and how revocation works in these contexts.
   - Case discussions exploring the revocation of offers and the rules governing such retractions.

5. **The Mirror Image Rule and Counteroffers**  
   - Introduction to the mirror image rule, where the acceptance must mirror the offer.
   - Explanation of counteroffers, how they reject the original offer, and create new offers.

6. **UCC § 2-207 and the Battle of the Forms**  
   - Deep dive into UCC § 2-207 and how it modifies the common law mirror image rule for the sale of goods.
   - Detailed walkthrough of the "battle of the forms" where conflicting terms in standard form contracts are reconciled under the UCC.

7. **Form Contracts and the Last Shot Rule**  
   - Overview of the last shot rule under common law, where the last form sent in a series of negotiations governs the terms of the contract.
   - Discussion on how UCC § 2-207 overrules the last shot rule and provides more balanced solutions.

8. **Silence as Acceptance and Conditional Offers**  
   - Explanation of when silence can be interpreted as acceptance under certain circumstances.
   - The role of conditional offers, where acceptance is based on agreement to additional or different terms.

These categories summarize key legal principles and discussions from Week 4, helping to organize the material for focused study or further analysis. Let me know if you need breakdowns for additional weeks or more detail!`,
    Week_5: `**Consideration, Reliance, and Contract Modifications**
1. **Introduction to Consideration**  
   - Overview of consideration as the central concept in contract law, focused on the idea of a "bargain for exchange."
   - Key examples include promises that involve a return performance or waiver of rights, as discussed in *Mills v. Wyman* and other foundational cases.

2. **Moral and Past Consideration**  
   - Analysis of why moral or past consideration is not legally enforceable. The distinction between a bargain and a mere promise, using examples like promises based on past favors or moral obligations.

3. **Exceptions to Consideration Requirements**  
   - Exploration of the exceptions where past or moral consideration can be enforceable. This includes scenarios with prior legal obligations, bankruptcy, or revival of unenforceable debts (e.g., reactivating old debt with a partial payment).

4. **Reliance as an Alternative to Consideration**  
   - Discussion of reliance, where promises that induce significant reliance can be enforceable even without consideration, focusing on cases where a party changes position based on a promise (e.g., buying a tuxedo for a promised event that gets canceled).

5. **Contract Modifications and Consideration**  
   - Examination of how contract modifications work, especially in scenarios like *Alaska Packers* and *Watkins & Sons*. These cases illustrate when modifications are enforceable and the role of consideration in renegotiating contracts.

6. **Good Faith and Duress in Modifications**  
   - Analysis of the role of good faith and duress in contract modifications. Emphasis on how courts view modifications made under pressure or duress, particularly in remote locations or where no alternatives are available (e.g., Alaska fishing agreements).

7. **Material Changes and New Contracts**  
   - The distinction between modifications that involve materially different terms (e.g., adding new obligations or changing the nature of the work) versus modifications that simply change the payment terms without new consideration.

8. **UCC and Common Law Approaches to Modifications**  
   - Comparison of how the UCC handles contract modifications (requiring no additional consideration) versus the common law, which still requires consideration unless the modification is fair and equitable in view of unanticipated circumstances.`,
    Week_6: `**Promissory Estoppel, Consideration, and Contract Interpretation**
1. **Introduction to Promissory Estoppel**  
   - Overview of promissory estoppel, focusing on promises that induce reliance and detriment.
   - Key examples include cases like *Allegheny College* and *Ricketts v. Scothorn*, where promises were enforced to prevent unfair outcomes despite lacking formal consideration.

2. **Distinction Between Legal and Equitable Remedies**  
   - Explanation of the difference between legal remedies (monetary damages) and equitable remedies (specific performance, injunctions).
   - Discussion of when promissory estoppel can be used to stop a party from withdrawing a promise, focusing on equitable outcomes in contract law.

3. **Consideration and Its Role in Enforcing Contracts**  
   - Deep dive into the concept of consideration, emphasizing the need for a "bargain for exchange."
   - Review of cases like *Hamer v. Sidway* and *Allegheny College* that illustrate how courts assess whether a promise is supported by consideration.

4. **Forbearance as Consideration**  
   - Analysis of forbearance, where refraining from exercising a legal right can constitute valid consideration.
   - Case discussions such as *Hamer v. Sidway* where a promise to give up smoking and drinking was considered valid consideration.

5. **Material Benefit Rule and Moral Obligation**  
   - Exploration of the material benefit rule and moral obligations as limited bases for enforcing promises.
   - Review of situations where past benefits or moral obligations may justify the enforcement of a promise.

6. **Contract Interpretation and the Parol Evidence Rule**  
   - Introduction to the parol evidence rule, which governs when external evidence can be used to interpret or contradict a written contract.
   - Analysis of partial versus complete integration, and when oral discussions can be used to add to or explain a written agreement.

7. **Modification of Contracts Under UCC and Common Law**  
   - Examination of contract modification, particularly under the UCC, which allows modifications without additional consideration in certain cases.
   - Discussion of when modifications are enforceable under common law and the UCC, focusing on scenarios like *Alaska Packers*.`,
    Week_7: `**Parol Evidence Rule, Contract Modifications, and Remedies**
1. **Introduction to Parol Evidence Rule**  
   - Explanation of the parol evidence rule and its role in preventing the use of extrinsic evidence to alter or contradict a written contract.
   - Review of cases where the parol evidence rule was applied, with a focus on partial versus complete integrations of contracts.

2. **Extrinsic Evidence and Contract Interpretation**  
   - Discussion of how extrinsic evidence can be used to interpret or clarify ambiguous terms but not to contradict the written agreement.
   - Focus on the limitations of extrinsic evidence in cases where the written contract is intended to be the final agreement between the parties.

3. **No Oral Modification Clauses**  
   - Examination of no oral modification clauses and their enforceability under the UCC and common law.
   - Discussion of cases such as *Wisconsin Knife Works* and how courts handle disputes involving contract modifications without written agreement.

4. **Contract Modifications and UCC 2-209**  
   - Detailed review of UCC § 2-209, which allows for contract modifications without additional consideration in sales of goods.
   - Analysis of the differences between common law and UCC approaches to contract modifications, particularly the need for signed writings.

5. **Consideration in Contract Modifications**  
   - Overview of how consideration plays a role in modifying contracts under common law and the UCC.
   - Key case discussions highlighting when modifications require new consideration versus when they are enforceable under UCC without consideration.

6. **Remedies for Breach of Contract**  
   - Introduction to remedies for breach of contract, focusing on damages, specific performance, and equitable relief.
   - Case studies illustrating how courts determine the appropriate remedy based on the nature of the breach and the terms of the contract.

7. **Statutory Interpretation in Contracts**  
   - Examination of how courts interpret statutes that impact contracts, including the use of statutory language and exceptions (e.g., "but except" clauses).
   - Focus on statutory exceptions and how they apply in contract disputes between merchants.

8. **Anchor Tenant Clauses in Commercial Leases**  
   - Discussion of anchor tenant clauses in commercial leases, where tenants can terminate their lease if a key tenant (e.g., a large store) vacates the premises.
   - Case study involving *Eckerd* and how anchor tenant clauses impact the viability of a lease and the traffic to smaller tenants in a shopping center.`,
    Week_8: "Contract Defenses, Risk Allocation, and Conditions. 1. Contract Defenses and Good Faith Obligations - Introduction to contract defenses, with emphasis on how courts handle defenses related to impracticality, frustration of purpose, and good faith efforts. Case study on Lucy, Lady Duff-Gordon and the implied obligation of good faith, with a focus on how courts interpret contracts even when terms are not explicitly stated. 2. Impracticality and Frustration of Purpose - Detailed discussion of impracticality and frustration of purpose as contract defenses. Review of cases like the coronation cases (where events like the cancellation of the coronation parade led to defenses based on unforeseen circumstances). 3. Risk Allocation in Contracts - Exploration of how contracts allocate risk between parties, especially in situations where one party assumes more risk (e.g., weather changes, governmental restrictions). Examples of real-world scenarios, such as pandemic-related shutdowns and how risk clauses in contracts affect obligations during unforeseen events. 4. Incomplete Contracts and the Role of Courts in Filling Gaps - Discussion of incomplete contracts and how courts step in to fill gaps, particularly when unforeseen contingencies arise. Comparison of cases where courts are reluctant to fill in gaps (e.g., Jenkins v. Eckert) versus cases where courts infer terms like good faith efforts (e.g., Lucy, Lady Duff-Gordon). 5. Conditions in Contracts: Explicit vs. Implied Conditions - Examination of explicit and implied conditions in contracts, focusing on how courts interpret conditions that are not clearly stated but are implied through performance expectations. Application of implied conditions to scenarios like the coronation cases, where performance was contingent on specific events happening. 6. Parol Evidence Rule and Contract Interpretation - Review of the parol evidence rule and how it limits the use of extrinsic evidence to interpret or contradict written contracts. Case studies exploring how parol evidence impacts contract disputes and how it ties into the enforcement of conditions and defenses. 7. Quantum Meruit and Damages in Contract Law - Introduction to the concept of quantum meruit (compensation for work performed) and how it relates to damages in contract breaches. Discussion of when quantum meruit is applied in cases of partial performance or when a contract is unenforceable.",

    Week_9: "Damages, Speculation, and Risk Allocation. 1. Expectation Damages and Their Purpose - Overview of expectation damages, which are designed to give the parties what they expected from the contract. Discussion of the challenges in quantifying damages, particularly incidental and consequential damages, and how courts approach speculative damages. 2. Speculative Damages and Reasonable Certainty - Focus on the principle that damages must not be too speculative, using the Chicago Coliseum case as an example. Examination of when damages are considered too uncertain and how the court requires a reasonable degree of certainty to enforce them. 3. Foreseeability and Avoidability in Damages - Review of the foreseeability requirement for damages—parties must be aware of potential risks and outcomes at the time of contracting. Introduction to the concept of avoidable damages and the plaintiff’s obligation to mitigate losses. 4. The Lost Volume Doctrine - Explanation of the lost volume doctrine, using Bryce and Spencer as examples. Discussion of how a seller with multiple items may claim damages even after reselling the same item, as it would have led to additional sales. 5. Contract Termination and Bankruptcy - Case study on Michael Jordan’s endorsement deal with MCI, which was terminated due to bankruptcy. Analysis of how termination in bankruptcy impacts contract claims and the argument of lost time and opportunities for endorsement deals. 6. Personal Services Contracts and Specific Performance - Review of why courts generally refuse to enforce specific performance in personal services contracts, focusing on issues like involuntary servitude and inefficiency. Case study on Jack Dempsey and the fight contract that never occurred, and how courts handle non-performance in such situations. 7. Injunctions and Non-Compete Clauses - Examination of the use of injunctions to prevent someone from engaging in a competing activity, as seen in the Jack Dempsey case. Discussion of non-compete clauses and their potential unconscionability when they restrict someone’s ability to earn a living. 8. Speculative Damages and Policy Considerations - Analysis of why courts are concerned about speculative damages, emphasizing the need for predictability and certainty in contracts. Discussion on the broader policy behind limiting damages to avoid overly speculative outcomes, tying it into cases like the Chicago Coliseum case.",
    Week_10: `
    Overview of expectation damages designed to restore the non-breaching party to the position they would have occupied had the contract been fully performed. This includes the economic value of performance, incidental costs, and foreseeable consequential damages. There are challenges in measuring economic value, especially when speculative or uncertain, with reasonable certainty often required as demonstrated in cases involving complex projections.
    
    2. Incidental and Consequential Damages  
       Incidental costs, which are directly related to the breach, include expenses like relisting and additional insurance. Consequential damages must meet the foreseeability requirement, as seen in classic cases concerning whether losses were reasonably predictable at the time of contracting. The duty to avoid unnecessary increases in damages is highlighted in cases where plaintiffs are expected to mitigate.
    
    3. The Avoidability Principle  
       The avoidability doctrine obligates non-breaching parties to take reasonable actions to minimize their losses. In cases involving foreseeable but speculative profits, continuing expenditures after a breach would be deemed an excessive burden on the breaching party, underscoring the principle of efficient mitigation.
    
    4. Lost Volume Doctrine  
       The lost volume doctrine addresses scenarios where a seller can claim damages even after reselling an item if they can show they lost a separate sales opportunity as a result of the breach. This doctrine is often invoked in cases where the seller has ample supply to meet additional demand, making each lost sale a separate loss.
    
    5. Contract Termination and Remedies in Bankruptcy  
       In situations where contracts are terminated due to bankruptcy, the non-breaching party may claim damages for lost opportunities and wasted time invested in the deal. This concept applies to cases involving endorsement contracts where unfulfilled engagements and promotional commitments are affected by bankruptcy.
    
    6. Personal Services Contracts and Specific Performance  
       Courts typically avoid enforcing specific performance for personal services due to potential issues with involuntary servitude and inefficiency. In cases involving canceled performances, damages are preferred over forced completion to preserve the individual’s freedom to choose their engagements.
    
    7. Non-Compete Clauses and Injunctive Relief  
       Non-compete clauses are scrutinized for fairness when they impose constraints on a party’s ability to earn a living. Courts may grant injunctive relief to enforce non-compete agreements, particularly in cases where individuals are restricted from competitive activities, provided the clauses are reasonable and not overly restrictive.
    
    8. Speculative Damages and Court Policies  
       Courts aim to ensure predictability and certainty in awarding damages by avoiding outcomes that are excessively speculative. This policy prevents compensation based on overly uncertain future profits, supporting more concrete loss assessments in contract disputes.
    
    9. Alternative Damages and Limitations  
       In instances where calculating expectation damages becomes excessively burdensome or speculative, courts may turn to alternative remedies such as reliance damages. This is often seen in cases where expectation damages are either uncertain or disproportionate to the actual loss in market value, especially if the contract itself was likely to result in a loss.`,

    Week_11: `The legal concepts discussed include: 1. Expectation Damages: Aim to place the non-breaching party in the position they would have been in if the contract had been performed, with limitations for speculative, unforeseeable, or losing contracts. 2. Reliance Damages: Reimburse costs incurred due to reliance on the contract, used when expectation damages are unsuitable. 3. Restitution: Ensures unjust enrichment is avoided, reimbursing the value of benefits conferred. 4. Equitable Remedies: Non-monetary remedies like specific performance or injunctions granted when monetary damages are insufficient. 5. Legal and Practical Considerations: Post-judgment collections involve enforcement mechanisms, often intersecting with commercial law. 6. Application in Case Studies: Focus on structuring IRAC answers tailored to facts, analyzing hypothetical cases. 7. Pedagogical Approach: Encourages critical thinking, active engagement, and understanding the practical application of legal principles.`,
    Week_12: `Comprehensive Summary of Week 12 Topics
November 11
1. Exam Preparation and Practice
The instructor outlined the process of preparing for final exams:
Old exams and practice problems would be provided on Blackboard, with rubrics and sample answers from past years.
Fall 2021's exam essay question and its best student answer will be shared for an in-class editing exercise.
Emphasis was placed on issue-spotting, structuring paragraphs effectively, and avoiding common pitfalls such as discussing irrelevant rules.
2. Damages in Contracts
Liquidated Damages Clauses:
These clauses stipulate the amount of damages payable in case of breach, eliminating the need for courts to calculate market price differences, consequential damages, and other complexities.
Example: Lease agreements often include liquidated damages clauses requiring tenants to pay penalties for breaking the lease early.
Expectation and Consequential Damages:
Case studies explored calculation methods for damages:
Expectation damages: The difference between market price and contract price, aimed at putting the non-breaching party in the position they would have been in if the contract had been fully performed.
Consequential damages: Additional losses resulting from the breach, such as missed sales opportunities or costs incurred to mitigate damages.
Example: A farmer failing to deliver contracted carrots led to discussions about whether the buyer could recover market price differences or lost profits from canceled soup sales.
3. Reliance Damages
Reliance damages compensate for expenses incurred based on reasonable reliance on a contract. This includes actions taken after signing the contract but before breach.
Hypotheticals included:
A buyer clearing out a silo in preparation for a large carrot delivery, which was only partially fulfilled.
The buyer hiring additional staff, relying on the delivery, only to face losses due to the breach.
4. Mitigation of Damages
Mitigation was a recurring theme:
A buyer is expected to make reasonable efforts to reduce losses, such as finding an alternative supplier after a breach.
If the buyer does not attempt to mitigate (e.g., purchasing carrots from a new supplier), they may lose the right to recover certain damages.
5. Hypotheticals and Practical Applications
The class engaged in rich hypotheticals, including:
A farmer’s partial performance of a contract.
The implications of not covering (finding an alternate supplier) and the extent of damages recoverable in such scenarios.
The interplay of expectation, reliance, and restitution damages in unique contract breach scenarios.
6. Logistics and Class Adjustments
Changes to office hours were announced, reflecting the instructor’s efforts to balance personal commitments and teaching responsibilities.
November 13
1. Grading Policies
Grade Distribution:
Unlike required courses, elective classes do not have strict grading curves, though averages tend to align naturally.
Students from different year levels (1Ls, 2Ls, 3Ls) are graded together in a single pool.
The grading emphasizes fairness and realistic expectations based on the level of the course.
2. Elective Course Recommendations
The instructor provided advice on elective planning:
Business Associations (BA): Recommended for all students due to its relevance to working with business entities, partnerships, and nonprofits.
Bar-Tested Courses: Students were encouraged to take bar-tested subjects like evidence, criminal procedure, and secured transactions early to ease bar preparation.
Timing: Courses like BA, which cover foundational skills, are best taken in the 2L year to support summer internships and future career needs.
3. Anticipatory Repudiation and Damages
UCC Framework:

The class revisited anticipatory repudiation, where a party declares they will not fulfill their contractual obligations before performance is due.
Under the UCC, damages are measured based on market conditions at the time the breach is discovered, not when the performance was originally due.
Options for Non-Breaching Parties:

Wait and see if the breaching party ultimately performs (e.g., through cajoling or shaming).
Mitigate damages by finding a substitute supplier or ceasing their own performance.
Case Studies:

Hypotheticals involving Farmer Mike’s failure to deliver crops were discussed, exploring legal interpretations of vague statements like “the crops aren’t looking good.”
The concept of perfect tender under the UCC was addressed, highlighting a buyer’s right to reject goods that fail to meet contractual specifications.
4. Practical and Policy Insights
The class explored the broader policy goals of the UCC:
Aligning legal principles with business practices to facilitate commerce.
Emphasizing industry standards and past dealings to interpret ambiguous terms or implied agreements.
5. Course Challenges and Student Feedback
Students reflected on the perceived difficulty of electives like BA.
While initially intimidating, many found the course enjoyable and manageable with proper preparation.
The course integrates corporate law, partnerships, securities regulation, and transactional skills, providing a robust overview for students interested in business law.
6. Strategic Advice for Bar Preparation
Students were advised to strategically time their electives:
Courses directly tested on the bar should ideally be taken closer to the final year for better retention.
Practical skills courses like transactional law were highlighted as beneficial even for students not pursuing transactional careers.
7. Engaging Discussions
The session ended with lighter moments, including tangential debates about the best chicken sandwiches, tying back humorously to the "perfect tender rule."
Key Takeaways:
Week 12 focused on exam preparation, advanced concepts in contract law damages, and the practical implications of contract breaches under the UCC.
Students gained valuable insights into balancing elective coursework with long-term career and bar preparation.
The discussions were rich in hypotheticals, connecting legal principles to real-world scenarios in an engaging and interactive manner.`,
    Week_13: `Comprehensive Summary of Week 13 Topics
Monday, November 18
1. Advanced Discussion on the Uniform Commercial Code (UCC)
The Perfect Tender Rule was analyzed:

Suppliers must deliver goods that perfectly match the contract specifications.
If the delivered goods deviate, buyers may reject them and sue for damages or accept the goods and sue for compensation.
Repudiation and Cancellation:

Building on anticipatory repudiation discussions from Week 12, the class explored:
Timing for damage calculations, particularly market price fluctuations between breach notification and delivery.
The buyer’s options: mitigating damages, seeking alternative suppliers, or awaiting performance.
2. Case Studies and Practical Applications
Hypotheticals involving breach of contracts:

Farmer Mike’s potential breach with vague statements like “tough year for crops” was revisited.
Students debated whether such statements constituted repudiation or mere insecurity, referencing UCC § 2-609.
Demanding Adequate Assurance:

The class discussed the formality of requesting assurance:
Writing formats like emails, letters, or text messages were debated for their effectiveness and admissibility in proving timely assurance demands.
3. Revisiting the Policy Goals of the UCC
Students reflected on the purpose of the UCC:
Supporting business practices and allowing flexibility in contract formation.
Examples included reliance on industry standards and informal agreements treated as binding under the law.
4. Grading and Class Procedures
Insights into grading elective courses:

Grades naturally align with a curve due to large sample sizes.
Professors emphasized fairness in grading 1Ls, 2Ls, and 3Ls together.
Elective Recommendations:

Business Associations (BA) and Evidence were highlighted as critical courses for career development and bar preparation.
Wednesday, November 20
1. Preparing for Final Exams
The structure and expectations of the final exams were explained:

Exams include issue-spotter questions, multiple-choice sections, and statutory supplements.
The importance of concise answers and clear issue spotting was emphasized:
Overly long or minimal answers were noted as common pitfalls.
Exam Materials:

Students received model answers, rubrics, and feedback examples to prepare.
Advice was provided on timing strategies during exams, such as dedicating time to outlining responses.
2. Feedback and Improvement
The professor stressed the importance of depersonalizing feedback:

A poor exam grade reflects the work product on that day, not the student’s intrinsic ability.
Students were encouraged to focus on improving their written work and analysis.
Critiquing Past Work:

Using Fall 2021’s final exam, students dissected the top-scoring answer, identifying strengths and areas for improvement.
3. Emotional Resilience in Law School
The session included reflections on the emotional challenges of legal education:
Balancing constructive feedback with maintaining confidence.
Stories from the professor’s experience emphasized resilience and long-term focus on improving work product over seeking perfection.
4. Exam Strategies and Logistics
Instructions on technical aspects:

Familiarity with exam software (e.g., Exam4) was recommended to avoid technical difficulties.
The significance of anonymous grading and how it helps ensure fairness.
Post-Exam Process:

A detailed timeline of grade release was provided:
Grades would not be available immediately, and patience was encouraged.
The professor planned a review session for December 8th to address lingering questions.
5. Motivational Elements
The session concluded with motivational anecdotes:
Aiming for excellence, even if perfection is unattainable.
Students were encouraged to maintain perspective and remember that exams represent only a small part of their legal journey.
Takeaways from Week 13
The week focused heavily on preparing for final exams and building skills in applying UCC principles.
Feedback sessions and practical exercises helped students improve analytical skills and issue spotting.
Emotional and logistical readiness for exams was prioritized, emphasizing resilience and steady improvement over time.`,
    Week_1_Supplement: `Supplement to Week 1: Key Contract Law Cases
1. **Alaska Packers’ Association v. Domenico**  
   - Focus on contract modification and the preexisting duty rule.
   - Illustrates when modifications are enforceable and the role of consideration, especially under duress or remote circumstances.

2. **Hamer v. Sidway**  
   - Key case on consideration and legal detriment.
   - Emphasizes that refraining from a legal right constitutes valid consideration, distinguishing between gift promises and enforceable contracts.

3. **Lucy v. Zehmer**  
   - Case on mutual assent and objective intent in contract formation.
   - Demonstrates that outward words and actions determine contract validity, not subjective intentions, even when alcohol or humor is involved.

4. **Contract Law Overview: The Gateway Issue**  
   - Explores the gateway issue of whether common law or UCC Article 2 applies.
   - Provides a framework for analyzing contracts involving goods versus services, setting the stage for applying the correct legal principles.

This supplement aligns with Week 1’s theme of foundational contract principles, focusing on promise, expectation, and breach, as well as the balance between private agreements and public policy interventions.`,

    Week_2_Supplement: `Supplement to Week 2: Statute of Frauds and Consideration  
1. **Statute of Frauds Overview**  
   - Definition and purpose of the Statute of Frauds as an evidentiary requirement for enforcing certain contracts.  
   - Key categories that trigger the statute using the acronym M.O.U.S.E.R.:  
     - Marriage (contracts in consideration of marriage, e.g., prenuptial agreements)  
     - One-Year Provision (contracts that cannot be performed within one year of formation)  
     - UCC Goods (contracts for the sale of goods $500 or more)  
     - Suretyship (contracts where one party promises to pay another's debt)  
     - Executor/Administrator (contracts where an executor/administrator promises to pay estate debts)  
     - Real Estate (contracts involving the sale or transfer of interests in land)  
   - Importance of written evidence, signed by the party against whom enforcement is sought, with exceptions for partial performance.  

2. **Consideration: The Bargained-For Exchange**  
   - Definition of consideration as a bargain-for-exchange involving a legal detriment to the promisee.  
   - Concept of reciprocal inducement: the promise must induce the detriment, and the detriment must induce the promise.  
   - Examples illustrating valid and invalid consideration:  
     - Valid: Selling a dry erase marker for $5 (clear legal detriment and reciprocal inducement).  
     - Invalid: Gift promises and conditional gifts, where there is no legal detriment.  
     - Past consideration (e.g., promising payment for a previously performed act) is not valid consideration, though some jurisdictions allow exceptions based on moral obligation.  

This supplement aligns with the key concepts from Week 2, reinforcing the foundational elements of contract formation with a focus on the Statute of Frauds and consideration.`,
    Week_3_Supplement: `Contract Law: Termination of the Offer and Irrevocable Offers [LEAP Preview]
This supplement covers key concepts related to the termination of offers, including:
1. Revocation (express and constructive)
2. Rejection of the offer
3. Counteroffers and their effect on original offers
4. Death of the offeror
5. Lapse of time and the reasonable time rule
6. Irrevocable offers: Option contracts, UCC firm offers, performance on unilateral offers, and detrimental reliance
7. The importance of timing in termination before acceptance

Additional Essay Application: 
- How to analyze termination of the offer in a contracts essay, focusing on the timeline from the formation of an offer until acceptance. 
- Examples of termination scenarios, including attempts to accept after revocation or rejection, and the impossibility of reviving terminated offers.

These materials provide practical examples and step-by-step analysis techniques that are critical for law school exams and real-world contract interpretation.`,
    Week_4_Supplement: `**Supplement to Week 4: Offer, Acceptance, and Contract Formation**

1. **Mirror Image Rule & UCC 2-207**  
   - The mirror image rule requires acceptance to exactly match the offer; any deviation constitutes a counteroffer.  
   - Under UCC 2-207, an acceptance that includes additional or different terms is still valid, with the added terms becoming part of the contract unless they materially alter the agreement.
   - Example: A seller's confirmation with extra terms may form a contract, depending on the buyer's objections.

2. **Promissory Estoppel (Drennan v. Star Paving Co.)**  
   - Promissory estoppel prevents a promisor from reneging on a promise when the promisee has reasonably relied on it to their detriment.  
   - *Drennan v. Star Paving Co.* illustrates how reliance can create contractual liability even without formal acceptance.
   - Key elements: (1) Clear and definite promise, (2) Reasonable reliance, (3) Detriment due to reliance, (4) Enforcement to avoid injustice.

3. **Case Analysis: Lucy v. Zehmer**  
   - This case demonstrates the objective theory of contracts: what matters is the outward expression of intent, not internal thoughts.  
   - Even if a party claims they were joking, the contract is enforceable if a reasonable person would believe it was serious.

4. **Revocation of Offers and Irrevocable Offers**  
   - An offer can be revoked anytime before acceptance unless it's an option contract supported by consideration.
   - Irrevocable offers include firm offers under UCC 2-205, which remain open for a stated time without needing consideration.
   - Example: A contractor's bid relied upon by a developer becomes irrevocable once reliance begins.

5. **Acceptance of the Offer & The Mailbox Rule**  
   - Acceptance is effective upon dispatch, not receipt, under the mailbox rule, unless otherwise stated in the offer.
   - Exceptions: Instant communication methods (email, phone) follow the receipt rule.

6. **Formation of the Offer**  
   - An offer must show intent to be bound, include definite terms, and be communicated to the offeree.
   - Example: An advertisement is generally not an offer unless it specifies quantity and who can accept.

7. **Termination of the Offer**  
   - Methods of termination: Revocation, rejection, counteroffer, lapse of time, death/incapacity of the offeror, or destruction of the subject matter.
   - Counteroffers act as rejections, nullifying the original offer unless the offeror renews it.

This detailed breakdown aligns with core contract law concepts and practical examples to enhance comprehension.`,
    Week_5_Supplement: `
**Consideration, Moral Obligations, and Contract Modifications**

1. **Introduction to Consideration**  
   - Explanation of consideration as a legal requirement for contract enforceability, emphasizing the "bargained-for exchange" concept.
   - Exploration of cases like *Hamer v. Sidway*, where the court ruled that forbearance of legal rights (e.g., refraining from smoking and drinking) qualifies as valid consideration.
   - Examples of unilateral and bilateral contracts requiring valid consideration for performance and promise.

2. **Moral and Past Consideration**  
   - Examination of why moral obligations, such as promises based on kindness or gratitude, do not generally constitute enforceable contracts.
   - Case study: *Mills v. Wyman* - The defendant’s moral obligation to pay for the care of his adult son did not legally bind him.
   - Case study: *McGowin v. Webb* - An exception where the court enforced a promise based on past consideration due to a material benefit received.

3. **Exceptions to Consideration Requirements**  
   - Situations where courts may enforce promises without traditional consideration:
     - Promises to pay debts discharged by bankruptcy.
     - Promises to perform obligations barred by the statute of limitations.
     - Partial payments reviving old debts.

4. **Reliance as an Alternative to Consideration**  
   - Promissory estoppel as a substitute for consideration when a party relies on a promise to their detriment.
   - Example: Employer promising a job, inducing the employee to relocate, even if there was no formal contract.

5. **Contract Modifications and Consideration**  
   - Requirements for modifying contracts under common law: New consideration is needed unless modifications result from unforeseen circumstances.
   - Case study: *Alaska Packers’ Association v. Domenico* - Fishermen's demand for higher wages was unenforceable due to a lack of new consideration.
   - UCC § 2-209 allows modifications without additional consideration in the sale of goods, provided they are made in good faith.

6. **Good Faith and Duress in Modifications**  
   - Modifications obtained under duress or coercion are unenforceable.
   - The importance of mutual agreement and the absence of undue pressure in modifying contracts.

7. **Material Changes and New Contracts**  
   - Distinction between minor modifications and fundamental changes that require new consideration.
   - Example: Increasing the scope of work or changing delivery terms creates a new contract.

8. **Application to Exam Essays**  
   - Tips on identifying consideration and modifications in law school essays:
     - Clearly define the "bargained-for exchange" principle.
     - Distinguish between valid and invalid modifications.
     - Highlight exceptions such as promissory estoppel and UCC rules.
     
`,
    Week_6_Supplement: `**Promissory Estoppel, Alternative Theories of Enforcement, and Contract Interpretation**

1. **Introduction to Promissory Estoppel**  
   - Definition of promissory estoppel as a mechanism to enforce promises that lack traditional consideration.
   - Elements required: A clear promise, reliance by the promisee, reliance that is reasonable and foreseeable, and resulting detriment.
   - Case study: *Drennan v. Star Paving Co.* - Subcontractor’s bid was enforced because the general contractor relied on it in preparing the main bid.

2. **Alternative Theories of Enforcement**  
   - Quasi-contract (or unjust enrichment): Imposes obligations to prevent unjust enrichment even in the absence of a formal contract.
   - Example: A plumber repairing a leaking pipe in an emergency without a prior agreement can recover the reasonable value of services rendered.
   - Public policy considerations, such as promoting fairness and preventing unjust enrichment, underlie these doctrines.

3. **Material Benefit Rule**  
   - Circumstances where a promise based on past benefits is enforceable.
   - Example: A homeowner promising to pay a rescuer who saved them from harm may be bound if the benefit was substantial and directly received.

4. **Contract Interpretation and the Parol Evidence Rule**  
   - Definition of the parol evidence rule: Prevents the introduction of prior or contemporaneous oral agreements that contradict a written contract.
   - Exceptions: Clarifying ambiguous terms, correcting clerical errors, or proving fraud, duress, or mistake.
   - Complete integration vs. partial integration: Fully integrated contracts exclude extrinsic evidence, while partially integrated ones allow consistent additional terms.

5. **Good Faith and Fair Dealing**  
   - Implied duty of good faith in the performance and enforcement of contracts.
   - Example: A landlord refusing to renew a lease solely to prevent the tenant from exercising an option may violate this duty.

6. **Application to Exam Essays**  
   - Structure essay responses using IRAC: Identify the issue, state the rule, apply the law to facts, and conclude.
   - Clearly differentiate between traditional consideration and reliance-based enforcement.
   - Use case examples to illustrate concepts of promissory estoppel and quasi-contract.
`,
    Week_7_Supplement: `
**Contract Modifications, Parol Evidence Rule, and Remedies for Breach**

1. **Introduction to Contract Modifications**  
   - Requirements under common law: Modifications require new consideration unless unforeseen circumstances arise.
   - Case study: *Alaska Packers’ Association v. Domenico* - Fishermen’s demand for higher wages lacked consideration.
   - UCC § 2-209: Allows modifications without additional consideration for the sale of goods, provided they are made in good faith.

2. **Good Faith and Duress in Modifications**  
   - Modifications obtained through coercion or bad faith are unenforceable.
   - Example: Supplier threatening to halt deliveries unless higher payments are made, exploiting the buyer’s lack of alternatives.

3. **Contract Interpretation and the Parol Evidence Rule**  
   - The parol evidence rule excludes extrinsic evidence that contradicts the terms of a fully integrated written contract.
   - Exceptions:
     - Clarifying ambiguous terms.
     - Correcting clerical errors.
     - Proving fraud, duress, or mistake.
   - UCC approach: Allows evidence to explain or supplement the contract if consistent with its terms.

4. **Statutory Interpretation and Contractual Clauses**  
   - Importance of clear language in contracts, including clauses that limit liability or specify remedies.
   - Example: "No oral modification" clauses are generally enforced but may be overridden under UCC § 2-209.

5. **Remedies for Breach of Contract**  
   - **Expectation Damages:** Restore the injured party to the position they would have been in if the contract had been fully performed.
   - **Reliance Damages:** Compensate for expenses incurred in reliance on the contract.
   - **Restitution:** Prevents unjust enrichment by requiring the breaching party to return any benefits received.
   - **Equitable Remedies:** Specific performance (available for unique goods or real estate) and injunctions (used to enforce non-compete clauses).

6. **Application to Exam Essays**  
   - Clearly distinguish between common law and UCC rules regarding modifications.
   - Identify when parol evidence is admissible and its impact on contract interpretation.
   - Accurately calculate damages based on the type of breach and the nature of the contract.
   - Use case examples like *Alaska Packers’ Association v. Domenico* and UCC § 2-209 to illustrate key points.
`,
    Week_8_Supplement: `
    **Contract Law Defenses: Incapacity, Misunderstanding, and Mistake**
    Supplement to Week 8:

    1. **Contract Law Defenses: Incapacity (Minors, Mental Illness, & Intoxication)**  
       - Overview of incapacity and its three main categories: minors, mental illness, and intoxication.
       - Minors: Contracts are voidable at the minor’s discretion until they reach 18, with exceptions for necessities.
       - Mental Illness: Contracts are voidable if the person was not in a lucid state during the agreement.
       - Intoxication: Contracts are voidable if the person was intoxicated to the extent that they could not understand the agreement.

    2. **Contract Law Defenses: Misunderstanding (Contract Ambiguity)**  
       - Misunderstanding occurs when parties assign different meanings to a term in the contract.
       - No contract if neither or both parties know of the misunderstanding unless they intended the same meaning.
       - If only one party is aware of the misunderstanding, the contract is enforceable based on the other party’s reasonable interpretation.

    3. **Contract Law Defenses: Mutual Mistake & Unilateral Mistake**  
       - Mutual Mistake: Both parties are mistaken about a fundamental fact, making the contract voidable.
       - Unilateral Mistake: Only one party is mistaken, but the contract is enforceable unless the other party knew or should have known of the mistake or the mistake makes the contract unconscionable.

    4. **Contract Law Defenses: Duress, Undue Influence, Illegality, & Unconscionability**  
       - Duress: Contracts entered under threats are voidable.
       - Undue Influence: Contracts are voidable if one party unfairly pressures another.
       - Illegality: Contracts with illegal purposes are unenforceable.
       - Unconscionability: Courts may refuse to enforce contracts that are excessively unfair.

    5. **Contract Law Defenses: Fraudulent & Nonfraudulent Misrepresentation**  
       - Fraudulent Misrepresentation: Deliberate false statements that induce agreement render the contract voidable.
       - Nonfraudulent Misrepresentation: Even unintentional false statements can make a contract voidable if they materially affect the agreement.

    URL References:
    - [Incapacity - LEAP Preview](https://www.youtube.com/watch?v=EL6Cnd__U6Q)
    - [Misunderstanding - LEAP Preview](https://www.youtube.com/watch?v=QC0tPrkFMEY)
    `,
    Week_9_Supplement: `**Supplement to Week 9: Acceptance and The Mailbox Rule**  
1. **Acceptance of an Offer**  
   - Acceptance requires an objective manifestation of willingness to enter into an agreement, not subjective hidden intentions.  
   - The offeree must follow the rules set by the offeror (the "master of the offer"), including specific methods of acceptance (e.g., performing three backflips or signing a letter).  
   - The power of acceptance lies with the individual to whom the offer is specifically made.

2. **Unilateral vs. Bilateral Contracts**  
   - **Bilateral Contracts:** Acceptance can be made either by a return promise or by starting performance. Example: Agreeing to buy a marker for $5 constitutes acceptance upon promising to pay or beginning performance.  
   - **Unilateral Contracts:** Acceptance is only valid upon completing performance. Example: Finding and returning a missing cat completes the acceptance of the offer. Starting performance makes the offer irrevocable but does not constitute acceptance.

3. **Mailbox Rule**  
   - Acceptance sent by mail becomes valid the moment it is dropped in the mailbox, not when received.  
   - Exceptions to the mailbox rule:  
     - **Irrevocable Offers:** The rule does not apply to option contracts or firm offers.  
     - **Termination Letter Sent First:** If the offeree sends a termination letter (rejection or counteroffer) before the acceptance letter, the first letter received by the offeror controls.  
     - **Non-Acceptance Communications:** The mailbox rule applies only to acceptance letters. Rejections, revocations, and counteroffers become valid upon receipt.  
   
4. **Contest and Reward Offers**  
   - For contests and rewards, acceptance occurs upon completing the required performance.  
   - The offeree must be aware of the offer to claim acceptance, such as knowing about a reward before finding and returning a lost item.

5. **Timeline Clarifications**  
   - If an acceptance letter is mailed first, the offer is accepted immediately, and subsequent termination letters have no effect.  
   - If a termination letter is mailed first, the offeror’s decision depends on which letter they open first.  
   - The mailbox rule does not apply if the offer is irrevocable or if the termination letter precedes the acceptance letter.

This detailed summary ensures a comprehensive understanding of acceptance and the mailbox rule, essential for analyzing contracts in legal essays.`,
    Week_10_Supplement: `
"Supplement to Week 10"
This supplement covers the implied warranty of merchantability and the implied warranty of fitness for a particular purpose under contract law. Key concepts include:

1. **Express Warranties vs. Implied Warranties**
   - Express warranties are created through affirmations of fact, product descriptions, or samples/models forming the basis of the bargain.
   - Implied warranties apply automatically by law unless explicitly disclaimed.

2. **Implied Warranty of Merchantability**
   - Applies only if the seller is a merchant who regularly deals in goods of that kind.
   - Ensures goods are fit for their ordinary commercial purpose unless properly disclaimed.

3. **Implied Warranty of Fitness for a Particular Purpose**
   - Applies when a seller knows or has reason to know that the buyer relies on the seller’s skill or judgment to select suitable goods.
   - Applies to any seller, not just merchants.

4. **Disclaimers of Warranties**
   - Express warranties are difficult to disclaim due to the reasonableness standard under the UCC.
   - Implied warranties may be disclaimed orally or in writing, provided the disclaimer is clear and conspicuous.

5. **Key Examples**
   - Statements of fact create warranties, but mere opinions do not.
   - Product samples and models set performance standards that must be met.
   - Breach of warranty can result in liability for failing to meet promised quality or characteristics.

This supplement reinforces how warranties define contractual performance obligations and addresses the limits of disclaimers under the UCC.`,

    Week_12_Supplement: `
    **Supplement to Week 12: Approaching Contract Law Fact Patterns**
    
    1. **Overview of Contract Law Flow**
       - Understanding the three-step analysis:
         a. Formation: Assess whether a traditional enforceable contract exists (mutual assent, consideration, no defenses, statute of frauds).
         b. Performance: Determine if both parties performed their contractual duties. Failure to perform constitutes a breach.
         c. Remedies: If there's a breach, explore monetary damages (expectation, reliance, restitution) and equitable relief (specific performance, injunctions).

    2. **Alternative Theories of Enforcement**
       - Promissory Estoppel: Allows recovery when a party reasonably relies on a promise to their detriment, even without consideration.
       - Quasi-Contract/Unjust Enrichment: Prevents unfair gain when one party receives a benefit without compensation.
       - Moral Obligations Plus Subsequent Promises: Enforces promises made after receiving a material benefit.

    3. **Issue Spotting with Mnemonics**
       - Formation: **MY CATS DO SNEAK** (Mutual Assent, Consideration, Defenses, Statute of Frauds).
       - Performance: **SARAH PLAYS WITH CATS EVERY AFTERNOON** (Substantial Performance, Parol Evidence Rule, Warranties, Conditions, Excuses, Anticipatory Repudiation).
       - Remedies: **MIM** (Monetary Damages, Equitable Relief, Mitigation of Damages).

    4. **Analyzing Fact Patterns**
       - Identify the stage of the contract (Formation, Performance, or Remedies).
       - Evaluate if the facts indicate a breach or the possibility of alternative enforcement theories.
       - Determine the appropriate remedy based on the type of breach and available legal or equitable relief.

    5. **Practical Exam Tips**
       - Always consider alternative theories if no traditional contract is found.
       - Use clear headings in essay responses (Formation, Performance, Remedies).
       - Keep answers concise but comprehensive, focusing on key issues and legal principles.

    This supplement consolidates the core concepts of contract law and practical strategies for approaching exam fact patterns effectively.
    `,
};

const ANTHROPIC_API_KEY = "";
const WEAVIATE_URL = "";
const WEAVIATE_API_KEY = "";
const OPEN_AI_API_KEY = "";

const openai = new OpenAI({
    apiKey: OPEN_AI_API_KEY,
});

const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
});

const weaviateClient = await weaviate.connectToWeaviateCloud(WEAVIATE_URL, {
    authCredentials: new weaviate.ApiKey(WEAVIATE_API_KEY),
    headers: {
        "X-OpenAI-Api-Key": OPEN_AI_API_KEY,
    },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FOR WEEKS 1-8:
const fiveMinuteDir = join(__dirname, ".", "30SecJsonOutput", "week1"); // < change week1 to week2, week3, etc. for different weeks>

// FOR WEEK 9:
// const fiveMinuteDir = join(__dirname, ".", "week9");

// FOR WEEKS 10-13:
// const fiveMinuteDir = join(__dirname, ".", "Week_10"); // < change Week_10 to Week_11, Week_12, etc. for different weeks>

const jsonFiles = fs
    .readdirSync(fiveMinuteDir)
    .filter(
        (item) => !fs.statSync(path.join(fiveMinuteDir, item)).isDirectory()
    );

const fileContents = jsonFiles.map((file) => {
    const filePath = path.join(fiveMinuteDir, file);
    return fs.readFileSync(filePath, "utf-8"); // Reads the file content as a string
});

// // console.log("jsonFiles", jsonFiles)

// .filter((file) =>
//     file.endsWith(".json")
// );

const categoryDescriptions = {};

// to-do: function that will take in all the video content for a category and use anthropic sonnet to write a 4 sentence desscription of this category and return an array of 10-20 topics discussed in this category. use tool calling to return json reliably. the object should be { description: string, topics: string[] }

// const writeDetailedDescriptionOfCategory = async (
//     categoryName,
//     categoryContent
// ) => {
//     const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini", //"claude-3-5-sonnet-20240620",
//         // system: "You are an expert at summarizing video content and extracting key topics. Provide a 5-sentence description of the category and list 10-20 topics discussed in this category in Spanish.",
//         tool_choice: {
//             type: "function",
//             function: {
//                 name: "print_category_details",
//             },
//         },
//         temperature: 0,
//         tools: [
//             {
//                 type: "function",
//                 function: {
//                     name: "print_category_details",
//                     description:
//                         "Prints a JSON object containing a 5-sentence description and an array of 10-20 topics discussed for the given category in Spanish.",
//                     parameters: {
//                         type: "object",
//                         properties: {
//                             description: { type: "string" },
//                             topics: {
//                                 type: "array",
//                                 items: { type: "string" },
//                             },
//                         },
//                         required: ["description", "topics"],
//                     },
//                 },
//             },
//         ],
//         max_tokens: 1024,
//         messages: [
//             {
//                 role: "system",
//                 content:
//                     "You are an expert at summarizing video content and extracting key topics. Provide a 5-sentence description of the category and list 10-20 topics discussed in this category in Spanish. ",
//             },
//             {
//                 role: "user",
//                 content: JSON.stringify(categoryContent),
//             },
//         ],
//     });

//     // @ts-ignore
//     // const result = response.content[0].input;

//     const jsonStr =
//         response.choices[0].message.tool_calls[0].function.arguments;

//     const result = JSON.parse(jsonStr);

//     // @ts-ignore

//     categoryDescriptions[categoryName] = result;
//     return result;
// };

async function createCollection(category) {
    // each COLLECTION is a "category" of videos
    // each OBJECT is a "video"
    // every "video" has a title, url, topics array, and segments array

    await weaviateClient.collections.delete(category);

    const collection = await weaviateClient.collections.create({
        name: category,
        properties: [
            {
                name: "title",
                dataType: dataType.TEXT,
            },
            {
                name: "url",
                dataType: dataType.TEXT,
            },
            {
                name: "topics",
                dataType: dataType.TEXT_ARRAY,
            },
            {
                name: "segments",
                dataType: dataType.OBJECT_ARRAY,
                nestedProperties: [
                    {
                        name: "time",
                        dataType: dataType.TEXT,
                    },
                    {
                        name: "text",
                        dataType: dataType.TEXT,
                    },
                ],
            },
        ],
        vectorizers: vectorizer.text2VecOpenAI(),
        generative: generative.openAI(),
    });

    // console.log(`collection ${collection.name} created!`);
}

const processVideo = async (video, isSequential = false) => {
    const maxRetries = 5;
    let delay = 1000;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await openai.chat.completions.create({
                // model: "claude-3-5-sonnet-20240620",
                model: "gpt-4o-mini",
                // system: "You are an expert at extracting topics from a video. Extract 10-20 topics discussed in a video. Respond in Spanish",
                tool_choice: {
                    type: "function",
                    function: {
                        name: "print_topics",
                    },
                },
                temperature: 0,
                tools: [
                    {
                        type: "function",
                        function: {
                            name: "print_topics",
                            description:
                                "Prints an array of 10-20 topics discussed in a video.",
                            parameters: {
                                type: "object",
                                properties: {
                                    topics: {
                                        type: "array",
                                        items: { type: "string" },
                                    },
                                },
                                required: ["topics"],
                            },
                        },
                    },
                ],
                max_tokens: 512,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an expert at extracting topics from a video. Extract 10-20 topics discussed in a video.",
                    },
                    {
                        role: "user",
                        content: JSON.stringify(video),
                    },
                ],
            });

            // console.log("response", JSON.stringify(response));

            const jsonStr =
                response.choices[0].message.tool_calls[0].function.arguments;

            const json = JSON.parse(jsonStr);

            // @ts-ignore
            const topics = json.topics;
            // console.log("topics", topics);

            return { ...video, topics };
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
            if (attempt === maxRetries - 1) {
                if (isSequential) throw error;
                // console.log(
                //     "Switching to sequential processing for this video."
                // );
                return await processVideo(video, true);
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
};

const processJSONs = async () => {
    // // console.log("jsonFiles", jsonFiles);
    // Assuming jsonFiles is now an array of folder names
    // try {
    //     await createCollection("Week_10");
    // } catch (error) {
    //     // console.log(error);
    // }

    for (const fileContent of fileContents) {
        const categoryName = "Week_1"; // ******************************************************************

        // if category name not in namestodo list, skip
        // if (namesToDo.includes(categoryName)) continue;

        // const folderPath = join(fiveMinuteDir, folder);
        // const fileContent = readFileSync(folderPath, "utf-8");
        // // console.log("fileContent", JSON.stringify(fileContent.slice(0, 100)));
        // .filter((file) =>
        //     file.endsWith(".json")
        // );

        // // console.log("folderPath", folderPath);
        // // console.log("files", files);

        // return
        // let allTopics = [];

        // const fileContent = [];

        // try to create collection if it hasn't already been created

        // for (const file of files) {
        // const filePath = join(folderPath, file);
        // // console.log("filePath", filePath);
        // let jsonContent = JSON.parse(readFileSync(filePath, "utf-8"));

        // try {
        //     // Try concurrent processing first
        //     const topicPromises = jsonContent.map((video) =>
        //         processVideo(video)
        //     );
        //     const processedVideos = await Promise.all(topicPromises);

        //     // console.log("processedVideos", processedVideos);

        //     fileContent.push(processedVideos);

        //     allTopics = fileContent.concat(
        //         processedVideos.map((video) => video.topics)
        //     );
        // } catch (error) {
        //     console.error(
        //         `Concurrent processing failed for ${file}. Switching to sequential processing.`
        //     );
        //     // If concurrent processing fails, switch to sequential
        //     for (const video of jsonContent) {
        //         try {
        //             const processedVideo = await processVideo(video, true);
        //             fileContent.push(processedVideo);
        //             allTopics = allTopics.concat(processedVideo.topics);
        //         } catch (error) {
        //             console.error(
        //                 `Failed to process video: ${error.message}`
        //             );
        //             // You might want to add the original video without topics or handle this error differently
        //             // fileContent.push(video);
        //         }
        //     }
        // }
        // }

        // // console.log("fileContent", fileContent);

        // chunk files

        // // console.log("importing data for", categoryName);
        if (!fileContent || fileContent.length === 0) {
            // console.log("fileContent is empty or undefined");
        } else {
            // const importPromises = fileContent.map(async (videoContent) => {
            console.log(
                "importing data for",
                categoryName,
                fileContent.slice(0, 100)
            );
            await importData(categoryName, fileContent);
            // });

            // await Promise.all(importPromises);
            // console.log("All import operations completed");
        }

        // const detailedDescription = await writeDetailedDescriptionOfCategory(
        //     categoryName,
        //     fileContent
        // );
    }
};

//  await processJSONs();

async function processAllWeeksOld() {
    // Create collections for all weeks first
    for (let week = 1; week <= 13; week++) {
        const categoryName = `Week_${week}`;
        try {
            await createCollection(categoryName);
            console.log(`Created collection for ${categoryName}`);
        } catch (error) {
            console.error(
                `Error creating collection for ${categoryName}:`,
                error
            );
        }
    }

    // Weeks 1-8 use the 30SecJsonOutput directory
    for (let week = 1; week <= 8; week++) {
        const weekDir = join(__dirname, ".", "30SecJsonOutput", `week${week}`);
        const categoryName = `Week_${week}`;

        console.log(`Processing ${categoryName}...`);

        try {
            // Get JSON files for this week
            const jsonFiles = fs
                .readdirSync(weekDir)
                .filter(
                    (file) =>
                        !fs.statSync(path.join(weekDir, file)).isDirectory()
                );

            console.log(`Found ${jsonFiles.length} files for ${categoryName}`);

            const fileContents = jsonFiles.map((file) => {
                const filePath = path.join(weekDir, file);
                return fs.readFileSync(filePath, "utf-8");
            });

            // Process each file in this week
            for (const fileContent of fileContents) {
                try {
                    // Process videos to extract topics
                    const json = JSON.parse(fileContent);
                    const processedVideos = [];

                    // Process each video sequentially
                    for (const video of json) {
                        try {
                            const processedVideo = await processVideo(
                                video,
                                true
                            );
                            processedVideos.push(processedVideo);
                        } catch (error) {
                            console.error(
                                `Error processing video in ${categoryName}:`,
                                error
                            );
                        }
                    }

                    // Import processed data
                    if (processedVideos.length > 0) {
                        await importData(
                            categoryName,
                            JSON.stringify(processedVideos)
                        );
                        console.log(
                            `Imported ${processedVideos.length} videos for ${categoryName}`
                        );
                    }
                } catch (error) {
                    console.error(
                        `Error processing file content in ${categoryName}:`,
                        error
                    );
                }
            }

            console.log(`Completed processing ${categoryName}`);
        } catch (error) {
            console.error(`Error processing ${categoryName}:`, error);
            continue;
        }
    }

    // Week 9 uses a different directory structure
    try {
        const week9Dir = join(__dirname, ".", "week9");
        const categoryName = "Week_9";
        console.log("Processing Week_9...");

        const jsonFiles = fs
            .readdirSync(week9Dir)
            .filter(
                (file) => !fs.statSync(path.join(week9Dir, file)).isDirectory()
            );

        const fileContents = jsonFiles.map((file) => {
            const filePath = path.join(week9Dir, file);
            return fs.readFileSync(filePath, "utf-8");
        });

        for (const fileContent of fileContents) {
            try {
                const json = JSON.parse(fileContent);
                const processedVideos = [];

                for (const video of json) {
                    try {
                        const processedVideo = await processVideo(video, true);
                        processedVideos.push(processedVideo);
                    } catch (error) {
                        console.error(
                            "Error processing video in Week_9:",
                            error
                        );
                    }
                }

                if (processedVideos.length > 0) {
                    await importData(
                        categoryName,
                        JSON.stringify(processedVideos)
                    );
                    console.log(
                        `Imported ${processedVideos.length} videos for Week_9`
                    );
                }
            } catch (error) {
                console.error(
                    "Error processing file content in Week_9:",
                    error
                );
            }
        }
    } catch (error) {
        console.error("Error processing Week_9:", error);
    }

    // Weeks 10-13 use another directory structure
    for (let week = 10; week <= 13; week++) {
        const weekDir = join(__dirname, ".", `Week_${week}`);
        const categoryName = `Week_${week}`;

        console.log(`Processing ${categoryName}...`);

        try {
            const jsonFiles = fs
                .readdirSync(weekDir)
                .filter(
                    (file) =>
                        !fs.statSync(path.join(weekDir, file)).isDirectory()
                );

            const fileContents = jsonFiles.map((file) => {
                const filePath = path.join(weekDir, file);
                return fs.readFileSync(filePath, "utf-8");
            });

            for (const fileContent of fileContents) {
                try {
                    const json = JSON.parse(fileContent);
                    const processedVideos = [];

                    for (const video of json) {
                        try {
                            const processedVideo = await processVideo(
                                video,
                                true
                            );
                            processedVideos.push(processedVideo);
                        } catch (error) {
                            console.error(
                                `Error processing video in ${categoryName}:`,
                                error
                            );
                        }
                    }

                    if (processedVideos.length > 0) {
                        await importData(
                            categoryName,
                            JSON.stringify(processedVideos)
                        );
                        console.log(
                            `Imported ${processedVideos.length} videos for ${categoryName}`
                        );
                    }
                } catch (error) {
                    console.error(
                        `Error processing file content in ${categoryName}:`,
                        error
                    );
                }
            }

            console.log(`Completed processing ${categoryName}`);
        } catch (error) {
            console.error(`Error processing ${categoryName}:`, error);
            continue;
        }
    }

    console.log("Completed processing all weeks!");
}

//await processAllWeeks();

async function processAllWeeks() {
    // Track which collections already exist
    const existingCollections = new Set();
    try {
        const collections = await weaviateClient.collections.listAll();
        collections.forEach((col) => existingCollections.add(col.name));
    } catch (error) {
        console.error("Error fetching existing collections:", error);
        throw error;
    }

    // Helper function to process a directory

    async function processDirectory(dirPath, categoryName) {
        if (
            existingCollections.has(categoryName) &&
            !categoryName.includes("Supplement")
        ) {
            console.log(`Skipping existing collection ${categoryName}`);
            return;
        }

        console.log(`Processing ${categoryName}...`);
        try {
            // Create collection if it doesn't exist
            await createCollection(categoryName);

            const jsonFiles = fs
                .readdirSync(dirPath)
                .filter(
                    (file) =>
                        !fs.statSync(path.join(dirPath, file)).isDirectory()
                );

            for (const file of jsonFiles) {
                const filePath = path.join(dirPath, file);
                const fileContent = fs.readFileSync(filePath, "utf-8");

                try {
                    const json = JSON.parse(fileContent);
                    const processedVideos = [];

                    // Handle both array and object JSON structures
                    const videosToProcess = Array.isArray(json) ? json : [json];

                    // Process each video sequentially
                    for (const video of videosToProcess) {
                        try {
                            const processedVideo = await processVideo(
                                video,
                                true
                            );
                            processedVideos.push(processedVideo);
                        } catch (error) {
                            console.error(
                                `Error processing video in ${categoryName}:`,
                                error
                            );
                        }
                    }

                    // Import processed data
                    if (processedVideos.length > 0) {
                        await importData(
                            categoryName,
                            JSON.stringify(processedVideos)
                        );
                        console.log(
                            `Imported ${processedVideos.length} videos for ${categoryName}`
                        );
                    }
                } catch (error) {
                    console.error(
                        `Error processing file ${file} in ${categoryName}:`,
                        error
                    );
                }
            }
        } catch (error) {
            console.error(`Error processing ${categoryName}:`, error);
        }
    }

    // Process regular weeks 1-8 (30SecJsonOutput)
    for (let week = 1; week <= 8; week++) {
        const weekDir = join(__dirname, ".", "30SecJsonOutput", `week${week}`);
        const categoryName = `Week_${week}`;
        await processDirectory(weekDir, categoryName);
    }

    // Process week 9
    const week9Dir = join(__dirname, ".", "week9");
    await processDirectory(week9Dir, "Week_9");

    // Process weeks 10-13
    for (let week = 10; week <= 13; week++) {
        const weekDir = join(__dirname, ".", `Week_${week}`);
        const categoryName = `Week_${week}`;
        await processDirectory(weekDir, categoryName);
    }

    // Process supplements
    const studacataDir = join(__dirname, ".", "Studacata");
    for (let week = 1; week <= 12; week++) {
        const supplementDir = join(studacataDir, `Supplement-Week_${week}`);
        const categoryName = `Week_${week}_Supplement`;

        // Check if supplement directory exists
        if (fs.existsSync(supplementDir)) {
            await processDirectory(supplementDir, categoryName);
        } else {
            console.log(
                `No supplement directory found for Week ${week}, skipping...`
            );
        }
    }

    console.log("Completed processing all weeks and supplements!");
}

// await processAllWeeks();
// // console.log(categoryDescriptions);

// // save categoryDescriptions to a file
// writeFileSync(
//     join(__dirname, "categoryDescriptions.json"),
//     JSON.stringify(categoryDescriptions, null, 2)
// );

async function importData(category, videos) {
    console.log("IMPORT for", category, JSON.stringify(videos).slice(0, 300));
    const json = JSON.parse(videos);
    const collection = weaviateClient.collections.get(category);

    const result = await collection.data.insertMany(json);
    console.log("result", result);
    // console.log("We just bulk inserted for", category);
}

async function getRelevantCategories(query) {
    const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        system: "You are an expert at categorizing queries. Given a user query, determine relevant categories to search for information.",
        tool_choice: {
            type: "tool",

            name: "print_categories",
        },
        temperature: 0,
        tools: [
            {
                name: "print_categories",
                description:
                    "Prints an array of relevant category names for the given query. Available categories:\n" +
                    JSON.stringify(categoriesMapping, null, 2),
                input_schema: {
                    type: "object",
                    properties: {
                        categories: {
                            type: "array",
                            items: { type: "string" },
                        },
                    },
                    required: ["categories"],
                },
            },
        ],
        max_tokens: 400,
        messages: [
            // {
            //     role: "system",
            //     content:
            //         "You are an expert at categorizing queries. Given a user query, determine relevant categories to search for information.",
            // },
            {
                role: "user",
                content: query,
            },
        ],
    });

    // @ts-ignore
    const categories = response.content[0].input.categories;

    // const jsonStr =
    //     response.choices[0].message.tool_calls[0].function.arguments;

    // const json = JSON.parse(jsonStr);

    // // @ts-ignore
    // const categories = json.categories;

    // // console.log("Relevant categories:", categories);

    return categories;
}

const searchCollection = async (query, category) => {
    try {
        const collection = weaviateClient.collections.get(category);

        const result = await collection.query.nearText(query, {
            limit: 3,
            returnMetadata: ["distance"],
        });

        return result.objects;
    } catch (error) {
        console.error(`Error searching collection ${category}:`, error.message);
        return [];
    }
};

const runQuery = async (query) => {
    const relevantCategories = await getRelevantCategories(query);

    console.log(relevantCategories);

    const relevantVideos = await Promise.all(
        relevantCategories.map((category) =>
            searchCollection(query, category).catch((error) => {
                console.error(`Failed to search ${category}:`, error.message);
                return [];
            })
        )
    );

    // // console.log(JSON.stringify(relevantVideos, null, 2));

    const systemPrompt = `Video Search Prompt: Priority-Based Retrieval (Primary First, Supplements Last)
Task: Using the provided video library as context, deliver precise answers that include:

A clear explanation of the topic.
Direct timestamp links to the exact moments where the specific term/concept is mentioned and explained.
Supporting context from both primary and supplement videos, with supplements only searched after completing all primary searches.
Search Priority:
Primary Search:

Search all files labeled as "Week [X]" (e.g., Week_4, Week_9) before checking any supplement files.
Collect timestamps where the term/concept is explicitly mentioned, fully explained, and additional context is provided.
Stop searching for supplements if comprehensive results are found in the primary files unless additional context is explicitly requested.
Secondary Search (Supplements):

After completing all primary searches, only then search the corresponding "Week [X]_Supplement" files (e.g., Week_4_Supplement, Week_9_Supplement).
Supplements should only be included if they provide unique or additional insights not found in the primary files.
Response Format:
plaintext
Copy
Edit
<answer>
Provide a comprehensive explanation of the concept/topic, prioritizing insights from primary videos. Use supplements only to add context or additional examples if necessary.
</answer>

<citations>
- **Primary Videos:**
  - Topic Mention: [Week_X] (HH:MM:SS) - Exact timestamp where the term is first mentioned.
  - Main Explanation: [Week_X] (HH:MM:SS-HH:MM:SS) - Timestamp range covering the full explanation.
  - Related Context: [Week_X] (HH:MM:SS-HH:MM:SS) - Additional relevant segments.

- **Supplement Videos (If Used):**
  - Topic Mention: [Week_X_Supplement] (HH:MM:SS) - Exact timestamp where the term is first mentioned.
  - Extended Explanation: [Week_X_Supplement] (HH:MM:SS-HH:MM:SS) - Deeper dive or additional examples.
  - Related Context: [Week_X_Supplement] (HH:MM:SS-HH:MM:SS) - Broader context related to the main topic.
</citations>
Requirements:
✅ Precise Timestamps: Must be accurate to the second where the term is explicitly mentioned.
✅ Sequential Mentions: List all relevant timestamps in chronological order.
✅ Primary vs. Supplement Distinction: Clearly distinguish between timestamps from the primary week files and supplements.
✅ Surrounding Context: Include timestamps for surrounding context if the term is part of a sequential lecture.
✅ Direct Quotes: Provide direct quotes from the videos when relevant.
✅ Multiple Terms: For searches involving multiple terms, create separate timestamp sections for each term.

Example Query: "mirror image rule"
Example Response:
plaintext
Copy
Edit
<answer>
The mirror image rule states that for an acceptance to be valid, it must exactly match the terms of the offer without any modifications or additions. If the acceptance changes any terms, it acts as a counteroffer rather than an acceptance. The Uniform Commercial Code (UCC) modifies this rule in certain commercial transactions.
</answer>

<citations>
- **Primary Videos:**
  - Topic Mention: Week_4 (12:45) - "Let's discuss the mirror image rule..."
  - Main Explanation: Week_4 (12:45-14:30) - Detailed explanation with legal examples.
  - Related Context: Week_4 (14:31-15:00) - Exceptions under the UCC.

- **Supplement Videos (Only if Primary Was Not Enough):**
  - Topic Mention: Week_4_Supplement (08:20) - Reference to mirror image rule in negotiation scenarios.
  - Extended Explanation: Week_4_Supplement (08:20-09:45) - Application in modern contract disputes.
  - Related Context: Week_4_Supplement (10:00-10:50) - Comparison with the UCC’s "battle of the forms" under § 2-207.
</citations>
Important Notes:
🔹 Search Order: Always search primary week files first, then search supplements only if necessary.
🔹 Comprehensive First Pass: Do not switch to supplements unless no relevant timestamps are found or additional context is requested.
🔹 Minimal Supplement Use: Limit supplement timestamps unless they provide distinct and valuable information not covered in primary files.
`;

    const messages = [
        {
            role: "system",
            content: systemPrompt,
        },
        {
            role: "user",
            content: `<relevant video context>
${JSON.stringify(relevantVideos)}
</relevant video context>

<user query>
${query}
</user query>

<important>
IMPORANT: You MUST cite your sources (video name, timestamp range, video url) - only use one video no more than twice - make sure to use others if you need to 
</important>`,
        },
    ];

    // give the relevant videos as context in an anthropic request
    // const result = await anthropic.messages.create({
    const result = await openai.chat.completions.create({
        model: "o3-mini",
        // system: systempPrompt
        // temperature: 0,
        // max_tokens: 4096,
        // @ts-ignore
        messages: messages,
    });

    // @ts-ignore
    // const answer = result.content[0].text;

    // console.log("result", result.choices[0].message);
    const answer = result.choices[0].message.content;

    console.log(answer);
};

runQuery("what is mirror image rule");
//
