# Mobile Testing Checklist for OAK IT Client Dashboard

## Test Environment
- **Device**: Mobile (iOS/Android) or Chrome DevTools mobile emulator
- **Viewport Sizes**: 360px (small), 390px (medium), 414px (large)
- **Browser**: Chrome, Safari, Firefox

## Pages to Test

### 1. Auth Pages
| Page | Test Case | Expected Result | Status |
|------|-----------|-----------------|--------|
| Login | Form fields visible | Email and password fields visible, login button enabled | ⬜ |
| Login | Submit with invalid credentials | Error message displayed | ⬜ |
| Login | Submit with valid credentials | Redirects to dashboard | ⬜ |
| Login | "Forgot password?" link | Redirects to forgot-password page | ⬜ |
| Register | Form fields visible | All 7 fields visible, plan selector works | ⬜ |
| Register | Submit with invalid data | Validation errors displayed | ⬜ |
| Register | Submit with valid data | Redirects to verification page | ⬜ |
| Forgot Password | Email field visible | Email field and submit button visible | ⬜ |
| Forgot Password | Submit with invalid email | Error message displayed | ⬜ |
| Forgot Password | Submit with valid email | Success message displayed | ⬜ |
| Reset Password | Form fields visible | Password and confirm password fields visible | ⬜ |
| Reset Password | Submit with invalid data | Validation errors displayed | ⬜ |
| Reset Password | Submit with valid data | Redirects to login page | ⬜ |

### 2. Dashboard Overview
| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Page layout | Stats cards, subscription info, recent tickets visible | ⬜ |
| No subscription | "View plans and subscribe" link visible | ⬜ |
| Loading state | Skeleton loading animation visible | ⬜ |
| Error state | Error message displayed | ⬜ |

### 3. Subscriptions Page
| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Plan display | Plan name, billing cycle, status, amount visible | ⬜ |
| Change Plan button | Modal opens with plan selector | ⬜ |
| Cancel Subscription button | Confirmation dialog appears | ⬜ |
| Loading state | Skeleton loading animation visible | ⬜ |
| Error state | Error message displayed | ⬜ |

### 4. Services Page
| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Active services | Services with "Active" badge visible | ⬜ |
| Available services | Services with "Upgrade" CTA visible | ⬜ |
| No services | "Subscribe to a plan" link visible | ⬜ |
| Loading state | Skeleton loading animation visible | ⬜ |
| Error state | Error message displayed | ⬜ |

### 5. Tickets Page
| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Ticket list | Tickets with status badges visible | ⬜ |
| Create ticket | Form with subject, description, priority, category visible | ⬜ |
| View ticket | Ticket detail with messages visible | ⬜ |
| Reply to ticket | Reply form visible | ⬜ |
| Close ticket | Confirmation and status update | ⬜ |
| Reopen ticket | Confirmation and status update | ⬜ |
| Loading state | Skeleton loading animation visible | ⬜ |
| Error state | Error message displayed | ⬜ |

### 6. Billing Page
| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Payment history | Table with date, description, amount, status visible | ⬜ |
| Invoice button | Invoice modal opens with tax breakdown | ⬜ |
| Print invoice | Print dialog appears | ⬜ |
| Loading state | Skeleton loading animation visible | ⬜ |
| Error state | Error message displayed | ⬜ |

### 7. Profile Page
| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Profile form | Name, company name, company phone fields visible | ⬜ |
| Password form | Current password, new password, confirm password fields visible | ⬜ |
| Submit profile | Success message displayed | ⬜ |
| Submit password | Success message displayed | ⬜ |
| Loading state | Skeleton loading animation visible | ⬜ |
| Error state | Error message displayed | ⬜ |

### 8. Navigation
| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Sidebar | All 6 nav items visible, current page highlighted | ⬜ |
| Mobile menu | Hamburger menu visible, expands on click | ⬜ |
| Logout | Logs out and redirects to login | ⬜ |

## Issues Found

| Page | Issue | Severity |
|------|-------|----------|
|      |       |          |

## Notes
- Test on both iOS and Android devices
- Test both portrait and landscape orientations
- Test with slow network conditions
- Test touch targets (minimum 48x48px)
- Test form field focus states