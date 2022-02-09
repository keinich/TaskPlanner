import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    if (
      req.headers.authorization === undefined ||
      req.headers.authorization === null
    ) {
      next();
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    
    let decodedData;
    
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      // console.log("middleware auth", decodedData);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleware;
