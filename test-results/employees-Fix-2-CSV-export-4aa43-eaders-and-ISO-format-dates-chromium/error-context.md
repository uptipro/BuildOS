# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employees.spec.ts >> Fix 2: CSV export has correct headers and ISO-format dates
- Location: e2e/employees.spec.ts:79:1

# Error details

```
TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('tbody tr') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e5]:
    - banner [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]:
          - link "Build OS" [ref=e9] [cursor=pointer]:
            - /url: /apps
            - generic [ref=e10]:
              - generic [ref=e11]: Build
              - generic [ref=e12]: OS
          - button "HR" [ref=e15]:
            - img [ref=e16]
            - generic [ref=e21]: HR
            - img [ref=e22]
        - generic [ref=e24]:
          - button [ref=e25]:
            - img [ref=e26]
          - button "AU Admin User admin" [ref=e31]:
            - generic [ref=e33]: AU
            - generic [ref=e34]:
              - paragraph [ref=e35]: Admin User
              - paragraph [ref=e36]: admin
            - img [ref=e37]
    - generic [ref=e39]:
      - complementary [ref=e40]:
        - navigation [ref=e41]:
          - link "Dashboard" [ref=e43] [cursor=pointer]:
            - /url: /apps/hr/dashboard
            - img [ref=e44]
            - text: Dashboard
          - generic [ref=e49]:
            - button "Tasks" [ref=e50]:
              - generic [ref=e51]: Tasks
              - img [ref=e52]
            - generic [ref=e54]:
              - link "Tasks" [ref=e55] [cursor=pointer]:
                - /url: /apps/hr/hr-tasks
                - img [ref=e56]
                - text: Tasks
              - link "My Tasks" [ref=e59] [cursor=pointer]:
                - /url: /apps/hr/my-tasks
                - img [ref=e60]
                - text: My Tasks
          - generic [ref=e63]:
            - button "Employee Management" [ref=e64]:
              - generic [ref=e65]: Employee Management
              - img [ref=e66]
            - generic [ref=e68]:
              - link "All Employees" [ref=e69] [cursor=pointer]:
                - /url: /apps/hr/employees
                - img [ref=e70]
                - text: All Employees
              - link "Departments" [ref=e75] [cursor=pointer]:
                - /url: /apps/hr/departments
                - img [ref=e76]
                - text: Departments
          - generic [ref=e80]:
            - button "Organization" [ref=e81]:
              - generic [ref=e82]: Organization
              - img [ref=e83]
            - link "Organization Structure" [ref=e86] [cursor=pointer]:
              - /url: /apps/hr/org-structure
              - img [ref=e87]
              - text: Organization Structure
          - generic [ref=e91]:
            - button "Leave & Attendance" [ref=e92]:
              - generic [ref=e93]: Leave & Attendance
              - img [ref=e94]
            - generic [ref=e96]:
              - link "Leave Requests" [ref=e97] [cursor=pointer]:
                - /url: /apps/hr/leave-requests
                - img [ref=e98]
                - text: Leave Requests
              - link "Leave Balances" [ref=e101] [cursor=pointer]:
                - /url: /apps/hr/leave-balances
                - img [ref=e102]
                - text: Leave Balances
              - link "Daily Attendance" [ref=e104] [cursor=pointer]:
                - /url: /apps/hr/attendance
                - img [ref=e105]
                - text: Daily Attendance
              - link "Attendance Logs" [ref=e108] [cursor=pointer]:
                - /url: /apps/hr/attendance-logs
                - img [ref=e109]
                - text: Attendance Logs
          - generic [ref=e111]:
            - button "Payroll" [ref=e112]:
              - generic [ref=e113]: Payroll
              - img [ref=e114]
            - generic [ref=e116]:
              - link "Payroll Overview" [ref=e117] [cursor=pointer]:
                - /url: /apps/hr/payroll
                - img [ref=e118]
                - text: Payroll Overview
              - link "Payroll Processing" [ref=e120] [cursor=pointer]:
                - /url: /apps/hr/payroll-processing
                - img [ref=e121]
                - text: Payroll Processing
          - generic [ref=e124]:
            - button "Workforce" [ref=e125]:
              - generic [ref=e126]: Workforce
              - img [ref=e127]
            - link "Workforce Allocation" [ref=e130] [cursor=pointer]:
              - /url: /apps/hr/workforce
              - img [ref=e131]
              - text: Workforce Allocation
          - generic [ref=e136]:
            - button "General Setup" [ref=e137]:
              - generic [ref=e138]: General Setup
              - img [ref=e139]
            - generic [ref=e141]:
              - link "General Setup" [ref=e142] [cursor=pointer]:
                - /url: /apps/hr/hr-general-setup
                - img [ref=e143]
                - text: General Setup
              - link "Base Calendar" [ref=e146] [cursor=pointer]:
                - /url: /apps/hr/base-calendar
                - img [ref=e147]
                - text: Base Calendar
          - generic [ref=e150]:
            - button "Payroll Setup" [ref=e151]:
              - generic [ref=e152]: Payroll Setup
              - img [ref=e153]
            - generic [ref=e155]:
              - link "Payroll Period" [ref=e156] [cursor=pointer]:
                - /url: /apps/hr/payroll-periods
                - img [ref=e157]
                - text: Payroll Period
              - link "Bank Names" [ref=e159] [cursor=pointer]:
                - /url: /apps/hr/bank-names
                - img [ref=e160]
                - text: Bank Names
              - link "Salary Structure" [ref=e162] [cursor=pointer]:
                - /url: /apps/hr/salary-structure
                - img [ref=e163]
                - text: Salary Structure
          - generic [ref=e164]:
            - button "Leave Setup" [ref=e165]:
              - generic [ref=e166]: Leave Setup
              - img [ref=e167]
            - link "Leave Type Setup" [ref=e170] [cursor=pointer]:
              - /url: /apps/hr/leave-type-setup
              - img [ref=e171]
              - text: Leave Type Setup
          - generic [ref=e173]:
            - button "Claims Setup" [ref=e174]:
              - generic [ref=e175]: Claims Setup
              - img [ref=e176]
            - link "Claim Type Setup" [ref=e179] [cursor=pointer]:
              - /url: /apps/hr/claim-type-setup
              - img [ref=e180]
              - text: Claim Type Setup
          - generic [ref=e182]:
            - button "Approvals" [ref=e183]:
              - generic [ref=e184]: Approvals
              - img [ref=e185]
            - link "Approvals" [ref=e188] [cursor=pointer]:
              - /url: /apps/hr/approvals
              - img [ref=e189]
              - text: Approvals
          - generic [ref=e192]:
            - button "Reports" [ref=e193]:
              - generic [ref=e194]: Reports
              - img [ref=e195]
            - link "HR Reports" [ref=e198] [cursor=pointer]:
              - /url: /apps/hr/reports
              - img [ref=e199]
              - text: HR Reports
      - main [ref=e201]:
        - generic [ref=e202]:
          - generic [ref=e203]:
            - generic [ref=e204]:
              - heading "All Employees" [level=1] [ref=e205]
              - paragraph [ref=e206]: 0 employees · 0 active
            - generic [ref=e207]:
              - button "Export CSV" [ref=e208]:
                - img [ref=e209]
                - text: Export CSV
              - button "Add Employee" [ref=e212]:
                - img [ref=e213]
                - text: Add Employee
          - generic [ref=e214]:
            - generic [ref=e215]:
              - img [ref=e216]
              - textbox "Search by name, ID, or role..." [ref=e219]
            - button "Filters" [ref=e221]:
              - img [ref=e222]
              - text: Filters
            - generic [ref=e223]: 0 results
          - generic [ref=e224]:
            - table [ref=e225]:
              - rowgroup [ref=e226]:
                - row "Employee ID Full Name Role / Position Department Date Hired Status Projects Type" [ref=e227]:
                  - columnheader "Employee ID" [ref=e228] [cursor=pointer]:
                    - generic [ref=e229]:
                      - text: Employee ID
                      - img [ref=e230]
                  - columnheader "Full Name" [ref=e232] [cursor=pointer]:
                    - generic [ref=e233]:
                      - text: Full Name
                      - img [ref=e234]
                  - columnheader "Role / Position" [ref=e236] [cursor=pointer]:
                    - generic [ref=e237]:
                      - text: Role / Position
                      - img [ref=e238]
                  - columnheader "Department" [ref=e240] [cursor=pointer]:
                    - generic [ref=e241]:
                      - text: Department
                      - img [ref=e242]
                  - columnheader "Date Hired" [ref=e244] [cursor=pointer]:
                    - generic [ref=e245]:
                      - text: Date Hired
                      - img [ref=e246]
                  - columnheader "Status" [ref=e248] [cursor=pointer]:
                    - generic [ref=e249]:
                      - text: Status
                      - img [ref=e250]
                  - columnheader "Projects" [ref=e252]
                  - columnheader "Type" [ref=e253]
                  - columnheader [ref=e254]
              - rowgroup
            - generic [ref=e255]:
              - img [ref=e256]
              - paragraph [ref=e261]: No employees match your filters
  - region "Notifications alt+T":
    - list:
      - listitem [ref=e262]:
        - img [ref=e264]
        - generic [ref=e267]: Failed to load employees
```

