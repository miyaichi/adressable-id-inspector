export {};

declare global {
  interface window {
    __uid2?: UID2;
  }
}

// Mock UID2 class
declare class UID2 {
  static VERSION: string;
  static COOKIE_NAME: string;
  getAdvertisingToken(): string;
  getIdentity?(): string;
  isIdentityAvailable?(): boolean;
  isInitCompleted?(): boolean;
  Uid2Details?: UID2Details;
}

// Mock UID2Details interface
interface UID2Details {
  name: string;
  defaultBaseUrl: string;
  localStorageKey: string;
  cookieName: string;
}

interface UID2InspectorResult {
  _inspector: string;
  _sdkFound: boolean;
  advertisingToken: string;
  cookieName?: string;
  defaultBaseUrl?: string;
  identity?: string;
  isIdentityAvailable?: boolean;
  isInitCompleted?: boolean;
  localStorageKey?: string;
  name: string;
  version: string;
}

// Get UID2 SDK information from the window object
export const uid2Inspector = (): UID2InspectorResult => {
  const result: UID2InspectorResult = {
    _inspector: 'uid2',
    _sdkFound: false,
    advertisingToken: '',
    name: '',
    version: '',
  };

  if ('__uid2' in window && window.__uid2) {
    const uid2 = window.__uid2 as UID2;
    result._sdkFound = true;

    // Required properties
    result.version = UID2.VERSION;

    // Optional properties
    if ('Uid2Details' in uid2) {
      const { name, defaultBaseUrl, localStorageKey, cookieName } = uid2.Uid2Details || {};
      result.name = name || '';
      result.defaultBaseUrl = defaultBaseUrl || '';
      result.localStorageKey = localStorageKey || '';
      result.cookieName = cookieName || '';
    } else {
      result.name = 'UID2';
      result.cookieName = UID2.COOKIE_NAME || '';
    }

    // Required methods
    result.advertisingToken = uid2.getAdvertisingToken();

    // Optional methods
    if (uid2.getIdentity) result.identity = uid2.getIdentity();
    if (uid2.isIdentityAvailable) result.isIdentityAvailable = uid2.isIdentityAvailable();
    if (uid2.isInitCompleted) result.isInitCompleted = uid2.isInitCompleted();
  }

  return result;
};
