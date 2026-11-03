import { BaseCatchRecordPage } from './baseCatchRecordPage.ts';
import { logStep } from '../common/logger.ts';

export abstract class TripDatePage extends BaseCatchRecordPage {
    get datePicker() {
        if (!this.pageId) throw new Error('pageId not defined');
        return $(`~CatchRecord.${this.pageId}.picker`);
    }

    get monthPicker() {
        return this.datePicker.$('-ios class chain:**/XCUIElementTypePickerWheel[1]');
    }

    get dayPicker() {
        return this.datePicker.$('-ios class chain:**/XCUIElementTypePickerWheel[2]');
    }

    get yearPicker() {
        return this.datePicker.$('-ios class chain:**/XCUIElementTypePickerWheel[3]');
    }

    get validationError() {
        return $('~catchRecord.tripDate.validation.none');
    }

    protected async enterDate(day: string, monthName: string, year: string) {
        logStep(`date entry: ${day} ${monthName} ${year}`);
        await this.scrollToElementIfExisting(this.datePicker);
        await this.monthPicker.addValue(monthName);
        await this.dayPicker.addValue(parseInt(day, 10).toString());
        await this.yearPicker.addValue(year);
    }
}
