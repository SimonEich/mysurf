import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
//import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
import { auth } from '@clerk/nextjs/server';

const {} =auth()
export const db = drizzle(process.env.DATABASE_URL!);
console.log(db)

export async function dbWrite() {
  const user: typeof usersTable.$inferInsert = {
    name: 'mono',
    age: 30,
    email: 'mono@hisry.v',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')
  }

//
//  const users = await db.select().from(usersTable);
//  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

//  await db
//    .update(usersTable)
//    .set({
//      age: 31,
//    })
//    .where(eq(usersTable.email, user.email));
//  console.log('User info updated!')
//
//  await db.delete(usersTable).where(eq(usersTable.email, user.email));
//  console.log('User deleted!')
//}
//dbWrite(a);
