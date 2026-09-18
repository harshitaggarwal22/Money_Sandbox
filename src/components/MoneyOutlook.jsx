import { useState } from 'react'
import { TrendingDown } from 'lucide-react'
import { formatCompactINR, formatINR } from '../utils/currency'

export function MoneyOutlook({ result, expanded = false }) {
  const [hovered, setHovered] = useState(null)
  const points = result.timeline
  const max = Math.max(...points.flatMap(point => [point.currentPlan, point.selected]), 1)
  const min = Math.min(...points.flatMap(point => [point.currentPlan, point.selected]), 0)
  const range = Math.max(1, max - min)
  const pos = (value, index) => ({ x: 7 + index / Math.max(1, points.length - 1) * 88, y: 8 + (max - value) / range * 72 })
  const path = key => points.map((point, index) => { const pointPos = pos(point[key], index); return `${index ? 'L' : 'M'} ${pointPos.x} ${pointPos.y}` }).join(' ')
  const safeZoneY = pos(result.safetyReserve, 0).y
  const difference = result.baselineBalance - result.projectedBalance
  const labels = points.filter(point => [0, 7, 15, 22, 30].includes(point.dayNumber))
  return <section className={`ms-outlook ${expanded ? 'expanded' : ''}`}><div className="ms-outlook-head"><div><p className="ms-kicker"><i/> 30-DAY MONEY OUTLOOK</p><h2>See how this decision changes your next 30 days.</h2></div><div className="ms-legend"><span><i className="plan"/>Current plan</span><span><i className="selected"/>Selected decision</span><span><i className="safe"/>Safe zone {formatINR(result.safetyReserve)}</span></div></div><div className="ms-chart"><svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Projected balance outlook"><line x1="7" x2="95" y1="10" y2="10"/><line x1="7" x2="95" y1="45" y2="45"/><line x1="7" x2="95" y1="80" y2="80"/><line x1="7" x2="95" y1={safeZoneY} y2={safeZoneY} className="safe-line"/><path d={path('currentPlan')} className="plan-path"/><path d={path('selected')} className="selected-path"/>{points.map((point,index) => { const p = pos(point.selected,index); return <circle key={point.day} cx={p.x} cy={p.y} r="1.2" className="chart-dot" onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} onClick={() => setHovered(index)}/> })}</svg><span className="safe-label">Minimum safe buffer</span>{hovered !== null && <div className="ms-chart-tooltip" style={{ left: `${pos(points[hovered].selected, hovered).x}%` }}><b>{points[hovered].day}</b><span>Plan {formatINR(points[hovered].currentPlan)}</span><span>Decision {formatINR(points[hovered].selected)}</span></div>}</div><div className="ms-chart-labels">{labels.map(point => <div key={point.day}><span>{point.day}</span><b className={point.selected < 0 ? 'negative' : ''}>{formatCompactINR(point.selected)}</b></div>)}</div><p className="ms-outlook-note"><TrendingDown size={15}/> {difference > 0 ? `This decision reduces your 30-day balance by ${formatINR(difference)} versus your current plan.` : 'This decision keeps your 30-day balance on track.'}</p></section>
}
