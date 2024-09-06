const transformUserDataResponse = (user: Record<string, any>) => {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export { transformUserDataResponse };
