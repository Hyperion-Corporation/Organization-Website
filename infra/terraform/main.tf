locals {
  name_prefix = "${var.project_name}-${var.environment}"
}

# Container registry to push infra/docker/Dockerfile's built image to,
# so ansible (or other runners) can pull it.
resource "aws_ecr_repository" "site" {
  name                 = local.name_prefix
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
