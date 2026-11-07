# Changelog

## Unreleased

Fixes for the first issues on GitHub (#1, #2).

- **A spouse is no longer a stranger, in saves you already have.** Ties added after the start (in This world →
  Family and ties) now give their bond, approval and romance to saves made before 0.2.1 too: a spouse shows as
  Married, a fiancé as Engaged, a best friend as a friend. It only touches people you have lived nothing with
  yet (no bond, no approval, no romance), so a breakup or a divorce is never undone. A backup of the save is kept
  first (save format 2).
- **Play as keeps the job.** The first time you play someone, you start with the job the world gave them (This
  world → their occupation), at the first rank. Before, you started with none.
- **The AI knows what the people here are doing.** Someone whose routine puts them here is described as being at
  work (with their job), at home or in their free time, with what comes next ("Next, from 17:00: home"), so "why
  are you here?" gets a true answer. At most four people per scene, in the Scene focus block.

## 0.2.1 · 2026-10-28

Fixes and improvements for Home mode.

### Security

Thanks to **coldasblues**, whose fork found these.

- **World files can no longer run code.** Picture addresses, numbers and colors from a world file (yours or one
  you imported) went into the page's styles as they were, and a crafted file could run code inside SillyTavern.
  Now a picture can only be a picture, numbers stay numbers and colors stay colors, and everything Mundi draws
  is cleaned of anything that could run code.
- **Slash commands:** text sent through SillyTavern's commands (lines, narration, read aloud, pictures) can no
  longer carry an STscript `{: … :}` block.
- **Importing a world** only uses the pictures inside the file: nothing is downloaded from other sites.
- **Messages can't press Mundi's buttons:** a reply (or a card, or a shared chat) with HTML that copied Mundi's
  controls could make a click do something in Mundi. Those controls are now removed from what messages show.
- **Pictures from links in messages** now follow SillyTavern's "Forbid external media" (a picture from another
  site tells that site you are reading). To show them anyway: Chat look → Show pictures from links.
- **Every attribute filled from a world, a card or a save is escaped**, also in the world creator's fields, and a
  currency symbol or an icon can't carry HTML.

### Visitors (Home)

- **Invite people over** from the Calendar (a new Visits tab). They arrive about an hour later and stay until
  you say goodbye.
- **The doorbell:** when they arrive, it rings. Open the door yourself, or someone else answers after a while.
  If you are out, they are let in.
- **Where they sleep:** a free bedroom, your room or a housemate's room, chosen for each guest (and changeable
  while they stay).
- **Guests' rooms** are always open to you, and saying goodbye in their room no longer leaves you in the dark.

### Parties and going out

- **Guests from outside:** a party can invite people who don't live in the house. They come at the start and go
  home at the end, unless you ask them to stay after the party.
- **A party out of the house:** pick the place and its background.
- **Edit the guests** of a planned party on its card (Edit guests), next to Call it off.
- **Go out** with anyone from your cast or your library, and pick the background. A date "somewhere out" can
  have its own background too.
- **Sleeping through plans:** going to sleep when a party or a date is coming asks first. "Sleep until the
  party" (or the date) wakes you up just in time.

### Looks and sound

