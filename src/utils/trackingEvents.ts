/**
 * Enum of all tracked analytics events in the application.
 * Using a central enum ensures consistency and prevents typos.
 */
export enum AnalyticsEvent {
  // Session Events
  APP_LAUNCH = 'app_launch',
  SESSION_START = 'session_start',
  SESSION_END = 'session_end',

  // Navigation Events
  SCREEN_VIEW = 'screen_view',

  // User Actions
  UI_CLICK = 'ui_click',
  FORM_SUBMIT = 'form_submit',
  AUTH_LOGIN = 'auth_login',
  AUTH_LOGOUT = 'auth_logout',
  SEARCH_QUERY = 'search_query',

  // Course Events
  COURSE_STARTED = 'course_started',
  COURSE_COMPLETED = 'course_completed',

  // Quiz Events
  QUIZ_STARTED = 'quiz_started',
  QUIZ_COMPLETED = 'quiz_completed',

  // Content Interaction
  CONTENT_VIEW = 'content_view',
  CONTENT_SHARE = 'content_share',
  CONTENT_LIKE = 'content_like',

  // Button Clicks
  BUTTON_CLICK = 'button_click',

  // Performance & Infrastructure
  PERFORMANCE_METRIC = 'performance_metric',
  API_ERROR = 'api_error',
  CRASH_REPORT = 'crash_report',

  // Resource Timing (Issue #34)
  API_TIMING = 'api_timing',
  IMAGE_TIMING = 'image_timing',
  RESOURCE_TIMING_SUMMARY = 'resource_timing_summary',
}

/**
 * Standard properties that can be attached to any event.
 */
export interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Common screen names for type safety.
 */
export enum ScreenName {
  HOME = 'home',
  EXPLORE = 'explore',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  CHAT = 'chat',
  CONTENT_DETAIL = 'content_detail',
  LOGIN = 'login',
  SIGNUP = 'signup',
  COURSE_VIEWER = 'course_viewer',
  QUIZ = 'quiz',
  SEARCH = 'search',
}

/**
 * Types of performance metrics tracked.
 */
export enum PerformanceMetric {
  TTI = 'time_to_interactive',
  APP_LOAD_TIME = 'app_load_time',
  SCREEN_TRANSITION_TIME = 'screen_transition_time',
  API_RESPONSE_TIME = 'api_response_time',
}

/**
 * Resource timing metric names for structured reporting.
 */
export enum ResourceTimingMetric {
  API_DURATION = 'api_duration',
  IMAGE_LOAD_DURATION = 'image_load_duration',
  API_P50 = 'api_p50',
  API_P95 = 'api_p95',
  IMAGE_P50 = 'image_p50',
  IMAGE_P95 = 'image_p95',
  API_ERROR_RATE = 'api_error_rate',
  IMAGE_ERROR_RATE = 'image_error_rate',
}
