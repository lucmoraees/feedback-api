"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackService = void 0;
class SubmitFeedbackService {
    constructor(feedbacksRepository, mailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        if (!type) {
            throw new Error('Type is required!');
        }
        if (!comment) {
            throw new Error('Comment is required!');
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format!');
        }
        const subject = 'Novo feedback!';
        const body = [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            screenshot ? `<img src="${screenshot}" />` : '',
            `</div style="font">`,
        ].join('\n');
        await this.mailAdapter.sendMail({ subject, body });
    }
    ;
}
exports.SubmitFeedbackService = SubmitFeedbackService;
;
exports.default = SubmitFeedbackService;
