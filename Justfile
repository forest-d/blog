# Variables
PELICAN := "pelican"
PELICAN_OPTS := ""
BASEDIR := justfile_directory()
INPUTDIR := BASEDIR + "/content"
OUTPUTDIR := BASEDIR + "/output"
CONFFILE := BASEDIR + "/pelicanconf.py"
PUBLISHCONF := BASEDIR + "/publishconf.py"
GITHUB_PAGES_BRANCH := "gh-pages"
GITHUB_PAGES_COMMIT_MESSAGE := "Generate Pelican site"
CNAME := "forestdussault.com"

# Default recipe (this will run when you just type 'just')
default:
    @just --list

# Generate using production settings
publish:
    {{PELICAN}} "{{INPUTDIR}}" -o "{{OUTPUTDIR}}" -s "{{PUBLISHCONF}}" {{PELICAN_OPTS}}

# Remove the generated files
clean:
    rm -rf "{{OUTPUTDIR}}"

# Upload the website via gh-pages
github: publish
    git pull
    ghp-import -m "{{GITHUB_PAGES_COMMIT_MESSAGE}}" -b {{GITHUB_PAGES_BRANCH}} "{{OUTPUTDIR}}" --no-jekyll --cname="{{CNAME}}"
    git push origin {{GITHUB_PAGES_BRANCH}}

# Create a new blog post with a template
new-post title category="General":
    #!/bin/sh
    slug=$(echo "{{title}}" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
    date=$(date '+%Y-%m-%d %H:%M')
    file_path="{{INPUTDIR}}/${slug}.md"

    if [ -f "$file_path" ]; then
        echo "Error: File $file_path already exists!"
        exit 1
    fi

    echo "Title: {{title}}" > "$file_path"
    echo "Date: $date" >> "$file_path"
    echo "Category: {{category}}" >> "$file_path"
    echo "Tags: " >> "$file_path"
    echo "Slug: $slug" >> "$file_path"
    echo "Author: Forest Dussault" >> "$file_path"
    echo "Summary: " >> "$file_path"
    echo "" >> "$file_path"
    echo "Write your blog post content here." >> "$file_path"

    echo "Created new blog post: $file_path"