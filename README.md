This is an assignment for the convener/infra convener application in Cyber Security Club @ IITB. This repository is divided into two subdivisions: assignment for convener and assignment for infra convener.

# Convener assignment:
It consists of 3 challenges and one non-technical task. Right now, you will be able to see only two challenges, and the other two will be uploaded in a couple of hours. You don't need to complete all of them, just do as much as you can, but remember, you need to make detailed writeups on the challenges even if you could not complete them. We don't seek answers, we seek methods full of creativity and a fearless desire to learn more. (no write-up for the non-technical task ;))

The goal in all the challenges is to recover a hidden string(a flag). Have fun with the challenges! And in case you're stuck somewhere, pls ping me on whatsapp-9351323016.
You can have a look at some writeups for old CTFs here; in case you're wondering how to write a "writeup", - it needn't be formal but must have your thought process jotted down.

### Task 1:
You managed to hack into someone's good girl and steal a pdf file containing the flag. But turns out the pdf is protected with a password. Find a way to crack the password. 😳
### Task 2:
### Task 3:
### Non-Technical task:
Imagine you are a convener of CSec Club, IIT Bombay (soon you will be ;)), and there is an event-"Hard Hack", which is planned to be conducted in feburary'23. The manager of the club tells you to create a poster for the event giving all the relevant information to the students. Design a poster for the event "Hard Hack", which should consist of all the relevant information like time, venue etc. We have also attached the logo of our club to be mandatorily present on the poster.

P.S. - We are not going to judge you on the basis of the editing or graphics that you use in the poster. The judging criteria will be
All the relevant information is provided.
All information is given the proper position or font size as per its significance.

# Infra convener assignment:
CSec has our own self-programmed [discord bot](csec_bot) serving many of our purposes including verification, rickrolling people and other things. For quite some time, we have been wondering if it is possible to add other functionalities pertaining to CTFs to our bot, and lo, here we are.

In both of the following tasks, out of which **any one** has to be completed as a part of the assignment; you are supposed to add certain functionalities to the above mentioned bot. This would require you to gain some familiarity with the Discord API. Note that we are not providing access to our own server for any testing purposes; you can choose to create your own server(s) for the same. You may choose to get acquainted with Discord using [this guide](https://discordjs.guide/#before-you-begin). 

The problem statements mentioned below do not detail on the specific requirements of the task(s); some of which might be open ended and some of which might not be. You are requested to direct all your queries regarding this assignment either to `whoami#1900` on Discord or to the above mentioned contact details.

### Task 1:
[NullCTF](https://github.com/NullPxl/NullCTF) is an extremely popular CTF collaboration tool but surprisingly it only enjoys limited features. Your task here would be to add a CTF utility command to our bot. This command would be responsible for creating a channel as well as a role for collaboration for any CTF we choose to participate in. It should be possible to optionally allow the channel to be a private channel and in this case, the corresponding role with **appropriate permissions** should be added to the channel as well. Moreover, it should be possible to set some roles (eg *Mod* and *Bot* from our server) to be added to all such channels by default.

### Task 2:
We have an existing [per-user scoreboard](csec_bot/commands/scoreboard.js) feature to maintain a database of the CTF contributions by each player in the team. This scoreboard, when requested for, sometimes exceeds the size of a single Discord message and does therefore not get displayed at all. Your task here would be to add functionality to display the scoreboard in a paged manner with navigation across these pages, possibly via emoji reactions to the displayed message.

## Deadline
The deadline for the assignment is 20th May'22 at 23:59 IST. Note that this is a hard deadline, and no further extension will be given. Selected candidates would be contacted by us on the provided email-ids and would be interviewed from 21st May'22 onwards.
