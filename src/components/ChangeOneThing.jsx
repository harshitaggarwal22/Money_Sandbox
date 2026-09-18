import { Sparkles } from 'lucide-react'
import { formatINR } from '../utils/currency'

export function ChangeOneThing({ result, data, setData, decision, setDecision }) {
  const apply = type => {
    if (type === 'income') setData(current => ({ ...current, expectedIncome: current.expectedIncome.map((item, index) => index ? item : { ...item, amount: Number(item.amount) + 5000 }) }))
    if (type === 'spend') setData(current => ({ ...current, upcomingExpenses: current.upcomingExpenses.map((item, index) => index ? item : { ...item, amount: Math.max(0, Number(item.amount) - 2000) }) }))
    if (type === 'wait') setDecision(current => ({ ...current, purchaseDay: Math.min(30, Number(current.purchaseDay || 0) + 7) }))
    if (type === 'cheaper') setDecision(current => ({ ...current, amount: Math.max(0, Number(current.amount) - 3000) }))
  }
  return <section className="ms-change"><div><p className="ms-kicker"><i/> CHANGE ONE THING</p><h2>Try a better future in one tap.</h2><p>Every adjustment immediately recalculates your plan.</p></div><div className="ms-change-actions"><button onClick={() => apply('income')}>+₹5K income</button><button onClick={() => apply('spend')}>−₹2K spending</button><button onClick={() => apply('wait')}>Wait 7 days</button><button onClick={() => apply('cheaper')}>Buy ₹3K cheaper</button></div><div className="ms-change-result"><span><b>Now</b>{formatINR(result.buffer)} buffer</span><Sparkles size={15}/><span><b>Next</b>Pick one change above</span></div></section>
}
