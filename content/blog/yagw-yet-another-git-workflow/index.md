---
title: "#YAGW... yet another git workflow"
date: "2020-05-22T19:29:33.218Z"
description: "In this post, I will present a workflow that can help “fast” paced, small teams which are managing multiple projects. It’s a variation of the classic git-flow, with alterations to support simultaneous development and QA testing cycles of many features."
---

In this post, I will present a workflow that can help “fast” paced, small teams which are managing multiple projects. It’s a variation of the classic git-flow, with alterations to support simultaneous development and QA testing cycles of many features.

I have worked with multiple teams, and with every group, we always had a secondary develop environment separate from production. We used this environment for testing before the production release. Many times release of a tested feature would get blocked by other untested feature. It happened because we would merge multiple feature branches into a develop branch, and for production release, we followed the flow to merge develop into master.

Cherry-picking helped many a time, but it used to get messy. I brainstormed some ideas off my close friend Ankur Bohra, and I will present those ideas here in this article.

![YAGW](./yagw.png "#yagw... yet another git workflow")

### 1. master

As it should be, the master branch is the production branch.

### 2. develop

The develop branch will have the latest development changes that are ready for QA testing, and targeted to be released to production soon after QA testing.

### 3. feature branches

For feature developments, every feature will get a dedicated branch. Create a new feature branch from the master branch.

Follow a basic naming convention, something like `feature/{{task-id}}-{{short-task-title}}`.\
For example, `feature/12-signup`.

In addition to this `feature` class, there are other classes like - hotfix, refactor, bugfix, task. Choose one based on the nature of the change.

### 4. Code review

The next important step after feature development is code review. One team must not skip this!
Create a pull request from a feature branch to develop branch.

Alternate strategy (optional) -\
Create a separate feature release branch from the master branch, and raise a pull-request from a feature development branch to its release branch.\
Follow a basic naming convention, something like `release/feature/{{task-id}}-{{short-task-title}}`.\
For example, `release/feature/12-signup`.

A strategy to squash development commits is worth considering before raising pull request or before merging to develop.

### 5. QA testing

The next crucial step before production deployment is to get the feature tested by the QA team.

For the testing release, raise a pull request from feature to develop branch. Get approvals from teammates on this release pull request, and then merge it and deploy.

Avoid squashing commits while merging to develop branch (and master branch).

QA process will identify issues, missed edge case scenarios in the release. Additional code changes will be needed to fix those issues. Commit those changes on the feature branch. Raise a pull request for code review of new changes, followed by QA testing to validate them.

### 6. Production release

Once a feature passes the QA testing process, don’t delay production release.

Raise a pull request from feature to master branch. Get approvals from teammates on this release pull request, and then merge to master branch and deploy production.

#### So, how will it help?

- It helps in managing releases of simultaneously developed multiple features. It avoids bottleneck on develop branch that can potentially happen through the QA cycle.
- It records each process step in the git history. The merge commit marks the code-review steps. The subsequent commits made after QA testing highlights the importance of QA process identifying issues before the production release.

#### And, any cons?

- Conflict resolution can get tedious.

  In case of conflicts between feature and develop branch, we can't pull the develop branch into the feature branch. It might bring other untested code from develop branch into the feature branch.

  A temporary arbitrator branch would be needed to resolve conflicts. Create a new branch from the feature branch. Use this new branch to resolve conflicts by pulling develop branch into it.

  For the arbitrator branch, follow release branch naming convention, something like `release-develop/feature/{{task-id}}-{{short-task-title}}`.\
  For example, `release-develop/feature/develop/12-signup`.

- Master branch must be merged into the develop branch after production deployment. This additional step, syncs develop with master and its extra merge commits.

So, what do y’all think about this workflow?
