import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

const afterCallback = (req, res, session, state) => {
  if (!session.user.isAdmin) {
    throw new Error("User is not admin");
  }
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { redirectTo: "/" });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
