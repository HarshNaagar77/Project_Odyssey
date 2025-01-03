import express from 'express';
import { getInvoiceByParty } from '../controllers/Enteries/partInvoice.controller.js';

const EnteriesRouter = express.Router();

EnteriesRouter.get('/invoice', getInvoiceByParty);

export default EnteriesRouter;