export function calculateGoalImpact({ goal, baselineBalance, projectedBalance }) {
  if (!goal) return { before: 0, after: 0, impact: 0, message: 'Add a goal to see how this decision changes it.' }
  const before = Math.round((goal.currentSaved / goal.target) * 100)
  const decisionCost = Math.max(0, baselineBalance - projectedBalance)
  const after = Math.max(0, Math.round(((goal.currentSaved - decisionCost) / goal.target) * 100))
  return { before, after, impact: before - after, message: after < before ? `This purchase may delay your ${goal.name} goal.` : `This choice keeps your ${goal.name} goal on track.` }
}
