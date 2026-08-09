terraform {
  required_version = ">= 1.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # TODO: configure a remote state backend before using this in a team setting.
  # backend "s3" {
  #   bucket = "organization-website-tfstate"
  #   key    = "organization-website/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.region
}
