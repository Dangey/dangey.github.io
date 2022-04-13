# Text Blog

Basic blog structure including Header, Posts, and Footer sections defined in `index.html` styled with CSS.

Post content is located under the `posts/` directory as individual, separate posts defined in JSON.

From GitHub Actions, the JS script converts the JSON content to HTML chunks and pushes this content to the deploy branch `gh-pages`. From this push, the automated Pages build action is triggered to deploy a new version of the Pages site.

## Actions workflow `.github/workflows/prebuild-site.yml`
- uses `actions/checkout` with `fetch-depth: 0` to pull a local copy of the repo onto the runner.
- then, `github/super-linter` validates the JSON, our "posts".
- once the linter passes with no errors, use `actions/github-script` to execute our script `build-posts-script.js`.
- again, using `github/super-linter` - but to validate our HTML file as our JS script made changes to it.
- lastly, execute multiple `git` commands to push the changed HTML file to our deploy branch, `gh-pages`:
  - post data is up-to-date on the `main` branch, so our prior `actions/checkout` checked out `main` - meaning our change executed by the JS script was done on the main branch.
  - since we want to push this change to our deploy branch, we stash the change and pop it after checking out the `gh-pages` branch.
  - from there, we add, commit, and push the change to the remote branch.

## JS Script `build-posts-script.js`
- uses `fs` module to read/write file content.
- flow:
  - lists out files of `posts/` directory.
  - iterate over all files in directory, for each file:
    - reading in the file content
    - parsing that read-in JSON
    - generating a string of HTML from the file content
    - appending string to single string variable
  - once for-loop completes, read in content from existing HTML file.
  - replace new HTML content with placeholder comment `<!--POSTS-->` in existing file content.
  - write `index.html` file replacing existing one with a new file including the posts content HTML.

## Sample JSON config for post
##### Line breaks are indicated by `\\n` where they are replaced with `<br>` to format a single line break
```
{
  "post": true,
  "date": "April 1st, 2022",
  "title": "Act 1: Chapter 1",
  "body": "It all began some time ago. . .\\n\\n And now it is over -FIN-"
}
```
