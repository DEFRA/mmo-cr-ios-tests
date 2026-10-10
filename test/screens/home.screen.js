import { byId } from '#support/selectors.js'

class HomeScreen {
  get warningBox() {
    return byId('Home.warningBox')
  }

  get createRecordButton() {
    return byId('Home.createRecordButton')
  }

  get howToRecord() {
    return byId('Home.howToRecord')
  }

  get statusHelp() {
    return byId('Home.statusHelp')
  }

  get paginationPrevious() {
    return byId('Home.pagination.previous')
  }

  get paginationNext() {
    return byId('Home.pagination.next')
  }

  paginationPage(number) {
    return byId(`Home.pagination.page.${number}`)
  }

  rowDate(index) {
    return byId(`Home.table.row.${index}.date`)
  }

  async createRecord() {
    await this.createRecordButton.click()
  }
}

export default new HomeScreen()