- **The AI narrates what you do right away** (Things to do, in a scene). On by default.
- **AI calls in one place:** This world → AI context lists everything that makes Mundi call the AI (narrating what
  you do, the diary, characters' texts, Chirp posts and pictures), each with its own switch. New: characters' texts
  can use short ready-made replies instead of the AI.
- **Rain and storm sounds**, with their own switch and volume (Settings → Weather sounds).
- **Cards layout:** sprites on the left or the right.
- **Visual novel:** the dialog box on the left, with an adjustable width.
- **Backgrounds** fade into each other when you move.
- **Character picker:** folders keep their color.

### Home

- **This Home** comes first in the menu and holds the Home settings.
- **Company stays:** someone who comes along with you stays until you part (no timer), and can go to your room
  with you.
- **More kinds of family ties.**
- **Bedroom doors:** someone's room when they're not in is locked (no more ringing a doorbell inside the house); when
  they're in, you knock.
- **The menu** no longer repeats "Go to my room" and "Go out" (they're on the top bar).
- **What you can do fits the room:** eating and drinking in the kitchen (everything) and the dining room (a meal, a
  coffee, a drink, a snack); the TV and the new **Play video games** in the living room; washing up (a shower, the
  new **Brush your teeth**) in the bathrooms. Rooms you set up yourself in the Home creator keep your choice.
- **Things to do in each room:** swim, sunbathe or relax by the pool; do the laundry; tinker or wash the car in the
  garage; sit on the porch or water the plants; tidy up the storage room; set the table; read in bed. Working out
  (the treadmill too) is in the gym.
  Your own Homes get the same: a room called "Piscina", "Garage", "Banheiro"… gets the actions of that kind of room
  (by its name, in English, Portuguese or Spanish).
- **Homes you made before** are brought up to date when they open: they get the actions added since and lose built-in
  ones that no longer exist. Actions you made yourself are never touched, and one you remove stays removed.
- **Go out** from the garage and the entrance too, not only from the floor plan.
- **Go somewhere else:** when you are out, go on to another place (the cinema, then the mall, then a restaurant…)
  with its own name and background; who is with you comes along.
- **Running into someone:** stopping to talk no longer makes them follow you. They stay where you met for a while.
- **New pictures** for Stella and Seraphina in the tour.
- **Needs, if you want them:** This Home → Needs turns on hunger, thirst, mood and hygiene for this game (off by
  default). Their icons show under the clock, they drop with time, and the AI is told when one is low. No energy, and
  nothing bad happens when one runs out.
- **The Advanced switch** at the top of This Home is easier to see.

### First steps, tour and gallery

- **Choose your language first:** the first time Mundi opens, before Stella shows up, a window asks only for the
  language (English, Português (Brasil), Español). The welcome and the tour then come in that language.
- **Stella's tour box** stays in the same place and the same size on every step, so the buttons (Skip tour, back,
  Next) never move. The text is bigger, the step count sits next to the buttons, and Stella is shown whole from the
  waist up, standing on the box's bottom line.
- **Gallery:** two tabs, **Saves** and **Character greetings**. Saves are one grid, newest first, with the game's
  name under each album (before, every game had its own row, so it looked like a list).
- **Settings → Game → What's new** opens this version's changelog instead of the tour.
- **The Old Manor** has a cover picture.

### Fixes

- **Playful slaps and teasing** no longer cost bond: a harsh line only counts if the character takes it badly (the
  emotion of their reply, or, without the Expressions extension, the words of it: they laugh, or they pull away in
  tears). Said with a grin, "de leve", "playfully"… it doesn't count at all.
- **Family and ties:** someone added later as your spouse (or fiancé, or partner) shows as Married (Engaged,
  Dating) and is no longer a stranger. Before, this only worked when set while creating the game.
- **Rooms off the floor plan:** a guest sleeping in a shared room no longer creates a room that isn't on the plan.
- **Scene background:** the floor plan no longer gets stuck in the background after you move.
- **The phone** no longer slides in again when a dialog opens.
- **Exporting a world** now takes along the backgrounds you picked from your own SillyTavern (My backgrounds),
  so the person who imports it sees them too.

## 0.2.0 · 2026-10-25

Everything since 0.1.0 (the last version on GitHub, commit `33837e1`).

### Highlights

- **Home**, a new way to play: one house, the characters you choose, and pure role-play.
- **Porto Alto**:
  - a picture for every place;
  - three kinds of apartments and houses;
  - a new gym and a new cinema.
- **A living world**: people with full days, places that get busy and quiet, day and night, and news from the
  lives of the people you know.
- **The interface in Português (Brasil) and Español.**
- **Save safety**: migrations, automatic backups and branches.
- **The RPG mode and the medieval style** are built but locked ("Soon") while they get finished.

### Home mode (new)

- **What a Home is:** a house and the characters who live in it, with no work, money or bills. Life outside
  happens off-screen.
- **Two ready Homes:**
  - The Shared House (modern, three floors, ten bedrooms, a new Entrance);
  - The Old Manor (medieval, locked for now).
- **The Home creator:**
  - premise;
  - rooms;
  - bedrooms;
  - cover picture, which can also be one of the room pictures.
- **New game in a Home:**
  - choose the rooms the house has;
  - choose what can be done in each room;
  - add rooms of your own;
  - write your situation, or let your AI write the premise from lorebooks.
- **Floor plan (optional):**
  - one picture per floor, with day, afternoon and night versions;
  - each room drawn as a box: drag to move, drag the corner to resize;
  - floor buttons with the faces of who is on each floor;
  - a red "!" marks rooms not on the plan;
  - without a plan picture, the room pictures are grouped by floor.
- **Time:**
  - the clock moves a few minutes with each message (can be turned off);
  - click the clock to let time pass;
  - sleeping brings you back to where you went to bed.
- **Go out:**
  - write where you are going, pick who comes and a background;
  - the scene out there is free, like a chat;
  - **Back home** asks first.
- **Who lives here:**
  - change bedrooms (two people in one bedroom share it, and the AI knows);
  - someone can move in or move out during the game, with a confirmation.
- **Dress code per room:** an outfit folder from the character's Expressions (swimsuit at the pool, pajamas in
  the bedrooms…). The AI is told what people wear.
