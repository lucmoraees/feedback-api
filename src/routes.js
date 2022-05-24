"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail-adapter");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
const submit_feedback_service_1 = __importDefault(require("./services/submit-feedback-service"));
const routes = (0, express_1.Router)();
routes.post('/feedbacks', async (req, res) => {
    const prismaFeedbacksRepository = new prisma_feedbacks_repository_1.PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
    const submitFeedbackService = new submit_feedback_service_1.default(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackService.execute(req.body);
    return res.status(201).send();
});
exports.default = routes;
