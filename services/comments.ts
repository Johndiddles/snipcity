export const postComment = async (comment: string, snippetId: string) => {
  const response = await fetch(`/api/snippets/${snippetId}/comment`, {
    method: "POST",
    body: JSON.stringify({ comment }),
  });
  return response.json();
};
