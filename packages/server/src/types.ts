export type Rest<T extends any[]> = T extends [infer _I, ...infer L] ? L : never;
export type First<T extends any[]> = T extends [infer I, ...infer _L] ? I : never;

export type ValueOf<T> = T[keyof T];
