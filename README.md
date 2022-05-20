# Assignment Details

Here lies the assignment(s) for the convener/infra convener application in Cyber Security Club @ IITB, 2022-23. This repository is divided into two subdivisions: assignment for convener and assignment for infra convener. Make sure that you only work on the assignment for the position(s) you are applying!

IMP NOTE: Google should be your companion in this whole assignment i.e. feel free to google any stuff rather it is recommended that you should google your doubts. Also hints will be provided if required/asked by the applicants. You all should contact me in case of any queries.

# Convener assignment:
It consists of 2 technical and 1 non-technical tasks. You don't need to complete all of them, just try to finish as many as you can, but remember, you need to make detailed writeups on the challenges even if you could not complete them. We don't seek answers, we seek methods full of creativity and a fearless desire to learn more. (No write-up for the non-technical task ofcourse ;))

The goal in all the challenges is to recover a hidden string(the so-called *flag*). Have fun with the challenges! And in case you're stuck somewhere, please ping me on WhatsApp - 9351323016.

You can have a look at some writeups for old CTFs [here](image.png); in case you're wondering how to write a "writeup", - it needn't be formal but must have your thought process jotted down.

### Flag Format:
IITB{flag} ; replace "flag" with the correct string flag.

### Task 1:
You managed to hack into someone's good girl and steal a pdf file containing the flag. But turns out the pdf is protected with a password. Find a way to crack the password. 😳

### Update :

#### Hint 1

Default wordlists of tools do not contain many passwords; one might want to checkout other popular wordlists...

### Task 2:
Fieser püppchen is plotting to hide the flag away from tylluan in a desperate attempt to stop him from becoming CSeC convener...
To that end püppchen has decided to double encrypt the flag. However, Iolair, resourceful as always, was able to intercept the traffic between püppchen's computer and the hardware on which this encryption was occuring when püppchen tried to encrypt it for a second time.
püppchen, realizing fuglanna were closing in, decided to erase the keys and the flag that was encrypted... Alas, they could only get back the remaining code and the 
trace Iolair captured. Tylluan suspected that they could retreive the flag in cleartext. Can you help the fuglanna?

### Update : 

#### Hint 1 : **".pcapng"** 

This file is a network capture file and it can be opened using Wireshark. Basically data on the network travels in packets (google for more details) and in this case are USB packets. USB protocol defines 4 different packets (can google based on interest), but in our case the bulk packets contain all data, the arduino board has the USB address `1.14.X` where X can be any number (if anyone is interested why, then arduino is device 14 on bus 1). 

Anyway, so for `Serial.println` output you need to find packets coming to host from arduino to host (`USB_URB in` packet) towards the end of the capture. Also, remember the length of the text is `32` which is not changed by the custom "encryption" algorithm and `iv` is 1 byte. Use the lengths to recognise this data.

As for the encryption key, you need to remember it is some permutation of 0-7 short ints (2 bytes). you need to look at packets from host to arduino (`USB_URB out`) and you'll find the key. You will just have trouble recognising that this is the key.

#### Hint 2 : **".ino"**

Once you find the missing data, you just need to understand what the encryption is doing and do the exact reverse of what yields the result. Ideally in CTFs you'll have to write programs to do the reversing, but here the flag is so small that you can also manually do that.

So just to provide you a bird's eye view - the data you got was `Enc(Enc(flag, iv_1, key), iv_2, key)`, `iv_2` and `key`. The only missing piece of info is `iv_1` and that will be retrieved very easily if you actually understand the encryption algorithm and remember that the flag format is `IITB{XXXX}`.

#### Hint 3

Also, and why is the key same in both encryption? Because key reuse or even IV and nonce reuse **actually happen IRL**. Google Geohot PSIII lawsuit and see their talk in CCC. Just to spice things up, I didn't keep the `iv` same.


### Non-Technical Task:
Imagine you are a convener of CSec Club, IIT Bombay (soon you will be ;)), and an event - "Hard Hack" - A 2-day long workshop on Hardware Hacking, has been planned to be held in Feburary'23. You have been tasked to create a poster for the event containing all the relevant information to the students; you can make some assumptions regarding various details such as venue, date and time etc.
The logo of the club has been provided to be mandatorily present on the poster.

P.S. - The evaluation would not be held on the basis of the graphics that you use in the poster; rather it would be on details such as - Has all the relevant info been provided? Are there any nuances(pre-requisites eg)? Appropriate positioning/sizing of info based on significance? And well, you should know what else is important in a poster.

#### Update

No one chose to inform us of the missing logo! The logos have been placed inside [this folder](Convener/Non-Technical%20Task/) ; use whichever one seems to be a better-fit for your poster :)

# Infra Convener assignment:
CSec has our own self-programmed [discord bot](Infra%20Convener/csec_bot/) serving many of our purposes including verification, rickrolling people and other things. For quite some time, we have been wondering if it is possible to add other functionalities pertaining to CTFs to our bot, and lo, here we are.

In both of the following tasks, out of which **any one** has to be completed as a part of the assignment; you are supposed to add certain functionalities to the above mentioned bot. This would require you to gain some familiarity with the Discord API. Note that we are not providing access to our own server for any testing purposes; you can choose to create your own server(s) for the same. You may choose to get acquainted with Discord using [this guide](https://discordjs.guide/#before-you-begin). 

Importantly **any successful attacks** on the bot, including but not limited to tampering with the stored data, means a successful completion of the assignment as well! So choose wisely if you want to develop or attack!

The problem statements mentioned below do not detaila lot on the specific requirements of the task(s); some of which might be open ended and some of which might not be. You are requested to direct all your queries regarding this assignment either to `whoami#1900` on Discord or to the above mentioned contact details.

### Task 1:
[NullCTF](https://github.com/NullPxl/NullCTF) is an extremely popular CTF collaboration tool but surprisingly it only enjoys limited features. Your task here would be to add a CTF utility command to our bot. This command would be responsible for creating a channel as well as a role for collaboration for any CTF we choose to participate in. It should be possible to optionally allow the channel to be a private channel and in this case, the corresponding role with **appropriate permissions** should be added to the channel as well. Moreover, it should be possible to set some roles (eg *Mod* and *Bot* from our server) to be added to all such channels by default.

### Task 2:
We have an existing [per-user scoreboard](Infra%20Convener/csec_bot/commands/scoreboard.js) feature to maintain a database of the CTF contributions by each player in the team. This scoreboard, when requested for, sometimes exceeds the size of a single Discord message and does therefore not get displayed at all. Your task here would be to add functionality to display the scoreboard in a paged manner with navigation across these pages, possibly via emoji reactions to the displayed message.

## Deadline
The deadline for the assignment ~~is 20th May'22~~ has been extended to 21st May'22, 23:59 IST. Note that this is a hard deadline, and no further extensions will be provided. Selected candidates would be contacted by us on the provided email-ids and would be interviewed from ~~21st~~ 22nd May'22 onwards.
