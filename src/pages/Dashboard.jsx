import { useState } from 'react'
import { FinancialSnapshot } from '../components/FinancialSnapshot'
import { FinancialData } from '../components/FinancialData'
import { DecisionInput } from '../components/DecisionInput'
import { SimulationResult } from '../components/SimulationResult'
import { ScenarioSelector } from '../components/ScenarioSelector'
import { CalculationBreakdown } from '../components/CalculationBreakdown'
import { MoneyOutlook } from '../components/MoneyOutlook'
import { TimeMachine } from '../components/TimeMachine'
import { ChangeOneThing } from '../components/ChangeOneThing'
import { GoalImpact } from '../components/GoalImpact'
import { CrashTest } from '../components/CrashTest'
import { SpendingTracker } from '../components/SpendingTracker'
import { AIThinking } from '../components/AIThinking'

export function Dashboard({ data, setData, decision, setDecision, result, simulated, onSimulate, error, selectedScenario, setSelectedScenario, stressTests, setStressTests, connected, onConnect, connecting }) {
  const [calculationOpen, setCalculationOpen] = useState(false)
  const [agentOpen, setAgentOpen] = useState(false)
  const [dayIndex, setDayIndex] = useState(0)
  return <><section className="ms-hero"><p className="ms-kicker"><i/> MONEY SANDBOX</p><h1>Before you spend,<br/><em>see the future.</em></h1><p>Test-drive a financial decision before your money leaves your account.</p></section><FinancialData connected={connected} onConnect={onConnect} loading={connecting}/><section className="ms-picture"><p className="ms-kicker"><i/> YOUR CURRENT FINANCIAL PICTURE</p><FinancialSnapshot data={data}/></section><div className="ms-step"><span>1</span><b>YOUR DECISION</b></div><DecisionInput decision={decision} setDecision={setDecision} onSimulate={onSimulate} error={error}/><div className="ms-step"><span>2</span><b>SIMULATE FUTURE</b></div><SimulationResult result={result} visible={simulated} onWhy={() => setAgentOpen(true)}/><div className="ms-step"><span>3</span><b>COMPARE FUTURES</b></div><ScenarioSelector data={data} decision={decision} selected={selectedScenario} onSelect={setSelectedScenario}/><ChangeOneThing result={result} data={data} setData={setData} decision={decision} setDecision={setDecision}/><CalculationBreakdown result={result} open={calculationOpen} setOpen={setCalculationOpen}/><MoneyOutlook result={result}/><TimeMachine result={result} dayIndex={dayIndex} setDayIndex={setDayIndex}/><div className="ms-two-column"><GoalImpact goal={data.goals?.[0]} result={result}/><CrashTest data={data} setData={setData} result={result} stressTests={stressTests} setStressTests={setStressTests}/></div><SpendingTracker transactions={data.spendingHistory}/><AIThinking open={agentOpen} setOpen={setAgentOpen}/></>
}
