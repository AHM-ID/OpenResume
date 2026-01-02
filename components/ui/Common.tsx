
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 font-vazirmatn';
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-slate-500 shadow-sm',
    danger: 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40',
    success: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
  };

  return (
    <button className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`} {...props} />
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input 
    dir="auto"
    className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-vazirmatn text-sm placeholder:text-start rtl:placeholder:text-right ${className}`}
    {...props}
  />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea 
    dir="auto"
    className={`w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 min-h-[140px] resize-y font-vazirmatn text-sm leading-relaxed placeholder:text-start rtl:placeholder:text-right ${className}`}
    {...props}
  />
);

export const Select: React.FC<{
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (value: any) => void;
  className?: string;
  isRtl?: boolean;
}> = ({ options, value, onChange, className = '', isRtl }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 text-sm font-vazirmatn flex items-center justify-between hover:border-indigo-400 transition-all outline-none focus:ring-4 focus:ring-indigo-500/10 shadow-sm"
      >
        <div className="flex items-center gap-3">
          {selectedOption.icon && <span className="text-indigo-500">{selectedOption.icon}</span>}
          <span>{selectedOption.label}</span>
        </div>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${isRtl ? 'right-0' : 'left-0'}`}>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-start flex items-center gap-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors text-sm font-vazirmatn ${value === opt.value ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {opt.icon && <span className={`${value === opt.value ? 'text-indigo-500' : 'text-slate-400'}`}>{opt.icon}</span>}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const FormSection: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  icon?: React.ReactNode; 
}> = ({ title, children, icon }) => (
  <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-50 dark:border-slate-800">
      {icon && <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">{icon}</div>}
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-vazirmatn">{title}</h3>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);
