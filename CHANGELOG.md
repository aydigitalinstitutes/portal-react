# Changelog

All notable changes to this repository will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## 1.1.0 - 2026-01-25

### Changed
- Refactored the public website source layout from `frontend/` to a conventional root `src/` structure.
- Removed the obsolete Sequelize-based backend implementation and kept the Prisma/TypeScript backend as the single source of truth.
- Updated CI/CD workflows to use `DATABASE_URL` and Prisma-based migration/apply steps.

### Added
- Added documentation describing the refactor rationale and before/after structure comparison.

### Security
- Identified moderate dependency advisories that require breaking upgrades (e.g., Vite major bump); changes were not forced to avoid regressions.

