import Button from '../ui/Button';

const EmptyStateIcons = {
  search: (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
      <defs>
        <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx="35" cy="35" r="20" stroke="url(#searchGrad)" strokeWidth="5" />
      <path d="M52 52L68 68" stroke="url(#searchGrad)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  bookmarks: (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
      <defs>
        <linearGradient id="bookmarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path d="M20 15L40 30L60 15V65L40 52L20 65V15Z" stroke="url(#bookmarkGrad)" strokeWidth="5" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  mocktests: (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
      <defs>
        <linearGradient id="mockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect x="15" y="10" width="50" height="60" rx="5" stroke="url(#mockGrad)" strokeWidth="4" />
      <line x1="25" y1="30" x2="55" y2="30" stroke="url(#mockGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="25" y1="45" x2="45" y2="45" stroke="url(#mockGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="25" y1="58" x2="50" y2="58" stroke="url(#mockGrad)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
      <defs>
        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="30" stroke="url(#progressGrad)" strokeWidth="5" />
      <path d="M40 15A25 25 0 0 1 65 40" stroke="url(#progressGrad)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
      <defs>
        <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <rect x="20" y="50" width="12" height="20" rx="2" fill="url(#analyticsGrad)" />
      <rect x="38" y="35" width="12" height="35" rx="2" fill="url(#analyticsGrad)" />
      <rect x="56" y="25" width="12" height="45" rx="2" fill="url(#analyticsGrad)" />
    </svg>
  ),
  questions: (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
      <defs>
        <linearGradient id="questionsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="28" stroke="url(#questionsGrad)" strokeWidth="4" />
      <path d="M40 30C43 30 45 32 45 35C45 38 42 40 40 42C38 44 38 48 38 52" stroke="url(#questionsGrad)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="40" cy="60" r="3" fill="url(#questionsGrad)" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
      <defs>
        <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
      <rect x="15" y="20" width="50" height="40" rx="5" stroke="url(#defaultGrad)" strokeWidth="4" />
      <path d="M25 20V15C25 12.2 27.2 10 30 10H50C52.8 10 55 12.2 55 15V20" stroke="url(#defaultGrad)" strokeWidth="4" />
    </svg>
  )
};

export default function EmptyState({ 
  type = "default", 
  title, 
  description, 
  primaryAction, 
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel 
}) {
  const icon = EmptyStateIcons[type] || EmptyStateIcons.default;
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6 transform transition-all duration-500 hover:scale-110">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/50 dark:border-white/10">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-sm mb-8">{description}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        {primaryAction && primaryActionLabel && (
          <Button onClick={primaryAction} variant="default">
            {primaryActionLabel}
          </Button>
        )}
        {secondaryAction && secondaryActionLabel && (
          <Button onClick={secondaryAction} variant="outline">
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}