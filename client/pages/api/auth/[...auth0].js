import { handleAuth, handleCallback, handleProfile } from "@auth0/nextjs-auth0";

// const afterCallback = (req, res, session, state) => {
//   if (!session.user.isAdmin) {
//     throw new Error("User is not admin");
//   }
//   return session;
// };

export default handleAuth({
  async callback(req, res) {
    try {
      const result = await handleCallback(req, res, { redirectTo: "/" });
      return result;
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});

export async function me(req, res) {
  try {
    await handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
