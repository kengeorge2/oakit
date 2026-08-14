# Sprint 9 & 10 — Plan Pre-Population + Desktop Landing + Repo Consolidation

> **For Hermes:** Execute these sprints task-by-task.

## Complete Domain & Repo Inventory

### Domains:
| Domain | App | Status |
|---|---|---|
| oakitsolutionsandsupplies.com | Marketing (Next.js/Vercel) | ✅ 200 |
| pos.oakitsolutionsandsupplies.com | POS Landing (Vue.js) | ✅ 200 |
| dashboard.oakitsolutionsandsupplies.com | Client Dashboard (Next.js/Vercel) | ✅ 307 |
| posapp.oakitsolutionsandsupplies.com | ClassicPOS API (Laravel/Dokploy) | ⚠️ 500 on root |
| claimspro.oakitsolutionsandsupplies.com | ClaimsPro | ✅ 200 |
| quizapp.oakitsolutionsandsupplies.com | QuizAI | ✅ 200 |
| blog.oakitsolutionsandsupplies.com | Ghost Blog | ✅ 200 |
| server1.oakitsolutionsandsupplies.com | Dokploy UI | ✅ 200 |

### Repos:
| Repo | Branches | Notes |
|---|---|---|
| OAK-IT-Solutions/classicpos-Lite | main, electron-v1, desktop-v1.0.0 tag | Official — has backend, desktop, landing |
| kengeorge2/classicpos-Lite | (doesn't exist) | POS page links to it but it's gone |
| kengeorge2/oakit | main | Marketing + dashboard (Vercel) |

### Local Codebases:
| Path | Contents |
|---|---|
| classicpos-Lite/ | Tauri version + landing page + backend |
| classicpos-Lite-electron/ | Electron version (our Sprint 6 work) |

## Audit Summary

### CRITICAL: Plan slug mismatch
- Marketing: `?plan=basic` → Backend `mapPlanSlug()` → 'professional' (default)
- ALL users get Professional subscription regardless of choice

### CRITICAL: Download 404
- POS page: `github.com/kengeorge2/classicpos/releases.atom` → repo doesn't exist
- Main site: `github.com/kengeorge2/oakit/releases/latest/download/classicpos-windows.exe` → 404
- POS "Buy Now": `oakitsolutionsandsupplies.com/settings/license` → 404

### HIGH: Onboarding wizard doesn't pre-select stored plan
### HIGH: No features shown during registration

---

## Sprint 9 — Plan Pre-Population Flow

### S9.1: Fix backend plan slug mapping
- **File:** `poslavalel/backend/app/Http/Controllers/Api/V1/AuthController.php`
- **Change:** Update `mapPlanSlug()` to accept: `oakit-basic`, `oakit-regular`, `oakit-advanced`

### S9.2: Show plan features + price during registration
- **File:** `oakit/client-dashboard/src/app/auth/register/page.tsx`
- **Change:** Display selected plan's features in a card below plan dropdown

### S9.3: Onboarding wizard reads stored plan
- **File:** `oakit/client-dashboard/src/components/onboarding/wizard.tsx`
- **Change:** Check user's active subscription → pre-select that plan

### S9.4: Backend stores plan features in subscription
- **File:** `poslavalel/backend/app/Http/Controllers/Api/V1/AuthController.php`
- **Change:** Store `plan_features` array in subscription metadata

### S9.5: Checkout pre-selects from active subscription
- **File:** `oakit/client-dashboard/src/app/dashboard/checkout/page.tsx`
- **Change:** If no `?plan=` URL param, check active subscription

---

## Sprint 10 — Desktop Landing + Repo Consolidation

### S10.1: Consolidate repos into OAK-IT-Solutions/classicpos-Lite
- **Action:** Merge electron-v1 branch into main
- **Include:** Electron desktop, landing page, backend
- **Remove:** Tauri-specific files (keep as reference)

### S10.2: Fix download links on POS landing page
- **File:** `classicpos-Lite/landing/src/components/DesktopPricing.vue`
- **Change:** Update "Buy Now" → checkout page
- **Add:** Direct download links (Windows/Linux)

### S10.3: Fix DesktopDownload on main marketing site
- **File:** `oakit/components/DesktopDownload.tsx`
- **Change:** Update GitHub URL to `OAK-IT-Solutions/classicpos-Lite`

### S10.4: Create ClassicPOS detail page on marketing site
- **File:** `oakit/app/products/classicpos/page.tsx` (NEW)
- **Content:** Hero, features, pricing, download section, FAQ

### S10.5: Verify all links + deploy
- **Verify:** All CTAs, pricing, features, download links work
- **Deploy:** Push to GitHub, verify Vercel deployment
