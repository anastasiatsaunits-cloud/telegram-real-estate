export function toOptimizedImageUrl(src: string | null | undefined, width: number, quality = 68) {
  if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
    return src ?? '';
  }

  const normalizedSrc = src.startsWith('//') ? `https:${src}` : src;
  const params = new URLSearchParams({
    url: normalizedSrc,
    w: String(width),
    q: String(quality),
  });

  return `/_next/image?${params.toString()}`;
}

export function toOptimizedBackgroundImage(src: string | null | undefined, width: number, overlay?: string, quality = 68) {
  if (!src) {
    return overlay ?? '';
  }

  const optimizedUrl = toOptimizedImageUrl(src, width, quality);
  return overlay ? `${overlay}, url(${optimizedUrl})` : `url(${optimizedUrl})`;
}
