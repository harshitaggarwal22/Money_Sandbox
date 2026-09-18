export function runCrashTest(projectedBalance, emergencyEnabled, emergencyAmount) { return emergencyEnabled ? projectedBalance - Number(emergencyAmount || 0) : projectedBalance }
