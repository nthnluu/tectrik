import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // ...add more providers here
    ],
    callbacks: {
        session: async (session, user) => {
            session.id = user.id
            //@ts-ignore
            return Promise.resolve(user);

        },
        jwt: async (token, user) => {
            const isSignIn = !user

            if (!isSignIn) {
                token.id = user.id
            }

            return Promise.resolve(token);
        },
    },
    session: {
        jwt: true,
    },
    // A database is optional, but required to persist accounts in a database
    database: {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: false,
        ssl: {
            rejectUnauthorized: false
        }
    },
}

export default (req, res) => NextAuth(req, res, options)
