---
title: Privacy Policy
permalink: /privacy/
---


Effective date: [DATE]
Provider: Mekong Apps ("we")
Contact: [SUPPORT EMAIL]

This policy explains what Chat Alerts for Jira ("the app") does with data from your Jira Cloud site.

## 1. Where the app runs

The app is built on Atlassian Forge and runs inside Atlassian's cloud. We do not operate our own servers for the app, and we cannot see your Jira data, your settings or your bot tokens.

## 2. Data the app reads from Jira

The app has read-only access to Jira (`read:jira-work`, `read:jira-user`). When an issue event happens, it reads only what a message needs: issue key, summary, issue type, priority, status, assignee, due date, project key and security level; the display name of the person who made the change; and, for comment alerts, the comment text.

## 3. Data sent outside Atlassian

A Jira administrator chooses which Telegram or Lark groups receive messages. For those groups only, the app sends:

- issue key and summary (up to 150 characters);
- issue type, priority, old and new status;
- display names of the assignee and of the person who made the change;
- for comment alerts, if enabled: the first 500 characters of the comment as plain text;
- for the morning digest: due dates of overdue issues;
- a link to the issue on your Jira site.

Messages go to `api.telegram.org` (Telegram), `open.larksuite.com` (Lark) or `open.feishu.cn` (Feishu). Once delivered, messages are stored and processed by those services under their own terms and privacy policies, and anyone in the group can read them.

The app never sends: issues with a security level, comments restricted to a group or role, issue descriptions, attachments, custom fields, email addresses or account IDs.

## 4. Data stored by the app

The app stores its configuration in Forge storage, hosted by Atlassian: language, time zone, Jira site address, the list of groups with their projects and alert types, the date of the last digest, and the last delivery error of each group (only the error type, its time and, for Telegram, a new group id) so the settings page can explain how to fix it. Telegram bot tokens and Lark webhooks and secrets are stored with Forge encrypted secret storage and are never shown again after saving. The app does not store issue content.

When you uninstall the app, Atlassian deletes this data.

## 5. Logs

Forge keeps app logs for troubleshooting. Our logs contain only technical details such as a channel id, an issue key and an error code. They do not contain issue summaries, comments, names or tokens. We read logs only to fix problems.

## 6. Analytics, sale of data

The app has no analytics or tracking. We do not sell, rent or share your data.

## 7. Your choices

A Jira administrator can turn off any alert type, limit each group to chosen projects, remove a group, or uninstall the app at any time. To delete messages already posted, use Telegram or Lark.

## 8. Changes

We will post changes to this policy at this address and update the effective date.

## 9. Contact

Questions or requests: [SUPPORT EMAIL].
