import { Router, Request, Response } from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import SubmitFeedbackService from './services/submit-feedback-service';

const routes = Router();

routes.post('/feedbacks', async (req: Request, res: Response) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  
  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter);

  await submitFeedbackService.execute(req.body);

  return res.status(201).send();
})

export default routes;
