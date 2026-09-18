export const defaultDemoData = {
  currentBalance: 32000,
  upcomingExpenses: [
    { id: 'rent', name: 'Rent', amount: 5000, daysUntil: 5 },
    { id: 'bills', name: 'Bills', amount: 2600, daysUntil: 10 },
    { id: 'food', name: 'Food', amount: 3000, daysUntil: 15 },
    { id: 'travel', name: 'Travel', amount: 2000, daysUntil: 20 }
  ],
  expectedIncome: [{ id: 'salary', name: 'Salary', amount: 15000, daysUntil: 12 }],
  goals: [
    { id: 'goa', name: 'Goa Trip', target: 35000, currentSaved: 28700, targetDate: '2026-12-15' },
    { id: 'laptop', name: 'Laptop Fund', target: 60000, currentSaved: 24500, targetDate: '2027-02-28' },
    { id: 'emergency', name: 'Emergency Fund', target: 50000, currentSaved: 18000, targetDate: '2027-05-01' }
  ],
  purchase: { name: 'Buy a smartphone', amount: 18000, category: 'Electronics', purchaseDay: 0 },
  assumptions: { emergencyAmount: 10000, alternativeAmount: 12000, emiDownPayment: 3000, emiMonthlyPayment: 1500, emiMonths: 12, safetyReserve: 7500, delayDays: 12 },
  spendingHistory: [
    { id: 't1', name: 'Lunch', category: 'Food', amount: 450, day: 1, weekend: false, week: 'This week' },
    { id: 't2', name: 'Metro', category: 'Travel', amount: 280, day: 2, weekend: false, week: 'This week' },
    { id: 't3', name: 'Headphones', category: 'Shopping', amount: 1200, day: 6, weekend: true, week: 'This week' },
    { id: 't4', name: 'Electricity', category: 'Bills', amount: 2500, day: 7, weekend: false, week: 'This week' },
    { id: 't5', name: 'Movie night', category: 'Entertainment', amount: 650, day: 7, weekend: true, week: 'This week' },
    { id: 't6', name: 'Groceries', category: 'Food', amount: 900, day: 8, weekend: false, week: 'Last week' },
    { id: 't7', name: 'Cab', category: 'Travel', amount: 520, day: 9, weekend: true, week: 'Last week' },
    { id: 't8', name: 'Cafe', category: 'Food', amount: 380, day: 10, weekend: true, week: 'Last week' }
  ]
}

export const scenarioDefinitions = [
  { id: 'buy-now', label: 'Buy now', purchaseDay: 0, summary: 'Pay in full today' },
  { id: 'wait', label: 'Wait 12 days', purchaseDay: 12, summary: 'Let income arrive first' },
  { id: 'emi', label: 'Use EMI', purchaseDay: 0, summary: 'Down payment + first EMI' },
  { id: 'alternative', label: 'Cheaper alternative', purchaseDay: 0, summary: 'Use your alternative price' }
]

export const projectLinks = {
  liveDemo: 'https://your-live-demo-url',
  repository: 'https://github.com/your-repo',
  demoVideo: 'https://your-demo-video-url',
  presentation: 'https://your-presentation-url'
}
