import SubmitFeedbackService from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submiteFeedback = new SubmitFeedbackService(
  {create: createFeedbackSpy},
  {sendMail: sendEmailSpy},
);

describe('submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submiteFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,test.png'
    })).resolves.not.toThrow();
  });

  it('should not be able to submit a feedback whithout type', async () => {
    await expect(submiteFeedback.execute({
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,test.png'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback whithout an invalid screenshot', async () => {
    await expect(submiteFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'test.png'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback whith comment', async () => {
    await expect(submiteFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,test.png'
    })).rejects.toThrow();
  });
});