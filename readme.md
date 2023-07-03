## TODO

- Authentication

  - Password reset
  - Mail verification
  - Third party access (google)

- Settings page

  - Some (possible) extra information to display in the Polar Account Info card: last synced on,
  - Make a request to the Pull notification endpoint, so that the user can be notified that they have pending exercises to sync
  - Add user preferences
    - Allow users to pick their preferred units for measuring distance, weight and height

- Polar integration

  - Set a webhook to receive new activities from users
  - Sync account button, that will fetch the activities of the user again
  - Fetch the GPX data from the exercises
  - Register when we did the last sync in the database

- Polar API

  - Only the exercises that were uploaded to Flow after the user has been registered to your client will be available!

- API utils

  - Add unit tests!

- Next steps
  - Create a model for the runs fetched from the Polar integration
  - Save all runs in the db
  - Adapt the data to the run model
    - Should change the location prop to name, so that I can create some names for the runs that were fetched by the PolarApi
    - Users will also be able to update the run details, even the Polar ones, so they give better names if they wanted
  - Adapt the home page to render the information of both runs
