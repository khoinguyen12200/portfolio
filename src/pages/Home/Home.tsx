import React, {useEffect, useMemo} from 'react';
import Greeting, {GREETING_ID} from "./Greeting";
import SkillList, {SKILL_LIST_ID} from "./SkillList";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import useScrollDirection, {ScrollDirectionInterface} from "../../hooks/useScrollDirection";
import {setActiveSlide, setDeActiveSlide, setLoading} from "../../redux/homeSliderSlice";


const SLIDES = [
    GREETING_ID,
    SKILL_LIST_ID
];
export default function Home() {
    const {activeSlide, deActiveSlide, isLoading} = useAppSelector(state => state.homeSlider);
    const dispatch = useAppDispatch();
    const [scrollDirection, setScrollDirection] = useScrollDirection();

    useEffect(() => {
        if (!isLoading && scrollDirection !== ScrollDirectionInterface.SCROLL_NONE) {
            if (isValidToMoveSlide()) {
                moveToNextSlide();
            }
        }
    }, [scrollDirection])

    function moveToNextSlide() {
        const nextSlide = getNextSlide();
        dispatch(setDeActiveSlide(activeSlide));
        dispatch(setActiveSlide(nextSlide));
        dispatch(setLoading(true));

        setTimeout(() => {
            setScrollDirection(ScrollDirectionInterface.SCROLL_NONE)
            dispatch(setLoading(false));
        }, 1000);
    }

    function getNextSlide() {
        if (scrollDirection === ScrollDirectionInterface.SCROLL_UP) {
            return SLIDES[SLIDES.indexOf(activeSlide) - 1];
        } else {
            return SLIDES[SLIDES.indexOf(activeSlide) + 1];
        }
    }

    function isValidToMoveSlide(): boolean {
        if (scrollDirection === ScrollDirectionInterface.SCROLL_UP) {
            return isValidToMoveSlideUp();
        }
        if (scrollDirection === ScrollDirectionInterface.SCROLL_DOWN) {
            return isValidToMoveSlideDown()
        }

        return false;
    }

    function isValidToMoveSlideUp(): boolean {
        return activeSlide !== SLIDES[0];
    }

    function isValidToMoveSlideDown(): boolean {
        return activeSlide !== SLIDES[SLIDES.length - 1];
    }

    useEffect(() => {
        dispatch(setActiveSlide(SLIDES[0]));
        dispatch(setLoading(false));
        setScrollDirection(ScrollDirectionInterface.SCROLL_NONE);
    }, [])

    const topActiveSlide = useMemo(() => {
        const indexOfActiveSlide = SLIDES.indexOf(activeSlide);
        const top = `${indexOfActiveSlide * -100}vh`;
        return top;
    }, [activeSlide])

    return (
        <div className={"HomePageWrapper"}>
            <div style={{top: topActiveSlide}} id={"HomePageId"} className={"HomePage"}>
                <Greeting/>
                <SkillList/>
            </div>
        </div>
    )
}
