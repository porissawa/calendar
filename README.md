# Calendar

To run it locally, first clone the repo and navigate to its folder.\
You most likely already have a .env file (sent by me) with the REACT_APP_WEATHER_API_KEY variable. If you do not, let me know and I'll email it to you.\
Copy this .env file to the root of the project. It's important to do it before running `yarn start`, otherwise you'll have to kill the process and run it again so the app recognizes its new environment variables.

With that out of the way, here's a list of commands you can run:
### `yarn start`

Will run the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

---
### Considerations
- Using Redux might have been overkill for such a small project.
- Weather info is only available for the next five days after today. In a future iteration I might consider adding historic data to it.
- Deleting all reminders for a given day hasn't been implemented at the time.