# Dependencies

| Module | Location | Manifest | Package Manager |
| --- | --- | --- | --- |
| Site | repo root (`app/`, `src/`, `lib/`) | `package.json` | `npm` |
| Notebooks | `notebooks/` | `pyproject.toml` | `uv` |
| Git automation | `git/` | `pyproject.toml` | `uv` |
| Optional self-hosting | `infra/` (`docker/`, `nginx/`, `ansible/`, `terraform/`) | per-tool configs (no shared lockfile) | Docker / nginx / ansible / terraform |

See [`DEPENDENCY_POLICY.md`](DEPENDENCY_POLICY.md) for policies on adding, pinning, and upgrading dependencies.
