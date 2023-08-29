import { initializeApp } from 'firebase/app'

const firebaseConfig={
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN,
  projectId:import.meta.env.VITA_PROJECT_ID,
  storageBucket:import.meta.env.VITA_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITA_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITA_APP_ID
}
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
