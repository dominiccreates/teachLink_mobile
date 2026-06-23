import { Platform } from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ImageFormat = 'webp' | 'png' | 'jpg' | 'avif' | 'original';

export interface ImageFormatOptions {
  /** Preferred format. Default: 'webp' on supported platforms, 'original' otherwise */
  format?: ImageFormat;
  /** Image quality 1–100. Default: 80 */
  quality?: number;
  /** Resize width (pixels) */
  width?: number;
  /** Resize height (pixels) */
  height?: number;
}

// ─── Configuration ────────────────────────────────────────────────────────────

const FORMAT_QUALITY = 80;
const FORMAT_PARAM = 'fm';
const QUALITY_PARAM = 'q';

// ─── WebP support detection ───────────────────────────────────────────────────

let _webpSupported: boolean | null = null;

export function resetWebPCache(): void {
  _webpSupported = null;
}

function supportsWebP(): boolean {
  if (_webpSupported !== null) return _webpSupported;

  // iOS 14+ and modern Android all support WebP natively via Image I/O
  if (Platform.OS === 'ios') {
    const major = parseInt(Platform.Version as string, 10);
    _webpSupported = major >= 14;
  } else if (Platform.OS === 'android') {
    // Android 4.0+ (API 14+) supports WebP natively
    _webpSupported = true;
  } else if (Platform.OS === 'web') {
    // Feature-detect WebP on web via canvas
    _webpSupported = checkWebPSupport();
  } else {
    _webpSupported = true;
  }

  return _webpSupported;
}

/** Feature-detect WebP support in browser environments */
function checkWebPSupport(): boolean {
  if (typeof document === 'undefined') return false;
  const elem = document.createElement('canvas');
  if (elem.getContext?.('2d')) {
    return elem.toDataURL('image/webp').indexOf('image/webp') === 5;
  }
  return false;
}

// ─── URL transformation ───────────────────────────────────────────────────────

/**
 * Determines the best image format for the current platform.
 * Returns 'webp' on supporting devices, 'original' otherwise.
 */
export function getOptimalFormat(): ImageFormat {
  if (supportsWebP()) return 'webp';
  return 'original';
}

/**
 * Appends image transformation query parameters to a URL.
 *
 * Handles:
 * - URLs that already have query parameters (?)
 * - CDN endpoints that support format/quality transformation
 * - Falls back to the original URL unchanged if the URL has no path
 *
 * Examples:
 *   https://cdn.teachlink.com/img/abc.jpg → https://cdn.teachlink.com/img/abc.jpg?fm=webp&q=80
 *   https://cdn.teachlink.com/img/abc.png → https://cdn.teachlink.com/img/abc.png?fm=webp&q=80
 *   https://cdn.teachlink.com/img/abc.jpg?w=400 → https://cdn.teachlink.com/img/abc.jpg?w=400&fm=webp&q=80
 */
export function buildImageUrl(
  uri: string | null | undefined,
  options: ImageFormatOptions = {},
): string | null {
  if (!uri) return null;

  const format = options.format ?? getOptimalFormat();
  if (format === 'original') return uri;

  const quality = options.quality ?? FORMAT_QUALITY;
  const separator = uri.includes('?') ? '&' : '?';

  let transformed = `${uri}${separator}${FORMAT_PARAM}=${format}&${QUALITY_PARAM}=${quality}`;

  if (options.width) {
    transformed += `&w=${options.width}`;
  }
  if (options.height) {
    transformed += `&h=${options.height}`;
  }

  return transformed;
}

/**
 * Returns the Accept header value for image requests.
 * Prioritizes modern formats with WebP/AVIF fallback chain.
 */
export function getImageAcceptHeader(): string {
  if (supportsWebP()) {
    return 'image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8';
  }
  return 'image/png,image/jpeg,image/*;q=0.8';
}
