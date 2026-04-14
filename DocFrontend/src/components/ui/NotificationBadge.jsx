import { useState } from 'react'

function NotificationBadge({ notifications, unreadCount, setUnreadCount }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen((open) => !open)
    setUnreadCount(0)
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Notifications"
        onClick={handleToggle}
        className="relative rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700"
      >
        Alerts
        {unreadCount > 0 ? (
          <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2f67e9] px-1 text-[11px] font-semibold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-stone-200 bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-stone-900">Latest alerts</h3>
            <span className="text-xs text-stone-400">Live updates</span>
          </div>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <article key={notification.id} className="rounded-2xl bg-stone-50 p-3">
                <p className="text-sm font-semibold text-stone-900">{notification.title}</p>
                <p className="mt-1 text-sm leading-6 text-stone-600">{notification.message}</p>
                <p className="mt-2 text-xs text-stone-400">{notification.time}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default NotificationBadge
