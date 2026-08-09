# Development Guide

## Prerequisites

- **Git**, [Node.js](https://nodejs.org/) >= 20, `npm`
- **Notebooks (optional):** `python` (>= 3.11) + [`uv`](https://github.com/astral-sh/uv)
- `pre-commit` (`pip install pre-commit && pre-commit install`)

## Local Setup

```bash
git clone https://github.com/Hyperion-Corporation/Organization-Website.git
cd Organization-Website
npm install
npm run dev
```

**Open:** [`http://localhost:3000/`](http://localhost:3000/)  

Local `next dev` uses **no** `basePath` so the site works at the origin. Production builds set `basePath` to `/Organization-Website` for GitHub Pages (override with `NEXT_PUBLIC_BASE_PATH`).

## Notebooks

```bash
cd notebooks
uv sync --extra dev
uv run jupyter lab
```

## Module Execution & Development

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Static export build | `npm run build` |
| Serve the export locally | `npm start` |
| Lint | `npm run lint` |
| Unit + integration tests | `npm test` / `npm run test:watch` |
| E2E / smoke tests | `npm run cypress:open` / `npm run cypress:run` / `npm run cypress:smoke` |

## Optional self-hosting (`infra/`)

Default deployment is GitHub Pages. Optional self-host tooling lives under [`infra/`](../infra/README.md):

| Task | Command |
| --- | --- |
| Docker Compose (nginx serving `out/`) | `docker compose -f infra/docker/docker-compose.yml up --build` |
| Standalone nginx (static `out/`) | See `infra/nginx/README.md` |
| Terraform (ECR) | `cd infra/terraform && terraform init && terraform plan -var-file=environments/dev.tfvars` |
| Ansible (plain host) | `cd infra/ansible && ansible-playbook -i inventory/hosts.ini playbook.yml` |
