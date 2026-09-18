import { scenarioDefinitions } from '../data/demoData'
import { calculateScenario } from '../engine/simulationEngine'
import { formatINR } from '../utils/currency'

const tone = risk => risk === 'Critical' || risk === 'High' ? 'high' : risk === 'Medium' ? 'medium' : 'low'
export function RiskBadge({ risk }) { return <span className={`ms-risk ${tone(risk)}`}><i/>{risk} risk</span> }
export function ScenarioSelector({ data, decision, selected, onSelect }) { return <section className="ms-scenarios"><div><p className="ms-kicker"><i/> WHAT IF YOU CHOOSE DIFFERENTLY?</p><h2>Compare four possible futures.</h2></div><div className="ms-scenario-grid">{scenarioDefinitions.map(item => { const result = calculateScenario({ data, decision, scenarioId: item.id }); return <button key={item.id} className={selected === item.id ? 'selected' : ''} onClick={() => onSelect(item.id)}><b>{item.label}</b><span>{item.summary}</span><strong>{formatINR(result.buffer)}</strong><small>Minimum projected buffer</small><div className="ms-scenario-meta"><span>Goal {result.goal.impact}%</span><span>{result.confidence}% confidence</span></div><RiskBadge risk={result.risk}/></button> })}</div></section> }
