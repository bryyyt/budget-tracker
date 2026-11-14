# Budget Tracker Product Backlog

## Product Goal
Build a responsive personal budgeting app that makes monthly spending easy to organize, shows the cost of existing and proposed debt over time, and makes temporary use of reserved money understandable through budget-item remarks.

## Delivery Principles
- Use the `2026 Budgeting` sheet in `Budget Tracker Data.xlsx` as the primary reference for the current budget structure and sample data.
- Start with typed mock data in JSON/TypeScript and a placeholder profile; no backend or database is required for the MVP.
- Persist MVP edits and settings in browser localStorage without overwriting existing data on startup. A local profile is not a secure user account.
- The Budget is the source of truth for debts and installment payments. The Debt Center is a read-only projection of budget data; never count a payment twice.
- Calculate estimated outstanding balance as remaining payments multiplied by the monthly payment, and display the payment count separately.
- Record temporary use of reserved money as a budget split with detailed remarks; returning it does not require a separate transaction or action.
- Format monetary amounts in Philippine pesos (PHP). Support monthly, twice-monthly, and weekly payroll, with fixed or estimated pay.
- Build the single-profile workflow first. User creation and switching follow after the MVP.

## Release Roadmap

1. **App shell and data foundation**: establish the responsive navigation, page structure, Tailwind/SCSS approach, placeholder profile, workbook mapping, typed mock data, and localStorage persistence.
2. **Budget MVP**: configure payroll and manage monthly items, including debt details and reserved-budget splits, with filtering and calculated totals.
3. **Debt visibility and decisions**: project a read-only Debt Center from Budget and preview proposed loans, including principal and interest.
4. **Dashboard**: derive monthly totals, upcoming due dates, spending breakdowns, trends, and platform summaries from the same budget data.
5. **Personalization and multi-user**: complete theme selection and add user/board creation and switching after the single-profile MVP.

---

## Epic 0: Application Shell and UI Foundation
**Priority:** P0 - first build step

Create the shared structure and styling foundation before implementing feature screens.

### Story 0.1 - Establish the application shell
As a user, I want a consistent app shell so that I can navigate between the Budget, Debt Center, Dashboard, and settings.

**Acceptance criteria**
- Provide a shared layout and navigation for Dashboard, Budget, Debt Center, and settings with a visible active destination.
- Show a placeholder profile from mock data; it does not imply authentication or user creation.
- Provide clear placeholder, empty, and loading/error states as appropriate before feature data is available.
- Navigation and layout work with keyboard, touch, desktop, and mobile screen sizes.

### Story 0.2 - Establish the styling and component foundation
As a developer, I want a consistent styling foundation so that feature screens can be built coherently.

**Acceptance criteria**
- Integrate Tailwind with the existing React, TypeScript, Vite, and SCSS setup; document how Tailwind and existing SCSS coexist.
- Establish reusable colors, typography, spacing, responsive breakpoints, and accessible focus states.
- Provide reusable patterns for navigation, buttons, forms, cards, tables, dialogs, and empty states as features need them.
- Verify the app builds and the shell is usable on desktop and mobile.

---

## Epic 1: Budget Data Foundation
**Priority:** P0 - prerequisite

Establish a reliable app data model based on the workbook, without coupling the UI to spreadsheet cells.

### Story 1.1 - Map the 2026 budget workbook
As the product owner, I want the `2026 Budgeting` sheet's columns, categories, and month structure documented so that app records represent the way I budget today.

**Acceptance criteria**
- Identify the sheet's budget item fields, category/grouping fields, payment status, due date, notes, and totals/formulas that the app should derive.
- Record any ambiguous or inconsistent workbook values as decisions rather than silently assuming their meaning.
- Keep the original workbook unchanged.

### Story 1.2 - Define shared budget and debt records
As a developer, I want typed record shapes for budget items, debt details, payroll, and profiles so that screens use consistent data.

