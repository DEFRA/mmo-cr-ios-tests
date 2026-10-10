#!/bin/sh
# Builds the iOS app for the simulator into ./apps/record-catch.app (requires Xcode).
# Usage: ./bin/build-simulator-app.sh [branch]   (default: main)

set -e

BRANCH="${1:-main}"
SRC_DIR="${IOS_REPO_DIR:-$PWD/.ios-app-src}"
BUILD_DIR="$PWD/.ios-app-build"
APP_DIR="$PWD/apps"

if [ -d "$SRC_DIR/.git" ]; then
  git -C "$SRC_DIR" fetch -q --depth 1 origin "$BRANCH"
  git -C "$SRC_DIR" checkout -q FETCH_HEAD
else
  git clone -q --depth 1 --branch "$BRANCH" https://github.com/DEFRA/mmo-cr-ios.git "$SRC_DIR"
fi

xcodebuild \
  -project "$SRC_DIR/record-catch.xcodeproj" \
  -scheme record-catch \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath "$BUILD_DIR" \
  CODE_SIGNING_ALLOWED=NO \
  build -quiet

mkdir -p "$APP_DIR"
rm -rf "$APP_DIR/record-catch.app"
cp -R "$BUILD_DIR/Build/Products/Debug-iphonesimulator/record-catch.app" "$APP_DIR/"
echo "Built $APP_DIR/record-catch.app from mmo-cr-ios@$BRANCH"
