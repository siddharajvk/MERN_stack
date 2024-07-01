import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '../../../../dbConfig/db';
import User from '../../../../models/userSchema';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        await connectDB();
        const user = await User.findOne({ username });

        if (!user) {
          throw new Error('User does not exist');
        }

        if (password !== user.password) {
          throw new Error('Invalid password');
        }
        console.log(user)
        return { name: user.username, id: user._id };
      }
    })
  ],
  pages: {
    signIn: '/loginPage',
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      console.log(session.user);
      return session;
    }
  },
  secret: '7a4e0cf297231b7e6d7901cf67016d4f57cd468ed39f2e358f81cdba61101e0b',
};

export async function GET(req, res) {
  console.log('Auth API GET route accessed');
  return NextAuth(req, res, authOptions);
}

export async function POST(req, res) {
  console.log('Auth API POST route accessed');
  return NextAuth(req, res, authOptions);
}
