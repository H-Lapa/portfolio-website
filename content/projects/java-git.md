---
title: "Java-Git: Git Implementation in Java"
description: "A minimalistic implementation of Git's core commands in Java to understand version control internals."
image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop"
tags: ["Java", "Git", "Version Control", "Maven"]
githubUrl: "https://github.com/H-Lapa/Java-Git"
blogPostSlug: "building-git-in-java"
---

# Java-Git: Git Implementation in Java

A hands-on educational project implementing Git's core functionality from scratch in Java. This project demonstrates how version control systems work by recreating essential Git commands and understanding the elegant design of content-addressable storage.

## Overview

Java-Git is a minimalistic Git implementation that simulates core Git operations to demystify version control internals. By building Git from the ground up, this project explores cryptographic hashing, tree data structures, and the three-object model that powers modern version control.

## Tech Stack

### Core Technologies
- **Java** (97.8% of codebase)
- **Maven** for dependency management and builds
- **SHA-1** cryptographic hashing algorithm
- **Zlib** compression for object storage
- **Bash** for wrapper scripts

### Key Libraries
- **java.security.MessageDigest** for SHA-1 hashing
- **java.util.zip** for compression/decompression
- **java.nio.file** for file system operations
- **Apache Commons Codec** for encoding utilities

## Core Features

### 1. Repository Initialization

**Command:** `init`

Creates the `.git` directory structure with:
- `objects/` directory for blob, tree, and commit storage
- `refs/` directory for branch references
- Basic repository configuration

```bash
java-git init
```

Mimics `git init` by setting up the foundational file structure.

### 2. Object Hashing and Storage

**Command:** `hash-object`

Implements Git's content-addressable storage:
- Reads file content
- Generates SHA-1 hash
- Creates blob object with proper header
- Compresses and stores in `.git/objects/`

```bash
java-git hash-object myfile.txt
# Output: abc123def456... (SHA-1 hash)
```

### 3. Object Retrieval

**Command:** `cat-file`

Retrieves and displays stored Git objects:
- Locates object by SHA-1 hash
- Decompresses content
- Parses object header
- Displays blob contents

```bash
java-git cat-file -p abc123def456
```

### 4. Tree Operations

**Command:** `ls-tree`

Lists contents of tree objects showing directory structures:

```bash
java-git ls-tree <tree-hash>
# Output:
# 100644 blob abc123... file.txt
# 040000 tree def456... src/
```

**Command:** `write-tree`

Recursively converts directories into tree objects:
- Scans current directory
- Creates blobs for files
- Creates trees for subdirectories
- Generates tree object with all entries

### 5. Commit Creation

**Command:** `commit-tree`

Creates commit objects linking trees with metadata:

```bash
java-git commit-tree <tree-hash> -p <parent-hash> -m "Initial commit"
```

Generates commit objects containing:
- Tree reference
- Parent commit(s)
- Author and committer information
- Timestamp
- Commit message

### 6. Repository Cloning

**Command:** `clone`

Simulates cloning a remote repository:
- Fetches repository data
- Recreates `.git` structure
- Downloads all objects
- Checks out working directory

## Architecture & Design

### The Three-Object Model

Git stores everything as one of three object types:

1. **Blob Objects**
   - Store file contents
   - Format: `blob <size>\0<content>`
   - Identified by SHA-1 hash of content

2. **Tree Objects**
   - Store directory structures
   - Reference blobs (files) and other trees (subdirectories)
   - Format: `<mode> <type> <hash>\t<name>`

3. **Commit Objects**
   - Store metadata and references
   - Point to a tree (snapshot)
   - Reference parent commits
   - Form a directed acyclic graph (DAG)

### Content-Addressable Storage

Every object is stored by its SHA-1 hash:
- First 2 characters: subdirectory name
- Remaining 38 characters: filename
- Example: `ab/cdef123456789...`

This provides:
- **Automatic deduplication** - Identical content = same hash
- **Data integrity** - Any modification changes the hash
- **Distributed sync** - Easy to compare by hashes

### File Compression

All objects are compressed using zlib/deflate:
- Reduces storage space
- Maintains compatibility with Git's format
- Transparent decompression on read

## Implementation Highlights

### SHA-1 Hash Generation

```java
public static String generateSHA1(byte[] content) {
    MessageDigest digest = MessageDigest.getInstance("SHA-1");
    byte[] hash = digest.digest(content);
    return bytesToHex(hash);
}
```

### Object Storage Pattern

```java
public static void storeObject(String hash, byte[] content) {
    String dir = ".git/objects/" + hash.substring(0, 2);
    String file = hash.substring(2);

    Files.createDirectories(Paths.get(dir));
    Files.write(Paths.get(dir, file), compress(content));
}
```

### Tree Building Algorithm

