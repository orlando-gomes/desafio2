import { Router } from 'express';

const routs = new Router();

routs.get('/', (req, res) => {
  return res.json({ msg: 'Hello world' });
});

export default routs;
