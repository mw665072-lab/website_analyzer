export function mapToObject(map: Map<any, any> | unknown): unknown {
  if (!(map instanceof Map)) return map;
  const obj: Record<string, any> = {};
  for (const [k, v] of map.entries()) {
    obj[String(k)] = v;
  }
  return obj;
}
