# infra/

Optional self-hosting alternatives to the default GitHub Pages static export
([`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)).

Default deployment remains: `npm run build` → publish `out/` to `gh-pages`.
Use the tooling below only when you want to serve the same export outside GitHub Pages.

| Directory | Purpose |
| --- | --- |
| [`docker/`](docker/) | Build the static export and serve it with nginx via Docker Compose |
| [`nginx/`](nginx/) | Standalone nginx configs for the `out/` export (without Compose) |
| [`ansible/`](ansible/) | Install/run the site container (or static files) on a plain host |
| [`terraform/`](terraform/) | Cloud provisioning helpers for hosting the container image / resources |

## Quick starts

```bash
# Docker Compose (build + serve)
docker compose -f infra/docker/docker-compose.yml up --build

# Standalone nginx container mounting out/ + configs
npm run build
docker run --rm -p 8080:80 \
  -v "$PWD/out:/usr/share/nginx/html:ro" \
  -v "$PWD/infra/nginx/nginx.conf:/etc/nginx/nginx.conf:ro" \
  -v "$PWD/infra/nginx/conf.d:/etc/nginx/conf.d:ro" \
  nginx:1.27-alpine

# Ansible (edit inventory first)
cd infra/ansible && ansible-playbook -i inventory/hosts.ini playbook.yml

# Terraform (example)
cd infra/terraform && terraform init && terraform plan -var-file=environments/dev.tfvars
```

Visit `http://localhost:8080/Organization-Website/` when using the project `basePath`.
