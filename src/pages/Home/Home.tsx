import React, {useEffect, useMemo} from 'react';
import Greeting, {GREETING_ID} from "./Greeting";
import SkillList, {SKILL_LIST_ID} from "./SkillList";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import useScrollDirection, {ScrollDirectionInterface} from "../../hooks/useScrollDirection";
import {moveToSlide, setActiveSlide, setDeActiveSlide, setLoading} from "../../redux/homeSliderSlice";
import Contact, {CONTACT_ID} from "./Contact";
import Menu from "./Menu";


const FRIST_SLIDE_ID = GREETING_ID;
const SLIDES = [
    GREETING_ID,
    SKILL_LIST_ID,
    CONTACT_ID
];
export default function Home() {
    const {activeSlide, deActiveSlide, isLoading} = useAppSelector(state => state.homeSlider);
    const dispatch = useAppDispatch();
    const [scrollDirection, setScrollDirection] = useScrollDirection();

    useEffect(() => {
        if (!isLoading && scrollDirection !== ScrollDirectionInterface.SCROLL_NONE) {
            if (isValidToMoveSlide()) {
                moveToNextSlide();
                return;
            }
        }
        setScrollDirection(ScrollDirectionInterface.SCROLL_NONE)
    }, [scrollDirection])

    function moveToNextSlide() {
        const nextSlide = getNextSlide();
        dispatch(moveToSlide(nextSlide));
    }

    useEffect(() => {
        if(!isLoading) {
            setScrollDirection(ScrollDirectionInterface.SCROLL_NONE)
        }
    }, [isLoading])

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
        dispatch(setActiveSlide(FRIST_SLIDE_ID));
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
                <Menu/>
                <Greeting/>
                <SkillList/>
                <Contact/>
            </div>
        </div>
    )
}
