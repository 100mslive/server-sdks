export function castDateFields<T>(payload: Record<string, any>): T {
  let key: keyof typeof payload;
  for (key in payload) {
    if (key.endsWith("_at")) {
      payload[key] = new Date(payload[key] as string);
    }
  }
  return payload as T;
}
