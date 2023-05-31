import bootstrapIcon from '../../assets/images/bootstrap.png';
import dockerIcon from '../../assets/images/docker.webp';
import expressIcon from '../../assets/images/expresjs.png';
import graphQLIcon from '../../assets/images/graphql.png';
import jenkinsIcons from '../../assets/images/jenkins.png';
import nextJsIcon from '../../assets/images/nextjs.png';
import reduxIcon from '../../assets/images/redux.png';
import symfonyIcon from '../../assets/images/symfony.png';
import tailwindIcon from '../../assets/images/tailwind.png';
import typescriptIcon from '../../assets/images/typescript.svg';
import reactIcon from '../../assets/images/react.png';
import jiraIcon from '../../assets/images/jira.png';
import ubuntuIcon from '../../assets/images/ubuntu.png';
import laravelIcon from '../../assets/images/laravel.png';
import mongodbIcon from '../../assets/images/mongodb.png';
import nginxIcon from '../../assets/images/nginx.png';
import mysqlIcon from '../../assets/images/mysql.png';
import framerMotionIcon from '../../assets/images/framer.webp';

export interface SkillItemInterface {
    name: string;
    icon: string;
}

export const SKILL_LIST: SkillItemInterface[] = [];

export const FRONT_END_SKILLS = [
    {
        name: 'React',
        icon: reactIcon
    },
    {
        name: 'Redux',
        icon: reduxIcon
    },
    {
        name: 'Tailwind',
        icon: tailwindIcon
    },
    {
        name: 'Bootstrap',
        icon: bootstrapIcon
    },
    {
        name: 'Framer Motion',
        icon: framerMotionIcon
    }
];

export const BackEndSkills = [
    {
        name: 'NextJS',
        icon: nextJsIcon
    },
    {
        name: 'GraphQL',
        icon: graphQLIcon
    },
    {
        name: 'TypeScript',
        icon: typescriptIcon
    },
    {
        name: 'Symfony',
        icon: symfonyIcon
    },
    {
        name: 'Laravel',
        icon: laravelIcon
    },
    {
        name: 'Express',
        icon: expressIcon
    },
    {
        name: 'MongoDB',
        icon: mongodbIcon
    },
    {
        name: 'MySQL',
        icon: mysqlIcon
    }
]

export const OTHER_SKILLS = [
    {
        name: 'Docker',
        icon: dockerIcon
    },
    {
        name: 'Jenkins',
        icon: jenkinsIcons
    },

    {
        name: 'Jira',
        icon: jiraIcon
    },
    {
        name: 'Ubuntu',
        icon: ubuntuIcon
    },
    {
        name: 'Nginx',
        icon: nginxIcon
    },
]
