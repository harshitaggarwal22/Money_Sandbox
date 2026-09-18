import { Menu } from 'lucide-react'
export function Header({ title, onMenu }) { return <header className="ms-header"><button className="ms-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20}/></button><span className="ms-crumb">PERSONAL SPACE / {title.toUpperCase()}</span><span className="ms-demo-badge"><i/> DEMO MODE · SYNTHETIC DATA</span></header> }
