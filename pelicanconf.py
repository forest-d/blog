AUTHOR = 'Forest Dussault'
SITENAME = "Forest's Blog"
SITEURL = ""

PATH = "content"

TIMEZONE = 'America/Toronto'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    # ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    # ("You can add links in your config file", "#"),
)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
THEME = "/home/forest/pelican-themes/cid"

STATIC_PATHS = ['images', 'extra']
EXTRA_PATH_METADATA = {
    'extra/CNAME': {'path': 'CNAME'},
}