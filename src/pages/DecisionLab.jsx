import { ArrowRight, CalendarDays, Landmark, ShieldCheck, Target, WalletCards } from 'lucide-react'
import { DecisionInput } from '../components/DecisionInput'
import { formatINR } from '../utils/currency'

export function DecisionLab({ data, decision, setDecision, onSimulate, error, setPage }) {
  const commitments = data.upcomingExpenses.reduce((sum, item) => sum + Number(item.amount), 0)
  const income = data.expectedIncome.reduce((sum, item) => sum + Number(item.amount), 0)
  const finish = () => { onSimulate(); window.setTimeout(() => setPage('future'), 200) }
  return <section className="ms-page ms-decision-lab"><div className="ms-page-heading"><div><p className="ms-kicker"><i/> DECISION LAB</p><h1>What are you planning?</h1><p>Turn a possible purchase into a clear, explainable financial future.</p></div></div><div className="ms-lab-grid"><div className="ms-lab-input"><div className="ms-natural"><span>“</span><p>I’m planning to buy <b>{decision.name || 'something important'}</b> for <b>{formatINR(decision.amount)}</b>.</p></div><DecisionInput decision={decision} setDecision={setDecision} onSimulate={finish} error={error}/><button className="ms-primary-lab" onClick={finish}>Simulate My Future <ArrowRight size={17}/></button></div><aside className="ms-financial-picture"><p className="ms-kicker"><i/> CURRENT FINANCIAL PICTURE</p><div><WalletCards size={16}/><span>Balance</span><b>{formatINR(data.currentBalance)}</b></div><div><CalendarDays size={16}/><span>Upcoming expenses</span><b>{formatINR(commitments)}</b></div><div><Landmark size={16}/><span>Expected income</span><b>{formatINR(income)}</b></div><div><ShieldCheck size={16}/><span>Emergency buffer</span><b>{formatINR(data.assumptions.safetyReserve)}</b></div><div><Target size={16}/><span>Active goals</span><b>{data.goals.length}</b></div></aside></div></section>
}
