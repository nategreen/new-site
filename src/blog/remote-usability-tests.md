---
layout: blog-post.hbs
title: "Usability II: Remote Testing with Loop11"
date: 2015-03-22
---

This week, we set up remote, unmoderated usability tests with Loop<sup>11</sup>. It was a bit of a train wreck---but probably an excellent primer for conducting quick usability tests in the real world, so to speak.

Before I launch into this, I want to make it clear that I am very grateful to Loop<sup>11</sup> for their generosity in letting our class use these tools in our assignments. Their platform really is neat, and if you haven't tried it out I recommend doing so.

## Setting Up the Test (and Discovering the Quirks)

[Loop<sup>11</sup>](http://loop11.com/) is really easy for moderators to set up, and for participants to use. There's no software for users to install, or anything like that. There are two different methods: a super-simple one-size-fits-all solution where you just feed them a URL and that's it, and a slightly more complicated solution where you embed some of their JavaScript on your site. Since we weren't testing our own sites, our class had to use the first one---which has some unfortunate drawbacks.

I didn't dig too far into it with Dev Tools, but basically, it wraps the site you're testing in an iframe and does some kind of magic (at least part of which is client-side JS) to track clicks and take screenshots and all that. It's pretty impressive, technically. There are significant limitations to what browsers will allow in an iframe, though, and things start getting downright messy when you have things like iframe-in-an-iframe (e.g. Google Map or YouTube video embedded in the site you want to test) and complex JS running on the site in an iframe.

Practically, what that meant for us was that we had to pick tasks very carefully so as to avoid features or pages on the testing site that were any fancy enough to break Loop<sup>11</sup>. In the real world outside of academia, let's say we're testing a competitor's site and we have to use Loop<sup>11</sup> because we're on a time and budget crunch. We'd have to do the same thing: design our test around the constraints given to us.

## My First Remote Test

We were given several categories of site to pick from, but I couldn't find any sites from those categories that worked to my liking with the testing platform. So, instead, I chose to test [Mozilla's Developer Network](http://developer.mozilla.org) site, knowing that a good percentage of my participants would probably be my classmates, colleagues, and friends who work in IT or graphic design. You can take the test, if you want, on a PC. Please don't take it more than once. :)

I was really impressed by how easy and intuitive it was setting up the test. I guess that's a benefit of using tools made for UX designers; they all seem to provide a pretty good user experience. (Fancy that.)

After taking several of my classmates' tests, there are a few things I'll do differently next time. I'd like to ask for some qualitative feedback after each task (was the task easy, difficult) and I think I would like to ask about age, gender, and tech-savvy differently.

Next week we'll be analyzing the results, so it'll be interesting to see how well we can tell which errors were caused by the design of the website, and which were caused by some kind of funkiness with Loop<sup>11</sup>.