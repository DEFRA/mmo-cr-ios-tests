import { BaseCatchRecordPage } from './baseCatchRecordPage.ts';
import { logStep } from '../common/logger.ts';
import AddPortPage from './addPortPage.ts';
import TripDateDeparturePage from './tripDateDeparturePage.ts';

export class TripTodayPage extends BaseCatchRecordPage {
    protected override pageId = 'tripToday';

    get questionHeading() {
        return $('~Did your trip start and finish today?');
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
    async selectTripToday(option: 'yes' | 'no') {
        logStep('selectTripToday with option: ' + option);
        const selectedOption = option === 'yes' ? this.yesOption : this.noOption;

        await selectedOption.click();
        const nextPageHeading =
            option === 'yes' ? AddPortPage.heading : TripDateDeparturePage.heading;
        await nextPageHeading.waitForDisplayed();
    }
}

export default new TripTodayPage();
