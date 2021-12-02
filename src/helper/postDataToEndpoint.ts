import Post from "../types/Post";

export default async function postDataToEndpoint(
  endpoint: `/${string}`,
  post: Post
): Promise<void> {
  try {
    await fetch(`${process.env.REACT_APP_API + endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  } catch (err) {
    console.log(err);
  }
}
