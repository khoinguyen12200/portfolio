import React, {useEffect} from "react";

export enum ScrollDirectionInterface {
    SCROLL_UP = 'SCROLL_UP',
    SCROLL_DOWN = 'SCROLL_DOWN',
    SCROLL_NONE = 'SCROLL_NONE',
}

export default function useScrollDirection() : [
    ScrollDirectionInterface,
    (direction: ScrollDirectionInterface) => void
]{
    const [scrollDirection, setScrollDirection] = React.useState<ScrollDirectionInterface>(null);

    useEffect(() => {
        let scrollableElement = document.body;
        scrollableElement.addEventListener('wheel', checkScrollDirection);

        function checkScrollDirection(event) {
            if (checkScrollDirectionIsUp(event)) {
                setScrollDirection(ScrollDirectionInterface.SCROLL_UP);
            } else {
                setScrollDirection(ScrollDirectionInterface.SCROLL_DOWN);
            }
        }

        function checkScrollDirectionIsUp(event) {
            if (event.wheelDelta) {
                return event.wheelDelta > 0;
            }
            return event.deltaY < 0;
        }

        let startY;
        function touchStartEvent(event) {
            startY = event.touches[0].clientY;
        }

        function touchMoveEvent(event) {
            const currentY = event.touches[0].clientY;
            const deltaY = currentY - startY;
            if (deltaY > 0) {
                setScrollDirection(ScrollDirectionInterface.SCROLL_UP);
            } else {
                setScrollDirection(ScrollDirectionInterface.SCROLL_DOWN);
            }
        }
        window.addEventListener('touchstart', touchStartEvent);
        window.addEventListener('touchmove', touchMoveEvent);
        return () => {
            scrollableElement.removeEventListener('wheel', checkScrollDirection);
            window.removeEventListener('touchstart', touchStartEvent);
            window.removeEventListener('touchmove', touchMoveEvent);
        }
    },[])

    return [scrollDirection, setScrollDirection];
}