---
title: REKT code
date: 2021-04-26
tags: methodology, code-quality
layout: ~/layouts/TldrPost.astro
---

I have a few key indicators that I follow when writing or reviewing code in order
to make sure its quality is acceptable:

- Being **Readable** is in my opinion the most important factor. Code is meant
  to be read and understood by humans before computers (they can often figure
  it out anyways) and to achieve this it has to be a pleasant experience: it
  should be well spaced out, use descriptive variable and function names, be
  organized in logical units split across a well thought out file tree, use
  comments where it makes sense, etc. Readable code is maintainable code.
- Quality code should be **Expressive**: it does what it looks to be doing. It
  might sound like this is the same thing as readability but here we are more
  concerned about the fact that the programmer's intent shows through the code
  without the need to resort to comments to explain what they want to achieve.
- The code should also be **Kept simple** because being simple means it will be
  easy to pick up on it a few weeks or month later and easier for devs of all
  levels to understand. To keep it simple it should not rely on numerous
  complex abstractions for the sake of having some. Classes and modules should
  keep a small and specific API surface, functions should operate on a small
  number of parameters, etc.
- Finally, it should remain **on Topic** which is a way of saying that it
  should do what it is expected to do and nothing more. This is an application
  of the [YAGNI][yagni] (You Aren't Gonna Need It) principle which dictactes
  that you should not implement things ahead of time and focus on what is asked
  at a given moment. I think that this principle pairs well with the fact that
  code should be **tested** to ensure that it does what it is asked to do. When
  reviewing code the topic is easy to define as it is most commonly the
  story/task/issue/bug you are working on, so the code should address that and
  nothing else (i.e. do not commit a huge Prettier reformatting of the code
  base in the same PR where you are fixing a bug!).

Yes, that makes REKT as an acronym and yes I find it mildly funny 😄

[yagni]: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it
