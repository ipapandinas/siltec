export interface IImage {
  url: string;
  hash?: string;
  alternativeText?: string;
  formats?: Record<string, { url: string; hash?: string }>;
}
