import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Boxes,
  Check,
  ChevronRight,
  Clipboard,
  Command,
  ExternalLink,
  FileClock,
  GitBranch,
  Github,
  GitMerge,
  GitPullRequest,
  History,
  ListChecks,
  Play,
  RefreshCcw,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
  Tag,
  Terminal,
  Trash2,
  UploadCloud,
} from "lucide-react";

const lessons = [
  {
    id: "setup",
    phase: "Start",
    title: "Install, Identify, and Inspect",
    icon: Command,
    level: "Beginner",
    minutes: 8,
    objective: "Prepare Git on your machine and make sure GitHub can identify your commits.",
    commands: [
      {
        command: "git --version",
        why: "Confirms Git is installed and available in your terminal.",
        tryIt: "git --version",
      },
      {
        command: 'git config --global user.name "Your Name"',
        why: "Sets the author name that appears on commits you create.",
        tryIt: 'git config --global user.name "Alex Rivera"',
      },
      {
        command: 'git config --global user.email "you@example.com"',
        why: "Use the same email verified on GitHub so commits connect to your account.",
        tryIt: 'git config --global user.email "alex@example.com"',
      },
      {
        command: "git config --global --list",
        why: "Reviews the global settings Git will use outside a single repository.",
        tryIt: "git config --global --list",
      },
    ],
    exercise: {
      prompt: "Show the configured global identity values.",
      answer: "git config --global --list",
      output: "user.name=Alex Rivera\nuser.email=alex@example.com\ninit.defaultbranch=main",
      hint: "Use the command that lists global configuration.",
    },
    github: "Create or sign in to your GitHub account. Add an SSH key or prepare to authenticate with GitHub CLI when pushing.",
  },
  {
    id: "init",
    phase: "Create",
    title: "Create a Local Repository",
    icon: Boxes,
    level: "Beginner",
    minutes: 10,
    objective: "Turn a project folder into a Git repository and understand the working tree.",
    commands: [
      {
        command: "git init",
        why: "Creates the hidden .git database that stores history.",
        tryIt: "git init",
      },
      {
        command: "git status",
        why: "Shows untracked, modified, staged, and branch state. Use it constantly.",
        tryIt: "git status",
      },
      {
        command: "git add README.md",
        why: "Moves a file from the working tree into the staging area.",
        tryIt: "git add README.md",
      },
      {
        command: 'git commit -m "Add project readme"',
        why: "Records the staged snapshot as a permanent commit.",
        tryIt: 'git commit -m "Add project readme"',
      },
    ],
    exercise: {
      prompt: "Stage every changed file in the current folder.",
      answer: "git add .",
      output: "Changes staged for commit.",
      hint: "Use add with the current directory path.",
    },
    github: "Most GitHub repositories use README.md as the first visible project page.",
  },
  {
    id: "history",
    phase: "Read",
    title: "Read History and Compare Work",
    icon: History,
    level: "Beginner",
    minutes: 12,
    objective: "Inspect commits before changing shared history or pushing to GitHub.",
    commands: [
      {
        command: "git log --oneline --graph --decorate",
        why: "Displays compact history with branch labels and merge shape.",
        tryIt: "git log --oneline --graph --decorate",
      },
      {
        command: "git diff",
        why: "Shows unstaged line-by-line edits.",
        tryIt: "git diff",
      },
      {
        command: "git diff --staged",
        why: "Shows what the next commit will contain.",
        tryIt: "git diff --staged",
      },
      {
        command: "git show HEAD",
        why: "Inspects the latest commit metadata and patch.",
        tryIt: "git show HEAD",
      },
    ],
    exercise: {
      prompt: "View the staged changes before committing.",
      answer: "git diff --staged",
      output: "diff --git a/README.md b/README.md\n+Project setup notes",
      hint: "Use diff with the staged flag.",
    },
    github: "GitHub’s commit pages show the same metadata and patches, but local inspection is faster.",
  },
  {
    id: "ignore",
    phase: "Shape",
    title: "Ignore Generated Files",
    icon: ShieldAlert,
    level: "Beginner",
    minutes: 7,
    objective: "Keep secrets, dependencies, logs, and build output out of your repository.",
    commands: [
      {
        command: "touch .gitignore",
        why: "Creates the ignore rules file in the repository root.",
        tryIt: "touch .gitignore",
      },
      {
        command: "git status --ignored",
        why: "Shows ignored files as well as tracked and untracked work.",
        tryIt: "git status --ignored",
      },
      {
        command: "git rm --cached .env",
        why: "Stops tracking a file without deleting it locally.",
        tryIt: "git rm --cached .env",
      },
      {
        command: 'git commit -m "Ignore local environment files"',
        why: "Records the ignore policy in history.",
        tryIt: 'git commit -m "Ignore local environment files"',
      },
    ],
    exercise: {
      prompt: "Stop tracking `.env` while keeping it on disk.",
      answer: "git rm --cached .env",
      output: "rm '.env'\n.env remains in your working directory.",
      hint: "Use rm with the cached flag.",
    },
    github: "Never push API keys to GitHub. If a secret was pushed, rotate it immediately.",
  },
  {
    id: "branches",
    phase: "Branch",
    title: "Branch for Isolated Work",
    icon: GitBranch,
    level: "Core",
    minutes: 13,
    objective: "Create topic branches so features and fixes stay reviewable.",
    commands: [
      {
        command: "git branch",
        why: "Lists local branches and marks the current branch.",
        tryIt: "git branch",
      },
      {
        command: "git switch -c feature/login",
        why: "Creates and checks out a new branch in one command.",
        tryIt: "git switch -c feature/login",
      },
      {
        command: "git switch main",
        why: "Moves back to the main branch.",
        tryIt: "git switch main",
      },
      {
        command: "git branch -d feature/login",
        why: "Deletes a fully merged local branch.",
        tryIt: "git branch -d feature/login",
      },
    ],
    exercise: {
      prompt: "Create and move onto a branch named `docs/git-guide`.",
      answer: "git switch -c docs/git-guide",
      output: "Switched to a new branch 'docs/git-guide'",
      hint: "Use switch with the create flag.",
    },
    github: "Push branches to GitHub when you want backup, CI, review, or a pull request.",
  },
  {
    id: "remote",
    phase: "Publish",
    title: "Connect to GitHub",
    icon: Github,
    level: "Core",
    minutes: 14,
    objective: "Link your local repository to a GitHub repository and publish commits.",
    commands: [
      {
        command: "git remote -v",
        why: "Lists remote repository names and URLs.",
        tryIt: "git remote -v",
      },
      {
        command: "git remote add origin git@github.com:USER/REPO.git",
        why: "Names your GitHub repository origin, the conventional default remote.",
        tryIt: "git remote add origin git@github.com:alex/git-practice.git",
      },
      {
        command: "git branch -M main",
        why: "Renames the current branch to main.",
        tryIt: "git branch -M main",
      },
      {
        command: "git push -u origin main",
        why: "Uploads main to GitHub and sets upstream tracking.",
        tryIt: "git push -u origin main",
      },
    ],
    exercise: {
      prompt: "Push the local `main` branch to GitHub and remember its upstream.",
      answer: "git push -u origin main",
      output: "branch 'main' set up to track 'origin/main'.",
      hint: "Use push with the upstream flag.",
    },
    github: "On github.com, create an empty repository first, then use its SSH or HTTPS URL as `origin`.",
  },
  {
    id: "sync",
    phase: "Sync",
    title: "Fetch, Pull, and Clone",
    icon: RefreshCcw,
    level: "Core",
    minutes: 12,
    objective: "Bring GitHub changes down safely and copy existing repositories.",
    commands: [
      {
        command: "git clone git@github.com:USER/REPO.git",
        why: "Downloads a repository and sets origin automatically.",
        tryIt: "git clone git@github.com:alex/git-practice.git",
      },
      {
        command: "git fetch origin",
        why: "Downloads remote updates without changing your local branch.",
        tryIt: "git fetch origin",
      },
      {
        command: "git pull",
        why: "Fetches and integrates the upstream branch into your current branch.",
        tryIt: "git pull",
      },
      {
        command: "git pull --rebase",
        why: "Replays local commits on top of new remote commits for linear history.",
        tryIt: "git pull --rebase",
      },
    ],
    exercise: {
      prompt: "Download remote updates without modifying your current files.",
      answer: "git fetch origin",
      output: "From github.com:alex/git-practice\n   a13fd3b..c48fe21  main -> origin/main",
      hint: "Fetch is the read-only remote update command.",
    },
    github: "Use clone when joining an existing GitHub project. Use fetch before deciding how to integrate remote changes.",
  },
  {
    id: "merge",
    phase: "Integrate",
    title: "Merge and Rebase Branches",
    icon: GitMerge,
    level: "Core",
    minutes: 16,
    objective: "Combine branch work while understanding merge commits and linear replay.",
    commands: [
      {
        command: "git merge feature/login",
        why: "Integrates another branch into your current branch.",
        tryIt: "git merge feature/login",
      },
      {
        command: "git rebase main",
        why: "Replays your current branch commits on top of main.",
        tryIt: "git rebase main",
      },
      {
        command: "git merge --abort",
        why: "Cancels an in-progress merge and returns to the pre-merge state.",
        tryIt: "git merge --abort",
      },
      {
        command: "git rebase --abort",
        why: "Cancels an in-progress rebase.",
        tryIt: "git rebase --abort",
      },
    ],
    exercise: {
      prompt: "Bring `main` into the current feature branch by replaying local commits.",
      answer: "git rebase main",
      output: "Successfully rebased and updated refs/heads/feature/login.",
      hint: "Use the command that rewrites your branch on top of another branch.",
    },
    github: "GitHub pull requests can be merged with merge commits, squash commits, or rebase merges depending on repository settings.",
  },
  {
    id: "conflicts",
    phase: "Repair",
    title: "Resolve Conflicts",
    icon: FileClock,
    level: "Core",
    minutes: 15,
    objective: "Fix files Git cannot combine automatically.",
    commands: [
      {
        command: "git status",
        why: "Identifies conflicted files and the operation in progress.",
        tryIt: "git status",
      },
      {
        command: "git diff --check",
        why: "Detects leftover conflict markers and whitespace problems.",
        tryIt: "git diff --check",
      },
      {
        command: "git add app.js",
        why: "Marks a conflict as resolved after you edit the file.",
        tryIt: "git add app.js",
      },
      {
        command: "git rebase --continue",
        why: "Continues a rebase after resolved files are staged.",
        tryIt: "git rebase --continue",
      },
    ],
    exercise: {
      prompt: "After editing a conflicted file named `README.md`, mark it resolved.",
      answer: "git add README.md",
      output: "README.md staged. Continue the merge or rebase.",
      hint: "Resolved conflicts are confirmed by staging the file.",
    },
    github: "GitHub shows conflict markers in web edits too, but local resolution is usually clearer for real projects.",
  },
  {
    id: "stash",
    phase: "Pause",
    title: "Stash Work in Progress",
    icon: Clipboard,
    level: "Intermediate",
    minutes: 9,
    objective: "Temporarily shelve local edits so you can switch tasks cleanly.",
    commands: [
      {
        command: 'git stash push -m "wip login form"',
        why: "Stores tracked local edits with a helpful label.",
        tryIt: 'git stash push -m "wip login form"',
      },
      {
        command: "git stash list",
        why: "Lists saved stashes.",
        tryIt: "git stash list",
      },
      {
        command: "git stash pop",
        why: "Applies the newest stash and removes it from the stash list.",
        tryIt: "git stash pop",
      },
      {
        command: "git stash apply stash@{1}",
        why: "Applies a specific stash while keeping it saved.",
        tryIt: "git stash apply stash@{1}",
      },
    ],
    exercise: {
      prompt: "Save current tracked edits with message `wip docs`.",
      answer: 'git stash push -m "wip docs"',
      output: "Saved working directory and index state On main: wip docs",
      hint: "Use stash push with a message.",
    },
    github: "Stashes are local only. Push a branch to GitHub when work must be shared or backed up remotely.",
  },
  {
    id: "undo",
    phase: "Undo",
    title: "Undo Safely",
    icon: RotateCcw,
    level: "Intermediate",
    minutes: 16,
    objective: "Choose the right undo command for unstaged, staged, committed, and shared work.",
    commands: [
      {
        command: "git restore app.js",
        why: "Discards unstaged changes in a file.",
        tryIt: "git restore app.js",
      },
      {
        command: "git restore --staged app.js",
        why: "Unstages a file while keeping edits in the working tree.",
        tryIt: "git restore --staged app.js",
      },
      {
        command: 'git commit --amend -m "Better message"',
        why: "Replaces the latest local commit with an amended one.",
        tryIt: 'git commit --amend -m "Better message"',
      },
      {
        command: "git revert HEAD",
        why: "Creates a new commit that undoes a shared commit without rewriting history.",
        tryIt: "git revert HEAD",
      },
    ],
    exercise: {
      prompt: "Unstage `index.html` but keep the file edits.",
      answer: "git restore --staged index.html",
      output: "index.html moved back to unstaged changes.",
      hint: "Use restore with the staged flag.",
    },
    github: "Prefer revert for commits already pushed to GitHub. Avoid force-pushing shared branches unless the team agrees.",
  },
  {
    id: "pr",
    phase: "Review",
    title: "Pull Request Workflow",
    icon: GitPullRequest,
    level: "Intermediate",
    minutes: 13,
    objective: "Publish a branch, open a pull request, respond to review, and update it.",
    commands: [
      {
        command: "git push -u origin feature/login",
        why: "Publishes a feature branch and sets its upstream.",
        tryIt: "git push -u origin feature/login",
      },
      {
        command: "gh pr create --web",
        why: "Opens GitHub’s pull request form from the terminal if GitHub CLI is installed.",
        tryIt: "gh pr create --web",
      },
      {
        command: "git commit --fixup HEAD~1",
        why: "Creates a fixup commit for later autosquash cleanup.",
        tryIt: "git commit --fixup HEAD~1",
      },
      {
        command: "git push",
        why: "Updates the pull request with new commits on the same branch.",
        tryIt: "git push",
      },
    ],
    exercise: {
      prompt: "Publish `feature/login` to GitHub and track it.",
      answer: "git push -u origin feature/login",
      output: "remote: Create a pull request for 'feature/login' on GitHub.",
      hint: "Push the branch to origin with upstream tracking.",
    },
    github: "A pull request is the normal GitHub destination for branch review, CI checks, comments, and final merge.",
  },
  {
    id: "tags",
    phase: "Release",
    title: "Tag Releases",
    icon: Tag,
    level: "Intermediate",
    minutes: 10,
    objective: "Mark important commits and publish release points to GitHub.",
    commands: [
      {
        command: 'git tag -a v1.0.0 -m "Release v1.0.0"',
        why: "Creates an annotated release tag on the current commit.",
        tryIt: 'git tag -a v1.0.0 -m "Release v1.0.0"',
      },
      {
        command: "git tag",
        why: "Lists local tags.",
        tryIt: "git tag",
      },
      {
        command: "git push origin v1.0.0",
        why: "Publishes one tag to GitHub.",
        tryIt: "git push origin v1.0.0",
      },
      {
        command: "git push origin --tags",
        why: "Publishes all local tags. Use intentionally.",
        tryIt: "git push origin --tags",
      },
    ],
    exercise: {
      prompt: "Create an annotated tag named `v1.0.0` with message `Release v1.0.0`.",
      answer: 'git tag -a v1.0.0 -m "Release v1.0.0"',
      output: "Tag v1.0.0 created locally.",
      hint: "Use tag with annotated and message flags.",
    },
    github: "GitHub can turn pushed tags into Releases with notes, assets, and changelogs.",
  },
  {
    id: "cleanup",
    phase: "Maintain",
    title: "Clean, Move, and Remove",
    icon: Trash2,
    level: "Intermediate",
    minutes: 11,
    objective: "Keep the repository tidy without accidentally deleting valuable work.",
    commands: [
      {
        command: "git mv old.md new.md",
        why: "Moves or renames a tracked file and stages the change.",
        tryIt: "git mv old.md new.md",
      },
      {
        command: "git rm unused.js",
        why: "Deletes a tracked file and stages the removal.",
        tryIt: "git rm unused.js",
      },
      {
        command: "git clean -n",
        why: "Previews untracked files that would be deleted.",
        tryIt: "git clean -n",
      },
      {
        command: "git clean -fd",
        why: "Deletes untracked files and directories after previewing.",
        tryIt: "git clean -fd",
      },
    ],
    exercise: {
      prompt: "Preview untracked files Git would delete without deleting them.",
      answer: "git clean -n",
      output: "Would remove dist/\nWould remove debug.log",
      hint: "Use clean in dry-run mode.",
    },
    github: "Generated output should usually be ignored, not committed, unless the repository intentionally publishes built artifacts.",
  },
  {
    id: "advanced",
    phase: "Investigate",
    title: "Find Bugs and Recover",
    icon: Search,
    level: "Advanced",
    minutes: 18,
    objective: "Use Git’s investigation tools to find regressions and recover lost references.",
    commands: [
      {
        command: "git blame app.js",
        why: "Shows the latest commit and author for each line.",
        tryIt: "git blame app.js",
      },
      {
        command: "git bisect start",
        why: "Begins a binary search through history to find a bad commit.",
        tryIt: "git bisect start",
      },
      {
        command: "git reflog",
        why: "Shows where branch tips and HEAD pointed recently, useful for recovery.",
        tryIt: "git reflog",
      },
      {
        command: "git cherry-pick a1b2c3d",
        why: "Applies one commit from another branch onto the current branch.",
        tryIt: "git cherry-pick a1b2c3d",
      },
    ],
    exercise: {
      prompt: "Show recent HEAD movements so you can recover a lost commit.",
      answer: "git reflog",
      output: "c48fe21 HEAD@{0}: reset: moving to HEAD~1\na13fd3b HEAD@{1}: commit: Add login form",
      hint: "Use the reference log command.",
    },
    github: "GitHub keeps pushed commits reachable through branches, pull requests, and tags, but reflog is local to your machine.",
  },
];

