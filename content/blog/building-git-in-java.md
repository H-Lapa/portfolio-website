---
title: "What building git taught me about version control"
date: "2024-12-26"
category: "TBD"
description: "A deep dive into Git's internals by implementing core Git commands in Java."
githubUrl: "https://github.com/H-Lapa/Java-Git"
---

# What building git taught me about version control
*4 Jan 2026*
*5 min read*

I thought I understood Git. I'd been using it for years, committing code on  GitHub or GitLab without much thought. Like most developers, I treated Git as a black box, relying on a few familiar commands like `git add`, `git commit`, `git push` and understanding basic branching strategies. 

But it wasn't until I built a Git implementation in Java that I realised how shallow my understand of Git's version control really was.

This project was motivated by a desire to better understand the tools I rely on daily and to learn what happens under the hood when running common Git commands.


## Looking Past Git's Abstractions

Once I started looking past that abstraction, Git became much easier to reason about.

Whenever Git needs to save a change, it records the contents, calculates a hash from those contents, and uses that hash as the object’s identity. From that point on, the object is treated as immutable. If the contents change, Git creates a new object instead of modifying the old one.

This means the identity of an object is derived entirely from what it contains. The same contents always map to the same hash, and any change produces a completely different one. This gives Git a reliable way to tell whether two pieces of data are identical or not.

This is what people mean when they describe Git as a content-addressed database. Data isn’t stored under a filename or an incremental ID but stored under a key that is generated directly from the data itself. When Git needs data like a file, it look up where it lives instead it recomputes the hash and uses that value to retrieve the exact object it needs.

Once I understood this, Git stopped feeling like a collection of special cases and started to feel like a system with clear, predictable rules.

## The Building Blocks Behind Every Commit

Once the storage model clicked, the next question became obvious: what exactly is Git storing?

It turns out Git builds everything on top of just three object types: blobs, trees, and commits. Every file, folder, and snapshot in a repository is represented using some combination of these objects.

Understanding these objects is the point where Git’s behaviour starts to feel predictable rather than magical.

## Blobs: File Contents, Nothing More

A blob represents the contents of a file — and only the contents. It doesn’t store the filename, the path, or any metadata about where the file lives in your project.

When Git saves a file, it hashes the contents and stores the resulting blob. If two files happen to have identical contents, Git will store them once and reference the same blob from multiple places.

This explains why Git can be so efficient with storage: it never stores duplicate data unless the content actually changes.

📌 Diagram suggestion:
Blob object

Box labeled Blob

Attributes: content, hash

Explicitly note: no filename, no path

## Trees: How Git Represents Directories

If blobs store file contents, trees are what give those blobs structure.

A tree represents a directory. It contains entries that map names (like filenames or folder names) to other objects — either blobs or other trees. This is how Git represents a full directory hierarchy without storing files directly inside folders.

Each tree is also hashed based on its contents. If the structure of a directory changes — a file is added, removed, or renamed — Git creates a new tree object to represent that change.

📌 Diagram suggestion:
Tree object

Box labeled Tree

Entries:

src/ → tree

index.js → blob

Arrows pointing to blobs and subtrees

## Commits: Snapshots with History

Commits are the objects we interact with most, but they’re surprisingly small.

A commit doesn’t store file contents or diffs. Instead, it points to:

A single tree object (the snapshot of the project at that moment)

One or more parent commits

Metadata like author, timestamp, and commit message

This means every commit represents a complete snapshot of the repository, built entirely from references to existing objects.

📌 Diagram suggestion (important):
Commit object

Box labeled Commit

Attributes:

tree → tree hash

parent → commit hash

metadata

## Seeing the Whole Picture

Once you put these pieces together, Git’s internal model becomes much easier to visualise.

A commit points to a tree.
That tree points to blobs and other trees.
Those blobs store file contents.

Change a file, and Git creates a new blob.
That leads to a new tree.
Which leads to a new commit.

Everything else remains shared.

📌 Key diagram (centerpiece of the blog):
High-level Git object graph

Commit
  ↓
Tree
 ├── blob (file A)
 ├── blob (file B)
 └── tree
       └── blob (file C)


This single graph explains most of Git’s behaviour.

## Why Branches and History Are So Lightweight

This model also explains why some of Git’s most powerful features feel almost effortless.

A branch isn’t a copy of your code. It’s just a name that points to a commit. Creating a new branch means writing a new pointer, not duplicating any data. Switching branches simply moves that pointer and updates the working directory to match the tree behind it.

History, too, is just a chain of commits pointing to one another. Git doesn’t reconstruct old versions by applying patches — it already has the full snapshot stored and ready to be checked out.

📌 Diagram suggestion:
Two branches pointing at different commits

main → commit A

feature → commit B

Shared history behind both


## Why This Design Matters

Rebuilding Git forced me to stop thinking in terms of commands and start thinking in terms of data. Once I did, many of Git’s quirks stopped feeling confusing.

Understanding how Git stores data makes it easier to:

Debug unexpected behaviour

Reason about history and branching

Trust that Git won’t silently corrupt your work

Appreciate why Git scales so well across teams and projects

More importantly, it changed how I think about tools I use every day. There’s a real difference between knowing how to use something and understanding how it works.

## Conclusion

Building a Git implementation in Java pushed me to look past the abstractions and understand the system underneath. Git turned out not to be magic at all — just a well-designed model built on simple, composable ideas.

If you use Git daily, even a shallow understanding of its internals can make you more confident and effective when things go wrong.

If you’re curious, you can explore the full implementation here:
👉 Java Git implementation on GitHub



Check out the [full implementation on GitHub](https://github.com/H-Lapa/Java-Git) to explore the code and try it yourself!

## Resources

For further learning:
- [What is in that .git directory?](https://blog.meain.io/2023/what-is-in-dot-git/)
- [Git Internals - Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)
- [CodeCrafters Git Challenge](https://codecrafters.io/challenges/git)

