# Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning and changelog generation.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types and Version Bumps

| Type | Version Bump | Example | When to Use |
|------|-------------|---------|-------------|
| `feat` | **MINOR** (1.0.0 → 1.1.0) | `feat: add dark mode toggle` | New features |
| `fix` | **PATCH** (1.0.0 → 1.0.1) | `fix: resolve memory leak` | Bug fixes |
| `perf` | **PATCH** (1.0.0 → 1.0.1) | `perf: optimize image loading` | Performance improvements |
| `refactor` | **PATCH** (1.0.0 → 1.0.1) | `refactor: simplify auth logic` | Code refactoring |
| `feat!` | **MAJOR** (1.0.0 → 2.0.0) | `feat!: redesign API endpoints` | Breaking changes |
| `BREAKING CHANGE` | **MAJOR** (1.0.0 → 2.0.0) | See below | Breaking changes |
| `docs` | No release | `docs: update README` | Documentation only |
| `style` | No release | `style: fix linting errors` | Code style changes |
| `test` | No release | `test: add unit tests` | Test additions |
| `chore` | No release | `chore: update dependencies` | Maintenance tasks |
| `ci` | No release | `ci: update workflow` | CI/CD changes |
| `build` | No release | `build: update webpack config` | Build system changes |

## Examples

### Feature (MINOR bump)

```bash
git commit -m "feat: add image comparison slider"
```

```bash
git commit -m "feat(frontend): add loading skeleton for image upload"
```

### Bug Fix (PATCH bump)

```bash
git commit -m "fix: handle null values in image processing"
```

```bash
git commit -m "fix(backend): resolve CORS issue for API endpoints"
```

### Breaking Change (MAJOR bump)

**Option 1: Using `!` suffix**
```bash
git commit -m "feat!: change API response structure"
```

**Option 2: Using footer**
```bash
git commit -m "feat: redesign image processing pipeline

BREAKING CHANGE: The API now returns images in a different format.
Old format: { url: string }
New format: { image: { url: string, metadata: object } }"
```

### Documentation (no release)

```bash
git commit -m "docs: add Docker setup instructions"
```

### Chore (no release)

```bash
git commit -m "chore: update npm dependencies"
```

## Multi-line Commits

For more detailed commits:

```bash
git commit -m "feat: add batch image processing

- Support uploading multiple images at once
- Process images in parallel using worker threads
- Add progress indicator for batch operations
- Closes #123"
```

## Scopes

Scopes help organize changes by area:

- `frontend` - Frontend changes
- `backend` - Backend changes
- `api` - API changes
- `docker` - Docker/deployment changes
- `ci` - CI/CD changes

Example:
```bash
git commit -m "feat(backend): add WebSocket support for real-time updates"
```

## Automated Release Process

When you push to `main`, the CI will:

1. ✅ Analyze all commits since the last release
2. ✅ Determine version bump based on commit types
3. ✅ Update version in `pyproject.toml` and `package.json`
4. ✅ Generate changelog
5. ✅ Create git tag (e.g., `v1.2.3`)
6. ✅ Build and push Docker images
7. ✅ Create GitHub Release with notes

## Tips

### Skip CI on Commits

To prevent CI from running on a commit:
```bash
git commit -m "docs: update README [skip ci]"
```

### Multiple Changes in One Commit

If a commit has multiple changes, use the most significant type:
```bash
# This commit adds a feature AND fixes a bug, but feature is more significant
git commit -m "feat: add user authentication

- Implement JWT-based auth
- Add login/logout endpoints
- Fix session timeout bug"
```

### Fixing Previous Commit Message

If you made a mistake in the last commit message:
```bash
git commit --amend -m "feat: correct commit message"
```

⚠️ **Warning**: Only amend commits that haven't been pushed yet!

## Validation

Before pushing, you can validate your commit messages locally:

```bash
# Install commitlint (optional)
npm install -g @commitlint/cli @commitlint/config-conventional

# Check last commit
echo "feat: my new feature" | commitlint
```

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

## FAQ

**Q: What if I forget to use conventional commits?**
A: The CI won't create a release, but your code will still be pushed. You can always make a follow-up commit with the correct format.

**Q: Can I trigger a release manually?**
A: Yes, you can still use the manual "Docker Release" workflow for ad-hoc releases.

**Q: What if multiple commits are pushed together?**
A: The CI will analyze all commits and use the highest version bump (MAJOR > MINOR > PATCH).

**Q: How do I know what version will be released?**
A: The CI will show the new version in the job logs and GitHub Release notes.

