import { $ } from '@wdio/globals'

export const byId = (id) => $(`~${id}`)

// Input labels reuse their field's identifier, so match the text field type explicitly
export const textFieldById = (id) =>
  $(
    `-ios predicate string:type == "XCUIElementTypeTextField" AND name == "${id}"`
  )

export const byIdPrefix = (prefix) =>
  $(`-ios predicate string:name BEGINSWITH "${prefix}"`)

export const byText = (text) =>
  $(
    `-ios predicate string:type == "XCUIElementTypeStaticText" AND label == "${text}"`
  )

export const byButtonText = (text) =>
  $(
    `-ios predicate string:type == "XCUIElementTypeButton" AND label == "${text}"`
  )

export const firstTextField = () =>
  $('-ios class chain:**/XCUIElementTypeTextField')

// Tab items are found by label: SwiftUI doesn't pass custom identifiers to UITabBarButton
export const tabBarButton = (label) =>
  $(
    `-ios class chain:**/XCUIElementTypeTabBar/**/XCUIElementTypeButton[\`label == "${label}"\`]`
  )
