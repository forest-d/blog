AUTHOR = "Forest Dussault"
SITENAME = "Forest's Blog"
SITEURL = ""

PATH = "content"

TIMEZONE = "America/Toronto"

DEFAULT_LANG = "en"

FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Contact links for the footer
CONTACTS = (
    ('LinkedIn', 'https://linkedin.com/in/forest-dussault'),
    ('GitHub', 'https://github.com/forest-d'),
    ('ORCID', 'https://orcid.org/0000-0002-6883-1308'),
)

# Email address for the footer
CONTACT_EMAIL = "forestdussault@gmail.com"

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
THEME = "themes/cid"

STATIC_PATHS = ["images"]

# Markdown extensions for syntax highlighting
MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
    },
    'output_format': 'html5',
}
