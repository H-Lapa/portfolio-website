---
title: "Building Git from Scratch in Java"
date: "2024-12-26"
category: "Tutorial"
description: "A deep dive into Git's internals by implementing core Git commands in Java, from object storage to tree structures."
githubUrl: "https://github.com/H-Lapa/Java-Git"
---

# Building Git from Scratch in Java

Have you ever wondered how Git actually works under the hood? What happens when you run `git commit` or `git clone`? To truly understand Git's elegant design, I decided to build a minimalistic implementation of Git's core commands in Java.

## Why Build Your Own Git?

Learning by doing is powerful. While reading about Git's internals helps, nothing compares to implementing them yourself. This project taught me:

1. **How version control really works** - Understanding the three-object model
2. **Cryptographic hashing** - SHA-1 for content addressing
3. **Data structures** - Trees, directed acyclic graphs, and object storage
4. **File compression** - Efficient storage mechanisms
5. **Java fundamentals** - File I/O, process handling, and Maven

## The Architecture of Git

Before diving into implementation, it's crucial to understand Git's core concepts:

### The Three Object Types

Git stores everything as objects in the `.git/objects` directory:

1. **Blobs** - Store file contents
2. **Trees** - Store directory structures and references to blobs
3. **Commits** - Store metadata, tree references, and parent commits

### Content-Addressable Storage

Git uses SHA-1 hashing to create unique identifiers for every object. This means:
- Identical content always has the same hash
- Content is deduplicated automatically
- Data integrity is guaranteed (any change produces a different hash)

## Implemented Commands

### 1. `init` - Creating the Repository Structure

The first step in any Git workflow is initialization. This command creates the `.git` directory structure:

```bash
java-git init
```

**What it does:**
- Creates `.git/objects/` directory for storing blobs, trees, and commits
- Creates `.git/refs/` for branch references
- Sets up the basic repository structure

**Key learning:** Git is just a sophisticated file system. Everything lives in `.git/`.

### 2. `hash-object` - Creating Blob Objects

This command takes file content, generates a SHA-1 hash, and stores it as a blob:

```bash
java-git hash-object myfile.txt
```

**Implementation highlights:**
- Read file contents
- Create a blob object with header: `blob <size>\0<content>`
- Generate SHA-1 hash of the blob
- Compress using zlib/deflate
- Store in `.git/objects/ab/cdef123...` (first 2 chars = directory, rest = filename)

**Key learning:** Git doesn't store diffs initially—it stores complete snapshots. Diffs are computed on-the-fly.

### 3. `cat-file` - Retrieving Objects

The inverse of `hash-object`, this reads and decompresses stored objects:

```bash
java-git cat-file -p <hash>
```

**What it does:**
- Takes a SHA-1 hash
- Locates the object in `.git/objects/`
- Decompresses the content
- Prints the blob content

**Implementation challenge:** Handling zlib decompression in Java and parsing the object header correctly.

### 4. `ls-tree` - Listing Tree Contents

Trees store directory structures. This command lists what's inside a tree object:

```bash
java-git ls-tree <tree-hash>
```

**Tree object format:**
```
<mode> <type> <hash>\t<name>
100644 blob abc123... file.txt
040000 tree def456... src/
```

**Key learning:** Trees reference other trees (subdirectories) and blobs (files), creating a hierarchical structure.

### 5. `write-tree` - Creating Tree Objects

This command recursively converts a directory structure into tree objects:

```bash
java-git write-tree
```

**Algorithm:**
1. Scan current directory
2. For each file: create/retrieve blob hash
3. For each subdirectory: recursively call `write-tree`
4. Create tree object with all entries
5. Return tree hash

**This is where Git's efficiency shines:** Unchanged files reuse existing blob hashes, so only modified content is stored.

### 6. `commit-tree` - Creating Commits

Commits tie everything together with metadata:

```bash
java-git commit-tree <tree-hash> -p <parent-hash> -m "Commit message"
```

**Commit object structure:**
```
tree <tree-hash>
parent <parent-hash>
author Name <email> <timestamp>
committer Name <email> <timestamp>

Commit message goes here
```

**Key learning:** Commits are just pointers to trees, with parent references forming a directed acyclic graph (DAG).

### 7. `clone` - Simulating Repository Cloning

The most complex command, simulating the cloning of a remote repository:

```bash
java-git clone <url>
```

**Implementation:**
- Fetch remote repository data
- Recreate `.git` directory structure
- Download and store all objects
- Checkout the working directory

**This demonstrates:** How distributed version control works—you get the entire history, not just the latest snapshot.

## Technical Implementation Details

### Maven Project Structure

The project uses Maven for dependency management:

```xml
<project>
  <groupId>com.example</groupId>
  <artifactId>java-git</artifactId>
  <version>1.0-SNAPSHOT</version>

  <dependencies>
    <!-- For SHA-1 hashing -->
    <dependency>
      <groupId>commons-codec</groupId>
      <artifactId>commons-codec</artifactId>
    </dependency>
  </dependencies>
</project>
```

### SHA-1 Hashing in Java

Using Java's MessageDigest for content hashing:

```java
import java.security.MessageDigest;

public static String generateSHA1(byte[] content) {
    try {
        MessageDigest digest = MessageDigest.getInstance("SHA-1");
        byte[] hash = digest.digest(content);

        // Convert to hex string
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}
```

### File Compression

Git uses zlib compression. In Java, we use DeflaterOutputStream:

