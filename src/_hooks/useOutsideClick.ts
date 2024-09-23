import { useEffect } from "react";
import type { RefObject } from "react";

export const observedEvents = {
  mousedown: "mousedown",
  touchstart: "touchstart",
  click: "click",
  // etc...
} as const;

function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  observedEvent: keyof typeof observedEvents = observedEvents.click
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(observedEvent, listener);

    return () => {
      document.removeEventListener(observedEvent, listener);
    };
  }, [ref, handler, observedEvent]);
}

export default useOutsideClick;