**Acceptance criteria**
- Budget records can represent month, name, category, amount, platform, owner, due date, status, remarks, and reserved/split amounts.
- Debt-capable budget entries capture debt type, monthly payment, total and paid payment counts, and end date; related monthly payments are linked to one obligation.
- Outstanding balance and remaining payment count are derived from budget debt details; the Debt Center does not maintain independent debt records.
- Payroll records support monthly, twice-monthly, and weekly schedules, fixed or estimated pay, salary amount per payday, and the dates needed to calculate monthly income.
- Seed records can be loaded from local mock data, and calculated summaries derive from those records.

### Story 1.3 - Set up local mock data
As a developer, I want representative mock data based on the workbook so that the app can be built and tested without a database.

**Acceptance criteria**
- Include representative monthly budget items, categories, payment statuses, platforms, owners, and debt/installment budget entries.
- Include empty, pending, paid, overdue, and partially paid scenarios where applicable.
- Keep mock data separate from UI components so it can later be replaced by a backend.

### Story 1.4 - Persist the MVP locally
As a user, I want my budget changes and settings to survive a reload so that I do not have to re-enter them.

**Acceptance criteria**
- Use browser localStorage for the placeholder profile's budget entries, payroll, and settings; initialize from mock data only when no saved data exists.
- Restore saved changes after reload and derive Debt Center data from the restored Budget.
- Handle unavailable, invalid, or full storage with a clear error; do not silently replace existing user data with seed data.
- Provide a deliberate development/test reset path that does not unexpectedly overwrite user data.

---

## Epic 2: Monthly Budget Tracker
**Priority:** P0 - first user-facing feature

Replace the spreadsheet's monthly working list with a centralized, editable view.

### Story 2.1 - View and switch budget months
As a user, I want to open a month and switch between months so that I can manage current and future budgets in one place.

**Acceptance criteria**
- Show the selected month's budget items and a clear month/year control.
- Changing the selected month updates the items, totals, and due-date context.
- Months with no records show an empty state and allow items to be added.

### Story 2.2 - Filter by category
As a user, I want clickable category filters so that I can focus on Essentials, Installments, or another category without losing the full list.

**Acceptance criteria**
- Provide an All filter and filters for categories present in the selected month.
- The active filter is visually clear and the item list updates immediately.
- The month totals remain understandable when a category filter is active.

### Story 2.3 - Add and edit budget items
As a user, I want to add and update an expense row so that the list stays current without editing the workbook.

**Acceptance criteria**
- An item can capture description, amount, category, platform, owner, due date, status, and remarks.
- Category, platform, owner, and status use controlled dropdown selections.
- For debt/installment items, capture the platform, debt type, monthly payment, total and paid payment counts, and end date needed by the Debt Center; link payments belonging to the same obligation.
- Required fields and invalid amounts/dates are validated before saving.
- An item can be edited and removed with a clear confirmation for removal.

### Story 2.4 - Track bill funding and temporary budget use
As a user, I want to adjust a reserved bill budget and leave detailed remarks when I temporarily use some of it so that I remember the reason and can put it back before the due date.

**Acceptance criteria**
- A reserved budget item shows its intended amount, amount currently set aside, and shortfall; the user can adjust the amount set aside.
- The item's remarks can describe the amount used, reason, and intended return details; no separate movement record or return action is required.
- Show the bill's due date and outstanding shortfall so that the user can review it before payment.
- Budget totals do not treat a split or adjustment as new income or a second expense.

### Story 2.5 - Review monthly budget totals
As a user, I want to see monthly planned and paid totals alongside payroll so that I can tell what remains available.

**Acceptance criteria**
- Show payroll, total planned expenses, paid expenses, remaining amount, and extra/over-budget amount for the selected month.
- Clearly distinguish planned from paid amounts.
- Totals recalculate after budget items, reserved amounts, or payroll settings change.

---

## Epic 3: Debt Center
**Priority:** P1 - after budget records and totals

Make all active borrowing visible in one place and show how new commitments affect future budgets. The Debt Center is read-only and derives its data from Budget entries.

### Story 3.1 - View debt summary cards
As a user, I want a summary of outstanding debt and active commitments so that I can understand my overall debt at a glance.

