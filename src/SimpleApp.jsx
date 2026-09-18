import { useMemo, useState } from 'react'
import { ArrowRight, Bot, BriefcaseBusiness, CalendarDays, ChevronDown, ChevronRight, CircleDollarSign, Clock3, CreditCard, Gauge, Goal, History, LayoutDashboard, Menu, ShieldAlert, Sparkles, Target, TrendingDown, WalletCards, X } from 'lucide-react'
import { buildSimpleTimeline, calculateScenario, formatINR, scenarios } from './utils/simpleSimulation'

const nav = [['Dashboard', 'dashboard', LayoutDashboard], ['Simulate', 'decision', Sparkles], ['Future', 'future', TrendingDown], ['Goals', 'goal', Target], ['History', 'history', History]]
const agents = [{name:'Cashflow', icon:WalletCards, text:'Checks balances and upcoming expenses.'}, {name:'Behaviour', icon:Gauge, text:'Looks for useful spending patterns.'}, {name:'Scenario', icon:Sparkles, text:'Compares practical choices.'}, {name:'Risk', icon:ShieldAlert, text:'Tests what could go wrong.'}, {name:'Goal', icon:Target, text:'Keeps your goal in view.'}]
const riskClass = risk => risk === 'High' ? 'high' : risk === 'Medium' ? 'medium' : 'low'

function Risk({ value }) { return <span className={`simple-risk ${riskClass(value)}`}>
<i />{value} risk</span> }

export default function SimpleApp() {
  const [amount, setAmount] = useState(18000)
  const [scenarioId, setScenarioId] = useState('buy-now')
  const [simulated, setSimulated] = useState(false)
  const [emergency, setEmergency] = useState(false)
  const [calculationOpen, setCalculationOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const result = useMemo(() => calculateScenario({ scenarioId, purchaseAmount: amount, emergency }), [scenarioId, amount, emergency])
  const timeline = useMemo(() => buildSimpleTimeline({ ...result, emergency }), [result, emergency])
  const displayedBuffer = emergency ? result.crashBuffer : result.buffer
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false) }
  const pick = id => { setScenarioId(id); setSimulated(true) }

  return <div className="simple-app">
<aside className={`simple-sidebar ${menuOpen ? 'open' : ''}`}>
<div className="simple-brand">
<span className="simple-logo">
<i/>
<i/>
<i/>
</span>
<div>
<b>Money Sandbox</b>
<small>Decision intelligence</small>
</div>
</div>
<button className="sidebar-close" onClick={() => setMenuOpen(false)}>
<X size={18}/>
</button>
<nav>{nav.map(([name,id,Icon], index) =>
<button key={id} onClick={() => scrollTo(id)} className={index === 0 ? 'active' : ''}>
<Icon size={17}/>{name}</button>)}</nav>
<div className="demo-side">
<span/>Demo mode<br/>
<small>Synthetic data only</small>
</div>
<div className="simple-user">
<span>HS</span>
<div>
<b>Harshit Sharma</b>
<small>Personal workspace</small>
</div>
</div>
</aside>
    {menuOpen && <div className="sidebar-scrim" onClick={() => setMenuOpen(false)}/>}<main className="simple-main">
