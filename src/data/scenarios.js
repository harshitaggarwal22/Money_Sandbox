export const scenarios = [
  { id: 'buy-now', name: 'Buy now', short: 'BUY NOW', buffer: 3200, risk: 'High', impact: -41, stress: 78, delay: 0, description: 'Pay ₹18,000 today', verdict: 'Buying today creates pressure later.' },
  { id: 'wait', name: 'Wait 12 days', short: 'WAIT 12 DAYS', buffer: 9400, risk: 'Low', impact: -12, stress: 29, delay: 12, description: 'Let commitments clear first', verdict: 'Waiting gives your cash flow room to breathe.' },
  { id: 'emi', name: 'Use EMI', short: 'USE EMI', buffer: 12800, risk: 'Medium', impact: -19, stress: 46, delay: 0, description: '₹3,250 × 6 months', verdict: 'EMI protects cash today, but creates a future obligation.' },
  { id: 'alternative', name: '₹12K alternative', short: '₹12K ALTERNATIVE', buffer: 14100, risk: 'Low', impact: -8, stress: 22, delay: 0, description: 'Choose a smart alternative', verdict: 'A lower-cost choice keeps your plans on track.' }
]

export const crashTests = [
  { id: 'emergency', title: 'Emergency expense', value: '₹5,000', effect: 5000, icon: 'shield' },
  { id: 'salary', title: 'Salary delay', value: '+10 days', effect: 2600, icon: 'clock' },
  { id: 'weekend', title: 'Weekend spending', value: '2× normal', effect: 1800, icon: 'coffee' },
  { id: 'shock', title: 'Medical / travel shock', value: '₹3,500', effect: 3500, icon: 'activity' }
]

export const agents = [
  { id: 'cashflow', label: 'Cashflow Agent', title: 'Cashflow Agent', description: 'Maps your balance against committed bills and expected inflows.', tags: ['Current balance', 'Upcoming bills', 'Expected inflows'], tone: 'navy' },
  { id: 'behaviour', label: 'Behaviour Agent', title: 'Behaviour Agent', description: 'Uses the synthetic profile to spot recurring patterns that affect this decision.', tags: ['Weekend pattern', 'Category trends', 'Salary behaviour'], tone: 'teal' },
  { id: 'scenario', label: 'Scenario Agent', title: 'Scenario Agent', description: 'Creates multiple practical paths forward instead of a single answer.', tags: ['Buy now', 'Delay', 'EMI', 'Alternative'], tone: 'amber' },
  { id: 'risk', label: 'Risk Agent', title: 'Risk Agent', description: 'Stress-tests the downside when ordinary life goes off-plan.', tags: ['Buffer analysis', 'Stress tests', 'Downside risk'], tone: 'red' },
  { id: 'goal', label: 'Goal Agent', title: 'Goal Agent', description: 'Measures how this decision changes confidence in reaching your goal.', tags: ['Target dates', 'Goal collision', 'Confidence'], tone: 'green' },
  { id: 'judge', label: 'Decision Judge', title: 'Decision Judge', description: 'Combines the evidence into a clear, explainable recommendation.', tags: ['Evidence weighting', 'Trade-offs', 'Verdict'], tone: 'purple' }
]
