import * as Yup from "yup";
import Departamento from "../models/Departamento";
import User from "../models/User";

class DepartamentoController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Validation fails" });
    }

    const isRoot = await User.findByPk(request.userId);

    if (!isRoot.root) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const isDepartamento = await Departamento.findOne({
      where: {
        name: request.body.name,
      },
    });

    if (isDepartamento) {
      return response
        .status(400)
        .json({ error: "Setor/projeto já cadastrado com este nome!" });
    }

    try {
      const departamento = await Departamento.create(request.body);
      return response.json({
        message: "Setor/projeto cadastrado com sucesso!",
        departamento,
      });
    } catch (error) {
      return response.status(400).json({ error: "Falha ao cadastrar!" });
    }
  }

  async update(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const isDep = await Departamento.findByPk(request.params.id);
    if (!isDep) {
      return response.status(400).json({ error: "Falha ao atualizar dados!" });
    }

    try {
      const departamento = await isDep.update(request.body);
      return response.json({ message: "Atualizado com sucesso", departamento });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Falha ao atulizar!", error });
    }
  }

  async delete(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const isDep = await Departamento.findByPk(request.params.id);
    if (!isDep) {
      return response.status(400).json({ error: "Falha ao deletar!" });
    }

    try {
      const departamento = await isDep.destroy();
      return response.json({ message: "Deletado com sucesso", departamento });
    } catch (error) {
      return response.status(400).json({ message: "Falha ao deletar!", error });
    }
  }

  async index(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const deps = await Departamento.findAll({
      include: [
        {
          model: User,
          as: "operadores",
        },
      ],
    });
    return response.json(deps);
  }
}

export default new DepartamentoController();
