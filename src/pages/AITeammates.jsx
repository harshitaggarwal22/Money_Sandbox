import { BadgeCheck, BrainCircuit, Calculator, Goal, Landmark, ShieldCheck, Sparkles } from 'lucide-react'

const teammates = [
  ['Cashflow teammate', Landmark, 'Balance + income + commitments', 'Explains available 30-day buffer'],
  ['Behaviour teammate', BrainCircuit, 'Synthetic transaction history', 'Explains patterns and discretionary pressure'],
  ['Scenario teammate', Calculator, 'Purchase options and payment timing', 'Compares four deterministic futures'],
  ['Goals teammate', Goal, 'Goal targets and saved amounts', 'Explains completion impact and delay'],
  ['Risk teammate', ShieldCheck, 'Safe buffer and stress assumptions', 'Explains safety-zone exposure']
]
export function AITeammates({ result }) { return <section className="ms-page"><div className="ms-page-heading"><div><p className="ms-kicker"><i/> AI TEAMMATES</p><h1>How Money Sandbox thinks.</h1><p>Reasoning and explanation sit above a deterministic simulation engine. Numbers are never invented by the AI layer.</p></div></div><div className="ms-orchestration"><div className="ms-flow-node user">USER DECISION</div><i>↓</i><div className="ms-flow-node judge">DECISION JUDGE</div><i>↓</i><div className="ms-agent-grid">{teammates.map(([name,Icon,input,output]) => <article key={name}><span><Icon size={18}/></span><div><b>{name}</b><small><em>Input</em>{input}</small><small><em>Output</em>{output}</small></div><BadgeCheck size={15}/></article>)}</div><i>↓</i><div className="ms-engine-node"><Calculator size={18}/><div><b>DETERMINISTIC SIMULATION ENGINE</b><span>Arithmetic · cashflow · EMI · goals · risk · stress tests</span></div></div><i>↓</i><div className="ms-verdict-node"><Sparkles size={17}/><div><small>EXPLAINABLE VERDICT · {result.confidence}% confidence</small><b>{result.verdict.title}</b><p>{result.verdict.description}</p></div></div></div></section> }
