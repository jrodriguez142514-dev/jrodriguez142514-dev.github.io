# Browser Storage

JavaScript can access the browser's storage mechanism. This is how various websites know you are logged in, and why sometimes you have to clear your `cookies`. Let's try using the browser storage in this challenge.

Let's create a website using HTML/CSS/JS. This website will greet you if you have visited before. Otherwise, it will ask you for your name and greet you with subsequent requests.

For example, Jessica visits your page and has not visited it before. The website presents her a form to fill in her name. After she fills it in, the website says "Hello Jessica!". When she subsequently visits again, the website will say "Hello Jessica!" every time.

## Release 0 - Pseudocode
Think through the process of how you'd solve this before diving in. Maybe it looks something like this:
```
if i have their name
  render their name
if i don't have their name
  ask for their name
  render their name
```

## Release 1 - Code
When you code this locally, bring in an external JS file into the HTML file instead of putting it directly into the HTML file.

Some things to think through and to guide your development:
* Do you have their name already in local storage?
* What would my function look like in JS to render their name?
* How would I set their name if they didn't have one?
