type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export function ensureNotUndefined<TObj, TKeys extends keyof TObj>
(obj: TObj, keys: TKeys[]): RequiredBy<TObj, TKeys> {
  for (const key of keys) {
    if (obj[key] === undefined) {
      throw new Error(`Field ${key} is undefined.`);
    }
  }

  return obj as any;
}
