# 🚀 Setup Guide — GitHub Activity Bot

Follow these steps to get your activity bot running in under 5 minutes.

---

## Step 1 — Create a new GitHub repo

Go to [github.com/new](https://github.com/new) and create a **public** repo.
Name it something like `github-activity-bot` or `daily-dev-log`.

> ⚠️ It must be **public** for your contributions to show on your profile graph.

---

## Step 2 — Push this project

```bash
# Clone or download this folder, then:
cd github-activity-bot
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git add .
git commit -m "🤖 Initial bot setup"
git push -u origin main
```

---

## Step 3 — Enable Actions write permissions

1. Go to your repo on GitHub
2. Click **Settings** → **Actions** → **General**
3. Scroll to **Workflow permissions**
4. Select **"Read and write permissions"**
5. Check **"Allow GitHub Actions to create and approve pull requests"**
6. Click **Save**

---

## Step 4 — (Optional) Add a Personal Access Token for starring

The built-in `GITHUB_TOKEN` can star repos within the same org, but for full
starring capability across GitHub, add a PAT:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Select scopes: `public_repo`, `user` (for starring)
4. Copy the token
5. In your repo → **Settings → Secrets and variables → Actions**
6. Add a secret named `PAT_TOKEN` with the copied value
7. In `star-repos.yml`, change `secrets.GITHUB_TOKEN` → `secrets.PAT_TOKEN`

---

## Step 5 — Test it manually

1. Go to your repo → **Actions** tab
2. Click **"🤖 Daily GitHub Activity Bot"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Watch the logs — you should see a commit appear in seconds!

---

## ⏰ Schedule Summary (IST / Kolkata Time)

| Workflow | Days | Times (IST) |
|----------|------|-------------|
| Daily Commits | Every day | 10:00 AM, 2:00 PM, 7:00 PM |
| README Update | Monday | 9:00 AM |
| Issue Rotation | Wednesday | 11:00 AM |
| Star Repos | Friday | 6:00 PM |

---

## 🛠️ Customization

### Change the star topics
In `.github/workflows/star-repos.yml`, find this line:
```yaml
default: 'llm,rag,crewai,fastapi,nextjs,supabase,groq,langchain,autonomous-agents,vector-database'
```
Replace with your preferred topics.

### Change the commit schedule
In `.github/workflows/daily-activity.yml`, edit the `cron` expressions.
Use [crontab.guru](https://crontab.guru) to build your own schedule.

### Add your own dev tips
Find the `TIPS` array in `daily-activity.yml` and add your own entries.

---

## ❓ FAQ

**Q: Will this count as contributions on my profile?**  
A: Yes! Commits pushed to a public repo you own count as contributions.

**Q: Can I run multiple workflows on the same day?**  
A: Yes, use the **"Run workflow"** button in the Actions tab any time.

**Q: How do I stop the bot?**  
A: Go to Actions → select a workflow → click the `...` menu → **"Disable workflow"**.

---

_Built for Kushagra Gupta's GitHub profile · Lucknow, India 🇮🇳_
