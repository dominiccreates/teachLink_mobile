import { backgroundScheduler } from '../services/backgroundTaskScheduler';
import { Image } from 'expo-image';

import logger from './logger';
import { buildImageUrl } from './imageFormat';
import { _backgroundScheduler } from '../services/backgroundTaskScheduler';

export class ImageCache {
  /**
   * Prefetches an array of image URLs to memory or disk.
   * URLs are automatically transformed to the optimal format (WebP) for bandwidth reduction.
   *
   * @param urls Array of image URLs to prefetch
   * @returns A promise that resolves to an array of boolean flags indicating success
   */
  static async prefetchImages(urls: string[]): Promise<boolean[]> {
    try {
      if (!urls || urls.length === 0) return [];
      
      const promises = urls.map(async (url) => {
        if (!url) return false;
        const optimizedUrl = buildImageUrl(url);
        if (!optimizedUrl) return false;
        try {
          return await Image.prefetch(optimizedUrl);
        } catch (e) {
          logger.warn(`Failed to prefetch image: ${url}`, e);
          return false;
        }
      });

      return await Promise.all(promises);
    } catch (e) {
      logger.warn('Error prefetching images', e);
      return [];
    }
  }

  /**
   * Clears all cached images from memory and disk.
   */
  static async clearCache(): Promise<void> {
    try {
      await Image.clearMemoryCache();
      await Image.clearDiskCache();
    } catch (e) {
      logger.warn('Failed to clear image cache', e);
    }
  }
}
