const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  TAGS: (id: string) => `tags/${id}`,
  ASK_QUESTION: "/ask-question",
  QUESTION: (id: string) => `question/${id}`,
  PROFILE: (id: string) => `profile/${id}`,
};

export default ROUTES;
