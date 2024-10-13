---
layout: publication
articletitle: "ChartA11y: Designing Accessible Touch Experiences of Visualizations with Blind Smartphone Users"
presented: ASSETS 2024
conf: assets

bibtextype: inproceedings
publication: Proceedings of the 26th International ACM SIGACCESS Conference on Computers and Accessibility
authors:
- Zhuohao (Jerry) Zhang
- John R. Thompson
- Aditi Shah
- Manish Agrawal
- Alper Sarikaya
- Jacob O. Wobbrock
- Edward Cutrell
- Bongshin Lee
doi: 10.1145/3663548.3675611
number: 1
pagestart: 1
pageend: 15
publisher: ACM
location: New York, NY, USA
datepublished: 2024-10-27

link_paperlink: charta11y-preprint.pdf
link_suppl:
link_labrepo:
video_teaser:
video_paper:
website_project:
website_repo:
talk_slides:
talk_video:

thumbnail: thumbnail.png
figure1: narration-design.png
caption1: |
    The above figure shows an example of accessible naration design for scatter plots, including the bin, series, and cell levels.

    The narrations are designed hierarchically, providing some context for the data contained within the levels.  Figures of proportionality are prioritized first, with some descriptions of distribution and summary statistics later.

    A restatement of the text in the figure follows.

    **X-bin**: 22.2% of all points are in 40 to 45 Length bin. Points are very sparsely distributed from the mean of 17.3. 63.2% are Adelie, 28.9% are Gentoo, 7.9% are Chinstrap. 3 of 6 bins.

    Child node:

    **Series**: 14.0% of all points are Adelie in 40 to 45 Length bin. Points are densely distributed from the mean of 18.7. 1 of 3 series.

    Child node:

    **Cell**: 6.4% points are Adelie in 18 to 19 Depth and 40 to 45 Length cell. 6 of 9 cells.

    Back up to series-level:
    6.4% of all points are Gentoo in 40 to 45 Length bin. Points are densely distributed form the mean to 14.2. 2 of 3 series.

    1.8% of all points are Chinstrap in 40 to 45 Length bin. P{oints are very densely distributed from the mean of 17.1. 3 of 3 series.

figure2:
caption2:

excerpt: Through a co-design study, developed an dual interface to facilitate multi-modal navigation of complex charts such as scatterplots.

postdate: 2024-10-13 00:00:00 -0700
categories: vis accessible-vis codesign screen-reader
---

Accessible data visualization presentation tends to focus on single modality interfaces.  In this work, we introduce ChartA11y, an app designed to provide both direct chart accessibility and comprehensive chart understanding by applying a two-mode setting: a semantic navigation framework mode and a direct touch mapping mode on mobile devices.  We adapt existing accessible visualization frameworks to address the under-explored challenges posed by non-linear data distributions in scatter plots.

In this work, we focus on the design journey for creating these accessible touch experiences with two blind partners over 13 sessions.  We identified difficulties in designing sensical interfaces for exploring 2-D visualizations where there is no strong spatial referent, and propose an co-designed implementation to enable users to explore such surfaces in a generalizable way.  We couple this with incremental improvements to the ordering of information in narration design and sonification of relevant data attributes as the user is navigating the visualization.

_This work will be presented at [ASSETS 2024](https://assets24.sigaccess.org/) by [Jerry Zhang](https://zhuohaozhang.com/) in St. John's, Newfoundland and Labrador, Canada._