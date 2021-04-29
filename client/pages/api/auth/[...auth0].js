import { handleAuth, handleCallback, handleProfile } from "@auth0/nextjs-auth0";

const afterCallback = (req, res, session, state) => {
  if (!session.user.isAdmin) {
    throw new Error("User is not admin");
  }
  return session;
};

function getUrls(req) {
  const host = req.headers["host"];
  const protocol = process.env.VERCEL_URL ? "https" : "http";
  const redirectUri = `${protocol}://${host}`;
  console.log({ redirectUri });
  const returnTo = `${protocol}://${host}`;
  return {
    redirectUri,
    returnTo,
  };
}

export default handleAuth({
  async callback(req, res) {
    try {
      const { redirectUri } = getUrls(req);
      const result = await handleCallback(req, res, { redirectUri });
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
