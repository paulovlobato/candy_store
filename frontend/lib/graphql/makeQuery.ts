import { gql } from "graphql-tag";
import { print } from "graphql";

export async function makeQuery(
  query: string,
  variables?: Record<string, any>
) {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  console.info("Variables:", variables);

  console.info("Making GraphQL request");
  try {
    const response = await fetch(`${apiUrl}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      } as HeadersInit,
      body: JSON.stringify({
        query: print(gql(query)),
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.info("GraphQL response: ", result);
    return result;
  } catch (error) {
    console.error("Error during query: ", error);
    throw error;
  }
}
