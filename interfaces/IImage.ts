export interface IImage {
  alternativeText: string | null;
  url: string;
  hash?: string | null;
  formats?: Record<string, unknown> | null;
}
