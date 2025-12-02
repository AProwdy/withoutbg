# Automated Release System

This project uses **automated releases** powered by [Conventional Commits](https://www.conventionalcommits.org/) and [Semantic Versioning](https://semver.org/).

## How It Works

Every time you push to `main`, the system automatically:

1. 🔍 **Analyzes** your commit messages
2. 📊 **Determines** the version bump (MAJOR/MINOR/PATCH)
3. 📝 **Updates** version files (`pyproject.toml`, `package.json`)
4. 📋 **Generates** changelog
5. 🏷️ **Creates** git tag (e.g., `v1.2.3`)
6. 🐳 **Builds** multi-platform Docker images
7. 📦 **Pushes** to Docker Hub
8. 🎉 **Publishes** GitHub Release with notes

**Everything is automatic** - you just need to follow the commit convention!

## Commit Message Format

```
<type>: <description>
```

### Quick Reference

| Commit | Version Change | Example |
|--------|---------------|---------|
| `feat: add new feature` | 1.0.0 → **1.1.0** | New functionality |
| `fix: resolve bug` | 1.0.0 → **1.0.1** | Bug fixes |
| `feat!: breaking change` | 1.0.0 → **2.0.0** | API changes |
| `docs: update README` | **No release** | Documentation |
| `chore: update deps` | **No release** | Maintenance |

## Examples

### ✨ Add a New Feature (MINOR bump)

```bash
git commit -m "feat: add dark mode support"
git push origin main
# Result: 1.2.0 → 1.3.0
```

### 🐛 Fix a Bug (PATCH bump)

```bash
git commit -m "fix: resolve image upload timeout"
git push origin main
# Result: 1.2.3 → 1.2.4
```

### 💥 Breaking Change (MAJOR bump)

```bash
git commit -m "feat!: redesign API endpoints"
git push origin main
# Result: 1.2.3 → 2.0.0
```

Or with footer:

```bash
git commit -m "feat: change response format

BREAKING CHANGE: API now returns JSON instead of XML"
git push origin main
# Result: 1.2.3 → 2.0.0
```

### 📚 Documentation (no release)

```bash
git commit -m "docs: improve setup instructions"
git push origin main
# Result: No new release
```

## Full Commit Types

| Type | Release | Description |
|------|---------|-------------|
| `feat` | MINOR | New feature |
| `fix` | PATCH | Bug fix |
| `perf` | PATCH | Performance improvement |
| `refactor` | PATCH | Code refactoring |
| `revert` | PATCH | Revert previous change |
| `docs` | None | Documentation only |
| `style` | None | Formatting, linting |
| `test` | None | Add/update tests |
| `chore` | None | Maintenance, deps |
| `ci` | None | CI/CD changes |
| `build` | None | Build system changes |

## Multiple Commits

If you push multiple commits, the system picks the **highest** version bump:

```bash
git commit -m "fix: bug fix"          # PATCH
git commit -m "feat: new feature"     # MINOR
git commit -m "docs: update README"   # None
git push origin main
# Result: MINOR bump (highest)
```

## What Happens After Push

### 1. Semantic Release Job (1-2 min)
- Analyzes commits
- Calculates new version
- Updates files
- Creates git tag
- Creates GitHub Release

### 2. Docker Build Job (10-20 min)
- Downloads models from S3
- Builds multi-platform images
- Tests the build
- Pushes to Docker Hub
- Updates GitHub Release

### 3. You Get Notified
- GitHub Release published
- Docker images available
- Changelog updated

## Viewing Releases

### GitHub Releases
Visit: `https://github.com/YOUR_ORG/withoutbg/releases`

### Docker Hub
Visit: `https://hub.docker.com/r/withoutbg/app`

### Pull Docker Image
```bash
docker pull withoutbg/app:latest
docker pull withoutbg/app:1.2.3
```

## Advanced Usage

### Scopes (optional)

Add scope for better organization:

```bash
git commit -m "feat(frontend): add image preview"
git commit -m "fix(backend): resolve CORS issue"
git commit -m "feat(api): add batch processing endpoint"
```

### Multi-line Commits

For detailed descriptions:

```bash
git commit -m "feat: add batch image processing

- Support multiple file uploads
- Process images in parallel
- Add progress indicator
- Closes #123"
```

### Skip Release

If you want to push without triggering a release:

```bash
git commit -m "chore: update config [skip ci]"
```

## Troubleshooting

### No Release Created

**Possible reasons:**
- No `feat`, `fix`, `perf`, or `refactor` commits
- All commits are `docs`, `chore`, `style`, etc.
- Used `[skip ci]` in commit message

**Solution:** Make a commit with a release-worthy type:
```bash
git commit -m "feat: improve performance" --allow-empty
git push origin main
```

### Wrong Version Bump

**Example:** Expected MINOR but got PATCH

**Cause:** Commit type was `fix` instead of `feat`

**Solution:** Use correct type next time. Or make a new commit:
```bash
git commit -m "feat: previous commit was actually a feature" --allow-empty
git push origin main
```

### Docker Build Failed

Check the GitHub Actions logs:
1. Go to Actions tab
2. Click on the failed workflow
3. Check "docker-release" job logs

Common issues:
- S3 download failed (check AWS credentials)
- Health check failed (check backend code)
- Docker Hub auth failed (check `DOCKERHUB_TOKEN`)

## Manual Override

If you need to manually trigger a release:

1. Go to **Actions** → **Docker Release** (manual workflow)
2. Click **"Run workflow"**
3. This uses the current version from `pyproject.toml`

## Best Practices

### ✅ DO

- Write descriptive commit messages
- Use the correct type for your change
- Group related changes in one commit
- Test locally before pushing to `main`
- Use feature branches and PRs for development

### ❌ DON'T

- Push directly to `main` for experiments
- Use wrong commit types
- Mix multiple types in one commit
- Skip CI unless necessary
- Forget to pull before pushing

## Workflow Diagram

```
Push to main
    ↓
Analyze commits (semantic-release)
    ↓
Determine version bump
    ↓
Update pyproject.toml & package.json
    ↓
Commit & tag (e.g., v1.2.3)
    ↓
Create GitHub Release
    ↓
Download models from S3
    ↓
Build Docker images (AMD64 + ARM64)
    ↓
Test image locally
    ↓
Push to Docker Hub
    ↓
Update GitHub Release with Docker info
    ↓
✅ Done!
```

## FAQ

**Q: Can I still release manually?**
Yes! Use the "Docker Release" workflow in GitHub Actions.

**Q: What if I make a mistake in a commit message?**
If not pushed yet: `git commit --amend -m "correct message"`
If already pushed: Make a new commit with the correct type.

**Q: How do I skip a release?**
Use commit types that don't trigger releases (`docs`, `chore`, etc.) or add `[skip ci]`.

**Q: Can I see what will be released before pushing?**
Not automatically, but you can run semantic-release locally (advanced).

**Q: What if multiple people push to main simultaneously?**
The CI handles this gracefully - only one release will be created with all commits.

**Q: How do I create a MAJOR version bump?**
Use `feat!:` or add `BREAKING CHANGE:` in the commit message footer.

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [Commit Convention Guide](.github/COMMIT_CONVENTION.md)

## Getting Started

1. Read the [Commit Convention Guide](.github/COMMIT_CONVENTION.md)
2. Make your changes in a feature branch
3. Commit using conventional format
4. Create PR and get it reviewed
5. Merge to `main`
6. Watch the magic happen! ✨

---

**Need help?** Check the [Commit Convention Guide](.github/COMMIT_CONVENTION.md) or ask the team!