**Acceptance criteria**
- Show total outstanding debt, monthly debt payments, active loans, and active installments.
- Include all configured platforms, including GLoan, TikTokLoan, SLoan, SPayLater, TikTokPayLater, Home Credit, MoreTyme, and Maya Credit.
- The total outstanding debt card shows the estimated PHP balance as its main value and the total remaining payment count as a subtitle.
- For each obligation, estimated remaining balance equals remaining payment count multiplied by monthly payment; aggregate unique obligations, not repeated monthly entries.
- Summary values are calculated from active debt-related budget entries and update when those entries change.
- Do not count closed or fully paid obligations as active.

### Story 3.2 - Browse and expand active debts
As a user, I want a list of active debts with expandable payment details so that I can see what I owe and how long payments will continue.

**Acceptance criteria**
- List active debts, loans, and installments with name, platform, type, and monthly payment.
- Expand/collapse an item to view monthly payment, payment progress, paid count, remaining payment count/months, estimated PHP balance, and end date when available.
- Make missing or estimated values visibly distinct from confirmed values.
- The list is read-only; provide navigation to the underlying Budget item to make changes.

### Story 3.3 - Manage debt details through Budget
As a user, I want to enter and update a borrowing commitment in Budget so that the Debt Center reflects my obligations without duplicate entry.

**Acceptance criteria**
- The Budget add/edit flow captures debt/loan name, platform, type, monthly payment, progress, and end date; remaining payment count and estimated balance are calculated.
- Platform and type use dropdowns; payment counts, money, and date fields are validated.
- The user can mark a debt paid off or inactive through Budget without losing its history.
- Saving budget changes updates Debt Center summaries and future-month commitments without creating a second independent record.

### Story 3.4 - Preview a proposed loan's future impact
As a user, I want to enter a potential purchase or loan and preview its payments against future budgets so that I can decide before committing.

**Acceptance criteria**
- A preview accepts principal/base price before interest, monthly payment, start month, number of payments or end date, and any upfront payment; validate that the inputs allow a consistent total to be calculated.
- Show principal, total paid including interest, and total interest paid, clearly identifying estimates; total interest is total paid minus principal when the inputs represent the entire cost.
- Show the added commitment by month and projected remaining budget after existing planned expenses, counting debt payments already in Budget only once.
- Apply the same 5% payroll threshold used on the dashboard to highlight tight and over-budget months.
- A preview does not change Budget. To commit it, use the Budget add flow; the Debt Center remains read-only.

---

## Epic 4: Dashboard and Financial Outlook
**Priority:** P2 - depends on budget and debt summaries

Provide a concise overview of monthly cash flow, upcoming obligations, and spending patterns.

### Story 4.1 - View the monthly dashboard
As a user, I want a dashboard for the selected month so that I can understand income, spending, debt, and remaining money quickly.

**Acceptance criteria**
- Show monthly income and payroll date, current-month expenses, total active debt, and remaining/extra amount.
- Dashboard month selection stays consistent with the Budget tab's selected month.
- Each card uses the same definitions as its source Budget or Debt Center total.

### Story 4.2 - Understand spending breakdown and trends
As a user, I want to see spending by category and monthly budget health so that I can spot patterns and adjust future plans.

**Acceptance criteria**
- Show a spending breakdown for the selected month by category.
- Show a monthly spending trend with Under Budget, Tight, and Over Budget states.
- Based on monthly income, classify a negative remaining amount as Over Budget, a nonnegative amount below 5% as Tight, and 5% or more as Under Budget; show an unavailable state if income is missing or nonpositive.
- Charts/visual summaries remain readable on mobile screens.

### Story 4.3 - See upcoming due dates
As a user, I want a list of upcoming bills and debt payments so that I can prepare before deadlines.

**Acceptance criteria**
- Show upcoming unpaid budget items, including debt payments, with due date, amount, and status; do not list the same payment twice.
- Sort by soonest due date and visually identify overdue items.
- Allow navigation to the related budget item or debt record.

### Story 4.4 - See spending by platform
As a user, I want to see where my money goes by platform so that I can understand which payment and lending services account for my spending.

