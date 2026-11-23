---
title: Setup guide
permalink: /setup/
---


Setup takes about two minutes per group. You need to be a Jira administrator.

## 1. Install and open the settings

1. Install **Chat Alerts for Jira** from the Atlassian Marketplace.
2. In Jira, open **Settings (⚙) > Apps > Chat Alerts (Telegram & Lark)**.
3. Under **General**, pick the language of the messages and your time zone (used for the daily digest).

## 2a. Add a Telegram group

1. In Telegram, open **@BotFather**, send `/newbot` and follow the steps. Copy the token it gives you (looks like `123456789:ABC-DEF…`).
2. Add the new bot to your Telegram group. Then send `/start@YourBotName` in the group, so the bot sees the group.
3. In the app settings, click **Add Telegram group** and paste the token into **Bot token**.
4. Click **Find my group**, then **Use "…"** next to your group. (Or type the group chat id; groups start with `-100`.)
5. Choose projects and message types (see step 3), click **Save**, then **Send test message**.

## 2b. Add a Lark (Feishu) group

1. In the Lark group, open **Settings > Bots > Add bot > Custom bot**. Give it a name and add it.
2. Copy the **webhook address**.
3. Recommended: turn on **Signature verification** and copy the secret. Do **not** use "Custom keywords" or "IP whitelist": Atlassian sends from changing addresses and our messages carry no keyword.
4. In the app settings, click **Add Lark group**, paste the webhook into **Webhook URL** and the secret into **Signing secret**.
5. Choose projects and message types, click **Save**, then **Send test message**.

## 3. Choose what each group receives

- **Projects:** project keys separated by commas, for example `WEB, APP`. Leave empty for all projects. We recommend choosing projects, so each group only sees its own work.
- **Send a message for:** new issues, status changes, assignee changes, new comments.
- **Daily digest of overdue issues:** a list of open issues past their due date, once a day. It is sent during the hour you choose, or up to two hours later if Jira is busy.

## What is never posted

- Issues with a security level.
- Comments restricted to a group or role.
- Edited comments (only new comments are posted).

Anyone in the chat group can read the messages, including people who cannot open the issue in Jira. Choose groups and projects with that in mind.

## When many issues change at once

During bulk edits or imports, each group receives at most 15 messages a minute (Telegram) or 60 (Lark). After that it gets one "Many changes at once" message with a link to the recent changes in Jira, and alerts resume the next minute.

## Troubleshooting

When a group stops receiving messages, the settings page shows a warning on that group with what to do. Common cases:

| Problem | Fix |
| --- | --- |
| Telegram rejected the bot token | In @BotFather open your bot, choose **API Token**, copy the current token and save. |
| The bot was removed from the group | Add the bot to the group again, then send a test message. |
| The group became a supergroup | Use **Find my group** again, or enter the new id shown in the warning. |
| Lark webhook no longer works | The bot was removed or its webhook reset. Copy the new webhook and save. |
| Lark rejected the signature | Paste the current secret of the bot (it changes when reset). |
| No digest this morning | It is only sent when there are overdue issues in the chosen projects. Check the hour and time zone. |

Still stuck? Contact [SUPPORT EMAIL]. We answer within one business day.

## Uninstall

Uninstalling removes all settings and stored tokens. Remove the bot from your groups in Telegram or Lark as well.
