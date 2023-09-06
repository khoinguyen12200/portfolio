import Greeting from "./Geeting";
import ShortDescription from "./ShortDescription";
import Scrollbar, {ScrollbarPlugin} from 'smooth-scrollbar';
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setScrollY} from "../../redux/homeSliderSlice";
import MyHelp, {MyHelpContent} from "./MyHelp";
import {ScrollDirectionInterface} from "../../hooks/useScrollDirection";
import Contact from "./Contact";
import Experience from "./Experience";
import Projects from "./Projects";

type Momentum = {
    x: number,
    y: number,
};


export default function LandingPage() {
    const scrollY = useAppSelector(state => state.homeSlider.scrollY)
    const landingPageRef = React.useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [time] = useScrollTime();
    const [focus, setFocus] = useState<boolean>(false);

    useEffect(() => {
        if (!focus && landingPageRef.current) {
            landingPageRef.current.focus();
        }
    }, [time, focus])

    useEffect(() => {
        class MyPlugin extends ScrollbarPlugin {
            static pluginName = 'MyPlugin';

            onRender(remainMomentum: Momentum) {
                const scrollY = this.scrollbar.offset.y;
                dispatch(setScrollY(scrollY));
            }
        }

        Scrollbar.use(MyPlugin);
        Scrollbar.init(document.querySelector('.LandingPage'), {
            damping: 0.06,
            plugins: [MyPlugin],
        });
    }, [])

    return (
        <>
            <div
                onFocus={() => {
                    setFocus(true)
                }}
                onBlur={() => {
                    console.log("blur")
                    setFocus(false);
                }}
                ref={landingPageRef} className={"LandingPage"}>
                <Greeting/>
                <ShortDescription/>
                <MyHelp/>
                <Experience/>
                <Projects/>
                <Contact/>
            </div>
            <MyHelpContent/>
        </>
    )
}


function useScrollTime() {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        let scrollableElement = document.body;
        scrollableElement.addEventListener('wheel', checkScrollDirection);

        function checkScrollDirection(event) {
            setTime(new Date().getTime());
        }


        function touchMoveEvent(event) {
            setTime(new Date().getTime());
        }

        window.addEventListener('touchmove', touchMoveEvent);
        return () => {
            scrollableElement.removeEventListener('wheel', checkScrollDirection);
            window.removeEventListener('touchmove', touchMoveEvent);
        }
    }, [])

    return [time];
}
