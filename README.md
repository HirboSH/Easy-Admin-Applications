## Introduction

An add-on that allows easier submission of applications to  be one of the server's Admin, built into the game. All the answers stored at your own DB.

## Installation

--------------
### Plugin Installation
--------------

The Installation part is really easy for both plugin and bot, download the compiled plugin, and put it on your plugins folder. [Download the source if you would like to contribute or your'e just a developer too];

So, after putting your compiled plugin in your plugins folder [``addons/sourcemod/plugins``], we need to take care of our DB's stuff. Open ```addons/sourcemod/cfg/databases.cfg```, then add this :

```cfg
"applications"
    {
        "driver"            "mysql"
        "host"                "EDITME_DATABASE_HOST_EDITME"
        "database"            "EDITME_DATABASE_EDITME"
        "user"                "EDITME_USERNAME_EDITME"
        "pass"                "EDITME_PASSWORD_EDITME"
        "port"            "3306"
    }
```

Last step, edit the information for ``host``, ``database``, ``user`` and ``pass``. For instance, 

```cfg
"applications"
    {
        "driver"            "mysql"
        "host"                "localhost:3306"
        "database"            "applications_example_database"
        "user"                "database_username"
        "pass"                "database_user_password"
        "port"            "3306"
    }
```

So, quite easy. Isn't it? LOL. ``[1/2 Steps completed!]``

--------------

### Bot Installation
--------------
#### Windows Hosted
--------------

Download ``node.js``, download the **CURRENT** version. ``Not`` the **LTS**.

Now, go to a file named ``.env``, open it, and edit the information inside it. It should looks like this,

```env
TOKEN="YOUR_BOT_TOKEN"
DEFAULT_COLOR="DEFAULT_EMBED_COLOR"
PREFIX="YOUR_BOT_PREFIX_EDITME"
GUILD="YOUR_GUILD_ID_EDITME"
CHANNEL="CHANNEL_FOR_ACCEPTED_ADMINS"
```

Edit the information for ``TOKEN``, ``DEFAULT_COLOR``, ``PREFIX``, ``GUILD`` and ``CHANNEL``. For instance, 

```env
TOKEN="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
DEFAULT_COLOR="#FFFFFF"
PREFIX="!"
GUILD="12345678910"
CHANNEL="12345678910"
```

Our last step, go to ``config/config.js``, open it, and edit the information inside it. It should looks like this,

```javascript
// SQL stuff;

exports.HostIP = ""; // host IP;
exports.UserName = ""; // username for the database;
exports.UserPassword = ""; // password for the user;
exports.DBName = ""; // table name;

// end SQL stuff.. Quite easy isn't it?;

// who can access to review the applications;

exports.Team = ["501465377918812161"]; // [This Is My ID Tho Lol;]

/*  ID's of the applications team, who can review the applications;
    Add ID's Like That -> ["ID1", "ID2", "ID3", "ID4"];
    [You can add how many ID's as you want];
*/
```

After setting all up correctly, i can say that you're done! ``[2/2 steps completed!]``

Open the terminal and run ``npm i``. [because I did not attach the ``node_modules`` files.]

And don't forget that to start the bot there's a file named ``start.bat``, yes?

--------------
#### Linux Hosted
--------------

Basically the same thing, but for monitoring the bot you'll probably need to use ``pm2``. [Link](https://pm2.keymetrics.io)

Btw, in Linux host you'll probably won't be able to run ``start.bat`` because Linux doesn't support ``.bat`` files. That's why i mentioned ``pm2`` in this "Linux Hosted" situation.

Please, let me know if you want a guide for ``pm2``.

--------------

## Usage
--------------
#### Plugin Usage
--------------

sm_applications | sm_application | sm_apps;

Start a new application, then click the question you want to answer.

When you finish all the 6 questions, the application will be stored in your DB. :D

**NOTE** : In the DB qurey i set the column PlayerID to be ``UNIQUE``. It means that a player can apply an application only 1 time. [If the application gets declined, the player will be able to apply again];

--------------
#### Bot Usage
--------------

Run the bot.

Execute - ``YOUR_PREFIXhelp``. [You can change the PRERFIX in ``.env`` file];

**NOTE** : The bot's goal is to make review the applications in a easier way.

!accept <Application_ID> will accept the application, send a message to a channel that you pre-set. (remember in ``.env`` file, CHANNEL?);
!decline <Application_ID> will decline the application. 

**NOTE** : In both commands ``accept`` and ``decline`` the application will be deleted automatically.

## Console Variables [Cvars]
--------------

##### ``name, defualt value, description``
--------------

1. **sm_applications_timer_enabled** - ``1``, ``Enable or disable plugin timer (A reminder for applying to be an Admin), [Default = 1 / Enbaled]``

2. **sm_applications_prefix** - ``[Simple Applications]``, ``Set the plugin prefix. [Default = 'Simple Applications'];``

--------------

## Built With
--------------
### Plugin

1. **SourceMod + SDKTools** - ``v1.10 - build 6499``; [Link](https://www.sourcemod.net)

--------------
### Bot

1. **Discord.js** - ``v12.3.1``;  [Link](https://discord.js.org)

2. **DotENV** - ``v8.2.0``;  [Link](https://www.npmjs.com/package/dotenv)

3. **Fs** - ``v0.0.1-security``;  [Link](https://www.npmjs.com/package/fs)

4. **MySQL** - ``v2.18.1``;  [Link](https://www.npmjs.com/package/mysql)

5. **Path** - ``v0.12.7``;  [Link](https://www.npmjs.com/package/path)

--------------

## Support & Other

--------------

1. **Discord Server** - [Link](https://discord.gg/RGVxE57sVX)

2. **Steam Profile** - [Link](https://steamcommunity.com/id/hirbosh/)

:D <3