```java
import java.util.zip.DeflaterOutputStream;

public static byte[] compress(byte[] data) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    try (DeflaterOutputStream dos = new DeflaterOutputStream(baos)) {
        dos.write(data);
    }
    return baos.toByteArray();
}
```

### Object Storage Pattern

Storing objects in Git's two-character directory structure:

```java
public static void storeObject(String hash, byte[] content) {
    String dir = ".git/objects/" + hash.substring(0, 2);
    String file = hash.substring(2);

    new File(dir).mkdirs();
    Files.write(Paths.get(dir, file), compress(content));
}
```

## Challenges Encountered

### 1. Understanding Object Formats

Git's object format is deceivingly simple but has nuances:
- Blob header: `blob <size>\0`
- Tree entries: Specific binary format with modes
- Null byte separators in various places

**Solution:** Carefully reading Git's documentation and using `git cat-file -p` to inspect real Git objects.

### 2. File Path Handling

Cross-platform path handling was tricky:
- Windows uses `\`, Unix uses `/`
- Git always uses `/` internally

**Solution:** Always normalize paths when creating tree objects.

### 3. Recursive Tree Writing

Writing trees recursively while avoiding infinite loops:

**Solution:** Track visited directories and ensure deterministic ordering.

### 4. SHA-1 Hash Formatting

Getting the exact byte sequence that Git uses for hashing:

**Solution:** Include the object header (`blob 123\0`) before hashing, not just the content.

## Key Insights About Git

### 1. Git is a Content-Addressable Filesystem

Everything is stored by its hash. This makes Git:
- **Immutable** - Can't change content without changing the hash
- **Distributed** - Easy to sync by comparing hashes
- **Efficient** - Automatic deduplication

### 2. Commits Are Cheap

Creating a commit is just:
- Writing a small commit object (~200 bytes)
- No copying of files
- No diff computation (that's for display only)

### 3. Branches Are Just Pointers

A branch is literally a file in `.git/refs/heads/` containing a commit hash. That's it.

### 4. The Working Directory is Separate

Git's object database is completely separate from your working files. Commands like `git checkout` just copy from the database to your working directory.

## Performance Considerations

### What This Implementation Lacks

Real Git has many optimizations not in this educational version:

1. **Pack files** - Git bundles objects for efficient network transfer
2. **Delta compression** - Storing only diffs between similar objects
3. **Index/staging area** - The `.git/index` file for fast status checks
4. **Parallel operations** - Git uses multiple threads for operations
5. **Smart protocol** - Efficient client-server communication

### What We Got Right

- **Content-addressable storage** - Same as real Git
- **Three-object model** - Blobs, trees, commits
- **SHA-1 hashing** - Identical to Git's approach
- **Directory structure** - Compatible with Git's layout

## Testing the Implementation

You can test the implementation by:

```bash
# Initialize a repository
./your_git.sh init

# Create a blob
echo "Hello, Git!" > test.txt
./your_git.sh hash-object test.txt

# Read it back
./your_git.sh cat-file -p <hash>

# Create a tree
./your_git.sh write-tree

# Create a commit
./your_git.sh commit-tree <tree-hash> -m "Initial commit"
```

## What I Learned

### Technical Skills

1. **File I/O in Java** - Reading, writing, compression
2. **Cryptographic hashing** - SHA-1 implementation
3. **Data structures** - Trees and DAGs in practice
4. **Maven** - Project management and builds
5. **Shell scripting** - Wrapper scripts for ease of use

### Conceptual Understanding

1. **Version control is simpler than it seems** - It's just content-addressed storage with metadata
2. **Hashing is powerful** - Content addressing solves many problems elegantly
3. **Immutability matters** - Git's design relies on objects never changing
4. **Abstractions hide complexity** - Commands like `git commit` do a lot behind the scenes

### Software Engineering

1. **Read the source** - Git's C source code was invaluable
2. **Test incrementally** - Build one command at a time
3. **Use the real thing as reference** - Compare output with actual Git
4. **Start simple** - Implement core features before optimizations

## Future Enhancements

If I continue this project, potential additions:

1. **Pack files** - Implement Git's optimization for storage
2. **Index/staging area** - Add `git add` functionality
3. **Branches** - Implement refs and HEAD
4. **Merge** - Three-way merge algorithm
5. **Remote operations** - Real `push` and `pull`
6. **Diff algorithm** - Myers diff or histogram diff
7. **Garbage collection** - Clean up unreachable objects

## Conclusion

Building a Git implementation from scratch was one of the most educational projects I've undertaken. It demystified version control and showed me that even complex systems are built on simple, elegant foundations.

Git's design is beautiful:
- **Simple object model** - Just three types
- **Content addressing** - Automatic deduplication and integrity
- **Immutability** - Objects never change
- **Efficiency** - Only store what changes

If you want to truly understand a tool, try building it yourself. The insights you gain are worth far more than just reading documentation.

**Key Takeaways:**
- Git is a content-addressable filesystem with VCS features
- Everything is an object: blobs, trees, or commits
- SHA-1 hashing provides unique identifiers and integrity
- Branches are just pointers to commits
- The working directory is separate from Git's object database

Check out the [full implementation on GitHub](https://github.com/H-Lapa/Java-Git) to explore the code and try it yourself!

## Resources

For further learning:
- [Git Internals - Git Book](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
- [Git from the Bottom Up](https://jwiegley.github.io/git-from-the-bottom-up/)
- [Git Source Code](https://github.com/git/git)
