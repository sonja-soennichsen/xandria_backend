declare namespace NodeJS {
  export interface ProcessEnv {
    NEO4J_USER: string
    NEO4J_URI: string

    NEO4J_PASSWORD: string
    JWT_SECRET: string

    GOOGLE_ID: string
    GOOGLE_SECRET: string

    NEXTAUTH_URL: string
    NEXTAUTH_URL_INTERNAL: string
    NEXTAUTH_SECRET: string
    SECRET: string
    GOOGLE_REFRESH_TOKEN: string
  }
}
