import { User } from "../models/user";
import { logger } from "../utils/logger";
import { config } from "../../config/configFile";

const checkAccess = async function (req: any, res: any, next: any) {

  try {
    const method =
      req.route.methods.get == true
        ? "get"
        : req.route.methods.post == true
        ? "post"
        : req.route.methods.patch == true
        ? "patch"
        : "delete";
    logger.info(method);

    if (config.getTestMode() === true) {
      next();
    }
    else {
      const user = await User.findOne({
        path: req.route.path,
        allowedRole: req.user.user_type_id,
        method: method,
      });

      if (!user) {
        throw new Error();
      }

      next();

    }


  } catch (e) {
    res.status(401).send(e);
  }
};
export { checkAccess };
