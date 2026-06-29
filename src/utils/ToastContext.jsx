import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback(({ message, type = 'success', duration = 3000 }) => {
        const id = ++idCounter
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    )
}

function ToastContainer({ toasts, onRemove }) {
    if (toasts.length === 0) return null
    return (
        <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3">
            {toasts.map((t) => (
                <Toast key={t.id} toast={t} onRemove={onRemove} />
            ))}
        </div>
    )
}

function Toast({ toast, onRemove }) {
    const styles = {
        success: 'bg-green-50 border-green-400 text-green-800',
        error:   'bg-red-50 border-red-400 text-red-800',
        info:    'bg-blue-50 border-blue-400 text-blue-800',
    }
    const icons = {
        success: '✓',
        error:   '✕',
        info:    'ℹ',
    }

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg text-sm font-medium animate-slide-up min-w-[260px] max-w-sm ${styles[toast.type]}`}>
            <span className="text-base font-bold">{icons[toast.type]}</span>
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => onRemove(toast.id)} className="opacity-50 hover:opacity-100 transition-opacity text-lg leading-none">×</button>
        </div>
    )
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used inside ToastProvider')
    return ctx
}
