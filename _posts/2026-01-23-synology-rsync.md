---
layout: post
title:  "Remote rsync for a Synology NAS"
date:   2026-01-31 13:00:00 -0800
categories: personal computer
teaser: personal/rsync.png
excerpt: "Getting rsync to work on my Synology NAS from a remote machine."
---


{% assign img = "/assets/img/personal/synology-rsync/" %}

Trying to search for help online these days is a real slog.  There's a ton of very obvious LLM-generated content out there that's hard to parse, is mostly fluff, and sorts things into non-sensical headers and single paragraphs.  

I wanted to back up some data for a personal project, because I want to continually update the code, but I want some relief valve if I corrupt years of data.  The data itself is sized in tens of gigabytes, and I didn't necessarily want to keep it on some random cloud provider and pay storage fees.  I've got terabytes of space on my Synology NAS at home, how hard could that be to back up there?

My requirements:
* Back up _from_ a cloud VM (Azure, EC2) to a local NAS at home,
* Use principle of least permissions (a compromise of a cloud VM shouldn't lead to access to my NAS), and
* Log and raise backup errors.

### Step 1: What's rsync?

It took a very short amount of time to realize I should be using `rsync`.  `robocopy` for Windows is similar; it's a file copying utility that is designed to minimize the amount of data transferred to keep two file locations synchronized with the same data.  

Synology has a rsync service, neat!  I'll make a non-admin account on my NAS and set it up with the rsync service.  Wait, I can't `ssh` into that non-admin account on a Synology device if that account isn't admin?  What?!

### Step 2: Setting up ssh keys 

I just want the remote machine (on Azure) to have access to rsync to specific directories on my NAS.  I want to run this backup task as a cronjob, so I'd prefer to use a public/private keypair instead of a password for `ssh` (and therefore `rsync`).

I start by generating the key on the remote machine, which should default to ed25519 with the comment what this key represents:

`ssh-keygen -C "backup-user"`

I chose to name this something other than the default, so when prompted, I choose the name `id_backup-user`.  I chose no passphrase because I want non-interactive login to backup files.

### Step 3: Set up ssh for user on the Synology NAS

I sure don't want a backup user to have admin on the NAS.  However, to easily copy the ssh key over, it's necessary to award admin access for a short time.

Add a user through the control panel, and make sure to add it to the administrators group:

![Adding a user in the Synology Control Panel, awarding admin access]({{ "user-create.png" | prepend: img }}){:class="img-fluid"}

After adding the user and setting a password, return to the remote terminal.  The `ssh-copy-id` is a handy utility for copying a SSH public key to a remote host to allow the keypair to be used for login to that machine.  Use the following command, which says to use a particular key to connect to the NAS as the backup user (matching the username set up just above):

`ssh-copy-id -i ~/.ssh/id_backup-user backup-user@path.to.NAS`

All I have to do is enter the password for the backup-user on the NAS once to successfully complete the ssh connection and copy the public key over to the NAS for future non-interactive login with the keypair.  

If this command succeeds, then `ssh backup-user@path.to.NAS` should just work without a password.  If it doesn't, there should be some helpful message.  If you get a "Connection refused" message, make sure port 22 is open through your router to your NAS.  I'd suggest instead picking some arbitrary port (like 3722) to expose publicly and forward it to port 22 on your NAS.  Add the `-p 3722` to every ssh-like command to address the non-standard port.

Now, let's remove admin access from the backup-user on the NAS:

![Removing admin access from the backup-user]({{ "remove-admin.png" | prepend: img }}){:class="img-fluid"}

... and limit the file access to only the folders the user should have access to:

![Narrowing access to only the backup folders]({{ "folder-access.png" | prepend: img }}){:class="img-fluid"}

### Step 4: Setting up rsync on the NAS

Synology DSM 7.2 has an rsync service that doesn't require that particular users have admin privileges.  Now that we've set up ssh non-interactive login, we can set up a scheduled task to do the backup.  

Let's set up the rsync service.  In the Control Panel, pick File Services and enable the rsync service under the rsync tab.  Pick an SSH encryption port that's non-standard, and forward that through your firewall and router.

![Enabling the rsync service]({{ "rsync.png" | prepend: img }}){:class="img-fluid"}

Now we should be able to rsync a folder to the NAS.  Here's an example:

`rsync -avxz /path/to/backup/ backup-user@path.to.NAS:/volume1/backup-folder -e "ssh -p 4722"`

This tells `rsync` to synchronize the folder backup/ to the backup-folder/, where /volume1 is the root of the volume on the NAS.  If you have multiple logical volumes on the NAS, then try a different number until it succeeds (or you could SSH in as the admin user to find it).  

We pass `-a` for archiving, `-v` for verbose (for logging), `-x` to ensure we don't cross filesystem boundaries, and `-z` to compress data during transfer over the wire.  We also pass the `-e` parameter to specify that we should use the following ssh command to connect, so we put our port here.  If we need to use a particular key, add `-i ~/.ssh/id_backup-user` after the port.

### Step 5: Finalizing the script

Yey crontab.  Let's write a script.  I wanted to use webhooks to write a message to Discord when this succeeds and fails so I don't have to remember to check a logfile.  [discord.sh](https://github.com/fieu/discord.sh){:target="_blank"} fits the bill.

Here's my script:

```
#!/bin/bash

cd "$(dirname "$0")";

cadence=${1:-'daily'}

echo "backup with $cadence cadence.."
echo $(date)

do_work() {
    printf -v s_time '%(%s)T' -1

    # for space reasons, can't maintain multiple copies of backups on production server
    rm backups/*

    # file backup
    tar -czf backups/files.tar.gz /path/to/files-to-backup || return 1

    printf -v u_time '%(%s)T' -1

    # dump database
    if [ "$cadence" = "weekly" ]; then
        pg_dump -Fc [db-name] > backups/[db-name]-db.dump || return 1
    fi

    pg_dump -t [table-name] [db-name] > backups/[db+table-name].pgsql || return 1

    printf -v d_time '%(%s)T' -1

    # copy contents to backup server
    rsync -avxz backups/ backup-user@path.to.NAS:/volume1/backup-folder/$cadence -e "ssh -p 4722 -i ~/.ssh/id_backup-user" || return 1

    printf -v c_time '%(%s)T' -1

    ./discord.sh --text "Backup operation ($cadence) took $(( (c_time - s_time) / 60 )) minutes (logs: $(( u_time - s_time ))s, DB: $(( d_time - u_time ))s, copy: $(( c_time - d_time ))s)."
}

report_err() {
    ./discord.sh --text "Failed to backup; check logs."
    return 1
}

do_work || report_err
```
If any command fails, the `|| return 1` will cause a fall-through and raise an error.  Make the script executable with `chmod u+x backup.sh`.  To set up the cronjob, I use `crontab -e` and set the following:

```
0 12 * * * ~/backup/backup.sh >> ~/backup/backup-logs/daily.log 2>&1
0 13 * * 3 ~/backup/backup.sh weekly >> ~/backup/backup-logs/weekly.log 2>&1
```

This runs the daily script at noon every day, and appends both normal and error output to the daily log.  The weekly script is similarly run at 1pm, but only on Wednesdays.

### In conclusion

I hope you enjoyed my totally not AI-generated article.  This is my attempt to combat all the fucking nonsense I ran into trying to use a search engine to solve my problems.  

_#normalizeblogpostsagain_
