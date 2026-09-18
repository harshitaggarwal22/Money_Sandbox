import { CalendarClock, ShieldCheck, Target } from 'lucide-react'
import { formatINR } from '../utils/currency'

export function TimeMachine({ result, dayIndex, setDayIndex }) {
  const point = result.timeline[dayIndex] || result.timeline[0]
  const stops = result.timeline.filter(item => [0, 7, 15, 22, 30].includes(item.dayNumber))
  const event = point.events?.join(' · ') || 'No major financial event scheduled'
  const confidence = Math.max(0, result.goal.after - Math.round(dayIndex * 0.7))
  return <section className="ms-time-machine"><div><p className="ms-kicker"><i/> MONEY TIME MACHINE</p><h2>Move through your future.</h2><p>Drag across all 30 days to inspect the plan at any moment.</p></div><div className="ms-time-readout"><span>{point.day.toUpperCase()}</span><strong>{formatINR(point.selected)}</strong><small>Projected balance</small><div><p><CalendarClock size={14}/>{event}</p><p><Target size={14}/>Goal confidence {confidence}%</p><p><ShieldCheck size={14}/>{point.selected >= result.safetyReserve ? 'Above minimum safe buffer' : 'Below minimum safe buffer'}</p></div></div><input aria-label="Money time machine day" type="range" min="0" max={30} value={dayIndex} onChange={event => setDayIndex(Number(event.target.value))}/><div className="ms-time-stops">{stops.map(item => <button key={item.day} className={item.dayNumber === dayIndex ? 'active' : ''} onClick={() => setDayIndex(item.dayNumber)}>{item.day}</button>)}</div></section>
}