const commandFamilies = [
  { label: "Create", items: ["init", "clone", "add", "commit"] },
  { label: "Inspect", items: ["status", "log", "diff", "show", "blame"] },
  { label: "Branch", items: ["branch", "switch", "merge", "rebase"] },
  { label: "Remote", items: ["remote", "fetch", "pull", "push"] },
  { label: "Repair", items: ["restore", "revert", "stash", "reflog", "bisect"] },
  { label: "Release", items: ["tag", "clean", "rm", "mv"] },
];

const normalize = (value) => value.trim().replace(/\s+/g, " ");

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState(() => new Set());
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalResult, setTerminalResult] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState("");

  const activeLesson = lessons[activeIndex];
  const Icon = activeLesson.icon;
  const completedCount = completed.size;
  const progress = Math.round((completedCount / lessons.length) * 100);

  const commandCount = useMemo(
    () => lessons.reduce((total, lesson) => total + lesson.commands.length, 0),
    [],
  );

  const runExercise = () => {
    const isCorrect = normalize(terminalInput) === normalize(activeLesson.exercise.answer);
    setTerminalResult({
      ok: isCorrect,
      text: isCorrect
        ? activeLesson.exercise.output
        : `Not quite. ${activeLesson.exercise.hint}`,
    });
    if (isCorrect) {
      setCompleted((current) => new Set(current).add(activeLesson.id));
    }
  };

  const moveLesson = (direction) => {
    setActiveIndex((current) => {
      const next = Math.min(Math.max(current + direction, 0), lessons.length - 1);
      return next;
    });
    setTerminalInput("");
    setTerminalResult(null);
  };

  const copyCommand = async (command) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      window.setTimeout(() => setCopiedCommand(""), 1200);
    } catch {
      setCopiedCommand("");
    }
  };

  return (
    <div className="min-h-screen text-ink">
      <header className="border-b border-ink/15 bg-paper/90 backdrop-blur">
        <div className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-end lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-signal">
              <Github className="h-4 w-4" aria-hidden="true" />
              github.com destination workflow
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-none sm:text-5xl lg:text-6xl">
              Git Command Tutor
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-graphite sm:text-lg">
              A hands-on path from first repository to GitHub pull requests, releases,
              recovery, and day-to-day command fluency.
            </p>
          </div>
          <div className="space-y-3">
            <HeaderGraphic />
            <div className="grid grid-cols-3 overflow-hidden rounded border border-ink/20 bg-white/55 shadow-insetLine">
              <Metric value={lessons.length} label="lessons" />
              <Metric value={commandCount} label="commands" />
              <Metric value={`${progress}%`} label="complete" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[310px_minmax(0,1fr)_330px] lg:px-8">
        <aside className="h-fit rounded border border-ink/20 bg-white/65 shadow-rail lg:sticky lg:top-5">
          <div className="border-b border-ink/15 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-graphite/70">
                  Route
                </p>
                <h2 className="mt-1 font-display text-2xl">Command Map</h2>
              </div>
              <BookOpenCheck className="h-7 w-7 text-moss" aria-hidden="true" />
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-signal transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <nav className="max-h-[58vh] overflow-auto p-2 scrollbar-thin lg:max-h-[calc(100vh-230px)]">
            {lessons.map((lesson, index) => {
              const LessonIcon = lesson.icon;
              const isActive = index === activeIndex;
              const isDone = completed.has(lesson.id);
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setTerminalInput("");
                    setTerminalResult(null);
                  }}
                  className={`mb-1 flex w-full items-center gap-3 rounded px-3 py-3 text-left transition ${
                    isActive
                      ? "bg-ink text-paper"
                      : "hover:bg-ink/[0.08] text-graphite"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded border ${
                      isActive ? "border-paper/30 bg-paper/10" : "border-ink/15 bg-paper"
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-4 w-4 text-flax" aria-hidden="true" />
                    ) : (
                      <LessonIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{lesson.title}</span>
                    <span
                      className={`block text-xs ${
                        isActive ? "text-paper/65" : "text-graphite/60"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")} / {lesson.phase}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="overflow-hidden rounded border border-ink/20 bg-graphite text-paper shadow-rail">
            <div className="blueprint-lines border-b border-paper/10 p-5 sm:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-flax px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
                      {activeLesson.phase}
                    </span>
                    <span className="rounded border border-paper/20 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-paper/75">
                      {activeLesson.level}
                    </span>
                    <span className="rounded border border-paper/20 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-paper/75">
                      {activeLesson.minutes} min
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                    {activeLesson.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-paper/80">
                    {activeLesson.objective}
                  </p>
                </div>
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded border border-paper/20 bg-paper/10">
                  <Icon className="h-10 w-10 text-flax" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="grid border-b border-paper/10">
              <div className="p-5 sm:p-7">
                <div className="mb-4 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-flax" aria-hidden="true" />
                  <h3 className="font-display text-2xl">Command Steps</h3>
                </div>
                <div className="space-y-3">
                  {activeLesson.commands.map((item, index) => (
                    <CommandRow
                      key={item.command}
                      item={item}
                      index={index}
                      copied={copiedCommand === item.command}
                      onCopy={() => copyCommand(item.command)}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t border-paper/10 bg-ink/35 p-5 sm:p-7">
                <div className="mb-4 flex items-center gap-2">
                  <Play className="h-5 w-5 text-flax" aria-hidden="true" />
                  <h3 className="font-display text-2xl">Practice Terminal</h3>
                </div>
                <p className="text-sm leading-6 text-paper/75">{activeLesson.exercise.prompt}</p>
                <div className="mt-4 rounded border border-paper/15 bg-[#11110f] p-3 font-mono text-sm shadow-insetLine">
                  <label className="flex min-h-12 items-center gap-2">
                    <span className="text-moss">$</span>
                    <input
                      value={terminalInput}
                      onChange={(event) => setTerminalInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          runExercise();
                        }
                      }}
                      className="w-full bg-transparent text-paper outline-none placeholder:text-paper/35"
                      placeholder="type the command"
                      aria-label="Practice terminal command"
                    />
                  </label>
                  {terminalResult && (
                    <pre
                      className={`mt-3 whitespace-pre-wrap border-t border-paper/10 pt-3 text-xs leading-5 ${
                        terminalResult.ok ? "text-[#a7e3a2]" : "text-[#ffb199]"
                      }`}
                    >
                      {terminalResult.text}
                    </pre>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={runExercise}
                    className="inline-flex items-center gap-2 rounded bg-flax px-3 py-2 text-sm font-bold text-ink transition hover:bg-[#e5c56f]"
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    Run
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTerminalInput(activeLesson.exercise.answer);
                      setTerminalResult(null);
                    }}
                    className="inline-flex items-center gap-2 rounded border border-paper/20 px-3 py-2 text-sm font-bold text-paper transition hover:bg-paper/10"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Hint Fill
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-paper p-5 text-ink sm:p-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded border border-ink/15 bg-white">
                  <Github className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold">GitHub checkpoint</h3>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-graphite">
                    {activeLesson.github}
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-ink px-3 py-2 text-sm font-bold text-paper transition hover:bg-graphite"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                GitHub New Repo
              </a>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => moveLesson(-1)}
              disabled={activeIndex === 0}
              className="inline-flex items-center gap-2 rounded border border-ink/20 bg-white/70 px-4 py-3 text-sm font-bold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => {
                setCompleted((current) => new Set(current).add(activeLesson.id));
                moveLesson(1);
              }}
              className="inline-flex items-center gap-2 rounded bg-signal px-4 py-3 text-sm font-bold text-white transition hover:bg-[#c93722]"
            >
              Mark Done
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded border border-ink/20 bg-white/70 p-5 shadow-rail">
            <div className="mb-4 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-steel" aria-hidden="true" />
              <h2 className="font-display text-2xl">Workflow Rail</h2>
            </div>
            <div className="relative pl-5">
              <div className="absolute bottom-2 left-[9px] top-2 w-px bg-ink/15" />
              {["Working tree", "Staging area", "Local commits", "origin on GitHub", "Pull request", "Release tag"].map(
                (item, index) => (
                  <div key={item} className="relative mb-4 last:mb-0">
                    <div
                      className={`absolute -left-5 top-1.5 h-3 w-3 rounded-full border ${
                        index <= Math.min(activeIndex, 5)
                          ? "border-signal bg-signal"
                          : "border-ink/20 bg-paper"
                      }`}
                    />
                    <p className="text-sm font-bold">{item}</p>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="rounded border border-ink/20 bg-ink p-5 text-paper shadow-rail">
            <div className="mb-4 flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-flax" aria-hidden="true" />
              <h2 className="font-display text-2xl">Command Families</h2>
            </div>
            <div className="space-y-4">
              {commandFamilies.map((family) => (
                <div key={family.label}>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/60">
                    {family.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {family.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-paper/15 bg-paper/10 px-2 py-1 font-mono text-xs text-paper/90"
                      >
                        git {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-ink/20 bg-white/70 p-5 shadow-rail">
            <div className="mb-4 flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-moss" aria-hidden="true" />
              <h2 className="font-display text-2xl">End-to-End Script</h2>
            </div>
            <ol className="space-y-3 text-sm leading-6 text-graphite">
              {[
                "Configure your identity.",
                "Initialize, add, and commit.",
                "Create a GitHub repository.",
                "Add origin and push main.",
                "Branch, commit, and push feature work.",
                "Open a pull request, review, merge, tag.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-moss" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="border-r border-ink/15 px-4 py-3 last:border-r-0">
      <div className="font-display text-2xl font-extrabold">{value}</div>
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-graphite/60">
        {label}
      </div>
    </div>
  );
}

function HeaderGraphic() {
  const nodes = [
    { label: "Local", command: "git add", icon: Terminal },
    { label: "Commit", command: "git commit", icon: GitBranch },
    { label: "GitHub", command: "git push", icon: Github },
    { label: "Review", command: "pull request", icon: GitPullRequest },
  ];

  return (
    <figure className="relative overflow-hidden rounded border border-ink/20 bg-graphite p-4 text-paper shadow-insetLine">
      <div className="blueprint-lines absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <figcaption className="text-xs font-bold uppercase tracking-[0.16em] text-flax">
            git flow graphic
          </figcaption>
          <span className="inline-flex items-center gap-1.5 rounded border border-paper/15 bg-paper/10 px-2 py-1 font-mono text-[11px] text-paper/80">
            <UploadCloud className="h-3.5 w-3.5" aria-hidden="true" />
            origin/main
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_18px_1fr_18px_1fr_18px_1fr]">
          {nodes.map((node, index) => {
            const NodeIcon = node.icon;
            return (
              <div key={node.label} className="contents">
                <div className="min-h-24 rounded border border-paper/15 bg-ink/35 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-paper/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <NodeIcon className="h-4 w-4 text-flax" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-bold">{node.label}</p>
                  <code className="mt-2 block rounded bg-paper/10 px-2 py-1 font-mono text-[11px] text-paper/85">
                    {node.command}
                  </code>
                </div>
                {index < nodes.length - 1 && (
                  <div className="hidden items-center justify-center sm:flex" aria-hidden="true">
                    <div className="h-px w-full bg-flax" />
                    <div className="h-2 w-2 rotate-45 border-r border-t border-flax" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}

function CommandRow({ item, index, copied, onCopy }) {
  return (
    <article className="rounded border border-paper/15 bg-paper/[0.06] p-3">
      <div className="flex items-start gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded border border-paper/15 bg-paper/10 font-mono text-xs text-flax">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <code className="overflow-x-auto whitespace-nowrap rounded bg-ink/60 px-2 py-1 font-mono text-sm text-paper scrollbar-thin">
              {item.command}
            </code>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex w-fit items-center gap-2 rounded border border-paper/15 px-2 py-1 text-xs font-bold text-paper/80 transition hover:bg-paper/10"
              aria-label={`Copy ${item.command}`}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-paper/75">{item.why}</p>
        </div>
      </div>
    </article>
  );
}

export default App;
