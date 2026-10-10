// Values come from the app's stubbed providers and UI-test seams (DEFRA/mmo-cr-ios)

export const credentials = {
  email: 'skipper@example.com',
  password: 'hunter2'
}

export const vessel = 'ACHILLES'

export const port = 'Newlyn'

export const gear = {
  id: 'sx',
  name: 'Seine nets (not specified)',
  searchTerm: 'Seine nets',
  meshSize: '80',
  timesShot: '5'
}

export const subArea = { searchTerm: '27D8', code: '27D86' }

export const species = {
  cod: 'Atlantic cod (COD)',
  bass: 'Seabass (BSS)',
  herring: 'Atlantic herring (HER)'
}

// Matches the `CheckYourAnswers` seed in UITestRootView.swift
export const seededDraft = {
  vessel: 'ACHILLES',
  port: 'Plymouth',
  statisticalArea: '27.7.e',
  gear: 'Seine nets (not specified)',
  meshSize: '80',
  species: 'Atlantic cod (COD)',
  weightCaught: '250 kg',
  weightNotLanded: '5 kg'
}

// Matches `StubAccountProvider`
export const account = {
  firstName: 'James',
  lastName: 'Wilson',
  address: 'Harbour View House, The Quay, Peterhead, AB42 1BY',
  email: 'james.wilson@company.co.uk',
  contactNumber: '07700 900123'
}

// Species identifiers in the app are the lower-cased species name
export const speciesKey = (name) => name.toLowerCase()
