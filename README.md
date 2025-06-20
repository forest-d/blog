# Forest's Blog

This repository contains my personal blog powered by Pelican and hosted on GitHub Pages.

## Managing Blog Posts

### Creating a New Post

To create a new blog post, use the `new-post` command in the `Justfile`:

```
just new-post "Your Post Title" "Category"
```

This will create a new Markdown file in the `content` directory with the proper frontmatter. The category parameter is optional and defaults to "General".

### Publishing to GitHub Pages

To publish a post to GitHub Pages, run the following:

```
just github
```

This command will:
1. Generate the site
2. Pull the latest changes from the repository
3. Push the generated content to the `gh-pages` branch
4. Configure the custom domain (if set in the `Justfile`)

## How Publishing Works

The blog uses GitHub Pages for hosting with the following workflow:

1. Content is written in Markdown in the `content` directory
2. Pelican converts the Markdown to HTML
3. The `just github` command uses `ghp-import` to push the generated HTML to the `gh-pages` branch
4. GitHub Pages serves the content from the `gh-pages` branch

## Customizing the Theme

This blog uses a customized version of the [Cid theme](https://github.com/hdra/Pelican-Cid). To customize the theme futher:

1. Modify the theme settings in `pelicanconf.py`
2. Theme templates are located in `themes/cid/templates/`
3. CSS styling can be modified in `themes/cid/static/css/`
4. To change social links or contact information, update the `CONTACTS` and `CONTACT_EMAIL` variables in `pelicanconf.py`

For more advanced theme customization, you can modify the templates directly to change the layout and appearance of the blog.
