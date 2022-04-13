# Text Blog

Basic blog structure including Header, Posts, and Footer sections defined in `index.html` styled with CSS.

Post content is located under the `posts/` directory as individual, separate posts defined in JSON.

From GitHub Actions, the JS script converts the JSON content to HTML chunks and pushes this content to the deploy branch `gh-pages`. From this push, the automated Pages build action is triggered to deploy a new version of the Pages site.
