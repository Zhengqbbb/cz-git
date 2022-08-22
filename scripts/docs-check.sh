# shellcheck shell=bash disable=
printf "\033[36m%s\033[1;37m%s\033[0m\n" "prev commit: " 	 	"$CACHED_COMMIT_REF"
printf "\033[36m%s\033[1;37m%s\033[0m\n" "current commit: " "$CACHED_COMMIT_REF"

git diff --quiet "$CACHED_COMMIT_REF" "$COMMIT_REF" \
    "docs/"           \
    "docs-zh/"        \
    "package.json"    \
    "pnpm-lock.yaml"  \
    "netlify.toml"    \
    "scripts/docs-check.sh"

_diff_exit_code=$?
[ "$_diff_exit_code" -eq 0 ] || \
	printf "\033[36m%s\033[1;31m%s\033[0m\n" "diff exit code: " "$_diff_exit_code"
exit "$_diff_exit_code"