- **Housemates:**
  - can go out for a while, or stay in;
  - each can have a job written in your own words, with a shift.
- **House party:** free; everyone leaves their rooms for the common areas.
- **This Home settings:**
  - Bedrooms, Home and Dress code;
  - a new **The house** tab: rooms on or off, what can be done in each, your own rooms, and the floor plan (for
    Homes you made).
- **Difficulty** in a Home changes how fast bonds grow.
- **One long conversation:** moving between rooms or going out no longer hides what was just said from the AI.
  Only sleeping starts a new day.
- **Bathrooms and shower rooms** no longer offer snacks or drinks.
- **Liquid-glass windows:** Let time pass, Go out, Back home, Who lives here and the pickers.

### Porto Alto

- **Pictures:** a background for every place (45) and for six kinds of home:
  - small apartment, apartment, penthouse;
  - small house, house, villa.
- **New places:**
  - **Palm Coast Gym**, apart from the **Stadium**;
  - **Cineplex** in Midtown ("Watch a movie" moved there).
- **The elevator ride** when arriving at an apartment was removed.
- **Map cards:** a place with a long card (many jobs) now shows it beside the pin, so the pin can still be clicked.
- **The HUD on maps:** the clock, the place name and the map tabs never overlap, at any HUD size.

### Life in the world

- **Day and night:**
  - opening hours;
  - prices and the mood of the streets by part of the day;
  - a picture per part of the day for places, homes and maps.
- **Regions:** each has a crowd level, a public mood, tension, weather and prices that drift day by day.
- **People's days:**
  - routines get interrupted (sick at home, errands, working late);
  - places remember regulars;
  - over the weeks, couples get engaged, marry or break up, and people get promoted.
- **Things that come to you:**
  - neighbors knocking;
  - friends asking your advice;
  - news of birthdays, promotions and weddings.
- **City events** (shows, matches, fairs, open mic) and **festivals**, in the calendar.
- **Hobbies** that level up: some jobs ask for a level, and it raises what they pay.
- **Habits that become traits** (Early riser…), and fade when you stop.
- **Other systems** (each can be turned on or off per world in the World creator):
  - reputation per town and secret identities;
  - pets;
  - apprentices;
  - letters from friends in other towns;
  - schools with exams and clubs;
  - factions and guilds;
  - the realm and its gods;
  - trade and smuggling;
  - property, businesses, a garden and loans;
  - taxes;
  - crime and prison;
  - celestial events.
