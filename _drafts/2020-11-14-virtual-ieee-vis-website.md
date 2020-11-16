---
layout: post
title:  "Making the IEEE VIS Conference Virtual"
date:   2020-11-14 12:30:00 -0800
categories: vis ieeevis
teaser: virtual-vis/teaser.png
excerpt: "A little write-up of how we built the IEEE VIS virtual website experience."
---

I'm not sure how we all did it, but we pulled it off!  Normally the highlight of the year for academics interested in and studying data visualization and its applications descends on a city for a week to share research progress, build collaborations, and learn from one another.  With the COVID-19 crisis, what was supposed to be [IEEE VIS 2020 in Salt Lake City](http://ieeevis.org/year/2020/welcome) eventually needed to be hosted online.

**Check it out at** [**https://virtual.ieeevis.org/**](https://virtual.ieeevis.org/).

<div class="my-2 embed-responsive embed-responsive-16by9" style="width: 100%; height: 0px; position: relative; padding-bottom: 56.250%;">
    <iframe class="embed-responsive-item" src="https://streamable.com/e/szcrlw" frameborder="0" width="100%" height="100%" allowfullscreen style="width: 100%; height: 100%; position: absolute;"></iframe>
</div>

(above is an excerpt from the end of [the introduction video](https://www.youtube.com/watch?v=TRVB7399ynY) hosted on [the virtual IEEE VIS homepage](https://virtual.ieeevis.org/))

What follows is a write-up of how we [adapted the conference to go online](https://virtual.ieeevis.org/).  We'll describe the high-level goals, then describe the technical challenges and the way we addressed them.

The IEEE VIS Web team for 2020 was comprised of [Alper Sarikaya](https://alper.datav.is/), [Jagoda Walny](http://research.jagoda.ca/), and [Steve Spetruzza](https://www.sci.utah.edu/people/spetruzza.html), with much assistance by [Hendrik Strobelt](http://hendrik.strobelt.com/) (as Archive chair) and [Will Usher](https://www.willusher.io/) (as Tech chair), as well as input from [the rest of the organizing committee](http://ieeevis.org/year/2020/info/committees/conference-committee).

If you're interested in the streaming setup and data management behind virtual IEEE VIS 2020, [go read Will's blog post](https://www.willusher.io/general/2020/11/13/vis2020-streaming-infrastructure)!  I know I learned a lot reading it...

---

## Deciding which website infrastructure to use

The [main IEEE VIS website](http://ieeevis.org) is statically hosted on S3, and built with Jekyll; [see our GitHub repository](https://github.com/ieee-vgtc/ieeevis.org).

We had a re-design of the classic website ([example from 2018](http://ieeevis.org/year/2018/welcome)) in 2019, which kind of complicated up our build process.  Thankfully, GitHub actions helped minimize our interaction with this complexity; you can see [an example deployment action script here](https://github.com/ieee-vgtc/ieeevis.org/blob/master/.github/workflows/staging.yml).  Prior to 2019, all years of IEEE VIS were built in a single Jekyll site.  This made it quite difficult to make distinct styling changes as each year has, for example, unique color styling.

For the redesign, each year gets its own branch ([vis2019](https://github.com/ieee-vgtc/ieeevis.org/tree/vis2019), [vis2020](https://github.com/ieee-vgtc/ieeevis.org/tree/vis2020), and now [vis2021](https://github.com/ieee-vgtc/ieeevis.org/tree/vis2021)).  The action builds each year to a relative path (e.g., vis2020 gets built to `_site/year/2019/`), then does some link cleanup.  We use the Python boto3 library to then help synchronize the built website with our S3 bucket ([our example sync_with_boto3.py script](https://github.com/ieee-vgtc/ieeevis.org/blob/vis2021/scripts/sync_with_s3_boto.py)).

We maintain a "staging" environment with current changes in the repository, and stage changes for "production" (the live ieeevis.org site) by creating [a GitHub release in the latest year](https://github.com/ieee-vgtc/ieeevis.org/releases).

**All this to say** that we were kinda stuck with a static file serving infrastructure.  Our costs are already quite low with S3, though we did not have to host large amounts of images or videos on the website.  That clearly needed to change with a virtual conference—what's a virtual visualization conference without media?!

IEEE VIS is a six-day, multi-track conference.  Last year, there were six parallel sessions at all conference times.  To support live interaction across the world, the decision was made to make this *seven* instead, and reduce the conference day to 7 hours (8:00 - 15:30 MT; 30m "lunch" break) instead of the typical 8.5 hours (9:00 - 17:30; two hours for lunch).

From our viewpoint, a virtual conference needed to satisfy the following requirements:

* Be accessible to people all across the globe,
* Understand the daily layout of sessions and identify those to watch live,
* Quickly allow attendees to find resources related to topics of interest, and
* Promote serendipity in identifying interesting presentations/workshops/events to participate in.


## The tech stack

Our requirements for IEEE VIS were as follows:

* Host a website that organizes presented work and correlates the work with the live presentation, chat platform, fast-foward (preview) videos, abstract, and teaser image + caption,
* Make PDF and other conference-only materials available, but subject to IEEE restrictions (only available to conference attendees), and
* Provide a landing page for each piece of content presented at the conference (full papers, workshop papers, short papers, panels, keynotes).

As a result, this is the tech stack we landed on.  We'll expand on each below:

* MiniConf — Virtual conference website infrastructure
* Auth0 — Client-side authentication
* BunnyCDN — Global content distribution (10&times; cheaper than AWS Cloudfront!)
* AWS S3/Cloudfront — Static site hosting + HTTPS/SSL support

Due to our relative inexperience in constructing virtual communities from scratch (we're academics, after all!), the following eventually became **non-goals** for the website *but should not be ignored for virtual conferences*.  We ended up resolving these in different ways outside of the website (see "[Reflections](#reflections)" at the bottom of this post):

* Building community
* Promoting serendipitous interactions between attendees

### MiniConf

[MiniConf is explicitly designed to support virtual conferences](https://github.com/Mini-Conf/Mini-Conf).

Created by Hendrik and [Sasha Rush](http://rush-nlp.com/), it provides an data-driven infrastructure built on top of Python 3's [Flask webserver](https://flask.palletsprojects.com/en/1.1.x/).  MiniConf is set up to take data in (such as paper information, workshop information), provide routes to individual papers (e.g., a template link to `paper_<paper_id>.html`), and support associated templates for input data.  MiniConf also supports a "calendar" view by use of the [Toast UI Calendar library](https://ui.toast.com/tui-calendar).

IEEE VIS is strongly focused around sessions as a scheduling unit, not papers.  While papers are the meat of the conference, attendees tend to attend a single session at a time.  (While this assumption is okay for an in-person conference, it may or may not hold for a virtual one.)  MiniConf had no native support for sessions—or any hierarchical organization of papers—so we needed to add this into the implementation.

From collaboration with the paper, poster, workshop, tutorial, community, and panels chairs, in conjunction with the tech team, we generated an Excel sheet that was the "one version of the truth" for the entire conference ([see more in Will's post](https://www.willusher.io/general/2020/11/13/vis2020-streaming-infrastructure#31-schedule-management-with-excel-and-python)). The tech team had a script to dump out two JSON files: one with session-specific information (`session_list.json`), and the other for paper-specific information that populated the virtual website (`paper_list.json`).

The session list contained sessions organized under events ([see example](https://github.com/ieee-vgtc/vis-virtual-website/blob/master/sitedata/session_list.json)).  Each session was linked to single YouTube session or Zoom conference and contained a list of "timeslots" that referenced one or more `paper.id`s.  The paper list contained paper-specific information ([see example](https://github.com/ieee-vgtc/vis-virtual-website/blob/master/sitedata/paper_list.json)), including the title, authors, teaser image, fast-forward link, and abstract.

Both sessions and papers were assigned identifiers manually constructed in the Excel file.  These identifiers were considered to be "[slugs](https://en.wikipedia.org/wiki/Clean_URL)" for sessions, and otherwise re-used the identifier in the paper submission system, prefixed with the event type ("f_" for full paper, "w_" for workshop paper, etc.).  With these identifiers, we could cross-reference content in the virtual website.

---

[**We created a branch of MiniConf called "vis-virtual-website"**](https://github.com/ieee-vgtc/vis-virtual-website/) to make our changes.  Specifically, we made the following changes to the MiniConf infrastructure ([the core functionality is in main.py](https://github.com/ieee-vgtc/vis-virtual-website/blob/master/main.py)):

* Styled MiniConf to match the IEEE VIS website design; this involved some re-organization of styles to make typography and such consistent.
* Hydrate the concept of an event > session > paper hierarchy for the loaded static data.  This involved making sessions "fully-qualified" by pulling data from the parent *event* and pulling data from child *papers*.
* Organized sessions by day (see `generateDayCalendars()`) for the benefit of the TUI calendar widget for concise, data-driven session listings [on the schedule page](https://virtual.ieeevis.org/calendar.html).
* Ensured that the routes (e.g., `session_<session_id>.html`) and associated templates (e.g., "session.html") for rendering events, sessions, and papers had enough information to render all necessary content.
* Added a breadcrumb for an attendee to understand where they were in the hierarchy of event > session > page.

**Example images:**

[**Example session**](https://virtual.ieeevis.org/session_cga-papers-vis-masses.html) — YouTube embed of presentations front-and-center.  The listings of all content is listed below the video.

![Example session page with breadcrumb, video link, and metadata](/assets/img/virtual-vis/miniconf-session.png){:class="img-fluid"}

[**Example paper**](https://virtual.ieeevis.org/paper_f-info-1036.html) — breadcrumb at top and links to presentation with dynamic date strings.  A "LIVE!" designator would show up if the paper was in the process of being presented.

![Example paper page with breadcrumb, teaser image, presentation/PDF links, and abstract](/assets/img/virtual-vis/miniconf-paper.png){:class="img-fluid"}

**Paper browser**<br />
MiniConf had built-in support [for a paper browser](https://virtual.ieeevis.org/papers.html?filter=titles).  We improved the existing infrastructure by making the following changes:

* Added a "bookmark" and "visted" system to highlight papers that had been viewed before, and allow attendees to mark papers as interesting.  Attendees could then sort by not-seen papers or bookmarked-but-not-yet-visited papers.
* Added session information; could search by session title or find other papers presented with in a specific session

![MiniConf's paper browser](/assets/img/virtual-vis/miniconf-paperbrowser.png){:class="img-fluid"}

**Calendars and time zones**<br/>
This was critical to handle for a global, virtual conference.  A terrible distinction that we discovered about IEEE VIS's timing is that it is scheduled at a time where Europe is not observing daylight-savings time (DST), but North America is!  This leads to terrible offset bugs when viewing "global" GMT-normalized times from inside or outside DST.  All times in our datasets were stored as [fully-qualified ISO 8601 strings](https://en.wikipedia.org/wiki/ISO_8601) with the timezone included.

For displaying times in the local timezone, we use a HTML dropdown menu populated by [moment.js](https://momentjs.com/docs/) with all timezones [on the schedule page](https://virtual.ieeevis.org/calendar.html).  If no timezone was picked by the attendee, we used the browser-reported timezone to compute local times.  If a user selected a specific timezone from the dropdown, that timezone would be saved in `localStorage` and used for all date formatting methods: `moment(date).tz(myTimezone)`.

For date formatting in HTML, we used several date utility functions defined in "[timezone.js](https://github.com/ieee-vgtc/vis-virtual-website/blob/master/static/js/views/timezone.js)" and the footer of "[base.html](https://github.com/ieee-vgtc/vis-virtual-website/blob/master/templates/base.html#L240)".  If we were loading date data into the template, we would tag the global time with one of these classes (e.g., `format-date-span-full`) to format the date client-side.

For date formatting in the TUI Calendar system, we bashed our heads on it all the way up to 1 day after the conference started.  Events are organized to conference days based on Utah time (Mountain; -0700 GMT at the time).  In a particular timezone, events on a specific day may run into the subsequent day.  We wanted to ensure that attendees were not confused about this distinction, and that they understood that all times were in their local timezone.

You can see our hacky implementation in "[calendar.js](https://github.com/ieee-vgtc/vis-virtual-website/blob/65ba2558e498c0e6e7dd7f7bbf2fd74fd50f4c00/static/js/views/calendar.js#L87)".  We made several design decisions:

* We hard-coded the dates of the conference.  TUI Calendar only supports either 7-day or 1-day views.  For a six-day conference, we wasted a day column's space with nothing.
* We stored and generated the calendar based on GMT (did not pass localized dates to the calendar).  We forced parsed these dates to be GMT; if a user was in PDT (-7), seven hours was added to the date.  This was necessary because single-day views strictly only showed events from 0:00 to 24:00; if a user's timezone made a conference day's events straddle midnight, it would only render the first day's events.
* We manually updated the times shown on the calendar grid to call out if times were moving to the next day (e.g., 01:00 on the following day would be rendered as "+1d 01:00").
* We manually curated the data to hide text within a session if it was not called out as "important" for the weekly view
* We used a concept of `start` and `raw.realStart` on calendar events that were overlapping; this allowed us to neatly stack items instead of wasting horizontal space.

![Showing the virtual IEEE VIS calendar, with the timezone set to Tokyo.](/assets/img/virtual-vis/miniconf-calendar-tokyo.png){:class="img-fluid"}

This resulted in a quite-stable calendar interface and we were quite happy with the result.

**In closing (for MiniConf)...**<br/>
Additionally, we made several additions to support the publishing of awards and keynotes, but those were quite-straightforward: adding routes and associated templates.

We hope to back-load our changes into the base MiniConf implementation, but needed to take a much needed respite after the conference!  In the meantime, if you are stuck on any of these issues, please don't hesitate to reach out.


### Auth0

We needed to protect our IEEE-restricted resources such as images and presentations during the course of the conference.  To do so, we took advantage of the client-side authentication library that Auth0 provides.

We marked resources in MiniConf with a `requires_auth` flag.  If this flag was active, JavaScript on that page was activated to remove content and check the authenticated status of the current client (see "[auth0project.js](https://github.com/ieee-vgtc/vis-virtual-website/blob/master/static/js/modules/auth0protect.js)").  If the user was not authenticated, then they are redirected to a well-known "redirect.html" page, where Auth0 can callback to after logging the user in.  A query parameter of "return" is used to redirect the user back to the content they were trying to access.

We also added some quick JavaScript on the homepage sidebar to alert them to their authentication status.  All pages that check authentication status must be enumerated in the app's configuration in Auth0; see below for an example.

![Showing the Auth0 config; URIs must be set to all local/staging/prod environments](/assets/img/virtual-vis/auth0-config.png){:class="img-fluid"}

**Populating the Auth0 database**<br/>
We needed to automatically populate the Auth0 database so that conference registrants could quickly access resources within minutes of registering.  Unfortunately, we got caught in a quagmire where a company contributed technology to register people but did not help in directly interfacing with Auth0.  To make matters worse, we also had a separate registration path for paid participants, either because they contributed content to the conference or wanted a copy of the conference materials.  We did not have dynamic, direct access to that second system, so we fielded on the order of sixty requests asking what was going on.

To try and mitigate this, we built a Python script that ran every 5 minutes.  It could directly connect to the free registration data source and register new attendees, or be manually triggered with a CSV from the second system and register those attendees.  To prevent duplicate users, we considered the e-mail to be the unique identifier, and kept this list locally to check against all new registrations.

When a user was successfully registered in Auth0, we queued up an e-mail to send that user their auto-generated password and instructions for accessing the virtual conference (along with a Discord invite link) using Amazon SES.  [See Will's blog post for more details on sending e-mails](https://www.willusher.io/general/2020/11/13/vis2020-streaming-infrastructure#35-sending-emails-with-amazon-ses).

Check out our script to do this all: [transfer_tina.py](https://github.com/ieee-vgtc/vis-virtual-website/blob/master/scripts/transfer_tina.py).

**Why authenticate?**<br />
Authors needed to agree to a waiver in order to have their presentation saved in perpetuity after the conference.  For those presenters that declined to sign, livestream recordings were edited post-hoc to remove their content, then re-posted to the website under a new YouTube URI.  For this reason, we also protected the session pages so that non-attendees would have a harder time to find live presentation links.  Paper pages contained PDF links, which were only available to registered attendees for the conference.

This method of authentication is not a foolproof mechanism, made more difficult by the fact our webserver is completely static (just an AWS S3 bucket).  Further considerations would need to be made if absolute privacy of the conference is required.  Additionally, we did not have strong linking between users registering for the conference and using resources such as Discord or YouTube to participate in discussions; banning a specific participant for [a Code of Conduct violation](http://ieeevis.org/year/2020/info/inclusion-and-diversity/code-of-conduct) may have been very difficult.

**Removing authentication**<br />
At the conclusion of the conference, we left authentication active for two weeks to allow conference attendees to see presentations and quickly access PDF data.  To disable authentication, we simply updated the parameter value `use_auth0` in [config.yml](https://github.com/ieee-vgtc/vis-virtual-website/blob/master/sitedata/config.yml) to False.

At this time, we also stopped the authentication Python script, destroyed the registered users list, and removed PDF content from the CDN.

**Cost**: We were able to use Auth0's services for *free* as we stayed under the 7,000 user limit (6.5k registered!).


### BunnyCDN

We ended up choosing [BunnyCDN](https://bunnycdn.com/) as our content delivery network provider.  Their prices were up to 10&times; cheaper than Amazon, and allowed for simple upload via FTP.  All content organized by the Tech team (images, ICS files, PDFs) was loaded into the CDN.  We elected not to redundantly host this content on S3 to save space ($), so files were manually uploaded/updated.

![Image of CDN organization: files organized into folders such as "ics", "paper_images", and "pdfs"](/assets/img/virtual-vis/cdn.png){:class="img-fluid"}

Keep note that URLs need to "invalidated" whenever content updates.  CDNs work by only fetching content from a well-known origin and replicating it to global nodes if it isn't found in a global node—invalidation tells all global nodes to immediately forget about their local copy and re-fetch designated resources from the well-known origin.

For ICS files in particular (which held session information that could update as the conference data stabilizes), we listed the contents of the ICS directory and invalidated them using BunnyCDN's interface.

![Purging ICS URLs after updating](/assets/img/virtual-vis/cdn-purge.png){:class="img-fluid"}

**Cost**: Running this service cost about $4 for 0.2 TB transfered globally from all nodes during the conference.


### AWS S3 / Cloudfront / Route 53

AWS setup is quite annoying and it seems like Amazon hasn't really graduated from 2003 design with their administration interface.  Here's the pitfall we repetitively fell into:

**Setting up HTTPS/SSL**<br/>
This is generally a good idea, and we were forced to use SSL by Auth0's library.

You need to use Cloudfront to host an SSL certificate.  We generated a wildcard SSL certificate through Amazon's certificate provider for `*.ieeevis.org`.

We then created a Cloudfront distribution for each unique subdomain (each hosted by a different S3 bucket).  The CNAME should be the external URL (e.g., "virtual.ieeevis.org"), and the certificate should be marked as "Custom" and linked via the ID (e.g., "*.ieeevis.org (ff03481f-...)").

The distribution must then be post-hoc modified.  The "Origin" is set up to be the S3 bucket, and the "Behaviors" is set up to redirect HTTP to HTTPS, and the Cache Policy changed to "Managed-CachingDisabled".

Ugh.  We're not interested in caching simple HTTP requests to the S3 bucket; the CDN already takes care of the heavy lifting of image/PDF content.  This may be different in your case, but note that *you must invalidate updated resources in your S3 bucket every time you deploy an update*.  We didn't think this was worth us figuring out, so we just disabled caching.

![Disable Cloudfront caching](/assets/img/virtual-vis/aws-cloudfront-caching.png){:class="img-fluid"}

Lastly, you need to update your domain provider to point at Cloudfront instead of the S3 bucket directly.  Take the ID out of Cloudfront and plop it into the A name for the (sub)domain.  The dot at the end of the URI is important, otherwise things will fail silently.  Please don't ask why—we ain't sysadmins!

![Add Cloudfront URI to Route53](/assets/img/virtual-vis/aws-route53.png){:class="img-fluid"}

If you run into additional issues with using Amazon's infrastructure, please let us know.  Hopefully we can share more of our pain here; there's a lot of junk we set and completely forgot about years ago.

**Cost:** Running all these various AWS services (~15 S3 buckets and associated traffic costs, 4 Cloudfront hosts, many Route 53 routes, and certs) cost on the order of $40 / month.

### Reflections

Below is a set of considerations we grappled with in planning and executing the conference.  We'd be interested in hearing others' experiences.

**Building community**

We elected to use [Discord](https://discord.com/) as the community chat platform.  Besides being free, it had significant advantages over Slack in supporting voice/video communication between attendees, organizing discussions into hierarchical channels, and being very easy to script against (see [Will's blog post](https://www.willusher.io/general/2020/11/13/vis2020-streaming-infrastructure#34-discord) for more details on that).

To support our colleagues in China (where DNS listings to Discord servers are blackholed), we included the [Titan Embeds](https://titanembeds.com/) on the session page to the respective Discord channel.  The [tech committee also implemented chat synchronization](https://www.willusher.io/general/2020/11/13/vis2020-streaming-infrastructure#42-chat-synchronization-bot), which redistributed messages between YouTube chat and the session-linked Discord channel.

Using Discord manifested itself in several different ways:

* **Paper sessions** — In-person, these events are lecture-style, moderated by a session chair, who keeps presenters within timing parameters, moderates questions, and acts as narrator for transitions during paper presentations.  Virtually, we kept this similar, but the Discord channel acted as a dynamic backchannel during paper presentations, quite different from the typical quiet, attentive audience in a lecture hall.  The session chair collected questions for the current paper as they came in.
* **Panel sessions** — For several workshops, organizers wanted to broadcast a panel of participants.  Those presenters would all join a private Zoom call, which was then broadcast by a technician to YouTube via OBS ([read more](https://www.willusher.io/general/2020/11/13/vis2020-streaming-infrastructure#2-obs-configuration)).  Discord was used by the panel organizers to seed further discussion.
* **Interactive sessions** — For several workshops and tutorials, organizers wanted attendees to interact with one another.  In that case, we eschewed YouTube and provided a direct Zoom link instead.  These links were only available on webpages protected with authentication.  We did observe Zoom breakout rooms being used to decent effect, but that responsibility was built between the student technician and the workshop/tutorial organizers.
* **Poster sessions** — The conference utilized [iPosters](https://ipostersessions.com/), a tool to support dynamic poster-like boards.  Each poster (~60) had their own Discord text and voice channel.  Conference attendees were encourages to view the posters during a prescribed poster session time (1.5 hours), then jump into the appropriate Discord voice/text channel to chat with the authors one-on-one.
* **Not linked to any content item** — Created after the conference started, several topic-agnostic "hallway" voice channels were created to help people connect within the scope of the conference.

In general, attendees noted that they were happy to follow along with the banter, some even commenting that the barrier to ask a question of presenters was lowered (there was not a need to wait at a microphone in the center of the room).  However, others observed that conversations (particularly in popular sessions) were consistently driven by a select few attendees.

We had something on the order of 100 channels on Discord.  While we create a Discord FAQ page, we noted that some keyboard shortcuts were critical to help attendees navigate the conference, for example using `Ctrl-K` as a quick-switcher between channels as opposed to scrolling through the channel list.

With so many channels, it seemed to be hard for a non-author (e.g., typical conference attendee) to serendipitously meet others.  Typical session channels were very dynamic, but very quickly died down after the live presentations ended.  VIS is bolstered by its many nighttime parties, and those ancillary events using tools such as [gather.town](http://gather.town) or [Remo](https://remo.co/) seemed to help with promoting serendipitous interactions.  Due to time, we did not use these tools as first-party tools for building community.

We'd be interested in hearing how other conference organizers have dealt with trying to support building community, both between established members and newcomers.

**Paper browsing**

Users noted that while the paper browser was good, it was difficult for them to build a schedule of talks to see, and reference that list when attending the conference daily.  While this should be straightforward to implement, we ran out of time to do so.

**Strong authentication**

We did not spend too much time building a strong authentication system.  Registration for the conference was free, reducing the risk of people trying to "break in".  Additionally, there was not a strong link between Discord, YouTube, and virtual website accounts—this may be required for other conferences.  We'd be interested in hearing how others have tackled this problem, perhaps by requiring registration on all platforms with an attendee's full name?

### Acknowledgements

This work would not be possible without the support of the [organizing committee for IEEE VIS 2020](http://ieeevis.org/year/2020/info/committees/conference-committee).  Thank you!

If this blog post was helpful to you or if you have follow-up questions, please do not hesitate to contact us via e-mail (`web@[conference_domain]`) or on Twitter.
