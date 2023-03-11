---
layout: publication
articletitle: "Chart Reader: Accessible Visualization Experiences Designed with Screen Reader Users"
presented: CHI 2023
conf: chi

bibtextype: inproceedings
publication: Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems
authors:
- John R Thompson
- Jesse J Martinez
- Alper Sarikaya
- Edward Cutrell
- Bongshin Lee
doi: 10.1145/3544548.3581186
publisher: ACM
location: New York, NY, USA
datepublished: 2023-04-20

link_paperlink: chartreader-preprint.pdf
link_suppl: chartreader-suppl.zip
link_labrepo:
video_teaser: currency-multi-line.mp4
video_paper:
website_project:
website_repo:
talk_slides:
talk_video:

thumbnail: thumbnail.png
figure1: annotated-screen.png
caption1: |
    The above figure shows five regions in the chart rendered using Chart Reader.  These five regions are top-level items in the visualization, and are organized hierarchically.

    The **data insights** region subdivides available insights into _types_ of insights (summary, trends, anomalies, and statistics), and the individual insights link to segments of the visualized data.

    The **X-Axis** and **Y-Axis** regions are divided into bins, which allows for quick navigation along the time or value ranges.

    The **Data Points** region enables linear navigation of data points, with augmentations for sonifying data, switching between series of data, and fast-stepping through data points.  The **Series Filters** list all available data series and allows users to "hide" series when navigating in the Data Points region, facilitating more targeted data comparison.

figure2: currency-multi-line.png
caption2: |
    A visual example of binning on the X-axis.  As a user iterates through the bins on the X-axis, Chart Reader provides averages per-series.  A user can chose to continue to seek through X-axis bins, or they can elect to jump into the Data Points region to navigate and/or sonify individual data points.  The [teaser video demonstrates example interaction](/assets/publications/chartreader/currency-multi-line.mp4) using this chart.

excerpt: Through a co-design study, synthesized an engine to construct accessible visualization experiences for screen-reader users.

postdate: 2023-03-10 14:25:00 -0700
categories: vis accessible-vis codesign screen-reader
---

Accessibility of data visualizations is critical for people who are blind or low-vision, and current specified guidance for providing alt-text (e.g., ARIA) is not nearly engaging enough to allow people agency for exploring a data visualization.  Progress has been made this area by allowing navigation through a representative data table, sonification of trends via tones, and various hierarchical descriptions and navigations.  However, the combination and synthesis of these disparate techniques is still under-studied, and how these techniques should be combined to create a full data experience for screen reader users is underspecified.

In this work, we present **Chart Reader**, a prototype accessibility engine that synthesizes hierarchical navigation, sonification, and cross-cutting insights to enable screen reader users to navigate and consume a data visualization as a data experience.  We developed this prototype in concert with 10 design partners who are blind or have low vision, conducting an iterative co-design study to arrive at a more refined prototype that supported various, individualized experiences.

We describe several exemplar strategies of personas perusing a chart using Chart Reader, including strategies for using the _Insights_ pane to quickly jump into and verify claims.  We categorize tooling support into the design dimensions of structure, navigation, description, non-speech audio, and focus to concretize supporting the data experience.
We also describe the suggestions, expectations, and difficulties our design partners provided throughout the three iterations of the Chart Reader prototype.
It is our hope that such all-in-one engines like Chart Reader can help build an explorable data experience for all from a visualization representation.

*This work will be presented at [ACM CHI 2023](https://chi2023.acm.org/) in Hamburg, Germany.*
