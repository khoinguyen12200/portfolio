import {useEffect, useState} from "react";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        //check from window
        function checkMobile() {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        //on resize
        window.addEventListener('resize', checkMobile);

        //on load
        checkMobile();

        return () => {
            window.removeEventListener('resize', checkMobile);
        }
    },[])

    return [isMobile];
}
