import * as Yup from "yup";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import User from "../models/User";

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Validation fails" });
    }
    try {
      const user = await User.findOne({
        where: {
          username: request.body.username,
        },
      });

      if (!user) {
        return response.status(400).json({ error: "Conta não existe!" });
      }

      if (!(await user.checkPassword(request.body.password))) {
        return response.status(400).json({ error: "Senha inválida!" });
      }

      return response.json({
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          provider: user.provider,
          root: user.root,
          fk_dep_id: user.fk_dep_id,
        },
        token: jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return error;
    }
  }
}

export default new SessionController();
