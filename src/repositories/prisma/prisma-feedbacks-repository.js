"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFeedbacksRepository = void 0;
const prisma_1 = require("../../prisma");
class PrismaFeedbacksRepository {
    async create(data) {
        const { type, comment, screenshot } = data;
        const feedback = await prisma_1.prisma.feedback.create({
            data: { type, comment, screenshot }
        });
    }
    ;
}
exports.PrismaFeedbacksRepository = PrismaFeedbacksRepository;