- **The AI context:** a token budget, with the least important blocks dropped first. Each block's text can be
  edited, and you can add your own instructions.

### Characters, scene and chat

- **Sprites:**
  - overlap like a stage, and whoever spoke last stands in front;
  - click a sprite for a radial menu with actions and outfits.
- **Outfits:** subfolders of a character's Expressions (pajamas, swimsuit…).
- **Persona:**
  - switch persona in a chat or a Home, optionally renaming your earlier lines;
  - **Play as** in a World now has **Use another persona** too.
- **Chat look:**
  - visual novel, Classic or Cards;
  - sizes and colors with transparency;
  - colors from a SillyTavern theme;
  - presets (Midnight Glass, Rose Dusk, Forest Calm, and your own, saved as SillyTavern themes).
- **Images:**
  - pictures in messages, with a lightbox;
  - an Image Generation button;
  - TTS and Speech Recognition support (Settings → Add-ons).
- **Background pickers:** two sources, **My backgrounds** (SillyTavern's) and **Mundi** (the pictures of Mundi's
  worlds).

### Library

- **Folders** for characters, personas and lorebooks:
  - drag cards into folders (they move, nothing is copied);
  - rename, color, sort and export a folder as a zip.
- **Sorting:** by name, date, last chat, tokens or entries. Folders follow the same order.
- **Characters:**
  - alternate greetings;
  - tags;
  - expressions and outfits;
  - export as PNG or JSON;
  - the saves they are in.
- **People presets:** a group of characters with their households and relations, usable in any world.

### World creator

- **More tabs:**
  - Words (lexicon);
  - Character creation;
  - Customs & calendar;
  - Realm & factions;
  - Economy & skies;
  - RPG (locked).
- **Setup:** systems on or off, game modes, style and skin.
- **Maps:** per-period pictures, opening hours, crowd and region mood.
- **Homes:**
  - expenses (water, power, firewood…);
  - things that break at home;
  - the house maps editor for Homes.
- **New world:** start from a ready world or from nothing; the name field is highlighted if it is missing.

### Saves

- **Migrations** keep old saves working.
- **Automatic backups** (the last 3) before a migration or a repair; restore them in Settings → Game.
- **Make a branch:** a copy of the save as it is now.
- **A save from a newer Mundi** opens read-only.
- **A room added to a Home after the game started** is turned on by itself.

### Languages

- **Português (Brasil) and Español**, in Settings → Interface → Language. Only Mundi's own screens are
  translated: the worlds' places and people and the story keep their own language.

### Updates and onboarding

- **What's new:** after an update, a window with what's new, and a short tour by Stella of only the new things.
- **Update notice:** on the main menu, a small note when a newer Mundi is on GitHub, with an Update button.
- **Stella's tour** has a **Home** part. Settings → Game can replay any part, or only what's new.
- **Help** has its own topics in a Home: time and sleep, the house, going out.

### Look and settings

- **Settings tabs:** Game, Sound, Interface, Add-ons.
- **Look:**
  - date and time formats;
  - fonts;
  - theme and secondary colors;
  - skins;
  - separate scales for phones.
- **Background music:** menu, world and home, with crossfades.
- **Main menu:** a map behind it, and the real version in the footer.
- **World cards** show only the cover (no slideshow).

### Locked for a later update

- **The RPG mode:**
  - character sheet, classes, magic, quests;
  - combat (tactical or narrative), party and sellswords;
  - journeys, towers, contracts, crafting, artifacts, legends.

  Worlds made for it, like **Nova Vega**, show "Soon".
- **The medieval style:**
  - **Valdoria** in Life-Sim, with the journal in place of a phone: letters, a market of pinned notes, a medieval
    almanac, lodgings by town;
  - **The Old Manor** Home.

  They show "Soon · Medieval".