```java
public static String writeTree(Path directory) {
    List<TreeEntry> entries = new ArrayList<>();

    // Add files as blobs
    for (File file : directory.toFile().listFiles()) {
        if (file.isFile()) {
            String hash = hashObject(file);
            entries.add(new TreeEntry("100644", "blob", hash, file.getName()));
        }
    }

    // Add subdirectories as trees (recursive)
    for (File dir : directory.toFile().listFiles()) {
        if (dir.isDirectory() && !dir.getName().equals(".git")) {
            String treeHash = writeTree(dir.toPath());
            entries.add(new TreeEntry("040000", "tree", treeHash, dir.getName()));
        }
    }

    // Create and store tree object
    return createTreeObject(entries);
}
```

## Key Technical Challenges

### 1. Object Format Compatibility

**Challenge:** Git's object format has specific binary structures

**Solution:**
- Studied Git's source code
- Used `git cat-file -p` to inspect real objects
- Implemented exact header formats and null byte separators

### 2. Cross-Platform Paths

**Challenge:** Windows uses `\`, Unix uses `/`, Git uses `/` internally

**Solution:**
- Normalize all paths to forward slashes
- Handle path separators consistently

### 3. Recursive Tree Generation

**Challenge:** Building trees recursively without infinite loops

**Solution:**
- Track visited directories
- Deterministic ordering of entries
- Proper `.git` directory exclusion

### 4. Compression/Decompression

**Challenge:** Matching Git's exact compression format

**Solution:**
- Used Java's DeflaterOutputStream/InflaterInputStream
- Tested against real Git objects for compatibility

## What This Demonstrates

### Version Control Fundamentals

- **Snapshots, not diffs** - Git stores complete content, computes diffs on-the-fly
- **Content addressing** - Files identified by hash, not name
- **Immutability** - Objects never change once created
- **Graph structures** - Commits form a DAG of history

### Software Engineering Practices

- **Incremental development** - Built one command at a time
- **Testing against reference** - Compared with real Git output
- **Documentation** - Clear code structure and comments
- **Build automation** - Maven for dependency management

### Java Proficiency

- File I/O operations
- Cryptographic hashing
- Data compression
- Process handling
- Maven project structure

## Performance Considerations

### What's Missing from Real Git

This educational implementation doesn't include:
- **Pack files** - Bundled objects for efficient transfer
- **Delta compression** - Storing only diffs between similar objects
- **Index/staging area** - `.git/index` for fast status
- **Parallel processing** - Multi-threaded operations
- **Network protocols** - Smart HTTP/SSH protocols

### What's Accurate

- Content-addressable storage model
- Three-object type system
- SHA-1 hashing algorithm
- Object compression format
- Directory structure layout

## Learning Outcomes

### Technical Knowledge

1. How Git stores data internally
2. Content-addressable storage systems
3. Cryptographic hashing applications
4. Tree data structure implementation
5. File compression techniques

### Conceptual Understanding

1. Version control is content addressing + metadata
2. Immutability enables distributed systems
3. Simple primitives create powerful abstractions
4. Performance optimizations vs. core functionality

## Testing the Implementation

```bash
# Initialize repository
./your_git.sh init

# Create and hash a file
echo "Hello, Git!" > test.txt
HASH=$(./your_git.sh hash-object test.txt)

# Retrieve the content
./your_git.sh cat-file -p $HASH

# Create a tree from current directory
TREE=$(./your_git.sh write-tree)

# Create a commit
./your_git.sh commit-tree $TREE -m "First commit"
```

## Future Enhancements

Potential additions to expand the project:

- **Staging area** - Implement `git add` and index
- **Branches** - Reference management and HEAD
- **Merge operations** - Three-way merge algorithm
- **Pack files** - Optimize storage with delta compression
- **Remote operations** - Network protocols for push/pull
- **Diff implementation** - Myers or histogram diff algorithms
- **Garbage collection** - Clean up unreachable objects

## Technologies Used

- **Java**: Core programming language
- **Maven**: Build automation and dependency management
- **SHA-1**: Cryptographic hashing
- **Zlib**: Data compression
- **Bash**: Shell scripting for CLI wrapper
- **Git**: Reference implementation for testing

## Conclusion

Java-Git demonstrates that even complex systems like Git are built on simple, elegant foundations. By implementing Git from scratch, this project reveals the power of content-addressable storage and the three-object model that makes distributed version control possible.

The project serves as both an educational tool for understanding Git internals and a practical demonstration of implementing cryptographic hashing, tree data structures, and file system operations in Java.

**Key Insights:**
- Git is a content-addressable filesystem with VCS features
- Everything is stored as blobs, trees, or commits
- SHA-1 hashing provides integrity and deduplication
- Immutable objects enable distributed operations
- Simple design principles create powerful tools
