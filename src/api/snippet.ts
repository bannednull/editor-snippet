import { createUserStore } from "@/stores/users";

export async function upsertSnippet({
  ...data
}: { lang: string; code: string; title: string }) {
  const token = createUserStore.getState().token;

  const response = await fetch("/api/snippet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  console.log(await response.json());
}
