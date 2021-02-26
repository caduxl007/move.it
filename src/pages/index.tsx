import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengsProvider } from '../contexts/ChallengsContexts';

import { CompletedChallengs } from "../components/CompletedChallengs";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from '../styles/pages/Home.module.css';

interface IHomeProps {
  level: number;
  currentExperience: number;
  challengsCompleted: number;
}

export default function Home(props: IHomeProps) {
  return (
    <ChallengsProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengsCompleted={props.challengsCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallengs />
              <CountDown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengsCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengsCompleted: Number(challengsCompleted)
    }
  }
}
