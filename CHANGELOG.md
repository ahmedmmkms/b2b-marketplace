# Changelog

All notable changes to the B2B Marketplace project will be documented in this file.

## [Unreleased]

## [Restructured Project] - 2025-01-06

### Added
- New directory structure following standard enterprise project conventions
- `config/` directory with environment-specific configurations
- `docker/` directory with Docker configuration files
- `tests/e2e` and `tests/integration` for better test organization
- `seed/data` and `seed/scripts` for data seeding organization
- `scripts/build`, `scripts/deploy`, `scripts/db`, `scripts/config`, and `scripts/utils` for better script organization
- `CHANGELOG.md` file to document changes

### Changed
- Moved all build-related `.cmd` files to `scripts/build/`
- Moved database-related scripts to `scripts/db/`
- Moved utility scripts to `scripts/utils/` or `tools/`
- Moved configuration files to `config/`
- Moved end-to-end tests to `tests/e2e/`
- Updated README.md with new project structure documentation
- Moved seed data and scripts to appropriate subdirectories under `seed/`
- Organized files according to functional areas and responsibilities

### Removed
- Flattened root directory structure
- Consolidated many root-level files into appropriate subdirectories