import {useAppSelector} from "../redux/store";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {MotionValue, useMotionValue} from "framer-motion";

interface Props {
    target: null | MutableRefObject<HTMLElement>,
    startProgress ?: boolean
}



export default function useLandingScroll(props: Props) {
    const {target, startProgress} = props;
    const scrollYProgress = useMotionValue(0);
    const scrollY = useAppSelector(state => state.homeSlider.scrollY);
    const [scrollYProgressValue, setScrollYProgressValue] = useState<number>(0);
    useEffect(() => {
        if (target && target.current) {
            const {top, bottom} = target.current.getBoundingClientRect();
            const height = bottom - top;
            if(startProgress === false) {
                const progress = (0 - top) / height;
                updateScrollY(progress);
            } else {
                const screenHeight = window.innerHeight;
                const progress = (screenHeight - top) / height;
                updateScrollY(progress);
            }
        }
    },[scrollY])

    function updateScrollY(progress: number) {
        if(progress === scrollYProgressValue){
            return
        }
        setScrollYProgressValue(progress);
    }

    useEffect(() => {
        scrollYProgress.set(scrollYProgressValue);
    }, [scrollYProgressValue])

    return scrollYProgress;
}