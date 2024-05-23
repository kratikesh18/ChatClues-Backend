async function asyncHandler(requestHandler) {
  return (req, res) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
}

export default asyncHandler;
