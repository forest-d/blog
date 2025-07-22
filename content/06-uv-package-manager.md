Title: uv
Date: 2025-07-22 17:27
Category: General
Tags: python, uv
Slug: uv-package-manager
Author: Forest Dussault
Summary: Solving our Python dependency management woes

I've been using Python for over a decade, cycling through [`virtualenv`](https://virtualenv.pypa.io/), [`pip-tools`](https://pip-tools.rtfd.io/), [`poetry`](https://python-poetry.org/), [`conda`](https://conda.io/) (then [`mamba`](https://mamba.readthedocs.io/)), and probably some others I'm forgetting. Each promised to solve Python's packaging complexity, but these were all tools I had to fight against (I'm looking at you `conda`).

Thankfully, we now have [`uv`](https://docs.astral.sh/uv/). We've adopted it at my workplace, transitioning our major repos from `poetry`. The process was seamless, and our CI build systems are now substantially faster. I've also been adopting it for all of my personal projects.

**Migration caveat**: When transitioning from `poetry` to `uv`, be aware that the dependency solvers use different resolution logic. Even with identical pinned package versions in your `pyproject.toml`, the resulting lockfiles will contain different transitive dependencies. This can introduce subtle bugs or behavioral changes, so testing is essential during migration.

## Mass adoption

The large scale adoption of `uv` by Python devs is not surprising, it is simply better than the alternatives. Virtual env creation package installations feel nearly instantaneous. This isn't incremental improvement — it's a total shift in how Python development feels.

When creating a virtual environment drops from 30 seconds to under a second, you start using them differently.

The `uv run` command is wonderfully wasteful. Spin up a disposable Python interpreter, then throw it away when you're done. `uv run --with requests script.py` creates an isolated environment, installs the package, runs your code, and discards everything—all faster than manually activating and installation dependencies in a traditional venv.

## Examples

Starting a new project with `uv` is easy. If you'd like to follow along, get `uv` on your system with `curl -LsSf https://astral.sh/uv/install.sh | sh`.

First, the disposable environment pattern changes how you approach one-off tasks:

```bash
# pull up the aws s3 cp commands help menu
uv run --with awscli aws s3 cp help
```

Creating new projects around uv is easy and the de facto way I'll be setting up my projects in the future.

```bash
# Initialize a new project
uv init my-project
cd my-project

# Add (grouped) dependencies directly to pyproject.toml
uv add requests polars
uv add --dev pytest black

# Run your code with all dependencies available
uv run main.py
```

The generated `pyproject.toml` is clean and standard:

```toml
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "polars>=1.31.0",
    "requests>=2.32.4",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

For existing projects, `uv` provides a drop-in replacement for `pip`. This is useful for migrating legacy projects:

```bash
# Normal pip workflow
pip install -r requirements.txt

# uv equivalent (10-100x faster)
uv pip install -r requirements.txt
```

