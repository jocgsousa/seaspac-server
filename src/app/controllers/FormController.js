import * as Yup from "yup";
import User from "../models/User";
import Section from "../models/Section";
import Form from "../models/Form";
import Departamento from "../models/Departamento";

class FormController {
  async store(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const isSection = await Section.findByPk(request.body.fk_section_id);
    const isDep = await Departamento.findByPk(request.body.fk_dep_id);
    const form = await Form.findOne({
      where: {
        title: request.body.title,
        fk_section_id: request.body.fk_section_id,
        fk_dep_id: request.body.fk_dep_id,
      },
    });

    if (!isSection || !isDep) {
      return response
        .status(400)
        .json({ message: "Falha ao registrar formulário!" });
    }

    if (form) {
      return response
        .status(400)
        .json({ error: "Já existe um formulário como mesmo título!" });
    }

    try {
      const form = await Form.create(request.body);
      return response.json({
        message: "Formulário registrado com sucesso!",
        form,
      });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Falha ao registrar formulário!", error });
    }
  }

  async update(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const form = await Form.findOne({
      where: {
        fk_dep_id: request.body.fk_dep_id,
        fk_section_id: request.body.fk_section_id,
        id: request.params.id,
      },
    });

    if (!form) {
      return response.status(400).json({ error: "Formulário não existe!" });
    }

    try {
      const formulario = await form.update(request.body);
      return response.json({
        message: "Formulário atualizado com sucesso!",
        formulario,
      });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Falha ao atualizar formulário!", error });
    }
  }

  async delete(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const isForm = await Form.findByPk(request.params.id);

    if (!isForm) {
      return response.status(400).json({ error: "Formulário não existe!" });
    }

    try {
      const formulario = await isForm.destroy();
      return response.json({
        message: "Formulário deletado com sucesso!",
        formulario,
      });
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Falha ao deletar formulário", error });
    }
  }

  async index(request, response) {
    const isRoot = await User.findByPk(request.userId);
    if (!isRoot) {
      return response.status(400).json({ error: "Operação não autorizada!" });
    }

    const formuario = await Form.findByPk(request.params.id);
    if (!formuario) {
      return response
        .status(400)
        .json({ message: "Este formulário não existe" });
    }
    return response.json(formuario);
  }
}

export default new FormController();
