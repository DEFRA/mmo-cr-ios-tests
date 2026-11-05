import { BaseCatchRecordPage } from './baseCatchRecordPage.ts';
import { logStep } from '../common/logger.ts';

export class SubmissionNudgePage extends BaseCatchRecordPage {
    protected override pageId = 'submissionNudge';

    get submissionWindowMessage() {
        return $('~Catch records must be submitted within 24 hours of a trip ending.');
    }

    get checkDateLink() {
        return $('~CatchRecord.submissionNudge.checkDateLink');
    }
    async checkTripEndDate() {
        logStep('checkTripEndDate');
        await this.checkDateLink.click();
    }
}

export default new SubmissionNudgePage();
