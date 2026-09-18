import { ShieldAlert } from 'lucide-react'
import { CrashTest } from '../components/CrashTest'
import { ChangeOneThing } from '../components/ChangeOneThing'

export function StressTest({ data, setData, decision, setDecision, result, stressTests, setStressTests }) {
  return <section className="ms-page"><div className="ms-page-heading"><div><p className="ms-kicker"><i/> STRESS TEST</p><h1>How resilient is this decision?</h1><p>Pressure-test your selected future. These are simulations based on assumptions, not financial predictions.</p></div><ShieldAlert size={28} color="#bb7a38"/></div><CrashTest data={data} setData={setData} result={result} stressTests={stressTests} setStressTests={setStressTests}/><ChangeOneThing result={result} data={data} setData={setData} decision={decision} setDecision={setDecision}/></section>
}