<header>
<button className="mobile-menu" onClick={() => setMenuOpen(true)}>
<Menu size={21}/>
</button>
<span className="crumb">PERSONAL SPACE <ChevronRight size={13}/> DASHBOARD</span>
<span className="demo-badge">
<i/> DEMO MODE · SYNTHETIC DATA</span>
</header>
<div className="simple-content">
<section id="dashboard" className="simple-hero">
<p className="simple-eyebrow">
<i/> MONEY SANDBOX</p>
<h1>Before you spend,<br/>
<em>see the future.</em>
</h1>
<p>Try a decision before your money leaves your account.</p>
</section>
<section className="three-stats">
<article>
<span className="stat-icon blue">
<WalletCards size={19}/>
</span>
<p>AVAILABLE BALANCE</p>
<b>₹32,000</b>
<small>Money you have today</small>
</article>
<article>
<span className="stat-icon amber">
<CalendarDays size={19}/>
</span>
<p>UPCOMING EXPENSES</p>
<b>₹12,600</b>
<small>Due over the next 30 days</small>
</article>
<article>
<span className="stat-icon green">
<Target size={19}/>
</span>
<p>ACTIVE GOAL</p>
<b>₹35,000</b>
<small>Goa Trip · 82% on track</small>
</article>
</section>
<section id="decision" className="step-section decision-step">
<div className="step-label">
<span>1</span>
<p>MY DECISION</p>
<i/>
</div>
<div className="simple-decision-card">
<div className="card-intro">
<p className="simple-eyebrow">
<i/> WHAT ARE YOU PLANNING?</p>
<h2>Test a purchase before you make it.</h2>
</div>
<div className="decision-fields">
<label>Decision<input value="Buy a smartphone" readOnly/>
</label>
<label>Amount <div className="amount-field">
<span>₹</span>
<input aria-label="Purchase amount" type="number" min="0" value={amount} onChange={e => { setAmount(e.target.value); setSimulated(true) }}/>
</div>
</label>
<label>Category <div className="fake-select">Electronics <ChevronDown size={15}/>
</div>
</label>
</div>
<button className="simulate-button" onClick={() => {setSimulated(true); scrollTo('result')}}>Simulate this decision <ArrowRight size={18}/>
</button>
<p className="micro-copy">Uses synthetic demo data. No bank account is connected.</p>
</div>
</section>
<section id="result" className={`step-section result-step ${simulated ? 'revealed' : ''}`}>
<div className="step-label">
<span>2</span>
<p>SIMULATE</p>
<i/>
</div>
<div className="result-empty">
<Sparkles size={21}/>
<div>
<b>Your future is ready when you are.</b>
<span>Run the simulation to see what this purchase could change.</span>
</div>
</div>
<div className="future-result">
<div className="future-copy">
<p className="simple-eyebrow">
<i/> SEE THE FUTURE</p>
<h2>Your future if you<br/>buy it <em>{result.scenario.id === 'wait' ? 'after 12 days' : 'this way'}</em>
</h2>
<p>{result.verdict.copy}</p>
<Risk value={result.verdict.risk}/>
</div>
<div className="buffer-display">
<span>PROJECTED 30-DAY BUFFER</span>
<strong className={displayedBuffer < 0 ? 'negative-number' : ''}>{formatINR(displayedBuffer)}</strong>
<small>{emergency ? 'With an emergency expense' : 'Money left after your expected costs'}</small>
<div className="buffer-rule">
<i style={{width:`${Math.max(0, Math.min(100, displayedBuffer / 160))}%`}}/>
</div>
</div>
</div>
</section>
<section className="step-section choices-step">
<div className="step-label">
<span>3</span>
<p>SEE THE FUTURE</p>
</div>
<div className="choice-content">
<div>
<p className="simple-eyebrow">
<i/> WHAT IF YOU CHOOSE DIFFERENTLY?</p>
<h2>Every choice has a different future.</h2>
</div>
<div className="scenario-simple">{scenarios.map(item => { const test = calculateScenario({scenarioId:item.id,purchaseAmount:amount,emergency:false}); return <button key={item.id} onClick={() => pick(item.id)} className={scenarioId === item.id ? 'selected' : ''}>
<span>{item.label}</span>
<b>{formatINR(test.buffer)} <small>{item.id === 'emi' ? 'buffer' : 'left'}</small>
</b>
<Risk value={test.verdict.risk}/>
</button>})}</div>
</div>
</section>
<section className="calculation-section">
<button className="calculation-toggle" onClick={() => setCalculationOpen(!calculationOpen)}>
<div>
<CircleDollarSign size={20}/>
<span>
<b>How we calculated it</b>
<small>See the simple maths behind this future.</small>
</span>
</div>
<ChevronDown className={calculationOpen ? 'turned' : ''}/>
</button>{calculationOpen && <div className="calculation-body">
<div>
<span>Current balance</span>
<b>₹32,000</b>
</div>
<div>
<span>Expected spending before purchase</span>
<b>− {formatINR(result.expectedSpending)}</b>
</div>
<div>
<span>After {result.scenario.id === 'wait' ? '12 days' : 'expected expenses'}</span>
<b>{formatINR(result.beforePurchase)}</b>
</div>
<div>
<span>Phone purchase</span>
<b>− {formatINR(result.purchaseCost)}</b>
</div>
<div className="calculation-total">
<span>Projected buffer</span>
<b>{formatINR(result.buffer)}</b>
</div>
<p>The amount changes instantly when you edit your decision.</p>
</div>}</section>
<section id="future" className="future-timeline">
<div>
<p className="simple-eyebrow">
<i/> FUTURE VIEW</p>
<h2>Where could your money end up?</h2>
<p>A simple view of your projected balance.</p>
</div>
<div className="simple-timeline">{timeline.map((point, index) =>
<div key={point.day}>
<span className={index === timeline.length-1 ? riskClass(result.verdict.risk) : ''}/>
<p>{point.day}</p>
<b className={point.balance < 0 ? 'negative-number' : ''}>{point.balance >= 1000 || point.balance <= -1000 ? `₹${Math.round(point.balance/1000)}K` : formatINR(point.balance)}</b>
</div>)}</div>
</section>
<section id="goal" className="goal-crash-grid">
<article className="simple-goal">
<p className="simple-eyebrow">
<i/> GOAL IMPACT</p>
<div className="goal-header">
<div>
<h2>Goa Trip</h2>
<span>₹35,000 goal</span>
</div>
<Target size={21}/>
</div>
<div className="goal-track">
<p>
<span>Before this decision</span>
<b>82% on track</b>
</p>
<i>
<em style={{width:'82%'}}/>
</i>
<p>
<span>After this decision</span>
<b className={result.goalOnTrack < 50 ? 'danger' : ''}>{result.goalOnTrack}% on track</b>
</p>
<i className="after">
<em style={{width:`${result.goalOnTrack}%`}}/>
</i>
</div>
<p className="simple-explain">This purchase may delay your Goa Trip goal.</p>
</article>
<article className={`simple-crash ${emergency ? 'testing' : ''}`}>
<p className="simple-eyebrow">
<i/> WHAT IF SOMETHING GOES WRONG?</p>
<h2>Financial Crash Test</h2>
<p className="crash-copy">Turn on one unexpected expense and see whether your decision survives.</p>
<button className="emergency-toggle" onClick={() => {setEmergency(!emergency);setSimulated(true)}}>
<span>
<ShieldAlert size={18}/>
</span>
<div>
<b>Emergency expense</b>
<small>₹5,000</small>
</div>
<i className={emergency ? 'on' : ''}>
<em/>
</i>
</button>{emergency && <div className="crash-verdict">
<strong>{formatINR(result.buffer)}</strong>
<span>normal buffer</span>
<ArrowRight size={15}/>
<strong className={result.crashBuffer < 0 ? 'danger' : ''}>{formatINR(result.crashBuffer)}</strong>
<span>after emergency</span>
<p>
<ShieldAlert size={15}/> {result.crashBuffer < 0 ? 'This decision does not survive the emergency test.' : 'This path still has a small emergency cushion.'}</p>
</div>}</article>
</section>
<section className="think-section">
<div>
<div>
<p className="simple-eyebrow">
<i/> HOW MONEY SANDBOX THINKS</p>
<h2>Five teammates.<br/>One clear decision.</h2>
<p>Specialized AI teammates look at different parts of your financial situation before the final decision is generated.</p>
<button onClick={() => setDetailsOpen(true)}>View details <ArrowRight size={16}/>
</button>
</div>
<div className="mini-agents">{agents.map(({name,icon:Icon}) =>
<div key={name}>
<span>
<Icon size={17}/>
</span>
<b>{name}</b>
</div>)}<div className="mini-judge">
<Sparkles size={16}/>
<b>Decision Judge</b>
</div>
</div>
</div>
</section>
<section id="history" className="simple-history">
<p className="simple-eyebrow">
<i/> HISTORY</p>
<h2>Recent decisions</h2>{[['Phone purchase','₹18,000','Wait 12 days','Low'],['Weekend trip','₹8,500','Proceed','Medium'],['Laptop upgrade','₹42,000','Delay','High']].map(item =>
<button key={item[0]} onClick={() => scrollTo('decision')}>
<span>
<BriefcaseBusiness size={16}/>
<b>{item[0]}</b>
</span>
<span>{item[1]}</span>
<span>{item[2]}</span>
<Risk value={item[3]}/>
<ChevronRight size={16}/>
</button>)}</section>
<footer>Money Sandbox · Team Carpe Diem · Hackathon Prototype</footer>
</div>
</main>
    {detailsOpen && <div className="modal-backdrop" onClick={() => setDetailsOpen(false)}>
<section className="think-drawer" onClick={e => e.stopPropagation()}>
<button className="drawer-close" onClick={() => setDetailsOpen(false)}>
<X size={19}/>
</button>
<p className="simple-eyebrow">
<i/> AUTONOMOUS AI TEAMMATES</p>
<h2>One decision,<br/>five perspectives.</h2>
<p className="drawer-copy">AI reasons about the situation. A deterministic engine handles the calculation. Together, they create an explainable recommendation.</p>
<div className="drawer-agents">{agents.map(({name,icon:Icon,text}) =>
<article key={name}>
<span>
<Icon size={19}/>
</span>
<div>
<b>{name} teammate</b>
<p>{text}</p>
</div>
</article>)}</div>
<div className="judge-strip">
<Sparkles size={18}/>
<div>
<span>FINAL STEP</span>
<b>Decision Judge combines the evidence into a clear verdict.</b>
</div>
</div>
</section>
</div>}
  </div>
}

