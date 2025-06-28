Title: repo2llm
Date: 2025-03-18 22:01
Category: Software
Tags: python, llm, claude, chatgpt, cursor, ai
Slug: repo2llm
Author: Forest Dussault
Summary: Brief overview of my tool repo2llm

```text
UPDATE 2025-06-28

This is already hilariously out of date after only a few months. I've since moved on to using Claude Code and JetBrains' Cursor ripoff.
```

A few months back I hacked together [repo2llm](https://github.com/forest-d/repo2llm), a `pip` package that allows 
users to copy directory contents to their clipboard. It's built specifically for passing along context from coding 
projects to an LLM like Claude or ChatGPT (typically through their respective web UIs).

I wrote the tool for my own sake. I found myself copying the contents of coding projects into Claude frequently, 
and I was getting tired of going through the motions of collecting all the necessary context for my question(s). Now, 
by writing `repo2llm .` into my terminal, I'm able to grab all the files in the project in a structured manner and 
paste them into Claude's generous context window. This works great for relatively small projects,

When constructing the contents for the user's clipboard, files are tagged according to their location in the repo. 
For example, here's the abbreviated output from `repo2llm ./content` in the source code for this blog:

```text
<file name="01-first-post.md">
...
</file>

<file name="02-using-zwift-with-a-peloton.md">
...
</file>

<file name="03-repo2llm.md">
...
</file>

<file name="images/__init__.py">
...
</file>
```

I also built in some sensible defaults for ignoring files and directories, e.g. Python venvs, `.git/`, `node_modules/`, 
and so on. These can be easily overridden if needed via a `.repo2llm` config file placed in the working directory.

## Cursor et. al

Yes, there are many, many alternatives to this tool. Indeed, I use [Cursor](https://www.cursor.com/en) myself 
occasionally. However, I still find myself reaching for my own tool for several reasons:

1. It's very easy to collect exactly the context I need
2. I like using Claude's web UI, and this tool works well with it
3. It feels good to make use of something you've built yourself

That said, it's clear that AI assisted coding is becoming more sophisticated every day. I fully 
expect `repo2llm` to become obsolete for me within the year. Personally, I'm hoping JetBrains is able to get their 
[AI IDE product](https://www.jetbrains.com/ai/) on a level comparable with Cursor - it's not even close right now. 
PyCharm is my favourite IDE, though it's woefully behind in terms of AI integration as of writing.