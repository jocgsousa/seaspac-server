import * as Yup from "yup";
import User from "../models/User";
import Departamento from "../models/Departamento";

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Validation fails" });
    }

    const isRoot = await User.findByPk(request.userId);

    if (!isRoot.root) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const { username, email } = request.body;
    const isRegister = await User.findOne({
      where: {
        username,
        email,
      },
    });

    if (isRegister) {
      return response
        .status(400)
        .json({ message: "Conta de usuário já cadastrada!" });
    }

    try {
      const user = await User.create(request.body);

      return response.json({
        message: "Conta cadastrada com sucesso!",
        user,
      });
    } catch (error) {
      return response.status(400).json({
        message: "Falha ao cadastrar usuário",
        error,
      });
    }
  }
  async update(request, response) {
    const isAccount = await User.findByPk(request.params.id);

    if (!isAccount) {
      return response.status(400).json({ message: "Conta não encontrada!" });
    }

    // Atualizar conta de terceiros
    if (isAccount.id !== request.userId) {
      const isRoot = await User.findByPk(request.userId);
      if (!isRoot.root) {
        return response
          .status(400)
          .json({ message: "Operação não autorizada!" });
      }

      // Se for um operador root proceguir com a autalização de conta!
      try {
        const schema = Yup.object().shape({
          name: Yup.string(),
          email: Yup.string().email(),
          username: Yup.string(),
          password: Yup.string(),
        });

        if (!(await schema.isValid(request.body))) {
          return response.status(401).json({ error: "Valitadion fails" });
        }

        if (request.body.username !== isAccount.username) {
          const userExists = await User.findOne({
            where: {
              username: request.body.username,
            },
          });
          if (userExists) {
            return response
              .status(401)
              .json({ error: "Este nome de usuário já esta em uso!" });
          }
        }

        const user = await isAccount.update(request.body);

        return response.json({
          message: "Conta atualizada com sucesso!",
          user,
        });
      } catch (error) {
        return response
          .status(400)
          .json({ message: "Falha ao atualizar dados!", error });
      }
    }

    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        username: Yup.string(),
        password: Yup.string(),
      });

      if (!(await schema.isValid(request.body))) {
        return response.status(401).json({ error: "Valitadion fails" });
      }

      if (request.body.username !== isAccount.username) {
        const userExists = await User.findOne({
          where: {
            username: request.body.username,
          },
        });
        if (userExists) {
          return response
            .status(401)
            .json({ error: "Este nome de usuário já esta em uso!" });
        }
      }

      const user = await isAccount.update(request.body);

      return response.json({
        message: "Conta atualizada com sucesso!",
        user,
      });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Falha ao atualizar dados!", error });
    }
  }
  async delete(request, response) {
    return response.json({ message: "ok" });
  }
  async index(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot.root) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const users = await User.findAll({
      where: {
        root: false,
      },
      include: [
        {
          model: Departamento,
          as: "departamento",
        },
      ],
    });

    return response.json(users);
  }
}

export default new UserController();
