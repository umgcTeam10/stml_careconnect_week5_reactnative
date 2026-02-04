# CareConnect (Week 5, React Native)

Week 5 React Native implementation of CareConnect for SWEN 661. This repo rebuilds the Week 4 Flutter app in **React Native (Expo) with TypeScript**, using **Jest** and **React Native Testing Library** for testing and coverage.

Repo: https://github.com/umgcTeam10/stml_careconnect_week5_reactnative

---

## Project Overview

This React Native version implements the CareConnect UI screens based on the provided mockups, with a simple onboarding flow and a bottom tab navigation matching the mock:

- Onboarding flow: Welcome → Role → Login  
- Main tabs: Home, Tasks, Calendar, Messages, Profile  
- Health Logs is treated as a secondary screen (not a tab)

We are using mock data only, there is no backend for Week 5.

---

## Prerequisites

Install these before running the project:

- Node.js (LTS recommended)
- npm (comes with Node)
- Git
- Expo Go (optional, for running on a physical phone)
  - iOS App Store or Google Play Store

Optional but helpful:
- Android Studio (Android emulator)
- Xcode (iOS simulator, macOS only)

---

## Getting Started

1) Clone the repo
```bash
git clone https://github.com/umgcTeam10/stml_careconnect_week5_reactnative.git
cd stml_careconnect_week5_reactnative/careconnect-week5-rn

2) Install dependencies
npm install

3) Run the app

Start Expo:

npm start


Then choose one of the following:

Run on Web: press w in the terminal

Run on Android emulator: press a

Run on iOS simulator (macOS only): press i

Run on your phone:

open Expo Go

scan the QR code shown by Expo

Testing
Run all tests
npm test

Run coverage report
npm test -- --coverage


Coverage output is generated in the coverage/ folder. If you want to view the HTML report:

Open coverage/lcov-report/index.html in a browser

Git Workflow and Branching Rules

We use two long-lived branches:

main is the source of truth

no feature work should be done directly on main

develop is the active integration branch

all feature branches start from develop

completed work is merged back into develop

Create a new feature branch (always from develop)
git checkout develop
git pull
git checkout -b feature/short-description


Examples:

feature/tasks-screen

feature/calendar-ui

feature/messages-screen

Keep your branch up to date
git checkout develop
git pull
git checkout feature/short-description
git merge develop

Push your branch
git push -u origin feature/short-description


Then open a Pull Request into develop.

Expectations for Contributions

If you own a screen, you also own the tests for that screen.

A good contribution typically includes:

screen UI implementation that matches the mock

testIDs and accessibility labels for key elements

basic tests for render and key interactions

all tests passing (npm test)

coverage maintained (npm test -- --coverage)

Common Commands

From careconnect-week5-rn/:

Install: npm install

Run: npm start

Tests: npm test

Coverage: npm test -- --coverage

Troubleshooting
Expo says it cannot start, or Metro bundler errors

Try clearing and restarting:

npx expo start -c

Tests fail due to cached Jest output

Try:

npx jest --clearCache
npm test

Team Coordination

Weekly timeline: Wednesday through Tuesday (11:59 PM).
We will coordinate screen ownership and progress updates during our team meeting.

