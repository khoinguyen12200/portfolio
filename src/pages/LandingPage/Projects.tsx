import useLandingScroll from "../../hooks/useLandingScroll";
import {useSpring, useTransform} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {RiProjectorFill} from "react-icons/ri";
import {BsFillBuildingFill} from "react-icons/bs";
import {IoTimeSharp} from "react-icons/io5";


export default function Projects() {
    const ExperienceRef = useRef(null);
    const progress = useLandingScroll({target: ExperienceRef, startProgress: true});

    const scaleY = useTransform(progress, [-0.5, 0.2], [1, 0]);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const unsub = progress.on('change', (value) => {
            setIsActive(value > 0.2);
        })

        return () => {
            unsub();
        }
    }, [])

    const [height, setHeight] = useState(0);
    useEffect(() => {
        if (ExperienceRef.current) {
            setHeight(ExperienceRef.current.clientHeight);
        }
    }, [ExperienceRef.current])


    return (
        <div ref={ExperienceRef} className={"ProjectsSection bg-gray-800"}>
            <motion.div
                className={"sectionBg"}
                style={{scaleY}}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 481">
                    <path className="cls-1"
                          fill={"#1F2937"}
                          d="M1366,489.83c0,188.97-1366,188.97-1366,0S329.51,11,683.56,11s682.44,289.86,682.44,478.83Z"/>
                </svg>
            </motion.div>
            <motion.div
                animate={isActive ? {y: 0, opacity: 1} : {y: 200, opacity: 0}}
                transition={{ type: "spring", stiffness: 100, damping: 20}}
                className={"ProjectsContent"}>
                <h1>
                    Projects
                </h1>
                <div className={"ProjectsListContent"}>
                    <Project
                        title={"Medical tracking web app"}
                        company={"Freelance"}
                        time={"01/2021 - 02/2022"}
                        description={"Web application for stroke patients and doctors."}
                        technologies={["NodeJS, Express, GraphQL - Apollo, React, Redux, Tailwind, MongoDB, MQTT broker, Jenkins."]}
                        responsibilities={[
                            "Design solutions and implement them on both FE and BE sides.",
                            "Convert client's idea to product.",
                            "Providing guidance to clients, articulating solutions, and recommending best practices.",
                            "CI/CD using Jenkins.",
                            "Redesign the whole website."
                        ]}
                    />
                    <Project
                        title={"Physiotherapy medical web app"}
                        company={"Freelance"}
                        time={"11/2021 - 04/2022"}
                        description={"Single Page Application for tracking medical records, controlling medical devices, and supporting restore function physiotherapy for patients."}
                        technologies={["Nodejs, Express, React, Tailwind, ORM, MQTT broker, MongoDB, API"]}
                        responsibilities={[
                            "Redesign the whole website with animation and interaction.",
                            "Mock-up and propose best practices.",
                            "Perform FE and BE tasks"
                        ]}
                    />
                    <Project
                        title={"Real estate web"}
                        company={"Freelance"}
                        time={"01/2022 - 05/2022"}
                        description={"This Laravel web application focuses on advertising real estate properties and publishing news articles."}
                        technologies={["PHP, Laravel, MariaDB, Eloquent, Material UI"]}
                        responsibilities={[
                            "Handling both the front-end and back-end development tasks.",
                            "Design and manage the deployment process."
                        ]}
                    />
                    <Project
                        title={"Ausgezeichnet.org"}
                        company={".NFQ"}
                        time={"05/2022 - 09/2023"}
                        description={"Website for rating - review service that is integrated with Google Review."}
                        technologies={["PHP, Symfony, MongoDB, Bootstrap, Doctrine, ORM, Twig, Github Action, Docker"]}
                        responsibilities={[
                            "Write ticket, describe technical solution, break down and assign - perform the task",
                            "Propose and act to minimize technical debt, out-of-date technical",
                            "Redesign whole website (upgrade Bootstrap 3  5, create new responsive layout)",
                            "Upgrade symfony from version 3.2 to 5.4 to enhance security",
                            "Write unit test",
                            "Brainstorm technical solutions with the team, reviewing code and spoing technical limitations with critical thinking",
                            "Implement CI/CD - GitHub Actions to minimize manual task in the team",
                            "Fix production - critical bug",
                            "Explain technical concepts to a non-tech audience",
                            "Not only help my teammates but also actively support other teams with their problem"
                        ]}
                    />
                </div>
            </motion.div>
        </div>
    )
}

function Project(props: {title: string, company: string, time: string, description: string, technologies: string[], responsibilities: string[]}) {
    return(
        <div className={"Project"}>
            <div className={"ProjectTitle"}>
                <h5 className={"d-flex gap-2"}>
                    <RiProjectorFill className={"fs-4"}/> <b>{props.title}</b>
                </h5>
                <h6 className={"d-flex gap-2"}>
                    {props.company}
                </h6>
                <p  className={"d-flex gap-2"}>
                    {props.time}
                </p>
            </div>
            <div className={"ProjectContent"}>
                <div className={"title"}>
                    Description:
                </div>
                <ul>
                    <li>
                        {props.description}
                    </li>
                </ul>
                <div className={"title"}>
                    Technologies:
                </div>
                <ul>
                    {
                        props.technologies.map((tech, index) => {
                            return <li key={index}>{tech}</li>
                        })
                    }
                </ul>
                <div className={"title"}>
                    Responsibilities:
                </div>
                <ul>
                    {
                        props.responsibilities.map((resp, index) => {
                            return <li key={index}>{resp}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
