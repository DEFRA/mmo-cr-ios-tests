import { BaseCatchRecordPage } from './baseCatchRecordPage.ts';
import { logStep } from '../common/logger.ts';

export class TripTodayPage extends BaseCatchRecordPage {
    protected override pageId = 'tripToday';

    get questionHeading() {
        return $('~Did your trip start and finish today?');
    }

    get yesOptionText() {
        return $("~Select yes if you're recording today's trip now.");
    }

    get noOptionText() {
        return $(
            "~Select no if you're recording a trip from another day — you'll then enter the dates.",
        );
    }

    get radioGroup() {
        return $('~CatchRecord.tripToday.radioGroup');
    }

    get yesOption() {
        return $('~CatchRecord.tripToday.option.yes');
    }

    get noOption() {
        return $('~CatchRecord.tripToday.option.no');
    }
    get validationError() {
        return $('~CatchRecord.tripToday.error');
    }

    async selectTripToday(option: 'yes' | 'no') {
        logStep('selectTripToday with option: ' + option);
        const selectedOption = option === 'yes' ? this.yesOption : this.noOption;

        await selectedOption.click();
    }
}

export default new TripTodayPage();
