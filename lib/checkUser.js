import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    // First try to find by clerkUserId
    let loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Then try to find by email (in case user exists)
    const email = user.emailAddresses[0].emailAddress;
    loggedInUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    const name = `${user.firstName} ${user.lastName}`;

    if (loggedInUser) {
      // Update existing user with new clerk ID
      const updatedUser = await db.user.update({
        where: {
          email: email,
        },
        data: {
          clerkUserId: user.id,
          name,
          imageUrl: user.imageUrl,
        },
      });
      return updatedUser;
    }

    // Create new user
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: email,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return null;
  }
};
