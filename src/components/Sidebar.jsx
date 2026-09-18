import { BarChart3, Clock3, Goal, LayoutDashboard, Settings2, Sparkles, X, Link } from 'lucide-react'

const items = [['dashboard', 'Dashboard', LayoutDashboard], ['future', 'Future', BarChart3], ['goals', 'Goals', Goal], ['history', 'History', Clock3], ['settings', 'Demo data', Settings2], ['about', 'Project links', Link]]

export function Sidebar({ page, setPage, open, onClose }) {
  return <><aside className={`ms-sidebar ${open ? 'open' : ''}`}><div className="ms-brand"><span className="ms-logo"><i/><i/><i/></span><div><b>Money Sandbox</b><small>Decision intelligence</small></div><button aria-label="Close navigation" className="ms-close" onClick={onClose}><X size={18}/></button></div><nav>{items.map(([id, label, Icon]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => { setPage(id); onClose() }}><Icon size={17}/>{label}</button>)}</nav><div className="ms-sidebar-demo"><i/> DEMO MODE<small>Synthetic data only</small></div><div className="ms-profile"><span>HS</span><div><b>Harshit Sharma</b><small>Personal workspace</small></div></div></aside>{open && <div className="ms-scrim" onClick={onClose}/>}</>
}
