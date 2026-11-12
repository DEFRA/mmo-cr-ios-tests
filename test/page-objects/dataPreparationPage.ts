import { BasePage } from './basePage.ts';
import { logStep } from '../common/logger.ts';

export class DataPreparationPage extends BasePage {
    get heading() {
        return $('~DataPreparation.heading');
    }

    get error() {
        return $('~DataPreparation.error');
    }

    get retryButton() {
        return $('~DataPreparation.retry');
    }

    get signOutButton() {
        return $('~DataPreparation.signOut');
    }

    async tryAgain() {
        logStep('tryAgain');
        await this.retryButton.click();
    }

    async signOut() {
        logStep('signOut');
        await this.signOutButton.click();
    }
}

export default new DataPreparationPage();
