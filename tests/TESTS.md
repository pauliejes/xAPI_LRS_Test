To add new tests, add to features/statements.feature or write new features. For any new steps, put them in lib/library.js (there's likely some reasonable planning that could be done around this to clean up writing new steps) or create a new library file (make sure to require it in spec/features.spec.js if you do). Non-gherkin tests can be added as new spec files if desired (note the choices in library.js needed to make them run both in browser and in node).

If you want to run it in the browser, just open SpecRunner.html. If you want to change the endpoint being tested, for right now that's done in source (we'll likely add an in-browser override at some point). You'll either need to edit library.js and run 
```
browserify spec/features.spec.js -o bundle.js
```
or just edit that part of bundle.js directly (note: don't do this and then commit).

To run the tests in node, just run
```
npm test
```
