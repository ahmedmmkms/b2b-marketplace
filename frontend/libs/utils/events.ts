type HttpErrorDetail = {
  message: string;
};

type AppEventDetail = HttpErrorDetail;

type AppEventType = 'http:error';

export const emitAppEvent = (type: AppEventType, detail: AppEventDetail) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(type, { detail }));
};

export const subscribeToAppEvent = (
  type: AppEventType,
  callback: (detail: AppEventDetail) => void
) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const handler = (event: Event) => {
    const custom = event as CustomEvent<AppEventDetail>;
    callback(custom.detail);
  };

  window.addEventListener(type, handler);
  return () => window.removeEventListener(type, handler);
};
