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

Whenever Git needs to save a change, it records the contents, calculates a hash from those contents, and uses that hash as the object’s identity. From that point on, the object is treated as immutable. If the contents change, Git creates a new object instead of modifying the old one.

This means the identity of an object is derived entirely from what it contains. The same contents always map to the same hash, and any change produces a completely different one. This gives Git a reliable way to tell whether two pieces of data are identical or not.

This is what people mean when they describe Git as a content-addressed database. Data isn’t stored under a filename or an incremental ID but stored under a key that is generated directly from the data itself. When Git needs data like a file, it doesn't look up where it lives instead, it recomputes the hash and uses that value to retrieve the exact object it needs.

Once I understood this, it enabled me to conitue building the system.

## The Building Blocks Behind Every Commit

Once the storage model clicked, the next question became obvious: what exactly is Git storing?

It turns out Git builds everything on top of just three object types: blobs, trees, and commits. Every file, folder, and snapshot in a repository is represented using some combination of these objects.

### Blobs: File Contents, Nothing More

A blob represents the contents of a file. It doesn’t store the filename, the path, or any metadata about where the file lives in your project.

When Git saves a file, it hashes the contents and stores the resulting blob. If two files happen to have identical contents, Git will store them once and reference the same blob from multiple places.

This explains why Git can be so efficient with storage: it never stores duplicate data unless the content actually changes.

### Trees: How Git Represents Directories

If blobs store file contents, trees are what give those blobs structure.

A tree object represents a directory. It contains entries that map names (like filenames or folder names) to other objects — either blobs or other trees. This is how Git represents a full directory hierarchy without storing files directly inside folders.

Each tree is also hashed based on its contents. If the structure of a directory changes like a file is added, removed, or renamed, then Git creates a new tree object to represent that change.

### Commits: Snapshots with History

Commits are the objects we interact with most, but they’re surprisingly small. A commit doesn’t store file contents or diffs, instead they point to a single tree object, which is a snapshot of the project at that moment in time. Commits also store metadata like author, timestamp, and commit message.

This means every commit represents a complete snapshot of the repository, built entirely from references to existing objects.

## Seeing the Whole Picture

Once you put these pieces together, Git’s internal model becomes much easier to visualise.

A commit points to a tree.
That tree points to blobs and other trees.
Those blobs store file contents.

![Git Object Graph](/objects-example-removebg-preview.png)

In this example, a commit points to a tree that represents the project root. That tree contains references to blobs (the actual file contents) and other trees (subdirectories), forming a complete snapshot of the repository at that moment in time.

## Why Branches and History Are So Lightweight

This model also explains why some of Git’s most powerful features feel almost effortless.

As a branch is not a copy of your code, it’s just a name that points to a commit meaning a new pointer is created but not more duplication. Switching branches simply moves that pointer and updates the working directory to match the tree behind it. This allows developers to quickly iterate and develop features in isolation without worrying about storage overhead.

History, is just a chain of commits pointing to one another. Git doesn’t reconstruct old versions by applying patches — it already has the full snapshot stored and ready to be checked out.

## Why This Design Matters

Understanding how Git stores data makes it easier to debug unexpected behaviour and reason about history and branching.

More importantly, it changed how I think about tools I use every day. There's a real difference between knowing how to use something and understanding how it works.

## Conclusion

If you use Git daily, even a shallow understanding of its internals can make you more confident and effective when things go wrong.

Check out the [full implementation on GitHub](https://github.com/H-Lapa/Java-Git) to explore the code and try it yourself!

## Resources

- [What is in that .git directory?](https://blog.meain.io/2023/what-is-in-dot-git/)
- [Git Internals - Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)
- [CodeCrafters Git Challenge](https://codecrafters.io/challenges/git)

