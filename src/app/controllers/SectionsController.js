import * as Yup from "yup";
import User from "../models/User";
import Section from "../models/Section";
import Departamento from "../models/Departamento";
import Form from "../models/Form";

class SectionsController {
  async store(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Validation fails" });
    }

    const isSection = await Section.findOne({
      title: request.body.title,
      fk_dep_id: request.body.fk_dep_id,
    });

    if (isSection) {
      return response
        .status(400)
        .json({ message: "Já existe uma seção com o mesmo nome!" });
    }

    try {
      const section = await Section.create(request.body);
      return response.json({
        message: "Seção criada com sucesso!",
        section,
      });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Falha ao criar seção!", error });
    }
  }

  async update(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Validation fails" });
    }

    const isSection = await Section.findByPk(request.params.id);

    if (!isSection) {
      return response.status(400).json({ message: "Seção não existe!" });
    }

    try {
      const section = await isSection.update(request.body);
      return response.json({
        message: "Seção atualizada com sucesso!",
        section,
      });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Falha ao atualizar seção!", error });
    }
  }

  async delete(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const isSection = await Section.findByPk(request.params.id);
    if (!isSection) {
      return response.status(400).json({ error: "Seção não existe!" });
    }

    try {
      await isSection.destroy();
      return response.json({ message: "Deletado com sucesso!" });
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Falha ao deletar seção", error });
    }
  }

  async index(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const secoes = await Departamento.findAll({
      include: [
        {
          model: Section,
          as: "secoes",

          include: [
            {
              model: Form,
              as: "formularios",
            },
          ],
        },
      ],
    });

    return response.json(secoes);
  }
}

export default new SectionsController();
