import { CalendarDays, ShieldCheck, Target, WalletCards } from 'lucide-react'
import { formatINR } from '../utils/currency'

export function FinancialSnapshot({ data }) {
  const expenses = data.upcomingExpenses.reduce((sum, item) => sum + Number(item.amount), 0)
  const activeGoals = data.goals?.length || 0
  return <section className="ms-snapshot" aria-label="Your current financial picture">
    <article><span className="blue"><WalletCards size={18}/></span><small>CURRENT BALANCE</small><b>{formatINR(data.currentBalance)}</b><p>Money you have today</p></article>
    <article><span className="amber"><CalendarDays size={18}/></span><small>UPCOMING COMMITMENTS</small><b>{formatINR(expenses)}</b><p>Due over the next 30 days</p></article>
    <article><span className="green"><Target size={18}/></span><small>ACTIVE GOALS</small><b>{activeGoals}</b><p>Goals influencing this decision</p></article>
    <article><span className="blue"><ShieldCheck size={18}/></span><small>SAFE BUFFER</small><b>{formatINR(data.assumptions.safetyReserve)}</b><p>Minimum comfort zone</p></article>
  </section>
}
