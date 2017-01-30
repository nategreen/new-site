---
layout: post
draft: true
---

# Report batches in MRI Version X

MRI's flagship real estate management suite includes a global reporting system. Users can run a report by selecting it from the menu, setting up runtime options, and running or scheduling it to run at a later time. Once the report is finished, users receive a notification in the communication center, where they can open their report.

This reporting system already included a number of features designed for efficiency and ease of use:

- Users can schedule reports to run on a recurring basis
- Report options can be saved to "styles" and re-used later
- Reports can be automatically exported to Excel or PDF at runtime
- Reports can automatically be sent to other MRI users internally, or via email, when they're finished running

From user feedback, though, we learned that many users were creating packets of reports, sometimes on a regular basis, and the process for doing so was cumbersome and time-consuming; users had to export their individual reports to PDFs, then download them all and combine them and/or send them out using external tools. For some users, these processes would take hours or days, as they had to create tens or hundreds of reports or packets each month.

We saw an opportunity to dramatically improve the efficiency of this process, so we took it.

## Exploring the problem space

- Worked with development team and product managers to understand the current product
- Presented preliminary designs to user group for feedback, which validated our design direction

I was brought into the project after much of the initial requirements-gathering had been completed. The product management and development teams had been working on prototypes and trying to figure out how much of the framework-level work they could get done within the time allotted.

Being very new to MRI Software and the industry they served, I had to spend a lot of time familiarizing myself with the terminology, processes, and our current product capabilities. I wanted to have a thorough understanding of the ecosystem I'd be designing a solution for.

I worked with the product owner and some of the developers to get up to speed on what the reporting system was capable of, and what the new funcitonality was going to add to the mix.

As I was learning about the current system, I wanted to make sure that the new functionality was intuitive; not only that users could learn how to use it quickly, but also that the UI made it very clear what the system could (and couldn't) do.

## Design process

- Needed to develop a UI that would make it easy for users to understand the structure of the system
    + batches > reports > report options
- Lists of reports in different contexts needed to be the same but different information was needed at different steps
- New UI components designed to be modular and reusable
    + Generic, pluggable content and action types can be used or not, and the component should still be usable
    + Layout could be made responsive
- Before release, quick-and-dirty internal usability testing with other departments revealed that our tabbed interface was being used more like a wizard, and users were missing important functionality
- Changed the layout and flow to accomodate the natural mental model



## Results

- Stakeholders pleased with the results, usability
- Users at user conference were very excited about the efficiency increases
- Ended up with a bucket of suggestions for improvement and extension that should further increase the utility and usability


