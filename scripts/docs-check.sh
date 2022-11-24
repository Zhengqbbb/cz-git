# shellcheck shell=bash disable=
printf "\033[36m%s\033[1;37m%s\033[0m\n" "prev commit: " 	 "$CACHED_COMMIT_REF"
printf "\033[36m%s\033[1;37m%s\033[0m\n" "current commit: "  "$COMMIT_REF"

git diff --quiet "$CACHED_COMMIT_REF" "$COMMIT_REF" \
    "docs/"           \
    "package.json"    \
    "pnpm-lock.yaml"  \
    "netlify.toml"    \
    "scripts/docs-check.sh"

_diff_exit_code=$?
if [ "$_diff_exit_code" -eq 0 ]; then
	printf "\033[1;32m%s\033[36m%s\033[0m\n" "No need deploy page." "diff exit code: $_diff_exit_code"
else
	printf "\033[1;36m%s\033[31m%s\033[0m\n" "Need deploy page. diff exit code: "   "$_diff_exit_code"
fi
exit "$_diff_exit_code"
