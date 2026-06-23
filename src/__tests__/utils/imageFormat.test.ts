import { Platform } from 'react-native';
import {
  buildImageUrl,
  getImageAcceptHeader,
  getOptimalFormat,
  resetWebPCache,
} from '../../utils/imageFormat';

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    Version: '14',
  },
}));

describe('imageFormat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetWebPCache();
  });

  describe('getOptimalFormat', () => {
    it('returns webp on iOS 14+', () => {
      (Platform as any).OS = 'ios';
      (Platform as any).Version = '14';
      expect(getOptimalFormat()).toBe('webp');
    });

    it('returns original on iOS < 14', () => {
      (Platform as any).OS = 'ios';
      (Platform as any).Version = '13';
      expect(getOptimalFormat()).toBe('original');
    });

    it('returns webp on Android', () => {
      (Platform as any).OS = 'android';
      expect(getOptimalFormat()).toBe('webp');
    });
  });

  describe('buildImageUrl', () => {
    it('returns null for null/undefined input', () => {
      expect(buildImageUrl(null)).toBeNull();
      expect(buildImageUrl(undefined)).toBeNull();
    });

    it('returns URI unchanged when format is original', () => {
      const uri = 'https://example.com/img.jpg';
      expect(buildImageUrl(uri, { format: 'original' })).toBe(uri);
    });

    it('appends WebP query params to a clean URL', () => {
      (Platform as any).OS = 'android';
      const result = buildImageUrl('https://cdn.teachlink.com/img/abc.jpg');
      expect(result).toBe('https://cdn.teachlink.com/img/abc.jpg?fm=webp&q=80');
    });

    it('appends to existing query params', () => {
      (Platform as any).OS = 'android';
      const result = buildImageUrl('https://cdn.teachlink.com/img/abc.jpg?w=400');
      expect(result).toBe('https://cdn.teachlink.com/img/abc.jpg?w=400&fm=webp&q=80');
    });

    it('includes width and height when provided', () => {
      (Platform as any).OS = 'android';
      const result = buildImageUrl('https://cdn.teachlink.com/img/abc.jpg', {
        width: 300,
        height: 200,
      });
      expect(result).toContain('w=300');
      expect(result).toContain('h=200');
    });
  });

  describe('getImageAcceptHeader', () => {
    it('includes webp when supported', () => {
      (Platform as any).OS = 'android';
      const header = getImageAcceptHeader();
      expect(header).toContain('image/webp');
      expect(header).toContain('image/avif');
    });

    it('skips webp when not supported', () => {
      (Platform as any).OS = 'ios';
      (Platform as any).Version = '13';
      const header = getImageAcceptHeader();
      expect(header).not.toContain('image/webp');
    });
  });
});
