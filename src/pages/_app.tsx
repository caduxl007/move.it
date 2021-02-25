import '../styles/global.css';

import { ChallengsProvider } from '../contexts/ChallengsContexts';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengsProvider>
      <Component {...pageProps} />
    </ChallengsProvider>
  )
}

export default MyApp
