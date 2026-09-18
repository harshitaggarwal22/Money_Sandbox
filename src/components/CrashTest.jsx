import { AlertTriangle, Play } from 'lucide-react'
import { formatINR } from '../utils/currency'
import { RiskBadge } from './ScenarioSelector'

const tests = [['salaryDelay', 'Salary arrives 10 days late'], ['emergency', 'Emergency expense'], ['weekend', 'Weekend spending becomes 2×'], ['unexpectedBill', 'Unexpected bill ₹5,000']]

export function CrashTest({ data, setData, result, stressTests, setStressTests }) {
  const setEmergency = value => setData(current => ({ ...current, assumptions: { ...current.assumptions, emergencyAmount: Math.max(0, Number(value || 0)) } }))
  const toggle = key => setStressTests(current => ({ ...current, [key]: !current[key] }))
  const enabled = Object.values(stressTests).some(Boolean)
  const status = result.crashBuffer < 0 ? 'Critical' : result.crashBuffer < result.safetyReserve ? 'Tight' : 'Safe'
  return <section className={`ms-crash ${enabled ? 'enabled' : ''}`}><p className="ms-kicker"><i/> FINANCIAL CRASH TEST</p><h2>What if something goes wrong?</h2><p>Run a simulated stress test against the future you selected.</p><div className="ms-stress-options">{tests.map(([key,label]) => <label key={key}><input type="checkbox" checked={Boolean(stressTests[key])} onChange={() => toggle(key)}/><span>{label}{key === 'emergency' && <em>₹ <input aria-label="Emergency expense amount" type="number" min="0" value={data.assumptions.emergencyAmount} onClick={event => event.stopPropagation()} onChange={event => setEmergency(event.target.value)}/></em>}</span></label>)}</div><button className="ms-stress-run" onClick={() => !enabled && toggle('emergency')}><Play size={14}/>Run stress test</button>{enabled && <div className="ms-crash-result"><div><span>Scenarios survived</span><b>{result.crashBuffer >= 0 ? `${Math.max(0, 4 - result.selectedStressCount)}/4` : '0/4'}</b></div><div><span>Worst projected buffer</span><b className={result.crashBuffer < 0 ? 'negative' : ''}>{formatINR(result.crashBuffer)}</b></div><div><span>Days below safe zone</span><b>{result.daysBelowSafeZone}</b></div><RiskBadge risk={result.risk}/><p><AlertTriangle size={14}/>{status === 'Critical' ? ' This decision does not survive the selected simulations.' : status === 'Tight' ? ' Simulated resilience is tight; consider waiting or lowering the purchase cost.' : ' Simulated resilience remains healthy across the selected tests.'}</p></div>}</section>
}
