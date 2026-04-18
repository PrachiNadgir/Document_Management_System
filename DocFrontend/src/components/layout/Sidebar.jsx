import FilterDropdown from '../ui/FilterDropdown'
import { filterOptions, workspaceNav } from '../../data/mockData'
import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar({ filters, onFilterChange }) {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ added

  return (
    <aside className="w-full border-b border-stone-200 bg-[#fbf9f5] lg:w-[240px] lg:border-b-0 lg:border-r">
      <div className="px-3 py-4 lg:sticky lg:top-[77px] lg:flex lg:h-[calc(100vh-77px)] lg:flex-col lg:px-3 lg:py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:block">
          {Object.entries(workspaceNav).map(([section, items]) => (
            <div key={section} className="lg:mb-8">
              <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                {section}
              </p>

              <div className="space-y-1">
                {items.map((item) => {
                  // ✅ fixed active logic
                  const isActive = location.pathname === `/${item.id}`;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigate(`/${item.id}`)} // ✅ fixed navigation
                      className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm transition ${
                        isActive
                          ? 'bg-[#eef2ff] text-[#2f67e9]'
                          : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </span>

                      {item.badge ? (
                        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:mt-auto lg:grid-cols-1">
          <div className="rounded-3xl border border-stone-200 bg-white p-4">
            <p className="text-xs font-medium text-stone-500">Usage</p>
            <div className="mt-2 flex items-center justify-between text-sm text-stone-700">
              <span>3 / 5 free</span>
              <span>60%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-stone-100">
              <div className="h-full w-3/5 rounded-full bg-[#2f67e9]" />
            </div>

            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="mt-4 w-full rounded-2xl bg-[#2f67e9] px-4 py-3 text-sm font-semibold text-white"
            >
              Upgrade to Pro
            </button>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              Filters
            </p>

            <div className="space-y-3">
              <FilterDropdown
                label="Category"
                value={filters.category}
                options={filterOptions.category}
                onChange={(value) =>
                  onFilterChange({ ...filters, category: value })
                }
              />

              <FilterDropdown
                label="Sentiment"
                value={filters.sentiment}
                options={filterOptions.sentiment}
                onChange={(value) =>
                  onFilterChange({ ...filters, sentiment: value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
