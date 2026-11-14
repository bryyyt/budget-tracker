import { useState } from 'react'
import mockUsersJson from './mock_data/users.json?raw'
import Dashboard from './components/Dashboard'
import SideBar, { type PageId } from './components/SideBar'
import './App.scss'

type MockUser = {
  id: string
  displayName: string
  initials: string
  boardName: string
}

const mockUsers = JSON.parse(mockUsersJson) as MockUser[]
const profile = mockUsers[0]
const currentMonth = new Intl.DateTimeFormat('en-PH', {
  month: 'long',
  year: 'numeric',
}).format(new Date())

const pageDetails: Record<Exclude<PageId, 'dashboard'>, { title: string; eyebrow: string; empty: string }> = {
  budget: {
    title: 'Budget',
    eyebrow: 'Monthly planning',
    empty: 'No budget entries yet.',
  },
  debts: {
    title: 'Debt Center',
    eyebrow: 'Payment commitments',
    empty: 'Debt details will appear here when added to your budget.',
  },
  settings: {
    title: 'Settings',
    eyebrow: 'Your preferences',
    empty: 'No preferences have been configured yet.',
  },
}

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard')

  return (
    <div className="app-shell">
      <SideBar
        activePage={activePage}
        onNavigate={setActivePage}
        profile={profile}
      />

      <main className="main-area">
        <header className="topbar">
          <a className="mobile-brand" href="#dashboard" onClick={() => setActivePage('dashboard')}>
            <span className="brand-mark" aria-hidden="true">B</span>
            <span className="brand-name">Pennywise</span>
          </a>
          <span className="topbar-date">{currentMonth}</span>
          <div className="topbar-profile">
            <div className="profile-avatar" aria-hidden="true">{profile.initials}</div>
            <span>{profile.displayName}</span>
          </div>
        </header>

        <div className="page-content">
          {activePage === 'dashboard' ? (
            <Dashboard currentMonth={currentMonth} boardName={profile.boardName} />
          ) : (
            <PlaceholderPage page={activePage} />
          )}
        </div>
      </main>

    </div>
  )
}

function PlaceholderPage({ page }: { page: Exclude<PageId, 'dashboard'> }) {
  const details = pageDetails[page]

  return (
    <section className="page-heading placeholder-page">
      <div>
        <p className="eyebrow">{details.eyebrow}</p>
        <h1>{details.title}</h1>
        <div className="placeholder-state" role="status">
          <span className="placeholder-mark" aria-hidden="true">{page === 'settings' ? 'P' : '0'}</span>
          <p>{details.empty}</p>
        </div>
      </div>
    </section>
  )
}

export default App
