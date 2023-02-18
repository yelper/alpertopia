---
layout: post
title: "Thinking About Accessibility Standards and Data Visualization"
date: 2021-01-01 08:00:00 -0800
categories: vis accessibility thoughts
# teaser: vis-2020-recap/teaser.png
excerpt: "Thinking out loud about _good_ standards for accessible visualizations and reports."
---

{% capture assetdir %}/assets/img/accessibility/{% endcapture %}

_This is a DRAFT; not ready for dissemination yet!_

Accessibility has been the top of mind of several of us on [the Power BI](https://powerbi.microsoft.com/en-us/what-is-power-bi/) team.  We reached a strong milestone last year in [achieving full keyboard interactivity within all elements of the report canvas](https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-keyboard-shortcuts), allowing full functionality for keyboard users and enabling new workflows combining keyboard and mouse interactions.

Our accessibility efforts are guided by online/software accessibility standards (e.g, [WCAG 2.1](https://www.w3.org/TR/WCAG21/)) as well as government regulations (e.g., [US Section 508](https://www.epa.gov/accessibility/what-section-508) and [EN 301 549](https://en.wikipedia.org/wiki/EN_301_549)).  These standards address how screen readers read out content and layout, as well as prescribing how users should be able to interact with elements using just a keyboard.  However, there is very meager discussion on what constitutes good practice for making a particular visualization—or more appropriately for the discussion here, a page, report, or dashboard full of visualizations—accessible.

A lot of the history of discussing accessible data visualizations focused on make sure that colors used were colorblind-friendly.  There are many more abilities to target than deuteranopia; Microsoft's document collection focusing on [inclusive design](https://www.microsoft.com/design/inclusive/) is a wonderful starting point for this discussion—if a little high-level.

This blog post tries to work toward a "good" standard for accessible reports using visualization.  This discussion is a little biased toward software engineering on a data visualization product, though a thorough discussion on accessible data visualization would also be needed.

I stand on the shoulders of others who have also worked in this space; other resources are linked near the bottom of this post ([jump down there now!](#other-resources)).

I am absolutely not trying to be authoritative in this post. Nothing here is set in stone, I just want to get this out there to generate some discussion and refinement.  I had hoped to provide more complete working examples within this post, but time pressure is keeping me from fleshing it out.  Note that I am not a lawyer nor speaking on behalf of private conversations happening at my employer (thanks CELA!). 🙃

---

Let's start by talking about the functionality to ensure content are accessible via common navigation tools, specifically these visualization-dominant reports.  In my mind, there are two primary functions to consider when designing accessibility: keyboard interactivity and screen readers.  Starting from the basics:

* **Keyboard navigation** — Enables limited-dexterity users to navigate between interactive elements in two-dimensional space and take action (e.g., change pages, cross-highlight a particular data point).
* **Screen readers** — Enables limited-vision users to navigate and consume content via a text-to-speech interface.  Generally has an additive mode named _scan mode_, which changes the keyboard navigation mode to instead get overview of narrative structure (headings and reading content aloud) instead of typical _navigation mode_ (finding and understanding available controls and interactions).

It takes _a lot_ of attention to detail to ensure that a visualization report is accessible.  There's a lot of consideration here that goes beyond making sure the right HTML tags, ARIA attributes and role, and interactive elements are being used and labeled correctly.  I won't go too much into depth into the full considerations here when designing an generalized, accessible visual interface, but here's a list of resources that I felt were helpful in my own learning journey:

* [WebAIM: Designing for Screen Reader Accessibility](https://webaim.org/techniques/screenreader/) — Understanding the difference between scan mode and nav mode for screen readers
* [W3C: WAI-ARIA overview](https://www.w3.org/WAI/standards-guidelines/aria/) — ARIA spec; what roles do and what attributes are required when tagging interactive elements
* []() — Considerations for focus traps, "natural" keyboard interaction and hinting

Note that there are further considerations that move a little bit more toward product design but are still critical for ensuring an inclusive interface for all users.  These considerations include learning support (think: tutorials) and alternative encodings (think: descriptive captions, natural-language interfaces).

Note that in this blog post, I'm completely leaving out discussion on picking good, discriminable and identifiable colors (visual design), and limiting motion (animation design).  Hopefully I'll pick it up in a later post, but check out some generalized resources at the bottom of the post ([jump to "Other resources" now](#other-resources))!

---

## What are the accessibility issues with reports/dashboards?

Based on my (relatively short!) experience with accessibility concerns in a software product, I've come to some high-level terms of how to manage concerns that come in.  These issues are frequently raised by "trusted testers" who are trained to follow government and organizational regulations.  For software sold to the US government, for example, these trusted testers' processes are governed by [the Department of Homeland Security to follow Section 508](https://section508coordinators.github.io/ICTTestingBaseline/)[^1].  The key thing here is that issues that come in are not necessarily end-users grappling with accessibility issues in the product but instead issues raised by these testers, so they're all pretty low-level issues that don't concern high-level workflow or understandability issues.  In my experience, these low-level accessibility issues come in one of the following flavors:

* **Overview** — It isn't clear how the page is laid out or how a user should interact with the page (should I use scan mode to find headings, switch between landmarks, or just tab to find interactive elements?);
* **Navigation** — It isn't clear to a user how to navigate or interact with a particular element, what elements can be controlled, or how the page is laid out; and
* **Labeling** — It isn't clear to a user what a control does, what a graph is communicating, or there is not sufficient color contrast between foreground and background (whether the OS's high-contrast mode or other accessibility support is/isn't on).

Tackling these issues as they come in feels like a never-ending game a whack-a-mole.  It's especially disheartening as a developer as it's difficult to make a decision at such a low-level; does this or that decision to label this chart piece make sense in the large scheme of things?  Making these spot fixes do not necessarily fix high-level organization or flow issues.

When it comes to making accessible visualizations and visualization-based reports, what's our high-level navigation goal?  Let's make sure that we support all users to be able to understand what's going on in the visualization and are able to interact with all of its controls.

### The ideal construction

In my opinion, **a visualization-based report should be navigable and allow the user to quickly understand the purpose and data characteristics communicated by the report.**  This means that a good standard to strive for is to use already-existing accessibility standards to:

1. create a navigation hierarchy (titles, textareas, visualizations),
2. label visualizations with the data characteristics they communicate, and
3. maintain a hierarchy of controllable interactivity within each visualization (pan/zoom, data point selection, etc.).

Report authors or those who create visualizations for business use generally do not fill in accessibility-specific information such as alt-text unless required to by their jobs.  This is quite unfortunate, as currently many business-specific applications (Excel, Tableau, Power BI) depend on **authors** to fill in alt-text to describe complex diagrams or photos.

With the advent of natural language systems and the widespread use of visualization specifications, one could imagine _automatically generating alt-text_, which would greatly reduce friction in authoring accessible and self-describing reports.  This would not just help those users that have vision deficiencies, but also helps to describe visualizations for those users that have limited experience reading and comprehending visualizations (also known as "visualization fluency").  To me, this is the most exciting part of thinking about visualization accessibility critically: it can help _all_ users realize the rhetorical power of informative data visualization.

---

## An example!

Let's work through [an example that my PM lead tweeted out recently](https://twitter.com/Will_MI77/status/1339350924049829889) ([direct link to report](https://app.powerbi.com/view?r=eyJrIjoiNmYwNzE5ZjMtNDNkMS00N2ZkLTkxNzMtMjYzODdhMDI4MmVjIiwidCI6ImFmZGIzOGQ2LTI0MTgtNDQyYS1hMDI1LWYwODY3MWYzMDRjYiIsImMiOjZ9&pageName=ReportSection5a881db4fd529e567fac)).

![Example report: textbox, two slicers, two summary bar charts, and a line chart broken up into 4-by-5 small multiples]({{ assetdir }}example_report.png){:class="img-fluid"}

There's a couple things at play here in this report.  There's an explanation _textbox_ in the upper-left, and two _slicers_ to filter the data based on dimension values (year, "theme group").  There are two "summary" _bar chart_ visualizations, showing the magnitude of parts per set and total sets per theme group.  Finally, the centerpiece is a _small-multiples line chart_ visualization, showing both average pieces and number of sets released by year, trellised by the theme group.

Let's tackle visualization-level accessibility first (_nav mode_), then move onto multi-visualization navigation (_scan mode_).

We should strive to keep keyboard accessibility as simple as possible; we should only require users to use (Shift-)Tab, Esc, Enter/Space.  Tab will move focus forward (or backward with the Shift key modifier) on the current control hierarchy level, Enter/Space will move focus down the hierarchy, and the Escape key will move focus up the hierarchy.  Initially, I thought arrow keys can be considered to be optional, as they would allow users to navigate complex layouts quickly (grids, trees, data points).  However, very recent discussions with others on my team have started to change this thinking a bit...

![Example visualization control grouping: title, axis ticks, plot area (with bars like a bar chart)]({{ assetdir }}vis_grouping.png)

In the above example visual (purple) taken from the example Power BI report, both the axis labels (orange) and data bars (green) can be interacted with.  The title (blue) is the heading, explaining the data being displayed, but is not otherwise interactable.  The navigation hierarchy is therefore:

* **Visual** (<span style="font-weight: bold; color: #6600FF;">purple</span>)<br>_Announces: Title (<span style="font-weight: bold; color: #3FA9F5;">blue</span>), Description (alt-text)_<br>_Type: Group_
    * **Plot area** (<span style="font-weight: bold; color: #7AC943;">green</span>)<br>_Announces: "Plot area"_<br>_Type: Group_
        * Data bar #1; _Announces: Item #1 of **n**, **selectable**, followed by all data properties mapped in the visualization_
        * Data bar #2; _Announces: Item #2 of **n**, not selected. Category: Sculptures.  Average parts per set: 2099_
        * ... etc
    * **Axis labels** (<span style="font-weight: bold; color: #FF931E;">orange</span>)<br>_Announces: "Axis labels"_<br>_Type: Group_
        * Axis tick #1; _Announces: Item #1 of **n**, **selectable**, followed by tick text (in this case, category labels)_
        * Axis tick #2; _Announces: Item #2 of **n**, not selected, Sculptures_
        * ... etc

When a user focuses on the visualization, the visual announcement is read out via the screen reader.  The user can then Enter to jump to the first group (<span style="font-weight: bold; color: #7AC943;">Plot area</span>), then can Tab to the second group (<span style="font-weight: bold; color: #FF931E;">Axis labels</span>).  They can then Enter into the axis labels to navigate among the ticks with arrow keys.

If the user then wants to navigate to the plot area, then can hit Esc to pop-out of the Axis labels group and Tab to the Plot area group.  One could imagine that regardless of the complexity of the interactions in the visualization, these groupings would help manage rapid navigation.
I would expect that the primary visual area (in this case, the <span style="font-weight: bold; color: #7AC943;">Plot area</span>) would always be the first group within the visual hierarchy, and that groups are arranged based on the frequency of their usage.

### A two-tiered keyboard navigation system

I think one of the key parts here is to take advantage of two-tiered navigation methods between controllable elements, which has led me to change how I think about arrow keys!  The first tier is to utilize Tab/Shift-Tab to navigate between plot hierarchical elements like the plot area and axis elements.  The second tier is to utilize the arrow keys for finer-grain control, such as to move between data points.

In a table, arrow keys have quite a natural mapping; up/down moves to the previous/next row, left/right moves to the previous/next column.  We adapted a similar mentality to the built-in visuals in Power BI: up/down moves to the next/previous series, left/right moves to the next/previous series.  For a bar chart (such as one shown in the image above), up/down and left/right are swapped to map the visual layout. Sure, you can still tab, but arrow keys provide more information about the next data point you want to find.

Some recent discussions are making me rethink how tab + arrow keys interact, however.  Interactions between controls that themselves need finer grain control may even manage their own tab stops.  For example, tabbing would go to the "active" element within a control.  Hitting Tab again would move to the "active" element within the next control, and it would be necessary to Arrow to a different element/option within that control.  It's hard for me to prescribe whether one strategy is better than another; I would imagine that a core differentiator between these two approaches is the need to quickly switch between distinct controls.

[... would an image make this clearer??]


### Navigating the report using scan mode

As people working in the visualization space, we're already well-aware of the rhetorical power that good titles and captions lends to the comprehension of the related visualization.  Given good visualization titles, one can use these to "landmark" visualizations.  With element grouping, we can gather multiple components in a multi-visualization report to signify relationships among the items.  By combining these two strategies, we can provide a "scan-friendly" environment for a user wanting to get a overview of the information available in the report.



[... obviously a lot more to write]


## Other resources

---

EN 301 549 - 5.1.3.6
"The speech output for non-text content shall follow the guidance for "text alternative" described in WCAG2.1 Success Criterion 1.1.1."



https://www.w3.org/TR/WCAG21/#non-text-content
Success Criterion 1.1.1 Non-text Content

https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html



Outline:

Intro:
* what's the problem?
* what are the tools?
* what are the typical problems? (how do we receive feedback?)
* what's the need?
* what's a solution?

[^1]: Why the Department of Homeland Security has ownership over this (as part of their [Office of Accessible Systems and Technology](https://www.dhs.gov/office-accessible-systems-technology)) instead of being a part of a generalized federal department such as the [General Services Administration](https://gsa.gov) is a subject of a future post, once I understand the provenance.