**Acceptance criteria**
- Summarize selected-month spending grouped by platform, including an unassigned group when needed.
- Include debt payments represented in Budget once, without adding the Debt Center projection again.
- Selecting a platform can reveal the associated records.

---

## Epic 5: App Settings and Responsive Experience
**Priority:** P0 for responsive behavior and payroll; P3 for theme selection

Make core workflows usable across screen sizes and allow the user to configure payroll and appearance.

### Story 5.1 - Use the app on mobile
As a user, I want the Budget, Debt Center, and Dashboard to work on a phone so that I can check and update my finances wherever I am.

**Acceptance criteria**
- Core navigation, forms, lists, and summaries fit narrow screens without horizontal page overflow.
- Dense tables adapt to readable stacked rows or another mobile-friendly layout.
- Actions remain usable with touch input and clear focus/validation states.

### Story 5.2 - Set payroll amount and date
As a user, I want to configure my payroll amount and payday so that monthly remaining-budget calculations use my income.

**Acceptance criteria**
- Select monthly, twice-monthly, or weekly payroll and fixed or flexible/estimated pay; enter an amount per payday for either type.
- Configure the payday dates or schedule needed to determine payments falling in each calendar month, including weekly months with different payday counts.
- Monthly dashboard, budget totals, and forecasts use the sum of that month's scheduled paydays; label flexible income as estimated.
- Missing settings are handled with a clear prompt or empty state rather than misleading totals.

### Story 5.3 - Select an app theme
As a user, I want to choose a theme so that the app's appearance suits my preference.

**Acceptance criteria**
- Provide at least two themes and a clear current selection.
- The selection applies consistently across all app views and persists in localStorage for the active profile.

---

## Epic 6: Users, Boards, and Persistence
**Priority:** P3 - after the single-user flow is proven

Support separate financial boards for different users without mixing their records.

### Story 6.1 - Create a user and board
As a user, I want to create a separate profile/board so that each person's budget and debts remain independent.

**Acceptance criteria**
- A new profile starts with its own budget, debt, payroll, and theme settings.
- Records are isolated by user/board in the data model.
- Clarify whether this is local profile selection or authenticated accounts before implementation; mock profiles do not imply secure authentication.

### Story 6.2 - Switch users or boards
As a user, I want to switch between profiles so that I can work with the correct person's finances.

**Acceptance criteria**
- The active profile is visible and can be changed through a deliberate user-switching control.
- Switching updates all displayed data and settings to the selected profile.
- Unsaved edits are not silently discarded.

### Story 6.3 - Extend local persistence to multiple profiles
As a user, I want each profile's edits to remain separate after reopening the app so that I do not have to re-enter budgets or mix users' data.

**Acceptance criteria**
- Extend the MVP's localStorage persistence to isolate budget entries, payroll, and settings by profile.
- Restore the selected profile and its data across reloads without mixing profiles or overwriting saved data.
- Local profiles do not provide authentication, privacy from other browser users, or cross-device synchronization.

---

## Remaining Decisions
Resolve these during workbook mapping or before the affected feature is implemented:
- How should related monthly Budget entries identify the same debt obligation, especially for existing workbook data?
- How should the estimate handle variable installments, fees, or partial payments when remaining payments times the monthly payment is not accurate?
- For a proposed loan, which inputs are available for interest and fees, and should fees be displayed separately from interest?
- What payday rules should apply to twice-monthly schedules, holidays, and weekends? How should flexible pay estimates be adjusted for individual months?
- Confirm the date display and entry convention; currency is PHP.
- How should a user navigate from a read-only Debt Center obligation to its source Budget entries when the obligation spans several months?

## Suggested First Build Slice
1. Build the responsive shell, navigation, placeholder profile, and Tailwind/SCSS foundation.
2. Map the `2026 Budgeting` sheet; define typed mock records and seed a representative month, including the November examples.
3. Add localStorage persistence and configurable payroll, then implement monthly Budget items, filters, and derived totals.
4. Add reserved-budget splits and remarks, plus debt details on Budget items.
5. Derive the read-only Debt Center and validate proposed-loan forecasts, principal, and interest against future-month budgets.
