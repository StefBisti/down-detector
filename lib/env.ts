import "server-only";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const dbUrl = required("DATABASE_URL");
export const ipSalt = required("IP_SALT");
