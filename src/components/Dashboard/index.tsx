import styles from './styles.module.scss'

type DashboardProps = {
	currentMonth: string
	boardName: string
}

function Dashboard({ currentMonth, boardName }: DashboardProps) {
	return (
		<>
			<section className="page-heading">
				<div>
					<p className="eyebrow">Personal finances / {currentMonth}</p>
					<h1>Dashboard</h1>
					<p className="page-subtitle">A clear view of your money this month.</p>
				</div>
				<span className={styles.profileChip}>
					<span className={styles.profileChipDot} />
					{boardName}
				</span>
			</section>

			<section className={styles.summaryGrid} aria-label="Monthly summary">
				<SummaryCard label="Monthly income" value="Not set" detail="Payroll settings" tone="green" />
				<SummaryCard label="Budgeted expenses" value="No entries" detail="Current month" tone="orange" />
				<SummaryCard label="Active debt" value="No entries" detail="From budget entries" tone="blue" />
				<SummaryCard label="Remaining" value="Not set" detail="After planned expenses" tone="neutral" />
			</section>

			<section className={styles.dashboardGrid}>
				<div className={`${styles.dashboardSection} ${styles.spendingSection}`}>
					<div className={styles.sectionHeading}>
						<div>
							<p className="eyebrow">This month</p>
							<h2>Spending overview</h2>
						</div>
						<span className={styles.sectionPeriod}>{currentMonth}</span>
					</div>
					<div className={styles.emptyChart} aria-label="No spending data">
						<div className={styles.chartPlaceholder} aria-hidden="true">
							<span /><span /><span /><span /><span /><span /><span />
						</div>
						<p>No budget activity yet</p>
						<span>Monthly categories will appear here.</span>
					</div>
				</div>

				<div className={`${styles.dashboardSection} ${styles.dueSection}`}>
					<div className={styles.sectionHeading}>
						<div>
							<p className="eyebrow">Keep an eye on</p>
							<h2>Upcoming due dates</h2>
						</div>
						<span className={styles.dueCount}>0</span>
					</div>
					<div className={styles.emptyDueState}>
						<span className={styles.emptyStateRule} aria-hidden="true" />
						<p>Nothing due soon</p>
						<span>Upcoming bills will show here.</span>
					</div>
				</div>
			</section>
		</>
	)
}

const toneClasses = {
	green: styles.toneGreen,
	orange: styles.toneOrange,
	blue: styles.toneBlue,
	neutral: styles.toneNeutral,
}

function SummaryCard({
	label,
	value,
	detail,
	tone,
}: {
	label: string
	value: string
	detail: string
	tone: 'green' | 'orange' | 'blue' | 'neutral'
}) {
	return (
		<article className={`${styles.summaryCard} ${toneClasses[tone]}`}>
			<div className={styles.summaryCardTop}>
				<span className={styles.summaryDot} aria-hidden="true" />
				<span>{label}</span>
			</div>
			<strong>{value}</strong>
			<span className={styles.summaryDetail}>{detail}</span>
		</article>
	)
}

export default Dashboard
