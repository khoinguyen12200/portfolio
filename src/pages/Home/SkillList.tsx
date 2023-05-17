import useStateSlide from "../../hooks/useStateSlide";

export const SKILL_LIST_ID = 'SKILL_LIST';
export default function SkillList() {
    const [isActive, isLoading] = useStateSlide(SKILL_LIST_ID);

    return (
        <div id={SKILL_LIST_ID} className={`SkillList ${isActive ? 'active' : 'deActive'}`}>

        </div>
    )
}