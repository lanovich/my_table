import { useEffect } from "react";

type EventType =
  | "mousedown"
  | "mouseup"
  | "touchstart"
  | "touchend"
  | "focusin"
  | "focusout";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = "mousedown",
): void {
  useEffect(() => {
    const handleEvent = (event: MouseEvent | TouchEvent | FocusEvent) => {
      const target = event.target as Node;

      if (!target || !target.isConnected) {
        return;
      }

      if (ref.current && !ref.current.contains(target)) {
        handler(event);
      }
    };

    document.addEventListener(eventType, handleEvent);

    return () => {
      document.removeEventListener(eventType, handleEvent);
    };
  }, [ref, handler, eventType]);
}
