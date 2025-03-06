export const saveDiscussions = (updatedDiscussions) => {
  localStorage.setItem("discussions", JSON.stringify({ discussions: updatedDiscussions }));
};
