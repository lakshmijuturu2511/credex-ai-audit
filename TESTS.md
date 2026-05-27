# TESTS.md

## Automated Tests

### 1. Audit Calculation Logic
**File:** `lib/audit.ts`

Covers:
- Monthly savings calculation
- Annual savings calculation
- Recommendation generation
- Optimal spend detection
- High-savings CTA logic

Run:

```bash
npm run lint
```

---

### 2. Shareable Audit Route
**File:** `app/audit/[id]/page.tsx`

Covers:
- Dynamic audit loading
- Supabase fetch integration
- Public audit rendering
- Error fallback handling

Run:

```bash
npm run dev
```

---

### 3. Form Submission Validation
**File:** `app/page.tsx`

Covers:
- Empty field validation
- Numeric input handling
- Audit generation flow

Run:

```bash
npm run dev
```

---

### 4. Supabase Storage Integration
**File:** `lib/supabase.ts`

Covers:
- Audit persistence
- Database insert operations
- Public audit retrieval

Run:

```bash
npm run dev
```

---

### 5. CI Workflow Validation
**File:** `.github/workflows/ci.yml`

Covers:
- Lint execution
- GitHub Actions workflow validation
- Automated checks on push

Run:

```bash
git push
```
