import React, {useEffect, useMemo} from "react";
import {useAppSelector} from "../redux/store";


type isActive = boolean;
type isLoading = boolean;
export default function useStateSlide(slideId: string) : [
    isActive, isLoading
]{
    const {activeSlide, isLoading} = useAppSelector(state => state.homeSlider);
    const isActive = useMemo(() => {
        return activeSlide === slideId;
    }, [activeSlide]);

    return [isActive, isLoading];
}