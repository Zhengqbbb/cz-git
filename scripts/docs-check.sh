# shellcheck shell=bash disable=
git diff --quiet "$CACHED_COMMIT_REF" "$COMMIT_REF" \
    docs docs-zh package.json pnpm-lock.yaml netlify.toml scripts/docs-check.sh
