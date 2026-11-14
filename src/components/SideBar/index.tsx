import styles from './styles.module.scss'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  DashboardSquare01Icon,
  Wallet01Icon,
  CreditCardIcon,
  Settings01Icon,
} from '@hugeicons/core-free-icons'

export type PageId = 'dashboard' | 'budget' | 'debts' | 'settings'

type Profile = {
	displayName: string
	initials: string
	boardName: string
}

type SideBarProps = {
	activePage: PageId
	onNavigate: (page: PageId) => void
	profile: Profile
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardSquare01Icon },
  { id: 'budget', label: 'Budget', icon: Wallet01Icon },
  { id: 'debts', label: 'Debt Center', icon: CreditCardIcon },
  { id: 'settings', label: 'Settings', icon: Settings01Icon },
] as const

function SideBar({ activePage, onNavigate, profile }: SideBarProps) {
	return (
		<div className={styles.sidebarShell}>
			<aside className={styles.sidebar} aria-label="Main sidebar">
				<a className={styles.brand} href="#dashboard" onClick={() => onNavigate('dashboard')}>
					<span className="brand-mark" aria-hidden="true">B</span>
					<span className="brand-name">Pennywise</span>
				</a>

				<div className={styles.sidebarLabel}>Workspace</div>
				<Navigation activePage={activePage} onNavigate={onNavigate} />

				<div className={styles.sidebarFooter}>
					<div className="profile-avatar" aria-hidden="true">{profile.initials}</div>
					<div className={styles.profileCopy}>
						<span className={styles.profileName}>{profile.displayName}</span>
						<span className={styles.profileBoard}>{profile.boardName}</span>
					</div>
					<span className={styles.profileState} aria-label="Mock profile">M</span>
				</div>
			</aside>

			<nav className={styles.mobileNavigation} aria-label="Main navigation">
				<Navigation activePage={activePage} onNavigate={onNavigate} />
			</nav>
		</div>
	)
}

function Navigation({
	activePage,
	onNavigate,
}: {
	activePage: PageId
	onNavigate: (page: PageId) => void
}) {
	return (
		<div className={styles.navigationList}>
			{navigation.map((item) => (
				<button
					key={item.id}
					className={`${styles.navigationItem}${activePage === item.id ? ` ${styles.isActive}` : ''}`}
					type="button"
					aria-current={activePage === item.id ? 'page' : undefined}
					onClick={() => onNavigate(item.id)}
				>
					<span className={styles.navigationIcon} aria-hidden="true">
						<HugeiconsIcon icon={item.icon} size={18} />
					</span>
					{item.label}
				</button>
			))}
		</div>
	)
}

export default SideBar
