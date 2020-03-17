import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schemaEmail = Yup.object().shape({
      email: Yup.string()
        .required()
        .email(),
    });

    const schemaPassword = Yup.object().shape({
      password: Yup.string().required(),
    });

    if (!(await schemaEmail.isValid(req.body))) {
      return res.status(400).json({ error: 'Email validation fails' });
    }
    if (!(await schemaPassword.isValid(req.body))) {
      return res.status(400).json({ error: 'Password validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const token = jwt.sign({ id: user.id }, auth.secret, {
      expiresIn: auth.expiresIn,
    });

    const { id, name } = user;

    return res.json({ userData: { id, name, email }, token });
  }
}

export default new SessionController();
