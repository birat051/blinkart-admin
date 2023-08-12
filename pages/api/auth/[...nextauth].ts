import { MongoClient } from 'mongodb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken'; 

const mongoUri = process.env.DB_LINK || '';

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  seller: string | null
}

// console.log('Mongo URI is: ',mongoUri)

const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      console.log('Token is: ',token)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          seller: token.seller
        },
      };
    },
    jwt({ token, user }) {
      if(user)
      {
      token.role = (user as User).role 
      token.seller =   (user as User).seller
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
    
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        // email: { label: 'Email', type: 'email', placeholder: 'jjonahjames@dailybugle.com' },
        // password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const client = new MongoClient(mongoUri);

        try {
          await client.connect();
          const db = client.db();
          console.log('Email is: ',email)
          const collection = db.collection<User>('adminusers');

          const user = await collection.findOne({ email });
          
          if (user) {
            if (user.password === password) {
              const tokenPayload = {
                sub: user.id,
                role: user.role,
                email: user.email,
                name: user.name
              };
          
              // Generate token using your preferred JWT library
              // const secretKey = process.env.NEXTAUTH_SECRET;
              // const token = jwt.sign(tokenPayload, secretKey??'');
              return { ...user, id: user._id.toString(),role:user.role,seller:user.seller??'' };
            } else {
              throw new Error('Incorrect password');
            }
          } else {
            throw new Error('No user found with this email id');
          }
        } finally {
          await client.close();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
};

export default NextAuth(authOptions);
