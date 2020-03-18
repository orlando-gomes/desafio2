import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      street_name: Yup.string().required(),
      house_number: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      postal_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const emailExists = await Recipient.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const recipient = await Recipient.create(req.body);

    const {
      id,
      name,
      email,
      street_name,
      house_number,
      complement,
      city,
      state,
      postal_code,
    } = recipient;

    return res.json({
      id,
      name,
      email,
      street_name,
      house_number,
      complement,
      city,
      state,
      postal_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      street_name: Yup.string().required(),
      house_number: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      postal_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const emailExists = await Recipient.findOne({
      where: { email: req.body.email },
    });

    if (emailExists && recipient.email !== emailExists.email) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const {
      id,
      name,
      email,
      street_name,
      house_number,
      complement,
      city,
      state,
      postal_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      email,
      street_name,
      house_number,
      complement,
      city,
      state,
      postal_code,
    });
  }
}

export default new RecipientController();