# Test source

```ts
  1   | import { test, expect, type Page } from '@playwright/test';
  2   | 
  3   | const API = 'http://localhost:8080/api';
  4   | 
  5   | /** Get a live JWT and inject it into localStorage before the page loads */
  6   | async function setupAuth(page: Page) {
  7   |   const res = await page.request.post(`${API}/auth/login`, {
  8   |     data: { email: 'admin@buildos.ng', password: 'BuildOS@2025' },
  9   |   });
  10  |   const { access_token, refresh_token, user } = await res.json();
  11  |   await page.addInitScript(
  12  |     ({ at, rt, u }) => {
  13  |       localStorage.setItem('auth_token', at);
  14  |       localStorage.setItem('refresh_token', rt);
  15  |       localStorage.setItem('auth_user', JSON.stringify(u));
  16  |     },
  17  |     { at: access_token, rt: refresh_token, u: user },
  18  |   );
  19  | }
  20  | 
  21  | /** Navigate to employees page and wait until the table is visible */
  22  | async function goToEmployees(page: Page) {
  23  |   await setupAuth(page);
  24  |   await page.goto('/apps/hr/employees');
  25  |   await page.waitForSelector('h1:has-text("All Employees")', { timeout: 20_000 });
  26  |   // Wait for employees to load (table rows appear)
> 27  |   await page.waitForSelector('tbody tr', { timeout: 15_000 });
      |              ^ TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
  28  | }
  29  | 
  30  | // ══════════════════════════════════════════════════════════════════════════
  31  | // FIX 1 — Role is persisted on Create (verified via direct API call)
  32  | // ══════════════════════════════════════════════════════════════════════════
  33  | test('Fix 1: backend saves the role field when creating an employee', async ({ page }) => {
  34  |   // Get a real auth token
  35  |   const loginRes = await page.request.post(`${API}/auth/login`, {
  36  |     data: { email: 'admin@buildos.ng', password: 'BuildOS@2025' },
  37  |   });
  38  |   const { access_token } = await loginRes.json();
  39  | 
  40  |   // Get departments for a valid departmentId
  41  |   const deptRes = await page.request.get(`${API}/departments`, {
  42  |     headers: { Authorization: `Bearer ${access_token}` },
  43  |   });
  44  |   const depts = await deptRes.json();
  45  |   const departmentId = depts[0]?.id;
  46  |   expect(departmentId, 'Need at least one department').toBeTruthy();
  47  | 
  48  |   // Create an employee including a role
  49  |   const createRes = await page.request.post(`${API}/employees`, {
  50  |     headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
  51  |     data: {
  52  |       firstName: 'Playwright',
  53  |       lastName: 'RoleTest',
  54  |       email: `roletest.e2e.${Date.now()}@test.buildos.ng`,
  55  |       phone: '+2341234567890',
  56  |       role: 'Senior E2E Engineer',
  57  |       departmentId,
  58  |       employmentType: 'FullTime',
  59  |       status: 'active',
  60  |       dateHired: new Date().toISOString(),
  61  |     },
  62  |   });
  63  | 
  64  |   expect(createRes.ok(), `Employee creation failed: ${await createRes.text()}`).toBeTruthy();
  65  |   const created = await createRes.json();
  66  | 
  67  |   // The role must be persisted in the returned record
  68  |   expect(created.role, 'role must be saved').toBe('Senior E2E Engineer');
  69  | 
  70  |   // Clean up
  71  |   await page.request.delete(`${API}/employees/${created.id}`, {
  72  |     headers: { Authorization: `Bearer ${access_token}` },
  73  |   });
  74  | });
  75  | 
  76  | // ══════════════════════════════════════════════════════════════════════════
  77  | // FIX 2 — CSV Export produces a presentable file
  78  | // ══════════════════════════════════════════════════════════════════════════
  79  | test('Fix 2: CSV export has correct headers and ISO-format dates', async ({ page }) => {
  80  |   await goToEmployees(page);
  81  | 
  82  |   const downloadPromise = page.waitForEvent('download');
  83  |   await page.click('button:has-text("Export CSV")');
  84  |   const download = await downloadPromise;
  85  | 
  86  |   expect(download.suggestedFilename()).toMatch(/\.csv$/);
  87  | 
  88  |   const path = await download.path();
  89  |   const { readFileSync } = await import('fs');
  90  |   const content = readFileSync(path!, 'utf-8');
  91  |   const lines = content.split('\r\n').filter(Boolean);
  92  | 
  93  |   // Header row must contain key columns
  94  |   expect(lines[0]).toContain('Employee ID');
  95  |   expect(lines[0]).toContain('First Name');
  96  |   expect(lines[0]).toContain('Date Hired');
  97  | 
  98  |   // Data rows must NOT contain locale-style dates or "undefined"
  99  |   if (lines.length > 1) {
  100 |     const row = lines[1];
  101 |     expect(row).not.toMatch(/[A-Z][a-z]{2} \d{1,2}, \d{4}/);
  102 |     expect(row).not.toContain('undefined');
  103 |   }
  104 | });
  105 | 
  106 | // ══════════════════════════════════════════════════════════════════════════
  107 | // FIX 3 — Filter panel is single-column (all filters visible at once)
  108 | // ══════════════════════════════════════════════════════════════════════════
  109 | test('Fix 3: filter panel shows all filter fields simultaneously', async ({ page }) => {
  110 |   await goToEmployees(page);
  111 | 
  112 |   await page.click('button:has-text("Filters")');
  113 | 
  114 |   // All four field labels must be visible at the same time
  115 |   await expect(page.locator('p.uppercase:has-text("Role / Position")').first()).toBeVisible({ timeout: 5000 });
  116 |   await expect(page.locator('p.uppercase:has-text("Department")').first()).toBeVisible();
  117 |   await expect(page.locator('p.uppercase:has-text("Status")').first()).toBeVisible();
  118 |   await expect(page.locator('p.uppercase:has-text("Employment Type")').first()).toBeVisible();
  119 | 
  120 |   // Old two-column sidebar element must NOT exist
  121 |   await expect(page.locator('.w-44.border-r')).toHaveCount(0);
  122 | 
  123 |   // Status options appear as pill buttons (not checkboxes)
  124 |   const activePill = page.locator('button:has-text("active")').first();
  125 |   await expect(activePill).toBeVisible();
  126 |   await activePill.click();
  127 |   await expect(activePill).toHaveClass(/bg-indigo-700/);
```