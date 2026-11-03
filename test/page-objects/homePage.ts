import { BasePage } from './basePage.ts';
import { logStep } from '../common/logger.ts';

export class HomePage extends BasePage {
    get catchRecordsHeading() {
        return $('~Your catch records');
    }

    get webServiceNote() {
        return $('~To edit trips or manage your account settings, use the web service.');
    }

    get tripEndDateHeader() {
        return $('~Trip end date');
    }

    get vesselHeader() {
        return $('~Vessel');
    }

    get statusHeader() {
        return $('~Status');
    }

    get createdByHeader() {
        return $('~Created by');
    }

    get pagination() {
        return $('~Pagination');
    }

    get currentPage() {
        return $('~Home.pagination.page.1');
    }

    get paginationSummary() {
        return $('~Home.pagination.showing');
    }

    get howToRecordLink() {
        return $('~Home.howToRecord');
    }

    get whatYouNeedToDoHeading() {
        return $('~What you need to do');
    }

    get statusHelpLink() {
        return $('~Home.statusHelp');
    }

    get unsentStatusDescription() {
        return $('~Saved on your device and not yet submitted.');
    }

    get createRecordButton() {
        return $('~Home.createRecordButton');
    }

    get warningBox() {
        return $('~Home.warningBox');
    }

    get contactDefraLink() {
        return $('~Contact Defra');
    }

    get tripsScrollView() {
        return $('//XCUIElementTypeScrollView');
    }

    tableRowDate(rowIndex: number) {
        return $(`~Home.table.row.${String(rowIndex)}.date`);
    }

    tableRowVessel(rowIndex: number, vessel: string) {
        return $(
            `(//XCUIElementTypeStaticText[@name="${vessel}" and @value="${vessel}"])[${String(rowIndex + 1)}]`,
        );
    }

    tableRowStatus(rowIndex: number, status: string) {
        return $(
            `(//XCUIElementTypeStaticText[@name="${status}" and @value="${status}"])[${String(rowIndex + 1)}]`,
        );
    }

    tableRowCreatedBy(rowIndex: number, createdBy: string) {
        return $(
            `(//XCUIElementTypeStaticText[@name="${createdBy}" and @value="${createdBy}"])[${String(rowIndex + 1)}]`,
        );
    }

    async openTrip(rowIndex: number) {
        logStep('openTrip');
        await this.tableRowDate(rowIndex).click();
    }

    async openHowToRecord() {
        logStep('openHowToRecord');
        await this.howToRecordLink.click();
    }

    async openStatusHelp() {
        logStep('openStatusHelp');
        await this.statusHelpLink.click();
    }

    async clickCreateRecordButton() {
        logStep('clickCreateRecordButton');
        await this.scrollAndClickIfExisting(this.createRecordButton);
    }

    async goToNotifications() {
        logStep('goToNotifications');
        await this.notificationsTab.click();
    }

    async goToSettings() {
        logStep('goToSettings');
        await this.settingsTab.click();
    }

    async switchToWelsh() {
        logStep('switchToWelsh');
        await this.languageToggle.click();
    }
}

export default new HomePage();
