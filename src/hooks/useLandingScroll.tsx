import {useAppSelector} from "../redux/store";
import {MutableRefObject, useEffect, useState} from "react";
import {MotionValue} from "framer-motion";


export default function useLandingScroll({target}: {target: null | MutableRefObject<HTMLElement>}) {
    const scrollY = useAppSelector(state => state.homeSlider.scrollY);
    const [scrollYProgress, setScrollYProgress] = useState<MotionValue<number>>(new MotionValue());
    useEffect(() => {
        if (target && target.current) {
            const {top, bottom} = target.current.getBoundingClientRect();
            const height = bottom - top;
            const progress = (0 - top) / height;
            updateScrollY(progress);
        }
    },[scrollY])

    function updateScrollY(progress: number) {
        if(progress === scrollYProgress.get()){
            return
        }
        const newClone = new MotionValue();
        newClone.set(progress);
        setScrollYProgress(newClone);
    }

    return scrollYProgress
}