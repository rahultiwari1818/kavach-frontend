import subprocess
import datetime
import random
import os

# Starting and ending dates
start_date = datetime.datetime(2025, 8, 26, 9, 0, 0)   # Aug 26, 2025
end_date = datetime.datetime(2025, 11, 13, 23, 59, 0)  # Nov 13, 2025

# Calculate total days between dates
total_days = (end_date - start_date).days

# Get all commit hashes
commits = subprocess.check_output(['git', 'rev-list', '--reverse', 'HEAD']).decode().strip().split('\n')
total_commits = len(commits)

print(f"Changing dates for {total_commits} commits...")
print(f"Date range: {start_date.date()} to {end_date.date()} ({total_days} days)")

# Backup current branch
subprocess.run(['git', 'branch', '-f', 'backup-before-date-change', 'HEAD'])
print("Created backup branch: backup-before-date-change\n")

# Delete temp-branch if it exists
subprocess.run(['git', 'branch', '-D', 'temp-branch'], capture_output=True)

# Create new branch
subprocess.run(['git', 'checkout', '--orphan', 'temp-branch'])
subprocess.run(['git', 'reset', '--hard'])

# Generate random but sorted dates for all commits
commit_dates = []
for i in range(total_commits):
    # Distribute commits evenly but with randomness
    base_day = int((total_days / (total_commits - 1)) * i) if total_commits > 1 else 0
    random_offset = random.randint(-2, 2)  # Add some randomness

    actual_day = max(0, min(total_days, base_day + random_offset))
    random_hours = random.randint(9, 22)  # Between 9 AM and 10 PM
    random_minutes = random.randint(0, 59)

    commit_date = start_date + datetime.timedelta(days=actual_day, hours=random_hours - 9, minutes=random_minutes)
    commit_dates.append(commit_date)

# Sort dates to maintain chronological order
commit_dates.sort()

# Apply dates to commits
for i, commit in enumerate(commits):
    date_str = commit_dates[i].strftime('%Y-%m-%d %H:%M:%S')

    # Check if this is a merge commit
    parents = subprocess.check_output(['git', 'rev-list', '--parents', '-n', '1', commit]).decode().strip().split()
    is_merge = len(parents) > 2  # More than 2 means it's a merge commit

    # Cherry-pick with new date
    env = os.environ.copy()
    env['GIT_COMMITTER_DATE'] = date_str
    env['GIT_AUTHOR_DATE'] = date_str

    try:
        if is_merge:
            # For merge commits, use -m 1 to follow the first parent
            subprocess.run(['git', 'cherry-pick', '-m', '1', '-n', commit], check=True, capture_output=True)
        else:
            subprocess.run(['git', 'cherry-pick', '-n', commit], check=True, capture_output=True)

        # Try to commit
        result = subprocess.run(['git', 'commit', '-C', commit, '--date', date_str],
                                env=env, capture_output=True)

        if result.returncode == 0:
            merge_label = " (merge)" if is_merge else ""
            print(f"✓ Commit {i+1}/{total_commits}: {date_str}{merge_label}")
        else:
            # Empty commit - use --allow-empty
            subprocess.run(['git', 'commit', '--allow-empty', '-C', commit, '--date', date_str],
                           env=env, check=True, capture_output=True)
            print(f"✓ Commit {i+1}/{total_commits}: {date_str} (empty)")

    except subprocess.CalledProcessError as e:
        error_msg = e.stderr.decode() if e.stderr else e.stdout.decode() if e.stdout else 'Unknown error'
        print(f"✗ Error on commit {i+1}")
        print(f"   {error_msg[:200]}")
        break

print("\n" + "="*60)
print("Done! Review with: git log --pretty=format:'%h %ad | %s' --date=short")
print("If satisfied, run:")
print("  git branch -M main")
print("  git push -f origin main")
print("="*60)