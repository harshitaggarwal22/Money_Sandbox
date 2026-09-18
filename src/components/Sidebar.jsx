import { BarChart3, BrainCircuit, Clock3, FlaskConical, Goal, LayoutDashboard, Settings2, ShieldAlert, WalletCards, X } from 'lucide-react'

const items = [['dashboard', 'Overview', LayoutDashboard], ['decision-lab', 'Decision Lab', FlaskConical], ['future', 'Future Simulator', BarChart3], ['goals', 'Goals', Goal], ['cashflow', 'Cashflow', WalletCards], ['stress-test', 'Stress Test', ShieldAlert], ['history', 'History', Clock3], ['ai-teammates', 'AI Teammates', BrainCircuit], ['settings', 'Settings', Settings2]]

export function Sidebar({ page, setPage, open, onClose }) {
  return <><aside className={`ms-sidebar ${open ? 'open' : ''}`}><div className="ms-brand"><span className="ms-logo"><i/><i/><i/></span><div><b>Money Sandbox</b><small>Decision intelligence</small></div><button aria-label="Close navigation" className="ms-close" onClick={onClose}><X size={18}/></button></div><nav>{items.map(([id, label, Icon]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => { setPage(id); onClose() }}><Icon size={17}/>{label}</button>)}</nav><div className="ms-sidebar-demo"><i/> DEMO MODE<small>Synthetic data only</small></div><div className="ms-profile"><span>HS</span><div><b>Harshit Sharma</b><small>Personal workspace</small></div></div></aside>{open && <div className="ms-scrim" onClick={onClose}/>}</>
}
