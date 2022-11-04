---
layout: post
title: "Twitter: capturing basic info about all your followers"
date: 2022-11-04 12:00:00 -0700
categories: twitter api vis
teaser: pokemon.jpg
excerpt: "Capturing your follower's basic info so you make sure you follow them wherever you go next!"
---

Jen Christiansen [asked on Twitter of a tried and true way to get a list of all the people you follow on Twitter](https://twitter.com/ChristiansenJen/status/1588602542543757312).  Here's a quick type-up of how you can do it using the Twitter API, without using the command line!

#### Step 1 — Get API keys

[Request an (personal) API key](https://developer.twitter.com/en/portal/petition/essential/basic-info).

Request a key just for yourself, fill out some basic information, and pick a name for your "tool" (you usually have success with your Twitter handle). This process is semi-automated; for me, it just requested that I verify the e-mail attached to my Twitter account.

Verify your e-mail and you should land on a page with some secrets.  Copy them down if you wish, but it isn't necessary for the purposes of this document.  If you don't copy them, you can re-generate the secrets at a later point through the [developer dashboard](https://developer.twitter.com/en/portal/dashboard).

#### Step 2 — Authenticate to playground and get your userid

Once all that's set up, [navigate over to the API playground](https://oauth-playground.glitch.me).

Search for the `GET /2/users/by/username/:username` function (in the top search bar).  Enter your Twitter handle into the "username" field and hit "Run".  The app will ask you to authenticate, accept and the result set should include **your user id** in the right window.  Copy that down.

#### Step 3 — Get your follower list!

Now it's a matter of just calling the right endpoint!  Search for `GET /2/users/:id/followers`.

[In the playground](https://oauth-playground.glitch.me/?id=usersIdFollowers), put **your user id into the "id" field**, enter "1000" for "max_results" (the maximum allowable) then hit run.  Copy the result set locally, which contains a list of handles, user ids, and display names for the people you follow.

If you follow over 1000 people, you must use the pagination tokens at the bottom of the response.  Paste the "next_token" verbatim into the "pagination_token" field in the playground and hit "Run" again.  Note to save this separately from the first response locally; don't append it since it won't be valid JSON.

More info about [the v2 /users/:id/followers endpoint in the docs](https://developer.twitter.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-following).

I hope this info helped you out!  If it did, lemme know [on Twitter](https://twitter.com/yelperalp) or [Mastodon](https://vis.social/@alper).