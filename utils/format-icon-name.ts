export function formatIconName(value: string): string {
  if (!value) return value;

  // 1. Extract version suffix (V1, V2, V3...)
  const versionMatch = value.match(/V\d+$/);
  const version = versionMatch ? versionMatch[0] : null;

  let base = value;
  if (version) {
    base = value.replace(version, "");
  }

  // 2. Ensure first letter is uppercase, keep camelCase intact
  base = base.charAt(0).toUpperCase() + base.slice(1);

  // 3. Append version in parentheses if exists
  return version ? `${base} (${version})` : base;
}
