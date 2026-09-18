import { useState } from 'react'
import { ScenarioSelector } from '../components/ScenarioSelector'
import { MoneyOutlook } from '../components/MoneyOutlook'
import { TimeMachine } from '../components/TimeMachine'
import { SimulationResult } from '../components/SimulationResult'
import { ChangeOneThing } from '../components/ChangeOneThing'

export function Future({ data, setData, decision, setDecision, result, selectedScenario, setSelectedScenario, onWhy }) { const [dayIndex, setDayIndex] = useState(0); return <section className="ms-page"><div className="ms-page-heading"><div><p className="ms-kicker"><i/> FUTURE SIMULATOR</p><h1>Compare the futures in front of you.</h1><p>Each route is calculated from the same balance, commitments, goals, and assumptions.</p></div></div><ScenarioSelector data={data} decision={decision} selected={selectedScenario} onSelect={setSelectedScenario}/><SimulationResult result={result} visible onWhy={onWhy}/><MoneyOutlook result={result} expanded/><TimeMachine result={result} dayIndex={dayIndex} setDayIndex={setDayIndex}/><ChangeOneThing result={result} data={data} setData={setData} decision={decision} setDecision={setDecision}/></section> }
