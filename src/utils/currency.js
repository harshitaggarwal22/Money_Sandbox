export const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0)
export const formatCompactINR = (value) => `${value < 0 ? '−' : ''}₹${Math.abs(value) >= 1000 ? `${(Math.abs(value) / 1000).toFixed(Math.abs(value) % 1000 === 0 ? 0 : 1)}K` : Math.abs(value)}`
