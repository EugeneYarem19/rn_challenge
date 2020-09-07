type ImageSize = "small" | "large";

export interface IPoster {
  poster: string | undefined;
  size?: ImageSize;
  smallOnEmptyPoster?: boolean;
  smallOnError?: boolean;
  style?: Record<string, unknown> | null;
}
