import { useMemo, useState } from 'react'
import { defaultDemoData } from './data/demoData'
import { calculateScenario, validateDecision } from './engine/simulationEngine'
import { usePersistentState } from './hooks/usePersistentState'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { DevNetworkInfo } from './components/DevNetworkInfo'
import { Dashboard } from './pages/Dashboard'
import { Future } from './pages/Future'
import { Goals } from './pages/Goals'
import { About } from './pages/About'
import { HistoryPanel } from './components/HistoryPanel'
import { SettingsPanel } from './components/SettingsPanel'

const pageTitles = { dashboard: 'Dashboard', future: 'Future', goals: 'Goals', history: 'History', settings: 'Demo data', about: 'Project links' }
const blankStress = { salaryDelay: false, emergency: false, weekend: false, unexpectedBill: false }

export default function App() {
  const [data, setData] = usePersistentState('money-sandbox-demo-data', defaultDemoData)
  const [decision, setDecision] = usePersistentState('money-sandbox-decision', defaultDemoData.purchase)
  const [selectedScenario, setSelectedScenario] = usePersistentState('money-sandbox-scenario', 'buy-now')
  const [history, setHistory] = usePersistentState('money-sandbox-history', [])
  const [page, setPage] = usePersistentState('money-sandbox-page', 'dashboard')
  const [stressTests, setStressTests] = usePersistentState('money-sandbox-stress-tests', blankStress)
  const [connected, setConnected] = usePersistentState('money-sandbox-demo-connected', false)
  const [simulated, setSimulated] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const result = useMemo(() => calculateScenario({ data, decision, scenarioId: selectedScenario, stressTests }), [data, decision, selectedScenario, stressTests])
  const runSimulation = () => {
    const message = validateDecision(data, decision)
    setError(message)
    if (message) return
    setSimulated(true)
    setHistory(current => [{ id: crypto.randomUUID?.() || `${Date.now()}`, createdAt: new Date().toISOString(), decision: { ...decision }, scenario: result.scenario, result: { buffer: result.buffer, risk: result.risk } }, ...current].slice(0, 20))
    window.setTimeout(() => document.getElementById('simulation-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }
  const connectDemo = () => { setConnecting(true); window.setTimeout(() => { setData(current => ({ ...defaultDemoData, purchase: current.purchase })); setConnected(true); setConnecting(false) }, 650) }
  const restore = item => { setDecision(item.decision); setSelectedScenario(item.scenario.id); setStressTests(blankStress); setSimulated(true); setPage('dashboard') }
  const reset = () => { setData(defaultDemoData); setDecision(defaultDemoData.purchase); setSelectedScenario('buy-now'); setStressTests(blankStress); setConnected(false) }
  const dashboardProps = { data, setData, decision, setDecision, result, simulated, onSimulate: runSimulation, error, selectedScenario, setSelectedScenario, stressTests, setStressTests, connected, onConnect: connectDemo, connecting }
  return <div className="ms-app"><Sidebar page={page} setPage={setPage} open={menuOpen} onClose={() => setMenuOpen(false)}/><main className="ms-main"><Header title={pageTitles[page]} onMenu={() => setMenuOpen(true)}/><div className="ms-content">{page === 'dashboard' && <Dashboard {...dashboardProps}/>} {page === 'future' && <Future data={data} decision={decision} result={result} selectedScenario={selectedScenario} setSelectedScenario={setSelectedScenario}/>} {page === 'goals' && <Goals data={data} result={result}/>} {page === 'history' && <HistoryPanel history={history} onRestore={restore} onClear={() => setHistory([])}/>} {page === 'settings' && <SettingsPanel data={data} setData={setData} onReset={reset}/>} {page === 'about' && <About/>}<DevNetworkInfo/><footer className="ms-footer">Money Sandbox · Team Carpe Diem · Harshit Aggarwal · Prem Verma</footer></div></main></div>
}
