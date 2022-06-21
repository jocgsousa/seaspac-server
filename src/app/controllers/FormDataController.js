// import * as Yup from "yup";
// import User from "../models/User";
import Section from "../models/Section";
import FormData from "../models/FormData";
import Departamento from "../models/Departamento";

class FormDataController {
  async store(request, response) {
    const isSection = await Section.findByPk(request.body.fk_section_id);
    const isDep = await Departamento.findByPk(request.body.fk_dep_id);

    if (!isDep) {
      return response.status(400).json({ error: "Setor não encontrado" });
    }

    if (!isSection) {
      return response.status(400).json({ message: "Seção não existe" });
    }

    try {
      const form = await FormData.create(request.body);
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
    const form = await FormData.findOne({
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
    const isForm = await FormData.findByPk(request.params.id);

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
    const formuario = await FormData.findByPk(request.params.id);
    if (!formuario) {
      return response
        .status(400)
        .json({ message: "Este formulário não existe" });
    }
    return response.json(formuario);
  }
}

export default new FormDataController();
