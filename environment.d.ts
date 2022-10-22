export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEO4J_USER: string
      NEO4J_URI: string
      NEO4J_PASSWORD: string
      DEBUG: string
      GOOGLE_ID: string
      GOOGLE_SECRET: string
      secret: string
    }
  }
}
